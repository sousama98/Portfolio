import type { BadgeId, ZoneId } from "@/content/content";

export type Vector2 = {
  x: number;
  z: number;
};

export type GameState = {
  currentZone: ZoneId;
  visitedZones: ZoneId[];
  unlockedBadges: BadgeId[];
  foundSecrets: string[];
};

export type MotionMode = "full" | "reduced";
