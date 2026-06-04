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
