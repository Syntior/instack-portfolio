import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Hero } from "@/components/sections/hero";
import { ContactCta } from "@/components/sections/contact-cta";
import { FeatureCard } from "@/components/cards/feature-card";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/data/company";
import { projects } from "@/data/projects";
import { jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

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

      <Section aria-labelledby="services-heading">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="What we build"
            description="Software for our clients, and products of our own, built and shipped to production standards."
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/services">
              All services
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <ul role="list" className="mt-12 grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((service, index) => (
            <li key={service.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <FeatureCard {...service} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="featured-projects-heading" bordered>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="featured-projects-heading"
            eyebrow="Projects"
            title="What we are building"
            description="A first look at our work. Cards marked Placeholder show where upcoming projects will appear."
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

      <ContactCta />
    </>
  );
}
