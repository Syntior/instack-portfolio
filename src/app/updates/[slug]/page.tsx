import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/section-heading";
import { getUpdate, getUpdateSlugs } from "@/lib/updates";
import { pageMetadata } from "@/lib/seo";

// Only slugs returned below exist; anything else is a 404, not a server error.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getUpdateSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/updates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getUpdate(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.update.title,
    description: post.update.summary,
    path: `/updates/${slug}`,
  });
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function UpdatePage({
  params,
}: PageProps<"/updates/[slug]">) {
  const { slug } = await params;
  const post = await getUpdate(slug);
  if (!post) notFound();

  const { update, Content } = post;

  return (
    <article>
      <header className="border-b border-border">
        <Container className="max-w-3xl py-16 md:py-20">
          <Link
            href="/updates"
            className="mb-8 inline-flex items-center gap-1.5 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All updates
          </Link>
          <Eyebrow>
            <time dateTime={update.date}>
              {dateFormat.format(new Date(update.date))}
            </time>
          </Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {update.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {update.summary}
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-12 md:py-16">
        <Content />
      </Container>
    </article>
  );
}
