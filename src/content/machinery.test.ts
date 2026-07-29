import { describe, expect, it } from "vitest";
import { getVisibleMachineSpecs, machinery, type Machine } from "./machinery";

describe("getVisibleMachineSpecs", () => {
  it("eksik teknik alanları arayüz verisinden çıkarır", () => {
    expect(getVisibleMachineSpecs(machinery[0])).toEqual([]);
  });

  it("dolu teknik alanları ve hareket mesafesini gösterir", () => {
    const machine: Machine = {
      ...machinery[0],
      brand: "Örnek",
      axes: 3,
      travel: { x: 1000, y: 500 },
    };
    expect(getVisibleMachineSpecs(machine)).toEqual(
      expect.arrayContaining([
        { label: "Marka", value: "Örnek" },
        { label: "Eksen", value: "3" },
        { label: "Hareket mesafesi", value: "X: 1000 mm · Y: 500 mm" },
      ]),
    );
  });
});
