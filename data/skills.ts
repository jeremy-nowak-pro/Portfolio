import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "TypeScript", category: "frontend", level: "expert", years: 6 },
  { name: "React", category: "frontend", level: "expert", years: 7 },
  { name: "Next.js", category: "frontend", level: "expert", years: 5 },
  { name: "TailwindCSS", category: "frontend", level: "advanced", years: 4 },
  { name: "Framer Motion", category: "frontend", level: "advanced" },
  { name: "Vue.js", category: "frontend", level: "intermediate" },

  // Backend
  { name: "Node.js", category: "backend", level: "advanced", years: 6 },
  { name: "GraphQL", category: "backend", level: "advanced" },
  { name: "PostgreSQL", category: "backend", level: "advanced" },
  { name: "Prisma", category: "backend", level: "advanced" },
  { name: "Python", category: "backend", level: "intermediate" },

  // DevOps
  { name: "Docker", category: "devops", level: "advanced" },
  { name: "GitHub Actions", category: "devops", level: "advanced" },
  { name: "Vercel", category: "devops", level: "expert" },
  { name: "AWS", category: "devops", level: "intermediate" },

  // Tooling
  { name: "Vitest", category: "tooling", level: "advanced" },
  { name: "Playwright", category: "tooling", level: "advanced" },
  { name: "Storybook", category: "tooling", level: "advanced" },

  // Design
  { name: "Figma", category: "design", level: "advanced" },
  { name: "Design Systems", category: "design", level: "advanced" },
];
