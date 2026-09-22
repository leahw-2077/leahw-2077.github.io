import type { Metadata } from "next";
import Link from "next/link";
import articleMarkdown from "./article.md?raw";
import { MarkdownArticle } from "../markdown";

const title = "Could Jev Be AI’s ‘Bilaterian Moment’?";
const description =
  "What early animals, Jev, and a faster Karpo Discover taught me about AI that chooses—not just AI that talks.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/notes/jev-bilaterian-moment" },
  openGraph: {
    type: "article",
    title,
    description,
    publishedTime: "2026-09-22T00:00:00-04:00",
    authors: ["Leah Wang"],
    images: [{ url: "/jev-bilaterian-cover.png", width: 1774, height: 887 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/jev-bilaterian-cover.png"],
  },
};

export default function JevBilaterianMoment() {
  return (
    <main className="article-page" id="top">
      <header className="article-site-header shell">
        <Link className="brand" href="/" aria-label="Leah’s Log home">
          <span className="brand-mark">L</span>
          <span>MACHINEPULSE / FOUNDER&apos;S LOG</span>
        </Link>
        <nav aria-label="Article navigation">
          <Link href="/#writing">Notes</Link>
          <Link href="/#about">About</Link>
        </nav>
      </header>

      <header className="article-hero jev-article-hero shell">
        <p className="article-kicker">FIELD NOTE 04 · SEPTEMBER 22, 2026</p>
        <h1>Could Jev Be AI&apos;s<br />&lsquo;Bilaterian Moment&rsquo;?</h1>
        <p className="article-deck">{description}</p>
        <div className="article-meta">
          <span>By Leah</span>
          <span>4 min read</span>
          <span>Jev · Intelligence · Product</span>
        </div>
      </header>

      <figure className="jev-cover shell">
        <img
          src="/jev-bilaterian-cover.png"
          width="1774"
          height="887"
          alt="Colorful branching paths around a symmetric central form on a warm cream background"
        />
      </figure>

      <div className="article-layout longform-layout shell">
        <aside className="article-index longform-index" aria-label="On this page">
          <p>On this page</p>
          <a href="#the-turn">01 · The turn</a>
          <a href="#from-answers-to-choices">02 · Answers to choices</a>
          <a href="#what-we-built-with-jev">03 · What we built</a>
          <a href="#where-the-analogy-stops">04 · The limits</a>
        </aside>

        <article className="article-prose longform-prose">
          <MarkdownArticle markdown={articleMarkdown} />
          <footer className="article-end">
            <p className="article-signoff">— Leah</p>
          </footer>
        </article>
      </div>

      <section className="article-next shell">
        <p>PREVIOUS TRANSMISSION</p>
        <h2>When We Talk<br />About Intelligence.</h2>
        <Link href="/notes/when-we-talk-about-intelligence">
          Read Field Note 03 <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className="footer shell article-footer">
        <div className="footer-title">The universe is unfinished.<br /><em>Good.</em></div>
        <div className="footer-bottom">
          <span>© 2026 Leah</span>
          <span>Shanghai · Singapore · New York</span>
          <a href="#top">Return to orbit ↑</a>
        </div>
      </footer>
    </main>
  );
}
