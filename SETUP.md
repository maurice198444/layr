# Layr Cards — Setup

## Projektstruktur

```
layr-cards/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── src/
│   └── layr-room-card.ts
└── scripts/
    └── deploy.mjs
```

## Initial-Setup (einmalig)

```bash
# Ordner anlegen
mkdir -p ~/projects/layr-cards/{src,scripts}
cd ~/projects/layr-cards

# Files aus /mnt/user-data/outputs/ einfügen:
#   layr-room-card.ts  →  src/
#   deploy.mjs         →  scripts/
#   package.json       →  ./
#   tsconfig.json      →  ./
#   vite.config.ts     →  ./
#   gitignore.txt      →  ./.gitignore  (umbenennen!)

# Dependencies installieren
npm install
```

## Voraussetzungen prüfen

- `H:\` ist als HA-NAS-Share gemountet und beschreibbar
- `H:\www\community\` existiert (HACS legt das normalerweise an — falls nicht: `mkdir H:\www\community`)
- Node 18+ installiert (`node --version`)

## Workflow

### Bauen + auf HA deployen (One-Command)

```bash
npm run deploy
```

Das macht:
1. `vite build` → produziert `dist/layr.js` (~50 KB minified)
2. `node scripts/deploy.mjs` → kopiert nach `H:\www\community\layr\layr.js`

Output sieht so aus:
```
✓ X modules transformed.
dist/layr.js  46.21 kB │ gzip: 14.87 kB
✓ built in 1.4s

› Quelle:  dist/layr.js  (46.2 KB)
› Ziel:    H:/www/community/layr/layr.js
✓ Deployed nach H:/www/community/layr/layr.js

  In HA Browser-Tab: Ctrl+Shift+R für Cache-Reload
```

### Andere Scripts

| Befehl | Was es macht |
|---|---|
| `npm run build` | Nur bauen, kein Deploy |
| `npm run deploy` | Bauen + Deployen (das übliche) |
| `npm run deploy:only` | Nur Deployen (wenn dist/layr.js schon aktuell) |
| `npm run dev` | Watch-Mode, baut bei jedem Save neu (kein Auto-Deploy) |
| `npm run type-check` | TypeScript-Check ohne Build |

### Dev-Workflow mit Auto-Watch

In Terminal A:
```bash
npm run dev
```

In Terminal B (nach jeder Code-Änderung):
```bash
npm run deploy:only
```

Dann im HA-Browser Ctrl+Shift+R.

## Einmalig in HA registrieren

**Einstellungen → Dashboards → Drei-Punkte-Menü → Ressourcen → Hinzufügen:**

- URL: `/local/community/layr/layr.js`
- Typ: **JavaScript-Modul**

Speichern, HA-Tab reloaden.

## Card im Dashboard verwenden

Dashboard editieren → **Card hinzufügen → Manuell** → YAML einfügen:

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

## Verfügbare Room-Icons

| `icon:` Value | Symbol |
|---|---|
| `door` | Tür (Diele/Eingang) |
| `pot` | Kochtopf (Küche) |
| `sofa` | Sofa (Wohnzimmer) |
| `bed` | Bett (Schlafzimmer) |
| `bath` | Badewanne (Bad) |
| `desk` | Schreibtisch (Büro) |
| `toilet` | WC |
| `garden` | Pflanze (Garten/Balkon) |
| `garage` | Garage |
| `default` | Haus (Fallback bei unbekanntem Wert) |

## Troubleshooting

**„Custom element doesn't exist: layr-room-card"**
→ Resource nicht registriert oder Pfad falsch. Browser-Cache leeren mit Ctrl+Shift+R.

**Deploy schlägt fehl mit "ENOENT" oder "EACCES"**
→ `H:\` nicht gemountet, oder fehlende Schreibrechte auf `H:\www\community\`.

**Card lädt, aber Werte sind alle "—"**
→ Entity-IDs in YAML prüfen. In HA: **Entwicklerwerkzeuge → Zustände** zum Nachschauen.

**TS-Fehler bei Decorators**
→ `experimentalDecorators: true` in tsconfig.json prüfen.

**Build dauert lange / hängt**
→ `node_modules` löschen, `npm install` neu.

## Path-Konfiguration ändern

Der Deploy-Pfad ist in `scripts/deploy.mjs` hartkodiert:

```javascript
const TARGET_DIR = 'H:/www/community/layr';
```

Falls dein NAS-Mount mal ein anderer Laufwerksbuchstabe wird, einfach dort anpassen.
