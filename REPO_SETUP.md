# Layr — Repo-Setup-Anleitung

Schritt-für-Schritt vom lokalen Projekt zum public GitHub-Repo.

## Erste Schritte

### 1. Dateien einsortieren

Aus `/mnt/user-data/outputs/` in dein lokales Projekt kopieren:

```
~/projects/layr/
├── README.md                          ← NEU
├── LICENSE                            ← NEU
├── CHANGELOG.md                       ← NEU
├── CONTRIBUTING.md                    ← NEU
├── hacs.json                          ← NEU
├── SETUP.md                           (vorhanden)
├── package.json                       (vorhanden)
├── tsconfig.json                      (vorhanden)
├── vite.config.ts                     (vorhanden)
├── .gitignore                         (vorhanden, aus gitignore.txt)
├── src/
│   └── layr-room-card.ts              (vorhanden)
├── scripts/
│   └── deploy.mjs                     (vorhanden)
└── .github/
    └── ISSUE_TEMPLATE/
        ├── bug_report.md              ← NEU
        └── feature_request.md         ← NEU
```

Konkret in Git Bash:

```bash
cd ~/projects/layr

# .github-Ordner anlegen
mkdir -p .github/ISSUE_TEMPLATE

# Issue-Templates dort hinpacken (umbenennen wenn nötig)
mv ~/Downloads/bug_report.md .github/ISSUE_TEMPLATE/
mv ~/Downloads/feature_request.md .github/ISSUE_TEMPLATE/
```

### 2. package.json + ts.config Pfade korrigieren

In `src/layr-room-card.ts` Header-Kommentar updaten:

```typescript
/**
 * Author: Maurice Stockfleth
 * Repository: github.com/maurice198444/layr   ← NEU (war: layr-cards)
 */
```

In `package.json`:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/maurice198444/layr.git"   ← NEU
}
```

### 3. Lokales Git-Repo initialisieren

```bash
cd ~/projects/layr

git init
git add .
git status   # nachschauen was committed wird (nicht versehentlich node_modules!)
git commit -m "chore: initial commit"
```

## GitHub-Repo erstellen

### 4. Repo auf GitHub anlegen

1. Geh auf https://github.com/new
2. **Repository name:** `layr`
3. **Description:** *Premium Home Assistant cards with the Monolith design aesthetic*
4. **Visibility:** Public
5. **Wichtig:** _Initialize this repository_ Optionen **alle deaktivieren** (kein README, keine License, kein .gitignore — wir haben das alles schon lokal)
6. **Create repository**

GitHub zeigt dir dann eine Anleitung. Wir nutzen die zweite Variante (*push an existing repository from the command line*).

### 5. Lokales Repo verbinden + pushen

```bash
git remote add origin https://github.com/maurice198444/layr.git
git branch -M main
git push -u origin main
```

Wenn alles funktioniert hat: dein Code ist jetzt unter https://github.com/maurice198444/layr public sichtbar.

## Repo-Polishing (5-10 Min)

### 6. About-Bereich auf GitHub setzen

Auf der Repo-Seite oben rechts neben "About" auf das Zahnrad klicken:

- **Description:** *Distinctive Home Assistant cards. Built like furniture.*
- **Website:** (leer oder später deine layr.de URL)
- **Topics:** `home-assistant`, `lovelace`, `custom-card`, `hacs`, `lit-element`, `typescript`, `dashboard`, `neumorphism`
- **Include in home page:** ☑ Releases ☑ Packages (Rest deaktivieren)

### 7. Erste Release-Tag erstellen

Releases sind wichtig, damit:
- HACS später deine Tags erkennen kann
- User wissen welche Version stabil ist
- Du eine Versionshistorie hast

In Git Bash:

```bash
git tag -a v0.1.0 -m "Initial release"
git push origin v0.1.0
```

Dann auf GitHub:
1. Auf der Repo-Seite → **Releases** → **Draft a new release**
2. **Choose a tag:** `v0.1.0`
3. **Release title:** `v0.1.0 — Initial release`
4. **Description:**
   ```markdown
   First release of Layr — featuring the adaptive Room Card.
   
   ## What's included
   
   - Layr Room Card with light, climate, cover, and switch controls
   - 10 custom-drawn room icons
   - Adaptive section rendering
   
   ## Installation
   
   Manual installation only for now. See README for details.
   ```
5. **Attach files:** Bau `npm run build` und lade die `dist/layr.js` als Asset hoch
6. **Publish release**

### 8. Preview-Bild hinzufügen

Das README erwartet `docs/preview.png`. Solange das fehlt, ist das Hero-Bild kaputt.

Optionen:
- **Browser-Screenshot:** Öffne `room-card-v16.html` im Browser, screenshote die Card, speichere als `docs/preview.png`
- **HA-Screenshot:** Mache einen Screenshot der echten Card in deinem HA-Dashboard

Empfohlene Größe: 380px breit (matches Mockup-Container), PNG mit transparentem Hintergrund wenn möglich.

```bash
mkdir docs
# preview.png reinkopieren
git add docs/preview.png
git commit -m "docs: add hero preview image"
git push
```

## Was du noch in den ersten Tagen machen solltest

### 9. CI-Pipeline (optional aber hilfreich)

Eine simple GitHub Action die bei jedem Push prüft ob der Build durchläuft:

`.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check
      - run: npm run build
```

Würde ich jetzt noch **nicht** dazu schreiben — erst wenn andere Contributors auftauchen.

### 10. HACS-Submission (später)

Wenn die Card stabil läuft und du sie 2-3 Wochen mit echten Räumen genutzt hast:

1. Repo muss publicly accessible sein ✓
2. README.md, hacs.json, dist/layr.js müssen vorhanden sein ✓
3. Mindestens ein Release-Tag (semver) ✓
4. Submission via https://hacs.xyz/docs/publish/start

**Aber:** _nicht jetzt._ Erst wenn die Card sich bewährt hat.

## Häufige Anfänger-Stolperer

**„repository name already exists"**
→ Du hast schonmal ein Repo `layr` erstellt. Lösche es, oder wähle einen anderen Namen.

**„fatal: remote origin already exists"**
→ Du hast den `git remote add` Schritt mehrfach ausgeführt. Reset mit:
```bash
git remote remove origin
git remote add origin https://github.com/maurice198444/layr.git
```

**„permission denied (publickey)"**
→ SSH-Key nicht bei GitHub hinterlegt. Entweder HTTPS-URL nutzen (wie oben), oder SSH-Key einrichten via Settings → SSH Keys.

**„Updates were rejected"**
→ GitHub-Repo hat schon einen Commit (z.B. weil du beim Erstellen doch README/License aktiviert hast). Hole erst:
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

## Was du gerade NICHT machen solltest

- ❌ Marketing-Posts auf Reddit/HA-Community-Forum
- ❌ HACS-Submission
- ❌ Premium-Infrastructure (Stripe, License-Server)
- ❌ Twitter/Mastodon-Ankündigung
- ❌ Eine Discord-Server für die Community
- ❌ Logo-Design / Brand-Identity-System

Diese kommen **später**. Erst:
1. Card 2-3 Wochen selbst nutzen
2. Reibungen sammeln
3. Eventuell 1-2 weitere Cards aus dem Free-Pack ergänzen
4. **Dann** öffentlich bewerben

Eine zu früh promotete Card mit 3 GitHub-Issues "doesn't work for me" tut deinem Projekt mehr weh als ein still gepushtes Repo, das später wenn's stabil ist breit kommuniziert wird.

---

Viel Erfolg. **Geh es ruhig an.**
