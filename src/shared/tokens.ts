/**
 * Layr — Monolith design tokens
 *
 * The shared visual language for every Layr card: warm cream surfaces,
 * tobacco accent, neumorphic shadows, and the project easing curves.
 * Cards include this in their `static styles` so the whole pack stays
 * visually consistent.
 *
 *   static styles = css`
 *     ${monolithTokens}
 *     .my-card { ... }
 *   `;
 */

import { css } from 'lit';

export const monolithTokens = css`
  :host {
    --mn-bg: #e6e1d8;
    --mn-bg-light: #f3eee5;
    --mn-bg-dark: #cdc5b8;
    --mn-text: #2d2820;
    --mn-text-mid: #6d6759;
    --mn-text-dim: #a39d8f;
    --mn-text-off: #c0b8a8;
    --mn-accent: #b8743a;
    --mn-accent-light: #d6904b;
    --mn-accent-glow: rgba(184, 116, 58, 0.5);

    --mn-shadow-out: -7px -7px 16px var(--mn-bg-light), 7px 7px 16px var(--mn-bg-dark);
    --mn-shadow-out-sm: -3px -3px 8px var(--mn-bg-light), 3px 3px 8px var(--mn-bg-dark);
    --mn-shadow-in: inset -4px -4px 10px var(--mn-bg-light), inset 4px 4px 10px var(--mn-bg-dark);

    --ease: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

    display: block;
    font-family: 'Geist', 'Inter', system-ui, sans-serif;
  }
`;
