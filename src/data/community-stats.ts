import { levels } from "@/data/levels";
import { projectStatuses } from "@/data/projects";
import { interestAreas } from "@/lib/validation";

export type Stat = {
  /** The headline figure, e.g. "5" or "120+". */
  value: string;
  /** Short label shown under it, e.g. "Growth levels". */
  label: string;
};

/**
 * Numbers shown in the strip at the top of the Community page.
 *
 * These describe how the community is structured, and they are computed from
 * the site's own data, so they are always true and can never go stale.
 *
 * To show real community numbers (members, countries, and so on), add or
 * replace entries with figures that are ACCURATE TODAY, for example:
 *
 *   { value: "120+", label: "Members" },
 *   { value: "8", label: "Countries" },
 *
 * Do not publish aspirational or rounded-up numbers. They mislead visitors and
 * are hard to walk back. Keep it to three or four short entries so the strip
 * stays readable on a phone.
 */
export const communityStats: Stat[] = [
  { value: String(levels.length), label: "Growth levels" },
  { value: String(interestAreas.length), label: "Focus areas" },
  { value: String(projectStatuses.length), label: "Project types" },
];
