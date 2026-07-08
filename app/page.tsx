import { HeroParallax } from "@/components/home/HeroParallax";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

// Page statique (SSG) — aucune donnée externe au build, performance maximale.
export default function HomePage() {
  return (
    <>
      {/* HeroParallax est full-width — pas de container wrapper */}
      <HeroParallax />
      <div className="container">
        <FeaturedProjects />
      </div>
    </>
  );
}
