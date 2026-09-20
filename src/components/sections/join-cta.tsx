import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { joinHref } from "@/lib/site";

type JoinCtaProps = {
  title?: string;
  description?: string;
};

/**
 * Closing call to action, shared by the marketing pages. The primary button
 * goes to the join form on the Community page. Do not render this on the
 * Community page itself, where the form is already on screen.
 */
export function JoinCta({
  title = "Join the InStackDev community.",
  description = "Learn on real projects, get feedback from experienced developers, and build experience you can point to. Tell us about yourself and we will be in touch about next steps.",
}: JoinCtaProps) {
  return (
    <section aria-labelledby="join-cta-heading" className="border-t border-border py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 md:p-14">
            <Eyebrow>Join the community</Eyebrow>
            <h2
              id="join-cta-heading"
              className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={joinHref}>
                  Join community
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/how-it-works">How it works</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
