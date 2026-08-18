# Leah's Log

A content-first personal blog inspired by the clarity of Lilian Weng's Lil'Log. It is designed for thoughtful long-form writing, with a distinct editorial identity of its own.

## Personalize the site

Open `app/page.tsx` and update:

- `site`: name, role, introduction, and email
- `posts`: dates, titles, summaries, tags, and reading times
- `projects`: current projects and their status

The page title and search description live in `app/layout.tsx`.

The field-note titles are editorial placeholders. Replace them with published essays as the archive grows. Public contact links are configured in the `site` object.

## Preview locally

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

## Publish with GitHub Pages

The repository includes an automatic publishing workflow:

1. Create a new repository on GitHub.
2. Push this project to its `main` branch.
3. In `Settings → Pages`, set the source to `GitHub Actions`.
4. Every future push to `main` will update the blog automatically.

The default URL is usually `https://your-username.github.io/repository-name/`. Naming the repository `your-username.github.io` gives you the shorter root URL.

## Validate a release

```bash
npm test
```

This checks both the hosted build and the static GitHub Pages export.
