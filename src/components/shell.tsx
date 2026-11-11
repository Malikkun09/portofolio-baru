"use client";

import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Terminal } from "@/components/terminal";

export function Shell() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      <SiteHeader
        open={open}
        onToggle={() => setOpen((value) => !value)}
        toggleRef={toggleRef}
      />
      <Terminal open={open} onClose={() => setOpen(false)} inputRef={inputRef} />
    </>
  );
}
