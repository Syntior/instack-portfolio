export type Member = {
  /** Display name, exactly as the member wants it shown. */
  name: string;
  /** Growth level 1–5 (see levels.ts). Shown as the level's name, e.g. "Contributor". */
  level: 1 | 2 | 3 | 4 | 5;
  /** Area of interest, e.g. "Frontend", "Backend", "QA", "UI/UX", "DevOps". */
  area: string;
  /**
   * Photo path under /public, e.g. "/images/members/ada-lovelace.jpg".
   * Portrait (4:5) works best; 800×1000 is plenty. Omit to show initials.
   */
  photo?: string;
  /** Alt text for the photo. Defaults to "Photo of <name>". */
  photoAlt?: string;
  /** GitHub username (no @, no URL). Optional; links to the member's profile. */
  github?: string;
};

/**
 * COMMUNITY MEMBERS shown on the Community page.
 *
 * Empty for now, so the page shows clearly marked placeholder tiles. To feature
 * someone, add an entry below and drop their photo into public/images/members/:
 *
 *   {
 *     name: "Full Name",
 *     level: 2,
 *     area: "Frontend",
 *     photo: "/images/members/full-name.jpg",
 *     github: "their-username",
 *   },
 *
 * Only publish a person's name and photo after they have agreed to it, and
 * remove their entry whenever they ask.
 */
export const members: Member[] = [];
