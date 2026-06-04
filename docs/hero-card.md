# Layr Hero Card — Configuration Reference

Complete configuration guide for the Layr Hero Card. For installation and project overview, see the [main README](../README.md).

The Hero Card puts a single value front and centre: a large serif number on a sculpted cream surface, with an optional secondary value and an optional sparkline. Use it for the readings that deserve a headline — power draw, indoor temperature, water usage, air quality.

## Quick start

The minimum viable config:

```yaml
type: custom:layr-hero-card
entity: sensor.haus_power
```

This renders the entity's current value (with its unit from Home Assistant), labelled with its `friendly_name`. Tap the card to open the more-info dialog.

Add `sparkline: true` and the card grows a trend line drawn from the recorder history. Add a `secondary_entity` and a smaller companion value appears beneath the headline.

---

## Configuration options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | string | *required* | Must be `custom:layr-hero-card` |
| `entity` | entity_id | *required* | The entity whose value is featured |
| `name` | string | entity's `friendly_name` | Label above the value |
| `icon` | string | `default` | Glyph in the header tile — see [Available icons](#available-icons) |
| `unit` | string | entity's `unit_of_measurement` | Override the displayed unit |
| `decimals` | number | auto | Decimal places. Auto: `0` for integers, `1` otherwise |
| `secondary_entity` | entity_id | — | Optional companion value shown beneath the headline |
| `secondary_name` | string | secondary's `friendly_name` | Label for the secondary value |
| `sparkline` | boolean | `false` | Draw a trend line from recorder history |
| `hours` | number | `24` | Time window of the sparkline, in hours |
| `tap_action` | string | `more-info` | `more-info` opens the dialog; `none` disables tap |

Only `type` and `entity` are required. Everything else is additive.

---

### Values and formatting

The headline shows `entity.state`, formatted with German decimal notation (comma separator), e.g. `21,4`. The unit is appended in a smaller serif weight.

- **Numeric states** are rounded per `decimals` (or the auto rule above).
- **Non-numeric states** (text sensors, enums) are shown verbatim — `decimals` and `unit` are ignored.
- **Unavailable / unknown** states render as `—`.

```yaml
type: custom:layr-hero-card
entity: sensor.wohnzimmer_temperature
name: Wohnzimmer
icon: thermometer
unit: °C
decimals: 1
```

---

### `secondary_entity`

A smaller value shown under the headline — useful for pairing a live reading with a daily total, or a current value with its target.

```yaml
type: custom:layr-hero-card
entity: sensor.haus_power
name: Stromverbrauch
icon: bolt
secondary_entity: sensor.haus_power_today
secondary_name: Heute
```

The secondary value uses its own entity's unit. It is formatted with the same rules as the headline (auto decimals, `—` when unavailable).

---

### `sparkline`

When `sparkline: true`, the card fetches the entity's numeric history over the last `hours` hours from Home Assistant's recorder and draws it as a trend line in the tobacco accent colour.

```yaml
type: custom:layr-hero-card
entity: sensor.luftfeuchte
name: Luftfeuchtigkeit
icon: drop
unit: "%"
sparkline: true
hours: 48
```

Behaviour:

- The history is fetched lazily after the card mounts and **refreshed every 2 minutes**.
- The line auto-scales to the min/max of the window — it shows *shape*, not absolute position, so subtle changes stay legible.
- If the recorder is unavailable, returns an error, or has **fewer than two** numeric data points, the sparkline is simply omitted — the rest of the card renders normally.
- Only numeric samples are plotted; `unavailable` / `unknown` gaps are dropped.

> The sparkline depends on Home Assistant's **recorder** integration keeping history for the entity. If you've excluded the entity from recording, there's nothing to draw.

---

## Available icons

The header tile uses a custom hand-drawn glyph. Set it with `icon:`:

| Value | Symbol | Suggested for |
|---|---|---|
| `bolt` | Lightning bolt | Power, energy, electricity |
| `thermometer` | Thermometer | Temperature |
| `drop` | Single droplet | Humidity, single water reading |
| `drops` | Two droplets | Water usage, rainfall |
| `gauge` | Dial with needle | Pressure, generic meters |
| `leaf` | Leaf | Air quality, CO₂, environment |
| `sun` | Sun with rays | Illuminance, solar, UV |
| `default` | Clock dial | Anything not covered above |

If you set `icon` to an unknown value, the card falls back to `default` silently. The glyph is drawn in the tobacco accent colour.

More glyphs will be added over time. Need a specific one? Open a [feature request](https://github.com/maurice198444/layr/issues/new?template=feature_request.md).

---

## Interaction

By default, tapping the card opens Home Assistant's more-info dialog for `entity`. The card is keyboard accessible — it's focusable and responds to **Enter** / **Space**.

Set `tap_action: none` to make the card purely informational (no pointer cursor, no focus ring, no dialog):

```yaml
type: custom:layr-hero-card
entity: sensor.aussentemperatur
icon: thermometer
tap_action: none
```

---

## Example configurations

### Power headline with trend

```yaml
type: custom:layr-hero-card
entity: sensor.haus_power
name: Stromverbrauch
icon: bolt
unit: W
secondary_entity: sensor.haus_power_today
secondary_name: Heute
sparkline: true
hours: 24
```

A live power reading with today's total beneath it and a 24-hour trend line.

### Indoor climate

```yaml
type: custom:layr-hero-card
entity: sensor.wohnzimmer_temperature
name: Wohnzimmer
icon: thermometer
unit: °C
decimals: 1
sparkline: true
hours: 12
```

### Humidity, read-only

```yaml
type: custom:layr-hero-card
entity: sensor.bad_luftfeuchte
name: Bad
icon: drop
unit: "%"
tap_action: none
```

---

## Entity reference

| Field | Domain | Reads |
|---|---|---|
| `entity` | any | `state`, `attributes.unit_of_measurement`, `attributes.friendly_name` |
| `secondary_entity` | any | `state`, `attributes.unit_of_measurement`, `attributes.friendly_name` |

For the sparkline, the card additionally queries the recorder history API for `entity` over the configured window.

---

## Troubleshooting

**Headline shows "—"**
→ The entity is `unavailable` or `unknown`. Check HA Developer Tools → States and verify the entity ID.

**No sparkline appears**
→ Either `sparkline` isn't `true`, the entity has fewer than two numeric points in the window, or the recorder isn't keeping history for it. Verify history exists in the entity's more-info dialog (the built-in history graph).

**Sparkline looks flat**
→ The value barely changed over the window, or only one distinct value was recorded. Try a longer `hours` window.

**Wrong unit shown**
→ Set `unit:` explicitly to override the entity's `unit_of_measurement`.

**Tap does nothing**
→ `tap_action` is set to `none`.

**Custom element doesn't exist: layr-hero-card**
→ Resource not registered, or the path is wrong. Check **Settings → Dashboards → Resources** and ensure the URL matches your `layr.js` location.

---

## Version compatibility

This documentation matches the Hero Card behavior as of its initial release.

Breaking configuration changes will be announced in [CHANGELOG.md](../CHANGELOG.md) with migration notes. Layr follows [Semantic Versioning](https://semver.org/) — breaking changes only occur in major version bumps.
