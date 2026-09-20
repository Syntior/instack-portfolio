import { cn } from "@/lib/utils";

const TOTAL_LEVELS = 5;

/**
 * Five small bars with the first `level` filled, e.g. level 3 → ▮▮▮▯▯.
 * Exposed as a single labelled image so screen readers get "Level 3 of 5"
 * instead of five meaningless shapes.
 */
export function LevelMeter({
  level,
  className,
}: {
  level: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={`Level ${level} of ${TOTAL_LEVELS}`}
      className={cn("inline-flex items-end gap-1", className)}
    >
      {Array.from({ length: TOTAL_LEVELS }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "w-1.5 rounded-full",
            i < level ? "bg-primary" : "bg-border",
          )}
          style={{ height: `${8 + i * 3}px` }}
        />
      ))}
    </span>
  );
}
