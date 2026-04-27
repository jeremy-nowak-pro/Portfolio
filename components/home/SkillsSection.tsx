import { getSkillsByCategory } from "@/lib/skills";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";
import type { SkillLevel } from "@/types";
import { cn } from "@/lib/utils";

const LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Confirmé",
  expert: "Expert",
};

const LEVEL_DOTS: Record<SkillLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

function LevelIndicator({ level }: { level: SkillLevel }) {
  const filled = LEVEL_DOTS[level];
  return (
    <div className="flex gap-0.5" aria-label={`Niveau : ${LEVEL_LABELS[level]}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "block h-1 w-3 rounded-full transition-colors",
            i < filled ? "bg-accent" : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}

export function SkillsSection() {
  const groups = getSkillsByCategory();

  return (
    <section className="page-section">
      <SectionTitle
        eyebrow="Stack"
        title="Compétences"
        description="Les technologies que j'utilise au quotidien, regroupées par domaine."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.04}>
            <GlassCard className="h-full">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-sm">{skill.name}</span>
                    <LevelIndicator level={skill.level} />
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
