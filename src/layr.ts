/**
 * Layr — pack entry point
 *
 * This is the single module Home Assistant loads (built to dist/layr.js).
 * It imports every card in the pack so that one Lovelace resource
 * registers all Layr cards. Add new cards by importing them here.
 */

import './layr-room-card';

export { LayrRoomCard } from './layr-room-card';
