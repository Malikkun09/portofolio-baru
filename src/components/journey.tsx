import { profile } from "@/data/profile";
import { CommandHeading } from "@/components/command-heading";

export function Journey({
  id = "history",
  showHeading = true,
}: {
  id?: string;
  showHeading?: boolean;
}) {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        {showHeading ? (
          <CommandHeading command="history" title="Journey" />
        ) : null}
        <div className={`${showHeading ? "mt-8" : ""} relative`} data-timeline>
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[calc(3.25rem+0.375rem)] w-px bg-line sm:left-[calc(4.5rem+0.625rem)]"
          />
          <div
            aria-hidden="true"
            data-timeline-line
            className="absolute top-2 bottom-2 left-[calc(3.25rem+0.375rem)] w-px origin-top bg-accent sm:left-[calc(4.5rem+0.625rem)]"
          />
          <ol className="space-y-4">
          {profile.journey.map((item, index) => (
            <li
              key={item.id}
              data-reveal
              className="grid grid-cols-[3.25rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-5"
            >
              <div className="relative pt-5 text-right font-mono">
                <p className="text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm text-fg">{item.year}</p>
                <span
                  aria-hidden="true"
                  className="absolute top-[1.35rem] -right-[11px] z-[1] h-2.5 w-2.5 rounded-full border border-accent bg-bg sm:-right-[15px]"
                />
              </div>
              <article className="rounded-lg border border-line bg-elev p-5">
                <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                <p className="mt-1 font-mono text-xs text-muted">{item.place}</p>
                <p className="mt-3 text-sm leading-relaxed text-fg sm:text-base">
                  {item.summary}
                </p>
              </article>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
