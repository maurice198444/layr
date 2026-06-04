/**
 * Layr — hand-drawn iconography
 *
 * Every Layr icon is drawn for the pack. No FontAwesome, no Material Icons.
 * Icons are plain inline SVG `TemplateResult`s; cards style them via the
 * `.room-svg` class (stroke, fill, etc.) from their own stylesheet.
 */

import { html, type TemplateResult } from 'lit';

export const ROOM_ICONS = {
  door: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <circle class="filled" cx="13.5" cy="12" r="0.9" />
    </svg>
  `,
  pot: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <line x1="3" y1="11" x2="21" y2="11" />
      <circle cx="12" cy="8" r="1.2" />
      <path d="M5 11v6.5a2.5 2.5 0 0 0 2.5 2.5h9a2.5 2.5 0 0 0 2.5-2.5v-6.5" />
      <path d="M5 13.5h-1.7M19 13.5h1.7" />
    </svg>
  `,
  sofa: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M5 12c0-2 1.4-3.2 3.2-3.2h7.6c1.8 0 3.2 1.2 3.2 3.2" />
      <path d="M5 12v4M3.5 12.5v3.5" />
      <path d="M19 12v4M20.5 12.5v3.5" />
      <path d="M3.5 16h17v2.2H3.5z" />
      <line x1="12" y1="12.5" x2="12" y2="16" />
      <path d="M5 18.2v1.6M19 18.2v1.6" />
    </svg>
  `,
  bed: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 18v-7c0-1 1-2 2-2h14c1 0 2 1 2 2v7" />
      <path d="M3 14h18" />
      <path d="M6 11h4v3H6z" />
      <path d="M3 18v2M21 18v2" />
    </svg>
  `,
  bath: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 12h18v3c0 1.5-1 3-3 3H6c-2 0-3-1.5-3-3v-3z" />
      <path d="M5 12V6.5a2.5 2.5 0 0 1 5 0" />
      <circle class="filled" cx="10" cy="8" r="0.9" />
      <path d="M5 18v2M19 18v2" />
    </svg>
  `,
  desk: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 10h18v2H3z" />
      <path d="M5 12v9M19 12v9" />
      <path d="M5 17h14" />
      <path d="M9 7v3M9 7h4M13 7v-3" />
    </svg>
  `,
  toilet: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M6 4h12v6H6z" />
      <path d="M6 10c0 3 1 5 3 6h6c2-1 3-3 3-6" />
      <path d="M9 16v4M15 16v4" />
    </svg>
  `,
  garden: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M12 3v18" />
      <path d="M12 7c-2-2-5-2-7 0 0 3 3 5 7 5" />
      <path d="M12 11c-2-2-5-1-6 1 0 3 3 4 6 3" />
      <path d="M12 7c2-2 5-2 7 0 0 3-3 5-7 5" />
    </svg>
  `,
  garage: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-6 9 6v9H3z" />
      <path d="M3 14h18M3 17h18" />
    </svg>
  `,
  default: html`
    <svg class="room-svg" viewBox="0 0 24 24">
      <path d="M3 11l9-7 9 7v9c0 1-1 1-1 1H4s-1 0-1-1z" />
    </svg>
  `,
} as const satisfies Record<string, TemplateResult>;

export type RoomIconName = keyof typeof ROOM_ICONS;

/**
 * Generic measurement glyphs for value-oriented cards (Hero, Stat, …).
 * Drawn in the same thin-line style as the room icons; cards apply the
 * stroke/fill via their own `.glyph-svg` rules.
 */
export const GLYPH_ICONS = {
  bolt: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path class="filled" d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  `,
  drop: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
    </svg>
  `,
  thermometer: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M12 4a2 2 0 0 1 2 2v7.5a4 4 0 1 1-4 0V6a2 2 0 0 1 2-2z" />
      <circle class="filled" cx="12" cy="17" r="2.2" />
    </svg>
  `,
  gauge: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M12 16l4-4" />
      <circle class="filled" cx="12" cy="16" r="1.2" />
    </svg>
  `,
  leaf: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13z" />
      <path d="M8 16c3-4 6-6 9-7" />
    </svg>
  `,
  sun: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <circle class="filled" cx="12" cy="12" r="3.5" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  `,
  drops: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <path d="M8 4c2.5 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1.5-4 4-7z" />
      <path class="filled" d="M17 12c1.4 1.7 2 2.8 2 3.8a2 2 0 0 1-4 0c0-1 .6-2.1 2-3.8z" />
    </svg>
  `,
  default: html`
    <svg class="glyph-svg" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  `,
} as const satisfies Record<string, TemplateResult>;

export type GlyphIconName = keyof typeof GLYPH_ICONS;

