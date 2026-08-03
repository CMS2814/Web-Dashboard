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
