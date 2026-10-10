import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";

type DiscussCtaProps = {
  title?: string;
  description?: string;
};

/**
 * A slim call to action card: heading and one line of copy on the left, one
 * large button on the right. Sits between sections; stacks on small screens.
 */
export function DiscussCta({
  title = "Let's discuss your business needs",
  description = "Tell us what you are looking to achieve. We will help you weigh your options, spot the risks early, and recommend the most effective next steps.",
}: DiscussCtaProps) {
  return (
    <section aria-labelledby="discuss-heading" className="py-10 sm:py-14">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-[0_10px_40px_-12px] shadow-foreground/10 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:p-10">
            <div className="max-w-3xl">
              <h2
                id="discuss-heading"
                className="font-brand text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-center font-brand text-lg font-semibold text-primary-foreground transition hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:max-w-xs"
            >
              <CalendarClock className="size-5 shrink-0" aria-hidden="true" />
              Schedule a 30-minute introductory call
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
