export type Faq = { id: string; question: string; answer: string };

/**
 * Public FAQ for the Join page.
 *
 * Content rules (from the project brief):
 *  - Compensation is only ever described in general terms. No figures, splits
 *    or pool weights. Those are internal.
 *  - Never promise jobs, payment or equity.
 */
export const joinFaq: Faq[] = [
  {
    id: "experience",
    question: "Do I need experience to join?",
    answer:
      "No. Level 1 is built for learners: Git, GitHub, coding standards and small, well-scoped tasks. You will be matched to a starting level after we review your application.",
  },
  {
    id: "paid",
    question: "Is this paid?",
    answer:
      "Community phase is unpaid learning; paid opportunities open up as projects move into commercial phases.",
  },
  {
    id: "jobs",
    question: "Will this lead to a job?",
    answer:
      "We cannot promise jobs, payment or equity. What we can offer is mentorship, real project experience, and a public record of your work.",
  },
  {
    id: "after-applying",
    question: "What happens after I apply?",
    answer:
      "We review your application, then share the Contributor Agreement for you to read through. Once that is in place, we assign your starting level.",
  },
  {
    id: "areas",
    question: "Which areas can I contribute in?",
    answer:
      "Full-Stack, Frontend, Backend, Mobile, QA, UI/UX and DevOps. Choose the area you are most interested in today. You can explore others as you grow.",
  },
];
