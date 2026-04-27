import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

interface PageProps {
  params: { slug: string };
}

// SSG : pré-génération de toutes les routes au build.
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

// Métadonnées dynamiques par projet (SEO + Open Graph).
export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [{ url: project.cover, width: 1200, height: 630 }],
    },
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const all = getAllProjects();
  const idx = all.findIndex((p) => p.slug === project.slug);
  const next = all[idx + 1] ?? all[0];

  return (
    <article className="container pt-32 sm:pt-40 pb-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Retour aux projets
      </Link>

      <FadeIn whileInView={false}>
        <header className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            {project.role} · {project.year}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gradient">
            {project.title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted leading-relaxed">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.links?.live && (
              <Button href={project.links.live} external size="md">
                <Globe size={16} />
                Voir le site
                <ArrowUpRight size={14} />
              </Button>
            )}
            {project.links?.github && (
              <Button href={project.links.github} external variant="outline" size="md">
                <Github size={16} />
                Code source
              </Button>
            )}
          </div>
        </header>
      </FadeIn>

      <FadeIn>
        <GlassCard padding="none" className="mt-12 overflow-hidden">
          <div className="relative aspect-[16/9]">
            <Image
              src={project.cover}
              alt={`Couverture du projet ${project.title}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>
        </GlassCard>
      </FadeIn>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <FadeIn className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Le projet</h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed whitespace-pre-line">
            {project.longDescription}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-12 mb-4">
                Points forts
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </FadeIn>

        <FadeIn>
          <GlassCard className="lg:sticky lg:top-24">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
              Informations
            </h3>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted">Année</dt>
                <dd className="mt-0.5">{project.year}</dd>
              </div>
              <div>
                <dt className="text-muted">Rôle</dt>
                <dd className="mt-0.5">{project.role}</dd>
              </div>
              <div>
                <dt className="text-muted">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-white/[0.04] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </GlassCard>
        </FadeIn>
      </div>

      {/* Projet suivant */}
      {next && next.slug !== project.slug && (
        <FadeIn className="mt-24">
          <Link
            href={`/projects/${next.slug}`}
            className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
          >
            <GlassCard interactive className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-1">
                  Projet suivant
                </p>
                <p className="text-xl font-semibold">{next.title}</p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </GlassCard>
          </Link>
        </FadeIn>
      )}
    </article>
  );
}
