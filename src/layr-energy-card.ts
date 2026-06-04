/**
 * Layr Energy Card
 *
 * A live energy-flow card in the Monolith aesthetic — built for balcony
 * solar plants (Balkonkraftwerk) and small PV + battery setups. It reads the
 * current power flows (solar, house, grid, battery), derives the operating
 * mode, and animates an energy-flow diagram: glowing particles travel along
 * the active path while idle paths rest in the background.
 *
 * Operating modes (status colour):
 *   - solar   (green)  — consumption covered by the sun, surplus exported
 *   - storage (amber)  — drawing from the battery
 *   - grid    (red)    — drawing from the grid
 *
 * Author: Maurice Stockfleth
 * Repository: github.com/maurice198444/layr
 */

import { type HomeAssistant, type LovelaceCardConfig } from 'custom-card-helpers';
import { LitElement, css, html, nothing, svg, type SVGTemplateResult, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { ensureLayrFonts } from './shared/fonts';
import { formatGermanNumber, toNumber } from './shared/format';
import { fireMoreInfo } from './shared/ha';
import { GLYPH_ICONS } from './shared/icons';
import { monolithTokens } from './shared/tokens';

// ============================================================================
// TYPES
// ============================================================================

export interface EnergyStatConfig {
  entity: string;
  name?: string;
  unit?: string;
  /** Reference value for the bar fill (e.g. daily max kWh). Percent stats fill by value. */
  max?: number;
  /** Bar tint — 'green' for self/solar values, 'accent' (default) otherwise. */
  tone?: 'green' | 'accent';
}

export interface LayrEnergyCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  icon?: keyof typeof GLYPH_ICONS | string;
  solar_entity?: string;
  house_entity?: string;
  /** Single signed grid power sensor (import/export via grid_export_positive). */
  grid_entity?: string;
  /** Separate positive-only grid import (Bezug) power sensor — takes precedence over grid_entity. */
  grid_import_entity?: string;
  /** Separate positive-only grid export (Einspeisung) power sensor — takes precedence over grid_entity. */
  grid_export_entity?: string;
  /** Single signed battery power sensor (charge/discharge via battery_charge_positive). */
  battery_entity?: string;
  /** Separate positive-only charge power sensor (takes precedence over battery_entity). */
  battery_charge_entity?: string;
  /** Separate positive-only discharge power sensor (takes precedence over battery_entity). */
  battery_discharge_entity?: string;
  battery_level_entity?: string;
  /** When true, a positive grid value means export. Default: positive = import. */
  grid_export_positive?: boolean;
  /** When true (default), a positive battery value means charging. Ignored if split charge/discharge entities are set. */
  battery_charge_positive?: boolean;
  /** Power threshold (W) below which a flow is treated as idle. Default 20. */
  threshold?: number;
  stats?: EnergyStatConfig[];
  tap_action?: 'more-info' | 'none';
}

type Mode = 'solar' | 'storage' | 'grid';

interface FlowModel {
  mode: Mode;
  solar: number;
  house: number;
  importW: number;
  exportW: number;
  charge: number;
  discharge: number;
  soc: number | null;
}

// ============================================================================
// NODE GLYPHS (inline — specific to the flow diagram)
// ============================================================================

const NODE_GLYPH: Record<'solar' | 'haus' | 'speicher' | 'netz', SVGTemplateResult> = {
  solar: svg`<circle class="f" cx="12" cy="12" r="3.2"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/>`,
  haus: svg`<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>`,
  speicher: svg`<rect x="4" y="8" width="14" height="9" rx="2"/><path d="M20 11v3"/><rect class="f" x="6" y="10" width="5" height="5" rx="1"/>`,
  netz: svg`<path d="M12 3l-4 18M12 3l4 18M9 9h6M8 15h8"/>`,
};

// Diagram geometry (matches the viewBox below).
const FLOW_W = 344;
const FLOW_H = 120;

const NODE_POS = {
  solar: { x: 28, y: 54 },
  haus: { x: 172, y: 54 },
  speicher: { x: 316, y: 28 },
  netz: { x: 316, y: 80 },
} as const;

const WIRE = {
  solarHaus: 'M28 54 L172 54',
  hausSpeicher: 'M172 54 C232 54 252 28 316 28',
  hausNetz: 'M172 54 C232 54 252 80 316 80',
  speicherHaus: 'M316 28 C252 28 232 54 172 54',
  netzHaus: 'M316 80 C252 80 232 54 172 54',
} as const;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

@customElement('layr-energy-card')
export class LayrEnergyCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: LayrEnergyCardConfig;
  @state() private _flowScale = 1;

  private _resizeObserver?: ResizeObserver;

  constructor() {
    super();
    ensureLayrFonts();
  }

  // Scale the fixed-size flow diagram down to fit narrow cards.
  protected updated(): void {
    if (this._resizeObserver) return;
    const wrap = this.renderRoot.querySelector('.flow-scale') as HTMLElement | null;
    if (!wrap || typeof ResizeObserver === 'undefined') return;
    this._resizeObserver = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? FLOW_W;
      const s = Math.min(1, w / FLOW_W);
      if (Math.abs(s - this._flowScale) > 0.005) this._flowScale = s;
    });
    this._resizeObserver.observe(wrap);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  public setConfig(config: LayrEnergyCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    if (
      !config.solar_entity &&
      !config.grid_entity &&
      !config.grid_import_entity &&
      !config.grid_export_entity &&
      !config.battery_entity &&
      !config.battery_charge_entity &&
      !config.battery_discharge_entity
    ) {
      throw new Error('Layr Energy Card: configure at least one of solar_entity, grid_entity, battery_entity');
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 4;
  }

  public static getStubConfig(): Partial<LayrEnergyCardConfig> {
    return { solar_entity: '', grid_entity: '', battery_entity: '' };
  }

  // ---- Data --------------------------------------------------------------
  private _num(entityId?: string): number | null {
    if (!entityId) return null;
    return toNumber(this.hass.states[entityId]?.state);
  }

  private get _flow(): FlowModel {
    const c = this._config;
    const th = c.threshold ?? 20;

    const solar = Math.max(0, this._num(c.solar_entity) ?? 0);
    const house = this._num(c.house_entity) ?? 0;
    const soc = this._num(c.battery_level_entity);

    // Grid: prefer separate positive-only import/export sensors (e.g. a smart
    // meter), else a single signed sensor interpreted via grid_export_positive.
    let importW: number;
    let exportW: number;
    if (c.grid_import_entity || c.grid_export_entity) {
      importW = Math.max(0, this._num(c.grid_import_entity) ?? 0);
      exportW = Math.max(0, this._num(c.grid_export_entity) ?? 0);
    } else {
      const gridRaw = this._num(c.grid_entity) ?? 0;
      const gridImport = c.grid_export_positive ? -gridRaw : gridRaw; // +import
      importW = Math.max(0, gridImport);
      exportW = Math.max(0, -gridImport);
    }

    // Battery: prefer separate positive-only charge/discharge sensors, else a
    // single signed sensor interpreted via battery_charge_positive.
    let charge: number;
    let discharge: number;
    if (c.battery_charge_entity || c.battery_discharge_entity) {
      charge = Math.max(0, this._num(c.battery_charge_entity) ?? 0);
      discharge = Math.max(0, this._num(c.battery_discharge_entity) ?? 0);
    } else {
      const battRaw = this._num(c.battery_entity) ?? 0;
      const battCharge = (c.battery_charge_positive ?? true) ? battRaw : -battRaw; // +charge
      charge = Math.max(0, battCharge);
      discharge = Math.max(0, -battCharge);
    }

    let mode: Mode = 'solar';
    if (importW > th) mode = 'grid';
    else if (discharge > th) mode = 'storage';

    return { mode, solar, house, importW, exportW, charge, discharge, soc };
  }

  // ---- Interaction -------------------------------------------------------
  private _tap = (): void => {
    if (this._config.tap_action === 'none') return;
    const target =
      this._config.solar_entity || this._config.grid_entity || this._config.battery_entity;
    if (target) fireMoreInfo(this, target);
  };

  private _onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._tap();
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    const f = this._flow;
    const interactive = this._config.tap_action !== 'none';
    const iconKey = (this._config.icon as keyof typeof GLYPH_ICONS) || 'sun';
    const iconTpl = GLYPH_ICONS[iconKey] ?? GLYPH_ICONS.sun;

    const classes = {
      'layr-energy': true,
      'mode-solar': f.mode === 'solar',
      'mode-storage': f.mode === 'storage',
      'mode-grid': f.mode === 'grid',
      interactive,
    };

    const { value, unit } = this._headline(f);
    const split = this._split(f);

    return html`
      <ha-card
        class=${classMap(classes)}
        @click=${this._tap}
        @keydown=${this._onKeydown}
        role=${interactive ? 'button' : nothing}
        tabindex=${interactive ? '0' : nothing}
      >
        <div class="main">
          <div class="head">
            <div class="icon">${iconTpl}</div>
            <div class="label">${this._config.name ?? 'Energie'}</div>
            <div class="live"><span class="dot"></span></div>
          </div>

          <div class="value">
            <span class="num">${value}</span>${unit
              ? html`<span class="unit">${unit}</span>`
              : nothing}
          </div>

          <div class="split">
            <div class="seg src">
              <span class="t">${split.a.label}</span><span class="n">${split.a.value}</span>
            </div>
            ${split.b
              ? html`<div class="seg ${split.b.accent ? 'acc' : ''}">
                  <span class="t">${split.b.label}</span><span class="n">${split.b.value}</span>
                </div>`
              : nothing}
          </div>

          ${this._renderFlow(f)}
        </div>

        ${this._renderRail()}
      </ha-card>
    `;
  }

  private _headline(f: FlowModel): { value: string; unit: string } {
    const w = (n: number) => formatGermanNumber(n, 0);
    if (f.mode === 'grid') return { value: w(f.importW), unit: 'W' };
    if (f.mode === 'storage') return { value: w(f.discharge), unit: 'W' };
    return { value: w(f.solar), unit: 'W' };
  }

  private _split(f: FlowModel): {
    a: { label: string; value: string };
    b?: { label: string; value: string; accent?: boolean };
  } {
    const w = (n: number) => `${formatGermanNumber(n, 0)} W`;
    if (f.mode === 'grid') {
      return {
        a: { label: 'Netzbezug', value: w(f.importW) },
        b: { label: 'Hausverbrauch', value: w(f.house) },
      };
    }
    if (f.mode === 'storage') {
      return {
        a: { label: 'Speicherstand', value: f.soc !== null ? `${formatGermanNumber(f.soc, 0)} %` : '—' },
        b: { label: 'Hausverbrauch', value: w(f.house) },
      };
    }
    const selfUse = Math.max(0, f.solar - f.exportW);
    return {
      a: { label: 'Eigenverbrauch', value: w(selfUse) },
      b: { label: 'Einspeisung', value: w(f.exportW), accent: true },
    };
  }

  // ---- Flow diagram ------------------------------------------------------
  private _renderFlow(f: FlowModel): TemplateResult {
    // Per-mode: which wires animate, their tint, particle path, and flow direction.
    const active: Array<{
      path: string;
      pulse: string;
      tone: 'status' | 'accent';
      reverse: boolean;
    }> = [];
    const onNodes = new Set<'solar' | 'haus' | 'speicher' | 'netz'>(['haus']);
    let accNode: 'netz' | null = null;
    const th = this._config.threshold ?? 20;

    if (f.mode === 'solar') {
      active.push({ path: WIRE.solarHaus, pulse: WIRE.solarHaus, tone: 'status', reverse: false });
      onNodes.add('solar');
      if (f.exportW > th) {
        active.push({ path: WIRE.hausNetz, pulse: WIRE.hausNetz, tone: 'accent', reverse: false });
        accNode = 'netz';
      }
      if (f.charge > th) {
        active.push({ path: WIRE.hausSpeicher, pulse: WIRE.hausSpeicher, tone: 'status', reverse: false });
        onNodes.add('speicher');
      }
    } else if (f.mode === 'storage') {
      active.push({ path: WIRE.hausSpeicher, pulse: WIRE.speicherHaus, tone: 'status', reverse: true });
      onNodes.add('speicher');
    } else {
      active.push({ path: WIRE.hausNetz, pulse: WIRE.netzHaus, tone: 'status', reverse: true });
      onNodes.add('netz');
    }

    const wireClass = (path: string) => {
      const a = active.find((x) => x.path === path);
      return {
        wire: true,
        on: a?.tone === 'status',
        'on-acc': a?.tone === 'accent',
        rev: Boolean(a?.reverse),
      };
    };

    return html`
      <div class="flow-scale" style="height:${FLOW_H * this._flowScale}px">
        <div class="flow" style="transform:scale(${this._flowScale})">
        <svg class="wires" viewBox="0 0 344 120" preserveAspectRatio="none">
          ${this._wire(WIRE.solarHaus, wireClass(WIRE.solarHaus))}
          ${this._wire(WIRE.hausSpeicher, wireClass(WIRE.hausSpeicher))}
          ${this._wire(WIRE.hausNetz, wireClass(WIRE.hausNetz))}
        </svg>
        ${active.flatMap((a) => [
          this._pulse(a.pulse, a.tone, 0),
          this._pulse(a.pulse, a.tone, -1.5),
        ])}
        ${this._node('solar', onNodes.has('solar'), false)}
        ${this._node('haus', onNodes.has('haus'), false)}
        ${this._node('speicher', onNodes.has('speicher'), false)}
        ${this._node('netz', onNodes.has('netz'), accNode === 'netz')}
        ${this._cap('solar', 'Solar', 76)} ${this._cap('haus', 'Haus', 76)}
        ${this._cap('speicher', 'Speicher', 48)} ${this._cap('netz', 'Netz', 100)}
        </div>
      </div>
    `;
  }

  private _wire(path: string, cls: Record<string, boolean>): SVGTemplateResult {
    return svg`<path class=${classMap(cls)} d=${path} />`;
  }

  private _pulse(path: string, tone: 'status' | 'accent', delay: number): TemplateResult {
    const style = `offset-path:path('${path}');${delay ? `animation-delay:${delay}s` : ''}`;
    return html`<span class="pulse ${tone === 'accent' ? 'acc' : ''}" style=${style}></span>`;
  }

  private _node(
    key: 'solar' | 'haus' | 'speicher' | 'netz',
    on: boolean,
    acc: boolean,
  ): TemplateResult {
    const pos = NODE_POS[key];
    const cls = { node: true, on: on && !acc, 'on-acc': acc };
    return html`<div class=${classMap(cls)} style="left:${pos.x}px;top:${pos.y}px">
      <svg viewBox="0 0 24 24">${NODE_GLYPH[key]}</svg>
    </div>`;
  }

  private _cap(key: 'solar' | 'haus' | 'speicher' | 'netz', text: string, top: number): TemplateResult {
    return html`<span class="cap" style="left:${NODE_POS[key].x}px;top:${top}px">${text}</span>`;
  }

  // ---- Stat rail ---------------------------------------------------------
  private _renderRail(): TemplateResult | typeof nothing {
    const stats = (this._config.stats ?? []).slice(0, 4);
    if (!stats.length) return nothing;

    return html`<div class="rail">
      ${stats.map((s) => {
        const st = this.hass.states[s.entity];
        const n = toNumber(st?.state);
        const unit = s.unit ?? (st?.attributes.unit_of_measurement as string | undefined) ?? '';
        const value = n === null ? '—' : `${formatGermanNumber(n, Number.isInteger(n) ? 0 : 2)}${unit ? ` ${unit}` : ''}`;
        const fill =
          n === null ? 0 : s.max ? Math.min(100, (n / s.max) * 100) : unit === '%' ? Math.min(100, n) : 0;
        const label = s.name ?? (st?.attributes.friendly_name as string | undefined) ?? s.entity;
        return html`<div class="stat">
          <span class="k">${label}</span><span class="vv">${value}</span>
          ${fill > 0
            ? html`<div class="bar"><i class=${s.tone === 'green' ? 'g' : ''} style="width:${fill}%"></i></div>`
            : nothing}
        </div>`;
      })}
    </div>`;
  }

  static styles = css`
    ${monolithTokens}

    .mode-solar {
      --status: #6f8a3e;
      --status-glow: rgba(111, 138, 62, 0.55);
    }
    .mode-storage {
      --status: #c2992b;
      --status-glow: rgba(194, 153, 43, 0.55);
    }
    .mode-grid {
      --status: #a83f33;
      --status-glow: rgba(168, 63, 51, 0.55);
    }

    .layr-energy {
      position: relative;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: stretch;
      gap: 24px;
      padding: 24px 26px;
      border-radius: 26px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out);
      color: var(--mn-text);
      border: none;
      overflow: hidden;
    }
    .layr-energy.interactive {
      cursor: pointer;
    }
    .layr-energy:focus-visible {
      outline: 2px solid var(--status);
      outline-offset: 3px;
    }
    .layr-energy::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.35;
      background-image: radial-gradient(circle, var(--mn-bg-dark) 1px, transparent 1.4px);
      background-size: 7px 7px;
    }
    .main {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 13px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-accent);
      flex-shrink: 0;
    }
    .icon .glyph-svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .icon .glyph-svg .filled {
      fill: currentColor;
      stroke: none;
    }
    .label {
      flex: 1;
      min-width: 0;
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.13em;
      text-transform: uppercase;
      color: var(--mn-text-mid);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .live {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--status);
      box-shadow: 0 0 8px var(--status-glow);
      animation: breathe 3s ease-in-out infinite;
    }
    @keyframes breathe {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.25);
      }
    }

    .value {
      display: flex;
      align-items: baseline;
      gap: 7px;
      line-height: 0.92;
      margin-top: 2px;
    }
    .value .num {
      font-family: 'Fraunces', Georgia, serif;
      font-weight: 300;
      font-size: 58px;
      letter-spacing: -0.02em;
      color: var(--mn-text);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.35);
    }
    .value .unit {
      font-family: 'Fraunces', Georgia, serif;
      font-weight: 400;
      font-size: 22px;
      color: var(--mn-text-mid);
    }

    .split {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 18px;
      margin-top: 11px;
    }
    .split .seg {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .split .seg .t {
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--mn-text-dim);
    }
    .split .seg .n {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 16px;
      color: var(--mn-text);
    }
    .split .seg.src .n {
      color: var(--status);
    }
    .split .seg.acc .n {
      color: var(--mn-accent);
    }

    /* ===== ENERGY FLOW ===== */
    .flow-scale {
      width: 100%;
      margin-top: 18px;
      overflow: visible;
    }
    .flow {
      position: relative;
      width: 344px;
      height: 120px;
      transform-origin: top left;
    }
    .wires {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .wire {
      fill: none;
      stroke: var(--mn-bg-dark);
      stroke-width: 2.2;
      stroke-linecap: round;
      opacity: 0.45;
    }
    .wire.on {
      stroke: var(--status);
      opacity: 0.8;
      stroke-dasharray: 4 10;
      animation: dash 1.5s linear infinite;
      filter: drop-shadow(0 0 2px var(--status-glow));
    }
    .wire.on-acc {
      stroke: var(--mn-accent);
      opacity: 0.8;
      stroke-dasharray: 4 10;
      animation: dash 1.5s linear infinite;
      filter: drop-shadow(0 0 2px var(--mn-accent-glow));
    }
    @keyframes dash {
      to {
        stroke-dashoffset: -14;
      }
    }
    .wire.rev {
      animation-direction: reverse;
    }
    .pulse {
      position: absolute;
      left: 0;
      top: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--status);
      box-shadow: 0 0 6px 1px var(--status-glow);
      offset-rotate: 0deg;
      animation: travel 3s linear infinite;
      opacity: 0;
    }
    .pulse.acc {
      background: var(--mn-accent);
      box-shadow: 0 0 6px 1px var(--mn-accent-glow);
    }
    @keyframes travel {
      0% {
        offset-distance: 0%;
        opacity: 0;
      }
      16% {
        opacity: 1;
      }
      84% {
        opacity: 1;
      }
      100% {
        offset-distance: 100%;
        opacity: 0;
      }
    }
    .node {
      position: absolute;
      width: 36px;
      height: 36px;
      border-radius: 12px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-text-dim);
      transform: translate(-50%, -50%);
      z-index: 2;
    }
    .node svg {
      width: 19px;
      height: 19px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .node svg .f {
      fill: currentColor;
      stroke: none;
    }
    .node.on {
      color: var(--status);
      animation: nodeglow 3s ease-in-out infinite;
    }
    .node.on-acc {
      color: var(--mn-accent);
      box-shadow: var(--mn-shadow-out-sm), 0 0 13px var(--mn-accent-glow);
    }
    @keyframes nodeglow {
      0%,
      100% {
        box-shadow: var(--mn-shadow-out-sm), 0 0 8px var(--status-glow);
      }
      50% {
        box-shadow: var(--mn-shadow-out-sm), 0 0 17px var(--status-glow);
      }
    }
    .cap {
      position: absolute;
      transform: translate(-50%, 0);
      font-size: 8.5px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--mn-text-dim);
      z-index: 2;
      white-space: nowrap;
    }

    /* ===== STAT RAIL ===== */
    .rail {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 24px;
      flex-shrink: 0;
    }
    .rail::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 2px;
      border-radius: 2px;
      background: linear-gradient(var(--mn-bg-dark), var(--mn-bg-light));
      box-shadow: 1px 0 0 rgba(255, 255, 255, 0.5);
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 104px;
    }
    .stat + .stat {
      margin-top: 13px;
    }
    .stat .k {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--mn-text-dim);
    }
    .stat .vv {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 19px;
      color: var(--mn-text);
    }
    .stat .bar {
      height: 4px;
      border-radius: 4px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-in);
      overflow: hidden;
      margin-top: 4px;
    }
    .stat .bar i {
      display: block;
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--mn-accent-light), var(--mn-accent));
      box-shadow: 0 0 8px var(--mn-accent-glow);
    }
    .stat .bar i.g {
      background: linear-gradient(90deg, #9aa86a, #6f8a3e);
      box-shadow: 0 0 8px rgba(111, 138, 62, 0.5);
    }
  `;
}

// ============================================================================
// LOVELACE CARD REGISTRATION
// ============================================================================

declare global {
  interface HTMLElementTagNameMap {
    'layr-energy-card': LayrEnergyCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'layr-energy-card',
  name: 'Layr Energy Card',
  description: 'Live energy-flow card for solar + battery setups, in the Monolith aesthetic',
  preview: true,
});

console.info(
  '%c LAYR-ENERGY-CARD %c v0.1.0 ',
  'color: white; background: #b8743a; font-weight: bold;',
  'color: #b8743a; background: white; font-weight: bold;',
);
