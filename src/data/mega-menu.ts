import { serviceAnchor, serviceCatalog, technologies } from "@/data/company";
import { joinHref, site, type NavItem } from "@/lib/site";

/**
 * Content of the desktop mega menu: the full-width panel that opens under the
 * header when a top-level item is hovered or clicked. Keys are the `href`s in
 * `primaryNav`; nav items without an entry here stay plain links.
 *
 * Every link points at a real page or an existing section id on one, so the
 * menu never promises pages that do not exist.
 */
export type MegaMenuPanel = {
  intro: { title: string; text: string; link: NavItem };
  /** `cols` lays a long column out as side-by-side lists (default 1). */
  columns: { title: string; links: NavItem[]; cols?: 1 | 2 | 3 }[];
};

export const megaMenu: Record<string, MegaMenuPanel> = {
  "/services": {
    intro: {
      title: "Software, built to production standards",
      text: "We design, build and run software for our clients, and products of our own. Whatever the size of the project, the standards are the same.",
      link: { href: "/services", label: "All services" },
    },
    columns: serviceCatalog.map((group) => ({
      title: group.title,
      cols: group.items.length > 8 ? 2 : 1,
      links: group.items.map((item) => ({
        href: `/services#${serviceAnchor(item)}`,
        label: item,
      })),
    })),
  },
  "/technologies": {
    intro: {
      title: "Technologies",
      text: "The languages, frameworks and platforms we build with. We pick the right tool for each project.",
      link: { href: "/technologies", label: "All technologies" },
    },
    columns: [
      {
        title: "Technologies we work with",
        cols: 3,
        links: technologies.map((technology) => ({
          href: `/technologies#${serviceAnchor(technology)}`,
          label: technology,
        })),
      },
    ],
  },
  "/about": {
    intro: {
      title: `About ${site.name}`,
      text: "A software company that builds for clients and for itself, and grows the developers who do the work.",
      link: { href: "/about", label: "About us" },
    },
    columns: [
      {
        title: "Company",
        links: [
          { href: "/about#work-heading", label: "What we do" },
          { href: "/about#values-heading", label: "How we work" },
          { href: "/careers", label: "Careers" },
          { href: "/contact", label: "Contact" },
        ],
      },
    ],
  },
  "/community": {
    intro: {
      title: site.community.name,
      text: `The developer community of ${site.name}: learn by doing real work on real projects, alongside people who care about doing it well.`,
      link: { href: "/community", label: "Community home" },
    },
    columns: [
      {
        title: "Get involved",
        links: [
          { href: joinHref, label: "Apply to join" },
          { href: "/community#members", label: "Members" },
        ],
      },
      {
        title: "How it works",
        links: [
          { href: "/community/how-it-works", label: "Overview" },
          {
            href: "/community/how-it-works#levels-heading",
            label: "Developer Growth Levels",
          },
          {
            href: "/community/how-it-works#growth-model-heading",
            label: "The growth model",
          },
        ],
      },
    ],
  },
};
