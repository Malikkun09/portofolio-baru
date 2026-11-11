import type { Metadata } from "next";
import Link from "next/link";
import { MissingPath } from "@/components/missing-path";
import { profile } from "@/data/profile";
import { ghostButton, primaryButton } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
      <MissingPath />
      <h1 className="mt-6 text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-medium tracking-tight">
        {profile.copy.notFoundTitle}
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        {profile.copy.notFoundLead}
      </p>
      <p className="mt-4 font-mono text-sm text-accent">exit 404</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={primaryButton}>
          Home
        </Link>
        <Link href="/projects" className={ghostButton}>
          Projects
        </Link>
        <Link href="/about" className={ghostButton}>
          About
        </Link>
      </div>
    </div>
  );
}
