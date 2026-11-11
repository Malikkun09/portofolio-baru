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
        <ol className={`${showHeading ? "mt-8" : ""} space-y-4`}>
          {profile.journey.map((item, index) => (
            <li
              key={item.id}
              className="grid grid-cols-[3.25rem_1fr] gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-5"
            >
              <div className="pt-5 font-mono">
                <p className="text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm text-fg">{item.year}</p>
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
    </section>
  );
}
