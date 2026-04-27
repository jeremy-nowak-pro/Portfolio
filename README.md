# Portfolio — Next.js 14 (App Router)

Portfolio développeur professionnel avec design glassmorphism, dark mode, animations Framer Motion et bonnes pratiques SEO/perf.

## Stack

- **Framework** : Next.js 14 (App Router) + TypeScript strict
- **Styling** : Tailwind CSS 3 + variables CSS custom
- **Animations** : Framer Motion (mount + scroll, respecte `prefers-reduced-motion`)
- **Icônes** : Lucide React
- **Fonts** : Inter + JetBrains Mono via `next/font` (zéro layout shift)

## Démarrage

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de production
npm run type-check   # validation TS
```

## Architecture

```
.
├── app/                       # App Router : routes + layouts
│   ├── layout.tsx             # Root layout (fonts, metadata, navbar, footer)
│   ├── page.tsx               # Accueil (SSG)
│   ├── globals.css            # Tokens CSS, glassmorphism, scroll smooth
│   ├── sitemap.ts             # /sitemap.xml généré au build
│   ├── robots.ts              # /robots.txt
│   ├── not-found.tsx          # 404 globale
│   ├── loading.tsx            # Suspense fallback
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx           # Liste (SSG)
│   │   └── [slug]/
│   │       ├── page.tsx       # Détail projet (SSG via generateStaticParams)
│   │       └── not-found.tsx
│   ├── contact/page.tsx
│   └── api/contact/route.ts   # Endpoint Edge pour le formulaire
│
├── components/
│   ├── layout/                # Navbar, Footer
│   ├── ui/                    # Primitives : GlassCard, Button, SectionTitle
│   ├── motion/                # FadeIn (wrapper Framer Motion)
│   ├── home/                  # Sections de la home
│   ├── projects/              # ProjectCard
│   └── contact/               # ContactForm (client)
│
├── data/                      # Source de vérité (typée)
│   ├── projects.ts
│   └── skills.ts
│
├── lib/                       # Couche d'accès + utils
│   ├── projects.ts            # API publique : getAllProjects, getBySlug...
│   ├── skills.ts              # Regroupement par catégorie
│   └── utils.ts               # cn() + siteConfig
│
└── types/index.ts             # Modèles partagés
```

### Pourquoi cette structure

- **`data/` séparé de `lib/`** : la couche `lib/` encapsule l'accès. Demain on remplace `data/projects.ts` par un fetch CMS — aucune page ne change.
- **Pas de barrel file** (`index.ts` qui ré-exporte tout) : ça casse le tree-shaking et complique le code-splitting.
- **`components/` segmenté par domaine** (layout, ui, projects…) plutôt qu'un dossier plat — scale beaucoup mieux à 30+ composants.
- **`ui/` ne contient que des primitives sans logique métier** — réutilisables n'importe où.

## Server vs Client Components

Par défaut tout est **Server Component** (gratuit en perf, SEO, bundle).

Sont marqués `"use client"` uniquement quand nécessaire :

| Composant       | Raison                                                |
| --------------- | ----------------------------------------------------- |
| `Navbar`        | `usePathname` + `useState` (menu mobile, scroll)      |
| `Hero`          | Animation Framer Motion d'entrée                      |
| `FadeIn`        | `whileInView` (IntersectionObserver côté client)      |
| `ContactForm`   | `useState` + `fetch` POST                             |

Tous les autres (pages, ProjectCard, GlassCard, sections) sont **Server Components**.

## SSR / SSG / ISR — quel mode pour quelle page

L'App Router choisit automatiquement le mode de rendu selon ce que la page utilise. Voici la matrice du projet :

| Route                  | Mode | Pourquoi |
|------------------------|------|----------|
| `/`                    | **SSG** | Aucune donnée dynamique au build. Une seule page HTML générée, servie depuis le CDN. |
| `/about`               | **SSG** | Idem — contenu statique. |
| `/projects`            | **SSG** | Lit `data/projects.ts` au build. |
| `/projects/[slug]`     | **SSG** | `generateStaticParams()` → toutes les pages projets pré-rendues au build. |
| `/contact`             | **SSG** | Le formulaire est client-side. |
| `/api/contact`         | **Edge runtime** | POST handler, exécuté à la demande. |

### Quand utiliser quoi

- **SSG** (Static Site Generation) : contenu qui ne change pas par utilisateur. Le HTML est généré au build et servi tel quel. **C'est le défaut, à privilégier toujours quand c'est possible.** Performance maximale, SEO parfait, coût quasi nul.
- **ISR** (Incremental Static Regeneration) : SSG + revalidation périodique. À utiliser dès que le contenu vient d'un CMS qui change indépendamment du déploiement. Activation : `export const revalidate = 3600;` (en secondes) sur la page.
- **SSR** (Server-Side Rendering) : HTML rendu à chaque requête. Nécessaire uniquement si la page dépend de la requête entrante (cookies, headers, user). Activation : `export const dynamic = "force-dynamic";` ou simplement utiliser `cookies()`/`headers()`.
- **CSR** (Client-Side Rendering) : pour les parties interactives uniquement, dans des `"use client"` components.

**Ce portfolio est 100% SSG** — c'est le bon défaut pour ce type de site. Migrer vers ISR le jour où les projets viennent d'un CMS :

```ts
// app/projects/[slug]/page.tsx
export const revalidate = 3600; // re-build cette page max toutes les heures
```

## SEO

- **`metadata` par page** (App Router API native) : titre + description + OG.
- **Template de titre** : `template: "%s — Jérémy Nowak"` dans le root layout, chaque page n'a qu'à fournir son titre.
- **Métadonnées dynamiques** : `generateMetadata()` sur `/projects/[slug]` pour titre/description/OG par projet.
- **Open Graph + Twitter Card** configurés au root.
- **`metadataBase`** défini → tous les chemins relatifs (OG image, etc.) sont résolus correctement.
- **`sitemap.xml`** + **`robots.txt`** générés via `app/sitemap.ts` et `app/robots.ts`.
- **Lang attribute** : `<html lang="fr">`.
- **Skip link** vers `#main` pour l'accessibilité clavier.

## Performance

- **`next/image`** partout, avec `sizes` calculé au cas par cas, formats AVIF/WebP, et `priority` uniquement sur l'image au-dessus de la ligne de flottaison.
- **`next/font`** pour Inter + JetBrains Mono — auto-host, `display: swap`, zéro CLS.
- **`optimizePackageImports`** sur `lucide-react` et `framer-motion` (tree-shaking agressif).
- **Server Components par défaut** : le bundle JS client est minimal. Seuls les composants animés/interactifs sont envoyés au browser.
- **Lazy loading** : Next charge automatiquement les images en-dessous de la ligne de flottaison en lazy. Pour du code splitting manuel d'un composant lourd : `dynamic(() => import("./Heavy"))`.
- **`prefers-reduced-motion`** respecté dans `globals.css` — toutes les animations se désactivent.

## Glassmorphism

L'effet est centralisé dans deux classes Tailwind custom (`globals.css` → `@layer components`) :

```css
.glass        /* base : fond translucide + blur + border */
.glass-hover  /* élévation au survol */
```

Le composant `GlassCard` les utilise — toutes les surfaces du site passent par là pour rester cohérentes.

## Personnalisation rapide

1. **Identité** — `lib/utils.ts` → `siteConfig` (nom, email, URL, social).
2. **Projets** — `data/projects.ts`. Ajouter un objet conforme au type `Project`.
3. **Skills** — `data/skills.ts`.
4. **Couleur d'accent** — `app/globals.css` → variable `--accent` (RGB sans parenthèses).
5. **Photo "À propos"** — `app/about/page.tsx`, remplacer l'URL Unsplash.
6. **Image OG** — placer un `og-image.png` (1200×630) dans `public/`.

## Branchement du formulaire de contact

Le handler `app/api/contact/route.ts` log juste pour l'instant. Pour brancher Resend :

```bash
npm install resend
```

```ts
// app/api/contact/route.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Portfolio <noreply@yourdomain.com>",
  to: "you@example.com",
  subject: `Nouveau message de ${name}`,
  text: message,
  replyTo: email,
});
```

Variable d'env : `RESEND_API_KEY` dans `.env.local`.

## Déploiement

Optimisé pour **Vercel** (zéro config) :

```bash
vercel
```

Pense à définir `NEXT_PUBLIC_SITE_URL` (ou ajuster `siteConfig.url`) en prod pour que les URLs absolues du sitemap et de l'OG soient correctes.
