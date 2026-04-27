import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/utils";

const socialLinks = [
  { href: siteConfig.social.github, label: "GitHub", Icon: Github },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>

        <ul className="flex items-center gap-2">
          {socialLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              <Link
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2 rounded-full text-muted hover:text-foreground
                           hover:bg-white/[0.05] transition-colors"
              >
                <Icon size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
