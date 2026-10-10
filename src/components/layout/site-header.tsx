import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/brand/logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { primaryNav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-20 max-w-none items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <MegaMenu items={primaryNav} />
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild className="ml-2 hidden font-brand text-base sm:inline-flex xl:text-lg">
            <Link href="/contact">Contact us</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
