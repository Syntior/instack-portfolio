import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { getAllUpdates } from "@/lib/updates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Updates",
  description:
    "News and progress from the InStackDev community: what shipped, what we learned, and what is next.",
  path: "/updates",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function UpdatesPage() {
  const updates = await getAllUpdates();

  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="News and progress"
        description="What shipped, what we learned, and what is next for InStackDev."
      />

      <Section aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          All updates
        </h2>

        {updates.length === 0 ? (
          <p className="text-muted-foreground">
            Nothing here yet. Check back soon.
          </p>
        ) : (
          <ul role="list" className="divide-y divide-border border-y border-border">
            {updates.map((update) => (
              <li key={update.slug}>
                <Link
                  href={`/updates/${update.slug}`}
                  className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <time
                    dateTime={update.date}
                    className="font-mono text-xs tracking-wide text-muted-foreground uppercase"
                  >
                    {dateFormat.format(new Date(update.date))}
                  </time>
                  <span>
                    <span className="block text-lg font-semibold tracking-tight group-hover:text-primary">
                      {update.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {update.summary}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="hidden size-5 text-muted-foreground transition-colors group-hover:text-primary sm:block"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
