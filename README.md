# Muhammad Malik Fajar — portfolio

A personal site for Malik, a Grade 11 PPLG student in Cimahi. Dark, terminal-leaning, and light on purpose: no WebGL, no video backgrounds. Pages are prerendered and ready for Vercel.

## Edit the content

Profile copy, projects, and social links live in [`src/data/profile.ts`](src/data/profile.ts). Header labels and a few button labels live in the components that render them.

1. Open that file.
2. Search for `TODO`. Those are missing URLs or screenshots.
3. A link with `href: null` shows a TODO marker on the site. Put a real URL in `href` when you have one.
4. To replace a drawn project cover, add an image under `public/` (for example `public/projects/pkl.png`) and set `image: "/projects/pkl.png"`.

The phone number should stay written as `+62 889-1983-723`.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## The on-site terminal

A **terminal** button sits in the header (Ctrl+K or Cmd+K). Commands:

| Command | What it does |
| --- | --- |
| `help` | List commands |
| `about` | Jump to the about section |
| `projects` | Jump to selected work |
| `work` | Open the full project index |
| `history` | Jump to the journey |
| `contact` | Jump to contact |
| `ls` | List project slugs |
| `open <slug>` | Open one project |
| `whoami` | Print a short identity |
| `links` | Print contact links |
| `home` | Go home |
| `clear` | Clear the panel |

`cat about.md`, `ls projects/`, and `./contact.sh` work as aliases.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New… → Project** and import the repo.
3. Framework preset: **Next.js**. Root directory: the repo root. No environment variables are required.
4. Deploy. `npm run build` is the production build.
5. To use **malikfajar.me**, open the project → **Settings → Domains**, add the domain, and point DNS at Vercel as the dashboard instructs.

The home page, about page, project index, and each project page are statically prerendered.

## Motion

Scroll reveals, the journey line, and the command-line decode use GSAP and ScrollTrigger. That code loads in its own chunk after the page is up. Route changes and the terminal panel use Motion: a short scan-line wipe between pages, and a scale/fade when the terminal opens. Cards lift and pick up a green edge on hover. Buttons nudge slightly toward the pointer on a fine mouse.

The home hero plays a short intro once per session: a few named cursors assemble the headline, the stat panel, and the buttons, then leave. That sequence is its own chunk. It stays off for reduced motion, viewports under 768px, and machines with four cores or fewer. Skip with the skip control, Escape, or a click in the hero.

If the system asks for reduced motion, those effects stay off: no scanlines, no decode, no scroll movement. The copy stays in place.
