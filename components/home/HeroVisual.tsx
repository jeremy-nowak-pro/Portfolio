"use client";

import { motion } from "framer-motion";

/**
 * Visuel de droite du Hero — mock d'un éditeur de code en glassmorphism.
 * Choix design :
 *  - Pas d'animation en boucle (sobriété demandée).
 *  - Une seule entrée discrète (fade + slide depuis la droite).
 *  - Halo violet diffus en arrière-plan pour ancrer la carte dans le thème.
 *  - Coloration syntaxique inline avec les tons accent du site (violet / emerald / sky / amber).
 */
export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
      aria-hidden
    >
      {/* Halo violet diffus derrière la carte */}
      <div
        className="absolute -inset-12 bg-accent/15 blur-3xl rounded-full -z-10"
        aria-hidden
      />

      {/* Carte glassmorphism */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* En-tête type IDE : 3 ronds + nom de fichier */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/50" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-muted">
            api/users.controller.ts
          </span>
        </div>

        {/* Snippet stylisé — backend TypeScript classique */}
        <pre className="px-5 py-5 font-mono text-[12.5px] leading-[1.85] text-foreground/90 overflow-hidden">
          <code>
            <div>
              <span className="text-violet-300">import</span>
              <span className="text-muted">{" { "}</span>
              <span className="text-emerald-300">Request</span>
              <span className="text-muted">{" } "}</span>
              <span className="text-violet-300">from</span>{" "}
              <span className="text-amber-200">{"'express'"}</span>
            </div>

            <div className="h-3" aria-hidden />

            <div>
              <span className="text-violet-300">export async function</span>{" "}
              <span className="text-sky-300">getUser</span>
              <span className="text-muted">(req: </span>
              <span className="text-emerald-300">Request</span>
              <span className="text-muted">) {"{"}</span>
            </div>

            <div>
              <span className="text-muted">{"  "}</span>
              <span className="text-violet-300">const</span> user{" "}
              <span className="text-muted">=</span>{" "}
              <span className="text-violet-300">await</span>{" "}
              <span>findUser</span>
              <span className="text-muted">(req.params.id)</span>
            </div>

            <div>
              <span className="text-muted">{"  "}</span>
              <span className="text-violet-300">if</span>
              <span className="text-muted"> (!user) </span>
              <span className="text-violet-300">throw new</span>{" "}
              <span className="text-sky-300">NotFoundError</span>
              <span className="text-muted">(</span>
              <span className="text-amber-200">{"'User'"}</span>
              <span className="text-muted">)</span>
            </div>

            <div>
              <span className="text-muted">{"  "}</span>
              <span className="text-violet-300">return</span>
              <span className="text-muted">{" { "}</span>data: user
              <span className="text-muted">{" }"}</span>
            </div>

            <div>
              <span className="text-muted">{"}"}</span>
            </div>
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
