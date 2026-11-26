// Reads the demo catalogue from Sanity at build time (the site is a static export).

import { client } from "@/sanity/lib/client";

export type Spec = { label: string; value: string };
export type Variant = { label: string; model?: string };

export type Product = {
  _id: string;
  name: string;
  slug: string;
  model: string;
  category?: string;
  summary?: string;
  illustration?: string;
  featured?: boolean;
  price?: number;
  priceOnRequest?: boolean;
  unit?: string;
  specs: Spec[];
  variants: Variant[];
  brand?: { name: string; slug: string };
  collection: { title: string; slug: string };
};

export type Collection = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  count: number;
};

export type Brand = { name: string; slug: string; tagline?: string };

const PRODUCT_FIELDS = `
  _id, name, "slug": slug.current, model, category, summary, illustration, featured,
  price, priceOnRequest, unit,
  "specs": coalesce(specs[]{label, value}, []),
  "variants": coalesce(variants[]{label, model}, []),
  "brand": brand->{name, "slug": slug.current},
  "collection": collection->{title, "slug": slug.current}
`;

export function getProducts() {
  return client.fetch<Product[]>(`*[_type == "product" && defined(slug.current)] | order(name asc) { ${PRODUCT_FIELDS} }`);
}

export function getProduct(slug: string) {
  return client.fetch<Product | null>(`*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS} }`, { slug });
}

export function getCollections() {
  return client.fetch<Collection[]>(
    `*[_type == "collection"] | order(order asc) {
      _id, title, "slug": slug.current, description, icon,
      "count": count(*[_type == "product" && references(^._id)])
    }`,
  );
}

export function getBrands() {
  return client.fetch<Brand[]>(`*[_type == "brand"] | order(name asc) { name, "slug": slug.current, tagline }`);
}

export function formatPrice(p: Pick<Product, "price" | "priceOnRequest">) {
  if (p.priceOnRequest || p.price == null) return null;
  return `RM${p.price.toLocaleString("en-MY", { minimumFractionDigits: p.price % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

export type RecentEdit = { name: string; model: string; slug: string; updatedAt: string; price?: number; priceOnRequest?: boolean };

/** Facts for the monthly care report, read live from Sanity at build time. */
export function getCareStats(monthStartIso: string) {
  return client.fetch<{ products: number; collections: number; updatedThisMonth: number; recent: RecentEdit[] }>(
    `{
      "products": count(*[_type == "product"]),
      "collections": count(*[_type == "collection"]),
      "updatedThisMonth": count(*[_type == "product" && _updatedAt >= $start]),
      "recent": *[_type == "product"] | order(_updatedAt desc)[0...5]{ name, model, "slug": slug.current, "updatedAt": _updatedAt, price, priceOnRequest }
    }`,
    { start: monthStartIso },
  );
}
