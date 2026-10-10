"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Link2, Share2 } from "lucide-react";
import type { Heading } from "@/lib/updates";
import { cn } from "@/lib/utils";

/** Thin bar under the header that fills as the reader scrolls the article. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;
    function update() {
      frame = 0;
      const rect = target!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const done = total <= 0 ? 1 : -rect.top / total;
      setProgress(Math.min(1, Math.max(0, done)));
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-16 z-30 h-0.5 bg-transparent">
      <div
        className="h-full origin-left bg-primary transition-transform duration-150 motion-reduce:transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/** The heading currently at the top of the screen, for highlighting in the contents. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band near the top of the viewport counts as "reading this section".
      { rootMargin: "-80px 0px -65% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function ContentsList({
  headings,
  active,
  onNavigate,
}: {
  headings: Heading[];
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <ol role="list" className="space-y-1 border-l border-border">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={onNavigate}
            aria-current={active === heading.id ? "location" : undefined}
            className={cn(
              "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors",
              active === heading.id
                ? "border-primary font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * "On this page": a collapsible box above the article on small screens, and a
 * sticky sidebar on large ones. Both highlight the section being read.
 */
export function TableOfContents({
  headings,
  variant,
}: {
  headings: Heading[];
  variant: "mobile" | "sidebar";
}) {
  const active = useActiveHeading(headings.map((heading) => heading.id));
  const [open, setOpen] = useState(false);

  if (headings.length < 2) return null;

  if (variant === "sidebar") {
    return (
      <nav aria-label="On this page">
        <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          On this page
        </p>
        <ContentsList headings={headings} active={active} />
      </nav>
    );
  }

  return (
    <nav aria-label="On this page" className="rounded-xl border border-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold"
      >
        On this page
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="px-4 pb-4">
          <ContentsList headings={headings} active={active} onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </nav>
  );
}

/**
 * Share links. Uses the phone's own share sheet where available, plus a copy
 * button and direct links to X and LinkedIn. `url` is the post's public URL.
 */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Read after mount: `navigator` does not exist during server rendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address bar still works.
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const buttonClass =
    "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium transition hover:border-primary/40 hover:text-primary";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canShare ? (
        <button
          type="button"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
          className={buttonClass}
        >
          <Share2 className="size-4" aria-hidden="true" />
          Share
        </button>
      ) : null}
      <button type="button" onClick={copy} className={buttonClass}>
        {copied ? (
          <Check className="size-4 text-primary" aria-hidden="true" />
        ) : (
          <Link2 className="size-4" aria-hidden="true" />
        )}
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
      <a
        href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        X<span className="sr-only"> (share on X, opens in a new tab)</span>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        LinkedIn<span className="sr-only"> (share on LinkedIn, opens in a new tab)</span>
      </a>
    </div>
  );
}
