import type { ReactNode } from "react";
import { isValidElement } from "react";

/**
 * Anchor id for a blog heading. Used by both the MDX `h2` (to set the id) and
 * the table of contents (to link to it), so the two always agree.
 */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The plain text inside rendered heading children, e.g. "Why `useId` matters". */
export function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}
