import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faq";

/**
 * Collapsible Q&A built on native <details>/<summary>.
 *
 * Native disclosure elements were chosen over a JavaScript accordion on
 * purpose: every answer is always present in the HTML, so it is readable
 * without JavaScript and visible to search engines, and keyboard and
 * screen-reader support comes from the browser. The shared `name` makes
 * browsers that support it keep one item open at a time.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card px-5">
      {items.map((item) => (
        <details key={item.id} name="faq" className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-base font-medium hover:underline [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="pb-4 text-base leading-relaxed text-muted-foreground">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
