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
  name: "Syntior",
  tagline: "Building software, and the developers behind it — one project at a time.",
  /**
   * One-line summary used in the hero. Company copy only: everything about the
   * community lives under /community (see `community` below).
   */
  vision:
    "Syntior is a software company. We build software for our clients, and products of our own, to production standards.",
  description:
    "Syntior is a software company. We build web applications and products for our clients and for ourselves, to production standards.",
  url: resolveSiteUrl(),

  /**
   * Syntior's developer community. It is part of the company and has its
   * own section of the site under /community.
   */
  community: {
    name: "Syntior Community",
  },
  locale: "en_US",

  github: {
    org: "Syntior",
    url: "https://github.com/Syntior",
    /** This website's own repository. */
    repo: "https://github.com/Syntior/instack-portfolio",
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

/** Primary navigation. "Contact us" is rendered separately as the header CTA. */
export const primaryNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/technologies", label: "Technologies" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/updates", label: "Blog" },
  { href: "/community", label: "Community" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/technologies", label: "Technologies" },
      { href: "/projects", label: "Projects" },
      { href: "/careers", label: "Careers" },
      { href: "/updates", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/community", label: site.community.name },
      { href: joinHref, label: "Join the community" },
      { href: "/community/how-it-works", label: "How it works" },
      { href: "/community#members", label: "Members" },
    ],
  },
];

/**
 * Every indexable route, used by the sitemap. Kept next to the nav so a new
 * page is hard to forget.
 */
export const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/technologies", priority: 0.8 },
  { path: "/projects", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/careers", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/updates", priority: 0.5 },
  { path: "/community", priority: 0.7 },
  { path: "/community/how-it-works", priority: 0.6 },
];
