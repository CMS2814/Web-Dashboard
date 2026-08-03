import * as Types from "./types";
import fs from "fs/promises";

function validateData(payloadOrders: Types.Order[]) {
  const currentOrders = loadOrders();
  let validOrders: Types.Order[] = currentOrders ? [...currentOrders] : [];

  if (!currentOrders || currentOrders.length === 0) {
    return payloadOrders;
  }

  payloadOrders.forEach((order, index) => {
    if (!currentOrders.includes(order)) {
      validOrders.push(payloadOrders[index]);
    }
  });

  const existingIds = new Set(currentOrders.map((order) => order.id));
  const newOrders = payloadOrders.filter((order) => !existingIds.has(order.id));

  return [...currentOrders, ...newOrders];
}

export function loadOrders(): Types.Order[] | null {
  const orders = localStorage.getItem("orders");

  if (!orders) return null;

  try {
    return JSON.parse(orders);
  } catch (err) {
    console.error("Failed to parse orders from localStorage:", err);
    return null;
  }
}

export function saveOrders(orders: Types.Order[]) {
  const validOrders = validateData(orders);
  localStorage.setItem("orders", JSON.stringify(validOrders));
}

export function clearOrders() {
  localStorage.removeItem("orders");
}

export function clearAnalytics() {
  localStorage.removeItem("analytics");
}
