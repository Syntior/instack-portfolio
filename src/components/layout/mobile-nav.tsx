"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/components/layout/nav-links";
import { primaryNav } from "@/lib/site";

/** Slide-out menu for small screens. Radix handles focus trapping and Escape. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu aria-hidden="true" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-4/5 max-w-xs p-0">
        <SheetHeader className="border-b border-border p-4 pr-14">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-6 p-4">
          <NavLinks
            items={primaryNav}
            orientation="vertical"
            onNavigate={close}
          />
          <div className="mt-auto flex flex-col gap-3">
            <Button asChild size="lg" className="font-brand" onClick={close}>
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
