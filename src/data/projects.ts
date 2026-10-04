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
    slug: "syntior-website",
    name: "Syntior Website",
    description:
      "The site you are on. Built and maintained in the open by Syntior Community.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    status: "Community Project",
    href: "https://github.com/Syntior/instack-portfolio",
    hrefLabel: "View repository",
    image: "/images/projects/syntior-website.webp",
    imageAlt:
      "The Syntior website home page: the headline “Building software, and the developers behind it”, a Join community button, and a terminal listing the five community levels.",
  },
  {
    slug: "placeholder-client",
    name: "Client project",
    description:
      "Stand-in for a solution delivered to an outside client by the Syntior team.",
    stack: ["React", "Docker", "CI/CD"],
    status: "Client Project",
    placeholder: true,
  },
  {
    slug: "placeholder-product",
    name: "Product",
    description:
      "Stand-in for a product that Syntior builds, owns and runs.",
    stack: ["Next.js", "Prisma", "Vercel"],
    status: "Product",
    placeholder: true,
  },
];

export const projectStatuses: { status: ProjectStatus; meaning: string }[] = [
  {
    status: "Community Project",
    meaning: "Built in the open by contributors from Syntior Community.",
  },
  {
    status: "Client Project",
    meaning: "Delivered for an outside client, to production standards.",
  },
  {
    status: "Product",
    meaning: "Owned and run by Syntior, and grown over time.",
  },
];
