"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { megaMenu } from "@/data/mega-menu";
import type { NavItem } from "@/lib/site";

/** How long the pointer may be away before a hover-opened panel closes. */
const CLOSE_DELAY_MS = 150;

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

/**
 * Desktop navigation with a full-width mega menu panel under the header, plus
 * a dimmed overlay over the page. Items with an entry in `data/mega-menu.ts`
 * open a panel on hover (mouse) or click; the rest are plain links.
 *
 * The panel is positioned against the sticky <header>, its nearest positioned
 * ancestor. Escape, the close button, a click outside, or following a link
 * closes it.
 */
export function MegaMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [openHref, setOpenHref] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  const panel = openHref ? megaMenu[openHref] : undefined;

  function cancelClose() {
    window.clearTimeout(closeTimer.current);
  }

  function close() {
    cancelClose();
    setOpenHref(null);
  }

  function scheduleClose(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenHref(null), CLOSE_DELAY_MS);
  }

  useEffect(() => {
    if (!openHref) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      triggerRefs.current.get(openHref!)?.focus();
      setOpenHref(null);
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpenHref(null);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openHref]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <div ref={rootRef} onPointerLeave={scheduleClose} onPointerEnter={cancelClose}>
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          const hasPanel = item.href in megaMenu;
          const open = openHref === item.href;
          const itemClass = cn(
            "flex h-20 items-center gap-1.5 px-2.5 font-brand text-base font-semibold text-foreground transition-colors xl:px-4 xl:text-lg 2xl:px-5",
            // Dark text everywhere; blue marks hover, the open panel and the current page.
            "hover:text-primary",
            active && "text-primary",
            open && "bg-primary/10 text-primary",
          );

          if (!hasPanel) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={itemClass}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") close();
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <button
                type="button"
                ref={(node) => {
                  if (node) triggerRefs.current.set(item.href, node);
                  else triggerRefs.current.delete(item.href);
                }}
                aria-expanded={open}
                aria-controls="mega-menu-panel"
                aria-current={active ? "page" : undefined}
                className={itemClass}
                onClick={() => setOpenHref(open ? null : item.href)}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "mouse") return;
                  cancelClose();
                  setOpenHref(item.href);
                }}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-200",
                    open && "rotate-180",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {panel ? (
        <>
          {/* Dims the page under the panel; clicking it closes the menu. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-full h-screen bg-foreground/25 animate-in fade-in-0"
            onClick={close}
            onPointerEnter={scheduleClose}
          />
          <div
            id="mega-menu-panel"
            className="absolute inset-x-0 top-full border-y border-border bg-background shadow-lg animate-in fade-in-0 slide-in-from-top-2"
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-8 py-10 lg:grid-cols-[minmax(0,18rem)_1fr_auto]">
              <div>
                <p className="font-brand text-2xl font-semibold tracking-tight">
                  {panel.intro.title}
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {panel.intro.text}
                </p>
                <Link
                  href={panel.intro.link.href}
                  onClick={close}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                >
                  {panel.intro.link.label}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-14 gap-y-10">
                {panel.columns.map((column) => (
                  <div key={column.title}>
                    <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      <span aria-hidden="true" className="size-2.5 rounded-xs bg-primary" />
                      {column.title}
                    </p>
                    <ul
                      className={cn(
                        "mt-5 grid gap-y-3.5",
                        column.cols === 2 && "grid-cols-2 gap-x-12",
                        column.cols === 3 && "grid-cols-3 gap-x-24",
                      )}
                    >
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={close}
                            className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  triggerRefs.current.get(openHref!)?.focus();
                  close();
                }}
                className="self-start rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X aria-hidden="true" className="size-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <div className="border-t border-border bg-hero">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-8 py-5">
                <p className="text-lg font-semibold">Have a project in mind?</p>
                <Link
                  href="/contact"
                  onClick={close}
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                >
                  Talk to us
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
