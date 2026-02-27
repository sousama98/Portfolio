import { zones } from "@/content/content";
import type { Vector2 } from "./types";

export const zoneRadius = 2.2;

export const getNearestZone = (position: Vector2) => {
  let best = zones[0];
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const zone of zones) {
    if (zone.id === "inventory") continue;
    const dx = position.x - zone.position[0];
    const dz = position.z - zone.position[1];
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance < bestDistance) {
      best = zone;
      bestDistance = distance;
    }
  }

  return { zone: best, distance: bestDistance };
};

export const clampWorld = (value: number) => Math.max(-14, Math.min(14, value));

export const withinRadius = (position: Vector2, target: [number, number], radius: number) => {
  const dx = position.x - target[0];
  const dz = position.z - target[1];
  return Math.sqrt(dx * dx + dz * dz) <= radius;
};
