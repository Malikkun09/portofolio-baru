"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

export function MissingPath() {
  const commandRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = commandRef.current;
    if (!node) return;
    node.textContent = `cd ${window.location.pathname}`;
  }, []);

  return (
    <p className="font-mono text-sm">
      <span className="text-muted">{profile.prompt}:~$ </span>
      <span ref={commandRef} className="text-accent">
        cd .
      </span>
    </p>
  );
}
