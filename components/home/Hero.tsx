"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-3xl"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-5"
        >
          {siteConfig.location} · Disponible — freelance & opportunités
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-gradient"
        >
          Développeur <span className="text-accent">Backend</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl"
        >
          Je conçois des applications et des API robustes, principalement en{" "}
          <span className="text-foreground">Node.js / TypeScript</span>. Une
          attention particulière à l'architecture, à la qualité du code et à la
          sécurité — héritée de deux ans d'alternance en environnement bancaire.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-3">
          <Button href="/projects" size="lg">
            Voir mes projets
            <ArrowRight size={16} />
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            <Mail size={16} />
            Me contacter
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
