import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/brand/logo";
import { GitHubIcon } from "@/components/brand/github-icon";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { joinHref, primaryNav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <NavLinks items={primaryNav} />
        </nav>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <span className="sr-only">
                {site.name} on GitHub (opens in a new tab)
              </span>
            </a>
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2 hidden sm:inline-flex">
            <Link href={joinHref}>Join community</Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
