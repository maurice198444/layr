/**
 * Layr — font loading
 *
 * Layr's typography relies on Fraunces (serif, for numeric values) and
 * Geist (sans, for UI labels). Shadow-DOM components cannot declare their
 * own @font-face usefully, so we inject a single stylesheet at the document
 * level — fonts declared there cascade into every card's shadow root.
 *
 * This is a graceful enhancement: if the document is offline, cards fall
 * back to the `serif` / `system-ui` stacks declared in their styles.
 * The injection is idempotent — calling it from every card constructor is
 * safe; the link is only added once.
 */

const FONT_LINK_ID = 'layr-fonts';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?' +
  'family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500' +
  '&family=Geist:wght@400;500;600' +
  '&display=swap';

/** Inject the Layr font stylesheet into the document head (once). */
export const ensureLayrFonts = (): void => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(FONT_LINK_ID)) return;

  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
};
