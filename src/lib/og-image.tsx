import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${profile.name}, a ${profile.grade} ${profile.program} student in ${profile.location}. The prompt reads whoami.`;

export function renderOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#070908",
          color: "#e7eee9",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", color: "#3ddc97", fontSize: 28 }}>
          {profile.prompt}:~$ whoami
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            marginTop: 28,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 22, color: "#a3b2a9" }}>
          {`${profile.grade} · ${profile.program} · ${profile.location}`}
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 24, color: "#3ddc97" }}>
          {profile.statusLabel}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
