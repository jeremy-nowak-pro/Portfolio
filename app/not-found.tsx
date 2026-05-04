import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container pt-32 sm:pt-40 pb-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
        404
      </p>
      <h1 className="text-4xl sm:text-5xl font-semibold mb-4 text-gradient">
        Page introuvable
      </h1>
      <p className="text-muted max-w-md mx-auto mb-8">
        La page que vous cherchez n'existe pas — ou n'existe plus.
      </p>
      <Button href="/">Retour à l'accueil</Button>
    </div>
  );
}
