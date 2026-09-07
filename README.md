# API design talk

A conference talk built with [SpeechDeck](https://github.com/MichaelBuss/speechdeck). The
talk is `deck.md`; the runnable examples it shows are in `demos/`.

```sh
pnpm install
pnpm dev        # presenter view — click "Open audience window" for the projector
pnpm inspect    # author view: Layout, Cells and Refuse at a chosen viewport
pnpm typecheck
pnpm build
```

`pnpm dev` serves `/` as Present and `/rehearse.html` as Rehearse (one window, no popup).
`/inspect.html` is registered only when `SPEECHDECK_INSPECT=1` is set, which `pnpm inspect`
does — a default `pnpm dev` 404s it on purpose, so Inspect chrome can never reach a
projector.

## Layout

| Path             | What it is                                                            |
| ---------------- | --------------------------------------------------------------------- |
| `deck.md`        | The talk. Untagged prose is **Speech** — only the speaker sees it.    |
| `demos/`         | **Embed** guests. Each is also the source shown on the Slide.         |
| `src/app.css`    | Composition layout and type scale (see below — this is required).     |
| `src/*.ts`       | One entry point per composition: Present, Rehearse, Inspect.          |
| `load-embed.ts`  | Resolves an Embed specifier to its guest module.                      |

## Deviations from the scaffold

This repo was scaffolded with `@speechdeck/create@0.0.1`, the first published version, and
four changes were needed to get it to run. Each links to the upstream issue; when one is
fixed the local change can go.

1. **JSR dependency specifiers.** The scaffold pinned `@speechdeck/*` to `"0.0.0"`, a bare
   npm range for packages that exist only on JSR, so `pnpm install` 404'd. Changed to
   `jsr:^0.0.1`. ([#80](https://github.com/MichaelBuss/speechdeck/issues/80))

2. **A `style.css` alias in `vite.config.ts`.** `@speechdeck/solid` ships `src/style.css`
   but does not export the subpath, so the `import "@speechdeck/solid/style.css"` the
   scaffold writes cannot resolve.
   ([#81](https://github.com/MichaelBuss/speechdeck/issues/81))

3. **`src/app.css`.** The engine CSS paints a Slide's interior but ships nothing for the
   Present/Rehearse compositions, gives the page no height, and sets no font sizes. Without
   this file the presenter view collapses to ~109px, the previews paint unscaled on top of
   each other, and the audience window shows a zero-height Slide — white text on white.
   ([#82](https://github.com/MichaelBuss/speechdeck/issues/82),
   [#83](https://github.com/MichaelBuss/speechdeck/issues/83))

4. **A working typecheck.** Added `@types/node`, a `typecheck` script, and `demos/` +
   `vite.config.ts` to `tsconfig.json`, none of which the scaffold included — so the Embed
   guest and the Vite config were both outside the type program.
   ([#89](https://github.com/MichaelBuss/speechdeck/issues/89))

See `AGENTS.md` for the authoring gotchas, which are worth reading before touching
`deck.md`.
