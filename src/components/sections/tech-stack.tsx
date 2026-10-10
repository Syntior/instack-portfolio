import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import {
  technologies,
  technologySlug,
  type Technology,
} from "@/data/technologies";

const half = Math.ceil(technologies.length / 2);
const rows = [technologies.slice(0, half), technologies.slice(half)];

/**
 * One row of large technology names sliding sideways on a loop. The list is
 * rendered twice so shifting by -50% is seamless; the copy is hidden from
 * assistive tech and the keyboard. Hovering pauses the row, and with reduced
 * motion the row stands still and wraps instead (see `.marquee` in
 * globals.css).
 */
function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Technology[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div className={cn("marquee", reverse && "marquee-reverse")}>
        {[false, true].map((copy) => (
          <ul
            key={String(copy)}
            role="list"
            aria-hidden={copy || undefined}
            className="marquee-list"
          >
            {items.map((technology) => (
              <li key={technology.name}>
                <Link
                  href={`/technologies/${technologySlug(technology)}`}
                  tabIndex={copy ? -1 : undefined}
                  className="block rounded-md px-6 font-brand text-5xl font-semibold whitespace-nowrap text-foreground/25 transition-colors hover:text-primary sm:text-6xl"
                >
                  {technology.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** Home page band listing every technology, linking to /technologies. */
export function TechStack() {
  return (
    <section
      aria-labelledby="tech-stack-heading"
      className="border-t border-border bg-secondary/60 py-14 sm:py-20 md:py-28"
    >
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="tech-stack-heading"
            className="font-brand text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Yes, we cover the tech stack you rely on
            <span className="text-primary">.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Our team works across {technologies.length} languages, frameworks
            and platforms, from the front end to the cloud, and picks the right
            one for each project.
          </p>
        </Reveal>
      </Container>

      <div className="mt-14 space-y-6">
        <MarqueeRow items={rows[0]} />
        <MarqueeRow items={rows[1]} reverse />
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/technologies"
          className="inline-flex items-center gap-2.5 border-b-2 border-foreground pb-2 text-lg font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          Our full repertoire
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </div>
    </section>
  );
}
