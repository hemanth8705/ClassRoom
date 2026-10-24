---
name: classroom-writing
description: Use when writing or editing any article, page copy or interactive explainer for the ClassRoom site. Sets the teaching voice (a person explaining to you, not a document describing a topic) and the hover-glossary convention for unfamiliar terms.
---

# ClassRoom writing

Every line should sound like a person sitting next to the reader, teaching them. Not a manual, not a summary, not marketing.

The reader is a developer who is about to build the thing, but may know nothing about it yet. Write for that person.

## 1. The voice

**Talk to "you", and be specific about who does what.**
Say what *your app* does, what *your user* does, and what *Google* does. Never "the system" or "a request is made".

**Open with a scenario, not a definition.**
Start from something the reader is already doing: "Say you're building a calendar app." Then let the problem show up on its own.

**Walk the chain of consequences, in order.**
Because X, so Y, which means Z. Each step is one short sentence. The reader should be able to say "right, that's why" by the end.
> Your users sign up, so you store a password for each one. Now you're sitting on a database hackers want. Most people reuse passwords, so when it leaks, their other accounts go with it.

**Use one analogy and keep using it.**
Pick it early (the hotel keycard) and return to it. Don't switch analogies halfway.

**Tell the reader what's coming.**
"In this article, you'll keep meeting four names." "We've split this into 8 steps." Then deliver exactly that.

**Ask the reader's question, then answer it right there.**
"State: what is it?" Answer in a line. If the full answer is long, put it in a hover definition (see section 2).

**Point forward when you postpone something.**
"We'll set that up in the build section below." Never leave a term hanging with no promise.

**Narrate the flow as events, not labels.**
Not "No OAuth yet." Say what actually happens: "Your app has a button called Continue with Google. The user clicks it, and your app takes over."

**Explain each part where it appears.**
When a URL, a token or a field shows up, say in a plain sentence what it is and why it's there: "scope is what you're asking the user for. The basics are name, email and photo. Privileged ones are their calendar or Drive files."

## 2. Hover definitions for unfamiliar terms

Any word a newcomer might not know (PKCE, state, scope, JWT, redirect URI) gets a dotted underline. Hovering it opens a small dialog box with the definition. It is not a tooltip: the box stays open while the pointer is over it, so the reader can read it and click inside.

**Every definition has three parts:**
1. The term, in its own words ("PKCE").
2. A definition of one to three plain sentences.
3. A link at the end, "Explain PKCE", that opens a Google search for a standard question, for example `explain PKCE. What does PKCE mean in the OAuth authorization code flow?`

**How to add one:**
```html
<span class="term" tabindex="0" data-term="pkce">PKCE</span>
```
and, in the article's script, register it:
```js
window.GLOSSARY = Object.assign(window.GLOSSARY || {}, {
  pkce: { t: "PKCE", d: "Short for Proof Key for Code Exchange...", q: "explain PKCE. What does PKCE mean in the OAuth authorization code flow?" },
});
```
- `t` is the title, `d` the definition, `q` the search query (always include the topic, e.g. "in the OAuth authorization code flow").
- Terms inside generated markup (the walkthrough, tabs) work the same way. The site script listens on the whole document.
- Underline a term the first time it appears in a section, and always in "key parts" lists. Don't underline every repeat.
- Keep `tabindex="0"` so keyboard users can focus it. The dialog also opens on tap.

## 3. Accuracy comes before voice

- A friendly voice never excuses a wrong statement. If a simplification would be wrong, find a simpler true one.
- Get roles right. In OAuth the **resource owner is the end user** (the person whose data it is), the **client is the app**.
- Endpoints, scope names and lifetimes must match the provider's docs.
- Code snippets are Python only. See CLAUDE.md.

## 4. Length

As few words as possible, but never so few that the chain of reasoning breaks. Cut filler. Keep every "because" and "so".

Bullet points in a step: two to four, each one a plain sentence a person would say out loud.

## 5. Quick check before you finish

- Could I read this line aloud to someone across a table without feeling silly?
- Does each paragraph say who does what?
- Is there a "because" wherever the reader might ask "why?"
- Is every unfamiliar term underlined, defined and linked?
- Did I remove "interactive", "simply", "just", "powerful" and any other filler?

*When the user gives more style notes, add them here so the voice stays in one place.*
