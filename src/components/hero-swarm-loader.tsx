"use client";

import { useEffect } from "react";

let played = false;

function revealHero() {
  document.documentElement.classList.add("swarm-done");
  document.querySelectorAll<HTMLElement>("[data-swarm-piece]").forEach((el) => {
    el.style.removeProperty("opacity");
    el.style.removeProperty("transform");
    el.style.removeProperty("translate");
  });
}

function blocked() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(max-width: 767px)").matches) return true;
  const cores = navigator.hardwareConcurrency;
  return Boolean(cores && cores <= 4);
}

export function HeroSwarmLoader() {
  useEffect(() => {
    const root = document.documentElement;
    if (played || blocked() || !root.classList.contains("swarm-intro")) {
      if (root.classList.contains("swarm-intro")) revealHero();
      return;
    }

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const stage = hero?.querySelector<HTMLElement>("[data-swarm-stage]");
    if (!hero || !stage) {
      revealHero();
      return;
    }

    let stop = () => {};
    let ended = false;
    let started = false;

    const end = () => {
      if (ended) return;
      ended = true;
      played = true;
      revealHero();
      queueMicrotask(() => stop());
    };

    const onSkip = () => {
      if (!started) end();
    };
    const onStart = () => {
      started = true;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") window.dispatchEvent(new Event("swarm:skip"));
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".swarm-skip")) return;
      window.dispatchEvent(new Event("swarm:skip"));
    };

    window.addEventListener("swarm:skip", onSkip);
    window.addEventListener("swarm:end", end);
    window.addEventListener("swarm:start", onStart);
    window.addEventListener("keydown", onKey);
    hero.addEventListener("pointerdown", onPointer);

    const watchdog = window.setTimeout(() => {
      if (!started) end();
    }, 4000);
    const hardStop = window.setTimeout(end, 8000);

    let cancelled = false;
    void import("@/components/hero-swarm").then((mod) => {
      if (cancelled || ended) return;
      stop = mod.mountHeroSwarm(stage);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(watchdog);
      window.clearTimeout(hardStop);
      window.removeEventListener("swarm:skip", onSkip);
      window.removeEventListener("swarm:end", end);
      window.removeEventListener("swarm:start", onStart);
      window.removeEventListener("keydown", onKey);
      hero.removeEventListener("pointerdown", onPointer);
      stop();
      if (started && !root.classList.contains("swarm-done")) revealHero();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="swarm-skip"
        onClick={() => window.dispatchEvent(new Event("swarm:skip"))}
      >
        skip
      </button>
      <div data-swarm-stage className="swarm-stage" aria-hidden="true" />
    </>
  );
}
