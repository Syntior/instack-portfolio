import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { headingId, textOf } from "@/lib/headings";

/**
 * Styles for MDX content (the updates section). Defined here rather than with
 * a typography plugin so the look stays on the site's own design tokens.
 */
const components: MDXComponents = {
  // The id matches the table of contents built in `lib/updates.ts`.
  h2: ({ children, ...props }) => (
    <h2
      id={headingId(textOf(children))}
      className="mt-10 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight sm:mt-12 sm:text-2xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props) => (
    <p className="my-5 text-base leading-7 text-foreground/85" {...props} />
  ),
  a: ({ href = "", children, ...props }) => {
    const className =
      "font-medium text-primary underline underline-offset-4 hover:no-underline";
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props) => (
    <ul
      className="my-5 list-disc space-y-2 pl-6 text-foreground/85 marker:text-primary"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-foreground/85 marker:text-primary"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-primary pl-5 text-foreground/80 italic"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  code: (props) => (
    <code
      className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm leading-6 [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
