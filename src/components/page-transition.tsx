"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

let previousPath: string | null = null;
let armedPath: string | null = null;

function routeJustChanged(pathname: string) {
  if (typeof window === "undefined") return false;
  if (previousPath !== null && previousPath !== pathname) armedPath = pathname;
  previousPath = pathname;
  return (
    armedPath === pathname &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const play = routeJustChanged(pathname);

  if (!play) {
    return <div className="relative">{children}</div>;
  }

  return (
    <div className="relative">
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
    </div>
  );
}
