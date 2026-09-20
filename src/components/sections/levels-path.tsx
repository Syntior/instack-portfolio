import { Card } from "@/components/ui/card";
import { LevelMeter } from "@/components/cards/level-meter";
import { Reveal } from "@/components/motion/reveal";
import { levels } from "@/data/levels";

/**
 * The five Developer Growth Levels as a vertical path of cards. A rail on the
 * left ties them together so the order reads as a progression.
 */
export function LevelsPath() {
  const lastIndex = levels.length - 1;

  return (
    <ol role="list" className="space-y-0">
      {levels.map((level, index) => (
        <li
          key={level.level}
          className="relative pb-6 pl-12 last:pb-0 md:pl-16"
        >
          {index !== lastIndex ? (
            <span
              aria-hidden="true"
              className="absolute top-10 bottom-0 left-5 w-px bg-border md:left-6"
            />
          ) : null}

          <span
            aria-hidden="true"
            className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-border bg-card font-mono text-sm font-medium text-primary md:size-12"
          >
            {level.level}
          </span>

          <Reveal delay={0.04}>
            <Card className="gap-4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs tracking-wider text-primary uppercase">
                    Level {level.level}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">
                    {level.name}
                  </h3>
                </div>
                <LevelMeter level={level.level} />
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {level.summary}
              </p>

              <ul aria-label={`${level.name} skills`} className="flex flex-wrap gap-2">
                {level.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
