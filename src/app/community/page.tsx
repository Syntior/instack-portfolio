import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { JoinForm } from "@/components/forms/join-form";
import { FaqList } from "@/components/sections/faq-list";
import { LevelsOverview } from "@/components/sections/levels-overview";
import { MembersGallery } from "@/components/sections/members-gallery";
import { StatsStrip } from "@/components/sections/stats-strip";
import { FeatureCard } from "@/components/cards/feature-card";
import { Reveal } from "@/components/motion/reveal";
import { benefits, expectations } from "@/data/community";
import { communityStats } from "@/data/community-stats";
import { joinFaq } from "@/data/faq";
import { members } from "@/data/members";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Syntior Community",
  description:
    "Syntior Community is the developer community of Syntior. Apply to become a contributor, meet the members, and see what contributors get and what we expect in return.",
  path: "/community",
});

/** The steps after applying. No timelines or outcomes are promised. */
const steps = [
  {
    title: "We review your application",
    body: "Someone from the team reads what you send, and looks at your GitHub profile.",
  },
  {
    title: "You review the Contributor Agreement",
    body: "We share the agreement so you can read through it before you start.",
  },
  {
    title: "We assign your starting level",
    body: "You begin at the level that fits your experience, with a clear next step.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title={site.community.name}
        description={`${site.community.name} is the developer community of Syntior: a place to learn by doing real work on real projects, alongside people who care about doing it well.`}
      >
        <StatsStrip stats={communityStats} />
      </PageHeader>

      {/* Every "Join community" button on the site lands here (/community#join). */}
      <Section aria-labelledby="join-heading">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div id="join">
            <SectionHeading
              id="join-heading"
              eyebrow="Join"
              title="Join the community"
              description="Tell us a little about yourself and where you want to grow. It takes a couple of minutes."
            />
            <div className="mt-10">
              <JoinForm />
            </div>
          </div>

          <aside aria-labelledby="next-heading" className="lg:pt-1">
            <h2
              id="next-heading"
              className="font-mono text-xs font-medium tracking-wider text-primary uppercase"
            >
              What happens next
            </h2>
            <ol role="list" className="mt-6 space-y-6">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card font-mono text-sm text-primary"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/community/how-it-works"
              className="mt-8 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              How the five levels work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </Section>

      <Section aria-labelledby="members-heading" bordered>
        <div id="members">
          <SectionHeading
            id="members-heading"
            eyebrow="Meet the community"
            title="The people behind the projects"
            description="Community members at every level, working on real projects together."
          />
          <MembersGallery members={members} />
        </div>
      </Section>

      <LevelsOverview />

      <Section aria-labelledby="benefits-heading" bordered>
        <SectionHeading
          id="benefits-heading"
          eyebrow="What contributors get"
          title="Experience you can point to"
          description="Learning happens on real projects, with real feedback, using the tools professional teams rely on."
        />

        <ul role="list" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <li key={benefit.title}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <FeatureCard {...benefit} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="expectations-heading" bordered>
        <SectionHeading
          id="expectations-heading"
          eyebrow="What we expect"
          title="Serious about the work, kind to the people"
          description="A few simple expectations keep the community useful for everyone in it."
        />

        <ul role="list" className="mt-12 grid gap-6 md:grid-cols-3">
          {expectations.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.08} className="h-full">
                <FeatureCard {...item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="faq-heading" bordered>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title="Before you apply"
            description="Straight answers to the questions people ask most."
          />
          <FaqList items={joinFaq} />
        </div>
      </Section>
    </>
  );
}
