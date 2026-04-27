import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(3);

  return (
    <section className="page-section">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
        <SectionTitle
          eyebrow="Sélection"
          title="Projets en vedette"
          description="Une sélection de projets représentatifs de ce que je fais le mieux."
        />
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          Tous les projets
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} priority={i === 0} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
