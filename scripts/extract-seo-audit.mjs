// Pulls the specific findings used on /seo-report out of the Lighthouse reports.
// Usage: node scripts/extract-seo-audit.mjs <lh-before.json> <lh-after.json>

import { readFileSync, writeFileSync } from "node:fs";

const [bp, ap] = process.argv.slice(2);
const before = JSON.parse(readFileSync(bp, "utf8")).audits;
const after = JSON.parse(readFileSync(ap, "utf8")).audits;

const kb = (a) => Math.round((a?.details?.overallSavingsBytes ?? 0) / 1024);
const pct = (a) => {
  const m = String(a?.displayValue ?? "").match(/([\d.]+)%/);
  return m ? Math.round(Number(m[1])) : null;
};

const out = {
  imageFormatSavingsKb: kb(before["modern-image-formats"]),
  imageResizeSavingsKb: kb(before["uses-responsive-images"]),
  legibleTextBefore: pct(before["font-size"]),
  legibleTextAfter: pct(after["font-size"]),
  contrastIssuesBefore: before["color-contrast"]?.details?.items?.length ?? 0,
  contrastIssuesAfter: after["color-contrast"]?.details?.items?.length ?? 0,
  unsizedImagesBefore: before["unsized-images"]?.details?.items?.length ?? 0,
  unsizedImagesAfter: after["unsized-images"]?.details?.items?.length ?? 0,
};
writeFileSync("content/seo-audit.json", JSON.stringify(out, null, 2) + "\n");
console.log(out);
