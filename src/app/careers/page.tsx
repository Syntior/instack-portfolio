import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";
import { roles, values } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Work at Syntior. See open roles, how we work, and how to get in touch about joining the team.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Work at Syntior"
        description="We are a software company that cares about doing the work well: clear standards, honest code review, and real ownership of what you build."
      />

      <Section aria-labelledby="roles-heading">
        <SectionHeading
          id="roles-heading"
          eyebrow="Open roles"
          title="Current openings"
        />

        {roles.length > 0 ? (
          <ul role="list" className="mt-10 space-y-4">
            {roles.map((role) => (
              <li key={role.title}>
                <Card className="gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {role.title}
                    </h3>
                    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" aria-hidden="true" />
                        {role.type}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden="true" />
                        {role.location}
                      </span>
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="self-start md:self-auto">
                    <Link href="/contact">
                      Apply
                      <span className="sr-only"> for {role.title}</span>
                      <ArrowRight aria-hidden="true" data-icon="inline-end" />
                    </Link>
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="mt-10 flex flex-col gap-6 rounded-xl border border-dashed border-border p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-muted text-primary"
                >
                  <BriefcaseBusiness className="size-5" />
                </span>
                <div>
                  <p className="font-semibold tracking-tight">
                    No open roles right now
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    We are not hiring for a specific role at the moment. If you
                    think you would be a good fit, send us a message and tell
                    us about yourself.
                  </p>
                </div>
              </div>
              <Button asChild className="self-start sm:self-auto">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </Reveal>
        )}
      </Section>

      <Section aria-labelledby="values-heading" bordered>
        <SectionHeading
          id="values-heading"
          eyebrow="How we work"
          title="What working here looks like"
          description="The standards we hold every project to, and what we look for in the people who join us."
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
    </>
  );
}
