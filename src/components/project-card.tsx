import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/profile";
import { ProjectCover } from "@/components/project-cover";

export function ProjectCard({
  project,
  feature = false,
}: {
  project: Project;
  feature?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-elev hover:border-accent motion-safe:transition-colors ${
        feature ? "md:grid md:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      <div
        aria-hidden="true"
        className={`relative bg-[#0c100e] ${
          feature
            ? "aspect-[16/9] border-b border-line md:aspect-auto md:min-h-64 md:border-r md:border-b-0"
            : "aspect-[16/9] border-b border-line"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes={
              feature
                ? "(min-width: 768px) 36rem, 100vw"
                : "(min-width: 768px) 24rem, 100vw"
            }
            className="object-cover"
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
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
          {project.badge ? <span className="text-accent">{project.badge}</span> : null}
          <span className="text-muted">{project.lane}</span>
          {project.year ? (
            <span className="ml-auto text-muted">{project.year}</span>
          ) : null}
        </div>
        <h3 className="mt-3 text-xl font-medium tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
          {project.summary}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded border border-line px-2 py-1 font-mono text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
