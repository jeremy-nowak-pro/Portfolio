"use client";

import { motion } from "framer-motion";

/**
 * Visuel de droite du Hero — fiche-stats glassmorphism.
 *
 * Trois sections logiques :
 *  1. Header : libellé "Statut" + indicateur disponibilité (dot vert qui pulse).
 *  2. Stats : 3 chiffres-clés (expérience, diplômes, domaine).
 *  3. Footer : stack principale en chips.
 *
 * Choix design :
 *  - Aucune animation en boucle continue (sobre), sauf le ping discret du dot
 *    de disponibilité — il suggère "live" sans être distrayant.
 *  - Halo violet diffus en arrière-plan pour intégrer la carte au thème.
 *  - Lecture verticale : le visiteur peut absorber l'info en moins d'une seconde.
 */

const stats = [
  { value: "4+", label: "Années" },
  { value: "2", label: "Diplômes" },
  { value: "Backend", label: "Focus" },
];

const stack = ["TypeScript", "Node.js", "React", "Go"];

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      {/* Halo violet diffus en arrière-plan */}
      <div
        className="absolute -inset-12 bg-accent/15 blur-3xl rounded-full -z-10"
        aria-hidden
      />

      <div className="glass rounded-2xl overflow-hidden">
        {/* Header — libellé + status */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Statut
          </span>
          <span
            className="inline-flex items-center gap-2 text-xs"
            aria-label="Disponible pour de nouveaux projets"
          >
            {/* Dot vert avec ping subtil */}
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-emerald-300 font-medium">Disponible</span>
          </span>
        </div>

        {/* Stats — 3 colonnes */}
        <div className="grid grid-cols-3 px-6 py-7 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer — stack principale */}
        <div className="px-6 py-5 border-t border-white/[0.06]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-3">
            Stack principale
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/[0.04] border border-white/[0.06]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
