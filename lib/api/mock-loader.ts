import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readMockJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(process.cwd(), "lib", "mocks", fileName);
  const file = await readFile(filePath, "utf-8");

  return JSON.parse(file) as T;
}
