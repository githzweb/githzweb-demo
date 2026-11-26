import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Illustration } from "@/components/Illustration";
import { ProductBrowser } from "@/components/ProductBrowser";
import { getBrands, getCollections, getProducts } from "@/lib/catalogue";

export const dynamicParams = false;

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ collection: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[collection]">): Promise<Metadata> {
  const { collection } = await params;
  const c = (await getCollections()).find((x) => x.slug === collection);
  return { title: c?.title ?? "Products", description: c?.description };
}

export default async function CollectionPage({ params }: PageProps<"/products/[collection]">) {
  const { collection } = await params;
  const [products, collections, brands] = await Promise.all([getProducts(), getCollections(), getBrands()]);
  const current = collections.find((c) => c.slug === collection);
  if (!current) notFound();
  const inCollection = products.filter((p) => p.collection.slug === collection);
  const brandSlugs = new Set(inCollection.map((p) => p.brand?.slug));

  return (
    <>
      <section className="border-b border-rule bg-sand">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 py-10">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-steel">
              <Link href="/" className="hover:text-char">
                Home
              </Link>{" "}
              /{" "}
              <Link href="/products" className="hover:text-char">
                Products
              </Link>{" "}
              / <span className="text-char">{current.title}</span>
            </nav>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{current.title}</h1>
            <p className="mt-2 max-w-xl text-steel">{current.description}</p>
          </div>
          <Illustration name={current.icon} className="hidden h-28 w-28 text-char md:block" />
        </div>
        <div className="mx-auto max-w-[1240px] overflow-x-auto px-4 pb-4">
          <ul className="flex gap-2">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className={`block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm ${
                    c.slug === collection ? "border-char bg-char text-white" : "border-rule bg-white hover:border-char"
                  }`}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="mx-auto max-w-[1240px] px-4 py-10">
        <Suspense fallback={<p className="text-steel">Loading products…</p>}>
          <ProductBrowser
            products={inCollection}
            collections={collections}
            brands={brands.filter((b) => brandSlugs.has(b.slug))}
            lockedCollection={collection}
          />
        </Suspense>
      </div>
    </>
  );
}
