export type ProjectStatus = "Community Project" | "Client Project" | "Product";

export type Project = {
  slug: string;
  name: string;
  /** One line. */
  description: string;
  stack: string[];
  status: ProjectStatus;
  /** Repository or case-study URL. Omit while there is nothing to link to. */
  href?: string;
  /** Label for the link, e.g. "View repository". */
  hrefLabel?: string;
  /**
   * Cover image path under /public, shown at 16:10 (1280×800 recommended).
   * Omit to show a stand-in frame instead.
   */
  image?: string;
  /** Alt text describing the cover. Required whenever `image` is set. */
  imageAlt?: string;
  /**
   * True for stand-in cards. Placeholders are always rendered with a visible
   * "Placeholder" marker so nobody mistakes them for real work.
   */
  placeholder?: boolean;
};

/**
 * PLACEHOLDER CONTENT
 *
 * Only the first entry (this website) is a real project. The other two are
 * stand-ins that show the layout and the remaining status types. Replace them
 * with real projects as they start, and delete `placeholder: true` when you do.
 */
export const projects: Project[] = [
  {
    slug: "instackdev-website",
    name: "InStackDev Website",
    description:
      "The site you are on. Built and maintained in the open by the community.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    status: "Community Project",
    href: "https://github.com/InStackDev/instack-portfolio",
    hrefLabel: "View repository",
    image: "/images/projects/instackdev-website.webp",
    imageAlt:
      "The InStackDev website home page: the headline “Building software, and the developers behind it”, a Join community button, and a terminal listing the five community levels.",
  },
  {
    slug: "placeholder-client",
    name: "Client project",
    description:
      "Stand-in for a solution delivered to an outside client by a team of contributors.",
    stack: ["React", "Docker", "CI/CD"],
    status: "Client Project",
    placeholder: true,
  },
  {
    slug: "placeholder-product",
    name: "Product",
    description:
      "Stand-in for a product that started as a community project and is now built and owned by the team.",
    stack: ["Next.js", "Prisma", "Vercel"],
    status: "Product",
    placeholder: true,
  },
];

export const projectStatuses: { status: ProjectStatus; meaning: string }[] = [
  {
    status: "Community Project",
    meaning: "Built openly by contributors. The main place to learn and practise.",
  },
  {
    status: "Client Project",
    meaning: "Delivered for an outside client, to production standards.",
  },
  {
    status: "Product",
    meaning: "Owned and run by InStackDev, and grown over time.",
  },
];
