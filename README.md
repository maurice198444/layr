# Layr

> Distinctive Home Assistant cards. Built like furniture.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)](https://github.com/maurice198444/layr/releases)
[![hacs_custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

A premium card pack for Home Assistant with the **Monolith** design aesthetic — neumorphic surfaces, editorial typography, and a focus on craftsmanship over feature-quantity.

<p align="center">
  <img src="docs/preview.png" alt="Layr Room Card" width="380">
</p>

---

## Why Layr?

Most Home Assistant custom cards optimize for flexibility — endless config options, every conceivable use case, generic Material icons. The result is dashboards that work but look like control panels.

Layr takes a different approach: **fewer cards, designed with intent.** Each card has a strong visual identity, custom-drawn iconography, and considered interaction patterns. Like furniture — you don't need fifty chairs, you need one that feels right.

The first release ships with the **Room Card** — a single adaptive card that handles temperature, humidity, lights, climate, blinds, and switches for an entire room. Sections render conditionally based on which entities you configure, so the same component works for a sensor-only hallway and a fully controllable living room.

---

## The Room Card

### What it does

- **Temperature display** with target temperature annotation (italic Fraunces serif)
- **Humidity readout** as secondary block, sized between primary and annotation
- **Quick-access button** in the header — configurable to toggle any entity
- **Expandable controls** that slide out beneath the header:
  - Light brightness slider (auto-detects whether your light supports dimming)
  - Climate setpoint stepper with long-press for rapid adjustment
  - Cover/blind controls (up · stop · down) with live position display
  - Switch pills for room devices (outlets, fans, etc.)
- **Custom hand-drawn icons** for common room types — no Material Icons
- **Adaptive rendering** — sections appear only for configured entities

### What makes it different

Most HA cards are functional. The Room Card aims to be **considered** — every shadow, transition, and typographic choice is deliberate. The visual style draws from neumorphism but pulls it toward a warmer, more editorial palette (tobacco accent, cream surfaces, Fraunces serif for numerical values).

It's the card I wanted for my own setup and couldn't find.

---

## Installation

### Via HACS (coming soon)

> HACS Custom Repository support is planned for v0.2.0. Until then, install manually.

### Manual

1. Download the latest `layr.js` from the [releases page](https://github.com/maurice198444/layr/releases)
2. Place it in your Home Assistant config directory at:
   ```
   /config/www/community/layr/layr.js
   ```
3. Register it as a Lovelace resource:
   - **Settings → Dashboards → ⋮ (top right) → Resources → Add Resource**
   - URL: `/local/community/layr/layr.js`
   - Type: **JavaScript Module**
4. Hard-refresh your browser (`Ctrl+Shift+R`)
5. Add the card via the dashboard editor (see configuration below)

---

## Configuration

### Minimal example

```yaml
type: custom:layr-room-card
name: Diele
icon: door
temperature_entity: sensor.diele_temperature
```

### Full example

```yaml
type: custom:layr-room-card
name: Wohnzimmer
icon: sofa
temperature_entity: sensor.wohnzimmer_temperature
humidity_entity: sensor.wohnzimmer_humidity
light_entity: light.wohnzimmer_decke
climate_entity: climate.wohnzimmer
cover_entity: cover.wohnzimmer_rolladen
quick_access:
  entity: switch.luefter
  name: Lüfter
  tap_action: toggle
switches:
  - entity: switch.aussenlampe
    name: Außenlampe
  - entity: switch.steckdose_couch
    name: Steckdose Couch
```

### Configuration options

| Option | Type | Required | Description |
|---|---|:---:|---|
| `type` | string | ✓ | Must be `custom:layr-room-card` |
| `name` | string | | Room name displayed in the header |
| `icon` | string | | Room icon — see list below |
| `temperature_entity` | string | | Temperature sensor entity ID |
| `humidity_entity` | string | | Humidity sensor entity ID |
| `light_entity` | string | | Light entity (auto-detects dimming support) |
| `climate_entity` | string | | Climate/thermostat entity ID |
| `cover_entity` | string | | Cover/blind entity ID |
| `quick_access` | object | | Quick-access button config (see below) |
| `switches` | array | | List of switch entities to control |

### Quick-access object

| Option | Type | Required | Description |
|---|---|:---:|---|
| `entity` | string | ✓ | Entity to toggle (switch, light, automation, etc.) |
| `name` | string | | Label below the button (defaults to `friendly_name`) |
| `tap_action` | string | | `toggle` (default), `turn_on`, or `turn_off` |

### Switches array item

| Option | Type | Required | Description |
|---|---|:---:|---|
| `entity` | string | ✓ | Switch entity ID |
| `name` | string | | Display label (defaults to `friendly_name`) |

### Available room icons

| Value | Symbol |
|---|---|
| `door` | Door (entryway/hallway) |
| `pot` | Cooking pot (kitchen) |
| `sofa` | Sofa (living room) |
| `bed` | Bed (bedroom) |
| `bath` | Bathtub (bathroom) |
| `desk` | Desk with lamp (office) |
| `toilet` | Toilet |
| `garden` | Plant (garden/balcony) |
| `garage` | Garage |
| `default` | House (fallback) |

More icons will be added as the pack grows.

---

## Free vs Premium

Layr Free ships with a curated set of cards under the MIT license, free forever. A Premium tier is planned for late 2026 with additional cards, style packs, and an AI-powered dashboard generator.

| | Free | Premium |
|---|:---:|:---:|
| **Room Card** — adaptive multi-section card | ✓ | ✓ |
| **Hero Card** — featured value display | *planned* | ✓ |
| **Stat Window** — sensor with sparkline | *planned* | ✓ |
| **Ticker Card** — scrolling notifications | *planned* | ✓ |
| **Divider Card** — typographic section breaks | *planned* | ✓ |
| Updates to free cards (forever) | ✓ | ✓ |
| Battery Dial Card | | ✓ |
| Light Card (dedicated dimmer) | | ✓ |
| Climate Card (dedicated) | | ✓ |
| Media Player Card | | ✓ |
| Cover Card (dedicated) | | ✓ |
| Calendar Card | | ✓ |
| Energy Flow Card | | ✓ |
| Camera Card | | ✓ |
| Scene Knobs Card | | ✓ |
| Style Packs (Editorial · Cockpit · Brutalist) | | ✓ |
| AI Dashboard Generator (BYOK) | | ✓ |
| Priority support | | ✓ |

**Planned pricing:** €7/month or €79 lifetime
**BYOK** — the AI generator uses your own API key (OpenAI · Anthropic · local LLM)

> The Free Card Pack stays free under MIT license. Premium is a separate offering for cards that take significantly more time to design and maintain. If you only need the basics, the free tier is genuinely sufficient.

---

## Roadmap

### Phase 1 — Free Card Pack *(Q3 2026)*
- ✅ Room Card *(v0.1.0 — current)*
- ⬜ Hero Card
- ⬜ Stat Window Card
- ⬜ Ticker Card
- ⬜ Divider Card
- ⬜ HACS submission
- ⬜ Visual editor (point-and-click YAML)
- ⬜ Documentation site

### Phase 2 — Premium Tier *(Q4 2026)*
- ⬜ Premium cards listed above
- ⬜ Style packs
- ⬜ License server + Stripe integration
- ⬜ Premium documentation

### Phase 3 — AI Generator *(2027)*
- ⬜ Backend dashboard generator
- ⬜ BYOK configuration
- ⬜ Template library

Timelines are honest estimates from a developer with limited weekly hours. They will slip. The free cards will ship.

---

## Design Philosophy

Layr is built around a single visual identity called **Monolith**. The principles:

- **Surfaces, not borders.** Cards are sculpted with neumorphic shadows, never outlined.
- **Editorial typography.** Numerical values use Fraunces (a refined contemporary serif). UI labels use Geist. Italic for annotations and subtitles.
- **Warm palette.** Cream surfaces (`#e6e1d8`), tobacco accent (`#b8743a`). Anti-Apple-Home. Anti-Material-default.
- **Custom iconography.** Every room icon is hand-drawn. No FontAwesome, no Material Icons.
- **Considered motion.** Animations communicate state changes, never decorate. 300-400ms ease curves throughout.
- **Conditional rendering.** Every section only appears when its entity is configured. The card adapts to your data.

Future style packs (Editorial, Cockpit, Brutalist) will reuse the same component architecture with different visual languages.

---

## Development

If you want to build from source, modify the card, or contribute:

```bash
git clone https://github.com/maurice198444/layr.git
cd layr
npm install
npm run build       # produces dist/layr.js
npm run deploy      # builds + copies to your HA mount
```

See [`SETUP.md`](SETUP.md) for the full development workflow including hot-reload, deploy paths, and troubleshooting.

### Contributing

Contributions welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). For bug reports and feature requests, open an issue with the appropriate template.

---

## Acknowledgments

This project owes thinking to:

- **[mushroom](https://github.com/piitaya/lovelace-mushroom)** — for proving that good design matters in HA dashboards
- **[button-card](https://github.com/custom-cards/button-card)** — for the flexibility blueprint
- **[Ultra Card](https://github.com/WJDDesigns/ultra-card)** — for the modular component philosophy
- **The HA Lovelace developer community** — for keeping the dashboard ecosystem alive

---

## License

MIT — see [LICENSE](LICENSE).

The Free Card Pack and all code in this repository is and stays open source under MIT. Premium-tier code (when it ships) will live in a separate repository with a commercial license.

---

<p align="center"><i>Made in Duisburg.</i></p>
