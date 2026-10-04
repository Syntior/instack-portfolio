import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/sections/contact-cta";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { projects, projectStatuses } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Client work, products and open projects from Syntior, all built to production standards.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="What we are building"
        description="Client work, products of our own, and projects we build in the open. Cards marked Placeholder show where upcoming projects will appear."
      />

      <Section aria-labelledby="portfolio-heading">
        <h2 id="portfolio-heading" className="sr-only">
          Project portfolio
        </h2>
        <ul role="list" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="project-types-heading" bordered>
        <SectionHeading
          id="project-types-heading"
          eyebrow="Project types"
          title="Three kinds of project"
          description="Where a project sits tells you who it is for and how it is run."
        />

        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {projectStatuses.map((item) => (
            <div key={item.status} className="bg-card p-6">
              <dt className="font-mono text-xs tracking-wider text-primary uppercase">
                {item.status}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.meaning}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <ContactCta />
    </>
  );
}
