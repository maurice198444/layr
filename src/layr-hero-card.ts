/**
 * Layr Hero Card
 *
 * A featured-value display for a single entity, rendered in the Monolith
 * aesthetic: a large Fraunces value on a sculpted cream surface, an optional
 * secondary value, and an optional sparkline drawn from recorder history.
 *
 * Author: Maurice Stockfleth
 * Repository: github.com/maurice198444/layr
 */

import { type HomeAssistant, type LovelaceCardConfig } from 'custom-card-helpers';
import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { ensureLayrFonts } from './shared/fonts';
import { formatGermanNumber, isUnavailable, toNumber } from './shared/format';
import { fetchNumericHistory, fireMoreInfo } from './shared/ha';
import { GLYPH_ICONS } from './shared/icons';
import { monolithTokens } from './shared/tokens';

// ============================================================================
// TYPES
// ============================================================================

export interface LayrHeroCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
  name?: string;
  icon?: keyof typeof GLYPH_ICONS | string;
  unit?: string;
  decimals?: number;
  secondary_entity?: string;
  secondary_name?: string;
  sparkline?: boolean;
  hours?: number;
  tap_action?: 'more-info' | 'none';
}

const SPARKLINE_REFRESH_MS = 120_000;
const DEFAULT_HOURS = 24;

// ============================================================================
// HELPERS
// ============================================================================

/** Format an entity's raw state for display, honoring config overrides. */
const formatValue = (raw: string | undefined, decimals?: number): string => {
  if (isUnavailable(raw)) return '—';
  const n = toNumber(raw);
  if (n === null) return raw as string; // text sensor — show as-is
  const places = decimals ?? (Number.isInteger(n) ? 0 : 1);
  return formatGermanNumber(n, places);
};

/** Build an SVG polyline `points` string from a numeric series. */
const sparklinePoints = (series: number[], width = 100, height = 32, pad = 2): string => {
  if (series.length < 2) return '';
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const innerH = height - pad * 2;
  return series
    .map((v, i) => {
      const x = (i / (series.length - 1)) * width;
      const y = height - pad - ((v - min) / span) * innerH;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

@customElement('layr-hero-card')
export class LayrHeroCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: LayrHeroCardConfig;
  @state() private _history: number[] = [];

  private _refreshTimer?: number;
  private _lastFetchedEntity?: string;

  constructor() {
    super();
    ensureLayrFonts();
  }

  // ---- Lovelace hooks ---------------------------------------------------
  public setConfig(config: LayrHeroCardConfig): void {
    if (!config || !config.entity) {
      throw new Error('Layr Hero Card: "entity" is required');
    }
    this._config = { ...config };
    // Force a refetch on the next update when the watched entity changes.
    this._lastFetchedEntity = undefined;
  }

  public getCardSize(): number {
    return this._config?.sparkline ? 3 : 2;
  }

  public static getStubConfig(): Partial<LayrHeroCardConfig> {
    return { entity: '', sparkline: true };
  }

  // ---- Lifecycle --------------------------------------------------------
  public connectedCallback(): void {
    super.connectedCallback();
    if (this._config?.sparkline) {
      this._refreshTimer = window.setInterval(
        () => this._loadHistory(true),
        SPARKLINE_REFRESH_MS,
      );
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this._refreshTimer = undefined;
    }
  }

  protected updated(): void {
    if (!this.hass || !this._config?.sparkline) return;
    if (this._lastFetchedEntity !== this._config.entity) {
      this._loadHistory(false);
    }
  }

  private async _loadHistory(force: boolean): Promise<void> {
    if (!this.hass || !this._config?.sparkline) return;
    const entity = this._config.entity;
    if (!force && this._lastFetchedEntity === entity) return;
    this._lastFetchedEntity = entity;
    const hours = this._config.hours ?? DEFAULT_HOURS;
    this._history = await fetchNumericHistory(this.hass, entity, hours);
  }

  // ---- Derived state ----------------------------------------------------
  private get _entity() {
    return this.hass?.states[this._config.entity];
  }

  private get _unit(): string {
    return (
      this._config.unit ??
      (this._entity?.attributes.unit_of_measurement as string | undefined) ??
      ''
    );
  }

  private get _label(): string {
    return (
      this._config.name ??
      (this._entity?.attributes.friendly_name as string | undefined) ??
      this._config.entity
    );
  }

  // ---- Interaction ------------------------------------------------------
  private _handleTap = (): void => {
    if (this._config.tap_action === 'none') return;
    fireMoreInfo(this, this._config.entity);
  };

  // ============================================================
  // RENDER
  // ============================================================

  protected render(): TemplateResult {
    if (!this._config || !this.hass) return html``;

    const iconKey = (this._config.icon as keyof typeof GLYPH_ICONS) || 'default';
    const iconTpl = GLYPH_ICONS[iconKey] ?? GLYPH_ICONS.default;
    const interactive = this._config.tap_action !== 'none';

    const value = formatValue(this._entity?.state, this._config.decimals);
    const unit = this._unit;

    return html`
      <ha-card
        class="layr-hero ${interactive ? 'interactive' : ''}"
        @click=${this._handleTap}
        role=${interactive ? 'button' : nothing}
        tabindex=${interactive ? '0' : nothing}
        @keydown=${this._onKeydown}
      >
        <div class="hero-head">
          <div class="icon">${iconTpl}</div>
          <div class="label">${this._label}</div>
        </div>

        <div class="hero-value">
          <span class="num">${value}</span>
          ${unit ? html`<span class="unit">${unit}</span>` : nothing}
        </div>

        ${this._renderSecondary()} ${this._renderSparkline()}
      </ha-card>
    `;
  }

  private _onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleTap();
    }
  };

  private _renderSecondary(): TemplateResult | typeof nothing {
    const id = this._config.secondary_entity;
    if (!id) return nothing;
    const state = this.hass.states[id];
    const value = formatValue(state?.state);
    const unit = (state?.attributes.unit_of_measurement as string | undefined) ?? '';
    const label =
      this._config.secondary_name ??
      (state?.attributes.friendly_name as string | undefined) ??
      '';

    return html`
      <div class="hero-secondary">
        ${label ? html`<span class="sec-label">${label}</span>` : nothing}
        <span class="sec-num">${value}${unit ? html` ${unit}` : nothing}</span>
      </div>
    `;
  }

  private _renderSparkline(): TemplateResult | typeof nothing {
    if (!this._config.sparkline) return nothing;
    const points = sparklinePoints(this._history);
    if (!points) return nothing;

    return html`
      <div class="hero-spark">
        <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
          <polyline points=${points} />
        </svg>
      </div>
    `;
  }

  static styles = css`
    ${monolithTokens}

    .layr-hero {
      background: var(--mn-bg);
      border: none;
      border-radius: 22px;
      box-shadow: var(--mn-shadow-out);
      padding: 22px;
      color: var(--mn-text);
      overflow: hidden;
      transition:
        box-shadow 0.3s var(--ease),
        transform 0.12s var(--ease);
    }

    .layr-hero.interactive {
      cursor: pointer;
    }

    .layr-hero.interactive:active {
      box-shadow: var(--mn-shadow-in);
      transform: scale(0.995);
    }

    .layr-hero:focus-visible {
      outline: 2px solid var(--mn-accent);
      outline-offset: 3px;
    }

    /* ===== HEAD ===== */
    .hero-head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 18px;
    }

    .icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--mn-bg);
      box-shadow: var(--mn-shadow-out-sm);
      display: grid;
      place-items: center;
      color: var(--mn-accent);
      flex-shrink: 0;
    }

    .glyph-svg {
      width: 21px;
      height: 21px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .glyph-svg .filled {
      fill: currentColor;
      stroke: none;
    }

    .label {
      font-family: 'Geist', 'Inter', system-ui, sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--mn-text-mid);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* ===== VALUE ===== */
    .hero-value {
      display: flex;
      align-items: baseline;
      gap: 6px;
      line-height: 1;
    }

    .hero-value .num {
      font-family: 'Fraunces', serif;
      font-size: 52px;
      font-weight: 300;
      letter-spacing: -0.02em;
      color: var(--mn-text);
      text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
    }

    .hero-value .unit {
      font-family: 'Fraunces', serif;
      font-size: 20px;
      font-weight: 400;
      color: var(--mn-text-mid);
    }

    /* ===== SECONDARY ===== */
    .hero-secondary {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-top: 10px;
    }

    .hero-secondary .sec-label {
      font-family: 'Fraunces', serif;
      font-style: italic;
      font-size: 12px;
      color: var(--mn-text-dim);
      letter-spacing: 0.01em;
    }

    .hero-secondary .sec-num {
      font-family: 'Fraunces', serif;
      font-size: 14px;
      color: var(--mn-text-mid);
    }

    /* ===== SPARKLINE ===== */
    .hero-spark {
      margin-top: 18px;
      height: 40px;
    }

    .hero-spark svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    .hero-spark polyline {
      fill: none;
      stroke: var(--mn-accent);
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
      filter: drop-shadow(0 0 2px var(--mn-accent-glow));
    }
  `;
}

// ============================================================================
// LOVELACE CARD REGISTRATION
// ============================================================================

declare global {
  interface HTMLElementTagNameMap {
    'layr-hero-card': LayrHeroCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'layr-hero-card',
  name: 'Layr Hero Card',
  description: 'Featured value display with optional sparkline, in the Monolith aesthetic',
  preview: true,
});
