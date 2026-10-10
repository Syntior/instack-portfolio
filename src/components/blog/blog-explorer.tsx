"use client";

import { useDeferredValue, useId, useState } from "react";
import { Search, X } from "lucide-react";
import { PostCard, type PostSummary } from "@/components/blog/post-card";
import { blogCategories, type BlogCategory } from "@/lib/blog-categories";
import { cn } from "@/lib/utils";

/**
 * The post list with a search box and category filters. Everything is already
 * on the page, so filtering happens in the browser with no extra requests.
 */
export function BlogExplorer({ posts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const deferredQuery = useDeferredValue(query);
  const searchId = useId();

  // Only offer categories that have posts.
  const used = blogCategories.filter((name) => posts.some((post) => post.category === name));

  const needle = deferredQuery.trim().toLowerCase();
  const visible = posts.filter(
    (post) =>
      (category === "All" || post.category === category) &&
      (!needle ||
        [post.title, post.summary, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle)),
  );

  // The newest post gets the wide card, but only in the unfiltered view.
  const showFeatured = category === "All" && !needle && visible.length > 1;
  const [featured, ...rest] = visible;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          // Scrolls sideways on small screens instead of wrapping onto many lines.
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {(["All", ...used] as const).map((name) => {
            const count =
              name === "All" ? posts.length : posts.filter((post) => post.category === name).length;
            const active = category === name;
            return (
              <button
                key={name}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(name)}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {name}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs tabular-nums",
                    active ? "bg-primary-foreground/20" : "bg-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <label htmlFor={searchId} className="sr-only">
            Search posts
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts…"
            className="h-11 w-full rounded-full border border-input bg-background pr-10 pl-10 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "post" : "posts"} shown
      </p>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-8 text-center sm:p-12">
          <p className="font-semibold">No posts match your search.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another word, or show every category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
          >
            Show all posts
          </button>
        </div>
      ) : (
        <ul role="list" className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {showFeatured ? (
            <li className="sm:col-span-2 lg:col-span-3">
              <PostCard post={featured} featured />
            </li>
          ) : null}
          {(showFeatured ? rest : visible).map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
