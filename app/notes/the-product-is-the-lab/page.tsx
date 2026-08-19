import type { Metadata } from "next";
import articleMarkdown from "./article.md?raw";
import { MarkdownArticle } from "../markdown";

const title = "The Product Is the Lab";
const description = "Open Weights, Closed Loops, and the Rise of Vertical Intelligence.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/notes/the-product-is-the-lab" },
  openGraph: {
    type: "article",
    title,
    description,
    publishedTime: "2026-08-19T00:00:00+08:00",
    authors: ["Leah Wang"],
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

function ArticleHeader() {
  return (
    <header className="article-site-header shell">
      <a className="brand" href="/" aria-label="Leah’s Log home">
        <span className="brand-mark">L</span>
        <span>MACHINEPULSE / FOUNDER&apos;S LOG</span>
      </a>
      <nav aria-label="Article navigation">
        <a href="/#writing">Notes</a>
        <a href="/#about">About</a>
      </nav>
    </header>
  );
}

export default function TheProductIsTheLab() {
  return (
    <main className="article-page" id="top">
      <ArticleHeader />

      <header className="article-hero learning-article-hero shell">
        <div className="learning-cover-art" aria-hidden="true">
          <div className="learning-grid" />
          <div className="learning-loop learning-loop-a" />
          <div className="learning-loop learning-loop-b" />
          <div className="learning-signal" />
          <span className="field-coordinate field-coordinate-a">CLOSED LOOP / 002</span>
          <span className="field-coordinate field-coordinate-b">SIGNAL → UPDATE</span>
        </div>
        <p className="article-kicker">FIELD NOTE 02 · AUGUST 19, 2026</p>
        <h1>The Product Is the Lab</h1>
        <p className="article-deck">{description}</p>
        <p className="article-epigraph">A stronger prior wins the demo. A better gradient wins the domain.</p>
        <div className="article-meta">
          <span>By Leah</span>
          <span>26 min read</span>
          <span>AI Systems · Product Research</span>
        </div>
      </header>

      <div className="article-layout longform-layout shell">
        <aside className="article-index longform-index" aria-label="On this page">
          <p>On this page</p>
          <a href="#abstract">00 · Abstract</a>
          <a href="#1-from-agent-systems-to-learning-systems">01 · Learning systems</a>
          <a href="#2-environment-a-more-fundamental-abstraction-than-the-rl-algorithm">02 · Environment</a>
          <a href="#3-signal-not-just-data">03 · Signal</a>
          <a href="#4-what-is-learning-the-model-the-harness-or-the-product">04 · What learns?</a>
          <a href="#5-open-weights-closed-loops">05 · Closed loops</a>
          <a href="#6-case-study-karpo-as-a-living-environment">06 · Karpo</a>
          <a href="#7-bad-signal-is-more-dangerous-than-no-signal">07 · Bad signal</a>
          <a href="#8-from-product-company-to-neo-lab">08 · Neo lab</a>
          <a href="#9-future-directions">09 · Future</a>
          <a href="#conclusion-the-product-is-the-lab">10 · Conclusion</a>
          <a href="#references">References</a>
        </aside>

        <article className="article-prose longform-prose">
          <MarkdownArticle markdown={articleMarkdown} />
          <footer className="article-end">
            <p className="article-signoff">— Leah</p>
            <aside className="production-note" aria-label="Production note">
              <span>Production note</span>
              <p>Words and ideas by Leah. Typesetting, diagram design, and web production by Codex.</p>
            </aside>
          </footer>
        </article>
      </div>

      <section className="article-next shell">
        <p>PREVIOUS TRANSMISSION</p>
        <h2>Cross-Cultural Understanding<br />Is Not Magic.</h2>
        <a href="/notes/cross-cultural-understanding">Read Field Note 01 <span aria-hidden="true">↗</span></a>
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
