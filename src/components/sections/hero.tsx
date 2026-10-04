import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import heroTeam from "../../../public/images/hero-team.jpg";

/*
 * Full-bleed photo on the right that fades into the page background on its
 * left edge, so the headline sits on clean space. On small screens the photo
 * drops below the copy as a plain rounded image.
 *
 * Photo: Unsplash licence (images.unsplash.com/photo-1531482615713-2afd69097998), stock
 * imagery, not the Syntior team. Swap in a real team photo when there is one.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-hero relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-1/2 [mask-image:linear-gradient(to_right,transparent,rgba(0,0,0,0.6)_30%,#000_60%)] lg:block"
      >
        <Image
          src={heroTeam}
          alt=""
          fill
          priority
          sizes="50vw"
          placeholder="blur"
          className="object-cover object-[70%_center]"
        />
      </div>

      <Container className="relative py-20 md:py-28 lg:py-36">
        <Reveal immediate>
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="font-brand text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl xl:text-7xl"
            >
              Turn your roadmap into{" "}
              <span className="text-primary">production-ready software.</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
              Syntior designs, builds and runs{" "}
              <strong className="font-semibold text-foreground">
                web applications and products
              </strong>{" "}
              for our clients and for ourselves, held to{" "}
              <strong className="font-semibold text-foreground">
                production standards
              </strong>{" "}
              from the first commit.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a project
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Our services</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Image
          src={heroTeam}
          alt="Two developers reviewing code together on a laptop in a bright office."
          sizes="(min-width: 640px) 90vw, 100vw"
          placeholder="blur"
          className="mt-12 aspect-[4/3] w-full rounded-xl object-cover object-[70%_center] lg:hidden"
        />
      </Container>
    </section>
  );
}
