"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] " +
  "text-sm text-foreground placeholder:text-muted/60 " +
  "focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] " +
  "transition-colors";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // On capture la ref avant le await — React peut nullifier currentTarget après.
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Merci de remplir tous les champs requis.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Échec de l'envoi");
      setStatus("success");
      form.reset();
    } catch {
      setError("Impossible d'envoyer le message. Réessayez plus tard.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs text-muted mb-1.5">
            Nom <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs text-muted mb-1.5">
            Email <span aria-hidden className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jean@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs text-muted mb-1.5">
          Sujet
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={fieldClass}
          placeholder="Mission freelance, collaboration..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-muted mb-1.5">
          Message <span aria-hidden className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn(fieldClass, "resize-none")}
          placeholder="Parlez-moi de votre projet..."
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div aria-live="polite" className="text-sm min-h-[1.25rem]">
          {status === "success" && (
            <span className="text-emerald-400">
              Message envoyé. Je reviens vers vous rapidement.
            </span>
          )}
          {status === "error" && error && (
            <span className="text-rose-400">{error}</span>
          )}
        </div>

        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi…" : "Envoyer"}
          <Send size={14} />
        </Button>
      </div>
    </form>
  );
}
