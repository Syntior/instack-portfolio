import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/sections/contact-cta";
import { serviceAnchor, technologies } from "@/data/company";
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
          className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologies.map((technology) => (
            <li
              key={technology}
              id={serviceAnchor(technology)}
              className="scroll-mt-28 border-b border-border pb-4 text-lg font-medium target:text-primary"
            >
              {technology}
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta secondary={{ href: "/services", label: "See our services" }} />
    </>
  );
}
