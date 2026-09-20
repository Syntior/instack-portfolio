import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { GrowthFlow } from "@/components/sections/growth-flow";
import { JoinCta } from "@/components/sections/join-cta";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "InStackDev is a software company with a developer community inside it. Learn how the community, our projects, and the company fit together.",
  path: "/about",
});

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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A software company, and the community inside it"
        description="InStackDev is a software company. We started a community inside it so that developers can learn on real projects, and so that the company grows alongside people who know how we work."
      />

      <Section aria-labelledby="vision-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            id="vision-heading"
            eyebrow="How it fits together"
            title="One path, four stages"
            description="We are not running a course, and we are not running a club. The community is how developers grow alongside a working software company."
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

      <JoinCta />
    </>
  );
}
