import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ProjectNotFound() {
  return (
    <div className="container pt-40 pb-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
        404
      </p>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
        Projet introuvable
      </h1>
      <p className="text-muted max-w-md mx-auto mb-8">
        Ce projet n'existe pas ou a été déplacé.
      </p>
      <Button href="/projects" variant="outline">
        Voir tous les projets
      </Button>
    </div>
  );
}
