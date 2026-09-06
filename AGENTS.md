# AGENTS

This repo is a single SpeechDeck **Deck**: `deck.md` is the talk, `demos/` holds the live
**Embed** guests, and `src/` holds the three composition entry points (Present, Rehearse,
Inspect). There is no app to build beyond that.

## Read these before editing the Deck

`@speechdeck/core` ships its authoring documentation as Agent Skills inside `node_modules`.
Read the file directly — nothing in this project loads them automatically:

- `node_modules/@speechdeck/core/skills/deck/SKILL.md` — Deck and Slide Frontmatter, Cells
  vs Speech, Promotion, the auto Layout pick, and the Lint kinds. Read before editing
  `deck.md`.
- `node_modules/@speechdeck/core/skills/embed/SKILL.md` — the `EmbedGuest` contract, the
  `embed` fence, and pairing a guest to its code Cell. Read before editing `demos/`.

Two corrections to those skills, both verified against 0.0.1:

- Slide Frontmatter is **bare keys ended by a blank line**, with no closing `---`. The
  fenced form the `deck` skill shows creates an extra empty Slide and drops your `enter:`
  ([speechdeck#86](https://github.com/MichaelBuss/speechdeck/issues/86)).
- The `theme:` specifier must be **unquoted**. Quoting it — as the SpeechDeck README does —
  throws, because the quotes end up inside the specifier
  ([speechdeck#85](https://github.com/MichaelBuss/speechdeck/issues/85)).

## Gotchas that cost time once already

- `<!--on-->` must be on the line **immediately** before the block it promotes. A blank
  line in between silently leaves the block as Speech, with no Lint
  ([speechdeck#90](https://github.com/MichaelBuss/speechdeck/issues/90)).
- Never put a bare `---` inside a fenced code block. It splits the Deck in two, silently —
  so a YAML or OpenAPI sample has to be indented or reworded
  ([speechdeck#84](https://github.com/MichaelBuss/speechdeck/issues/84)).
- `src/app.css` is load-bearing, not decoration. It supplies the page height, the
  Present/Rehearse layout, and the whole type scale, none of which `@speechdeck/solid`
  ships yet ([speechdeck#82](https://github.com/MichaelBuss/speechdeck/issues/82),
  [speechdeck#83](https://github.com/MichaelBuss/speechdeck/issues/83)). Deleting it makes
  the audience window paint a zero-height Slide.

## Checks

```sh
pnpm typecheck   # tsc over src, demos, load-embed.ts, vite.config.ts
pnpm build       # also the only check that the Deck parses
```

`pnpm build` is the real smoke test: `parseDeck` runs in the Vite plugin at build time, so a
broken Deck fails the build rather than the browser.
