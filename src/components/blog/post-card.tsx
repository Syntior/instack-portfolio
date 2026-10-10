import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Code2,
  Globe,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { BlogCategory } from "@/lib/blog-categories";
import type { Update } from "@/lib/updates";
import { cn } from "@/lib/utils";

/** Fields a card needs. A plain object, so it can cross into client components. */
export type PostSummary = Pick<
  Update,
  "slug" | "title" | "date" | "summary" | "category" | "tags" | "readingMinutes" | "cover"
>;

export const categoryIcons: Record<BlogCategory, LucideIcon> = {
  AI: Sparkles,
  "Web Development": Globe,
  Security: ShieldCheck,
  Engineering: Code2,
  Industry: TrendingUp,
  Company: Building2,
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}

export function CategoryBadge({
  category,
  className,
}: {
  category: BlogCategory;
  className?: string;
}) {
  const Icon = categoryIcons[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {category}
    </span>
  );
}

/** Date and reading time, e.g. "6 Oct 2026 · 5 min read". */
export function PostMeta({ post, className }: { post: PostSummary; className?: string }) {
  return (
    <p className={cn("text-xs text-muted-foreground sm:text-sm", className)}>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true"> · </span>
      {post.readingMinutes} min read
    </p>
  );
}

/**
 * A post in a list. `featured` is the wide card for the newest post. The whole
 * card is one link; the title is its accessible name.
 */
export function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  const Icon = categoryIcons[post.category];

  return (
    <Link
      href={`/updates/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:hover:translate-y-0",
        featured && "md:grid md:grid-cols-[1.1fr_1fr]",
      )}
    >
      {post.cover ? (
        // Covers are decorative; the title carries the meaning.
        <div
          className={cn(
            "relative aspect-[1200/630] overflow-hidden bg-muted",
            featured && "md:order-2 md:aspect-auto md:h-full md:min-h-72",
          )}
        >
          <Image
            src={post.cover}
            alt=""
            fill
            priority={featured}
            sizes={
              featured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : (
        // No cover image: the category's icon on a soft gradient.
        <div
          aria-hidden="true"
          className={cn(
            "relative grid place-items-center overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-transparent",
            featured ? "h-40 sm:h-52 md:order-2 md:h-full md:min-h-72" : "h-32 sm:h-36",
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:18px_18px] opacity-70" />
          <span className="relative grid size-14 place-items-center rounded-2xl border border-primary/20 bg-card text-primary shadow-sm transition-transform group-hover:scale-105 sm:size-16">
            <Icon className="size-7 sm:size-8" />
          </span>
        </div>
      )}

      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "md:p-8 lg:p-10")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <CategoryBadge category={post.category} />
          {featured ? (
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Latest
            </span>
          ) : null}
        </div>
        <h3
          className={cn(
            "mt-4 font-semibold tracking-tight text-balance group-hover:text-primary",
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-2 leading-relaxed text-muted-foreground",
            featured ? "text-base sm:text-lg" : "line-clamp-3 text-sm sm:text-[0.9375rem]",
          )}
        >
          {post.summary}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <PostMeta post={post} />
          <ArrowUpRight
            className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
