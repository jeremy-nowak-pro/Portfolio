"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-driven parallax ─────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sky drifts upward very subtly
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  // Layers rise from below as you scroll
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["70%", "0%"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["115%", "5%"]);
  const mistY   = useTransform(scrollYProgress, [0, 1], ["95%", "3%"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["165%", "25%"]);

  // Text fades in, floats, then fades out
  const textY       = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], ["55%", "0%", "-8%", "-22%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.18, 0.62, 0.85], [0, 1, 1, 0]);

  // Scroll indicator disappears as you begin scrolling
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  /* ── Mouse parallax ──────────────────────────────────────────────── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 75, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 75, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2));
      rawY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  // Per-layer mouse offsets (px) — stronger toward foreground
  const m1x = useTransform(springX, (v) => v * -10);
  const m1y = useTransform(springY, (v) => v * -5);
  const m2x = useTransform(springX, (v) => v * -20);
  const m2y = useTransform(springY, (v) => v * -9);
  const m3x = useTransform(springX, (v) => v * -36);
  const m3y = useTransform(springY, (v) => v * -14);
  const txX = useTransform(springX, (v) => v * -7);
  const txY = useTransform(springY, (v) => v * -4);

  return (
    /* ── 250 vh scroll container ─────────────────────────────────── */
    <div ref={containerRef} className="relative h-[250vh]">
      {/* Sticky viewport panel */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Sky / atmosphere ─────────────────────────────────────── */}
        <motion.div style={{ y: skyY }} className="absolute inset-0 scale-[1.1]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030908] via-[#0E2219] to-[#183525]" />
          {/* Bottom haze anchoring the scene */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2219]/70 via-transparent to-transparent" />
        </motion.div>

        {/* ── Layer 1 — Far mountains ───────────────────────────────── */}
        <motion.div
          style={{ y: layer1Y, x: m1x }}
          className="absolute inset-x-[-5%] bottom-0 h-[90%]"
        >
          <motion.div style={{ y: m1y }} className="absolute inset-0">
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMax slice"
              className="absolute bottom-0 w-full h-full"
              aria-hidden
            >
              {/* Main silhouette */}
              <path
                d="M0,900 L0,560
                   C50,530 110,495 190,458
                   C270,421 325,405 395,382
                   C465,359 518,372 576,348
                   C634,324 676,295 748,277
                   C820,259 882,272 942,292
                   C1002,312 1042,342 1102,332
                   C1162,322 1218,280 1278,302
                   C1338,324 1392,362 1440,382
                   L1440,900 Z"
                fill="#142b1c"
              />
              {/* Lighter ridge highlight */}
              <path
                d="M0,560
                   C50,530 110,495 190,458
                   C270,421 325,405 395,382
                   C465,359 518,372 576,348
                   C634,324 676,295 748,277
                   C820,259 882,272 942,292
                   C1002,312 1042,342 1102,332
                   C1162,322 1218,280 1278,302
                   C1338,324 1392,362 1440,382"
                fill="none"
                stroke="#1d3d28"
                strokeWidth="2"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Atmospheric mist between layers ──────────────────────── */}
        <motion.div
          style={{ y: mistY }}
          className="absolute inset-x-0 h-[28%] pointer-events-none z-[5]"
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#d8ede4]/[0.022] to-transparent" style={{ filter: "blur(24px)" }} />
        </motion.div>

        {/* ── Layer 2 — Mid mountains ───────────────────────────────── */}
        <motion.div
          style={{ y: layer2Y, x: m2x }}
          className="absolute inset-x-[-5%] bottom-0 h-[72%] z-[6]"
        >
          <motion.div style={{ y: m2y }} className="absolute inset-0">
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMax slice"
              className="absolute bottom-0 w-full h-full"
              aria-hidden
            >
              <path
                d="M0,900 L0,672
                   C75,645 155,615 235,586
                   C315,557 375,548 438,518
                   C501,488 542,477 602,458
                   C662,439 713,428 772,418
                   C831,408 882,418 942,440
                   C1002,462 1042,482 1102,472
                   C1162,462 1202,440 1262,452
                   C1322,464 1382,494 1440,504
                   L1440,900 Z"
                fill="#0f2017"
              />
              <path
                d="M0,672
                   C75,645 155,615 235,586
                   C315,557 375,548 438,518
                   C501,488 542,477 602,458
                   C662,439 713,428 772,418
                   C831,408 882,418 942,440
                   C1002,462 1042,482 1102,472
                   C1162,462 1202,440 1262,452
                   C1322,464 1382,494 1440,504"
                fill="none"
                stroke="#193528"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Text layer (between mid and foreground) ───────────────── */}
        <motion.div
          style={{ y: textY, opacity: textOpacity, x: txX }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <motion.div style={{ y: txY }} className="text-center px-6 select-none">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent/75 mb-5">
              Indépendant · France
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02] text-foreground"
                style={{ textShadow: "0 0 80px rgba(14,34,25,0.9), 0 2px 40px rgba(14,34,25,0.7)" }}>
              Jérémy<br />
              <span className="text-accent">Nowak</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted/75 max-w-sm mx-auto leading-relaxed">
              Développeur Backend · Node.js · TypeScript
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center pointer-events-auto">
              <Button href="/projects" size="lg">
                Voir mes projets
                <ArrowRight size={16} />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                <Mail size={16} />
                Me contacter
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Layer 3 — Foreground jungle canopy ───────────────────── */}
        <motion.div
          style={{ y: layer3Y, x: m3x }}
          className="absolute inset-x-[-5%] bottom-0 h-[58%] z-[15]"
        >
          <motion.div style={{ y: m3y }} className="absolute inset-0">
            <svg
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMax slice"
              className="absolute bottom-0 w-full h-full"
              aria-hidden
            >
              {/* Base hill */}
              <path
                d="M0,900 L0,774
                   C95,746 192,718 295,698
                   C398,678 458,692 518,680
                   C578,668 622,648 682,638
                   C742,628 802,640 862,660
                   C922,680 962,702 1022,712
                   C1082,722 1142,712 1202,722
                   C1262,732 1352,762 1440,772
                   L1440,900 Z"
                fill="#091610"
              />
              {/* Dense tree-top silhouette */}
              <path
                d="M-10,774
                   C8,758 26,742 46,752 C66,762 78,777 98,757
                   C118,737 132,722 152,732 C172,742 182,760 202,742
                   C222,724 238,710 258,720 C278,730 290,748 310,730
                   C330,712 344,698 364,708 C384,718 396,736 416,718
                   C436,700 452,688 472,698 C492,708 504,728 524,710
                   C544,692 558,680 578,690 C598,700 610,718 630,700
                   C650,682 666,670 686,680 C706,690 718,708 738,690
                   C758,672 774,660 794,670 C814,680 826,698 846,680
                   C866,662 882,650 902,660 C922,670 932,688 952,670
                   C972,652 988,640 1008,650 C1028,660 1038,678 1058,660
                   C1078,642 1094,630 1114,640 C1134,650 1144,668 1164,650
                   C1184,632 1200,620 1220,630 C1240,640 1250,658 1270,640
                   C1290,622 1306,610 1326,620 C1346,630 1362,658 1382,662
                   C1402,666 1422,652 1450,642
                   L1450,900 L-10,900 Z"
                fill="#07100b"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ─────────────────────────────────────── */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-muted/40 to-transparent"
          />
        </motion.div>

      </div>
    </div>
  );
}
