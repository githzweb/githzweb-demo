// Turns two Lighthouse JSON reports (old "before" page vs new home page) into the numbers
// and phone screenshots shown on /rebuild. Every number on that page comes from here.
//
// Usage: node scripts/extract-lighthouse.mjs <lh-before.json> <lh-after.json>

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const [beforePath, afterPath] = process.argv.slice(2);
if (!beforePath || !afterPath) {
  console.error("Usage: node scripts/extract-lighthouse.mjs <lh-before.json> <lh-after.json>");
  process.exit(1);
}

function pick(path, name) {
  const r = JSON.parse(readFileSync(path, "utf8"));
  const a = r.audits;
  const shot = a["final-screenshot"]?.details?.data; // data:image/jpeg;base64,...
  if (shot) {
    mkdirSync("public/rebuild", { recursive: true });
    writeFileSync(`public/rebuild/${name}.jpg`, Buffer.from(shot.split(",")[1], "base64"));
  }
  const score = (k) => Math.round((r.categories[k]?.score ?? 0) * 100);
  return {
    url: r.finalDisplayedUrl ?? r.finalUrl,
    fetchTime: r.fetchTime,
    performance: score("performance"),
    accessibility: score("accessibility"),
    bestPractices: score("best-practices"),
    seo: score("seo"),
    lcpSeconds: Math.round((a["largest-contentful-paint"]?.numericValue ?? 0) / 100) / 10,
    fcpSeconds: Math.round((a["first-contentful-paint"]?.numericValue ?? 0) / 100) / 10,
    pageWeightKb: Math.round((a["total-byte-weight"]?.numericValue ?? 0) / 1024),
    requests: a["network-requests"]?.details?.items?.length ?? null,
  };
}

const out = {
  measuredWith: "Lighthouse (mobile, simulated slow 4G), run by githzweb",
  before: pick(beforePath, "before"),
  after: pick(afterPath, "after"),
};
mkdirSync("content", { recursive: true });
writeFileSync("content/rebuild-measurements.json", JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
