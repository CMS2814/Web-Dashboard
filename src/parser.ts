import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";

import * as Types from "./types";

export async function readJsonFile(file: File): Promise<any> {
  const data = await file.text();
  return JSON.parse(data);
}

export async function readCsvFile(file: File): Promise<any> {
  const result = Papa.parse(await file.text(), {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  console.log(result.data);
  return result.data;
}
