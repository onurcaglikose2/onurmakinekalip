import { randomInt } from "node:crypto";

export function createQuoteId(date = new Date()) {
  const year = date.getFullYear();
  const sequence = randomInt(0, 1_000_000).toString().padStart(6, "0");
  return `OMK-${year}-${sequence}`;
}
