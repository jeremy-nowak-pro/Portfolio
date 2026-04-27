import type { Project } from "@/types";

/**
 * Source de vérité pour les projets.
 * Pour scaler : remplacer par un fetch CMS (Sanity, Contentlayer, MDX) sans
 * changer l'API consommée par les composants (cf. lib/projects.ts).
 */
export const projects: Project[] = [
  {
    slug: "fooder",
    title: "Fooder",
    tagline:
      "Projet de fin d'études — application mobile de découverte de recettes par swipe, avec logique métier côté backend.",
    description:
      "Projet fil rouge du titre CDA. App mobile React Native + backend Node/TypeScript : découverte de recettes par swipe, gestion utilisateurs, filtrage.",
    longDescription:
      "Fooder est mon projet de fin d'études, réalisé dans le cadre du titre Concepteur Développeur d'Applications. Mené en autonomie sur la dernière année de formation, c'est le projet sur lequel j'ai pu pousser le plus loin la réflexion architecture, de la conception au déploiement.\n\nL'idée : transformer la découverte de recettes en une expérience type Tinder, où l'utilisateur swipe pour valider ses préférences et recevoir des suggestions personnalisées.\n\nCôté mobile, j'ai construit l'app avec React Native (Expo), avec une attention particulière à la structuration des composants et à la gestion d'état. Côté backend, l'architecture est en TypeScript / Node.js (Express), avec une séparation claire entre services, middlewares et contrôleurs. L'authentification s'appuie sur Supabase (JWT, gestion de tokens), et les données sont stockées dans PostgreSQL via Supabase.\n\nL'objectif technique du projet est autant la fonctionnalité que la rigueur de l'architecture : monorepo TypeScript, principes SOLID, environnements staging / production séparés.",
    cover:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1600&q=80",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "Supabase",
      "PostgreSQL",
    ],
    role: "Conception & développement full-stack",
    year: 2025,
    status: "live",
    featured: true,
    links: {
      github: "https://github.com/jeremy-nowak/fil-rouge-fooder",
    },
    highlights: [
      "Architecture monorepo TypeScript (mobile + backend) avec responsabilités clairement séparées",
      "Système de découverte par swipe avec logique de filtrage côté backend",
      "Authentification sécurisée via Supabase (JWT, gestion de tokens)",
      "Séparation services / middlewares / contrôleurs et application des principes SOLID",
    ],
  },
  {
    slug: "lhvaudier",
    title: "lhvaudier.fr",
    tagline:
      "Site vitrine pour une illustratrice et peintre française, architecturé pour évoluer vers une boutique en ligne d'œuvres.",
    description:
      "Mission freelance — site personnel d'une artiste illustratrice, en Next.js et backend Go, pensé dès le départ pour supporter une future boutique d'œuvres.",
    longDescription:
      "Mission en freelance pour la conception et le développement du site personnel d'une illustratrice et peintre française. Le site présente son univers, son parcours et une sélection de ses travaux — graphisme textile, illustration, peinture — dans une mise en page volontairement sobre, pensée pour laisser respirer les œuvres et mettre le visuel au premier plan.\n\nLe projet a été conçu dès le départ avec une vision évolutive : ne pas rester un simple site vitrine, mais constituer la base technique d'une future boutique en ligne — vente d'originaux, de tirages ou d'éditions limitées. L'architecture sépare clairement frontend, backend et couche de données, et le modèle relationnel a été construit pour supporter les entités d'un e-commerce (produits, utilisateurs, commandes, catégories), permettant une transition progressive sans refonte majeure.\n\nCôté technique, le frontend est en Next.js / TailwindCSS pour bénéficier du rendu SSR/SSG et des performances SEO — un point critique pour la visibilité d'une artiste indépendante. Le backend est en Go (Golang), choisi pour sa performance et sa scalabilité, exposant une API REST. Les interactions dynamiques (formulaire de contact, automatisations) passent par des webhooks.",
    cover:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80",
    stack: ["Next.js", "React", "TailwindCSS", "Go", "REST API", "Vercel"],
    role: "Conception, développement & déploiement",
    year: 2025,
    status: "live",
    featured: true,
    links: {
      live: "https://lhvaudier.fr",
    },
    highlights: [
      "Architecture e-commerce ready : entités produits, utilisateurs, commandes et catégories modélisées dès la phase initiale",
      "Backend Go pour la performance et la capacité de montée en charge",
      "Frontend Next.js avec rendu SSR/SSG pour un SEO et des Core Web Vitals optimisés — un atout pour la visibilité d'une artiste indépendante",
      "Pipeline d'optimisation des images (formats modernes, lazy loading) pour valoriser les œuvres sans dégrader les performances",
      "Séparation claire des responsabilités : frontend, backend, couche de données",
      "Interactions dynamiques (contact, notifications) via un système de webhooks",
    ],
  },
];
