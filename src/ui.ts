import * as Types from "./types";
import Chart from "chart.js/auto";

const ordersListContainer = document.getElementById(
  "order-list",
) as HTMLDivElement | null;

let orderChart: Chart | null = null;

export function renderOrderChart() {
  const orderChartContainer = document.getElementById(
    "order-chart",
  ) as HTMLCanvasElement;
  if (!orderChartContainer) return;

  if (orderChart) {
    console.log("There's an existing chart");
  }

  new Chart(orderChartContainer, {
    type: "doughnut",
    data: {
      labels: ["red", "yellow", "blue"],
      datasets: [{ data: [10, 20, 30] }],
    },
    options: {},
  });
}

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

export function displayAnalytics(analytics?: any) {
  console.log("Analytics data:", analytics);
  const totalOrdersElement = document.getElementById("order-count");
  const totalRevenueElement = document.getElementById("revenue-count");
  const statusCountElement = document.getElementById("status-count");

  if (!analytics || Object.keys(analytics).length === 0) {
    if (totalOrdersElement) {
      totalOrdersElement.textContent = "";
    }

    if (totalRevenueElement) {
      totalRevenueElement.textContent = `$${99.99}`;
    }

    if (statusCountElement) {
      statusCountElement.textContent = `🟢${99} 🟡${99} 🔴${99}`;
    }
    return;
  }

  if (totalOrdersElement) {
    totalOrdersElement.textContent = `${analytics.totalOrders}`;
  }

  if (totalRevenueElement) {
    totalRevenueElement.textContent = `$${analytics.totalRevenue.toFixed(2)}`;
  }

  if (statusCountElement) {
    statusCountElement.textContent = `🟢${analytics.statusTotals.completed} 🟡${analytics.statusTotals.pending} 🔴${analytics.statusTotals.refunded}`;
  }
}
