# Aarna Creations website

A static, multi-view portfolio. Clicking a link swaps the content in place — no page refresh, no framework, no build step.

## Files

- `index.html` — shell only: header, footer, and an empty `#view` that pages render into
- `content.js` — **the file you edit**: your projects and contact links
- `script.js` — router + components (Home, Projects, Project detail, About, Contact)
- `styles.css` — design

## Add a project

Open `content.js`, copy the commented template into `PROJECTS`, fill it in. It instantly appears on Home, on `#/projects`, and gets its own page at `#/projects/<slug>`. Nothing else to touch.

## Add a new page

In `script.js`: write a function returning `{ title, html }`, add one line in `render()`, and one `<a data-nav="...">` in `index.html`.

## Routes

`#/` · `#/projects` · `#/projects/<slug>` · `#/about` · `#/contact`

Hash routes work on GitHub Pages without any server config.

## Run locally

Open `index.html`, or `python3 -m http.server 8000`.

## Publish with GitHub Pages

Upload the folder contents to a repo root → Settings → Pages → Deploy from branch → `main` / root.
