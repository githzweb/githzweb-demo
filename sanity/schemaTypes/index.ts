import { defineField, defineType } from "sanity";

import { product } from "./product";

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Web address", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "icon", type: "string", description: "Drawing used for this collection." }),
    defineField({ name: "order", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});

export const brand = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Web address", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
  ],
});

export const schemaTypes = [product, collection, brand];
