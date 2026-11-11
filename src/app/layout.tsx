import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/shell";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/profile";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: profile.seo.title,
    template: `%s — ${profile.name}`,
  },
  description: profile.seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "Muhammad Malik Fajar",
    "Malik Fajar",
    "PPLG",
    "Cimahi",
    "SMK Informatika Fithrah Insani",
    "student developer",
    "UI/UX",
  ],
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: profile.siteUrl,
    siteName: profile.name,
    title: profile.seo.title,
    description: profile.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: profile.seo.title,
    description: profile.seo.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070908",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: [profile.signature, profile.shortName],
  url: profile.siteUrl,
  jobTitle: "Software and Game Development student",
  description: profile.seo.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cimahi",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: profile.school,
  },
  sameAs: profile.socials.flatMap((social) =>
    social.href && !social.todo && social.id !== "whatsapp" ? [social.href] : [],
  ),
  knowsAbout: [
    "Web development",
    "UI/UX design",
    "Machine learning",
    "Game development",
    "Laravel",
    "React",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Shell />
        <main id="content" className="relative z-[1] flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
