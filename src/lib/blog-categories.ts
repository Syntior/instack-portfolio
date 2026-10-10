/** Blog categories, in the order the filter shows them. Safe to import on the client. */
export const blogCategories = [
  "AI",
  "Web Development",
  "Security",
  "Engineering",
  "Industry",
  "Company",
] as const;

export type BlogCategory = (typeof blogCategories)[number];
