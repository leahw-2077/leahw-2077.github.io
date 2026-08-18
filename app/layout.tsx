import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luyas-thinking-log.leahwang021.chatgpt.site"),
  title: {
    default: "Leah Wang — Founder, Product Builder, Writer",
    template: "%s — Leah’s Log",
  },
  description: "Leah writes about consumer AI, global products, startups, and life beyond the screen.",
  openGraph: {
    title: "Leah Wang",
    description: "Founder · Product Builder · Perpetually Curious",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leah Wang",
    description: "Founder · Product Builder · Perpetually Curious",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={serif.variable}>{children}</body>
    </html>
  );
}
