"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState, type ReactNode } from "react";

let previousPath: string | null = null;

function allowMotion() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [decision, setDecision] = useState<{ path: string; play: boolean } | null>(null);

  if (decision?.path !== pathname) {
    setDecision({
      path: pathname,
      play:
        typeof window !== "undefined" &&
        previousPath !== null &&
        previousPath !== pathname &&
        allowMotion(),
    });
  }

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      previousPath = pathname;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const play = decision?.path === pathname && decision.play;

  return (
    <div key={pathname} className="relative">
      {play ? (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left bg-accent"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 origin-top bg-[linear-gradient(to_bottom,rgba(61,220,151,0.18),transparent)]"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
