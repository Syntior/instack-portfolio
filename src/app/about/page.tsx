import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/sections/contact-cta";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";
import { values } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Syntior is a software company. Learn what we build, how we work, and the standards we hold every project to.",
  path: "/about",
});

const work = [
  {
    title: "Client projects",
    body: "Software we build for other businesses: scoped together, then delivered to production standards.",
  },
  {
    title: "Our own products",
    body: "Products that Syntior owns and runs, and keeps improving over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About Syntior"
        description="Syntior is a software company. We build software for our clients, and products of our own, and we hold all of it to the same production standards."
      />

      <Section aria-labelledby="work-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <SectionHeading
              id="work-heading"
              eyebrow="What we do"
              title="Two kinds of work"
              description="Everything we build falls into one of two groups. Both follow the same workflow, from scope to ship."
            />
            <Button asChild variant="outline" className="mt-8">
              <Link href="/services">
                Our services
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <ol role="list" className="divide-y divide-border border-y border-border">
            {work.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.07} className="flex gap-5 py-6">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-sm text-primary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section aria-labelledby="values-heading" bordered>
        <SectionHeading
          id="values-heading"
          eyebrow="How we work"
          title="The standards behind every project"
          description="The same principles apply whether we are building for a client or for ourselves."
        />

        <ul role="list" className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <li key={value.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <FeatureCard {...value} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="community-heading" bordered>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="community-heading"
            eyebrow="Part of Syntior"
            title={site.community.name}
            description={`${site.community.name} is the developer community of Syntior. It has its own section of this site.`}
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link href="/community">
              Visit the community
              <ArrowRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
