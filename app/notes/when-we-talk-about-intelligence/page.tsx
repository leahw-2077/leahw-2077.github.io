import type { Metadata } from "next";
import Link from "next/link";
import articleMarkdown from "./article.md?raw";
import { MarkdownArticle } from "../markdown";

const title = "When We Talk About Intelligence";
const description =
  "Language, emotion, value—and why the rise of LLMs does not make AGI inevitable.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/notes/when-we-talk-about-intelligence" },
  openGraph: {
    type: "article",
    title,
    description,
    publishedTime: "2026-09-06T00:00:00+08:00",
    authors: ["Leah Wang"],
    images: [{ url: "/og-intelligence.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-intelligence.png"],
  },
};

function ArticleHeader() {
  return (
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
  );
}

export default function WhenWeTalkAboutIntelligence() {
  return (
    <main className="article-page" id="top">
      <ArticleHeader />

      <header className="article-hero intelligence-article-hero shell">
        <div className="intelligence-cover-art" aria-hidden="true">
          <div className="intelligence-field" />
          <div className="intelligence-path" />
          <span className="intelligence-node intelligence-node-a" />
          <span className="intelligence-node intelligence-node-b" />
          <span className="intelligence-node intelligence-node-c" />
          <span className="intelligence-node intelligence-node-d" />
          <span className="intelligence-node intelligence-node-e" />
          <span className="field-coordinate field-coordinate-a">SENSE → VALUE → ACT</span>
          <span className="field-coordinate field-coordinate-b">FIELD MAP / 003</span>
        </div>
        <p className="article-kicker">FIELD NOTE 03 · SEPTEMBER 6, 2026</p>
        <h1>When We Talk About Intelligence</h1>
        <p className="article-deck">{description}</p>
        <p className="article-epigraph">Intelligence begins in judgment and action—not in language alone.</p>
        <div className="article-meta">
          <span>By Leah</span>
          <span>9 min read</span>
          <span>Intelligence · LLMs &amp; AGI</span>
        </div>
      </header>

      <div className="article-layout longform-layout shell">
        <aside className="article-index longform-index" aria-label="On this page">
          <p>On this page</p>
          <a href="#intelligence-before-language">01 · Before language</a>
          <a href="#emotion-as-a-value-system">02 · Emotion &amp; value</a>
          <a href="#why-llms-do-not-make-agi-inevitable">03 · LLMs &amp; AGI</a>
          <a href="#a-new-kind-of-tool">04 · A new tool</a>
          <a href="#generalization-is-still-the-open-question">05 · Generalization</a>
          <a href="#language-is-not-the-whole-of-intelligence">06 · Beyond language</a>
          <a href="#references">References</a>
        </aside>

        <article className="article-prose longform-prose">
          <MarkdownArticle markdown={articleMarkdown} />
          <footer className="article-end">
            <p className="article-signoff">— Leah</p>
            <aside className="production-note" aria-label="Production note">
              <span>Production note</span>
              <p>Words and ideas by Leah. English translation, typesetting, and web production by Codex.</p>
            </aside>
          </footer>
        </article>
      </div>

      <section className="article-next shell">
        <p>PREVIOUS TRANSMISSION</p>
        <h2>The Product<br />Is the Lab.</h2>
        <Link href="/notes/the-product-is-the-lab">Read Field Note 02 <span aria-hidden="true">↗</span></Link>
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
