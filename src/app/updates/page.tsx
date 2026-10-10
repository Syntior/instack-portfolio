import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { DiscussCta } from "@/components/sections/discuss-cta";
import type { PostSummary } from "@/components/blog/post-card";
import { getAllUpdates } from "@/lib/updates";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Insights from Syntior on AI, web development, security and engineering: what changed in software, and what it means for your product.",
  path: "/updates",
});

export default async function UpdatesPage() {
  const updates = await getAllUpdates();
  // Only what the cards need crosses to the client.
  const posts: PostSummary[] = updates.map(
    ({ slug, title, date, summary, category, tags, readingMinutes, cover }) => ({
      slug,
      title,
      date,
      summary,
      category,
      tags,
      readingMinutes,
      cover,
    }),
  );

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights for teams that ship software"
        description="What is changing in AI, the web and security, and what it means for the products you build. Written by the Syntior team."
      />

      <Section aria-labelledby="posts-heading">
        <h2 id="posts-heading" className="sr-only">
          All posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">Nothing here yet. Check back soon.</p>
        ) : (
          <BlogExplorer posts={posts} />
        )}
      </Section>

      <DiscussCta />
    </>
  );
}
