// src/utils/roomHelpers.js
import { rooms } from "../data/rooms";

const ROOM_BY_ID = new Map(
  rooms
    .map((r) => {
      const key = String(r.id ?? r._id ?? "").trim();
      return key ? [key, r] : null;
    })
    .filter(Boolean)
);

export function getRoomById(roomId) {
  const key = String(roomId ?? "").trim();
  if (!key) return null;
  return ROOM_BY_ID.get(key) || null;
}

export function getRoomName(roomId) {
  const room = getRoomById(roomId);
  return room?.name || room?.title || null;
}
