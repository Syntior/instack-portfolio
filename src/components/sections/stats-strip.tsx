import type { Stat } from "@/data/community-stats";

/**
 * A compact strip of headline numbers: a bordered box, one cell per figure,
 * big monospace value over a small uppercase label.
 *
 * Marked up as a description list (label = term, value = description) so a
 * screen reader hears "Growth levels, 5". The value is shown above the label
 * with `flex-col-reverse`, which changes the look but not the reading order.
 */
export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <dl className="flex w-full max-w-md divide-x divide-primary/20 overflow-hidden rounded-xl border border-primary/30 bg-card/60 sm:inline-flex sm:w-auto sm:max-w-none">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex min-w-0 flex-1 flex-col-reverse gap-1 px-3 py-4 sm:flex-none sm:px-7 sm:py-5"
        >
          <dt className="font-mono text-[0.6875rem] leading-tight tracking-wider text-muted-foreground uppercase sm:text-xs">
            {stat.label}
          </dt>
          <dd className="font-mono text-2xl font-bold tracking-tight text-primary tabular-nums sm:text-3xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
