"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { profile } from "@/data/profile";
import { runCommand } from "@/lib/commands";

type Line = { id: number; kind: "in" | "out"; text: string };

export function Terminal({
  open,
  onClose,
  inputRef,
}: {
  open: boolean;
  onClose: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  const router = useRouter();
  const titleId = useId();
  const logRef = useRef<HTMLDivElement>(null);
  const seq = useRef(1);
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: "out", text: profile.copy.terminalHello },
  ]);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const node = logRef.current;
    if (!node || !open) return;
    node.scrollTop = node.scrollHeight;
  }, [lines, open]);

  function nextId() {
    seq.current += 1;
    return seq.current;
  }

  function go(href: string) {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    const url = new URL(href, window.location.origin);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";

    if (url.pathname === window.location.pathname) {
      if (url.hash) {
        document.getElementById(url.hash.slice(1))?.scrollIntoView({
          behavior,
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior });
      }
    }

    router.push(href as Parameters<typeof router.push>[0]);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input.trim();
    setInput("");
    setCursor(-1);
    if (!value) return;

    const result = runCommand(value);
    setPast((items) => [...items, value].slice(-30));

    if (result.clear) {
      setLines([{ id: nextId(), kind: "out", text: "cleared. type help to start again." }]);
      return;
    }

    const appended: Line[] = [
      { id: nextId(), kind: "in", text: value },
      ...result.lines.map((text) => ({ id: nextId(), kind: "out" as const, text })),
    ];
    setLines((current) => [...current, ...appended].slice(-60));
    if (result.href) go(result.href);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (past.length === 0) return;
    event.preventDefault();
    const next =
      event.key === "ArrowUp"
        ? Math.min(cursor + 1, past.length - 1)
        : Math.max(cursor - 1, -1);
    setCursor(next);
    setInput(next === -1 ? "" : past[past.length - 1 - next]);
  }

  return (
    <div
      id="site-terminal"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className={`${open ? "flex" : "hidden"} fixed inset-x-3 bottom-3 z-40 h-[min(33rem,72dvh)] flex-col overflow-hidden rounded-lg border border-line bg-elev shadow-[0_16px_48px_rgba(0,0,0,0.45)] sm:inset-x-auto sm:right-4 sm:w-[28rem]`}
    >
      <div className="flex items-center justify-between border-b border-line px-3">
        <p id={titleId} className="font-mono text-xs text-muted">
          <span className="text-accent">{profile.prompt}</span>
          <span> — terminal</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 px-2 font-mono text-sm text-muted hover:text-fg"
        >
          close
        </button>
      </div>
      <div
        ref={logRef}
        role="log"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-3 font-mono text-sm leading-relaxed"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={
              line.text === ""
                ? "h-2"
                : line.kind === "in"
                  ? "whitespace-pre-wrap text-accent"
                  : "whitespace-pre-wrap text-fg"
            }
          >
            {line.kind === "in" ? `> ${line.text}` : line.text}
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-3">
        <label htmlFor="site-command" className="sr-only">
          Terminal command
        </label>
        <span aria-hidden="true" className="font-mono text-accent">
          &gt;
        </span>
        <input
          ref={inputRef}
          id="site-command"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="help"
          className="min-h-11 min-w-0 flex-1 bg-transparent font-mono text-base text-fg outline-none placeholder:text-muted"
        />
      </form>
    </div>
  );
}
