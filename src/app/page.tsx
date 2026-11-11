import type { Metadata } from "next";
import Link from "next/link";
import { CommandHeading } from "@/components/command-heading";
import { Journey } from "@/components/journey";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects, profile } from "@/data/profile";
import { ghostButton, primaryButton } from "@/lib/styles";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = featuredProjects();
  const whatsapp = profile.socials.find((social) => social.id === "whatsapp");
  const others = profile.socials.filter((social) => social.id !== "whatsapp");

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(61,220,151,0.09),transparent_62%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
          <p className="sr-only">{profile.boot.join(". ")}</p>
          <div aria-hidden="true">
            {profile.boot.map((line, index) => (
              <p
                key={line}
                className={`boot-line font-mono text-sm ${
                  index === profile.boot.length - 1 ? "text-accent" : "text-muted"
                }`}
                style={{ ["--chars" as string]: line.length, ["--i" as string]: index }}
              >
                {line}
              </p>
            ))}
          </div>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.45rem,8vw,4.4rem)] leading-[1.02] font-medium tracking-tight">
            {profile.name}
            <span className="caret" aria-hidden="true" />
          </h1>
          <p className="mt-5 text-lg text-muted">
            {profile.grade} · {profile.program} · {profile.programLong}
          </p>
          <p className="mt-1 text-muted">
            {profile.school} · {profile.location}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{profile.copy.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className={primaryButton}>
              View projects
            </a>
            <a href="#contact" className={ghostButton}>
              Contact
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["location", profile.location],
              ["school", profile.school],
              ["program", `${profile.grade} · ${profile.program}`],
              ["status", profile.statusLabel],
            ].map(([label, value]) => (
              <div key={label} className="bg-elev px-4 py-3">
                <dt className="font-mono text-xs text-accent">{label}</dt>
                <dd className="mt-1 text-sm">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 font-mono text-sm text-muted">
            <span className="text-fg">lanes</span>
            <span> · {profile.lanes.map((lane) => lane.label).join(" · ")}</span>
          </p>
        </div>
      </section>

      <section id="about" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <CommandHeading command="cat about.md" title="About" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {profile.copy.aboutSnippet}
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex min-h-11 items-center font-mono text-sm text-accent"
          >
            Read the full file
          </Link>
        </div>
      </section>

      <Journey />

      <section id="projects" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <CommandHeading command="ls projects/" title="Selected work" />
            <Link href="/projects" className="font-mono text-sm text-accent">
              Full index
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-muted">{profile.copy.selectedNote}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {featured.map((project, index) => (
              <li key={project.slug} className={index === 0 ? "md:col-span-2" : undefined}>
                <ProjectCard project={project} feature={index === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className="border-t border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <CommandHeading command="./contact.sh" title="Contact" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {profile.copy.contactLead}
          </p>
          {whatsapp?.href ? (
            <a
              href={whatsapp.href}
              className={`${primaryButton} mt-8`}
              target="_blank"
              rel="noreferrer noopener"
            >
              WhatsApp · {profile.phone.display}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          <ul className="mt-8 max-w-xl divide-y divide-line border-y border-line">
            {others.map((social) => (
              <li key={social.id} className="flex items-baseline justify-between gap-4 py-3">
                <span className="font-mono text-sm text-muted">{social.label}</span>
                {social.href && !social.todo ? (
                  <a
                    href={social.href}
                    className="text-right text-sm text-accent"
                    target="_blank"
                    rel="me noreferrer noopener"
                  >
                    {social.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="font-mono text-sm text-muted">TODO</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
