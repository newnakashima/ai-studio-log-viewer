import type { LogEntry, Replacement } from "@/types";

export function parseJSONL(text: string): LogEntry[] {
  return text
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => JSON.parse(line) as LogEntry);
}

export function applyReplacements(text: string, replacements: Replacement[]): string {
  let result = text;
  for (const { search, replace } of replacements) {
    if (search) {
      result = result.replaceAll(search, replace);
    }
  }
  return result;
}
