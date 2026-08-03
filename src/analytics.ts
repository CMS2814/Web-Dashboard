import * as Types from "./types";

function validateData(payloadOrders: Types.Order[]) {
  const orders = localStorage.getItem("orders");
  const currentOrders = orders ? JSON.parse(orders) : [];
  let validOrders: Types.Order[] = [];

  for (const order of payloadOrders) {
    if (!currentOrders.includes(order)) {
      validOrders.push(order);
    }
  }
  return validOrders;
}

export function calculateAnalytics(orders: Types.Order[]): {
  totalOrders: number;
  totalRevenue: number;
  categoryTotals: Record<string, number>;
  statusTotals: Record<string, number>;
} {
  if (!orders || orders.length === 0) {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      categoryTotals: {},
      statusTotals: { completed: 0, pending: 0, refunded: 0 },
    };
  }

  let totalRevenue = 0;
  let totalOrders = orders.length;
  let categoryTotals: Record<string, number> = {};
  let statusTotals: Record<string, number> = {};

  for (const order of orders) {
    if (order.status.toLowerCase() !== "refunded") {
      totalRevenue += Number(order.amount);

      categoryTotals[order.category] =
        (categoryTotals[order.category] || 0) + 1;
    }
    statusTotals[order.status] = (statusTotals[order.status] || 0) + 1;
  }

  const analyticsData = {
    totalOrders,
    totalRevenue,
    categoryTotals,
    statusTotals,
  };

  return analyticsData;
}
