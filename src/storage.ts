import * as Types from "./types";

export function saveOrders(orders: Types.Order[]) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function loadOrders(): Types.Order[] | null {
  const orders = localStorage.getItem("orders");
  return orders ? JSON.parse(orders) : null;
}
