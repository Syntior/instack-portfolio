import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * A tiny content collection for the updates section.
 *
 * Each post is an MDX file in `src/content/updates/`. The file name is the URL
 * slug, and the post's details are exported from the file itself:
 *
 *     export const meta = {
 *       title: "…",
 *       date: "2026-01-31",   // ISO date, used for sorting
 *       summary: "…",         // one sentence, shown in the list and in search results
 *     };
 *
 * To publish an update, add a file. Nothing else needs to change.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "updates");

export type UpdateMeta = {
  title: string;
  date: string;
  summary: string;
};

export type Update = UpdateMeta & { slug: string };

type UpdateModule = {
  default: ComponentType;
  meta: UpdateMeta;
};

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
    return { update: { slug, ...mod.meta }, Content: mod.default };
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
