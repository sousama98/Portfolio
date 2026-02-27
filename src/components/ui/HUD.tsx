"use client";

import Link from "next/link";

type Props = {
  pageName: string;
  pathCount: number;
  totalPaths: number;
  lowMotion: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onNext: () => void;
  nextLabel: string;
  onToggleMotion: () => void;
};

export default function HUD({
  pageName,
  pathCount,
  totalPaths,
  lowMotion,
  onZoomIn,
  onZoomOut,
  onNext,
  nextLabel,
  onToggleMotion,
}: Props) {
  return (
    <div className="fixed left-0 right-0 top-0 z-20 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="quest-panel fade-in-up mx-auto flex max-w-6xl flex-wrap items-center gap-2 rounded-2xl p-3 sm:gap-3 sm:p-4">
        <p className="ui-chip text-stone-900">Page: {pageName}</p>
        <p className="ui-chip text-cyan-900">
          Paths: {pathCount}/{totalPaths}
        </p>

        <button type="button" onClick={onToggleMotion} className="ui-btn px-3 py-1.5 text-xs sm:text-sm">
          {lowMotion ? "Full Motion" : "Low Motion"}
        </button>
        <button type="button" onClick={onZoomIn} className="ui-btn px-3 py-1.5 text-xs sm:text-sm">
          Zoom In
        </button>
        <button type="button" onClick={onZoomOut} className="ui-btn px-3 py-1.5 text-xs sm:text-sm">
          Zoom Out
        </button>
        <button type="button" onClick={onNext} className="ui-btn px-3 py-1.5 text-xs sm:text-sm">
          Next: {nextLabel}
        </button>
        <div className="ml-auto" />
        <Link href="/about" className="ui-btn px-3 py-1.5 text-xs sm:text-sm">
          About Me
        </Link>
      </div>
    </div>
  );
}
