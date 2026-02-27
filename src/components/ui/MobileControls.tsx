"use client";

type Direction = "up" | "down" | "left" | "right";

type Props = {
  onPress: (direction: Direction, active: boolean) => void;
};

const controls: { key: Direction; label: string; className: string }[] = [
  { key: "up", label: "↑", className: "col-start-2 row-start-1" },
  { key: "left", label: "←", className: "col-start-1 row-start-2" },
  { key: "right", label: "→", className: "col-start-3 row-start-2" },
  { key: "down", label: "↓", className: "col-start-2 row-start-3" },
];

export default function MobileControls({ onPress }: Props) {
  return (
    <div className="fixed bottom-4 left-4 z-20 md:hidden">
      <div className="quest-panel grid grid-cols-3 grid-rows-3 gap-2 rounded-2xl p-3">
        {controls.map((control) => (
          <button
            key={control.key}
            type="button"
            className={`${control.className} ui-btn h-12 w-12 text-lg font-bold`}
            onTouchStart={() => onPress(control.key, true)}
            onTouchEnd={() => onPress(control.key, false)}
            onMouseDown={() => onPress(control.key, true)}
            onMouseUp={() => onPress(control.key, false)}
            onMouseLeave={() => onPress(control.key, false)}
            aria-label={`Move ${control.key}`}
          >
            {control.label}
          </button>
        ))}
      </div>
    </div>
  );
}
