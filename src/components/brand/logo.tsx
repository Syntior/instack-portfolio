import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Logo mark: five stacked bars that widen toward the base, a nod to the five
 * growth levels. The top bar carries the accent color.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      <rect x="9" y="2" width="6" height="2.6" rx="1.3" fill="var(--primary)" />
      <rect x="7" y="6.5" width="10" height="2.6" rx="1.3" fill="currentColor" opacity="0.85" />
      <rect x="5" y="11" width="14" height="2.6" rx="1.3" fill="currentColor" opacity="0.65" />
      <rect x="3" y="15.5" width="18" height="2.6" rx="1.3" fill="currentColor" opacity="0.45" />
      <rect x="1" y="20" width="22" height="2.6" rx="1.3" fill="currentColor" opacity="0.28" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md text-foreground",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[1.0625rem] font-semibold tracking-tight">
        InStack<span className="text-primary">Dev</span>
      </span>
    </Link>
  );
}
