/**
 * Layr Room Card
 *
 * Premium Home Assistant room card with the Monolith design aesthetic.
 * Single card that adapts to the configured entities — sections render
 * conditionally based on which entities you set in YAML.
 *
 * Author: Maurice Stockfleth
 * Repository: github.com/maurice198444/layr
 */

import { type HomeAssistant, type LovelaceCardConfig } from 'custom-card-helpers';
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { ensureLayrFonts } from './shared/fonts';
import { formatGermanNumber, isUnavailable } from './shared/format';
import { domainOf } from './shared/ha';
import { ROOM_ICONS } from './shared/icons';
import { monolithTokens } from './shared/tokens';

// ============================================================================
// TYPES
// ============================================================================

export interface SwitchConfig {
  entity: string;
  name?: string;
}

export interface QuickAccessConfig {
  entity: string;
  name?: string;
  tap_action?: 'toggle' | 'turn_on' | 'turn_off';
}

export interface LayrRoomCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  icon?: keyof typeof ROOM_ICONS | string;
  temperature_entity?: string;
  humidity_entity?: string;
  light_entity?: string;
  climate_entity?: string;
  cover_entity?: string;
  switches?: SwitchConfig[];
  quick_access?: QuickAccessConfig;
}

// ============================================================================
// SVG ASSETS
// ============================================================================

const POWER_ICON_SVG = html`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.26 1.08-4.26 2.75-5.53L6.17 5.05A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0 8.93 8.93 0 0 0-3.17-6.83z"
    />
  </svg>
`;

const COVER_UP_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="7 14 12 9 17 14" />
  </svg>
`;

const COVER_STOP_SVG = html`
  <svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
`;

const COVER_DOWN_SVG = html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="7 10 12 15 17 10" />
  </svg>
`;

// ============================================================================
// HELPERS
// ============================================================================

const formatTemperature = (raw: string | number | undefined): string => {
  if (isUnavailable(raw)) return '—';
  const n = typeof raw === 'string' ? parseFloat(raw) : (raw as number);
  if (isNaN(n)) return '—';
  return `${formatGermanNumber(n, 1)}°`;
};

const formatHumidity = (raw: string | number | undefined): string | null => {
  if (isUnavailable(raw)) return null;
  const n = typeof raw === 'string' ? parseFloat(raw) : (raw as number);
  if (isNaN(n)) return null;
  return `${Math.round(n)}%`;
};

const formatCoverPosition = (pos: number): string => {
  if (pos === 0) return 'geschlossen';
  if (pos === 100) return 'offen';
  return `${pos}% offen`;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

@customElement('layr-room-card')
export class LayrRoomCard extends LitElement {
  // ---- Public Lit properties --------------------------------------------
  @property({ attribute: false }) public hass!: HomeAssistant;

  // ---- Internal reactive state ------------------------------------------
  @state() private _config!: LayrRoomCardConfig;
  @state() private _expanded = false;
  @state() private _isDraggingSlider = false;
  @state() private _draftBrightness: number | null = null;

  // ---- Non-reactive timers/state ----------------------------------------
  private _longPressTimer?: number;
  private _longPressInterval?: number;
  private _activePointerId: number | null = null;

  constructor() {
    super();
    ensureLayrFonts();
  }

  // ---- Required Lovelace hooks ------------------------------------------
  public setConfig(config: LayrRoomCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return this._expanded ? 6 : 2;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;

    // Local UI state always triggers a render
    if (
      changedProps.has('_config') ||
      changedProps.has('_expanded') ||
      changedProps.has('_isDraggingSlider') ||
      changedProps.has('_draftBrightness')
    ) {
      return true;
    }

    // hass changed — only re-render if a *watched* entity changed
    const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (!oldHass) return true; // first render

    const watchedEntities = this._getWatchedEntities();
    return watchedEntities.some((id) => oldHass.states[id] !== this.hass.states[id]);
  }

  private _getWatchedEntities(): string[] {
    const ids: string[] = [];
    const c = this._config;
    if (c.temperature_entity) ids.push(c.temperature_entity);
    if (c.humidity_entity) ids.push(c.humidity_entity);
    if (c.light_entity) ids.push(c.light_entity);
    if (c.climate_entity) ids.push(c.climate_entity);
    if (c.cover_entity) ids.push(c.cover_entity);
    if (c.quick_access?.entity) ids.push(c.quick_access.entity);
    if (c.switches) {
      for (const s of c.switches) ids.push(s.entity);
    }
    return ids;
  }

  // ---- Entity getters ---------------------------------------------------
  private get _tempState() {
    return this._config.temperature_entity
      ? this.hass?.states[this._config.temperature_entity]
      : undefined;
  }

  private get _humidityState() {
    return this._config.humidity_entity
      ? this.hass?.states[this._config.humidity_entity]
      : undefined;
  }

  private get _lightState() {
    return this._config.light_entity ? this.hass?.states[this._config.light_entity] : undefined;
  }

  private get _climateState() {
    return this._config.climate_entity ? this.hass?.states[this._config.climate_entity] : undefined;
  }

  private get _coverState() {
    return this._config.cover_entity ? this.hass?.states[this._config.cover_entity] : undefined;
  }

  private get _quickAccessState() {
    return this._config.quick_access?.entity
      ? this.hass?.states[this._config.quick_access.entity]
      : undefined;
  }

  // ---- Derived properties -----------------------------------------------
  private get _lightOn(): boolean {
    return this._lightState?.state === 'on';
  }

  private get _supportsDimming(): boolean {
    if (!this._lightState) return false;
    const modes = this._lightState.attributes.supported_color_modes as string[] | undefined;
    if (!modes || modes.length === 0) return false;
    return modes.some((m) => m !== 'onoff');
  }

  private get _brightnessPct(): number {
    if (this._draftBrightness !== null) return this._draftBrightness;
    if (!this._lightOn) return 0;
    const b = this._lightState!.attributes.brightness as number | undefined;
    if (b === undefined) return 100;
    return Math.round((b / 255) * 100);
  }

  private get _coverPosition(): number {
    const pos = this._coverState?.attributes.current_position as number | undefined;
    if (pos === undefined) return 0;
    return Math.round(pos);
  }

  private get _hasAnyControls(): boolean {
    return (
      Boolean(this._lightState) ||
      Boolean(this._climateState) ||
      Boolean(this._coverState) ||
      Boolean(this._config.switches?.length)
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    const classes = {
      'layr-room': true,
      active: this._lightOn,
      expanded: this._expanded,
      'read-only': !this._hasAnyControls,
    };

    const brightnessVar = (this._brightnessPct / 100).toFixed(2);

    return html`
      <ha-card class=${classMap(classes)} style=${styleMap({ '--brightness': brightnessVar })}>
        ${this._renderTopRow()} ${this._renderStatsArea()}
        ${this._hasAnyControls
          ? html`
              <div
                class="expand-handle"
                @click=${this._toggleExpand}
                role="button"
                aria-label="Steuerelemente ein-/ausblenden"
                tabindex="0"
              ></div>
              ${this._renderControls()}
            `
          : nothing}
      </ha-card>
    `;
  }

  // ---- Top row (icon + name) -------------------------------------------
  private _renderTopRow(): TemplateResult {
    const iconKey = (this._config.icon as keyof typeof ROOM_ICONS) || 'default';
    const iconTpl = ROOM_ICONS[iconKey] ?? ROOM_ICONS.default;
    const name = this._config.name || 'Raum';

    return html`
      <div class="row-top">
        <div class="room-header">
          <div class="icon">${iconTpl}</div>
          <div class="name-rest">${name}</div>
        </div>
        <div class="status-col"></div>
      </div>
    `;
  }

  // ---- Stats area (temp + humidity + quick-access) ----------------------
  private _renderStatsArea(): TemplateResult {
    const temp = formatTemperature(this._tempState?.state);
    const targetTemp = this._climateState?.attributes.temperature as number | undefined;
    const humidity = formatHumidity(this._humidityState?.state);

    return html`
      <div class="stats-area">
        <div class="stats">
          <div class="temp-block">
            <div class="value-primary">${temp}</div>
            ${targetTemp !== undefined
              ? html`
                  <div class="value-secondary">
                    <span class="sec-label">Soll</span>
                    <span class="sec-num">${formatGermanNumber(targetTemp)}°</span>
                  </div>
                `
              : nothing}
          </div>
          ${humidity !== null
            ? html`
                <div class="humidity-block">
                  <div class="humidity-value">${humidity}</div>
                  <div class="humidity-label">Luftfeuchte</div>
                </div>
              `
            : nothing}
        </div>
        ${this._renderQuickAccess()}
      </div>
    `;
  }

  // ---- Quick-access button ---------------------------------------------
  private _renderQuickAccess(): TemplateResult | typeof nothing {
    const qa = this._config.quick_access;
    if (!qa) return nothing;

    const state = this._quickAccessState;
    const isOn = state?.state === 'on';
    const label = qa.name || (state?.attributes.friendly_name as string) || 'Quick';

    return html`
      <div class="quick-access ${isOn ? 'on' : ''}">
        <button
          class="quick-btn"
          type="button"
          @click=${this._handleQuickAccess}
          aria-label="${label} schalten"
        >
          ${POWER_ICON_SVG}
        </button>
        <span class="quick-label">${label}</span>
      </div>
    `;
  }

  // ---- Controls panel (expanded) ---------------------------------------
  private _renderControls(): TemplateResult {
    return html`
      <div class="controls">
        <div class="controls-inner">
          ${this._lightState ? this._renderLightControl() : nothing}
          ${this._climateState ? this._renderClimateControl() : nothing}
          ${this._coverState ? this._renderCoverControl() : nothing}
          ${this._config.switches?.length ? this._renderSwitches() : nothing}
        </div>
      </div>
    `;
  }

  // ---- Light control (slider + power) ----------------------------------
  private _renderLightControl(): TemplateResult {
    const pct = this._brightnessPct;
    const supportsDimming = this._supportsDimming;
    const isOn = this._lightOn || pct > 0;
    const cgClasses = { 'control-group': true, 'light-off': !isOn };

    return html`
      <div class=${classMap(cgClasses)}>
        <div class="control-label">
          <span class="key">Helligkeit</span>
          ${supportsDimming ? html`<span class="val">${isOn ? `${pct}%` : 'aus'}</span>` : nothing}
        </div>
        <div class="light-toggle-row">
          <button
            class="power-btn ${isOn ? 'on' : ''}"
            type="button"
            @click=${this._toggleLight}
            aria-label="Licht ein/aus"
          >
            ${POWER_ICON_SVG}
          </button>
          ${supportsDimming
            ? html`
                <div
                  class="slider ${this._isDraggingSlider ? 'dragging' : ''}"
                  @pointerdown=${this._onSliderPointerDown}
                  @pointermove=${this._onSliderPointerMove}
                  @pointerup=${this._onSliderPointerUp}
                  @pointercancel=${this._onSliderPointerUp}
                >
                  <div class="slider-fill" style="width: ${pct}%"></div>
                  <div class="slider-thumb" style="left: ${pct}%"></div>
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  // ---- Climate control (stepper) ---------------------------------------
  private _renderClimateControl(): TemplateResult {
    const target = (this._climateState!.attributes.temperature as number) ?? 0;
    const mode = this._climateState!.attributes.preset_mode as string | undefined;
    const valLabel = mode ? mode.charAt(0).toUpperCase() + mode.slice(1) : '';

    return html`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Heizung Soll</span>
          ${valLabel ? html`<span class="val">${valLabel}</span>` : nothing}
        </div>
        <div class="stepper">
          <button
            class="step-btn"
            type="button"
            @click=${() => this._adjustSetpoint(-0.5)}
            @pointerdown=${() => this._startLongPress(-0.5)}
            @pointerup=${this._stopLongPress}
            @pointerleave=${this._stopLongPress}
            @pointercancel=${this._stopLongPress}
            aria-label="Setpoint verringern"
          >
            −
          </button>
          <div class="step-display">
            <span class="num">${formatGermanNumber(target)}</span><span class="unit">°C</span>
          </div>
          <button
            class="step-btn"
            type="button"
            @click=${() => this._adjustSetpoint(0.5)}
            @pointerdown=${() => this._startLongPress(0.5)}
            @pointerup=${this._stopLongPress}
            @pointerleave=${this._stopLongPress}
            @pointercancel=${this._stopLongPress}
            aria-label="Setpoint erhöhen"
          >
            +
          </button>
        </div>
      </div>
    `;
  }

  // ---- Cover control (up / stop / down) --------------------------------
  private _renderCoverControl(): TemplateResult {
    const pos = this._coverPosition;
    const posLabel = formatCoverPosition(pos);

    return html`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Rolladen</span>
          <span class="val">${posLabel}</span>
        </div>
        <div class="cover-controls">
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverOpen}
            aria-label="Rolladen hoch"
          >
            ${COVER_UP_SVG}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverStop}
            aria-label="Rolladen stop"
          >
            ${COVER_STOP_SVG}
          </button>
          <button
            class="cover-btn"
            type="button"
            @click=${this._coverClose}
            aria-label="Rolladen runter"
          >
            ${COVER_DOWN_SVG}
          </button>
        </div>
      </div>
    `;
  }

  // ---- Switch list -----------------------------------------------------
  private _renderSwitches(): TemplateResult {
    return html`
      <div class="control-group">
        <div class="control-label">
          <span class="key">Schalten</span>
        </div>
        <div class="switch-list">
          ${this._config.switches!.map((sw) => {
            const state = this.hass.states[sw.entity];
            const isOn = state?.state === 'on';
            const label = sw.name || (state?.attributes.friendly_name as string) || sw.entity;
            return html`
              <button
                class="switch-pill ${isOn ? 'on' : ''}"
                type="button"
                @click=${() => this._toggleSwitch(sw.entity)}
              >
                <span class="switch-name">${label}</span>
                <svg class="switch-power-ico" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.26 1.08-4.26 2.75-5.53L6.17 5.05A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0 8.93 8.93 0 0 0-3.17-6.83z"
                  />
                </svg>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  // ============================================================
  // EVENT HANDLERS
  // ============================================================

  private _toggleExpand = (): void => {
    this._expanded = !this._expanded;
  };

  // ---- Light -----------------------------------------------------------
  private _toggleLight = (): void => {
    if (!this._config.light_entity) return;
    this.hass.callService('light', 'toggle', {
      entity_id: this._config.light_entity,
    });
  };

  // ---- Slider (pointer-based drag) -------------------------------------
  private _onSliderPointerDown = (e: PointerEvent): void => {
    e.preventDefault();
    const slider = e.currentTarget as HTMLElement;
    this._activePointerId = e.pointerId;
    slider.setPointerCapture(e.pointerId);
    this._isDraggingSlider = true;
    this._updateBrightnessFromPointer(e);
  };

  private _onSliderPointerMove = (e: PointerEvent): void => {
    if (!this._isDraggingSlider) return;
    if (this._activePointerId !== e.pointerId) return;
    this._updateBrightnessFromPointer(e);
  };

  private _onSliderPointerUp = (e: PointerEvent): void => {
    if (this._activePointerId !== e.pointerId) return;
    const slider = e.currentTarget as HTMLElement;
    try {
      slider.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    this._isDraggingSlider = false;
    this._activePointerId = null;

    // Commit the draft brightness to HA
    if (this._draftBrightness !== null) {
      this._commitBrightness(this._draftBrightness);
      this._draftBrightness = null;
    }
  };

  private _updateBrightnessFromPointer(e: PointerEvent): void {
    const slider = e.currentTarget as HTMLElement;
    const rect = slider.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    this._draftBrightness = Math.round(pct);
  }

  private _commitBrightness(pct: number): void {
    if (!this._config.light_entity) return;
    if (pct === 0) {
      this.hass.callService('light', 'turn_off', {
        entity_id: this._config.light_entity,
      });
      return;
    }
    const brightness = Math.round((pct / 100) * 255);
    this.hass.callService('light', 'turn_on', {
      entity_id: this._config.light_entity,
      brightness,
    });
  }

  // ---- Climate stepper -------------------------------------------------
  private _adjustSetpoint = (delta: number): void => {
    if (!this._config.climate_entity || !this._climateState) return;
    const current = (this._climateState.attributes.temperature as number) ?? 20;
    const min = (this._climateState.attributes.min_temp as number) ?? 7;
    const max = (this._climateState.attributes.max_temp as number) ?? 35;
    const next = Math.max(min, Math.min(max, current + delta));
    if (next === current) return;
    this.hass.callService('climate', 'set_temperature', {
      entity_id: this._config.climate_entity,
      temperature: next,
    });
  };

  private _startLongPress = (delta: number): void => {
    this._stopLongPress();
    this._longPressTimer = window.setTimeout(() => {
      this._longPressInterval = window.setInterval(() => {
        this._adjustSetpoint(delta);
      }, 140);
    }, 400);
  };

  private _stopLongPress = (): void => {
    if (this._longPressTimer) {
      clearTimeout(this._longPressTimer);
      this._longPressTimer = undefined;
    }
    if (this._longPressInterval) {
      clearInterval(this._longPressInterval);
      this._longPressInterval = undefined;
    }
  };

  // ---- Cover -----------------------------------------------------------
  private _coverOpen = (): void => {
    if (!this._config.cover_entity) return;
    this.hass.callService('cover', 'open_cover', {
      entity_id: this._config.cover_entity,
    });
  };

  private _coverClose = (): void => {
    if (!this._config.cover_entity) return;
    this.hass.callService('cover', 'close_cover', {
      entity_id: this._config.cover_entity,
    });
  };

  private _coverStop = (): void => {
    if (!this._config.cover_entity) return;
    this.hass.callService('cover', 'stop_cover', {
      entity_id: this._config.cover_entity,
    });
  };

  // ---- Switches & Quick-access -----------------------------------------
  private _toggleSwitch(entityId: string): void {
    this.hass.callService(domainOf(entityId), 'toggle', { entity_id: entityId });
  }

  private _handleQuickAccess = (): void => {
    const qa = this._config.quick_access;
    if (!qa) return;
    const domain = domainOf(qa.entity);
    const action = qa.tap_action || 'toggle';
    this.hass.callService(domain, action, { entity_id: qa.entity });
  };

  // ---- Lifecycle cleanup -----------------------------------------------
  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopLongPress();
  }

  // ============================================================
  // STYLES
  // ============================================================

  static styles = css`
    ${monolithTokens}

    .layr-room {
      background: var(--mn-bg);
      border-radius: 22px;
      box-shadow: var(--mn-shadow-out);
      padding: 22px;
      transition: box-shadow 0.3s var(--ease);
      overflow: hidden;
      position: relative;
      color: var(--mn-text);
      border: none;
    }

    .layr-room.active {
      box-shadow: var(--mn-shadow-in);
    }

    .layr-room.read-only {
      padding-bottom: 26px;
    }

    .layr-room.read-only::after {
      content: '';
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 14px;
      height: 4px;
      background:
        radial-gradient(circle, var(--mn-bg-dark) 1.2px, transparent 1.4px),
        radial-gradient(circle, var(--mn-bg-dark) 1.2px, transparent 1.4px),
        radial-gradient(circle, var(--mn-bg-dark) 1.2px, transparent 1.4px);
      background-size: 5px 5px;
      background-position:
        0 0,
        5px 0,
        10px 0;
      background-repeat: no-repeat;
      opacity: 0.4;
    }

    /* ===== TOP ROW ===== */
    .row-top {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 20px;
    }

    .room-header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }

    .icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-text-mid);
      transition: box-shadow 0.5s var(--ease);
      flex-shrink: 0;
    }

    .room-svg {
      width: 22px;
      height: 22px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition:
        stroke 0.4s var(--ease),
        filter 0.4s var(--ease);
    }

    .room-svg .filled {
      fill: currentColor;
      stroke: none;
    }

    .layr-room.active .icon {
      box-shadow:
        0 0 calc(var(--brightness, 0.8) * 12px) var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .layr-room.active .room-svg {
      stroke: var(--mn-accent);
      filter: drop-shadow(0 0 2px var(--mn-accent-glow));
    }

    .name-rest {
      font-family: 'Fraunces', serif;
      font-size: 22px;
      font-weight: 500;
      color: var(--mn-text);
      letter-spacing: -0.005em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
      line-height: 1.05;
    }

    .status-col {
      flex-shrink: 0;
    }

    /* ===== STATS AREA ===== */
    .stats-area {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
      position: relative;
      z-index: 1;
    }

    .stats {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      gap: 0;
    }

    .temp-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .humidity-block {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 36px;
      padding-bottom: 1px;
    }

    .value-primary {
      font-family: 'Fraunces', serif;
      font-size: 26px;
      font-weight: 300;
      color: var(--mn-text);
      letter-spacing: -0.02em;
      line-height: 1.05;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    }

    .value-secondary {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      font-weight: 400;
      color: var(--mn-text-mid);
      letter-spacing: 0.01em;
      margin-top: 4px;
      line-height: 1;
    }

    .value-secondary .sec-label {
      opacity: 0.7;
      margin-right: 3px;
    }

    .humidity-value {
      font-family: 'Fraunces', serif;
      font-size: 18px;
      font-weight: 400;
      color: var(--mn-text);
      line-height: 1;
      letter-spacing: -0.01em;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    }

    .humidity-label {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      font-weight: 400;
      color: var(--mn-text-mid);
      letter-spacing: 0.01em;
      margin-top: 4px;
      line-height: 1;
      opacity: 0.85;
    }

    /* ===== QUICK ACCESS ===== */
    .quick-access {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .quick-btn {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-dim);
      transition:
        background 0.3s var(--ease),
        color 0.3s var(--ease),
        box-shadow 0.3s var(--ease),
        transform 0.12s var(--ease);
      -webkit-tap-highlight-color: transparent;
      padding: 0;
    }

    .quick-btn:active {
      transform: scale(0.94);
    }

    .quick-btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .quick-access.on .quick-btn {
      background: radial-gradient(circle at 30% 30%, var(--mn-accent-light), var(--mn-accent));
      color: var(--mn-bg-light);
      box-shadow:
        0 0 14px var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .quick-label {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      color: var(--mn-text-mid);
      letter-spacing: 0.01em;
      transition: color 0.3s var(--ease);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
      text-align: center;
      line-height: 1;
    }

    .quick-access.on .quick-label {
      color: var(--mn-accent);
    }

    /* ===== EXPAND HANDLE ===== */
    .expand-handle {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 4px;
      border-radius: 2px;
      background: var(--mn-bg-dark);
      box-shadow: 0 1px 0 var(--mn-bg-light);
      opacity: 0.4;
      cursor: pointer;
      transition:
        opacity 0.2s,
        background 0.2s,
        width 0.3s var(--ease);
    }

    .layr-room:hover .expand-handle {
      opacity: 0.7;
      width: 44px;
    }

    .layr-room.expanded .expand-handle {
      background: var(--mn-accent);
      opacity: 0.6;
      width: 44px;
    }

    /* ===== CONTROLS ===== */
    .controls {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s var(--ease);
    }

    .layr-room.expanded .controls {
      max-height: 900px;
    }

    .controls-inner {
      padding-top: 18px;
      margin-top: 16px;
      box-shadow: 0 -1px 0 var(--mn-bg-dark);
      opacity: 0;
      transform: translateY(-6px);
      transition:
        opacity 0.3s var(--ease) 0.1s,
        transform 0.3s var(--ease) 0.1s;
    }

    .layr-room.expanded .controls-inner {
      opacity: 1;
      transform: translateY(0);
    }

    .control-group {
      margin-bottom: 18px;
    }

    .control-group:last-child {
      margin-bottom: 6px;
    }

    .control-label {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 10px;
    }

    .control-label .key {
      font-size: 9px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--mn-text-mid);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
    }

    .control-label .val {
      font-family: 'Fraunces', serif;
      font-size: 18px;
      color: var(--mn-text);
      font-weight: 400;
      letter-spacing: -0.02em;
    }

    /* ===== SLIDER ===== */
    .slider {
      position: relative;
      height: 12px;
      background: var(--mn-bg);
      border-radius: 6px;
      box-shadow: var(--mn-shadow-in);
      cursor: pointer;
      touch-action: none;
      flex: 1;
    }

    .slider-fill {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: linear-gradient(90deg, var(--mn-accent), var(--mn-accent-light));
      border-radius: 6px;
      box-shadow: 0 0 8px var(--mn-accent-glow);
      transition: width 0.15s var(--ease-out);
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, var(--mn-bg-light), var(--mn-bg));
      box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.15),
        -1px -1px 3px var(--mn-bg-light),
        1px 1px 3px var(--mn-bg-dark);
      transform: translate(-50%, -50%);
      transition:
        left 0.15s var(--ease-out),
        transform 0.15s var(--ease-out);
      cursor: grab;
    }

    .slider-thumb::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--mn-accent);
      transform: translate(-50%, -50%);
      box-shadow: 0 0 4px var(--mn-accent-glow);
    }

    .slider.dragging .slider-thumb {
      transform: translate(-50%, -50%) scale(1.15);
      cursor: grabbing;
    }

    .slider.dragging .slider-fill,
    .slider.dragging .slider-thumb {
      transition: none;
    }

    .control-group.light-off .slider-fill {
      background: var(--mn-bg-dark);
      box-shadow: none;
    }

    .light-toggle-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* ===== POWER BUTTON ===== */
    .power-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-dim);
      transition: all 0.2s var(--ease);
      flex-shrink: 0;
    }

    .power-btn:active {
      transform: scale(0.94);
    }

    .power-btn.on {
      background: radial-gradient(circle at 30% 30%, var(--mn-accent-light), var(--mn-accent));
      color: var(--mn-bg-light);
      box-shadow:
        0 0 12px var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .power-btn svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    /* ===== STEPPER ===== */
    .stepper {
      display: grid;
      grid-template-columns: 48px 1fr 48px;
      align-items: center;
      gap: 14px;
    }

    .step-btn {
      width: 48px;
      height: 48px;
      border-radius: 16px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-mid);
      font-family: 'Fraunces', serif;
      font-size: 24px;
      font-weight: 300;
      transition: all 0.15s var(--ease);
      -webkit-tap-highlight-color: transparent;
    }

    .step-btn:hover {
      color: var(--mn-accent);
    }

    .step-btn:active {
      box-shadow: var(--mn-shadow-in);
      transform: scale(0.96);
    }

    .step-display {
      text-align: center;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-in);
      border-radius: 14px;
      padding: 12px 0;
    }

    .step-display .num {
      font-family: 'Fraunces', serif;
      font-size: 28px;
      font-weight: 400;
      color: var(--mn-text);
      letter-spacing: -0.02em;
      line-height: 1;
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.4);
    }

    .step-display .unit {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 13px;
      color: var(--mn-text-mid);
      margin-left: 2px;
    }

    /* ===== COVER CONTROLS ===== */
    .cover-controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
    }

    .cover-btn {
      height: 44px;
      border-radius: 14px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border: none;
      cursor: pointer;
      display: grid;
      place-items: center;
      color: var(--mn-text-mid);
      transition: all 0.15s var(--ease);
      -webkit-tap-highlight-color: transparent;
    }

    .cover-btn:hover {
      color: var(--mn-accent);
    }

    .cover-btn:active {
      box-shadow: var(--mn-shadow-in);
      transform: scale(0.97);
      color: var(--mn-accent);
    }

    .cover-btn svg {
      width: 18px;
      height: 18px;
    }

    /* ===== SWITCH PILLS ===== */
    .switch-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .switch-pill {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 44px;
      padding: 0 18px 0 20px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      border-radius: 14px;
      border: none;
      cursor: pointer;
      font-family: 'Geist', 'Inter', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: var(--mn-text);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
      transition:
        background 0.3s var(--ease),
        color 0.3s var(--ease),
        box-shadow 0.3s var(--ease),
        transform 0.12s var(--ease);
      -webkit-tap-highlight-color: transparent;
    }

    .switch-pill:active {
      transform: scale(0.98);
    }

    .switch-name {
      text-align: left;
      letter-spacing: -0.005em;
    }

    .switch-power-ico {
      width: 14px;
      height: 14px;
      fill: var(--mn-text-dim);
      flex-shrink: 0;
      transition: fill 0.3s var(--ease);
    }

    .switch-pill.on {
      background: radial-gradient(circle at 30% 30%, var(--mn-accent-light), var(--mn-accent));
      color: var(--mn-bg-light);
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
      box-shadow:
        0 0 14px var(--mn-accent-glow),
        var(--mn-shadow-out-sm);
    }

    .switch-pill.on .switch-power-ico {
      fill: var(--mn-bg-light);
    }
  `;
}

// ============================================================================
// LOVELACE CARD REGISTRATION
// ============================================================================

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
  interface HTMLElementTagNameMap {
    'layr-room-card': LayrRoomCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'layr-room-card',
  name: 'Layr Room Card',
  description: 'Premium room card with the Monolith design aesthetic',
  preview: true,
});

console.info(
  '%c LAYR-ROOM-CARD %c v0.1.0 ',
  'color: white; background: #b8743a; font-weight: bold;',
  'color: #b8743a; background: white; font-weight: bold;'
);
