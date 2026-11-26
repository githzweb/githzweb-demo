// Demo company facts. Everything here is invented. All enquiries go to githzweb.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://demo-hardware-githzweb.pages.dev";

export const DEMO = {
  name: "Demo Hardware Co.",
  tagline: "Tools, fasteners and site supplies for contractors and workshops.",
  githzwebUrl: "https://githzweb.netlify.app",
  // githzweb's WhatsApp: the demo's buttons bring leads to githzweb.
  whatsapp: "60108870776",
};

export const NAV = [
  { href: "/products", label: "Products" },
  { href: "/tools", label: "Tools" },
  { href: "/rebuild", label: "Before & after" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** WhatsApp link to githzweb, mentioning what the visitor was looking at in the demo. */
export function demoWhatsApp(context?: string) {
  const text = context
    ? `Hi githzweb, I tried your hardware demo (${context}) and I'd like a site like this.`
    : "Hi githzweb, I tried your hardware demo and I'd like a site like this.";
  return `https://wa.me/${DEMO.whatsapp}?text=${encodeURIComponent(text)}`;
}
