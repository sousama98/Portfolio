"use client";

import { badges } from "@/content/content";
import type { BadgeId } from "@/content/content";

type Props = {
  unlockedBadges: BadgeId[];
  onClose: () => void;
};

export default function InventoryPanel({ unlockedBadges, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/35 p-4 md:items-center">
      <aside className="quest-panel fade-in-up max-h-[88vh] w-full max-w-3xl overflow-auto rounded-3xl p-6 sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="ui-chip text-cyan-900">Progress Ledger</p>
            <h2 className="display-font mt-2 text-3xl font-bold">Badge Inventory</h2>
          </div>
          <button type="button" onClick={onClose} className="ui-btn px-3 py-1.5 text-sm">
            Close
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {badges.map((badge) => {
            const unlocked = unlockedBadges.includes(badge.id);
            return (
              <article
                key={badge.id}
                className={`rounded-2xl border p-4 transition ${
                  unlocked
                    ? "border-cyan-700/25 bg-gradient-to-br from-cyan-50 to-sky-50"
                    : "border-stone-300/70 bg-gradient-to-br from-stone-100 to-stone-50 opacity-80"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-stone-900">{badge.title}</p>
                  <span className={`ui-chip ${unlocked ? "text-cyan-900" : "text-stone-600"}`}>
                    {unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-700">{badge.description}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-stone-500">{badge.unlockedBy}</p>
              </article>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
