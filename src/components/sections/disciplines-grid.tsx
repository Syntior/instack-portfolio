import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { disciplines } from "@/data/disciplines";
import { technologies, technologySlug } from "@/data/technologies";

const technologyHref = new Map(
  technologies.map((technology) => [
    technology.name.toLowerCase(),
    `/technologies/${technologySlug(technology)}`,
  ]),
);

const tagClass =
  "inline-flex items-center rounded-md border border-primary/70 px-3 py-1.5 font-brand text-sm font-medium text-primary";

/**
 * "Every discipline" band: a large heading, then one card per discipline with
 * a coloured icon tile, a short description and technology tags.
 */
export function DisciplinesGrid() {
  return (
    <section aria-labelledby="disciplines-heading" className="py-12 sm:py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <h2
            id="disciplines-heading"
            className="max-w-4xl font-brand text-3xl leading-[1.12] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            Every discipline you need. From first design to live release
            <span className="text-primary">.</span>
          </h2>
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 self-start border-b-2 border-foreground pb-2 font-brand text-lg font-medium transition-colors hover:border-primary hover:text-primary md:self-auto"
          >
            Everything we do
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </Link>
        </div>

        <ul role="list" className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((discipline, index) => {
            const Icon = discipline.icon;
            return (
              <li key={discipline.title}>
                <Reveal delay={(index % 3) * 0.08} className="h-full">
                  <article className="flex h-full flex-col rounded-2xl bg-secondary p-6 sm:p-8 lg:p-10">
                    <span
                      aria-hidden="true"
                      className="grid size-14 place-items-center rounded-xl text-white shadow-sm sm:size-16"
                      style={{ backgroundColor: discipline.color }}
                    >
                      <Icon className="size-7 sm:size-8" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 font-brand text-2xl leading-tight font-medium tracking-tight sm:mt-8 sm:text-3xl">
                      {discipline.title}
                    </h3>
                    <p className="mt-3 font-brand text-base leading-relaxed text-foreground/80 sm:text-lg">
                      {discipline.description}
                    </p>
                    <ul role="list" aria-label="Technologies" className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
                      {discipline.tags.map((tag) => {
                        const href = technologyHref.get(tag.toLowerCase());
                        return (
                          <li key={tag}>
                            {href ? (
                              <Link
                                href={href}
                                className={`${tagClass} transition-colors hover:bg-primary hover:text-primary-foreground`}
                              >
                                {tag}
                              </Link>
                            ) : (
                              <span className={tagClass}>{tag}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
