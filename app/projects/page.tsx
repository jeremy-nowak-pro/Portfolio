import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Sélection de projets — produits, design systems et expérimentations.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container pt-32 sm:pt-40 pb-16">
      <SectionTitle
        eyebrow={`${projects.length} projets`}
        title="Projets"
        description="Une sélection de produits et expérimentations construits ces dernières années."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.04}>
            <ProjectCard project={project} priority={i < 3} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
