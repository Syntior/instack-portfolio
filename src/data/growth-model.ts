export type GrowthStage = {
  id: string;
  label: string;
  description: string;
};

/**
 * The growth model: Community → Projects → Products/Clients → Revenue → Company.
 * Syntior is already a working software company, and the community is
 * something it has started inside it, so this reads as how community work
 * feeds company work rather than as a future transformation.
 *
 * Copy rule: describe direction, never guarantees, and never mention amounts,
 * splits or any contributor compensation figures. That material is internal.
 */
export const growthModel: GrowthStage[] = [
  {
    id: "community",
    label: "Community",
    description:
      "Learning and mentorship. Developers pick up professional workflows together and land their first real contributions.",
  },
  {
    id: "projects",
    label: "Projects",
    description:
      "Real projects, chosen because they teach real skills. Contributors own modules and features, not just tickets.",
  },
  {
    id: "products-clients",
    label: "Products / Clients",
    description:
      "The strongest projects grow into products or client solutions, built and run to production standards.",
  },
  {
    id: "revenue",
    label: "Revenue",
    description:
      "Commercial work brings in revenue that sustains the projects and funds what comes next.",
  },
  {
    id: "company",
    label: "Company",
    description:
      "Syntior itself: a structured team that builds and runs the software, and grows with the developers who came up through the community.",
  },
];
