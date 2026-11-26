// Rule-based FAQ assistant: matches a question to the closest answer by keywords
// (English + common Malay words), and can look up products by name or model number.
// No AI service, no cost. All shop policies here are demo examples.

export type BotLink = { href: string; label: string };
export type BotAnswer = { text: string; links?: BotLink[] };
export type MiniProduct = { slug: string; name: string; model: string; price: number | null; variants: string[] };

type Faq = { id: string; keywords: string[]; answer: BotAnswer };

// Malay / slang → English, so one keyword list covers both.
const SYNONYMS: Record<string, string> = {
  hantar: "delivery", penghantaran: "delivery", pos: "delivery", shipping: "delivery", ship: "delivery", deliver: "delivery", lalamove: "delivery",
  bayar: "payment", pay: "payment", bayaran: "payment", duitnow: "payment", transfer: "payment", cash: "payment", tunai: "payment", card: "payment",
  harga: "price", berapa: "price", cost: "price", murah: "discount", diskaun: "discount", borong: "bulk", wholesale: "bulk", trade: "bulk", kontraktor: "bulk", contractor: "bulk",
  stok: "stock", ada: "stock", available: "stock", availability: "stock", habis: "stock",
  waranti: "warranty", jaminan: "warranty", rosak: "warranty", broken: "warranty", pulang: "return", tukar: "return", refund: "return", exchange: "return",
  buka: "hours", tutup: "hours", open: "hours", close: "hours", jam: "hours", time: "hours", alamat: "location", address: "location", kedai: "location", shop: "location", where: "location", mana: "location",
  sebut: "quote", quotation: "quote", invois: "invoice", resit: "invoice", receipt: "invoice", sst: "invoice", tax: "invoice", cukai: "invoice",
  katalog: "catalogue", catalog: "catalogue", pdf: "catalogue", brochure: "catalogue",
  real: "demo", fake: "demo", betul: "demo", palsu: "demo",
  hi: "hello", hai: "hello", hello: "hello", salam: "hello", helo: "hello",
};

const FAQS: Faq[] = [
  {
    id: "delivery",
    keywords: ["delivery", "deliver", "send", "courier", "lorry", "johor", "singapore", "free", "fee", "charge", "days"],
    answer: {
      text: "We deliver around Johor Bahru within 1–2 working days, free for orders over RM500. Other states go by courier (2–4 days). (Demo policy: this shop is fictional.)",
    },
  },
  {
    id: "payment",
    keywords: ["payment", "credit", "terms", "account", "qr", "online", "banking"],
    answer: { text: "You can pay by bank transfer, DuitNow QR, or cash on pickup. Contractors can apply for a 30-day credit account. (Demo policy.)" },
  },
  {
    id: "bulk",
    keywords: ["bulk", "discount", "quantity", "big", "order", "project", "carton", "box"],
    answer: {
      text: "Trade discounts are automatic: 5% off orders over RM1,000 and 10% over RM5,000. Build your list in the quote generator to see your price.",
      links: [{ href: "/tools/quote", label: "Open the quote generator" }],
    },
  },
  {
    id: "quote",
    keywords: ["quote", "estimate", "list", "boq", "pricing"],
    answer: {
      text: "Add products and quantities to a quote, then print it as a PDF or send it on WhatsApp.",
      links: [{ href: "/tools/quote", label: "Make a quote" }],
    },
  },
  {
    id: "por",
    keywords: ["request", "why", "no", "price", "show", "poa"],
    answer: { text: "Items like cables, pipes and bolts change price with copper and steel rates, so they're “price on request”. Ask on WhatsApp with the model number for today's price." },
  },
  {
    id: "stock",
    keywords: ["stock", "ready", "have", "sell", "carry"],
    answer: { text: "Most items on the website are kept in stock. Send the model number on WhatsApp and we'll confirm before you come over. (Demo.)" },
  },
  {
    id: "warranty",
    keywords: ["warranty", "guarantee", "return", "faulty", "repair", "claim"],
    answer: { text: "Power tools carry a 12-month warranty. Unused items can be returned within 7 days with the receipt. (Demo policy.)" },
  },
  {
    id: "hours",
    keywords: ["hours", "today", "saturday", "sunday", "weekend", "holiday", "location", "pickup", "collect", "visit", "map"],
    answer: { text: "Opening hours (example): Mon–Fri 8:30am–6pm, Sat 8:30am–1pm, closed Sundays. There's no real address, because Demo Hardware Co. is a fictional shop." },
  },
  {
    id: "invoice",
    keywords: ["invoice", "company", "official", "e-invoice", "einvoice"],
    answer: { text: "Every order comes with an official invoice in your company's name, and e-invoices are available on request. (Demo.)" },
  },
  {
    id: "catalogue",
    keywords: ["catalogue", "download", "print", "full", "all", "products"],
    answer: {
      text: "The printable catalogue is generated from the website, so it's always up to date.",
      links: [{ href: "/tools/catalogue", label: "Open the printable catalogue" }],
    },
  },
  {
    id: "demo",
    keywords: ["real", "fake", "demo", "githzweb", "built", "website", "who", "made", "chatbot", "bot"],
    answer: {
      text: "This is a demo shop built by githzweb to show suppliers what their own catalogue site can do, including this FAQ assistant. It's rule-based, so there are no AI fees.",
      links: [{ href: "https://githzweb.netlify.app", label: "Visit githzweb" }],
    },
  },
];

const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function tokens(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9.\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => SYNONYMS[t] ?? t);
}

export function findProducts(text: string, products: MiniProduct[]) {
  const words = text.toLowerCase().split(/[^a-z0-9-]+/).filter((w) => w.length >= 2);
  const scored = products.map((p) => {
    const hay = `${p.name} ${p.variants.join(" ")}`.toLowerCase();
    const model = compact(p.model);
    let s = 0;
    for (const w of words) {
      const cw = compact(w);
      if (cw.length >= 4 && (model.startsWith(cw) || cw.startsWith(model))) s += 5;
      else if (w.length >= 3 && hay.includes(w)) s += 1;
    }
    return { p, s };
  });
  const best = Math.max(0, ...scored.map((x) => x.s));
  if (best < 1) return [];
  return scored.filter((x) => x.s === best).slice(0, 3).map((x) => x.p);
}

export function answer(text: string, products: MiniProduct[]): BotAnswer | null {
  const t = tokens(text);
  if (!t.length) return null;
  if (t.length <= 3 && t.includes("hello")) {
    return { text: "Hi! Ask me about delivery, payment, bulk prices, warranty, or type a product name or model number." };
  }
  let best: { f: Faq; s: number } | null = null;
  for (const f of FAQS) {
    const s = t.reduce((n, w) => n + (f.id === w ? 3 : f.keywords.includes(w) ? 1 : 0), 0);
    if (s > 0 && (!best || s > best.s)) best = { f, s };
  }
  const found = findProducts(text, products);
  // A clear product question ("do you have M10 bolts", "price KT-AG125") beats weak FAQ matches.
  if (found.length && (!best || best.s < 3 || ["price", "stock", "por"].includes(best.f.id))) {
    return {
      text: found.length === 1 ? "Here's what I found:" : "These look like a match:",
      links: found.map((p) => ({
        href: `/product/${p.slug}`,
        label: `${p.name} (${p.model}): ${p.price == null ? "price on request" : `RM${p.price % 1 ? p.price.toFixed(2) : p.price}`}`,
      })),
    };
  }
  return best ? best.f.answer : null;
}

export const SUGGESTIONS = ["Do you deliver?", "Bulk discount?", "Price of KT-AG125", "Payment methods", "Is this shop real?"];
