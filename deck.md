---
theme: @speechdeck/themes/harbour
appearance: dark
motion: auto
---

# The API is the product

Everything below a heading is Speech — it stays in Presenter view and never reaches the room.

Open with the framing: nobody adopts your service, they adopt the shape of the thing they have to type. The implementation can be rewritten on a quiet Thursday; the API cannot.

---

## Three costs nobody prices in

Walk each cost slowly. The audience only sees the heading and the list — the argument for each one is here, spoken.

<!--on-->
- Every name you pick is a name someone else has to learn
- Every field you expose is a field you can <mark>never</mark> remove
- Every default you choose is a decision made for thousands of people who will never read your docs

---

## A shape you can hold in your head

The point of this slide is the one-screenful rule: if a reader cannot restate your resource after one look, the shape is wrong, not the reader.

```ts ./demos/endpoint.ts#shape
```

---

enter: connected

## A shape you can hold in your head

Now the live one. Same file as the fence you just saw — the code on the Slide and the running Embed cannot drift, because there is only one file.

Click through the orders while you talk. Point at `total` being an object, not a float: the money type is the example everyone has been burned by.

```embed ./demos/endpoint.ts
```

```ts ./demos/endpoint.ts#shape
```

---

## What we will actually do

<!-- Timing check: aim to be here at the 20 minute mark. -->

Set up the rest of the talk. This is the promise you have to keep in the remaining time.

<!--on-->
1. Design one endpoint together, badly
2. Find the four mistakes we just made
3. Fix them without a version bump

---

## Questions

Leave this up. Have the repo URL ready to read out loud.
