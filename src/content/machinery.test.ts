import { describe, expect, it } from "vitest";
import { getVisibleMachineSpecs, machinery, type Machine } from "./machinery";

describe("makine parkuru", () => {
  it("onaylanan beş tezgâhı doğru adetlerle listeler", () => {
    expect(machinery).toHaveLength(5);
    expect(
      machinery.filter((machine) => machine.category === "cnc-lathe"),
    ).toHaveLength(2);
    expect(machinery.map((machine) => machine.name)).toEqual([
      "1300 × 700 mm Dik İşleme Merkezi",
      "CNC Torna",
      "CNC Torna",
      "Manuel Torna",
      "Kalıpçı Frezesi",
    ]);
  });
});

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
