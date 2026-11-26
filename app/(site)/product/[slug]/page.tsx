import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Illustration } from "@/components/Illustration";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProduct, getProducts } from "@/lib/catalogue";
import { demoWhatsApp, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  return { title: p ? `${p.name} (${p.model})` : "Product", description: p?.summary };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const [product, all] = await Promise.all([getProduct(slug), getProducts()]);
  if (!product) notFound();
  const price = formatPrice(product);
  const related = all
    .filter((p) => p._id !== product._id && p.collection.slug === product.collection.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.model,
    description: product.summary,
    brand: product.brand ? { "@type": "Brand", name: product.brand.name } : undefined,
    category: product.category,
    url: `${SITE_URL}/product/${product.slug}`,
    ...(price
      ? { offers: { "@type": "Offer", priceCurrency: "MYR", price: product.price, availability: "https://schema.org/InStock" } }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-[1240px] px-4 py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-steel">
          <Link href="/" className="hover:text-char">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/products" className="hover:text-char">
            Products
          </Link>{" "}
          /{" "}
          <Link href={`/products/${product.collection.slug}`} className="hover:text-char">
            {product.collection.title}
          </Link>{" "}
          / <span className="text-char">{product.model}</span>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="grid aspect-square place-items-center rounded-xl border border-rule bg-sand text-char">
            <Illustration name={product.illustration} className="h-1/2 w-1/2" />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-steel">
              {product.brand?.name} · {product.category}
            </p>
            <h1 className="mt-2 text-3xl leading-tight font-black tracking-tight md:text-4xl">{product.name}</h1>
            <p className="mt-2 font-mono text-sm">
              Model: <span className="rounded bg-sand px-1.5 py-0.5 font-semibold">{product.model}</span>
            </p>
            {product.summary ? <p className="mt-5 text-[17px] text-steel">{product.summary}</p> : null}

            <div className="mt-6 rounded-lg border border-rule p-5">
              {price ? (
                <p>
                  <span className="text-3xl font-black">{price}</span>
                  <span className="ml-1.5 text-steel">/ {product.unit}</span>
                </p>
              ) : (
                <p className="text-xl font-bold">Price on request</p>
              )}
              <p className="mt-1 text-sm text-steel">
                {price ? "Bulk and trade prices available." : "Prices depend on quantity. Ask for today's rate."}
              </p>
              <a
                href={demoWhatsApp(`${product.name}, ${product.model}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-md bg-wa px-5 py-3.5 font-semibold text-white hover:brightness-95"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M12.05 21.5a9.4 9.4 0 0 1-4.8-1.3l-.35-.2-3.56.93.95-3.48-.22-.36A9.4 9.4 0 1 1 12.05 21.5Zm8.02-17.44A11.3 11.3 0 0 0 .72 12.07c0 2 .52 3.95 1.52 5.66L.62 23.25l5.65-1.48a11.3 11.3 0 0 0 5.78 1.47c6.24 0 11.33-5.08 11.33-11.32 0-3.03-1.18-5.87-3.33-8.01Z" />
                </svg>
                Ask on WhatsApp
              </a>
              <p className="mt-2 text-center text-xs text-steel">Demo: this opens a chat with githzweb, the team that built this site.</p>
            </div>

            {product.variants.length ? (
              <div className="mt-8">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Available sizes</h2>
                <table className="mt-3 w-full text-sm">
                  <thead>
                    <tr className="border-b border-rule text-left text-steel">
                      <th className="py-2 font-medium">Size / option</th>
                      <th className="py-2 font-medium">Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants.map((v) => (
                      <tr key={v.label} className="border-b border-rule">
                        <td className="py-2.5">{v.label}</td>
                        <td className="py-2.5 font-mono">{v.model ?? "–"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {product.specs.length ? (
              <div className="mt-8">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-steel">Specifications</h2>
                <dl className="mt-3 text-sm">
                  {product.specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[40%_1fr] gap-4 border-b border-rule py-2.5">
                      <dt className="text-steel">{s.label}</dt>
                      <dd className="font-medium">{s.value}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[40%_1fr] gap-4 border-b border-rule py-2.5">
                    <dt className="text-steel">Sold per</dt>
                    <dd className="font-medium">{product.unit}</dd>
                  </div>
                </dl>
              </div>
            ) : null}
          </div>
        </div>

        {related.length ? (
          <section className="mt-16">
            <h2 className="text-2xl font-black tracking-tight">More in {product.collection.title}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {related.map((p) => (
                <li key={p._id} className="flex">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
