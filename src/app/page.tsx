import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Hero } from "@/components/sections/hero";
import { LevelsOverview } from "@/components/sections/levels-overview";
import { JoinCta } from "@/components/sections/join-cta";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";
import { jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "We build software",
    body: "InStackDev is a working software company. We build products and client solutions to production standards.",
  },
  {
    title: "A community inside the company",
    body: "Developers join the community to learn professional workflows, from Git and code review to testing and CI/CD, with mentorship and clear standards.",
  },
  {
    title: "Real projects, real ownership",
    body: "Community members work on real projects and own modules and features, not just tickets. As they build experience, they can take on more.",
  },
];

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  sameAs: [site.github.url, ...site.socials.map((social) => social.href)],
};

export default function HomePage() {
  const featured = projects.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }}
      />

      <Hero />

      <Section aria-labelledby="what-is-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            id="what-is-heading"
            eyebrow="What InStackDev is"
            title="A software company with a community inside it"
            description="InStackDev builds software. Alongside that work, we have started a community where serious developers learn on real projects, own what they build, and grow through five clear levels."
          />

          <ol role="list" className="divide-y divide-border border-y border-border">
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal delay={index * 0.08} className="flex gap-5 py-6">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-sm text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <LevelsOverview />

      <Section aria-labelledby="featured-projects-heading" bordered>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="featured-projects-heading"
            eyebrow="Projects"
            title="What we are building"
            description="A first look at our work: community projects, client work and products. Cards marked Placeholder show where upcoming projects will appear."
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/projects">
              All projects
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <ul role="list" className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={index * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <JoinCta />
    </>
  );
}
