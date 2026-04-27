import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  /** "default" en grille, "compact" pour featured */
  variant?: "default" | "compact";
  priority?: boolean;
}

// Mapping centralisé statut → badge — facile à ajuster ou traduire.
const STATUS_LABELS: Record<ProjectStatus, string> = {
  live: "Achevé",
  "in-progress": "En cours",
  archived: "Archivé",
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  live: "text-emerald-300",
  "in-progress": "text-amber-300",
  archived: "text-muted",
};

export function ProjectCard({
  project,
  variant = "default",
  priority = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
      aria-label={`Voir le projet ${project.title}`}
    >
      <GlassCard padding="none" interactive className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.cover}
            alt={`Aperçu du projet ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono",
              "bg-background/70 backdrop-blur-sm border border-white/10",
              STATUS_COLORS[project.status],
            )}
          >
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        <div className={cn("flex-1 flex flex-col", variant === "compact" ? "p-5" : "p-6")}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            <ArrowUpRight
              size={18}
              className="text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
            />
          </div>

          <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4 flex-1">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/[0.04] border border-white/[0.06] text-muted"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-0.5 text-[11px] font-mono text-muted">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
