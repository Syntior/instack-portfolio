"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/site";

type NavLinksProps = {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
  /** Called after a link is chosen, e.g. to close the mobile menu. */
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

/** Primary navigation links with `aria-current` on the active route. */
export function NavLinks({
  items,
  orientation = "horizontal",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "flex",
        orientation === "horizontal"
          ? "items-center gap-1"
          : "flex-col gap-1",
      )}
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                orientation === "vertical" && "py-3 text-base",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
                active &&
                  orientation === "horizontal" &&
                  "underline decoration-primary decoration-2 underline-offset-8",
                active &&
                  orientation === "vertical" &&
                  "bg-muted",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
