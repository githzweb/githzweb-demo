import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "details", title: "Specs & variants" },
    { name: "price", title: "Price" },
  ],
  fields: [
    defineField({ name: "name", title: "Product name", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "main",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "model", title: "Model number", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({ name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }], group: "main" }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "collection" }],
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string", group: "main", description: "e.g. Drills, Screws, Pipe fittings" }),
    defineField({ name: "summary", title: "Short description", type: "text", rows: 3, group: "main" }),
    defineField({
      name: "illustration",
      title: "Illustration",
      type: "string",
      group: "main",
      description: "Which drawing to show (demo products use drawings instead of photos).",
    }),
    defineField({ name: "featured", title: "Show on home page", type: "boolean", group: "main", initialValue: false }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "spec",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "variants",
      title: "Sizes / variants",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          name: "variant",
          fields: [
            defineField({ name: "label", title: "Size / option", type: "string", validation: (r) => r.required() }),
            defineField({ name: "model", title: "Model number", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "model" } },
        }),
      ],
    }),
    defineField({
      name: "priceOnRequest",
      title: "Price on request",
      type: "boolean",
      group: "price",
      initialValue: false,
      description: "Hide the price and show “Ask for price” instead.",
    }),
    defineField({
      name: "price",
      title: "Price (RM)",
      type: "number",
      group: "price",
      hidden: ({ parent }) => Boolean(parent?.priceOnRequest),
      validation: (r) => r.min(0),
    }),
    defineField({ name: "unit", title: "Sold per", type: "string", group: "price", description: "e.g. unit, box of 100, metre" }),
  ],
  preview: {
    select: { title: "name", model: "model", brand: "brand.name" },
    prepare: ({ title, model, brand }) => ({ title, subtitle: [brand, model].filter(Boolean).join(" · ") }),
  },
  orderings: [
    { title: "Name A–Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    { title: "Model", name: "modelAsc", by: [{ field: "model", direction: "asc" }] },
  ],
});
