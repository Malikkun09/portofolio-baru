"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type RefObject } from "react";
import { profile } from "@/data/profile";

const links = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/#contact", label: "contact" },
] as const;

export function SiteHeader({
  open,
  onToggle,
  toggleRef,
}: {
  open: boolean;
  onToggle: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const pathname = usePathname();
  const pathRef = useRef<HTMLSpanElement>(null);
  const route = pathname === "/_not-found" ? "/" : pathname;

  useEffect(() => {
    const node = pathRef.current;
    if (!node) return;
    const current = pathname === "/_not-found" ? window.location.pathname : pathname;
    node.textContent = shellPath(current);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto] items-center gap-x-3 px-4 py-3 sm:grid-cols-[auto_1fr_auto] sm:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="col-start-1 row-start-1 font-mono text-sm text-accent"
        >
          {profile.prompt}
          <span
            ref={pathRef}
            className="ml-2 hidden text-muted md:inline"
            suppressHydrationWarning
          >
            {shellPath(route)}
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="col-span-2 row-start-2 flex gap-1 pt-1 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-end sm:pt-0 sm:pr-2"
        >
          {links.map((link) => {
            const current =
              link.href === "/about"
                ? route === "/about"
                : link.href === "/projects"
                  ? route.startsWith("/projects")
                  : false;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-11 items-center px-2.5 font-mono text-sm ${
                  current ? "text-accent" : "text-fg hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="magnetic col-start-2 row-start-1 inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 font-mono text-sm text-fg hover:border-accent motion-safe:transition-colors sm:col-start-3"
          aria-expanded={open}
          aria-controls="site-terminal"
          onClick={onToggle}
        >
          <span aria-hidden="true">&gt;_</span>
          <span className="sr-only sm:not-sr-only">{open ? "close" : "terminal"}</span>
        </button>
      </div>
    </header>
  );
}

function shellPath(pathname: string) {
  if (pathname === "/") return "~";
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "projects" && parts[1]) return `~/projects/${parts[1]}`;
  return `~/${parts[0] ?? ""}`;
}
