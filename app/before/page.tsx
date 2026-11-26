/* eslint-disable @next/next/no-img-element -- this page is deliberately built the old way (unoptimised images) */
import type { Metadata } from "next";
import Link from "next/link";

import { DEMO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Before: the old website (rebuild demo)",
  robots: { index: false, follow: false },
};

// The deliberately outdated "before" version of Demo Hardware Co.'s website, used in the
// rebuild demo. Typical problems on purpose: huge uncompressed images, table layout, tiny
// text, no search, PDF-only catalogue, not mobile friendly. Content is invented.

const OLD_PRODUCTS = [
  ["KT-DD18", "Cordless Drill 18V", "Please call"],
  ["KT-AG100", "Grinder 4 inch", "RM 139"],
  ["BP-CH16", "Claw Hammer", "RM 39"],
  ["BP-AW", "Adjustable Spanner (8/10/12 inch)", "From RM 35"],
  ["PM-HB88", "High Tensile Bolt & Nut", "Please call"],
  ["PM-WP", "Wall Plug (6/8/10mm)", "RM 6 / pkt"],
  ["AF-BV", "Brass Ball Valve", "Please call"],
  ["AF-PP", "PVC Pipe Class D", "Please call"],
  ["AE-SC", "Cable Single Core", "Please call"],
  ["AE-MCB", "MCB 1P", "RM 12"],
  ["SG-HR", "Safety Helmet", "RM 18"],
  ["SG-SB", "Safety Boot", "RM 89"],
];

const font = { fontFamily: '"Times New Roman", Times, serif' };

export default function BeforePage() {
  return (
    <div style={{ ...font, background: "#c0c0c0", minHeight: "100vh", color: "#000" }}>
      {/* Demo notice (required on every page) */}
      <div className="bg-char px-4 py-2 font-sans text-[13px] text-white">
        <span className="mr-2 rounded bg-hivis px-1.5 py-0.5 font-mono text-[11px] font-semibold text-char">DEMO</span>
        This is the deliberately <strong>outdated &ldquo;before&rdquo; site</strong> for githzweb&rsquo;s rebuild demo.{" "}
        <Link href="/rebuild" className="font-semibold text-hivis underline">
          See the before &amp; after &rarr;
        </Link>
      </div>

      <table width="980" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto", background: "#fff", border: "2px outset #999" }}>
        <tbody>
          <tr>
            <td colSpan={2}>
              <img src="/before/banner-old.png" alt="Demo Hardware Co banner" width={980} />
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ background: "#000080", padding: "4px 8px" }}>
              {["HOME", "ABOUT US", "PRODUCTS", "CATALOGUE", "CONTACT US"].map((m) => (
                <a key={m} href="#" style={{ color: "#ffff00", fontSize: 12, fontWeight: "bold", marginRight: 18 }}>
                  {m}
                </a>
              ))}
            </td>
          </tr>
          <tr>
            <td width={190} valign="top" style={{ background: "#ffffcc", padding: 8, fontSize: 11, borderRight: "1px solid #999" }}>
              <p style={{ fontWeight: "bold", color: "#800000" }}>Categories</p>
              <ul style={{ paddingLeft: 16, listStyle: "square" }}>
                {["Power Tools", "Hand Tools", "Bolts & Nuts", "Plumbing", "Electrical", "Safety"].map((c) => (
                  <li key={c}>
                    <a href="#" style={{ color: "#0000ee", textDecoration: "underline" }}>
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: 16, fontWeight: "bold", color: "#800000" }}>Visitor Counter</p>
              <p style={{ fontFamily: "monospace", background: "#000", color: "#0f0", padding: "2px 6px", display: "inline-block" }}>0012847</p>
              <p style={{ marginTop: 16 }}>Best viewed in Internet Explorer at 1024x768</p>
            </td>
            <td valign="top" style={{ padding: 10, fontSize: 12 }}>
              <h1 style={{ fontSize: 20, color: "#800000", textAlign: "center" }}>
                *** WELCOME TO DEMO HARDWARE CO. WEBSITE!!! ***
              </h1>
              <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
                NEW!!! Please download our latest catalogue below. For price please call or WhatsApp.
              </p>
              <p style={{ textAlign: "center", marginTop: 6 }}>
                <a href="#" style={{ color: "#0000ee", textDecoration: "underline" }}>
                  &gt;&gt; Download Catalogue 2019 (PDF, 24MB) &lt;&lt;
                </a>
              </p>

              <table width="100%" cellPadding={4} style={{ marginTop: 10 }}>
                <tbody>
                  <tr>
                    {[1, 2, 3, 4].map((i) => (
                      <td key={i} align="center" style={{ border: "1px solid #ccc" }}>
                        <img src={`/before/photo-${i}.png`} alt={`Product photo ${i}`} width={170} />
                        <br />
                        <span style={{ fontSize: 11 }}>Promotion item {i}</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>

              <h2 style={{ fontSize: 14, marginTop: 14, color: "#000080" }}>OUR PRODUCTS</h2>
              <table width="100%" border={1} cellPadding={3} cellSpacing={0} style={{ fontSize: 11, borderColor: "#999" }}>
                <thead style={{ background: "#000080", color: "#fff" }}>
                  <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {OLD_PRODUCTS.map(([code, name, price], i) => (
                    <tr key={code} style={{ background: i % 2 ? "#eeeeee" : "#fff" }}>
                      <td>{code}</td>
                      <td>{name}</td>
                      <td>{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: 8, fontSize: 11 }}>
                * More than 100 items available. Please refer to catalogue or call us for enquiry.
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ background: "#000080", color: "#fff", fontSize: 10, textAlign: "center", padding: 6 }}>
              Copyright &copy; 2019 {DEMO.name} All Rights Reserved. | Last Updated: 12/03/2019 | Tel: (demo, no number)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
