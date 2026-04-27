import type { Project } from "@/types";

/**
 * Source de vérité pour les projets.
 * Pour scaler : remplacer par un fetch CMS (Sanity, Contentlayer, MDX) sans
 * changer l'API consommée par les composants (cf. lib/projects.ts).
 */
export const projects: Project[] = [
  {
    slug: "recipe-swipe",
    title: "Recipe Swipe",
    tagline:
      "Application mobile de découverte de recettes avec un système de swipe et une logique métier côté backend.",
    description:
      "App mobile React Native + backend Node/TypeScript. Découverte de recettes par swipe, gestion utilisateurs, stockage et filtrage.",
    longDescription:
      "Recipe Swipe est mon projet phare actuel. L'idée : transformer la découverte de recettes en une expérience type Tinder, où l'utilisateur swipe pour valider ses préférences et recevoir des suggestions personnalisées.\n\nCôté mobile, j'ai construit l'app avec React Native (Expo), avec une attention particulière à la structuration des composants et à la gestion d'état. Côté backend, l'architecture est en TypeScript / Node.js (Express), avec une séparation claire entre services, middlewares et contrôleurs. L'authentification s'appuie sur Supabase (JWT, gestion de tokens), et les données sont stockées dans PostgreSQL via Supabase.\n\nL'objectif technique du projet est autant la fonctionnalité que la rigueur de l'architecture : monorepo TypeScript, principes SOLID, environnements staging / production séparés.",
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
    status: "in-progress",
    featured: true,
    links: {
      github: "https://github.com/jeremy-nowak-pro",
    },
    highlights: [
      "Architecture monorepo TypeScript (mobile + backend) avec responsabilités clairement séparées",
      "Système de découverte par swipe avec logique de filtrage côté backend",
      "Authentification sécurisée via Supabase (JWT, gestion de tokens)",
      "Séparation services / middlewares / contrôleurs et application des principes SOLID",
    ],
  },
  {
    slug: "modular-backend",
    title: "Backend modulaire",
    tagline:
      "Backend Node.js / TypeScript structuré, pensé pour la maintenabilité et la scalabilité.",
    description:
      "Architecture backend Express avec authentification, gestion d'environnements et conteneurisation Docker.",
    longDescription:
      "Projet d'exploration architecturale autour d'un backend Node.js / Express en TypeScript, avec une approche orientée microservices / SOA. Mise en place de l'authentification (JWT, intégration Auth0 et Supabase selon les contextes), d'un ORM (TypeORM) avec PostgreSQL, et conteneurisation complète via Docker / Docker Compose.\n\nLa séparation des responsabilités est centrale : couche services pour la logique métier, middlewares pour les concerns transverses (auth, logging, validation), contrôleurs comme points d'entrée fins. L'ensemble est déployable en staging et production via des pipelines CI/CD Bitbucket.",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80",
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "TypeORM",
      "PostgreSQL",
      "Docker",
      "Auth0",
      "Supabase",
    ],
    role: "Conception backend & DevOps",
    year: 2025,
    status: "live",
    featured: true,
    links: {
      github: "https://github.com/jeremy-nowak-pro",
    },
    highlights: [
      "Architecture en couches (services, middlewares, contrôleurs) inspirée de SOLID",
      "Authentification sécurisée multi-provider (JWT, Auth0, Supabase)",
      "Conteneurisation Docker / Docker Compose avec environnements staging et production",
      "Pipelines CI/CD Bitbucket pour le déploiement automatisé",
    ],
  },
];
