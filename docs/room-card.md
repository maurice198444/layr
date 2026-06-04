# Layr Room Card — Configuration Reference

Complete configuration guide for the Layr Room Card. For installation and project overview, see the [main README](../README.md).

## Quick start

The minimum viable config:

```yaml
type: custom:layr-room-card
name: Wohnzimmer
icon: sofa
temperature_entity: sensor.wohnzimmer_temperature
```

This renders a read-only card showing the room name, sofa icon, and current temperature. No expand handle, no controls — useful for sensor-only rooms.

Add a `light_entity` and the expand handle appears. Add a `climate_entity` and a setpoint stepper joins the controls panel. The card grows with your configuration.

---

## Configuration options

### Top-level

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | string | *required* | Must be `custom:layr-room-card` |
| `name` | string | `Raum` | Display name in the card header |
| `icon` | string | `default` | Room icon — see [Available icons](#available-icons) |
| `temperature_entity` | entity_id | — | Temperature sensor |
| `humidity_entity` | entity_id | — | Humidity sensor |
| `light_entity` | entity_id | — | Light entity (auto-detects dimming support) |
| `climate_entity` | entity_id | — | Climate/thermostat entity |
| `cover_entity` | entity_id | — | Cover/blind entity |
| `quick_access` | object | — | Header quick-access button — see [`quick_access`](#quick_access) |
| `switches` | array | — | List of switch entities — see [`switches`](#switches) |

All entity options are optional. The card adapts to what you configure.

---

### `quick_access`

A single configurable toggle button in the card header. Use it for the device you control most often in this room.

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | entity_id | *required* | Entity to control |
| `name` | string | entity's `friendly_name` | Label below the button |
| `tap_action` | string | `toggle` | Action on tap — `toggle`, `turn_on`, or `turn_off` |

```yaml
quick_access:
  entity: switch.luefter
  name: Lüfter
  tap_action: toggle
```

The button is round, ~42px, and turns warm orange when its entity state is `on`. The label appears italic in serif typography below the button.

`tap_action: turn_on` is useful for scenes — tapping activates the scene without ever turning it "off":

```yaml
quick_access:
  entity: scene.movie_night
  name: Filmabend
  tap_action: turn_on
```

---

### `switches`

A list of switches that appear in the expanded controls panel as pill-shaped toggle buttons, stacked vertically.

Each item:

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | entity_id | *required* | Switch entity |
| `name` | string | entity's `friendly_name` | Display label |

```yaml
switches:
  - entity: switch.aussenlampe
    name: Außenlampe
  - entity: switch.couch_lampe
    name: Couch Lampe
  - entity: switch.subwoofer
```

The last switch above will use whatever `friendly_name` is set in HA. If none is set, the entity ID is used directly.

The pills turn warm orange when their entity is `on`. Tap anywhere on the pill to toggle. The card uses the entity's domain to determine the service call, so this works for `switch`, `light`, `input_boolean`, `automation`, and any other domain that supports a `toggle` service.

---

## Available icons

Room icons are custom hand-drawn SVGs bundled with the card. Use the `icon:` option:

| Value | Symbol | Suggested for |
|---|---|---|
| `door` | Door with handle | Diele, Eingang, hallway |
| `pot` | Cooking pot with lid | Kitchen |
| `sofa` | Two-seater sofa | Living room |
| `bed` | Bed with pillow | Bedroom |
| `bath` | Bathtub | Bathroom |
| `desk` | Desk with lamp | Office, study |
| `toilet` | Toilet | WC, guest bathroom |
| `garden` | Stylized plant | Garden, balcony, terrace |
| `garage` | Garage with door | Garage, carport |
| `default` | House silhouette | Anything not covered above |

If you set `icon` to an unknown value, the card falls back to `default` silently.

More icons will be added in future releases. If you need a specific room icon (Werkstatt, Esszimmer, Keller, Dachboden …), open a [feature request](https://github.com/maurice198444/layr/issues/new?template=feature_request.md).

---

## How the card adapts

The Room Card renders sections conditionally — only the parts whose entities you configured appear. This makes the same component work for hugely different rooms without UI bloat.

### Read-only mode

If you configure only sensors and no controllable entities (no `light_entity`, `climate_entity`, `cover_entity`, or `switches`), the card enters **read-only mode**:

- No expand handle
- Three subtle decorative dots at the bottom as a typographic period
- Extra bottom padding for visual balance

```yaml
# A purely informational card — no expand, no controls
type: custom:layr-room-card
name: Diele
icon: door
temperature_entity: sensor.diele_temperature
humidity_entity: sensor.diele_humidity
```

### Light capabilities — auto-detected

The light section reads your light entity's `supported_color_modes` attribute and adapts:

- **Dimmable light** (any mode except `onoff`) → slider + power button shown
- **On/off only** (`['onoff']`) → just the power button, no slider

You don't need to configure this — the card figures it out from HA's own metadata.

### Climate stepper limits

The setpoint stepper respects your climate entity's `min_temp` and `max_temp` attributes. If those aren't set, it falls back to 7°C – 35°C.

- Step size: **0.5°C** per tap
- **Long-press** the +/- buttons for rapid continuous adjustment (140ms intervals after 400ms initial delay)
- Calls `climate.set_temperature` on each change

### Cover position display

If your cover entity exposes a `current_position` attribute (0–100), the card shows the live position in the section label:

- `0` → *geschlossen*
- `100` → *offen*
- everything in between → *X% offen* (e.g. *45% offen*)

The up / stop / down buttons call standard HA services:
- Up: `cover.open_cover`
- Stop: `cover.stop_cover`
- Down: `cover.close_cover`

---

## Example configurations

### Hallway — read-only sensors

```yaml
type: custom:layr-room-card
name: Diele
icon: door
temperature_entity: sensor.diele_temperature
humidity_entity: sensor.diele_humidity
```

Renders as a compact card with no expand handle and decorative dots at the bottom.

### Bedroom — light + climate

```yaml
type: custom:layr-room-card
name: Schlafzimmer
icon: bed
temperature_entity: sensor.schlafzimmer_temperature
humidity_entity: sensor.schlafzimmer_humidity
light_entity: light.schlafzimmer_decke
climate_entity: climate.schlafzimmer
quick_access:
  entity: light.nachttischlampe
  name: Nachttisch
```

Expanded panel shows brightness slider + Soll-temperature stepper. The quick-access button toggles the bedside light directly without expanding.

### Living room — everything

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
switches:
  - entity: switch.aussenlampe
    name: Außenlampe
  - entity: switch.couch_lampe
    name: Couch Lampe
  - entity: switch.subwoofer
```

Full-featured card. Header shows temp + humidity + quick-access button. Expanded panel has all four control sections.

### Office — scene-driven

```yaml
type: custom:layr-room-card
name: Büro
icon: desk
temperature_entity: sensor.buero_temperature
light_entity: light.buero_decke
quick_access:
  entity: scene.buero_arbeitslicht
  name: Arbeitslicht
  tap_action: turn_on
switches:
  - entity: switch.monitor_pc
    name: Monitor + PC
  - entity: switch.drucker
```

The quick-access button activates a scene on tap (one-shot, never toggles off). Switches handle device groups.

### Garden — outdoor sensor

```yaml
type: custom:layr-room-card
name: Garten
icon: garden
temperature_entity: sensor.garten_temperature
humidity_entity: sensor.garten_humidity
```

Identical pattern to the hallway example, but with garden iconography. Useful for showing outdoor conditions alongside indoor rooms.

---

## Entity reference

What entity types each field accepts and which attributes the card reads:

| Field | Domain | Reads |
|---|---|---|
| `temperature_entity` | `sensor` | `state` (numeric) |
| `humidity_entity` | `sensor` | `state` (numeric) |
| `light_entity` | `light` | `state`, `attributes.brightness`, `attributes.supported_color_modes` |
| `climate_entity` | `climate` | `state`, `attributes.temperature`, `attributes.min_temp`, `attributes.max_temp` |
| `cover_entity` | `cover` | `state`, `attributes.current_position` |
| `switches[].entity` | any toggleable domain | `state` (`on`/`off`) |
| `quick_access.entity` | any toggleable domain | `state` (`on`/`off`) |

For `switches` and `quick_access`, the card uses the entity's domain to determine which service to call. `switch.foo` calls `switch.toggle`; `light.foo` calls `light.toggle`. This works for `input_boolean`, `automation`, `scene`, `script`, etc.

---

## Troubleshooting

**Card shows "—" instead of temperature**
→ The entity is `unavailable` or `unknown`. Check HA Developer Tools → States and verify the entity ID is correct.

**Light slider doesn't appear**
→ Your light's `supported_color_modes` doesn't include a dimmable mode. If you think it should support dimming, this is a HA integration issue — check the entity in Developer Tools and see if `brightness` ever has a value.

**Climate setpoint won't change**
→ Some climate entities are read-only (e.g., monitoring-only integrations). The card calls `climate.set_temperature` — if that service isn't supported for your entity, the change won't persist. Test the service directly in Developer Tools → Services.

**Cover buttons do nothing**
→ Your cover entity must support `open_cover`, `close_cover`, and `stop_cover` services. Some integrations only support a subset. Check the cover's supported features in Developer Tools.

**Position percentage doesn't update**
→ Your cover entity doesn't expose `current_position`. The card still controls the cover, but can't display its exact state.

**Expand handle missing**
→ The card is in read-only mode. Add at least one controllable entity (`light_entity`, `climate_entity`, `cover_entity`, or `switches`) to get the expand panel.

**Card looks broken after an update**
→ Browser cached the old version. Hard-refresh with `Ctrl+Shift+R`. If that doesn't help, unregister the service worker: F12 → Application → Service Workers → Unregister → reload.

**Custom element doesn't exist: layr-room-card**
→ Resource not registered, or the path is wrong. Double-check **Settings → Dashboards → Resources** and ensure the URL matches your file location.

---

## Version compatibility

This documentation matches the Room Card behavior as of **v0.1.0**.

Breaking configuration changes will be announced in [CHANGELOG.md](../CHANGELOG.md) with migration notes. Layr follows [Semantic Versioning](https://semver.org/) — breaking changes only occur in major version bumps.
