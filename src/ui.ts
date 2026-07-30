import * as Types from "./types";

const ordersListContainer = document.getElementById(
  "order-list",
) as HTMLDivElement | null;

export function makeOrder(order: Types.Order) {
  if (!ordersListContainer) return;

  console.log("Rendering orders...");
  const orderInfo = document.createElement("div");
  orderInfo.className = "order";

  const orderId = document.createElement("h1");
  orderId.textContent = `Order ID: ${order.id}`;

  orderInfo.appendChild(orderId);
  ordersListContainer.appendChild(orderInfo);
}
