import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Facets of the logo mark on a 24×24 grid: a diamond (the dot of an "i")
 * floating over two folded layers (the stack). Each shape is split into a
 * left and right half in two blues, which gives the folded look. Fixed colors
 * read on both themes, and the Open Graph image and app/icon.svg reuse them.
 */
export const logoFacets = [
  { points: "5,5.25 12,1.75 12,8.75", fill: "#2f7bff" },
  { points: "12,1.75 19,5.25 12,8.75", fill: "#0b4fe0" },
  { points: "2,6.25 12,11.25 12,15.75 2,10.75", fill: "#0b4fe0" },
  { points: "22,6.25 12,11.25 12,15.75 22,10.75", fill: "#2f7bff" },
  { points: "2,12.75 12,17.75 12,22.25 2,17.25", fill: "#0838b8" },
  { points: "22,12.75 12,17.75 12,22.25 22,17.25", fill: "#1a5cff" },
];

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-10 sm:size-12", className)}
    >
      {logoFacets.map((facet) => (
        <polygon key={facet.points} {...facet} />
      ))}
    </svg>
  );
}

/** Mark plus the "Syntior" wordmark in Outfit. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md font-brand text-3xl leading-none font-semibold tracking-tight text-primary sm:text-4xl",
        className,
      )}
    >
      <LogoMark />
      Syntior
    </Link>
  );
}
