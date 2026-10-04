import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";

export type CtaLink = { href: string; label: string };

type CtaSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
};

/**
 * Closing call-to-action panel at the foot of a page. Use the presets:
 * `ContactCta` on company pages, `JoinCta` on community pages.
 */
export function CtaSection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: CtaSectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 md:p-14">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id="cta-heading"
              className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={primary.href}>
                  {primary.label}
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              {secondary ? (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondary.href}>{secondary.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
