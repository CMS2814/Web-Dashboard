import path from "path";

import "./styles/style.css";
import { readJsonFile, readCsvFile } from "./parser";
import * as Types from "./types";

const dropZone = document.getElementById("dropzone") as HTMLDivElement | null;

if (dropZone) {
  console.log("Dropzone element found!");
  // 2. Prevent default browser behavior on dragover (CRITICAL!)
  dropZone.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
    dropZone.classList.add("drag-active"); // Optional visual effect
  });

  // 3. Remove active visual state when mouse leaves
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-active");
  });

  // 4. Handle the DROP event
  dropZone.addEventListener("drop", (event: DragEvent) => {
    event.preventDefault(); // Stop browser from navigating to the file
    dropZone.classList.remove("drag-active");

    // Extract files from event.dataTransfer
    const files = event.dataTransfer?.files;

    if (!files || files.length === 0) return;

    const file = files[0]; // Grab the first dropped file
    const fileName = file.name.toLowerCase();

    // 5. Validate file extension (.json or .csv only!)
    if (fileName.endsWith(".json")) {
      console.log("JSON file detected!");
      console.log(readJsonFile(file));
    } else if (fileName.endsWith(".csv")) {
      console.log("CSV file detected!");
      console.log(readCsvFile(file));
    } else {
      alert("Invalid file type, CMS! Please drop a .json or .csv file.");
    }
  });
} else {
  console.error("Dropzone element not found!");
}

console.log("App initialized!");
