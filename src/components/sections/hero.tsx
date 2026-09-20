import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { TerminalCard } from "@/components/sections/terminal-card";
import { joinHref, site } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0" />

      <Container className="relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16 lg:py-32">
        <div>
          <Reveal immediate>
            <Eyebrow>Software company + community</Eyebrow>
            <h1
              id="hero-heading"
              className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-[3.5rem] xl:leading-[1.06]"
            >
              Building software, and the developers behind it
              <span className="block text-primary">— one project at a time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {site.vision}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={joinHref}>
                  Join community
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">About the company</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal immediate delay={0.15}>
          <TerminalCard />
        </Reveal>
      </Container>
    </section>
  );
}
