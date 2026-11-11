import type { CoverKind } from "@/data/profile";

const stroke = "#24302a";
const accent = "#3ddc97";
const muted = "#a3b2a9";

export function ProjectCover({ kind }: { kind: CoverKind }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="320" height="180" fill="#0c100e" />
      {kind === "ledger" ? <Ledger /> : null}
      {kind === "match" ? <Match /> : null}
      {kind === "chat" ? <Chat /> : null}
      {kind === "detect" ? <Detect /> : null}
      {kind === "oled" ? <Oled /> : null}
    </svg>
  );
}

function Ledger() {
  return (
    <g fill="none" strokeLinecap="round">
      {[46, 74, 102, 130, 158].map((y) => (
        <path key={y} d={`M36 ${y}H284`} stroke={stroke} strokeWidth="2" />
      ))}
      <rect x="36" y="86" width="248" height="28" fill="rgba(61,220,151,0.12)" stroke="none" />
      <path d="M250 100l6 6 12-14" stroke={accent} strokeWidth="2.4" />
      {[46, 74, 102, 130, 158].map((y) => (
        <circle key={y} cx="48" cy={y} r="3" fill={y === 102 ? accent : muted} stroke="none" />
      ))}
    </g>
  );
}

function Match() {
  const left = [48, 90, 132];
  const right = [48, 90, 132];
  const pairs: Array<[number, number]> = [
    [0, 1],
    [1, 0],
    [2, 2],
  ];
  return (
    <g>
      {pairs.map(([from, to], index) => (
        <path
          key={index}
          d={`M78 ${left[from]}C140 ${left[from]}, 180 ${right[to]}, 242 ${right[to]}`}
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          opacity={index === 2 ? 1 : 0.55}
        />
      ))}
      {left.map((y) => (
        <circle key={`l${y}`} cx="78" cy={y} r="7" fill="#0c100e" stroke={accent} strokeWidth="1.6" />
      ))}
      {right.map((y) => (
        <circle key={`r${y}`} cx="242" cy={y} r="7" fill="#0c100e" stroke={muted} strokeWidth="1.6" />
      ))}
    </g>
  );
}

function Chat() {
  return (
    <g>
      <rect x="36" y="36" width="168" height="64" rx="10" fill="#101412" stroke={stroke} />
      <rect x="50" y="50" width="36" height="28" rx="3" fill="none" stroke={accent} />
      <path d="M54 72l10-12 8 8 6-6 8 10" fill="none" stroke={accent} strokeWidth="1.4" />
      <circle cx="60" cy="58" r="2" fill={accent} />
      <path d="M98 58h88M98 70h64" stroke={muted} strokeWidth="2" strokeLinecap="round" />
      <rect x="116" y="112" width="168" height="36" rx="10" fill="#101412" stroke={accent} />
      <path d="M132 130h120" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Detect() {
  return (
    <g fill="none" strokeLinecap="square">
      <path d="M48 40h22M48 40v22M272 40h-22M272 40v22M48 140h22M48 140v-22M272 140h-22M272 140v-22" stroke={accent} strokeWidth="2" />
      <rect x="92" y="62" width="78" height="52" stroke={accent} strokeWidth="1.6" />
      <rect x="176" y="84" width="64" height="40" stroke={muted} strokeWidth="1.6" />
      <path d="M92 62h10M92 62v10" stroke={accent} strokeWidth="2" />
    </g>
  );
}

function Oled() {
  const lit = new Set([
    "2,2", "2,3", "2,4", "2,5",
    "3,3", "4,4", "5,5", "5,4", "5,3",
    "8,4", "9,4", "10,4", "11,4", "12,4",
  ]);
  const dots = [];
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 16; x += 1) {
      const on = lit.has(`${x},${y}`);
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={40 + x * 16}
          cy={28 + y * 16}
          r={on ? 3.2 : 1.7}
          fill={on ? accent : "#1c2620"}
        />,
      );
    }
  }
  return <g>{dots}</g>;
}
