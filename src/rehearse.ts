import "@speechdeck/solid/style.css";
import "./app.css";
import { Rehearse } from "@speechdeck/solid";
import { deck } from "./deck.ts";
import { loadEmbed } from "../load-embed.ts";

const app = document.querySelector<HTMLDivElement>("#app");
if (app === null) throw new Error("Missing #app element");
app.replaceChildren(Rehearse({ deck, loadEmbed }) as unknown as Node);
