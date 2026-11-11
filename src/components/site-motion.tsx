"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SiteMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      document.documentElement.classList.add("motion-ready");
      if (reducedMotion()) return;

      const jobs: Array<{ el: HTMLElement; final: string }> = [];

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(":scope > [data-stagger-item]");
        if (items.length === 0) return;
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-timeline]").forEach((root) => {
        const line = root.querySelector<HTMLElement>("[data-timeline-line]");
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              end: "bottom 68%",
              scrub: 0.45,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-scramble]").forEach((node) => {
        const out = node.querySelector<HTMLElement>("[data-scramble-out]");
        const final = node.dataset.scramble ?? "";
        if (!out || final.length === 0) return;
        jobs.push({ el: out, final });
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          duration: Math.min(0.95, 0.32 + final.length * 0.03),
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top 92%",
            once: true,
          },
          onUpdate: () => {
            const revealed = Math.floor(state.p * final.length);
            let next = "";
            for (let i = 0; i < final.length; i += 1) {
              const ch = final[i];
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
            out.textContent = final;
          },
        });
      });

      let alive = true;
      document.fonts?.ready.then(() => {
        if (alive) ScrollTrigger.refresh();
      });

      const cleanups: Array<() => void> = [];
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (finePointer) {
        gsap.utils.toArray<HTMLElement>(".magnetic").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
          const onMove = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            xTo(Math.max(-8, Math.min(8, dx * 0.18)));
            yTo(Math.max(-6, Math.min(6, dy * 0.25)));
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
            xTo(0);
            yTo(0);
          });
        });
      }

      return () => {
        alive = false;
        cleanups.forEach((fn) => fn());
        jobs.forEach(({ el, final }) => {
          el.textContent = final;
        });
      };
    },
    {
      dependencies: [pathname],
      scope: typeof document === "undefined" ? undefined : document.body,
      revertOnUpdate: true,
    },
  );

  return null;
}
