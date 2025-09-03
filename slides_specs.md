# Slides project spec

Author Reveal.js decks in plain Markdown. Build static HTML with reveal-md. Host on GitHub Pages for reliable classroom delivery.

## Goals

* Fast authoring in Markdown
* Consistent look across courses
* Smooth playback on campus networks
* Simple updates and rollbacks
* Direct sharing via GitHub Pages URLs

## Scope

* Decks for Chapman and Vanguard courses
* Static HTML output only
* Dark theme only
* Videos on YouTube unlisted
* PDF exports for Canvas and offline

## Out of scope for now

* Live code execution inside slides
* Chalkboard plugin
* Light theme
* LMS deep links

---

## Repository plan

Mono-repo named `slides`

```
slides/
  README.md
  .github/workflows/build.yml
  theme/
    reveal/                # vendored Reveal.js and plugins
    prism/                 # vendored Prism assets
    katex/                 # vendored KaTeX assets
    mermaid/               # vendored Mermaid assets
    inter/                 # self-hosted Inter font files
    tim.css                # site theme
    LICENSES/              # third-party licenses
    VERSIONS.md            # pinned asset versions and source URLs
  shared/
    images/
    snippets.md
  mgsc-220/
    wk01/
      slides.md
      index.html
      assets/
    wk02/
  mgsc-310/
    wk01/
```

Folder naming

* Course in lowercase with dashes
* Week with two digits such as `wk01`, `wk02`

Branch strategy

* `main` for production
* Short-lived feature branches for deck work

Commit message style

* `course week topic` then a dash and the action
  Example `mgsc-220 wk01 intro add video`

Tags

* `MGSC220-Wk01`, `MGSC310-Wk01`

---

## Toolchain

* Node LTS on dev machines and CI
* `reveal-md` for local preview and static builds
* Decktape for PDF export
* GitHub Actions for build and deploy
* GitHub Pages for hosting

No global installs on CI

* Use `npx` in scripts

---

## Vendored assets

Why

* No reliance on third-party CDNs in class
* Stable output across semesters

What to vendor

* Reveal.js core and official plugins
* Prism core and chosen languages
* KaTeX
* Mermaid
* Inter font files woff2
* Small helper JS if needed later

Pinning

* Record versions and source URLs in `theme/VERSIONS.md`
* Keep license texts in `theme/LICENSES/`

Font policy

* Load Inter from local files
* Fallback stack `system-ui, -apple-system, Segoe UI, Roboto, sans-serif`

---

## Theme and typography

Dark only. High contrast. Large targets.

Add `theme/tim.css`

```css
@font-face{
  font-family:"Inter";
  src:url("./inter/Inter-VariableFont_slnt,wght.woff2") format("woff2");
  font-display:swap;
}

:root{
  /* Backgrounds */
  --bg-primary:#0f0f23;
  --bg-secondary:#1a1a2e;
  --bg-tertiary:#16213e;
  --bg-accent:#0f172a;

  /* Text */
  --text-primary:#f8fafc;
  --text-secondary:#cbd5e1;
  --text-muted:#64748b;

  /* Lines and shadows */
  --border-primary:#334155;
  --border-accent:#475569;
  --shadow:rgba(0,0,0,.5);

  /* Accents */
  --accent:#38bdf8;   /* cyan for links and UI */
}

.reveal{
  font-family:Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  color:var(--text-primary);
}

.reveal .slides{
  background:var(--bg-primary);
}

.reveal h1,.reveal h2,.reveal h3{
  letter-spacing:-.02em;
  font-weight:800;
}

.reveal p,.reveal li{
  font-size:1.1rem;
  line-height:1.55;
  color:var(--text-secondary);
}

.reveal a{
  color:var(--accent);
  text-decoration:none;
  border-bottom:1px solid var(--accent);
}

.reveal .progress,
.reveal .controls{
  color:var(--accent);
}

.badge{
  position:absolute;
  top:16px;
  right:24px;
  font-size:.8rem;
  color:var(--text-muted);
  background:var(--bg-tertiary);
  padding:.25rem .5rem;
  border-radius:.375rem;
  box-shadow:0 2px 6px var(--shadow);
}

.fig{
  background:var(--bg-tertiary);
  border:1px solid var(--border-primary);
  padding:12px;
  border-radius:10px;
}

@media (hover:hover){
  .reveal a:hover{ opacity:.85; }
}

/* Print fallback */
@media print{
  .reveal .slides{ background:#ffffff; color:#111827; }
  .reveal a{ border-bottom:0; }
}
```

---

## Plugins

Load these per deck through the static build

* Notes
* Highlight
* KaTeX
* Mermaid
* Zoom
* Menu

Skip chalkboard for now

---

## Authoring rules

Slide grammar

* One idea per slide
* 5 to 8 short lines max
* Short headings

Fragments

* Use for staged points
* Keep count low to avoid long click paths

Images

* WebP when possible
* Max width 1800 px
* Alt text on every image

Video

* YouTube unlisted
* Captions on
* Add a one-line summary under the video

Links

* Open in new tab
* Keep link text short

Section rhythm

* Divider slide every 10 to 15 slides with a breadcrumb
* Alternate text and figure slides to reset attention

Slide types

* Title
* Agenda
* Concept
* Example
* Exercise
* Video
* Code
* Links
* Summary

---

## Sample deck source

`mgsc-220/wk01/slides.md`

````markdown
# Course intro

- Why this course matters for your career
- What you will do this week
- How grading works

---

## How to succeed

- Practice with live files
- Ask two questions per class
- Short weekly reflections

---

## Short video

<div class="fig">
<iframe width="960" height="540"
  src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
  title="Intro clip" frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen></iframe>
<p>Two-minute overview of this course</p>
</div>

---

## Sample code

```python
import pandas as pd
df = pd.read_csv("sales.csv")
df.groupby("region")["revenue"].sum()
````

---

## Links

* Canvas module
* Course site

````

---

## Local development

Install Node LTS

Install dependencies

```bash
npm init -y
npm install --save-dev reveal-md decktape
````

Preview a deck

```bash
npx reveal-md mgsc-220/wk01/slides.md --theme theme/tim.css --watch
```

Build static output

```bash
npx reveal-md mgsc-220/wk01/slides.md \
  --theme theme/tim.css \
  --static mgsc-220/wk01 \
  --assets-dir mgsc-220/wk01/assets
```

Build all decks script

`package.json` scripts section

```json
{
  "scripts": {
    "build:all": "node scripts/build-all.js",
    "pdf:all": "node scripts/pdf-all.js"
  }
}
```

`scripts/build-all.js`

```js
const { execSync } = require("node:child_process");
const { globSync } = require("glob");

const files = globSync("**/slides.md", { ignore: ["node_modules/**"] });

for (const f of files) {
  const out = f.replace(/slides\\.md$/, "");
  const assets = `${out}assets`;
  const cmd = [
    "npx reveal-md",
    `"${f}"`,
    "--theme theme/tim.css",
    `--static "${out}"`,
    `--assets-dir "${assets}"`
  ].join(" ");
  console.log(cmd);
  execSync(cmd, { stdio: "inherit" });
}
```

`scripts/pdf-all.js`

```js
const { execSync } = require("node:child_process");
const { globSync } = require("glob");
const path = require("node:path");

const files = globSync("**/index.html", {
  ignore: ["node_modules/**", "theme/**"]
});

for (const f of files) {
  const dir = path.dirname(f);
  const pdf = path.join(dir, "deck.pdf");
  const cmd = `npx decktape reveal "${f}" "${pdf}"`;
  console.log(cmd);
  execSync(cmd, { stdio: "inherit" });
}
```

Add `glob`

```bash
npm install glob
```

---

## GitHub Actions

`.github/workflows/build.yml`

```yaml
name: build-and-deploy
on:
  push:
    branches: [ main ]
    paths:
      - "**.md"
      - "theme/**"
      - "scripts/**"
      - ".github/workflows/build.yml"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci || npm i
      - run: npm run build:all
      - run: npm run pdf:all
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

GitHub Pages setup

* Source GitHub Actions
* Custom domain optional

---

## Sharing and Distribution

### Direct Links
Share slides directly via GitHub Pages URLs:
- https://timfrenzel.github.io/slides/machine-learning/week01/
- https://timfrenzel.github.io/slides/data-analytics/week01/
- https://timfrenzel.github.io/slides/data-visualization/week01/

### Embedding (if needed)
For platforms that support iframe embedding:

```html
<div style="position:relative;padding-top:56.25%;width:100%;height:0;overflow:hidden;">
  <iframe
    src="https://timfrenzel.github.io/slides/machine-learning/week01/index.html"
    title="Machine Learning Week 1"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0"
    allowfullscreen
    loading="lazy">
  </iframe>
</div>
```

---

## Video policy

* Upload to YouTube as unlisted
* Add captions in YouTube Studio
* Use the embed with `rel=0`
* Add a one-line summary on the slide

---

## Accessibility checklist for slides

* Alt text on all images
* Body size at least 16 px
* Contrast ratio at least 4.5 to 1 for text
* Keyboard navigation through all fragments
* Caption track on each video or a short transcript
* No red and green pair for meaning
* Link text that says what it leads to

---

## QA before class

* Load the deck on Chrome and Safari
* Test the iframe on WordPress
* Play the YouTube clip end to end with audio
* Step through fragments with keyboard only
* Open the PDF export and skim three random pages
* Check two slides on a student laptop at 125 percent zoom

---

## Rollback plan

* Each week carries a tag
* To revert a deck, check out the tag and push a hotfix branch
* Rebuild and deploy

---

## Roles

Owner

* Theme quality
* Plugin selection
* CI pipeline

Contributors

* Deck content
* Images and figures
* Video summaries

Reviewers

* Style and tone
* Accessibility checks
* Link tests

---

## Roadmap

Near term

* Build MGSC-220 Week 1 and MGSC-310 Week 1
* Add a shared figure library in `shared/images`
* Write `CONTRIBUTING.md` with deck rules

Later

* Course index page that lists all decks
* Menu plugin configuration shared across decks
* Optional chalkboard for problem solving sessions

---

## Appendix

Reveal options set by `reveal-md` at build time

* `hash` on
* `slideNumber` `c/t`
* `transition` `fade`
* `backgroundTransition` `fade`
* `controlsTutorial` off

Prism languages to include

* `markup`
* `css`
* `clike`
* `javascript`
* `python`
* `r`
* `sql`

Mermaid

* Init on deck load with dark theme

KaTeX

* Auto render with delimiters
  Inline `$...$`
  Block `$$...$$`

PDF export tips

* Use Decktape for consistent pagination
* Avoid videos on print pages
* Add a title slide with course, week, and tag name
