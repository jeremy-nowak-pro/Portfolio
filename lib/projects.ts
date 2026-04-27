import { projects } from "@/data/projects";
import type { Project } from "@/types";

/**
 * Couche d'accès aux projets — encapsule la source de données.
 * Permet de basculer plus tard sur un CMS sans toucher aux composants.
 */

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getAllProjects()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
