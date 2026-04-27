import { skills } from "@/data/skills";
import type { Skill, SkillCategory } from "@/types";

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: "Front-end",
  backend: "Back-end",
  devops: "DevOps",
  tooling: "Outils & Tests",
  design: "Design",
};

const CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "devops",
  "tooling",
  "design",
];

export function getSkillsByCategory(): Array<{
  category: SkillCategory;
  label: string;
  items: Skill[];
}> {
  return CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: skills.filter((s) => s.category === category),
  })).filter((group) => group.items.length > 0);
}

export function getCategoryLabel(category: SkillCategory): string {
  return CATEGORY_LABELS[category];
}
