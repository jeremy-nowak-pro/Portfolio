import type { Metadata } from "next";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "À propos",
  description: `À propos de ${siteConfig.name} — parcours, formations et expériences.`,
};

interface Entry {
  period: string;
  role: string;
  org: string;
  description: string;
  bullets?: string[];
}

const experiences: Entry[] = [
  {
    period: "Sept. 2023 — Sept. 2025",
    role: "Développeur Full-stack (alternance)",
    org: "BPMED — Banque Populaire Méditerranée · Marseille",
    description:
      "Développement et maintenance d'applications internes en ASP.NET Core MVC (C#), avec une exigence forte en qualité, sécurité et maintenabilité.",
    bullets: [
      "Refonte complète du site PUPA (Plan d'Urgence et de Poursuite des Activités)",
      "Création d'une IHM interne pour le suivi et la gestion d'outils métiers",
      "Gestion, mise à jour et maintenance de plusieurs sites internes (rôle de webmaster)",
      "Participation à l'amélioration d'un chatbot interne",
      "Optimisation du code et amélioration continue de l'architecture",
      "Outils CI/CD et qualité : Jenkins, SonarQube, Git",
    ],
  },
  {
    period: "En cours",
    role: "Développeur indépendant (auto-entrepreneur)",
    org: "Activité personnelle",
    description:
      "Réalisation et maintenance de solutions web pour mes propres clients. Une activité qui renforce mon autonomie et mon expérience terrain.",
  },
];

const formations: Entry[] = [
  {
    period: "2023 — 2025",
    role: "Concepteur Développeur d'Applications (CDA)",
    org: "La Plateforme · Marseille — en alternance chez BPMED",
    description:
      "Titre RNCP niveau 6 (Bac+3/4). Conception logicielle, architectures applicatives, mise en production, sécurité.",
  },
  {
    period: "2022 — 2023",
    role: "Développeur Web et Web Mobile (DWWM)",
    org: "La Plateforme · Marseille",
    description:
      "Titre RNCP niveau 5 (Bac+2). Bases du développement web front-end et back-end, intégration et déploiement.",
  },
];

const stack = [
  { label: "Langages", items: ["C#", "PHP", "JavaScript", "TypeScript"] },
  {
    label: "Frameworks & Backend",
    items: ["ASP.NET Core MVC", "Node.js", "Express"],
  },
  { label: "Bases de données", items: ["PostgreSQL", "TypeORM"] },
  { label: "Outils & DevOps", items: ["Git", "Jenkins", "SonarQube", "Docker"] },
  { label: "Environnements", items: ["Linux", "macOS"] },
];

const learning = [
  "Montée en compétences backend Node.js / TypeScript (architecture, services API)",
  "Apprentissage en cours : Go (Golang)",
];

function TimelineList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="space-y-6">
      {entries.map((item) => (
        <li key={`${item.period}-${item.role}`}>
          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
              <h4 className="font-medium">{item.role}</h4>
              <span className="font-mono text-xs text-muted shrink-0">
                {item.period}
              </span>
            </div>
            <p className="text-sm text-muted/80 mb-3">{item.org}</p>
            <p className="text-sm text-muted leading-relaxed">
              {item.description}
            </p>
            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-4 space-y-2">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  return (
    <div className="container pt-32 sm:pt-40 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <FadeIn className="lg:col-span-1">
          <GlassCard padding="none" className="overflow-hidden lg:sticky lg:top-24">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&q=80"
                alt={`Photo de ${siteConfig.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="font-semibold">{siteConfig.name}</h2>
              <p className="text-sm text-muted mt-1">{siteConfig.role}</p>
              <p className="text-sm text-muted mt-1">{siteConfig.location}</p>
              <Button
                href={`mailto:${siteConfig.email}`}
                external
                variant="outline"
                size="sm"
                className="mt-4 w-full"
              >
                {siteConfig.email}
              </Button>
            </div>
          </GlassCard>
        </FadeIn>

        <div className="lg:col-span-2 space-y-16">
          {/* Bio */}
          <FadeIn>
            <SectionTitle
              eyebrow="À propos"
              title="Construire des applications robustes et maintenables."
            />
            <div className="mt-8 space-y-5 text-base sm:text-lg text-muted leading-relaxed">
              <p>
                Développeur backend, je conçois des applications et des API
                robustes, principalement en{" "}
                <span className="text-foreground">Node.js / TypeScript</span>.
                J'accorde une attention particulière à l'architecture, à la
                qualité du code et à la sécurité.
              </p>
              <p>
                Je suis diplômé{" "}
                <span className="text-foreground">
                  Concepteur Développeur d'Applications
                </span>{" "}
                (La Plateforme, Marseille), titre obtenu en 2025 après deux
                années d'alternance à la{" "}
                <span className="text-foreground">
                  Banque Populaire Méditerranée
                </span>
                . Cette expérience en environnement bancaire m'a appris à coder
                avec des contraintes réelles : revue de code, sécurité, qualité,
                maintenabilité.
              </p>
              <p>
                Je développe aussi en auto-entrepreneur, ce qui renforce mon
                autonomie et mon expérience terrain.
              </p>
            </div>
          </FadeIn>

          {/* Stack technique */}
          <FadeIn>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Stack technique
            </h3>
            <GlassCard>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {stack.map((group) => (
                  <div key={group.label}>
                    <dt className="text-xs text-muted mb-2">{group.label}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/[0.04] border border-white/[0.06]"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </GlassCard>
          </FadeIn>

          {/* Expérience */}
          <FadeIn>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Expérience professionnelle
            </h3>
            <TimelineList entries={experiences} />
          </FadeIn>

          {/* Formation */}
          <FadeIn>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Formation
            </h3>
            <TimelineList entries={formations} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
