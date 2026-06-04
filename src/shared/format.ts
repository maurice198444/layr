/**
 * Layr — shared formatting helpers
 *
 * Small, framework-agnostic utilities used across cards. Card-specific
 * formatters (temperature, humidity, cover position, …) stay in their
 * own card module; only the genuinely shared primitives live here.
 */

/** Home Assistant state strings that mean "no usable value". */
export const UNAVAILABLE_STATES = ['unknown', 'unavailable'] as const;

/** True when a raw state has no usable value (null/undefined/unknown/unavailable). */
export const isUnavailable = (raw: string | number | null | undefined): boolean =>
  raw === undefined ||
  raw === null ||
  raw === '' ||
  (UNAVAILABLE_STATES as readonly string[]).includes(String(raw));

/** Format a number with German decimal notation (comma separator). */
export const formatGermanNumber = (n: number, decimals = 1): string =>
  n.toFixed(decimals).replace('.', ',');

/** Parse a raw state into a finite number, or null when not numeric. */
export const toNumber = (raw: string | number | null | undefined): number | null => {
  if (isUnavailable(raw)) return null;
  const n = typeof raw === 'string' ? parseFloat(raw) : (raw as number);
  return Number.isFinite(n) ? n : null;
};
