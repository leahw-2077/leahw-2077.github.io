import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "github-pages");
const workerUrl = pathToFileURL(resolve(root, "dist/server/index.js"));
workerUrl.searchParams.set("export", Date.now().toString());

const { default: worker } = await import(workerUrl.href);
const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");
const routes = [
  { pathname: "/", destination: "index.html" },
  {
    pathname: "/notes/cross-cultural-understanding",
    destination: "notes/cross-cultural-understanding/index.html",
  },
];

async function render(pathname) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) {
    throw new Error(`Static export failed for ${pathname} with status ${response.status}`);
  }

  return (await response.text())
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "")
    .replaceAll('href="/_next/', `href="${basePath}/_next/`)
    .replaceAll('src="/_next/', `src="${basePath}/_next/`)
    .replaceAll('href="/notes/', `href="${basePath}/notes/`)
    .replaceAll('href="/"', `href="${basePath || "/"}"`);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "dist/client"), output, { recursive: true });
for (const route of routes) {
  const destination = resolve(output, route.destination);
  await mkdir(resolve(destination, ".."), { recursive: true });
  await writeFile(destination, await render(route.pathname));
}
await writeFile(resolve(output, ".nojekyll"), "");

console.log(`GitHub Pages export ready at ${output}`);
