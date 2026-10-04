# Syntior website

The portfolio and marketing site for **Syntior**, a software company, and its developer community, **Syntior Community**.

> Building software, and the developers behind it — one project at a time.

Company pages (Home, Services, Technologies, Projects, About, Careers, Blog, Contact) and a community section (Community, and How it works at `/community/how-it-works`). The **Community page** is where visitors join: it holds the application form and a gallery of community members. Every "Join community" button on the site leads there. Light theme only, fully responsive, and built to be edited by people who are not front-end specialists: almost all copy lives in plain data files.

> **Positioning.** The original brief (`instack-code.md`) describes a community that is becoming a company. Syntior is already a working software company, and Syntior Community is part of it. The site keeps the two apart: every company page talks about the company only, and everything about the community (joining, levels, members, the growth model) lives under the **Community** tab at `/community`. When you add copy, put it on the side it belongs to. If you ever compare the site with the brief, that is the intentional difference.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Components), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, design tokens in `src/app/globals.css` |
| UI primitives | shadcn/ui (Radix), lucide icons |
| Animation | Framer Motion, respects "reduce motion" |
| Forms | Server Actions, validated with Zod on the client and the server |
| Email | Resend |
| Content | MDX (`@next/mdx`) for the updates section |
| Fonts | Inter and JetBrains Mono via `next/font` |
| Deploy target | Vercel |

Requires **Node.js 20.9 or newer**.

## Run it locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Nothing needs configuring to try it out. Without email settings, submitting the Join or Contact form prints the email to the terminal instead of sending it, so both forms work straight away.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit` |

Before opening a pull request, run `npm run lint && npm run typecheck && npm run build`.

## Configuration

Copy `.env.example` to `.env.local`. Every variable is optional for development.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, no trailing slash. Used for canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`. Falls back to the Vercel production domain, then `http://localhost:3000`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Address shown on the Contact page and footer. **Placeholder until set.** |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_X_URL`, `NEXT_PUBLIC_DISCORD_URL` | Optional social links. Only the ones you set are shown. |
| `RESEND_API_KEY` | Resend API key. |
| `NOTIFICATION_TO` | Where form submissions are delivered (comma-separate several). |
| `EMAIL_FROM` | Sender, e.g. `Syntior <noreply@your-domain>`. Must be on a domain verified in Resend. |
| `EMAIL_DRY_RUN` | Set to `true` to log emails instead of sending, in any environment. |

### Setting up email delivery

1. Create a [Resend](https://resend.com) account and verify your sending domain.
2. Create an API key.
3. Set `RESEND_API_KEY`, `NOTIFICATION_TO` and `EMAIL_FROM`.

Both forms send **one notification email to the team** with the applicant set as `Reply-To`, so replying goes straight to them. The site does not email the applicant automatically; that avoids the form being used to send mail to arbitrary addresses.

**Behavior when email is not configured:** in development the message is logged to the terminal. In **production** the visitor sees an error asking them to email you instead. A silently dropped application would be worse than a visible failure.

## Editing content

Most copy lives in `src/data/` as typed arrays, so no component code needs to change.

| To change… | Edit |
| --- | --- |
| **Services, how we work, company values and open roles** | `src/data/company.ts` |
| The five developer levels and the two principles | `src/data/levels.ts` |
| The growth model (Community → … → Company) | `src/data/growth-model.ts` |
| Projects and their status | `src/data/projects.ts` |
| **Community members and their photos** | `src/data/members.ts` |
| **The stats strip on the Community page** | `src/data/community-stats.ts` |
| Community benefits and expectations | `src/data/community.ts` |
| Community page FAQ | `src/data/faq.ts` |
| Navigation, tagline, GitHub org, contact details | `src/lib/site.ts` |

### Adding community members (photos)

The "Meet the community" gallery on the Community page shows placeholder tiles until you add real people. To feature someone:

1. Put their photo in `public/images/members/`. Portrait (4:5) works best; 800×1000 is plenty, and `next/image` resizes it for each screen.
2. Add an entry to `src/data/members.ts`:

```ts
{
  name: "Full Name",
  level: 2,                                   // 1–5, see levels.ts
  area: "Frontend",
  photo: "/images/members/full-name.jpg",     // optional: initials are shown without it
  github: "their-username",                   // optional: links to their profile
},
```

As soon as the list has one entry, the placeholders disappear and real cards appear.

**Get each person's agreement before publishing their name or photo**, and remove their entry whenever they ask. The site never shows fake people: with no entries it shows only clearly marked placeholders.

### The stats strip

The box of headline numbers under the Community page intro (`5 Growth levels · 7 Focus areas · 3 Project types`) is computed from the site's own data, so it is always accurate. To show real community numbers instead, or as well, edit `src/data/community-stats.ts`:

```ts
{ value: "120+", label: "Members" },
{ value: "8", label: "Countries" },
```

Only publish numbers that are accurate today. Keep it to three or four short entries so it stays readable on a phone.

### Adding a project

Add an entry to `src/data/projects.ts`. Set `status` to `Community Project`, `Client Project` or `Product`, add a `href` for the repository or case study, and optionally a cover image (`image` and `imageAlt`) at 1280×800 under `public/images/projects/`. Remove `placeholder: true` from anything that becomes real.

### Publishing an update

Add an `.mdx` file to `src/content/updates/`. The file name becomes the URL, and the top of the file exports the post's details:

```mdx
export const meta = {
  title: "Our first release",
  date: "2026-10-01",
  summary: "What shipped, and what we learned.",
};

Regular Markdown goes here.
```

The list page, the post page and `sitemap.xml` pick it up automatically.

### Content rules

These come from the project brief and apply to every page, FAQ and update:

- **Do not publish** revenue-split percentages, contributor pool weights, or any compensation figures. That material is internal.
- Where pay comes up, keep it general: *"Community phase is unpaid learning; paid opportunities open up as projects move into commercial phases."*
- **Never promise** jobs, payment or equity.
- Use plain, professional English.

## Project structure

```
src/
├─ app/                     Routes (App Router)
│  ├─ layout.tsx            Fonts, theme script, header/footer, site-wide metadata
│  ├─ page.tsx              Home
│  ├─ services/  projects/  about/  careers/  contact/
│  ├─ community/            Join form, members gallery, levels, benefits, FAQ (/join redirects here)
│  │  └─ how-it-works/      Levels, principles, growth model (/how-it-works redirects here)
│  ├─ updates/              Blog list and [slug] post pages
│  ├─ opengraph-image.tsx   Generated social share image
│  ├─ sitemap.ts  robots.ts  icon.svg  apple-icon.png  favicon.ico
│  ├─ not-found.tsx  error.tsx
│  └─ globals.css           Color tokens, radius, theme setup
├─ actions/                 Server Actions (join.ts, contact.ts)
├─ components/
│  ├─ ui/                   shadcn/ui primitives
│  ├─ layout/               Header, footer, nav, theme toggle, section helpers
│  ├─ sections/             Hero, growth flow, levels path, members gallery, FAQ, CTAs
│  ├─ cards/                Project, member, feature and level cards
│  ├─ forms/                Join and Contact forms and their shared pieces
│  ├─ motion/               Scroll-reveal wrapper and motion settings
│  └─ brand/                Logo and icons
├─ content/updates/         MDX posts
├─ data/                    Editable copy (see above)
└─ lib/                     Site config, SEO, validation, email, rate limiting
```

## How the forms work

The join form lives on the Community page (section `#join`), and the contact form on the Contact page. Every "Join community" button links to `/community#join`; the old `/join` address redirects there (see `next.config.ts`).

1. **In the browser**, the same Zod schema the server uses runs on submit. Mistakes are shown inline, focus moves to the first problem, and the request is not sent.
2. **On the server**, the Server Action runs abuse checks first (a hidden honeypot field and a rate limit of 5 submissions per 10 minutes per client), then validates again, then sends the email. The browser is never trusted.
3. The forms are plain HTML forms underneath, so they still submit if JavaScript has not loaded.

The GitHub field accepts `octocat`, `@octocat` or a pasted profile URL.

> **Rate-limit caveat:** the limiter keeps counts in memory. On Vercel each serverless instance has its own memory, so the limit is per instance, not global. It stops casual repeat submissions. For stronger protection, replace `src/lib/rate-limit.ts` with a shared store such as Upstash Redis; the `rateLimit()` signature can stay the same.

## Design notes

- **Theme:** dark is the default; the toggle in the header switches to light and remembers the choice. A tiny inline script applies the saved theme before first paint, so there is no flash.
- **Accent color:** one accent (signal blue). Change `--primary` (and `--ring`) in `src/app/globals.css`, once for light and once for dark. Every text and background pair was checked against WCAG AA, including form-control borders, so re-check contrast if you change a color.
- **Monospace** is used for small labels and tags only.
- **Motion:** entrance animations are subtle and run once. Visitors who prefer reduced motion get fades only, and the content stays visible without JavaScript.
- **Accessibility:** semantic landmarks, a skip link, visible focus states, labelled form fields with linked error messages, keyboard-operable menu and FAQ, and `aria-current` on the active page.

## Deploying to Vercel

1. Push the repository to GitHub and **Import Project** in Vercel. It detects Next.js automatically; no build settings are needed.
2. Under **Settings → Environment Variables**, add the variables from `.env.example`. At minimum: `NEXT_PUBLIC_CONTACT_EMAIL`, `RESEND_API_KEY`, `NOTIFICATION_TO` and `EMAIL_FROM`.
3. Deploy.
4. Add your custom domain, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy so canonical URLs and the sitemap use the right address.

Preview deployments are automatically excluded from search engines by `robots.txt`. Because `NEXT_PUBLIC_*` values are inlined at build time, redeploy after changing them.

## Before you launch: placeholder checklist

Content that is deliberately marked as placeholder and needs a real value:

- [ ] **Contact email.** Set `NEXT_PUBLIC_CONTACT_EMAIL`. Until then the site shows `hello@example.com` and a visible note on the Contact page.
- [ ] **Real community numbers (optional).** The stats strip shows structural facts about the community. Add your member and country counts in `src/data/community-stats.ts` once you have figures you can stand behind.
- [ ] **Community member photos.** The gallery on the Community page shows placeholder tiles until you add people to `src/data/members.ts` (see "Adding community members").
- [ ] **Projects.** The *Client project* and *Product* cards in `src/data/projects.ts` are stand-ins, marked "Placeholder" on the page. Only the Syntior Website card is real.
- [ ] **Services and how we work.** The services list, the five delivery steps and the company values in `src/data/company.ts` are a starting point based on the stack the company already uses. Edit them to match what Syntior really offers (they appear on Home, Services, About and Careers).
- [ ] **Open roles.** `roles` in `src/data/company.ts` is empty, so the Careers page says there are no open roles. Add real openings only.
- [ ] **Sample update.** Delete `src/content/updates/welcome.mdx` once you have a real post.
- [ ] **Social links.** Add any you want shown (see `.env.example`).
- [ ] **Email delivery.** Verify a domain in Resend and set the email variables.
- [ ] **Contributor Agreement.** The site mentions it as a next step but does not host it.
## Brand copy

The site uses:

> Building software, and the developers behind it — one project at a time.

The tagline from the original brief ("Turning contributors into a software company…") described a community becoming a company, so it was retired when the site was re-pointed at a company that already exists. Alternatives if you want to try something different:

1. *A software company with a developer community at its core.*
2. *Where real software and real developers grow together.*
3. *We build software. Our community builds developers.*

The tagline lives in `src/lib/site.ts`. The hero headline is in `src/components/sections/hero.tsx`, and the share image text is in `src/app/opengraph-image.tsx`.

## A note on Next.js 16

This project uses Next.js 16, which differs from earlier versions in places. The package ships its own documentation at `node_modules/next/dist/docs/`, and `AGENTS.md` points AI coding assistants there. Prefer it over older tutorials.
