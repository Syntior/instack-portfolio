import { ArrowUpRight, Mail } from "lucide-react";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { socialIcons } from "@/components/brand/social-icons";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Syntior. Start a project, ask about our work, or find us on GitHub and by email.",
  path: "/contact",
});

const linkClass =
  "group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Have a project in mind, a question about our work, or want to join the team? Send a message and we will get back to you."
      />

      <Section aria-labelledby="message-heading">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <h2 id="message-heading" className="sr-only">
              Send a message
            </h2>
            <ContactForm />
          </div>

          <aside aria-labelledby="elsewhere-heading" className="lg:pt-1">
            <h2
              id="elsewhere-heading"
              className="font-mono text-xs font-medium tracking-wider text-primary uppercase"
            >
              Elsewhere
            </h2>

            <ul role="list" className="mt-6 space-y-3">

              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <Mail className="size-6 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">Email</span>
                    <span className="block truncate font-mono text-xs text-muted-foreground">
                      {site.email}
                    </span>
                  </span>
                </a>
              </li>

              {site.socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Icon className="size-6 shrink-0" />
                      <span className="min-w-0 flex-1 font-medium">
                        {social.label}
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden="true"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {site.emailIsPlaceholder ? (
              <p className="mt-4 rounded-lg border border-dashed border-border p-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Placeholder:</span>{" "}
                this email address is not real yet. Set{" "}
                <code className="font-mono">NEXT_PUBLIC_CONTACT_EMAIL</code> to
                replace it.
              </p>
            ) : null}
          </aside>
        </div>
      </Section>
    </>
  );
}
