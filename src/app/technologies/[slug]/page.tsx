import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, House } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";
import { TechLogo } from "@/components/brand/tech-logo";
import {
  getTechnology,
  technologies,
  technologySlug,
} from "@/data/technologies";
import { pageMetadata } from "@/lib/seo";

// Only the technologies in data/technologies.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return technologies.map((technology) => ({
    slug: technologySlug(technology),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/technologies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) return {};

  return pageMetadata({
    title: `${technology.fullName ?? technology.name} development`,
    description: technology.summary,
    path: `/technologies/${slug}`,
  });
}

export default async function TechnologyPage({
  params,
}: PageProps<"/technologies/[slug]">) {
  const { slug } = await params;
  const technology = getTechnology(slug);
  if (!technology) notFound();

  const displayName = technology.fullName ?? technology.name;
  const others = technologies.filter((other) => other !== technology);

  return (
    <>
      <section
        aria-labelledby="technology-heading"
        className="bg-hero border-b border-border"
      >
        <Container className="py-12 md:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="-m-2 flex items-center rounded-sm p-2 transition-colors hover:text-foreground"
                >
                  <House aria-hidden="true" className="size-4" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li>
                <Link
                  href="/technologies"
                  className="rounded-sm transition-colors hover:text-foreground"
                >
                  Technologies
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li>
                <span aria-current="page" className="font-semibold text-foreground">
                  {displayName}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
            <div className="lg:pt-8">
              <div className="flex items-center gap-4">
                <span className="flex size-16 items-center justify-center rounded-2xl border border-border bg-background p-3 shadow-sm">
                  <TechLogo technology={technology} className="size-full" />
                </span>
                <p className="text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {technology.name} development services
                </p>
              </div>
              <h1
                id="technology-heading"
                className="mt-5 font-brand text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
              >
                Build with {displayName},{" "}
                <span className="text-primary">to production standards.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {technology.summary} Tell us what you need, and we will help you
                plan it, build it and keep it running.
              </p>
              <p className="mt-8 inline-flex rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium">
                {technology.category}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border p-2.5">
                  <TechLogo technology={technology} className="size-full" />
                </span>
                <p className="font-brand text-2xl leading-snug font-semibold tracking-tight">
                  Get expert help for your {displayName} project.
                </p>
              </div>
              <div className="mt-6">
                <ContactForm
                  subject={`${displayName} project`}
                  messageLabel="Tell us about your needs"
                  submitLabel="Start your project"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section aria-labelledby="uses-heading">
        <h2
          id="uses-heading"
          className="font-brand text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          What we build with {technology.name}
        </h2>
        <ul role="list" className="mt-10 grid gap-6 md:grid-cols-3">
          {technology.uses.map((use) => (
            <li
              key={use}
              className="flex gap-4 rounded-xl border border-border bg-card p-6"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check aria-hidden="true" className="size-4" />
              </span>
              <span className="text-lg font-medium">{use}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="other-technologies-heading" bordered>
        <h2
          id="other-technologies-heading"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase"
        >
          <span aria-hidden="true" className="size-2.5 rounded-xs bg-primary" />
          Other technologies
        </h2>
        <ul role="list" className="mt-6 flex flex-wrap gap-3">
          {others.map((other) => (
            <li key={other.name}>
              <Link
                href={`/technologies/${technologySlug(other)}`}
                className="inline-flex rounded-full border border-border px-4 py-2 font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {other.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
