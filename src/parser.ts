import fs from "fs/promises";
import path from "path";
import Papa from "papaparse";

export async function readJsonFile(file: File): Promise<any> {
  const data = await file.text();
  return JSON.parse(data);
}
