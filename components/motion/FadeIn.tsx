"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Délai en secondes. Default: 0 */
  delay?: number;
  /** Décalage Y initial en px. Default: 12 */
  y?: number;
  /** Joue l'animation au scroll plutôt qu'au mount. Default: true */
  whileInView?: boolean;
}

/**
 * Animation d'entrée minimale et performante.
 * Une seule API pour toutes les apparitions du site.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 12,
  whileInView = true,
  ...props
}: FadeInProps) {
  const initial = { opacity: 0, y };
  const animate = { opacity: 1, y: 0 };
  const transition = { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (whileInView) {
    return (
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-50px" }}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div initial={initial} animate={animate} transition={transition} {...props}>
      {children}
    </motion.div>
  );
}
