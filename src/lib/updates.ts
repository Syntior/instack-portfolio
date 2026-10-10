import "server-only";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { blogCategories, type BlogCategory } from "@/lib/blog-categories";
import { headingId } from "@/lib/headings";
import { site } from "@/lib/site";

/**
 * A tiny content collection for the blog (served under /updates).
 *
 * Each post is an MDX file in `src/content/updates/`. The file name is the URL
 * slug, and the post's details are exported from the file itself:
 *
 *     export const meta = {
 *       title: "…",
 *       date: "2026-01-31",        // ISO date, used for sorting
 *       summary: "…",              // one sentence, shown in the list and in search results
 *       category: "Engineering",   // one of `blogCategories` below
 *       tags: ["Next.js", "React"],// optional
 *       author: "Syntior Team",    // optional
 *     };
 *
 * Reading time and the table of contents are worked out from the file. A cover
 * image is picked up automatically from `public/images/blog/<slug>.webp`.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "updates");
const COVER_DIR = path.join(process.cwd(), "public", "images", "blog");

export type UpdateMeta = {
  title: string;
  date: string;
  summary: string;
  category?: BlogCategory;
  tags?: string[];
  author?: string;
};

export type Heading = { id: string; text: string };

export type Update = Omit<UpdateMeta, "category" | "tags" | "author"> & {
  slug: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  readingMinutes: number;
  headings: Heading[];
  /** Public path of the cover image, or `null` when the post has none. */
  cover: string | null;
};

type UpdateModule = {
  default: ComponentType;
  meta: UpdateMeta;
};

const WORDS_PER_MINUTE = 220;

/** `/images/blog/<slug>.webp` if that file exists. */
async function findCover(slug: string): Promise<string | null> {
  try {
    await access(path.join(COVER_DIR, `${slug}.webp`));
    return `/images/blog/${slug}.webp`;
  } catch {
    return null;
  }
}

/** Reading time and `##` headings, read from the raw MDX source. */
async function analyse(slug: string) {
  const source = await readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  // Drop the `export const meta = {…};` block and fenced code before counting.
  const body = source
    .replace(/export const meta = \{[\s\S]*?\n\};?/, "")
    .replace(/```[\s\S]*?```/g, " ");

  const words = body.split(/\s+/).filter(Boolean).length;
  const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map((match) => {
    // Headings may contain inline Markdown; keep only the visible text.
    const text = match[1].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    return { id: headingId(text), text };
  });

  return {
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    headings,
  };
}

export async function getUpdateSlugs(): Promise<string[]> {
  const files = await readdir(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Loads one post, or `null` if it does not exist. */
export async function getUpdate(
  slug: string,
): Promise<{ update: Update; Content: ComponentType } | null> {
  // Guard the dynamic import so a crafted slug can never reach outside the folder.
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;

  try {
    const mod = (await import(`@/content/updates/${slug}.mdx`)) as UpdateModule;
    const { category, tags, author, ...meta } = mod.meta;
    return {
      update: {
        slug,
        ...meta,
        category: category && blogCategories.includes(category) ? category : "Company",
        tags: tags ?? [],
        author: author ?? `${site.name} Team`,
        ...(await analyse(slug)),
        cover: await findCover(slug),
      },
      Content: mod.default,
    };
  } catch {
    return null;
  }
}

/** All posts, newest first. */
export async function getAllUpdates(): Promise<Update[]> {
  const slugs = await getUpdateSlugs();
  const loaded = await Promise.all(slugs.map((slug) => getUpdate(slug)));
  return loaded
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .map((entry) => entry.update)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Neighbours and related reading for one post: the next newer and older posts,
 * and up to three others, same category first.
 */
export async function getPostContext(slug: string) {
  const all = await getAllUpdates();
  const index = all.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: null, older: null, related: [] as Update[] };

  const current = all[index];
  const others = all.filter((post) => post.slug !== slug);
  const related = [
    ...others.filter((post) => post.category === current.category),
    ...others.filter((post) => post.category !== current.category),
  ].slice(0, 3);

  return {
    newer: index > 0 ? all[index - 1] : null,
    older: index < all.length - 1 ? all[index + 1] : null,
    related,
  };
}
