import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "Jérémy Nowak",
  role: "Développeur Backend",
  description:
    "Portfolio de Jérémy Nowak — développeur backend basé à La Seyne-sur-Mer. Conception d'applications et d'API robustes en Node.js / TypeScript, avec un focus sur l'architecture, la qualité du code et la sécurité.",
  url: "https://jeremynowak.dev",
  email: "jeremy.nowak.pro@gmail.com",
  location: "La Seyne-sur-Mer, France",
  social: {
    github: "https://github.com/jeremy-nowak-pro",
    linkedin: "https://www.linkedin.com/in/jeremy-nowak-dev",
  },
};
