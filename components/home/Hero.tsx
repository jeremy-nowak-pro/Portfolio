"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";

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
    <section className="relative pt-24 sm:pt-28 lg:pt-40 pb-16 sm:pb-24">
      {/*
        Layout responsive :
        - Mobile / tablette : une seule colonne, le visuel est masqué.
        - lg+ : deux colonnes — texte à gauche (souple), visuel à droite (max 420px).
        Le visuel a sa propre animation d'entrée (cf. HeroVisual), donc on n'inclut
        pas dans le motion stagger pour garder un rythme indépendant.
      */}
      <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16 items-center">
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
          Indépendant · France
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-gradient"
        >
          Développeur <span className="text-accent">Backend</span>
        </motion.h1>

        {/*
          Bloc de présentation découpé en 3 paragraphes logiques :
          1. Qui je suis & parcours
          2. Approche technique
          3. Disponibilité

          Choix typographiques :
          - text-base sm:text-lg : taille plus modeste que le subtitle d'origine,
            adaptée à la lecture longue (recommandation : 16-18px pour la prose).
          - leading-relaxed (1.625) : interligne confortable sans excès.
          - max-w-prose : limite la largeur ~65ch — la longueur de ligne idéale.
          - space-y-5 : respiration claire entre paragraphes (~20px).
        */}
        <motion.div
          variants={itemVariants}
          className="mt-8 max-w-prose space-y-5 text-base sm:text-lg text-muted leading-relaxed"
        >
          <p>
            Je m'appelle Jérémy Nowak, développeur basé à La Seyne-sur-Mer.
            J'ai obtenu un titre de{" "}
            <span className="text-foreground">
              Concepteur Développeur d'Applications
            </span>{" "}
            à La Plateforme de Marseille,{" "}
            <span className="text-foreground">
              après deux années d'alternance au siège d'une banque
            </span>{" "}
            — une expérience qui m'a permis d'évoluer dans un environnement
            structuré et exigeant.
          </p>

          <p>
            Côté technique, je conçois et développe des applications web
            orientées backend, avec une attention particulière à la fiabilité,
            à la performance et à la maintenabilité du code. J'ai l'habitude
            de travailler sur des architectures modernes, de développer et
            maintenir des API, et d'intervenir sur l'ensemble du cycle —
            du modèle de données jusqu'au déploiement.
          </p>

          <p>
            Aujourd'hui, je suis ouvert à de nouveaux projets et opportunités
            pour continuer à progresser et mettre mes compétences au service
            de produits concrets.
          </p>
        </motion.div>

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

        {/* Visuel — masqué sur mobile/tablette pour ne pas alourdir la page */}
        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
