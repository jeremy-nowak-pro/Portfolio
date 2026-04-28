import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contacter ${siteConfig.name} pour une mission, une collaboration ou simplement échanger.`,
};

const channels = [
  { Icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { Icon: Linkedin, label: "LinkedIn", value: "jeremy-nowak-dev", href: siteConfig.social.linkedin },
  { Icon: Github, label: "GitHub", value: "jeremy-nowak-pro", href: siteConfig.social.github },
  { Icon: MapPin, label: "Localisation", value: siteConfig.location },
];

export default function ContactPage() {
  return (
    <div className="container pt-24 sm:pt-28 lg:pt-40 pb-16">
      <SectionTitle
        eyebrow="Contact"
        title="Travaillons ensemble."
        description="Mission, collaboration ou simple échange — je réponds sous 48h."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <FadeIn className="lg:col-span-3">
          <GlassCard padding="lg">
            <ContactForm />
          </GlassCard>
        </FadeIn>

        <FadeIn className="lg:col-span-2">
          <GlassCard padding="lg" className="h-full">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Autres canaux
            </h3>
            <ul className="space-y-5">
              {channels.map(({ Icon, label, value, href }) => {
                const content = (
                  <>
                    <Icon size={18} className="text-muted shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted">{label}</p>
                      <p className="text-sm truncate">{value}</p>
                    </div>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex gap-3 hover:text-accent transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex gap-3">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
