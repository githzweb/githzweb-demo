// Creates public/samples/messy-product-list.xlsx (+ .csv): a deliberately messy price list,
// like the ones suppliers actually send, for visitors to try in the importer tool.
// Usage: node scripts/make-sample-sheet.mjs

import { mkdirSync, writeFileSync } from "node:fs";

import * as XLSX from "xlsx";

const rows = [
  ["Item Code", "Item Description", "Harga (RM)", "UOM", "Remarks"],
  ["kt-dd18", "18v cordless DRILL driver (body only)", "RM 289", "pcs", ""],
  ["KT-DD18", "18V Cordless Drill Driver - body only", "289.00", "PCS", "duplicate row from old list"],
  ["kt-ag100", "angle grinder 100mm 750w", "rm139", "pcs", ""],
  ["", "Angle Grinder 125MM 1200W", "229", "pcs", "no code yet"],
  ["BP-CH16", "  claw hammer   16oz  ", "39", "pcs", ""],
  ["BP-AW8", "adjustable wrench 8\"", "35", "pcs", ""],
  ["BP-AW10", "adjustable wrench 10\"", "42", "pcs", ""],
  ["BP-AW12", "Adjustable Wrench 12\"", "", "pcs", "price?"],
  ["PM-HB88-0840", "hex bolt gr 8.8 zinc M8 x 40", "POA", "box/50", ""],
  ["PM-HB88-1050", "HEX BOLT GR 8.8 ZINC M10x50", "poa", "box/50", ""],
  ["PM-HB88-1260", "hex bolt gr8.8 zinc m12 x 60", "-", "box/50", ""],
  ["PM-WP-06", "wall plug nylon 6mm", "6", "pkt/100", ""],
  ["PM-WP-08", "wall plug nylon 8mm", "6.00", "pkt/100", ""],
  ["PM-WP-10", "Wall Plug Nylon 10MM", "RM6", "pkt/100", ""],
  ["AF-BV-15", "ball valve brass lever 1/2\"", "22", "pcs", ""],
  ["AF-BV-20", "ball valve brass lever 3/4\"", "26.5", "pcs", ""],
  ["AF-BV-25", "ball valve brass lever 1\"", "RM 34.90", "pcs", ""],
  ["AF-PP-15", "pvc pipe class d 1/2\" 6m", "", "length", "check supplier"],
  ["AF-PP-20", "pvc pipe class d 3/4\" 6m", "", "length", ""],
  ["AE-SC-15", "single core cable 1.5mm2 100m roll", "POA", "roll", ""],
  ["AE-SC-25", "single core cable 2.5mm2 100m roll", "POA", "roll", ""],
  ["AE-MCB-10", "MCB 1P 10A type C", "12", "pcs", ""],
  ["AE-MCB-16", "mcb 1p 16a type c", "12", "pcs", ""],
  ["AE-MCB-16", "MCB 1P 16A Type C", "12.00", "pcs", "dup"],
  ["AE-SK1", "13a switched socket single", "9.9", "pcs", ""],
  ["SG-HR-WH", "safety helmet ratchet - white", "18", "pcs", ""],
  ["SG-HR-YL", "safety helmet ratchet - yellow", "18", "pcs", ""],
  ["SG-NG-M", "nitrile gloves size M", "4.5", "pair", ""],
  ["SG-NG-L", "nitrile gloves size L", "4.50", "pair", ""],
  ["SG-SB-08", "safety boot steel toe UK8", "89", "pair", ""],
  ["SG-SB-09", "safety boot steel toe uk 9", "89", "pair", ""],
  ["", "", "", "", ""],
  ["XX-001", "misc item - ask boss", "", "", "unclear"],
];

const ws = XLSX.utils.aoa_to_sheet(rows);
ws["!cols"] = [{ wch: 14 }, { wch: 40 }, { wch: 11 }, { wch: 9 }, { wch: 26 }];
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Price list 2026");

mkdirSync("public/samples", { recursive: true });
writeFileSync("public/samples/messy-product-list.xlsx", XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
writeFileSync("public/samples/messy-product-list.csv", XLSX.utils.sheet_to_csv(ws));
console.log(`Wrote ${rows.length - 1} rows to public/samples/messy-product-list.{xlsx,csv}`);
