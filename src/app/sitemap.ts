import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";
import { getAllUpdates } from "@/lib/updates";

const absolute = (path: string) => new URL(path, site.url).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const updates = await getAllUpdates();

  return [
    ...routes.map(({ path, priority }) => ({
      url: absolute(path),
      priority,
    })),
    ...updates.map((update) => ({
      url: absolute(`/updates/${update.slug}`),
      lastModified: new Date(update.date),
      priority: 0.4,
    })),
  ];
}
