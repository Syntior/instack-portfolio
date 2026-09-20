import { Compass, Layers } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { LevelsPath } from "@/components/sections/levels-path";
import { JoinCta } from "@/components/sections/join-cta";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";
import { principles } from "@/data/levels";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "The Developer Growth Levels: a five-step path from Learner to Lead, plus the Ownership and Project Selection principles behind every InStackDev project.",
  path: "/how-it-works",
});

const principleIcons = {
  ownership: Layers,
  "project-selection": Compass,
} as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Five levels. One clear path."
        description="Every member of the community follows the same map, from learning the basics to leading projects. Levels describe skills and responsibilities, and give everyone a shared language for what comes next."
      />

      <Section aria-labelledby="levels-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky on large screens so the heading stays beside the long path. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="levels-heading"
              eyebrow="Developer Growth Levels"
              title="From Learner to Lead"
              description="Five stages, each with its own skills and responsibilities. Start where you are and work up as you build."
            />

            <Reveal>
              <p className="mt-8 rounded-lg border border-dashed border-border p-5 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  A map, not a promise.
                </span>{" "}
                Levels describe the skills and responsibilities at each stage.
                They are not a guarantee of promotion, a role or payment.
              </p>
            </Reveal>
          </div>

          <LevelsPath />
        </div>
      </Section>

      <Section aria-labelledby="principles-heading" bordered>
        <SectionHeading
          id="principles-heading"
          eyebrow="How we work"
          title="Two principles behind every project"
          description="They shape which projects we take on and how contributors take part in them."
        />

        <ul role="list" className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((principle, index) => (
            <li key={principle.id}>
              <Reveal delay={index * 0.08} className="h-full">
                <FeatureCard
                  icon={principleIcons[principle.id as keyof typeof principleIcons]}
                  title={principle.title}
                  description={principle.body}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <JoinCta
        title="Ready to start at Level 1?"
        description="Apply to join, tell us where your interests lie, and we will help you find the right starting level."
      />
    </>
  );
}
