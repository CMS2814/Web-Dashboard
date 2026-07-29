import * as Types from "./types";

const ordersListContainer = document.getElementById(
  "orderlist",
) as HTMLDivElement | null;

export function renderOrders(order: Types.Order) {
  if (ordersListContainer) {
    const order = document.createElement("div");
    order.className = "order";

    const orderId = document.createElement("h1");
    orderId.textContent = `Order ID: ${order.id}`;
  }
}
