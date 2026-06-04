# Changelog

All notable changes to Layr will be documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Layr Hero Card** — a featured-value display for a single entity.
  - Large Fraunces headline value with auto-formatted unit and German decimal notation
  - Optional secondary value with its own label
  - Optional sparkline drawn from recorder history (lazy fetch, auto-scaled, refreshed every 2 minutes, hidden when no data)
  - Custom hand-drawn measurement glyphs: bolt, thermometer, drop, drops, gauge, leaf, sun, default
  - Tap to open more-info (configurable via `tap_action`, keyboard accessible)
- Shared `src/shared/` design system extracted from the Room Card — Monolith tokens, hand-drawn icons, formatting helpers, and HA utilities — so cards share one visual language.
- Fraunces/Geist web fonts are now loaded automatically by the cards.
- Multi-card build: `src/layr.ts` is the single bundle entry that registers every card.

## [0.1.0] — 2026-06-04

### Added

- **Layr Room Card** — first release of the adaptive room card.
  - Temperature display with target temperature annotation
  - Humidity readout as separate block
  - Quick-access button (configurable entity, toggle/turn_on/turn_off actions)
  - Expandable controls panel with:
    - Light slider + power button (auto-detects dimming support)
    - Climate setpoint stepper with long-press
    - Cover/blind controls (up/stop/down) with live position
    - Switch pills for room devices
  - Custom hand-drawn SVG icons for 10 room types: door, pot, sofa, bed, bath, desk, toilet, garden, garage, default
  - Adaptive section rendering based on configured entities
  - Read-only mode when no controllable entities configured
- Build system (Vite + TypeScript)
- Deploy script for direct HA mount copy
- MIT license

### Notes

This is the initial release. Functional but not yet on HACS. Manual installation only.

[Unreleased]: https://github.com/maurice198444/layr/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/maurice198444/layr/releases/tag/v0.1.0
