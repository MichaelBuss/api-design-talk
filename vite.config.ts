import { speechdeck } from "@speechdeck/vite";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { defineConfig } from "vite";

// @speechdeck/solid ships src/style.css but its package exports only expose ".", so the
// bare `@speechdeck/solid/style.css` the scaffold writes cannot resolve. Alias it to the
// real file until the package exports the subpath.
// https://github.com/MichaelBuss/speechdeck/issues/81
const require = createRequire(import.meta.url);
const solidStyle = resolve(dirname(require.resolve("@speechdeck/solid")), "style.css");

// Inspect is gated (ADR 0014): `pnpm inspect` sets SPEECHDECK_INSPECT=1, so only that
// build (or that dev server) ever registers inspect.html. Default `pnpm dev` / `vite
// build` omit it.
const input: Record<string, string> = {
  main: resolve(import.meta.dirname, "index.html"),
  rehearse: resolve(import.meta.dirname, "rehearse.html"),
};
if (process.env.SPEECHDECK_INSPECT === "1") {
  input.inspect = resolve(import.meta.dirname, "inspect.html");
}

export default defineConfig({
  // parseDeck and Shiki run here, at build time (ADR 0017/0018) — deck.md is transformed
  // into a plain data module, so neither lands in the client bundle.
  plugins: [speechdeck()],
  resolve: {
    alias: { "@speechdeck/solid/style.css": solidStyle },
  },
  build: {
    rollupOptions: {
      input,
    },
  },
});
