/**
 * Central site configuration. Anything that appears in more than one place
 * (header, footer, metadata, sitemap, contact page) lives here.
 *
 * Values that differ per deployment are read from environment variables so
 * they can be set in Vercel without a code change. See `.env.example`.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Vercel exposes the production domain (without protocol) at build time.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

type ExternalLink = { label: string; href: string };

/** Optional social profiles. Only the ones with a URL configured are shown. */
function resolveSocials(): ExternalLink[] {
  const candidates: ExternalLink[] = [
    { label: "LinkedIn", href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "" },
    { label: "X", href: process.env.NEXT_PUBLIC_X_URL ?? "" },
    { label: "Discord", href: process.env.NEXT_PUBLIC_DISCORD_URL ?? "" },
  ];
  return candidates.filter((social) => social.href.length > 0);
}

export const site = {
  name: "InStackDev",
  tagline: "Building software, and the developers behind it — one project at a time.",
  /**
   * One-line summary used in the hero. InStackDev is a working software
   * company; the community is something it has started inside the company.
   */
  vision:
    "InStackDev is a software company with a community inside it: a place where developers learn by working on real projects, with real ownership.",
  description:
    "InStackDev is a software company with a developer community inside it. We build software, and community members learn on real projects with real ownership, through five clear levels.",
  url: resolveSiteUrl(),
  locale: "en_US",

  github: {
    org: "InStackDev",
    url: "https://github.com/InStackDev",
    /** This website's own repository. */
    repo: "https://github.com/InStackDev/instack-portfolio",
  },

  /**
   * PLACEHOLDER: replace by setting NEXT_PUBLIC_CONTACT_EMAIL. `example.com`
   * is reserved for documentation and can never deliver mail, so a forgotten
   * placeholder fails safely rather than reaching a stranger.
   */
  // `||` so a blank value in .env counts as "not set".
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  emailIsPlaceholder: !process.env.NEXT_PUBLIC_CONTACT_EMAIL,

  socials: resolveSocials(),
} as const;

export type NavItem = { href: string; label: string };

/**
 * Where every "Join community" button leads: the application form, which lives
 * on the Community page. (The old /join address redirects here.)
 */
export const joinHref = "/community#join";

/** Primary navigation. "Join community" is rendered separately as the header CTA. */
export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/projects", label: "Projects" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About & vision" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: joinHref, label: "Join the community" },
      { href: "/community#members", label: "Members" },
      { href: "/updates", label: "Updates" },
    ],
  },
];

/**
 * Every indexable route, used by the sitemap. Kept next to the nav so a new
 * page is hard to forget.
 */
export const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/community", priority: 0.9 },
  { path: "/contact", priority: 0.6 },
  { path: "/updates", priority: 0.5 },
];
