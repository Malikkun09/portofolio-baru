import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Muhammad Malik Fajar, a Grade 11 PPLG student in Cimahi. The prompt reads whoami.";

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
          malik@cimahi:~$ whoami
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
          Muhammad Malik Fajar
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 22, color: "#a3b2a9" }}>
          Grade 11 · PPLG · Cimahi, Indonesia
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 24, color: "#3ddc97" }}>
          open for internships
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
