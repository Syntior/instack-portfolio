import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, UserRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { DiscussCta } from "@/components/sections/discuss-cta";
import {
  ReadingProgress,
  ShareButtons,
  TableOfContents,
} from "@/components/blog/article-tools";
import { CategoryBadge, PostCard, formatPostDate } from "@/components/blog/post-card";
import { getPostContext, getUpdate, getUpdateSlugs } from "@/lib/updates";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

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

  const base = pageMetadata({
    title: post.update.title,
    description: post.update.summary,
    path: `/updates/${slug}`,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.update.date,
      authors: [post.update.author],
      tags: post.update.tags,
    },
  };
}

export default async function UpdatePage({
  params,
}: PageProps<"/updates/[slug]">) {
  const { slug } = await params;
  const post = await getUpdate(slug);
  if (!post) notFound();

  const { update, Content } = post;
  const { newer, older, related } = await getPostContext(slug);
  const url = `${site.url}/updates/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: update.title,
    description: update.summary,
    datePublished: update.date,
    author: { "@type": "Organization", name: update.author },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: url,
    keywords: update.tags.join(", "),
    articleSection: update.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <ReadingProgress targetId="article-body" />

      <article>
        <header className="bg-hero border-b border-border">
          <Container className="max-w-4xl py-10 sm:py-16 md:py-20">
            <nav aria-label="Breadcrumb">
              <Link
                href="/updates"
                className="-my-1 inline-flex items-center gap-1.5 rounded-sm py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                All posts
              </Link>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CategoryBadge category={update.category} />
              <time dateTime={update.date} className="text-sm text-muted-foreground">
                {formatPostDate(update.date)}
              </time>
            </div>

            <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {update.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
              {update.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" aria-hidden="true" />
                {update.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {update.readingMinutes} min read
              </span>
            </div>

            {update.cover ? (
              <div className="relative mt-8 aspect-[1200/630] overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:mt-10 sm:rounded-2xl">
                <Image
                  src={update.cover}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 896px) 832px, calc(100vw - 2rem)"
                  className="object-cover"
                />
              </div>
            ) : null}
          </Container>
        </header>

        <Container className="max-w-6xl py-8 sm:py-12 md:py-16">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
            <div className="mx-auto w-full max-w-3xl min-w-0">
              <div className="mb-8 lg:hidden">
                <TableOfContents headings={update.headings} variant="mobile" />
              </div>

              <div id="article-body" className="break-words">
                <Content />
              </div>

              {update.tags.length > 0 ? (
                <ul role="list" aria-label="Tags" className="mt-10 flex flex-wrap gap-2">
                  {update.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold">Share this post</p>
                <ShareButtons url={url} title={update.title} />
              </div>

              {newer || older ? (
                <nav
                  aria-label="More posts"
                  className="mt-10 grid gap-3 sm:grid-cols-2"
                >
                  {older ? (
                    <Link
                      href={`/updates/${older.slug}`}
                      className="group rounded-xl border border-border p-4 transition hover:border-primary/40 sm:p-5"
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                        Older post
                      </span>
                      <span className="mt-1.5 block font-semibold leading-snug group-hover:text-primary">
                        {older.title}
                      </span>
                    </Link>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  {newer ? (
                    <Link
                      href={`/updates/${newer.slug}`}
                      className="group rounded-xl border border-border p-4 text-right transition hover:border-primary/40 sm:p-5"
                    >
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        Newer post
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="mt-1.5 block font-semibold leading-snug group-hover:text-primary">
                        {newer.title}
                      </span>
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={update.headings} variant="sidebar" />
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-t border-border bg-secondary/40 py-12 sm:py-16">
          <Container>
            <h2 id="related-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Keep reading
            </h2>
            <ul role="list" className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <PostCard post={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <DiscussCta
        title="Need help applying this to your product?"
        description="Tell us what you are building. We will help you weigh your options, spot the risks early, and plan the most effective next steps."
      />
    </>
  );
}
