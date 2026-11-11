"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";

// Named cursors assembling a page is inspired by Joel Califa's Swarm.
// The drawing, timeline, and motion here are original to this site.

const CREW = [
  { name: "malik", color: "#3ddc97", text: false },
  { name: "figma", color: "#e0a45a", text: false },
  { name: "gsap", color: "#7ee0c6", text: false },
  { name: "next.js", color: "#d5e4dc", text: false },
  { name: "vscode", color: "#8eb6ff", text: true },
] as const;

type Box = { x: number; y: number; w: number; h: number };

function measure(el: HTMLElement, origin: HTMLElement): Box {
  const next = el.getBoundingClientRect();
  const base = origin.getBoundingClientRect();
  return {
    x: next.left - base.left,
    y: next.top - base.top,
    w: next.width,
    h: next.height,
  };
}

function CursorGlyph({ name, color, text }: { name: string; color: string; text: boolean }) {
  return (
    <div className="swarm-cursor" data-cursor={name} data-tool="point" style={{ color }}>
      <svg className="swarm-arrow" width="17" height="17" viewBox="0 0 17 17" aria-hidden="true">
        <path
          d="M1.2 1.1 L1.2 13.6 L4.7 10.4 L7.5 15.6 L9.6 14.6 L6.8 9.5 L11.6 9.3 Z"
          fill="currentColor"
        />
      </svg>
      {text ? (
        <svg className="swarm-ibeam" width="14" height="22" viewBox="0 0 14 22" aria-hidden="true">
          <path
            d="M3 1.5 H11 M7 1.5 V20.5 M3 20.5 H11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </svg>
      ) : null}
      <span className="swarm-tag">{name}</span>
    </div>
  );
}

function SwarmPlay() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = wrap.current;
    const hero = stage?.closest<HTMLElement>("[data-hero]");
    if (!stage || !hero) return;

    let timeline: gsap.core.Timeline | null = null;
    let cancelled = false;
    let closed = false;

    const close = () => {
      if (closed) return;
      closed = true;
      window.dispatchEvent(new Event("swarm:end"));
    };

    const onSkip = () => {
      cancelled = true;
      timeline?.kill();
      close();
    };
    window.addEventListener("swarm:skip", onSkip);

    const play = () => {
      if (cancelled) return;
      const boot = hero.querySelector<HTMLElement>('[data-swarm-piece="boot"]');
      const headline = hero.querySelector<HTMLElement>('[data-swarm-piece="headline"]');
      const copy = hero.querySelector<HTMLElement>('[data-swarm-piece="copy"]');
      const actions = hero.querySelector<HTMLElement>('[data-swarm-piece="actions"]');
      const panel = hero.querySelector<HTMLElement>('[data-swarm-piece="panel"]');
      const lanes = hero.querySelector<HTMLElement>('[data-swarm-piece="lanes"]');
      const glow = hero.querySelector<HTMLElement>('[data-swarm-piece="glow"]');
      const buttons = actions?.querySelectorAll<HTMLElement>("a");
      if (!boot || !headline || !copy || !actions || !panel || !lanes || !glow || !buttons || buttons.length < 2) {
        close();
        return;
      }

      const cursor = (name: string) =>
        stage.querySelector<HTMLElement>(`[data-cursor="${CSS.escape(name)}"]`);
      const malik = cursor("malik");
      const figma = cursor("figma");
      const guide = cursor("gsap");
      const nextCursor = cursor("next.js");
      const editor = cursor("vscode");
      const box = stage.querySelector<HTMLElement>("[data-box]");
      const badge = stage.querySelector<HTMLElement>("[data-badge]");
      const frame = stage.querySelector<HTMLElement>("[data-frame]");
      const draft = stage.querySelector<HTMLElement>("[data-draft]");
      const draftText = stage.querySelector<HTMLElement>("[data-draft-text]");
      const ruler = stage.querySelector<HTMLElement>("[data-ruler]");
      const rulerLabel = stage.querySelector<HTMLElement>("[data-ruler-label]");
      const origin = stage.querySelector<HTMLElement>("[data-ghost='origin']");
      const ghost = stage.querySelector<HTMLElement>("[data-ghost='drag']");
      const alt = stage.querySelector<HTMLElement>("[data-alt]");
      const caret = stage.querySelector<HTMLElement>(".caret");
      if (
        !malik ||
        !figma ||
        !guide ||
        !nextCursor ||
        !editor ||
        !box ||
        !badge ||
        !frame ||
        !draft ||
        !draftText ||
        !ruler ||
        !rulerLabel ||
        !origin ||
        !ghost ||
        !alt ||
        !caret
      ) {
        close();
        return;
      }

      const crew = [malik, figma, guide, nextCursor, editor];
      const bootBox = measure(boot, hero);
      const head = measure(headline, hero);
      const copyBox = measure(copy, hero);
      const grade = copy.querySelector("p");
      const gradeBox = grade ? measure(grade, hero) : copyBox;
      const panelBox = measure(panel, hero);
      const primary = measure(buttons[0], hero);
      const secondary = measure(buttons[1], hero);
      const rulerY = gradeBox.y - 10;
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      const name = headline.dataset.swarmText ?? "";
      const buttonLabel = buttons[0].textContent?.trim() || "View projects";
      origin.textContent = buttonLabel;
      ghost.textContent = buttonLabel;

      const starts = [
        { x: -70, y: height * 0.28 },
        { x: width + 40, y: height * 0.16 },
        { x: width * 0.46, y: -50 },
        { x: width + 30, y: height * 0.72 },
        { x: -64, y: height * 0.7 },
      ];
      const holds = [
        { x: bootBox.x + 4, y: bootBox.y - 36 },
        { x: panelBox.x + 12, y: panelBox.y - 32 },
        { x: Math.min(head.x + head.w + 28, width - 150), y: head.y + 6 },
        { x: primary.x + primary.w + 28, y: primary.y - 8 },
        { x: head.x - 28, y: head.y + head.h * 0.55 },
      ];

      gsap.set(crew, { opacity: 0 });
      crew.forEach((el, index) => gsap.set(el, starts[index]));
      gsap.set(box, {
        x: panelBox.x,
        y: panelBox.y,
        width: panelBox.w,
        height: panelBox.h,
        scale: 0.02,
        transformOrigin: "0% 0%",
      });
      gsap.set(frame, {
        x: head.x - 10,
        y: head.y - 8,
        width: head.w + 20,
        height: head.h + 16,
        scaleX: 0.001,
        transformOrigin: "0% 50%",
      });
      gsap.set(draft, { x: head.x, y: head.y, width: head.w });
      const rulerWidth = Math.min(Math.max(copyBox.w, 180), 440);
      gsap.set(ruler, {
        x: gradeBox.x,
        y: rulerY,
        width: rulerWidth,
        scaleX: 0.001,
        transformOrigin: "0% 50%",
      });
      gsap.set([origin, ghost], {
        x: primary.x,
        y: primary.y,
        width: primary.w,
        height: primary.h,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: close,
      });
      timeline = tl;

      crew.forEach((el, index) => {
        tl.to(
          el,
          { x: holds[index].x, y: holds[index].y, opacity: 1, duration: 0.42, ease: "power3.out" },
          index * 0.04,
        );
      });

      tl.to(boot, { opacity: 1, duration: 0.28 }, 0.34);

      const marquee = { s: 0.02 };
      tl.to(
        marquee,
        {
          s: 1,
          duration: 0.66,
          ease: "power2.inOut",
          onUpdate: () => {
            const scale = marquee.s;
            gsap.set(box, { scale, opacity: Math.min(1, scale * 6) });
            gsap.set(figma, {
              x: panelBox.x + panelBox.w * scale - 2,
              y: panelBox.y + panelBox.h * scale - 2,
            });
            gsap.set(badge, {
              x: panelBox.x + panelBox.w * scale + 8,
              y: panelBox.y + panelBox.h * scale + 8,
              opacity: scale > 0.2 ? 1 : 0,
            });
            badge.textContent = `${Math.max(1, Math.round(panelBox.w * scale))} × ${Math.max(1, Math.round(panelBox.h * scale))}`;
          },
        },
        0.48,
      );
      tl.to(panel, { opacity: 1, duration: 0.26 }, 1.14);
      tl.to([box, badge], { opacity: 0, duration: 0.2 }, 1.16);
      tl.to(
        figma,
        { x: panelBox.x + panelBox.w + 8, y: panelBox.y + panelBox.h - 6, duration: 0.28 },
        1.22,
      );

      const frameDraw = { s: 0 };
      tl.to(
        frameDraw,
        {
          s: 1,
          duration: 0.36,
          ease: "power2.out",
          onStart: () => {
            editor.dataset.tool = "text";
          },
          onUpdate: () => {
            gsap.set(frame, { scaleX: Math.max(0.001, frameDraw.s), opacity: 1 });
            gsap.set(editor, {
              x: head.x - 8 + (head.w + 18) * frameDraw.s,
              y: head.y + head.h * 0.62,
            });
          },
        },
        1.12,
      );

      const typed = { n: 0 };
      tl.set(draft, { opacity: 1 }, 1.48);
      tl.to(
        typed,
        {
          n: name.length,
          duration: 0.78,
          ease: "none",
          onUpdate: () => {
            draftText.textContent = name.slice(0, Math.round(typed.n));
            const mark = caret.getBoundingClientRect();
            const base = hero.getBoundingClientRect();
            gsap.set(editor, { x: mark.left - base.left, y: mark.top - base.top + 2 });
          },
        },
        1.5,
      );
      tl.to(headline, { opacity: 1, duration: 0.22 }, 2.3);
      tl.to([frame, draft], { opacity: 0, duration: 0.18 }, 2.3);
      tl.call(() => {
        editor.dataset.tool = "point";
      }, [], 2.42);
      tl.to(editor, { x: head.x + head.w + 16, y: head.y - 18, duration: 0.28 }, 2.46);

      const pull = { s: 0 };
      tl.to(guide, { y: rulerY - 2, duration: 0.2 }, 2.5);
      tl.to(guide, { x: gradeBox.x, duration: 0.22 }, 2.68);
      tl.set(rulerLabel, { x: gradeBox.x, y: rulerY - 18, opacity: 1 }, 2.88);
      tl.to(
        pull,
        {
          s: 1,
          duration: 0.38,
          ease: "power2.out",
          onUpdate: () => {
            gsap.set(ruler, { scaleX: Math.max(0.001, pull.s), opacity: 1 });
            gsap.set(guide, { x: gradeBox.x + rulerWidth * pull.s, y: rulerY - 2 });
          },
        },
        2.88,
      );
      tl.fromTo(
        copy,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power4.out" },
        3.22,
      );
      tl.to([ruler, rulerLabel], { opacity: 0, duration: 0.2 }, 3.48);
      tl.to(guide, { x: gradeBox.x + rulerWidth + 18, y: rulerY - 28, duration: 0.24 }, 3.5);

      const drag = { t: 0 };
      tl.to(nextCursor, { x: primary.x + primary.w - 6, y: primary.y - 6, duration: 0.24 }, 2.95);
      tl.to(origin, { opacity: 0.4, duration: 0.1 }, 3.16);
      tl.set(alt, { x: primary.x + primary.w + 10, y: primary.y - 24 }, 3.16);
      tl.to([ghost, alt], { opacity: 1, duration: 0.1 }, 3.16);
      tl.to(
        drag,
        {
          t: 1,
          duration: 0.4,
          ease: "power2.inOut",
          onUpdate: () => {
            const x = primary.x + (secondary.x - primary.x) * drag.t;
            const y = primary.y + (secondary.y - primary.y) * drag.t;
            gsap.set(ghost, { x, y });
            gsap.set(nextCursor, { x: x + primary.w - 6, y: y - 6 });
            gsap.set(alt, { x: x + primary.w + 10, y: y - 24 });
          },
        },
        3.24,
      );
      tl.to(actions, { opacity: 1, duration: 0.22 }, 3.64);
      tl.to([origin, ghost, alt], { opacity: 0, duration: 0.16 }, 3.66);

      const nestX = head.x + Math.min(head.w, 240) * 0.28;
      const nestY = head.y + head.h * 0.35;
      crew.forEach((el, index) => {
        const angle = -Math.PI / 2 + (index - 2) * 0.62;
        tl.to(
          el,
          {
            x: nestX + Math.cos(angle) * 32,
            y: nestY + Math.sin(angle) * 18,
            duration: 0.28,
            ease: "power1.inOut",
          },
          3.78,
        );
        tl.to(
          el,
          {
            x: nestX + Math.cos(angle) * 150,
            y: nestY + Math.sin(angle) * 78,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          4.04,
        );
      });
      tl.to(lanes, { opacity: 1, duration: 0.28 }, 3.86);
      tl.to(glow, { opacity: 1, duration: 0.36 }, 3.82);

      window.dispatchEvent(new Event("swarm:start"));
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const cap = new Promise((resolve) => window.setTimeout(resolve, 350));
    void Promise.race([fonts, cap]).then(play);

    return () => {
      cancelled = true;
      window.removeEventListener("swarm:skip", onSkip);
      timeline?.kill();
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <div
        data-box
        className="swarm-prop border border-dashed border-accent/90 bg-accent/5"
      >
        <i className="absolute top-0 left-0 size-2 border-t-2 border-l-2 border-accent" />
        <i className="absolute top-0 right-0 size-2 border-t-2 border-r-2 border-accent" />
        <i className="absolute bottom-0 left-0 size-2 border-b-2 border-l-2 border-accent" />
        <i className="absolute right-0 bottom-0 size-2 border-r-2 border-b-2 border-accent" />
        <i className="absolute top-1/2 left-0 h-px w-full bg-accent/40" />
        <i className="absolute top-0 left-1/2 h-full w-px bg-accent/40" />
      </div>
      <span data-badge className="swarm-prop swarm-badge" />
      <div data-frame className="swarm-prop border border-dashed border-accent/80" />
      <div
        data-draft
        className="swarm-prop max-w-4xl text-[clamp(2.45rem,8vw,4.4rem)] leading-[1.02] font-medium tracking-tight text-fg"
      >
        <span data-draft-text />
        <span className="caret" aria-hidden="true" />
      </div>
      <div data-ruler className="swarm-prop h-px bg-[#7ee0c6]" />
      <span data-ruler-label className="swarm-prop font-mono text-[10px] tracking-wide text-[#7ee0c6]">
        guide
      </span>
      <div
        data-ghost="origin"
        className="swarm-prop inline-flex items-center justify-center rounded-md bg-accent text-sm font-medium whitespace-nowrap text-ink"
      />
      <div
        data-ghost="drag"
        className="swarm-prop inline-flex items-center justify-center rounded-md bg-accent text-sm font-medium whitespace-nowrap text-ink"
      />
      <span data-alt className="swarm-prop swarm-alt">
        alt
      </span>
      {CREW.map((member) => (
        <CursorGlyph key={member.name} name={member.name} color={member.color} text={member.text} />
      ))}
    </div>
  );
}

export function mountHeroSwarm(stage: HTMLElement) {
  const root = createRoot(stage);
  root.render(<SwarmPlay />);
  return () => root.unmount();
}
