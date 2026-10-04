import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/sections/contact-cta";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";
import {
  processSteps,
  serviceAnchor,
  serviceCatalog,
  services,
} from "@/data/company";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "What Syntior builds: web applications, products, front-end, APIs, DevOps, and ongoing support, all to production standards.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Software, built to production standards"
        description="We design, build and run software for our clients, and products of our own. Whatever the size of the project, the standards are the same."
      />

      <Section aria-labelledby="services-heading">
        <h2 id="services-heading" className="sr-only">
          What we offer
        </h2>
        <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.title} id={serviceAnchor(service.title)}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <FeatureCard {...service} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="catalog-heading" bordered>
        <SectionHeading
          id="catalog-heading"
          eyebrow="Everything we do"
          title="The full list of services"
          description="From a single feature to a full platform, these are the areas we work in."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          {serviceCatalog.map((group) => (
            <div key={group.title}>
              <h3 className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                <span aria-hidden="true" className="size-2.5 rounded-xs bg-primary" />
                {group.title}
              </h3>
              <ul
                role="list"
                className={cn(
                  "mt-6 grid gap-x-10 gap-y-4",
                  group.items.length > 8 && "sm:grid-cols-2",
                )}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    id={serviceAnchor(item)}
                    className="scroll-mt-28 text-lg font-medium target:text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="process" aria-labelledby="process-heading" bordered>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading
            id="process-heading"
            eyebrow="How we work"
            title="From scope to ship"
            description="Every project follows the same five steps, so you always know where things stand and what comes next."
          />

          <ol role="list" className="divide-y divide-border border-y border-border">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.07} className="flex gap-5 py-6">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-sm text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <ContactCta secondary={{ href: "/projects", label: "See our work" }} />
    </>
  );
}
