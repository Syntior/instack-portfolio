import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import heroErp from "../../../public/images/hero-erp.webp";

/*
 * Copy on the left, an ERP dashboard illustration on the right. On phones and
 * tablets the copy is centred and the illustration sits below it.
 *
 * The illustration (public/images/hero-erp.webp) is original artwork with
 * sample figures, not a real customer's data.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-hero relative overflow-hidden border-b border-border"
    >
      <Container className="relative grid items-center gap-10 py-12 sm:gap-14 sm:py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-28 xl:gap-16">
        <Reveal immediate>
          {/* Centred on phones and tablets; left-aligned beside the illustration on desktop. */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h1
              id="hero-heading"
              className="font-brand text-[2rem] leading-[1.15] font-medium tracking-tight text-balance sm:text-5xl sm:leading-[1.08] lg:text-[3.25rem] xl:text-6xl"
            >
              Turn your roadmap into{" "}
              <span className="text-primary">production-ready software.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-brand text-[1.0625rem] leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl lg:mx-0">
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
            <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start">
              <Button asChild size="lg" className="font-brand">
                <Link href="/contact">
                  Start a project
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-brand">
                <Link href="/services">Our services</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Image
          src={heroErp}
          alt="An ERP dashboard showing revenue, orders, inventory and recent orders, with modules for finance, sales, inventory and HR."
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="mx-auto w-full max-w-2xl lg:max-w-none xl:w-[110%] 2xl:w-[120%]"
        />
      </Container>
    </section>
  );
}
