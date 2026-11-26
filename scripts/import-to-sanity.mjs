// One-time import of the invented demo catalogue into Sanity (brands, collections, products).
// Safe to re-run: documents have fixed IDs, so it updates instead of duplicating.
// BUT re-running overwrites any edits made in Studio to these products.
//
// Usage:  node --env-file=.env.local scripts/import-to-sanity.mjs

import { createClient } from "@sanity/client";

import { BRANDS, COLLECTIONS, FEATURED_MODELS, PRODUCTS, productSlug } from "./demo-data.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN (run with --env-file=.env.local)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-11-01",
  token,
  useCdn: false,
});

const key = (i) => `k${i.toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const docs = [
  ...BRANDS.map((b) => ({
    _id: `brand-${b.id}`,
    _type: "brand",
    name: b.name,
    slug: { _type: "slug", current: b.id },
    tagline: b.tagline,
  })),
  ...COLLECTIONS.map((c) => ({
    _id: `collection-${c.id}`,
    _type: "collection",
    title: c.title,
    slug: { _type: "slug", current: c.id },
    description: c.description,
    icon: c.icon,
    order: c.order,
  })),
  ...PRODUCTS.map((p) => ({
    _id: `product-${p.model.toLowerCase()}`,
    _type: "product",
    name: p.name,
    slug: { _type: "slug", current: productSlug(p) },
    model: p.model,
    brand: { _type: "reference", _ref: `brand-${p.brand}` },
    collection: { _type: "reference", _ref: `collection-${p.collection}` },
    category: p.category,
    summary: p.summary,
    illustration: p.illustration,
    featured: FEATURED_MODELS.includes(p.model),
    specs: Object.entries(p.specs).map(([label, value], i) => ({ _key: key(i), _type: "spec", label, value })),
    variants: p.variants.map((v, i) => ({ _key: key(i), _type: "variant", label: v.label, model: v.model })),
    priceOnRequest: p.price == null,
    ...(p.price == null ? {} : { price: p.price }),
    unit: p.unit,
  })),
];

// Send in batches so one transaction never gets too big.
const BATCH = 50;
for (let i = 0; i < docs.length; i += BATCH) {
  const tx = client.transaction();
  docs.slice(i, i + BATCH).forEach((d) => tx.createOrReplace(d));
  await tx.commit({ visibility: "async" });
  console.log(`Imported ${Math.min(i + BATCH, docs.length)} / ${docs.length}`);
}
console.log(`Done: ${BRANDS.length} brands, ${COLLECTIONS.length} collections, ${PRODUCTS.length} products.`);
