import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL(`../dist/server/index.js?test=${Date.now()}`, import.meta.url);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished blog", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Leah — Founder, Builder, Story Hunter<\/title>/i);
  assert.match(html, /Building tomorrow/);
  assert.match(html, /Chasing wonder/);
  assert.match(html, /MACHINEPULSE \/ FOUNDER/);
  assert.match(html, /Cross-Cultural Understanding Is Not Magic/);
  assert.match(html, /href="\/notes\/cross-cultural-understanding"/);
  assert.match(html, /Things with/);
  assert.match(html, /a pulse/);
  assert.match(html, /href="https:\/\/www\.machinepulse\.ai\/"/);
  assert.match(html, /href="https:\/\/app\.karpo\.ai\/"/);
  assert.match(html, /href="#writing"/);
  assert.match(html, /The Inner Constellation/);
  assert.match(html, /Founder\. Builder/);
  assert.match(html, /href="mailto:Leah@MachinePulse\.ai"/);
  assert.match(html, />Leah@MachinePulse\.ai/);
  assert.match(html, /linkedin\.com\/in\/leah-wang-8676903a8/);
  assert.match(html, /property="og:image"/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /companion/i);
  assert.doesNotMatch(html, /KEEP GOING/i);
  assert.doesNotMatch(html, /[\u3400-\u9fff]/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("server-renders the first full article", async () => {
  const response = await render("/notes/cross-cultural-understanding");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Cross-Cultural Understanding Is Not Magic/);
  assert.match(html, /Input Determines Output/);
  assert.match(html, /Deliberate Annotation Beats Vague Caution/);
  assert.match(html, /Mistakes Are Part of the Path/);
  assert.match(html, /Just try\. It won/);
  assert.match(html, /og-cross-cultural\.png/);
  assert.doesNotMatch(html, /Karpo|Alice|Slack|Telegram|TGIF|relocat/i);
});

test("exports a script-free GitHub Pages artifact", async () => {
  const [html, css] = await Promise.all([
    readFile(new URL("../github-pages/index.html", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(html, /^<!DOCTYPE html>/i);
  assert.match(html, /href="\/_next\/static\/css\//);
  assert.doesNotMatch(html, /<script\b/i);
  assert.doesNotMatch(html, /Authing|Nepal|Western China/i);
  assert.match(css, /--body:\s*"Times New Roman", Times, serif/);
  await access(new URL("../github-pages/.nojekyll", import.meta.url));
  await access(new URL("../github-pages/notes/cross-cultural-understanding/index.html", import.meta.url));
  await access(new URL("../github-pages/og-cross-cultural.png", import.meta.url));
  await access(new URL("../.github/workflows/pages.yml", import.meta.url));
});
