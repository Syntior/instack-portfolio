"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "theme";

/**
 * Dark is the default theme; the visitor can switch to light and the choice is
 * remembered.
 *
 * Before first paint, an inline script in the root layout applies the saved
 * theme, so there is no flash. This component only handles the toggle itself.
 * The icon is chosen with CSS (`dark:`) rather than React state, so the
 * server-rendered markup is identical for everyone and never mismatches.
 */
export function ThemeToggle() {
  // React's dev-mode remount resets <html>'s class to what the JSX declares
  // ("dark"), dropping the one the inline script applied. Re-apply it before
  // paint. In production this is a no-op.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      document.documentElement.classList.toggle("dark", saved !== "light");
    } catch {
      // Storage can be blocked (private mode, strict settings). Stay on default.
    }
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not persisted, but the toggle still works for this visit.
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground"
    >
      <Sun className="hidden dark:block" aria-hidden="true" />
      <Moon className="block dark:hidden" aria-hidden="true" />
      <span className="sr-only dark:hidden">Switch to dark mode</span>
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
    </Button>
  );
}
