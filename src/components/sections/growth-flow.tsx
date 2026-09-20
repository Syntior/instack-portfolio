import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { growthModel } from "@/data/growth-model";

/**
 * The growth model as a timeline: Community → Projects → Products/Clients →
 * Revenue → Company.
 *
 * Vertical with a left rail on small screens, horizontal on `lg`. Each item
 * draws a connector from its own node to the next one; the last item has none.
 */
export function GrowthFlow() {
  const lastIndex = growthModel.length - 1;

  return (
    <ol role="list" className="grid lg:grid-cols-5">
      {growthModel.map((stage, index) => {
        const isLast = index === lastIndex;
        return (
          <li
            key={stage.id}
            className="relative pb-10 pl-14 last:pb-0 lg:pt-14 lg:pr-6 lg:pb-0 lg:pl-0"
          >
            {/* Connector to the next node. */}
            {!isLast ? (
              <span
                aria-hidden="true"
                className="absolute top-10 bottom-0 left-5 w-px bg-border lg:top-5 lg:right-0 lg:bottom-auto lg:left-10 lg:h-px lg:w-auto"
              />
            ) : null}

            {/* Numbered node. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-0 left-0 grid size-10 place-items-center rounded-full border font-mono text-sm font-medium",
                isLast
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-primary",
              )}
            >
              {index + 1}
            </span>

            <Reveal delay={index * 0.08}>
              <h3 className="text-lg font-semibold tracking-tight">
                {stage.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.description}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
