#!/usr/bin/env node
/**
 * Layr Cards — Deploy Script
 *
 * Kopiert das gebaute Bundle vom lokalen dist/ in den HA-Mount.
 * Wird über `npm run deploy` aufgerufen (nach vorherigem Build).
 */

import { copyFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');

// ---- Konfiguration ------------------------------------------------------
const SOURCE = resolve(PROJECT_ROOT, 'dist/layr.js');
const TARGET_DIR = 'H:/www/community/layr';
const TARGET = `${TARGET_DIR}/layr.js`;

// ---- Helpers ------------------------------------------------------------
const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const log = (msg) => console.log(`\x1b[36m›\x1b[0m ${msg}`);
const ok = (msg) => console.log(`\x1b[32m✓\x1b[0m ${msg}`);
const err = (msg) => console.error(`\x1b[31m✗\x1b[0m ${msg}`);

// ---- Validierung --------------------------------------------------------
if (!existsSync(SOURCE)) {
  err(`dist/layr.js nicht gefunden`);
  console.error(`   Erst bauen mit:  npm run build`);
  process.exit(1);
}

const size = statSync(SOURCE).size;
log(`Quelle:  dist/layr.js  (${formatSize(size)})`);
log(`Ziel:    ${TARGET}`);

// ---- Deploy -------------------------------------------------------------
try {
  mkdirSync(TARGET_DIR, { recursive: true });
  copyFileSync(SOURCE, TARGET);

  const SOURCE_MAP = `${SOURCE}.map`;
  const TARGET_MAP = `${TARGET}.map`;
  if (existsSync(SOURCE_MAP)) {
    copyFileSync(SOURCE_MAP, TARGET_MAP);
    log(`+ Source-Map: ${TARGET_MAP}`);
  }
  ok(`Deployed nach ${TARGET}`);
  console.log(`\n  In HA Browser-Tab: Ctrl+Shift+R für Cache-Reload\n`);
} catch (e) {
  err(`Deploy fehlgeschlagen: ${e.message}`);
  if (e.code === 'ENOENT' || e.code === 'EACCES') {
    console.error(`   Ist H:\\ als HA-NAS Share gemountet und beschreibbar?`);
  }
  process.exit(1);
}
