"use client";

import dynamic from "next/dynamic";

const SiteMotion = dynamic(
  () => import("@/components/site-motion").then((mod) => mod.SiteMotion),
  { ssr: false },
);

export function MotionLoader() {
  return <SiteMotion />;
}
