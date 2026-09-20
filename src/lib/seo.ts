import type { Metadata } from "next";
import { site } from "@/lib/site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for the canonical URL and og:url. */
  path: string;
};

/**
 * Builds per-page metadata.
 *
 * Next.js replaces a parent's `openGraph` / `twitter` object wholesale when a
 * page defines its own, so every field a page needs has to be repeated here;
 * this helper keeps that in one place. The share image itself comes from the
 * root `opengraph-image.tsx` file convention.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Serialises JSON-LD for a <script> tag. Escaping `<` prevents a value like
 * "</script>" from closing the tag early.
 */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
