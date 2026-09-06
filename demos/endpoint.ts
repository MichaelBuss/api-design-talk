import type { EmbedGuest } from "@speechdeck/core";

// #region shape
type Status =
  | "pending"
  | "shipped"
  | "delivered";

type Money = {
  amount: number;
  currency: string;
};

type Order = {
  id: string;
  status: Status;
  total: Money;
};
// #endregion shape

const ORDERS: readonly Order[] = [
  { id: "ord_7Q2", status: "pending", total: { amount: 4200, currency: "DKK" } },
  { id: "ord_7Q3", status: "shipped", total: { amount: 19995, currency: "DKK" } },
  { id: "ord_7Q4", status: "delivered", total: { amount: 850, currency: "EUR" } },
];

const endpoint: EmbedGuest<HTMLElement> = (el) => {
  let index = 0;

  const request = document.createElement("code");
  const response = document.createElement("pre");
  const next = document.createElement("button");
  next.type = "button";
  next.textContent = "GET the next order";

  const render = () => {
    const order = ORDERS[index];
    if (order === undefined) return;
    request.textContent = `GET /orders/${order.id}`;
    response.textContent = JSON.stringify(order, null, 2);
  };

  next.addEventListener("click", () => {
    index = (index + 1) % ORDERS.length;
    render();
  });
  render();

  el.replaceChildren(request, response, next);

  return {
    dispose: () => el.replaceChildren(),
    ready: Promise.resolve(),
  };
};

export default endpoint;
