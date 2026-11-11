import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCover } from "@/components/project-cover";
import { getProject, profile } from "@/data/profile";
import { ghostButton } from "@/lib/styles";

export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = profile.projects.findIndex((item) => item.slug === project.slug);
  const previous = profile.projects[index - 1];
  const next = profile.projects[index + 1];

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Link href="/projects" className="font-mono text-sm text-accent">
        cd ..
      </Link>
      <p className="mt-8 font-mono text-sm">
        <span className="text-muted">{profile.prompt}:~$ </span>
        <span className="text-accent">cat projects/{project.slug}.md</span>
      </p>
      <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] font-medium tracking-tight">
        {project.title}
      </h1>
      <p className="mt-4 font-mono text-sm text-muted">
        {project.badge ? <span className="text-accent">{project.badge}</span> : null}
        {project.badge ? <span> · </span> : null}
        <span>{project.lane}</span>
        {project.year ? <span> · {project.year}</span> : null}
      </p>
      <p className="mt-6 text-lg leading-relaxed">{project.summary}</p>

      <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-lg border border-line bg-[#0c100e]">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <ProjectCover kind={project.cover} />
        )}
        {project.image ? null : (
          <span className="absolute right-3 bottom-3 rounded border border-line bg-bg/85 px-2 py-1 font-mono text-xs text-muted">
            image TODO
          </span>
        )}
      </div>

      <div className="mt-8 space-y-4 text-base leading-relaxed">
        {project.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h2 className="mt-10 font-mono text-sm text-accent">notes</h2>
      <ul className="mt-4 space-y-2">
        {project.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed sm:text-base">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-mono text-sm text-accent">stack</h2>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
        {project.stack.map((item) => (
          <li key={item} className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-mono text-sm text-accent">links</h2>
      <ul className="mt-4 flex flex-wrap gap-3">
        {project.links.map((link) =>
          link.href ? (
            <li key={link.label}>
              <a href={link.href} className={ghostButton} target="_blank" rel="noreferrer noopener">
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <span className="inline-flex min-h-11 items-center rounded-md border border-dashed border-line px-4 font-mono text-sm text-muted">
                {link.label} · TODO
              </span>
            </li>
          ),
        )}
      </ul>

      <nav aria-label="More projects" className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-6">
        {previous ? (
          <Link href={`/projects/${previous.slug}`} className="font-mono text-sm text-accent">
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="font-mono text-sm text-accent">
            {next.title} →
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
