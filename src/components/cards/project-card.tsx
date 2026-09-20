import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/** Fixed cover size so the grid stays even and Next can reserve the space. */
const COVER_WIDTH = 1280;
const COVER_HEIGHT = 800;

function Cover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? `${project.name} preview`}
        width={COVER_WIDTH}
        height={COVER_HEIGHT}
        sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] w-full border-b border-border object-cover object-top"
      />
    );
  }

  // Stand-in frame: same aspect ratio as a real cover so cards line up. The
  // faint diagonal hatch reads as "wireframe", not as a broken image.
  return (
    <div
      aria-hidden="true"
      className="grid aspect-[16/10] w-full place-items-center border-b border-dashed border-border bg-[repeating-linear-gradient(135deg,transparent_0_10px,color-mix(in_oklab,var(--foreground)_5%,transparent)_10px_11px)] font-mono text-xs tracking-wider text-muted-foreground uppercase"
    >
      {project.placeholder ? "Placeholder" : "Preview coming soon"}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={cn(
        "h-full gap-0 p-0",
        project.placeholder &&
          "border border-dashed border-border bg-transparent ring-0",
      )}
    >
      <Cover project={project} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.6875rem] tracking-wide text-primary uppercase">
            {project.status}
          </span>
          {project.placeholder ? (
            <span className="rounded-md border border-dashed border-border px-2 py-0.5 font-mono text-[0.6875rem] tracking-wide text-muted-foreground uppercase">
              Placeholder
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-1">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {project.hrefLabel ?? "View project"}
              <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">
              Link available once the project is live
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
