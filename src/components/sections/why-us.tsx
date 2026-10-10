import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

/*
 * Keep these to promises the rest of the site backs up (the five-step process,
 * review and testing on every change). No hiring claims, headcounts or
 * guarantees unless they are real.
 */
const reasons = [
  {
    title: "The right process",
    description:
      "Every project follows the same five steps: scope, build, review, test, ship. You always know where things stand.",
  },
  {
    title: "The right standards",
    description:
      "Every change is reviewed by another developer and tested before it ships, whatever the size of the project.",
  },
  {
    title: "The right fit",
    description:
      "From a single feature to a full product, we shape the scope and the team around what you actually need.",
  },
  {
    title: "The right updates",
    description:
      "Plain-English progress you can follow from the first call to launch, and after it.",
  },
];

/** "Why work with us": centred heading and four checked reasons on a soft curved band. */
export function WhyUs() {
  return (
    <section
      aria-labelledby="why-us-heading"
      className="relative isolate overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* The curved band: a wide ellipse whose top edge arcs across the section. */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 h-[200%] w-[220%] -translate-x-1/2 rounded-[50%] bg-secondary sm:w-[160%] lg:w-[130%]"
      />

      <Container>
        <Reveal>
          <h2
            id="why-us-heading"
            className="mx-auto max-w-4xl text-center font-brand text-3xl leading-[1.15] font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-6xl"
          >
            No guesswork. Just software built right
            <span className="text-primary">.</span>
          </h2>
        </Reveal>

        <ul
          role="list"
          className="mx-auto mt-10 grid max-w-5xl gap-x-16 gap-y-8 sm:mt-14 md:grid-cols-2 md:gap-y-12"
        >
          {reasons.map((reason, index) => (
            <li key={reason.title}>
              <Reveal delay={index * 0.06} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 grid size-6 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground sm:size-7"
                >
                  <Check className="size-4 sm:size-5" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="font-brand text-xl font-semibold tracking-tight sm:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="mt-2 font-brand text-base leading-relaxed text-foreground/80 sm:text-lg">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
