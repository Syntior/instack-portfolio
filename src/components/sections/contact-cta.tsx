import { CtaSection, type CtaLink } from "@/components/sections/cta-section";

type ContactCtaProps = {
  title?: string;
  description?: string;
  /** Defaults to the Services page. Pass another link on that page itself. */
  secondary?: CtaLink;
};

/** Closing call to action for the company pages. Leads to the contact form. */
export function ContactCta({
  title = "Have a project in mind?",
  description = "Tell us what you want to build, and we will get back to you to talk it through.",
  secondary = { href: "/services", label: "Our services" },
}: ContactCtaProps) {
  return (
    <CtaSection
      eyebrow="Start a project"
      title={title}
      description={description}
      primary={{ href: "/contact", label: "Start a project" }}
      secondary={secondary}
    />
  );
}
