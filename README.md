# AI Literacy — Student Course

A self-paced, browser-based course on working well with AI at university. Static HTML, CSS and JavaScript — no build step, no dependencies, no server-side code.

## Contents

| File | Module | Notes |
|---|---|---|
| `index.html` | Landing page | Links to all modules |
| `module-0.html` | Getting Started | 4 lessons, orientation, ~20 min |
| `module-1.html` | Human-Centred Mindset | 3 lessons, ~40 min |
| `module-2.html` | Ethics of AI | 3 lessons, ~45 min |
| `module-3.html` | AI Techniques and Applications | 3 lessons, ~45 min |
| `module-4.html` | AI System Design | 3 lessons, ~55 min — **elective** |
| `assets/css/course.css` | Shared stylesheet | All visual styling for every page |
| `assets/js/course.js` | Shared script | All interactions for every page |

## Publishing to GitHub Pages

1. Create a new repository on GitHub.
2. Upload the contents of this folder to the repository root — `index.html` must sit at the top level, not inside a subfolder.
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Set the branch to `main` and the folder to `/ (root)`, then click **Save**.
6. Wait a minute or two. The site will appear at `https://<username>.github.io/<repository-name>/`.

If you'd rather work from the command line:

```bash
git init
git add .
git commit -m "AI literacy course"
git branch -M main
git remote add origin https://github.com/<username>/<repository-name>.git
git push -u origin main
```

Then follow steps 3–6 above.

### Previewing locally

Open `index.html` in a browser — everything works from the filesystem. If you'd prefer a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes for editors

**Adding or changing styling.** Every page loads `assets/css/course.css`. Change it once and all six pages update. Colours are defined as CSS custom properties at the top of the file — editing `--gold`, `--teal`, or the surface colours re-themes the whole course.

**The elective theme.** Module 4 carries `class="theme-elective"` on its `<body>`, which switches the accent from gold to violet. Nothing else about the page changes. To make another module elective, add the same class.

**Interactions.** Everything is wired through `assets/js/course.js` using data attributes rather than inline handlers, so markup stays clean:

- `data-check-quiz` on a button checks every `.quiz-q` inside its parent `.card`
- `data-check-match` drives the matching exercise in Module 2
- `.risk` and `.arch-layer` elements expand on click automatically
- `.claim` elements in Module 3's trust audit reveal on click

**The lecturer-assignment preview.** Each module has a switch in the top bar that toggles `demo-on` on the `<body>`, swapping every lesson between "no assignment linked" and a sample linked assignment. This is a demonstration of the feature for reviewers — in a real deployment the banners would be driven by whatever system holds the lecturer's assignment data, and the switch would be removed.

**Placeholders.** Dashed boxes mark assets still to be produced (explainer videos, portraits, discipline-specific examples). Open enrichment slots — where a decision is still pending rather than an asset missing — are outlined in the accent colour instead of grey. Both are intentional and visible; search the HTML for `placeholder` to find them all.

## Accessibility

Interactive elements are keyboard-reachable, the assignment switch reports its state via `aria-pressed`, and the stylesheet honours `prefers-reduced-motion`. Worth a proper audit before wide release — particularly colour contrast on the muted text, and screen-reader behaviour on the expandable panels.

## Status

Prototype. Content, examples and quiz items are drafted and reviewable but not finalised. Nothing students type is stored, transmitted, or graded — all inputs are local to the page and disappear on reload.
