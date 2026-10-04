import { Compass, Layers } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { GrowthFlow } from "@/components/sections/growth-flow";
import { LevelsPath } from "@/components/sections/levels-path";
import { JoinCta } from "@/components/sections/join-cta";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";
import { principles } from "@/data/levels";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "How Syntior Community works: the five Developer Growth Levels from Learner to Lead, the principles behind every project, and how community work feeds into Syntior.",
  path: "/community/how-it-works",
});

/** Moved from the About page: how a community member's work reaches the company. */
const phases = [
  {
    title: "The community is where people learn",
    body: "Everyone begins by learning how professional teams work: version control, code review, testing and clear standards, with mentors who help along the way.",
  },
  {
    title: "Real projects are where they practise",
    body: "Community members apply those skills to real projects and take ownership of modules and features, instead of working on isolated tickets.",
  },
  {
    title: "Products and client work are where it counts",
    body: "Projects that prove their value become products or client solutions, built and maintained to production standards.",
  },
  {
    title: "The company grows with them",
    body: "As members build experience and take on ownership, the company gains developers who know how we work, and technical leadership grows from within.",
  },
];

const principleIcons = {
  ownership: Layers,
  "project-selection": Compass,
} as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${site.community.name} · How it works`}
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

      <Section aria-labelledby="fit-heading" bordered>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            id="fit-heading"
            eyebrow="How it fits together"
            title="One path, four stages"
            description="We are not running a course, and we are not running a club. The community is how developers grow alongside Syntior, a working software company."
          />

          <ol role="list" className="divide-y divide-border border-y border-border">
            {phases.map((phase, index) => (
              <li key={phase.title}>
                <Reveal delay={index * 0.07} className="flex gap-5 py-6">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-sm text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {phase.title}
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                      {phase.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="growth-model-heading" bordered>
        <SectionHeading
          id="growth-model-heading"
          eyebrow="The growth model"
          title="How community work becomes company work"
          description="Each stage builds on the one before it. The community feeds the projects, the projects grow into products and client work, and that work brings in the revenue that sustains the company and the community."
        />

        <div className="mt-14">
          <GrowthFlow />
        </div>

        <Reveal>
          <p className="mt-14 max-w-3xl rounded-lg border border-dashed border-border p-5 text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              A direction, not a promise.
            </span>{" "}
            This is how the community and the company fit together, and where we
            want to take them. Each stage depends on the projects we take on and
            the people who build them, so we do not promise specific outcomes,
            timelines, jobs, payment or equity.
          </p>
        </Reveal>
      </Section>

      <JoinCta
        title="Ready to start at Level 1?"
        description="Apply to join, tell us where your interests lie, and we will help you find the right starting level."
      />
    </>
  );
}
