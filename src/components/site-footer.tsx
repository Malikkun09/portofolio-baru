import { profile } from "@/data/profile";

export function SiteFooter() {
  const github = profile.socials.find((social) => social.id === "github");

  return (
    <footer className="relative z-[1] border-t border-line">
      <div
        data-reveal
        className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6"
      >
        <div>
          <p className="font-medium">{profile.signature}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.location} · {profile.school}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 font-mono text-sm sm:items-end">
          <a
            href={profile.phone.href}
            className="text-accent"
            target="_blank"
            rel="noreferrer noopener"
          >
            WhatsApp {profile.phone.display}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          {github?.href && !github.todo ? (
            <a
              href={github.href}
              className="text-muted hover:text-accent"
              target="_blank"
              rel="me noreferrer noopener"
            >
              GitHub {github.handle}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-muted">GitHub · TODO</span>
          )}
        </div>
      </div>
    </footer>
  );
}
