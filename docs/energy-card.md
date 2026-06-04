# Layr Energy Card — Configuration Reference

Complete configuration guide for the Layr Energy Card. For installation and project overview, see the [main README](../README.md).

The Energy Card is a **live energy-flow card** for solar + battery setups — built with balcony solar plants (*Balkonkraftwerk*) in mind. It reads your current power flows, figures out what's happening right now (sun covering the house, battery discharging, or drawing from the grid), and animates an energy-flow diagram: glowing particles travel along the active path while idle paths rest in the background. The status colour and the headline adapt to the mode.

## Quick start

```yaml
type: custom:layr-energy-card
name: Balkonkraftwerk
icon: sun
solar_entity: sensor.bkw_leistung
house_entity: sensor.hausverbrauch
grid_entity: sensor.netzleistung
```

That's enough to render the flow diagram and detect the operating mode. Add a `battery_entity` + `battery_level_entity` for the storage path, and a `stats` list for the right-hand column.

---

## Configuration options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | string | *required* | Must be `custom:layr-energy-card` |
| `name` | string | `Energie` | Header label |
| `icon` | string | `sun` | Header glyph — any [Hero Card glyph](hero-card.md#available-icons) |
| `solar_entity` | entity_id | — | Current PV generation (W) |
| `house_entity` | entity_id | — | Current house consumption (W) |
| `grid_entity` | entity_id | — | Single signed grid power (W) — import/export via sign |
| `grid_import_entity` | entity_id | — | Separate positive-only grid **import** (Bezug) power (W) |
| `grid_export_entity` | entity_id | — | Separate positive-only grid **export** (Einspeisung) power (W) |
| `battery_entity` | entity_id | — | Single signed battery power (W) — charge/discharge via sign |
| `battery_charge_entity` | entity_id | — | Separate positive-only **charge** power (W) |
| `battery_discharge_entity` | entity_id | — | Separate positive-only **discharge** power (W) |
| `battery_level_entity` | entity_id | — | Battery state of charge (%) |
| `grid_export_positive` | boolean | `false` | If `true`, a **positive** grid value means export |
| `battery_charge_positive` | boolean | `true` | If `true`, a **positive** battery value means charging |
| `threshold` | number | `20` | Power (W) below which a flow counts as idle |
| `stats` | array | — | Right-hand stat column — see [`stats`](#stats) |
| `tap_action` | string | `more-info` | `more-info` opens the dialog; `none` disables tap |

At least one of `solar_entity`, `grid_entity`, or `battery_entity` is required. Missing flow entities are treated as `0` W.

---

## Sign conventions

Home Assistant integrations disagree on the sign of grid and battery power, so the card lets you adapt:

- **Grid** — two ways to wire it:
  - **Single signed sensor:** set `grid_entity`. By default a **positive** value means **import** (drawing from the grid), a **negative** value means **export** (feed-in). Flip with `grid_export_positive: true`.
  - **Separate sensors:** set `grid_import_entity` and/or `grid_export_entity` (both positive-only watts). These take precedence over `grid_entity` and remove the sign guesswork entirely — ideal for smart meters that expose `…_netzbezug` / `…_netzeinspeisung`.
- **Battery** — two ways to wire it:
  - **Single signed sensor:** set `battery_entity`. By default a **positive** value means **charging**, a **negative** value means **discharging**. Flip with `battery_charge_positive: false`.
  - **Separate sensors:** set `battery_charge_entity` and/or `battery_discharge_entity` (both positive-only watts). These take precedence over `battery_entity` and let the card animate both the charge (Haus→Speicher) and discharge (Speicher→Haus) paths. Common for Anker Solarbank and similar integrations that expose `…_aufladeleistung` / `…_entladeleistung`.

If the headline or the flow direction looks inverted, one of these flags is what you need.

---

## Operating modes

The card derives the mode from the live flows each update:

| Mode | Colour | When | Headline | Split |
|---|---|---|---|---|
| **Solarbetrieb** | green | Not importing and not discharging | Solar generation (W) | Eigenverbrauch · Einspeisung |
| **Speicherbezug** | amber | Battery discharging above threshold | Battery output (W) | Speicherstand · Hausverbrauch |
| **Netzbezug** | red | Importing from grid above threshold | Grid import (W) | Netzbezug · Hausverbrauch |

Priority is **grid → storage → solar**: if you're importing from the grid, that's the mode, regardless of what the panels are doing.

The status dot in the header takes the mode colour and breathes gently. The active flow path animates in the mode colour; in solar mode, surplus export to the grid animates in the tobacco accent, and battery charging animates the Solar→Speicher path too.

---

## `stats`

A list of up to **four** entities shown in the right-hand column. Each renders a label, a value, and an optional bar.

Each item:

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | entity_id | *required* | Entity to read |
| `name` | string | entity's `friendly_name` | Label above the value |
| `unit` | string | entity's `unit_of_measurement` | Override the unit |
| `max` | number | — | Reference value for the bar fill (e.g. daily max kWh) |
| `tone` | string | `accent` | Bar tint — `green` for self/solar values, `accent` otherwise |

```yaml
stats:
  - { entity: sensor.bkw_heute, name: Heute, max: 5, tone: green }
  - { entity: sensor.akku_soc, name: Speicher, tone: green }
  - { entity: sensor.bkw_gespart, name: Gespart }
  - { entity: sensor.autarkie, name: Autarkie }
```

**Bar fill logic:**

- If `max` is set → fill = `value / max` (clamped to 100%).
- Else if the unit is `%` → fill = the value itself.
- Otherwise → no bar (value only).

---

## Full example — Balcony solar with battery

```yaml
type: custom:layr-energy-card
name: Balkonkraftwerk
icon: sun
solar_entity: sensor.bkw_leistung
house_entity: sensor.hausverbrauch
grid_entity: sensor.netzleistung
battery_entity: sensor.akku_leistung
battery_level_entity: sensor.akku_soc
grid_export_positive: false
battery_charge_positive: true
stats:
  - { entity: sensor.bkw_heute, name: Heute, max: 5, tone: green }
  - { entity: sensor.akku_soc, name: Speicher, tone: green }
  - { entity: sensor.bkw_gespart, name: Gespart }
  - { entity: sensor.autarkie, name: Autarkie }
```

---

## Entity reference

| Field | Reads |
|---|---|
| `solar_entity` | `state` (numeric W) |
| `house_entity` | `state` (numeric W) |
| `grid_entity` | `state` (numeric W, signed) |
| `battery_entity` | `state` (numeric W, signed) |
| `battery_level_entity` | `state` (numeric %) |
| `stats[].entity` | `state`, `attributes.unit_of_measurement`, `attributes.friendly_name` |

Non-numeric or `unavailable` flow values are treated as `0`. The card does not query recorder history — every value is read live.

---

## Troubleshooting

**Headline or flow direction is inverted**
→ Adjust `grid_export_positive` and/or `battery_charge_positive` to match your sensors' sign convention.

**Card never enters solar mode**
→ Your `grid_entity` is reporting import (or your battery is "discharging") above the threshold. Check the live sensor values in Developer Tools → States, and verify the sign conventions.

**A flow path never lights up**
→ The corresponding entity isn't configured, or its value stays below `threshold`. Lower `threshold` if your idle readings sit just above 0 W.

**Stat bar doesn't appear**
→ The stat has no `max` and its unit isn't `%`. Add a `max` to give the bar a reference.

**Custom element doesn't exist: layr-energy-card**
→ Resource not registered, or the path is wrong. Check **Settings → Dashboards → Resources** and ensure the URL matches your `layr.js` location.

---

## Version compatibility

This documentation matches the Energy Card behavior as of its initial release.

Breaking configuration changes will be announced in [CHANGELOG.md](../CHANGELOG.md) with migration notes. Layr follows [Semantic Versioning](https://semver.org/) — breaking changes only occur in major version bumps.
