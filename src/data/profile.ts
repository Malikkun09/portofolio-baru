/**
 * Portfolio content for Muhammad Malik Fajar.
 *
 * Edit this file to update copy, projects, and links.
 * Search for `TODO` — those are still placeholders.
 * A link with `href: null` renders as a TODO marker, not a broken URL.
 * Set a project's `image` to a file in /public, for example "/projects/pkl.png",
 * to replace the drawn cover. Leave it null until a real screenshot exists.
 */

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string | null;
  /** True while the URL still needs to be filled in. */
  todo?: boolean;
};

export type ProjectLink = {
  label: string;
  /** TODO: replace null with a real URL. */
  href: string | null;
};

export type CoverKind = "ledger" | "match" | "chat" | "detect" | "oled";

export type Project = {
  slug: string;
  title: string;
  year: string | null;
  badge?: string;
  featured: boolean;
  kind: "work" | "experiment";
  lane: string;
  cover: CoverKind;
  /** TODO: public image path, or null to keep the drawn placeholder. */
  image: string | null;
  summary: string;
  description: string[];
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
  aliases: string[];
};

export type JourneyItem = {
  id: string;
  year: string;
  title: string;
  place: string;
  summary: string;
};

const phoneDisplay = "+62 889-1983-723";
const phoneHref = "https://wa.me/628891983723";

export const profile = {
  name: "Muhammad Malik Fajar",
  signature: "Muhammad Malik Fajar El Syarif",
  shortName: "Malik",
  location: "Cimahi, Indonesia",
  school: "SMK Informatika Fithrah Insani",
  grade: "Grade 11",
  program: "PPLG",
  programLong: "Software & Game Development",
  statusLabel: "Open for internships",
  availability:
    "Open for internships, collaboration, and a limited number of projects.",
  siteUrl: "https://malikfajar.me",
  updated: "2026-11-11",
  phone: {
    display: phoneDisplay,
    href: phoneHref,
  },
  prompt: "malik@cimahi",
  boot: [
    "malik@cimahi:~$ boot",
    "ok  session ready",
    "malik@cimahi:~$ whoami",
  ],
  seo: {
    title: "Muhammad Malik Fajar — PPLG student, Cimahi",
    description:
      "Muhammad Malik Fajar is a Grade 11 PPLG student in Cimahi. He builds software, interfaces, and small AI experiments, and he is open for internships.",
    about:
      "About Muhammad Malik Fajar, a Grade 11 PPLG student at SMK Informatika Fithrah Insani in Cimahi, working across software, UI/UX, AI, security, and game development.",
    projects:
      "Projects by Muhammad Malik Fajar: PKL Inventaris, KerjaIn / SkillMatch, a multimodal chatbot, and two visual and detection experiments.",
  },
  copy: {
    heroLead:
      "I learn by building websites, interfaces, systems, and visual experiments. I am still in school, and the work already has to hold up outside a class assignment.",
    aboutSnippet:
      "Most of my hours sit in a terminal, a Figma file, or an animation timeline. I study at SMK Informatika Fithrah Insani in Cimahi, Grade 11, PPLG. I want interfaces that feel designed: type, spacing, and states chosen for the job.",
    aboutLead: [
      "I am Muhammad Malik Fajar, a Grade 11 student in the PPLG program (Software and Game Development) at SMK Informatika Fithrah Insani in Cimahi. On formal work I sign Muhammad Malik Fajar El Syarif.",
      "The program started in 2024 with HTML, CSS, JavaScript, and interface design. I still use that base. The difference now is that a project may have a deploy target, a test suite, or someone waiting on the stock count.",
    ],
    aboutClose:
      "I am looking for an internship on a real product, with people who will review the code and the design. Collaboration, and a small number of side projects, are open when the scope is written down.",
    lanesIntro:
      "Five lanes show up in that work. They share a page because the same project often needs more than one of them.",
    benchIntro:
      "The tools stay open next to each other. None of them is a costume.",
    selectedNote:
      "Three projects I would walk through in an interview. The experiments are on the full index.",
    projectsIntro:
      "Internship work first, then the capstone and the current build. Experiments are grouped under those.",
    contactLead:
      "If you are hiring an intern, or you have a collaboration with a clear scope, start on WhatsApp.",
    notFoundTitle: "No such file or directory",
    notFoundLead:
      "That path is not on this site. Head home, open the project index, or read the about file.",
    terminalHello: "Type help, or try about, projects, contact.",
  },
  lanes: [
    {
      id: "software",
      label: "Software",
      detail:
        "Sites and small systems, from the screen through to the data a form writes.",
    },
    {
      id: "ui",
      label: "UI/UX",
      detail:
        "Type, spacing, and the states people actually hit: empty, loading, wrong, done.",
    },
    {
      id: "ai",
      label: "AI",
      detail:
        "Coursework, plus experiments: a chatbot that can read an image, and detection with YOLO-World.",
    },
    {
      id: "security",
      label: "Security",
      detail:
        "Practiced on the inventory system: injection, sessions, and stock writes that stay atomic.",
    },
    {
      id: "games",
      label: "Game dev",
      detail:
        "PPLG is a software and game program. This is where I study timing, feedback, and whether an interaction feels fair.",
    },
  ],
  benches: [
    {
      label: "terminal",
      detail: "Shell, git, and whatever is running locally.",
    },
    {
      label: "figma",
      detail: "Flows, type, and spacing before they become code.",
    },
    {
      label: "timeline",
      detail: "Motion studies, and the feel of an interaction over a few frames.",
    },
  ],
  socials: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      handle: phoneDisplay,
      href: phoneHref,
    },
    {
      id: "github",
      label: "GitHub",
      handle: "Malikkun09",
      href: "https://github.com/Malikkun09",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "malikajasih",
      href: "https://www.instagram.com/malikajasih",
    },
    {
      id: "devto",
      label: "Dev.to",
      handle: "malikkun09",
      href: "https://dev.to/malikkun09",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "TODO",
      href: null,
      todo: true,
    },
  ] satisfies SocialLink[],
  journey: [
    {
      id: "pkl",
      year: "2026",
      title: "PKL Inventaris",
      place: "Internship",
      summary:
        "Built an inventory system in Laravel during PKL. Staff get role-based access, stock moves sit in a ledger, and sensitive actions land in an activity log. I checked injection, sessions, and transaction integrity, then left 46 regression tests passing. It is deployed on shared hosting, and the source is on GitHub.",
    },
    {
      id: "camp",
      year: "2026",
      title: "Coding Camp capstone",
      place: "DBS Foundation × Dicoding",
      summary:
        "Full-stack web track. The capstone, KerjaIn / SkillMatch, helps SMK students find internships, jobs, and career information. The camp theme was Future-Ready Work & Economy. React and backend JavaScript became everyday tools on this project.",
    },
    {
      id: "ml",
      year: "2026",
      title: "Machine learning exam",
      place: "Dicoding",
      summary:
        "Passed the final exam for Belajar Machine Learning untuk Pemula. It was my first structured pass through machine learning, and it is what led into the detection and chatbot experiments.",
    },
    {
      id: "start",
      year: "2024",
      title: "Started PPLG",
      place: "SMK Informatika Fithrah Insani",
      summary:
        "Entered the Software and Game Development program. The first year was HTML, CSS, JavaScript, and interface design — the base the later work sits on.",
    },
  ] satisfies JourneyItem[],
  projects: [
    {
      slug: "pkl-inventaris",
      title: "PKL Inventaris",
      year: "2026",
      badge: "Shipped",
      featured: true,
      kind: "work",
      lane: "Software",
      cover: "ledger",
      image: null, // TODO: screenshot
      summary:
        "Inventory system from my internship: roles, a stock ledger, an activity log, and a security pass with 46 regression tests passing.",
      description: [
        "PKL Inventaris is the system I built for day-to-day stock during my internship. People sign in with a role, every stock move is written to a ledger, and sensitive actions are kept in an activity log so a count can be explained later.",
        "Before calling it done I reviewed injection, session handling, and transaction integrity — a stock write should finish, or it should not happen. The behavior is locked in with regression tests: 46 passing. It runs on shared hosting, and the source is on GitHub.",
      ],
      highlights: [
        "Role-based access for staff",
        "Stock ledger and activity log",
        "Review of injection, sessions, and transaction integrity",
        "46 regression tests passing",
        "Deployed on shared hosting",
      ],
      stack: ["Laravel", "PHP"],
      links: [
        { label: "Live", href: null }, // TODO
        { label: "Source", href: null }, // TODO: GitHub repository URL
      ],
      aliases: ["pkl", "inventaris", "inventory"],
    },
    {
      slug: "kerjain",
      title: "KerjaIn / SkillMatch",
      year: "2026",
      badge: "Capstone",
      featured: true,
      kind: "work",
      lane: "Software",
      cover: "match",
      image: null, // TODO: screenshot
      summary:
        "Capstone platform that helps SMK students find internships, jobs, and career information in one place.",
      description: [
        "KerjaIn, also called SkillMatch, is a place for vocational students to look up internships, jobs, and career information without bouncing across a dozen unrelated pages.",
        "It was the capstone for the full-stack web track at Coding Camp by DBS Foundation and Dicoding. The theme was Future-Ready Work & Economy. Building it is how React and backend JavaScript became normal tools for me, not a tutorial I had only watched.",
      ],
      highlights: [
        "Internships, jobs, and career information for SMK students",
        "Capstone for Coding Camp by DBS Foundation × Dicoding",
        "Camp theme: Future-Ready Work & Economy",
        "React on the interface, JavaScript on the server",
      ],
      stack: ["React", "JavaScript"],
      links: [
        { label: "Live", href: null }, // TODO
        { label: "Source", href: null }, // TODO
      ],
      aliases: ["skillmatch", "kerja-in", "kerja"],
    },
    {
      slug: "multimodal-chatbot",
      title: "Multimodal Chatbot",
      year: "2026",
      badge: "New",
      featured: true,
      kind: "work",
      lane: "AI",
      cover: "chat",
      image: null, // TODO: screenshot
      summary:
        "An AI chatbot that can take an image and answer from what is in the frame, not only from typed text.",
      description: [
        "Most chat boxes only hear text. This one also looks. You can hand it a screenshot, a photo of a whiteboard, or a UI on a screen, and the reply is grounded in that picture.",
        "I am building the conversation so the image stays visible in the thread, and so the answer can say when the picture is ambiguous. It is marked new because the interface and the model wiring are still moving. This is the current build.",
      ],
      highlights: [
        "An image can sit in the same turn as the message",
        "The picture stays visible so the context does not disappear",
        "Aimed at screenshots and sketches, the inputs I already work with",
        "Still in progress",
      ],
      stack: ["AI", "Image input", "Chat UI"],
      links: [
        { label: "Live", href: null }, // TODO
        { label: "Source", href: null }, // TODO
      ],
      aliases: ["chatbot", "multimodal", "chat"],
    },
    {
      slug: "yolo-world",
      title: "YOLO-World",
      year: null,
      badge: "Experiment",
      featured: false,
      kind: "experiment",
      lane: "AI",
      cover: "detect",
      image: null, // TODO: screenshot
      summary:
        "An object-detection bench using YOLO-World: name a thing, and see whether the model can find it.",
      description: [
        "YOLO-World detects objects without a frozen class list. I use it to try prompts such as a person, a keyboard, or a button, then look at where the boxes land.",
        "This is a lab, not a product. It sits next to the Dicoding machine-learning course: a way to see how a detection model behaves on a real picture, including when it is confidently wrong.",
      ],
      highlights: [
        "Open-vocabulary prompts instead of a fixed label set",
        "Boxes drawn back onto the source image",
        "A bench for reading what the model is sure about",
      ],
      stack: ["YOLO-World", "Object detection"],
      links: [
        { label: "Notes", href: null }, // TODO
        { label: "Source", href: null }, // TODO
      ],
      aliases: ["yolo", "detection"],
    },
    {
      slug: "oled-portfolio",
      title: "OLED Portfolio",
      year: null,
      badge: "Archive",
      featured: false,
      kind: "experiment",
      lane: "UI/UX",
      cover: "oled",
      image: null, // TODO: screenshot
      summary:
        "An earlier portfolio experiment, laid out like a small high-contrast display.",
      description: [
        "Before this site I tried a portfolio that behaved more like a panel: tight type, a short color list, and frames closer to a device screen than a marketing page.",
        "It was a visual study in type, spacing, and short motion. This site is the public one now. OLED Portfolio stays in the archive as the experiment that came first.",
      ],
      highlights: [
        "High-contrast layout, closer to a display than a landing page",
        "A study in type, spacing, and short motion",
        "Kept as an archive",
      ],
      stack: ["UI", "Motion"],
      links: [
        { label: "Archive", href: null }, // TODO
        { label: "Source", href: null }, // TODO
      ],
      aliases: ["oled", "portfolio"],
    },
  ] satisfies Project[],
};

export function getProject(slug: string) {
  return profile.projects.find((project) => project.slug === slug);
}

export function featuredProjects() {
  return profile.projects.filter((project) => project.featured);
}

export function projectsByKind(kind: Project["kind"]) {
  return profile.projects.filter((project) => project.kind === kind);
}
