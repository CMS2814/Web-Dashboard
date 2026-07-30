import path from "path";
import fs from "fs/promises";

import "./styles/style.css";

import { readJsonFile, readCsvFile } from "./parser";
import * as Types from "./types";

import { makeOrder } from "./ui";

import * as Storage from "./storage";

const dropZone = document.getElementById("dropzone") as HTMLDivElement | null;
const ordersListContainer = document.getElementById(
  "order-list",
) as HTMLDivElement | null;
const selectFileBtn = document.getElementById(
  "selectFileBtn",
) as HTMLButtonElement | null;
const fileInput = document.getElementById(
  "fileinput",
) as HTMLInputElement | null;

function loadOrders() {
  const ordersData = Storage.loadOrders();
  if (ordersListContainer) {
    ordersListContainer.innerHTML = "";
  }
  if (ordersData) {
    for (const order of ordersData) {
      makeOrder(order);
    }
  }
}

function RenderOrders() {
  const ordersData = Storage.loadOrders();

  if (ordersData) {
    for (const order of ordersData) {
      makeOrder(order);
    }
  }
}

async function handleFiles(files: FileList | null): Promise<void> {
  if (!files || files.length === 0) return;

  const file = files[0];
  console.log(`Processing selected file: ${file.name}`);
  const fileName = file.name.toLowerCase();

  let orders: Types.Order[] = [];

  if (fileName.endsWith(".json")) {
    console.log("JSON file detected!");
    orders = await readJsonFile(file);
  } else if (fileName.endsWith(".csv")) {
    console.log("CSV file detected!");
    orders = await readCsvFile(file);
  } else {
    alert("Invalid file type, CMS! Please drop a .json or .csv file.");
  }

  Storage.saveOrders(orders);

  /*const savedOrders = Storage.loadOrders();

  if (savedOrders) {
    for (const order of savedOrders) {
      renderOrders(order);
      console.log(order.id);
    }
  }*/
}

dropZone?.addEventListener("dragover", (e) => e.preventDefault());

dropZone?.addEventListener("drop", async (e: DragEvent) => {
  e.preventDefault();
  await handleFiles(e.dataTransfer?.files || null);
  loadOrders();
});

selectFileBtn?.addEventListener("click", () => fileInput?.click());

fileInput?.addEventListener("change", async () => {
  if (fileInput?.files) {
    await handleFiles(fileInput.files);
    loadOrders();
  }

  fileInput.value = "";
});

loadOrders();
//Storage.clearOrders();

console.log("App initialized!");
