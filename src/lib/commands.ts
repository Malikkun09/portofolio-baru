import { getProject, profile, type Project } from "@/data/profile";

export type CommandResult = {
  lines: string[];
  clear?: boolean;
  /** In-site path, hash path, or absolute http(s) URL. */
  href?: string;
};

const HELP = [
  "help — list commands",
  "about — jump to about",
  "projects — jump to selected work",
  "work — open the full project index",
  "history — jump to the journey",
  "contact — jump to contact",
  "ls — list project slugs",
  "open <slug> — open a project",
  "whoami — print identity",
  "links — print contact links",
  "home — go home",
  "clear — clear this panel",
  "Ctrl+K or Cmd+K — open or close",
];

const ALIASES: Record<string, string> = {
  "cat about.md": "about",
  "cat about": "about",
  "ls projects/": "ls",
  "ls projects": "ls",
  "./contact.sh": "contact",
  "contact.sh": "contact",
  "cd ~": "home",
  "cd /": "home",
  "cd projects": "work",
  "cd projects/": "work",
  cls: "clear",
  "?": "help",
  "dev.to": "devto",
};

export function runCommand(raw: string): CommandResult {
  const trimmed = raw.trim().slice(0, 120);
  const input = trimmed.toLowerCase().replace(/\s+/g, " ");
  if (!input) return { lines: [] };

  const catProject = input.match(/^cat projects\/([a-z0-9-]+)(?:\.md)?$/);
  if (catProject) return openProject(catProject[1]);

  const cdProject = input.match(/^cd projects\/([a-z0-9-]+)\/?$/);
  if (cdProject) return openProject(cdProject[1]);

  const normalized = ALIASES[input] ?? input;
  const [command, ...rest] = normalized.split(" ");
  const arg = rest.join(" ");

  switch (command) {
    case "help":
      return { lines: HELP };
    case "clear":
      return { lines: [], clear: true };
    case "whoami":
      return {
        lines: [
          profile.name,
          profile.signature,
          `${profile.grade} · ${profile.program} · ${profile.programLong}`,
          profile.school,
          profile.location,
          profile.availability,
        ],
      };
    case "links":
      return {
        lines: profile.socials.map((social) =>
          social.todo || !social.href
            ? `${social.label} — TODO, add the URL in src/data/profile.ts`
            : `${social.label} — ${social.handle}`,
        ),
      };
    case "ls":
      return {
        lines: [
          ...profile.projects.map(
            (project) => `${project.slug} — ${project.title}`,
          ),
          "open <slug> reads one file. work opens the index.",
        ],
      };
    case "about":
      return { lines: ["opening about"], href: "/#about" };
    case "projects":
      return { lines: ["opening selected projects"], href: "/#projects" };
    case "work":
      return { lines: ["opening projects/"], href: "/projects" };
    case "history":
      return { lines: ["opening history"], href: "/#history" };
    case "contact":
      return { lines: ["opening contact"], href: "/#contact" };
    case "home":
      return { lines: ["cd ~"], href: "/" };
    case "open":
      return openProject(arg);
    case "github":
    case "instagram":
    case "devto":
    case "linkedin":
    case "whatsapp":
      return openSocial(command);
    default:
      return {
        lines: [`command not found: ${trimmed}`, "Type help for the list."],
      };
  }
}

function openProject(arg: string): CommandResult {
  if (!arg) {
    return {
      lines: [
        "usage: open <slug>",
        ...profile.projects.map((project) => project.slug),
      ],
    };
  }

  const query = arg.toLowerCase();
  const matches = profile.projects.filter((project) => matchesProject(project, query));

  if (matches.length === 1) {
    const project = matches[0];
    return {
      lines: [`opening ${project.slug}`],
      href: `/projects/${project.slug}`,
    };
  }

  if (matches.length === 0) {
    const direct = getProject(query);
    if (direct) {
      return { lines: [`opening ${direct.slug}`], href: `/projects/${direct.slug}` };
    }
    return {
      lines: [`no project matches "${arg}"`, "Type ls to see slugs."],
    };
  }

  return {
    lines: ["That matches more than one project.", ...matches.map((project) => project.slug)],
  };
}

function matchesProject(project: Project, query: string) {
  if (project.slug === query || project.slug.startsWith(query)) return true;
  if (project.title.toLowerCase() === query) return true;
  return project.aliases.some(
    (alias) => alias === query || alias.startsWith(query),
  );
}

function openSocial(id: string): CommandResult {
  const social = profile.socials.find((item) => item.id === id);
  if (!social) return { lines: ["No such link."] };
  if (social.todo || !social.href) {
    return {
      lines: [
        `${social.label} is not linked yet.`,
        "TODO: set the URL in src/data/profile.ts.",
      ],
    };
  }
  return {
    lines: [`opening ${social.label}`, social.href],
    href: social.href,
  };
}
