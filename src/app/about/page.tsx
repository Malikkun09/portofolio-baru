import type { Metadata } from "next";
import Link from "next/link";
import { CommandHeading } from "@/components/command-heading";
import { Journey } from "@/components/journey";
import { profile } from "@/data/profile";
import { ghostButton } from "@/lib/styles";

export const metadata: Metadata = {
  title: "About",
  description: profile.seo.about,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <CommandHeading as="h1" command="cat about.md" title="About" />
        <div
          data-stagger
          className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed sm:text-lg"
        >
          {profile.copy.aboutParagraphs.slice(0, 2).map((paragraph) => (
            <p key={paragraph} data-stagger-item>
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className="mt-12 font-mono text-sm text-accent">lanes</h2>
        <p className="mt-3 max-w-2xl text-muted">{profile.copy.lanesIntro}</p>
        <dl
          data-stagger
          className="mt-4 max-w-3xl divide-y divide-line border-y border-line"
        >
          {profile.lanes.map((lane) => (
            <div
              key={lane.id}
              data-stagger-item
              className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-sm text-fg">{lane.label}</dt>
              <dd className="text-sm leading-relaxed sm:text-base">{lane.detail}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 font-mono text-sm text-accent">benches</h2>
        <p className="mt-3 max-w-2xl text-muted">{profile.copy.benchIntro}</p>
        <div className="mt-5 max-w-3xl rounded-lg border border-line bg-elev">
          <div className="flex items-center justify-between border-b border-line px-4 py-2 font-mono text-xs text-muted">
            <span>timeline</span>
            <span>00 — 02</span>
          </div>
          <ol data-stagger className="grid gap-6 px-4 py-5 sm:grid-cols-3">
            {profile.benches.map((bench, index) => (
              <li key={bench.label} data-stagger-item className="relative">
                <span className="mb-3 block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <p className="font-mono text-xs text-muted">0{index}</p>
                <p className="mt-1 font-medium">{bench.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{bench.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 max-w-2xl text-base leading-relaxed sm:text-lg">
          {profile.copy.aboutParagraphs[2]}
        </p>
        <Link href="/#contact" className={`${ghostButton} mt-6`}>
          Contact
        </Link>
      </div>
      <Journey id="path" />
    </>
  );
}
