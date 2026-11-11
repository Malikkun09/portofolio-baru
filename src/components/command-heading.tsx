import { ScrambleText } from "@/components/scramble-text";
import { profile } from "@/data/profile";

export function CommandHeading({
  as: Tag = "h2",
  command,
  title,
}: {
  as?: "h1" | "h2";
  command: string;
  title: string;
}) {
  return (
    <header>
      <p className="font-mono text-sm">
        <span className="text-muted">{profile.prompt}:~$ </span>
        <ScrambleText text={command} className="text-accent" />
      </p>
      <Tag
        className={`mt-3 font-medium tracking-tight ${
          Tag === "h1"
            ? "text-[clamp(2rem,5vw,3.25rem)] leading-[1.08]"
            : "text-2xl sm:text-3xl"
        }`}
      >
        {title}
      </Tag>
    </header>
  );
}
