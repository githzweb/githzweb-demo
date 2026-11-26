// Rule-based product-list cleaner for the "Excel → catalogue" demo tool.
// Runs entirely in the browser: the uploaded file never leaves the visitor's computer.

export type CleanVariant = { label: string; code: string; price: number | null; priceOnRequest: boolean; row: number };
export type CleanProduct = {
  name: string;
  category: string;
  unit: string;
  variants: CleanVariant[];
};
export type Issue = { row: number; kind: "duplicate" | "missing-price" | "no-code" | "uncategorised" | "review" | "price-conflict"; message: string };
export type CleanResult = {
  headerRow: string[];
  rawRows: string[][];
  products: CleanProduct[];
  issues: Issue[];
  stats: {
    rowsIn: number;
    emptySkipped: number;
    products: number;
    variants: number;
    duplicatesRemoved: number;
    priceOnRequest: number;
    missingPrice: number;
    codesGenerated: number;
    categorised: number;
  };
};

const HEADER_RULES: [keyof Cols, RegExp][] = [
  ["code", /\b(item\s*code|code|sku|model|kod|part\s*no)\b/i],
  ["name", /\b(desc|description|name|product|item|nama|barang)\b/i],
  ["price", /\b(price|harga|rm|cost|rate)\b/i],
  ["unit", /\b(uom|unit|per|pack)\b/i],
  ["category", /\b(cat|category|kategori|group)\b/i],
];
type Cols = { code?: number; name?: number; price?: number; unit?: number; category?: number };

const ACRONYMS = new Set(["PVC", "LED", "MCB", "RCCB", "USB", "PPR", "VDE", "SDS", "PTFE", "DB", "HDPE", "ABS", "UK", "IP65", "FFP2", "AC", "DC", "EPDM", "SWA"]);
const SMALL = new Set(["x", "and", "with", "for", "of", "or", "in", "to"]);

export const CATEGORY_RULES: [string, RegExp][] = [
  ["Power Tools", /\b(drill|grinder|saw|jigsaw|impact|rotary|battery|charger|heat gun|cordless)\b/i],
  ["Hand Tools", /\b(hammer|wrench|spanner|plier|screwdriver|tape|level|knife|socket set)\b/i],
  ["Fasteners & Fixings", /\b(bolt|screw|nut|washer|plug|anchor|rivet|nail|rod)\b/i],
  ["Plumbing", /\b(pipe|valve|tap|elbow|tee|fitting|ptfe|sealant|pump|ppr)\b/i],
  ["Electrical", /\b(cable|mcb|rccb|switch|socket|breaker|conduit|led|reel|wire)\b/i],
  ["Safety & PPE", /\b(helmet|glove|gloves|goggle|glasses|vest|boot|boots|ear|mask)\b/i],
];

const SIZE_RULES: { re: RegExp; label: (m: RegExpMatchArray) => string }[] = [
  { re: /\bm\s?(\d+)\s*x\s*(\d+)\b/i, label: (m) => `M${m[1]} × ${m[2]}` },
  { re: /\b(\d+(?:\.\d+)?)\s*mm(?:2|²)\b/i, label: (m) => `${m[1]} mm²` },
  { re: /(?:^|\s)(\d+\/\d+|\d+)\s*(?:"|''|inch)(?=\s|$)/i, label: (m) => `${m[1]}"` },
  { re: /\buk\s*(\d{1,2})\b/i, label: (m) => `UK ${m[1]}` },
  { re: /\bsize\s+(xs|s|m|l|xl|xxl)\b/i, label: (m) => m[1].toUpperCase() },
  { re: /\b(\d+)\s*a\b(?=.*\btype\b)/i, label: (m) => `${m[1]}A` },
  { re: /\b(\d+(?:\.\d+)?)\s*mm\b/i, label: (m) => `${m[1]} mm` },
  { re: /\s-\s*(white|yellow|blue|red|black|green|orange|grey)\s*$/i, label: (m) => m[1][0].toUpperCase() + m[1].slice(1).toLowerCase() },
];

const UNIT_WORDS = new Set(["mm", "m", "oz", "kg", "l", "mm²", "cm"]);

/** Spelling fixes applied before anything else: "gr8.8" / "gr 8.8" → "grade 8.8". */
const preNormalise = (s: string) => s.replace(/\bgr\.?\s?(\d)/gi, "grade $1").replace(/\btype\s?c\b/gi, "type C");

const tidy = (s: string) => s.replace(/\s+/g, " ").replace(/\s*-\s*$/, "").replace(/\(\s*\)/g, "").trim();

/** "18v cordless DRILL driver" → "18V Cordless Drill Driver" */
export function titleCase(raw: string) {
  return tidy(raw)
    .split(" ")
    .map((w, i, arr) => {
      const bare = w.replace(/[^a-z0-9.\/"]/gi, "");
      const up = bare.toUpperCase();
      if (ACRONYMS.has(up)) return w.toUpperCase();
      // number + unit: 750w → 750W, 18v → 18V, 16oz → 16 oz, 100mm → 100 mm
      const nu = w.match(/^(\d+(?:\.\d+)?)(v|w|a|kg|oz|m|mm|l)$/i);
      if (nu) {
        const u = nu[2].toLowerCase();
        return ["v", "w", "a"].includes(u) ? `${nu[1]}${u.toUpperCase()}` : `${nu[1]} ${u}`;
      }
      if (/\d/.test(w)) return w.toUpperCase().replace(/MM\b/, "mm");
      if (i > 0 && UNIT_WORDS.has(w.toLowerCase()) && /\d$/.test(arr[i - 1] ?? "")) return w.toLowerCase();
      if (i > 0 && SMALL.has(w.toLowerCase())) return w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

export function parsePrice(raw: string): { price: number | null; onRequest: boolean } {
  const s = String(raw ?? "").trim().toLowerCase();
  if (!s || s === "-" || s === "?" ) return { price: null, onRequest: false };
  if (/^(poa|tbc|call|ask|request)/.test(s)) return { price: null, onRequest: true };
  const n = Number(s.replace(/rm|myr|,|\s/g, ""));
  return Number.isFinite(n) && n >= 0 ? { price: Math.round(n * 100) / 100, onRequest: false } : { price: null, onRequest: false };
}

export function guessCategory(text: string) {
  return CATEGORY_RULES.find(([, re]) => re.test(text))?.[0] ?? "";
}

function splitSize(name: string): { base: string; size: string } {
  for (const r of SIZE_RULES) {
    const m = name.match(r.re);
    if (m) {
      const base = tidy(name.replace(m[0], " ").replace(/\s+-\s+/g, " "));
      return { base, size: r.label(m) };
    }
  }
  return { base: tidy(name), size: "" };
}

function detectColumns(header: string[]): Cols {
  const cols: Cols = {};
  header.forEach((h, i) => {
    for (const [key, re] of HEADER_RULES) {
      if (cols[key] === undefined && re.test(h)) {
        cols[key] = i;
        return;
      }
    }
  });
  return cols;
}

const normUnit = (u: string) => {
  const s = tidy(u).toLowerCase();
  if (!s) return "unit";
  if (/^(pcs?|pc|unit|nos?)$/.test(s)) return "unit";
  const pack = s.match(/^(box|pkt|pack|packet)\s*\/?\s*(\d+)$/);
  if (pack) return `${pack[1] === "pkt" ? "pack" : pack[1]} of ${pack[2]}`;
  return s;
};

export function cleanRows(rows: unknown[][]): CleanResult {
  const str = (v: unknown) => (v == null ? "" : String(v)).trim();
  const all = rows.map((r) => r.map(str));
  const headerIdx = Math.max(0, all.findIndex((r) => r.filter(Boolean).length >= 2));
  const header = all[headerIdx] ?? [];
  const cols = detectColumns(header);
  if (cols.name === undefined) cols.name = header.findIndex((_, i) => i !== cols.code && i !== cols.price) ?? 0;

  const body = all.slice(headerIdx + 1);
  const issues: Issue[] = [];
  const seenCodes = new Map<string, CleanVariant>();
  const groups = new Map<string, CleanProduct>();
  let emptySkipped = 0;
  let duplicatesRemoved = 0;
  let codesGenerated = 0;
  let gen = 0;

  body.forEach((r, i) => {
    const rowNo = headerIdx + i + 2; // spreadsheet row number (1-based, after header)
    if (!r.some(Boolean)) {
      emptySkipped++;
      return;
    }
    const rawName = r[cols.name!] ?? "";
    let code = (cols.code !== undefined ? r[cols.code] : "").toUpperCase().replace(/\s+/g, "");
    const { price, onRequest } = parsePrice(cols.price !== undefined ? r[cols.price] : "");
    const unit = normUnit(cols.unit !== undefined ? r[cols.unit] : "");

    const pretty = titleCase(preNormalise(rawName).replace(/\(([^)]*)\)/g, " - $1"));
    const { base, size } = splitSize(pretty);
    const baseName = titleCase(base);

    if (rawName.length < 4 || /\b(misc|ask boss|unknown)\b/i.test(rawName)) {
      issues.push({ row: rowNo, kind: "review", message: `“${rawName || "(no name)"}” is unclear, so it was left out for a human to check.` });
      return;
    }

    if (code && seenCodes.has(code)) {
      const first = seenCodes.get(code)!;
      duplicatesRemoved++;
      if (first.price !== price && price != null && first.price != null) {
        issues.push({ row: rowNo, kind: "price-conflict", message: `${code} appears twice with different prices (RM${first.price} vs RM${price}). Kept the first.` });
      } else {
        issues.push({ row: rowNo, kind: "duplicate", message: `${code} is a duplicate of row ${first.row}, so it was merged.` });
      }
      return;
    }
    if (!code) {
      code = `NEW-${String(++gen).padStart(3, "0")}`;
      codesGenerated++;
      issues.push({ row: rowNo, kind: "no-code", message: `“${baseName}${size ? ` ${size}` : ""}” had no item code, so ${code} was assigned.` });
    }
    if (price == null && !onRequest) {
      issues.push({ row: rowNo, kind: "missing-price", message: `${code} has no price. Shown as “Ask for price” until filled in.` });
    }

    const variant: CleanVariant = { label: size || "Standard", code, price, priceOnRequest: onRequest || price == null, row: rowNo };
    seenCodes.set(code, variant);

    const key = `${baseName.toLowerCase()}|${unit}`;
    let prod = groups.get(key);
    if (!prod) {
      const category = (cols.category !== undefined && r[cols.category]) || guessCategory(`${baseName} ${rawName}`);
      if (!category) issues.push({ row: rowNo, kind: "uncategorised", message: `Couldn't tell the category of “${baseName}”.` });
      prod = { name: baseName, category: category || "Uncategorised", unit, variants: [] };
      groups.set(key, prod);
    }
    // same product + same size without codes = duplicate
    if (prod.variants.some((v) => v.label === variant.label && variant.label !== "Standard")) {
      duplicatesRemoved++;
      issues.push({ row: rowNo, kind: "duplicate", message: `${prod.name} ${variant.label} is listed twice, so it was merged.` });
      return;
    }
    prod.variants.push(variant);
  });

  const products = [...groups.values()].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  const variants = products.flatMap((p) => p.variants);
  return {
    headerRow: header,
    rawRows: body,
    products,
    issues: issues.sort((a, b) => a.row - b.row),
    stats: {
      rowsIn: body.length,
      emptySkipped,
      products: products.length,
      variants: variants.length,
      duplicatesRemoved,
      priceOnRequest: variants.filter((v) => v.priceOnRequest && v.price == null).length,
      missingPrice: issues.filter((i) => i.kind === "missing-price").length,
      codesGenerated,
      categorised: products.filter((p) => p.category !== "Uncategorised").length,
    },
  };
}
