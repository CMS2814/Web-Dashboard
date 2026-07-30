import path from "path";
import fs from "fs/promises";

import "./styles/style.css";

import { readJsonFile, readCsvFile } from "./parser";
import * as Types from "./types";

import { renderOrders } from "./ui";

import * as Storage from "./storage";

const dropZone = document.getElementById("dropzone") as HTMLDivElement | null;
const selectFileBtn = document.getElementById(
  "selectFileBtn",
) as HTMLButtonElement | null;
const fileInput = document.getElementById(
  "fileinput",
) as HTMLInputElement | null;

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

  const savedOrders = Storage.loadOrders();

  if (savedOrders) {
    for (const order of savedOrders) {
      renderOrders(order);
      console.log(order.id);
    }
  }
}

dropZone?.addEventListener("dragover", (e) => e.preventDefault());

dropZone?.addEventListener("drop", (e: DragEvent) => {
  handleFiles(e.dataTransfer?.files || null);
  e.preventDefault();
});

selectFileBtn?.addEventListener("click", () => fileInput?.click());

fileInput?.addEventListener("change", () => {
  if (fileInput?.files) {
    handleFiles(fileInput.files);
  }

  fileInput.value = "";
});

console.log("App initialized!");
