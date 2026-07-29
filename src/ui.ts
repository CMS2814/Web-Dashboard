import * as Types from "./types";

const ordersListContainer = document.getElementById(
  "order-list",
) as HTMLDivElement | null;

export function renderOrders(order: Types.Order) {
  if (ordersListContainer) {
    console.log("Rendering orders...");
    const order = document.createElement("div");
    order.className = "order";

    const orderId = document.createElement("h1");
    orderId.textContent = `Order ID: ${order.id}`;

    order.appendChild(orderId);
    ordersListContainer.appendChild(order);
  }
}
