export type ProjectStatus = "live" | "in-progress" | "archived";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  cover: string;
  gallery?: string[];
  stack: string[];
  role: string;
  year: number;
  status: ProjectStatus;
  featured?: boolean;
  links?: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  highlights?: string[];
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "devops"
  | "tooling"
  | "design";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  years?: number;
}

export interface NavLink {
  href: string;
  label: string;
}
