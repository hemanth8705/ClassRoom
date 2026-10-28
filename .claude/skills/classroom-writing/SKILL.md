---
name: classroom-writing
description: Use when writing or editing any article, page copy or interactive explainer for the ClassRoom site. The audience is engineers and developers revising a concept they roughly know. Sets the voice (a person talking, precise and short) and the hover-glossary convention for terms.
---

# ClassRoom writing

## Audience: engineers revising a concept

These articles are not for beginners and they don't teach from zero. The reader is a developer or engineer who has met the topic before and wants to **revise** it: see the whole mechanism again, with the details that matter, and leave sure of it.

So:
- **Start at the mechanism.** No "why does this exist" opening, no "imagine you're building…" story, no cast-of-characters section. Open straight on the flow, the structure or the thing being revised.
- **Answer the questions an engineer would push back with.** "These values are public, so why send them?" "What's actually in the token, byte by byte?" "How do I verify it, and in what order?" Those sections are the point of the page.
- **Be precise.** Real field names, real endpoints, real algorithms, real code. Say RS256, not "a signature". Say what is checked, when, and by whom.
- **Don't re-explain basics.** If something is background (what a redirect is, what JSON is), skip it. If a term is specific to the topic (PKCE, JWKS, `kid`), use it and give it a hover definition.

## The voice

Still a person talking, not a document. Short, direct sentences, in plain English.

- **Say who does what.** Your app, your server, the browser, Google. Never "the system" or "a request is made".
- **Give the reason for everything.** Where an engineer would ask "why?", there's a "because". "It's public, so anyone can read it. That's fine, because your server keeps its own copy and compares."
- **Walk consequences in order.** Because X, so Y, which means Z, one short sentence each.
- **Ask the reader's question, then answer it in the next line.** Make that the section heading when it's the main question ("state and code_challenge are public. Why send them?").
- **Point forward when you postpone something.** "We set that up in the build section below."
- **Show it, then say it.** Put the real URL, payload, token or code on the page, and explain it after.
- **No filler.** No "simply", "just", "powerful", "robust", "let's dive in", "in today's landscape". No narrator comments like "No OAuth yet."

An analogy is fine when it saves a paragraph (the hotel keycard for a token). Use one, and keep it short.

## Page shape

1. Start with the thing itself (the flow, the structure).
2. Then the questions that make it click (why is X public, why a code before the token).
3. Then the internals (what's in the token, how it's checked).
4. Then the build (setup, code).
5. End with a checklist of things to get right before shipping.

Interactive pieces go where they prove something: toggle a defence and run the attack, edit a payload and watch the signature fail.

## Hover definitions for terms

Any term specific to the topic (PKCE, state, JWKS, base64url) gets a dotted underline. Hovering it opens a small dialog box. It isn't a tooltip: the box stays open while the pointer is over it, so the reader can read it and click inside.

Every definition has three parts:
1. The term.
2. A definition of one to three plain sentences.
3. A link at the end, "Explain PKCE", that opens a Google search for a standard question, for example `explain PKCE. What does PKCE mean in the OAuth authorization code flow?`

Markup:
```html
<span class="term" tabindex="0" data-term="pkce">PKCE</span>
```
Register it in the article's script:
```js
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  pkce: { t: "PKCE", d: "Short for Proof Key for Code Exchange...", q: "explain PKCE. What does PKCE mean in the OAuth authorization code flow?" },
});
```
- `t` is the title, `d` the definition, `q` the search query. Always put the topic in `q`.
- Terms inside generated markup (walkthrough panels, tabs) work the same way. The site script listens on the whole document.
- Underline a term the first time it appears in a section, and always in "key parts" lists. Not every repeat.
- Keep `tabindex="0"` so keyboard users can focus it. It also opens on tap.

## Accuracy comes before voice

- A friendly voice never excuses a wrong statement. If a simplification would be wrong, find a simpler true one.
- Get roles right. In OAuth the **resource owner is the end user**, the **client is the app**.
- Endpoints, scope names, algorithms and lifetimes must match the provider's docs.
- If a demo claims to do something (verify a signature), it must actually do it, or say plainly that it's simulated.
- Code snippets are Python only. See CLAUDE.md.

## Quick check before you finish

- Would an engineer who already knows the basics learn something precise from every section?
- Does each paragraph say who does what, and why?
- Is every topic-specific term underlined, defined and linked?
- Did I cut every line that explains something the reader already knows?

*When the user gives more style notes, add them here so the voice stays in one place.*
