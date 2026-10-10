import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/sections/contact-cta";
import { TechLogo } from "@/components/brand/tech-logo";
import { technologies, technologySlug } from "@/data/technologies";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technologies",
  description:
    "The languages, frameworks and platforms Syntior builds with, from React and Node.js to .NET, Python, AWS and Azure.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Technologies"
        title="The stack behind the work"
        description="We pick the right tool for each project, and hold the result to the same production standards whatever it is built with."
      />

      <Section aria-labelledby="technologies-heading">
        <h2
          id="technologies-heading"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase"
        >
          <span aria-hidden="true" className="size-2.5 rounded-xs bg-primary" />
          Technologies we work with
        </h2>
        <ul
          role="list"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((technology) => (
            <li key={technology.name}>
              <Link
                href={`/technologies/${technologySlug(technology)}`}
                className="group flex h-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
              >
                <span className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background p-2">
                    <TechLogo technology={technology} className="size-full" />
                  </span>
                  <span>
                    <span className="block text-lg font-semibold group-hover:text-primary">
                      {technology.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {technology.category}
                    </span>
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta
        secondary={{ href: "/services", label: "See our services" }}
      />
    </>
  );
}
