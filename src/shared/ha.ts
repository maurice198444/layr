/**
 * Layr — Home Assistant helpers
 *
 * Thin utilities for working with HA entities and the Lovelace event bus,
 * shared across cards.
 */

/** The domain portion of an entity id, e.g. `light.kitchen` → `light`. */
export const domainOf = (entityId: string): string => entityId.split('.')[0];

/**
 * Open Home Assistant's more-info dialog for an entity by firing the
 * `hass-more-info` event up the DOM tree (the Lovelace convention).
 */
export const fireMoreInfo = (node: HTMLElement, entityId: string): void => {
  const event = new CustomEvent('hass-more-info', {
    detail: { entityId },
    bubbles: true,
    composed: true,
  });
  node.dispatchEvent(event);
};

/** Minimal shape of a Home Assistant REST `callApi` provider. */
interface ApiHass {
  callApi<T>(method: 'GET', path: string): Promise<T>;
}

type HistoryEntry = { state: string; last_changed?: string; last_updated?: string };

/**
 * Fetch the numeric history of an entity over the last `hours` hours via the
 * recorder REST API. Returns the chronological list of finite numeric states
 * (non-numeric/unavailable samples are dropped). Resolves to an empty array
 * when the recorder is unavailable or the request fails — callers should treat
 * "too few points" as "no sparkline".
 */
export const fetchNumericHistory = async (
  hass: ApiHass,
  entityId: string,
  hours: number,
): Promise<number[]> => {
  const start = new Date(Date.now() - hours * 3_600_000).toISOString();
  const path =
    `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}` +
    `&minimal_response&no_attributes&significant_changes_only`;

  try {
    const result = await hass.callApi<HistoryEntry[][]>('GET', path);
    const series = result?.[0] ?? [];
    const points: number[] = [];
    for (const entry of series) {
      const n = parseFloat(entry.state);
      if (Number.isFinite(n)) points.push(n);
    }
    return points;
  } catch {
    return [];
  }
};
