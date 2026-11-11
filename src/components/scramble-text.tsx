"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const out = root?.querySelector<HTMLElement>("[data-scramble-out]");
    if (!root || !out || text.length === 0 || reducedMotion()) return;

    let alive = true;
    let tween: { kill: () => void } | null = null;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      const state = { p: 0 };
      tween = gsap.to(state, {
        p: 1,
        duration: Math.min(0.95, 0.32 + text.length * 0.03),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 92%",
          once: true,
        },
        onUpdate: () => {
          const revealed = Math.floor(state.p * text.length);
          let next = "";
          for (let i = 0; i < text.length; i += 1) {
            const ch = text[i];
            if (
              i < revealed ||
              ch === " " ||
              ch === "/" ||
              ch === "." ||
              ch === "-" ||
              ch === "_"
            ) {
              next += ch;
            } else {
              next += GLYPHS[(Math.random() * GLYPHS.length) | 0];
            }
          }
          out.textContent = next;
        },
        onComplete: () => {
          out.textContent = text;
        },
      });
    })();

    return () => {
      alive = false;
      tween?.kill();
      out.textContent = text;
    };
  }, [text]);

  return (
    <span ref={rootRef} className={className} data-scramble={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-scramble-out>
        {text}
      </span>
    </span>
  );
}
