import path from "path";
import fs from "fs/promises";

import "./styles/style.css";

import { readJsonFile, readCsvFile } from "./parser";
import * as Types from "./types";

import { renderOrders } from "./ui";

const dropZone = document.getElementById("dropzone") as HTMLDivElement | null;

if (dropZone) {
  console.log("Dropzone element found!");
  dropZone.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
    dropZone.classList.add("drag-active");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-active");
  });

  dropZone.addEventListener("drop", async (event: DragEvent) => {
    event.preventDefault();
    dropZone.classList.remove("drag-active");

    const files = event.dataTransfer?.files;

    if (!files || files.length === 0) return;

    const file = files[0];
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

    if (orders) {
      for (const order of orders) {
        renderOrders(order);
        console.log(order.id);
      }
    }
  });
} else {
  console.error("Dropzone element not found!");
}

console.log("App initialized!");
