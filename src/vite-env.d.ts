/// <reference types="vite/client" />

// @speechdeck/vite transforms deck.md into this shape at build time (ADR 0017/0018);
// parseDeck and Shiki never run in the client's module graph.
declare module "*.md" {
  import type { Deck, Diagnostic } from "@speechdeck/core";

  export const deck: Deck;
  export const diagnostics: readonly Diagnostic[];
}
