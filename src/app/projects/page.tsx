import type { Metadata } from "next";
import { CommandHeading } from "@/components/command-heading";
import { ProjectCard } from "@/components/project-card";
import { profile, projectsByKind } from "@/data/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: profile.seo.projects,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const work = projectsByKind("work");
  const experiments = projectsByKind("experiment");

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <CommandHeading as="h1" command="ls -la projects/" title="Projects" />
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {profile.copy.projectsIntro}
      </p>

      <h2 className="mt-12 font-mono text-sm text-accent">work/</h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {work.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <h2 id="experiments" className="mt-14 font-mono text-sm text-accent">
        experiments/
      </h2>
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {experiments.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
