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
    default: "Leah — Founder, Builder, Story Hunter",
    template: "%s — Leah’s Field Log",
  },
  description: "A field log from Leah: founder, consumer AI builder, science-fiction devotee, and collector of stories from the edge of the known.",
  openGraph: {
    title: "Leah — Building Tomorrow. Chasing Wonder.",
    description: "Founder · Builder · Story Hunter · Earthling, for now.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leah — Building Tomorrow. Chasing Wonder.",
    description: "Founder · Builder · Story Hunter · Earthling, for now.",
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
