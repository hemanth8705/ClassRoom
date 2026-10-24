# ClassRoom

## The website (`site/`)
Astro static site, deployed on Vercel from this repo (Vercel project Root Directory = `site`, framework Astro).
- Live article pages: `site/src/articles/*.html` (fragments: style + markup + script). Register each one in `site/src/data/articles.ts`.
- `authentication/` and `text-to-image/` hold the original standalone pages and the markdown source (`1_text-to-image.md` is read by the site). The HTML copies in `site/src/articles/` are what gets published; edit those.
- Design system: `site/src/styles/theme.css` (one theme: pure black and white, no colour), `base.css` (site chrome), `article.css` (skin for article bodies). Live reference at `/design`. No theme switcher.
- Colours come from CSS variables only. No hex values in new article code. - Icons: custom SVG set in `site/src/components/Sprite.astro`, used as `<svg class="ico"><use href="#i-name"/></svg>`. **No emoji anywhere.** Add new icons to the sprite, same 24px grid and 1.6 stroke.
- Look: dark, minimal, editorial. Instrument Serif for headlines, Inter for body, JetBrains Mono for labels and code. Black and white only. Hairline borders, no heavy shadows, no gradients except the soft top glow.
- Check any change in a real render (`npm run build`, then a headless screenshot) at desktop and phone width.

Backend engineering articles, written as single-file interactive HTML pages. Two folders:

- `authentication/` — OAuth and auth articles
- `text-to-image/` — text-to-image articles
- `site/` is gitignored. Leave it alone.

Name article files with a number prefix, e.g. `1_oauth.html`, so the reading order is clear.

## Building an HTML article page

### Show every change on one screen
If a click, toggle or slider changes something on the page, the result must appear where the user is already looking, with no scrolling.

- Put the control and its result side by side (two columns). Stack them only on narrow screens.
- Never put the output far below the button. If the user has to scroll to see what changed, redo the layout.
- For anything that still might land off-screen, call a `keepVisible(element)` helper after the update. It scrolls only if the element isn't fully in view.
- Keep each interactive block short enough to fit in one viewport (about 600px tall on a laptop).
- Check this by clicking every control once and asking: did I have to scroll to see what happened?

### Use the whole screen, and use points
- A step-through (flow, sequence, wizard) opens as a full-screen widget: diagram on one side, details on the other, a step bar at the bottom. Don't squeeze it into a narrow card inside the article.
- Explain each step as structure, not a paragraph: a short title, a "who can see it" tag, 2-3 bullet points of about 8 words each, a small "key parts" list (name, meaning), then the raw example.
- Support `←` `→` and `Esc`, and a `#name-N` link so a step can be opened directly.
- Look at the real render (headless browser screenshot) before calling it done.

### Code snippets are Python only
Every code snippet on a page is Python. Use Flask and `requests` for backend examples. Raw HTTP messages and JSON payloads (a protocol, not code) are fine as they are. Do not add JavaScript, Node, or other languages to the visible examples. The page's own scripting is still JS.

### Voice
Write like a person explaining something to a colleague.

- Short, plain sentences. As few words as possible, and every line has to earn its place.
- Open with the concrete thing (the problem, an example, a number), then explain.
- No filler headings like "What this is about" or "Table of contents". Start with the point.
- No AI-sounding phrases ("game-changer", "in today's landscape", "let's dive in").
- Write for a non-technical reader who is also a developer: jargon gets one plain-English sentence the first time it appears.
- Don't invent facts. Endpoints, scope names and limits must match the provider's docs.

### Structure
- Explain the idea first (problem, players, flow), then the implementation (setup, code). Don't mix them.
- Put interactive demos where they teach something: flows as step-through diagrams, tokens as decodable examples, risks as toggle-and-run demos.
- Support light and dark mode, and a phone-width layout.

## Git
- Never commit or push unless the user asks. They push themselves.
- Do **not** add a `Co-Authored-By` line (or any Claude attribution) to commits or PR descriptions in this repo. The user has said so explicitly; this overrides the default.
