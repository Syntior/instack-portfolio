import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { LevelMeter } from "@/components/cards/level-meter";
import { Reveal } from "@/components/motion/reveal";
import { levels } from "@/data/levels";

/** Compact five-card summary of the growth path for the home page. */
export function LevelsOverview() {
  return (
    <Section aria-labelledby="growth-path-heading" bordered>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          id="growth-path-heading"
          eyebrow="Community growth path"
          title="Five levels, from first commit to core team"
          description="Inside the community, every developer follows the same clear map of what to learn and own at each stage, so you always know what comes next."
        />
        <Button asChild variant="outline" className="self-start md:self-auto">
          <Link href="/how-it-works">
            Full path
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Link>
        </Button>
      </div>

      <ol
        role="list"
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {levels.map((level, index) => (
          <li key={level.level}>
            <Reveal delay={index * 0.06} className="h-full">
              <Card className="h-full gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-primary uppercase">
                    L{level.level}
                  </span>
                  <LevelMeter level={level.level} />
                </div>
                <h3 className="text-base font-semibold tracking-tight">
                  {level.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {level.summary}
                </p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
