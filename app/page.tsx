import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

// Page statique (SSG) — aucune donnée externe au build, performance maximale.
export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <FeaturedProjects />
    </div>
  );
}
