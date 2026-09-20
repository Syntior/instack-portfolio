import { levels } from "@/data/levels";

/**
 * Decorative terminal listing the five levels. It is the one "developer tool"
 * flourish on the home page. The same information appears as real content
 * further down, so this copy is hidden from assistive tech to avoid noise.
 */
export function TerminalCard() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-border bg-card font-mono text-sm shadow-sm"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 text-xs text-muted-foreground">
          instackdev — community-levels
        </span>
      </div>

      <div className="space-y-4 p-5 leading-7">
        <p>
          <span className="text-primary">$</span> instack levels
        </p>
        <ol className="space-y-1">
          {levels.map((level) => (
            <li key={level.level} className="flex gap-4">
              <span className="text-muted-foreground">
                {String(level.level).padStart(2, "0")}
              </span>
              <span>{level.name}</span>
            </li>
          ))}
        </ol>
        <p>
          <span className="text-primary">$</span> <span className="caret" />
        </p>
      </div>
    </div>
  );
}
