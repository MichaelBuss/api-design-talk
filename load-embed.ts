import type { EmbedGuest } from "@speechdeck/core";
import type { LoadEmbed } from "@speechdeck/solid";

// A specifier resolves relative to the Deck (ADR 0006); this module lives beside deck.md
// so the dynamic import below needs no path rewriting to land on the same file.
export const loadEmbed: LoadEmbed = async (specifier) => {
  const mod = (await import(/* @vite-ignore */ specifier)) as {
    default?: EmbedGuest<HTMLElement>;
  };
  if (typeof mod.default !== "function") {
    throw new Error(`Embed "${specifier}" has no default export guest.`);
  }
  return mod.default;
};
