export type Level = {
  level: number;
  name: string;
  /** One-line description of what this stage is about. */
  summary: string;
  /** Skills and responsibilities at this level. */
  skills: string[];
};

/** The Developer Growth Levels: a five-step path. */
export const levels: Level[] = [
  {
    level: 1,
    name: "Learner",
    summary: "Build the foundations of professional software work.",
    skills: ["Git", "GitHub", "Coding standards", "Small tasks"],
  },
  {
    level: 2,
    name: "Contributor",
    summary: "Deliver independent work, and learn to review and be reviewed.",
    skills: [
      "Independent features",
      "Pull requests",
      "Code review",
      "Bug fixing",
      "Testing",
    ],
  },
  {
    level: 3,
    name: "Production Contributor",
    summary: "Ship work that runs in production.",
    skills: [
      "Production features",
      "Docker",
      "CI/CD",
      "Databases",
      "Deployment",
    ],
  },
  {
    level: 4,
    name: "Core Developer",
    summary: "Own features end to end, and help others grow.",
    skills: ["Feature ownership", "Architecture", "Mentoring juniors"],
  },
  {
    level: 5,
    name: "Lead / Core Team",
    summary: "Own projects and help shape where the company goes.",
    skills: [
      "Project ownership",
      "Technical leadership",
      "Future company leadership",
    ],
  },
];

export type Principle = {
  id: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    id: "ownership",
    title: "The Ownership Principle",
    body: "Contributors own modules and features, not just tickets. Owning something means understanding why it exists, shaping how it works, shipping it, and looking after it afterwards.",
  },
  {
    id: "project-selection",
    title: "The Project Selection Principle",
    body: "Every project is chosen for two reasons: it teaches real skills, and it could become a product or a client solution. Nothing is built only as an exercise.",
  },
];
