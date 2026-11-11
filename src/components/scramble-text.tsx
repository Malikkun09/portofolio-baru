export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={className} data-scramble={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" data-scramble-out>
        {text}
      </span>
    </span>
  );
}
