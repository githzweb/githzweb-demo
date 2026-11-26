// Invented catalogue for Demo Hardware Co. Every brand, model number and price is made up.
// Used once by scripts/import-to-sanity.mjs to fill the Sanity dataset (like a real client import).

export const BRANDS = [
  { id: "kuatek", name: "Kuatek", tagline: "Cordless power tools" },
  { id: "binapro", name: "BinaPro", tagline: "Hand tools for the trade" },
  { id: "pakumax", name: "PakuMax", tagline: "Fasteners & fixings" },
  { id: "aliraflow", name: "AliraFlow", tagline: "Plumbing systems" },
  { id: "arusa", name: "Arusa Electric", tagline: "Wiring & electrical" },
  { id: "selamat", name: "Selamat Gear", tagline: "Safety equipment" },
];

export const COLLECTIONS = [
  { id: "power-tools", title: "Power Tools", icon: "drill", order: 1, description: "Cordless drills, grinders, saws and batteries for site and workshop." },
  { id: "hand-tools", title: "Hand Tools", icon: "wrench", order: 2, description: "Hammers, spanners, pliers and measuring tools built for daily use." },
  { id: "fasteners", title: "Fasteners & Fixings", icon: "screw", order: 3, description: "Screws, bolts, anchors and nails, sold by the box." },
  { id: "plumbing", title: "Plumbing", icon: "valve", order: 4, description: "PVC pipes, fittings, valves and taps for residential and commercial jobs." },
  { id: "electrical", title: "Electrical", icon: "socket", order: 5, description: "Cables, switches, sockets and breakers for homes, shops and small sites." },
  { id: "safety", title: "Safety & PPE", icon: "helmet", order: 6, description: "Helmets, gloves, eyewear and boots to keep crews safe." },
];

const P = [];
/** price: number (RM) or null for "price on request" */
function p(collection, category, brand, name, model, price, unit, illustration, summary, specs, variants = []) {
  P.push({ collection, category, brand, name, model, price, unit, illustration, summary, specs, variants });
}
const v = (...labels) => labels.map(([label, model]) => ({ label, model }));

// ───────── Power Tools ─────────
p("power-tools", "Cordless Drills", "kuatek", "18V Cordless Drill Driver", "KT-DD18", 289, "unit", "drill",
  "Compact 2-speed drill driver for wood, metal and light masonry. Body only.",
  { Voltage: "18V", "Max torque": "45 Nm", Chuck: "13 mm keyless", Speeds: "0–450 / 0–1,600 rpm", Weight: "1.4 kg (bare)" });
p("power-tools", "Cordless Drills", "kuatek", "18V Brushless Combi Drill", "KT-CD18B", 459, "unit", "drill",
  "Brushless hammer drill with longer runtime and 21 clutch settings.",
  { Voltage: "18V", Motor: "Brushless", "Max torque": "65 Nm", "Impact rate": "0–28,000 bpm", Chuck: "13 mm metal" });
p("power-tools", "Cordless Drills", "kuatek", "12V Mini Drill Driver Kit", "KT-DD12K", 249, "kit", "drill",
  "Lightweight 12V kit with two batteries and charger, ideal for installers.",
  { Voltage: "12V", "Max torque": "30 Nm", Includes: "2 × 2.0Ah batteries, charger, case", Weight: "0.9 kg" });
p("power-tools", "Impact Drivers", "kuatek", "18V Impact Driver", "KT-ID18", 329, "unit", "driver",
  "Drives long screws and bolts fast with 3-mode speed control.",
  { Voltage: "18V", "Max torque": "180 Nm", Bit: "1/4\" hex quick-release", Modes: "3 speeds" });
p("power-tools", "Impact Drivers", "kuatek", "18V Impact Wrench 1/2\"", "KT-IW18", 519, "unit", "driver",
  "High-torque impact wrench for anchor bolts and vehicle wheel nuts.",
  { Voltage: "18V", "Max torque": "400 Nm", Anvil: "1/2\" square", Motor: "Brushless" });
p("power-tools", "Angle Grinders", "kuatek", "100 mm Angle Grinder 750W", "KT-AG100", 139, "unit", "grinder",
  "Corded grinder for cutting and grinding steel, tile and stone.",
  { Power: "750W", Disc: "100 mm", Speed: "11,000 rpm", Switch: "Slide, lock-on" });
p("power-tools", "Angle Grinders", "kuatek", "125 mm Angle Grinder 1,200W", "KT-AG125", 229, "unit", "grinder",
  "Larger disc and soft-start motor for heavy fabrication work.",
  { Power: "1,200W", Disc: "125 mm", Speed: "2,800–11,000 rpm", Features: "Soft start, restart protection" });
p("power-tools", "Angle Grinders", "kuatek", "18V Cordless Angle Grinder", "KT-AG18", 389, "unit", "grinder",
  "Cut rebar and pipe anywhere on site, no cable needed. Body only.",
  { Voltage: "18V", Disc: "125 mm", Motor: "Brushless", Brake: "Electronic disc brake" });
p("power-tools", "Saws", "kuatek", "185 mm Circular Saw 1,400W", "KT-CS185", 319, "unit", "saw",
  "Straight, accurate cuts in timber and plywood up to 65 mm deep.",
  { Power: "1,400W", Blade: "185 mm", "Cut depth": "65 mm at 90°", Bevel: "0–45°" });
p("power-tools", "Saws", "kuatek", "18V Cordless Circular Saw", "KT-CS18", 449, "unit", "saw",
  "Cordless saw for roofing and framing jobs. Body only.",
  { Voltage: "18V", Blade: "165 mm", "Cut depth": "57 mm", Motor: "Brushless" });
p("power-tools", "Saws", "kuatek", "Variable Speed Jigsaw 650W", "KT-JS650", 179, "unit", "jigsaw",
  "Curved and straight cuts in wood, metal and plastic with 4-stage pendulum.",
  { Power: "650W", Stroke: "20 mm", "Cut depth": "Wood 80 mm / Steel 8 mm", Pendulum: "4 settings" });
p("power-tools", "Rotary Hammers", "kuatek", "SDS-Plus Rotary Hammer 800W", "KT-RH26", 349, "unit", "hammerdrill",
  "3-mode SDS-Plus hammer for drilling concrete and light chiselling.",
  { Power: "800W", "Impact energy": "2.7 J", Chuck: "SDS-Plus", Modes: "Drill / hammer drill / chisel" });
p("power-tools", "Rotary Hammers", "kuatek", "18V Cordless SDS-Plus Hammer", "KT-RH18", 589, "unit", "hammerdrill",
  "Cordless concrete drilling up to 24 mm for electricians and installers.",
  { Voltage: "18V", "Impact energy": "2.0 J", "Max drilling (concrete)": "24 mm", Motor: "Brushless" });
p("power-tools", "Batteries & Chargers", "kuatek", "18V Li-ion Battery", "KT-B18", 159, "unit", "battery",
  "Fits every Kuatek 18V tool. Fuel gauge on the pack.",
  { Voltage: "18V", Chemistry: "Li-ion", Indicator: "4-LED fuel gauge" }, v(["2.0Ah", "KT-B18-20"], ["4.0Ah", "KT-B18-40"], ["5.0Ah", "KT-B18-50"]));
p("power-tools", "Batteries & Chargers", "kuatek", "18V Rapid Charger", "KT-C18R", 129, "unit", "battery",
  "Charges a 4.0Ah pack in about 45 minutes.",
  { Input: "230V AC", Output: "18V", "Charge time (4.0Ah)": "≈45 min", Cooling: "Fan-cooled" });
p("power-tools", "Batteries & Chargers", "kuatek", "18V Starter Kit: 2 Batteries + Charger", "KT-SK18", 399, "kit", "battery",
  "Two 4.0Ah batteries and a rapid charger in one box.",
  { Includes: "2 × 4.0Ah batteries, rapid charger", Voltage: "18V" });
p("power-tools", "Heat Guns", "kuatek", "Heat Gun 2,000W", "KT-HG20", 119, "unit", "heatgun",
  "Two heat settings for paint stripping, shrink tubing and PVC bending.",
  { Power: "2,000W", Temperature: "350°C / 550°C", Airflow: "250 / 500 L/min", Includes: "2 nozzles" });

// ───────── Hand Tools ─────────
p("hand-tools", "Hammers", "binapro", "Claw Hammer 16 oz", "BP-CH16", 39, "unit", "hammer",
  "Forged steel head with anti-vibration fibreglass handle.",
  { Head: "16 oz forged steel", Handle: "Fibreglass, rubber grip", Length: "330 mm" });
p("hand-tools", "Hammers", "binapro", "Club Hammer 1.1 kg", "BP-CL11", 45, "unit", "hammer",
  "Short-handled lump hammer for chisel work and demolition.",
  { Head: "1.1 kg", Handle: "Hickory", Length: "260 mm" });
p("hand-tools", "Hammers", "binapro", "Rubber Mallet", "BP-RM", 22, "unit", "hammer",
  "Non-marking mallet for tiling and assembly.",
  { Head: "Black rubber", Handle: "Wood" }, v(["16 oz", "BP-RM16"], ["24 oz", "BP-RM24"]));
p("hand-tools", "Screwdrivers", "binapro", "Screwdriver Set, 8 pcs", "BP-SD8", 49, "set", "screwdriver",
  "Slotted and Phillips drivers with magnetic tips and soft-grip handles.",
  { Pieces: "8", Types: "SL3/5/6, PH0/1/2, 2 stubby", Tips: "Magnetic, chrome-vanadium" });
p("hand-tools", "Screwdrivers", "binapro", "VDE Insulated Screwdriver Set, 6 pcs", "BP-VDE6", 89, "set", "screwdriver",
  "Insulated to 1,000V for live electrical work.",
  { Pieces: "6", Rating: "1,000V insulated" });
p("hand-tools", "Spanners & Wrenches", "binapro", "Combination Spanner Set, 12 pcs", "BP-CS12", 119, "set", "wrench",
  "8–19 mm open/ring spanners in a roll pouch.",
  { Sizes: "8–19 mm", Material: "Chrome-vanadium", Includes: "Roll pouch" });
p("hand-tools", "Spanners & Wrenches", "binapro", "Adjustable Wrench", "BP-AW", 35, "unit", "wrench",
  "Wide-jaw adjustable with laser-etched scale.",
  { Material: "Drop-forged steel", Scale: "mm / inch" }, v(["8\" (200 mm)", "BP-AW8"], ["10\" (250 mm)", "BP-AW10"], ["12\" (300 mm)", "BP-AW12"]));
p("hand-tools", "Spanners & Wrenches", "binapro", "Pipe Wrench", "BP-PW", 59, "unit", "wrench",
  "Heavy-duty pipe wrench with hardened teeth.",
  { Body: "Cast iron", Jaws: "Hardened steel" }, v(["14\"", "BP-PW14"], ["18\"", "BP-PW18"], ["24\"", "BP-PW24"]));
p("hand-tools", "Spanners & Wrenches", "binapro", "Socket Set 1/2\", 24 pcs", "BP-SS24", 169, "set", "wrench",
  "10–32 mm sockets, ratchet and extensions in a blow-moulded case.",
  { Drive: "1/2\"", Sizes: "10–32 mm", Ratchet: "72-tooth" });
p("hand-tools", "Pliers", "binapro", "Combination Pliers 8\"", "BP-CP8", 29, "unit", "pliers",
  "Gripping, cutting and bending in one tool.",
  { Length: "200 mm", Material: "Chrome-vanadium", Grip: "Dual-material" });
p("hand-tools", "Pliers", "binapro", "Long Nose Pliers 6\"", "BP-LN6", 25, "unit", "pliers",
  "Reach into tight spaces and bend wire loops.",
  { Length: "160 mm", Cutter: "Side cutter", Grip: "Dual-material" });
p("hand-tools", "Pliers", "binapro", "Wire Stripper & Crimper", "BP-WS", 32, "unit", "pliers",
  "Strips 0.5–6 mm² cable and crimps insulated terminals.",
  { Strips: "0.5–6 mm²", Crimps: "Red / blue / yellow terminals", Length: "210 mm" });
p("hand-tools", "Measuring", "binapro", "Measuring Tape", "BP-MT", 18, "unit", "tape",
  "Nylon-coated blade with magnetic hook and belt clip.",
  { Blade: "25 mm wide", Scale: "mm / inch", Case: "ABS rubber" }, v(["5 m", "BP-MT5"], ["8 m", "BP-MT8"], ["10 m", "BP-MT10"]));
p("hand-tools", "Measuring", "binapro", "Laser Distance Meter 40 m", "BP-LD40", 149, "unit", "tape",
  "Measures distance, area and volume to ±2 mm.",
  { Range: "0.05–40 m", Accuracy: "±2 mm", Functions: "Distance, area, volume, Pythagoras" });
p("hand-tools", "Measuring", "binapro", "Aluminium Spirit Level", "BP-SL", 35, "unit", "level",
  "3 vials, shock-absorbing end caps.",
  { Vials: "3 (0°, 90°, 45°)", Accuracy: "0.5 mm/m" }, v(["600 mm", "BP-SL60"], ["1,200 mm", "BP-SL120"]));
p("hand-tools", "Measuring", "binapro", "Torpedo Level 230 mm", "BP-TL23", 19, "unit", "level",
  "Magnetic pocket level for pipe and conduit.",
  { Length: "230 mm", Base: "Magnetic V-groove", Vials: "3" });
p("hand-tools", "Cutting", "binapro", "Retractable Utility Knife", "BP-UK", 15, "unit", "knife",
  "Quick-change blade with 5 spares stored in the handle.",
  { Blade: "18 mm snap-off", Includes: "5 spare blades", Lock: "Auto-lock slider" });

// ───────── Fasteners & Fixings ─────────
p("fasteners", "Wood Screws", "pakumax", "Chipboard Screw, Zinc", "PM-CBZ", 18, "box of 200", "screw",
  "Pozi-drive countersunk screws for chipboard and softwood.",
  { Drive: "PZ2", Finish: "Yellow zinc", Head: "Countersunk" }, v(["4.0 × 30 mm", "PM-CBZ-430"], ["4.0 × 40 mm", "PM-CBZ-440"], ["5.0 × 50 mm", "PM-CBZ-550"]));
p("fasteners", "Wood Screws", "pakumax", "Decking Screw, Stainless A2", "PM-DKS", 42, "box of 200", "screw",
  "Corrosion-resistant screws for outdoor timber decks.",
  { Material: "Stainless A2", Drive: "Torx T20", Thread: "Coarse" }, v(["4.5 × 50 mm", "PM-DKS-450"], ["4.5 × 60 mm", "PM-DKS-460"]));
p("fasteners", "Wood Screws", "pakumax", "Self-Drilling Roofing Screw", "PM-RS", 36, "box of 100", "screw",
  "Hex-head tek screw with EPDM washer for metal roofing.",
  { Head: "Hex 8 mm with EPDM washer", Point: "Drill point #3", Finish: "Class 3 coating" }, v(["12-14 × 25 mm", "PM-RS-1425"], ["12-14 × 55 mm", "PM-RS-1455"]));
p("fasteners", "Bolts", "pakumax", "Hex Bolt, Grade 8.8, Zinc", "PM-HB88", null, "box of 50", "bolt",
  "High-tensile hex bolts for structural steel connections.",
  { Grade: "8.8", Finish: "Zinc plated", Thread: "Metric coarse" }, v(["M8 × 40", "PM-HB88-0840"], ["M10 × 50", "PM-HB88-1050"], ["M12 × 60", "PM-HB88-1260"], ["M16 × 80", "PM-HB88-1680"]));
p("fasteners", "Bolts", "pakumax", "Coach Bolt, Galvanised", "PM-CB", 28, "box of 50", "bolt",
  "Dome-head bolts for timber-to-timber fixing.",
  { Finish: "Hot-dip galvanised", Head: "Dome, square neck" }, v(["M8 × 75", "PM-CB-0875"], ["M10 × 100", "PM-CB-10100"]));
p("fasteners", "Bolts", "pakumax", "Threaded Rod, 1 m", "PM-TR", 9, "length", "bolt",
  "Zinc-plated studding for hanging services and anchoring.",
  { Length: "1,000 mm", Grade: "4.8", Finish: "Zinc" }, v(["M8", "PM-TR-08"], ["M10", "PM-TR-10"], ["M12", "PM-TR-12"]));
p("fasteners", "Nuts & Washers", "pakumax", "Hex Nut, Zinc", "PM-HN", 12, "box of 100", "nut",
  "Grade 8 hex nuts to match PakuMax bolts.",
  { Grade: "8", Finish: "Zinc" }, v(["M8", "PM-HN-08"], ["M10", "PM-HN-10"], ["M12", "PM-HN-12"]));
p("fasteners", "Nuts & Washers", "pakumax", "Flat Washer, Zinc", "PM-FW", 8, "box of 200", "nut",
  "Form A flat washers to spread load.",
  { Standard: "Form A", Finish: "Zinc" }, v(["M8", "PM-FW-08"], ["M10", "PM-FW-10"], ["M12", "PM-FW-12"]));
p("fasteners", "Nuts & Washers", "pakumax", "Nylon Lock Nut", "PM-NL", 16, "box of 100", "nut",
  "Nyloc insert stops nuts loosening under vibration.",
  { Insert: "Nylon", Finish: "Zinc" }, v(["M6", "PM-NL-06"], ["M8", "PM-NL-08"], ["M10", "PM-NL-10"]));
p("fasteners", "Anchors", "pakumax", "Nylon Wall Plug", "PM-WP", 6, "pack of 100", "anchor",
  "General-purpose plugs for brick and concrete.",
  { Material: "Nylon", "Suits screw": "4–6 mm" }, v(["6 mm", "PM-WP-06"], ["8 mm", "PM-WP-08"], ["10 mm", "PM-WP-10"]));
p("fasteners", "Anchors", "pakumax", "Sleeve Anchor", "PM-SA", 32, "box of 50", "anchor",
  "Medium-duty anchors for fixing to concrete and brick.",
  { Finish: "Zinc", Head: "Hex nut" }, v(["M8 × 65", "PM-SA-0865"], ["M10 × 80", "PM-SA-1080"]));
p("fasteners", "Anchors", "pakumax", "Wedge Anchor (Through Bolt)", "PM-WA", null, "box of 25", "anchor",
  "Heavy-duty through bolts for racking, machinery and steelwork.",
  { Base: "Cracked/non-cracked concrete", Finish: "Zinc" }, v(["M10 × 100", "PM-WA-10100"], ["M12 × 120", "PM-WA-12120"], ["M16 × 140", "PM-WA-16140"]));
p("fasteners", "Rivets", "pakumax", "Aluminium Blind Rivet", "PM-BR", 14, "box of 500", "rivet",
  "Open-end pop rivets for sheet metal.",
  { Body: "Aluminium", Mandrel: "Steel" }, v(["3.2 × 8 mm", "PM-BR-3208"], ["4.0 × 10 mm", "PM-BR-4010"], ["4.8 × 12 mm", "PM-BR-4812"]));
p("fasteners", "Rivets", "binapro", "Hand Rivet Gun", "BP-RG", 39, "unit", "rivet",
  "Sets 2.4–4.8 mm rivets with 4 nose pieces.",
  { Capacity: "2.4–4.8 mm", Includes: "4 nose pieces" });
p("fasteners", "Nails", "pakumax", "Common Wire Nail", "PM-WN", 11, "1 kg", "nail",
  "Bright steel round-head nails for general carpentry.",
  { Finish: "Bright", Head: "Flat round" }, v(["50 mm", "PM-WN-50"], ["75 mm", "PM-WN-75"], ["100 mm", "PM-WN-100"]));
p("fasteners", "Nails", "pakumax", "Concrete Nail, Hardened", "PM-CN", 16, "1 kg", "nail",
  "Hardened fluted nails for masonry and concrete.",
  { Finish: "Black hardened", Shank: "Fluted" }, v(["40 mm", "PM-CN-40"], ["65 mm", "PM-CN-65"]));
p("fasteners", "Nails", "pakumax", "Roofing Nail with Washer", "PM-RN", 19, "1 kg", "nail",
  "Galvanised nails with umbrella head for zinc roofing.",
  { Finish: "Galvanised", Head: "Umbrella with washer" }, v(["65 mm", "PM-RN-65"]));
p("fasteners", "Cable Ties", "arusa", "Nylon Cable Tie", "AE-CT", 9, "pack of 100", "tie",
  "UV-resistant black cable ties.",
  { Material: "Nylon 66, UV-stabilised", Colour: "Black" }, v(["150 mm", "AE-CT-150"], ["200 mm", "AE-CT-200"], ["300 mm", "AE-CT-300"]));

// ───────── Plumbing ─────────
p("plumbing", "PVC Pipes", "aliraflow", "PVC Pressure Pipe Class D, 6 m", "AF-PP", null, "length", "pipe",
  "Pressure pipe for cold water supply lines.",
  { Length: "6 m", Class: "D", Use: "Cold water supply" }, v(["1/2\" (15 mm)", "AF-PP-15"], ["3/4\" (20 mm)", "AF-PP-20"], ["1\" (25 mm)", "AF-PP-25"]));
p("plumbing", "PVC Pipes", "aliraflow", "PVC Drainage Pipe, 5.8 m", "AF-DP", null, "length", "pipe",
  "Soil and waste drainage pipe.",
  { Length: "5.8 m", Use: "Soil, waste & vent" }, v(["2\" (50 mm)", "AF-DP-50"], ["3\" (80 mm)", "AF-DP-80"], ["4\" (100 mm)", "AF-DP-100"]));
p("plumbing", "PVC Pipes", "aliraflow", "PPR Hot & Cold Pipe, 4 m", "AF-PPR", null, "length", "pipe",
  "Heat-fusion PPR pipe for hot water systems.",
  { Length: "4 m", "Max temperature": "95°C", Joint: "Heat fusion" }, v(["20 mm", "AF-PPR-20"], ["25 mm", "AF-PPR-25"], ["32 mm", "AF-PPR-32"]));
p("plumbing", "Fittings", "aliraflow", "PVC Elbow 90°", "AF-EL90", 2.5, "unit", "fitting",
  "Solvent-weld elbow for pressure pipe.",
  { Angle: "90°", Joint: "Solvent weld" }, v(["1/2\"", "AF-EL90-15"], ["3/4\"", "AF-EL90-20"], ["1\"", "AF-EL90-25"]));
p("plumbing", "Fittings", "aliraflow", "PVC Equal Tee", "AF-TE", 3, "unit", "fitting",
  "Solvent-weld tee for branching supply lines.",
  { Joint: "Solvent weld" }, v(["1/2\"", "AF-TE-15"], ["3/4\"", "AF-TE-20"], ["1\"", "AF-TE-25"]));
p("plumbing", "Fittings", "aliraflow", "Brass Male Adaptor", "AF-MA", 7, "unit", "fitting",
  "Threaded brass adaptor to connect PVC to taps and valves.",
  { Material: "Brass", Thread: "BSP male" }, v(["1/2\"", "AF-MA-15"], ["3/4\"", "AF-MA-20"]));
p("plumbing", "Fittings", "aliraflow", "PVC Solvent Cement 500 g", "AF-SC5", 18, "tin", "fitting",
  "Fast-setting cement for PVC pressure and drainage joints.",
  { Size: "500 g", "Set time": "≈5 min", Use: "PVC-U" });
p("plumbing", "Valves", "aliraflow", "Brass Ball Valve, Lever", "AF-BV", 22, "unit", "valve",
  "Full-bore quarter-turn valve with steel lever.",
  { Body: "Forged brass", Bore: "Full", "Max pressure": "PN25" }, v(["1/2\"", "AF-BV-15"], ["3/4\"", "AF-BV-20"], ["1\"", "AF-BV-25"]));
p("plumbing", "Valves", "aliraflow", "PVC Ball Valve, Solvent", "AF-PBV", 12, "unit", "valve",
  "Lightweight valve that glues straight onto PVC pipe.",
  { Body: "PVC-U", Joint: "Solvent weld" }, v(["1/2\"", "AF-PBV-15"], ["1\"", "AF-PBV-25"]));
p("plumbing", "Valves", "aliraflow", "Float Valve for Water Tank", "AF-FV", 39, "unit", "valve",
  "Automatically shuts off tank filling at the set level.",
  { Size: "3/4\"", Float: "Copper-look plastic ball", Use: "Roof tanks" });
p("plumbing", "Taps", "aliraflow", "Wall Bib Tap, Chrome", "AF-BT15", 29, "unit", "tap",
  "Quarter-turn garden and service tap.",
  { Size: "1/2\"", Finish: "Chrome", Operation: "Quarter-turn" });
p("plumbing", "Taps", "aliraflow", "Kitchen Sink Mixer", "AF-KM", 189, "unit", "tap",
  "Swivel spout mixer with single-lever ceramic cartridge.",
  { Spout: "360° swivel", Cartridge: "35 mm ceramic", Finish: "Brushed steel" });
p("plumbing", "Taps", "aliraflow", "Basin Pillar Tap", "AF-PT", 49, "unit", "tap",
  "Cold-water pillar tap for wash basins.",
  { Size: "1/2\"", Finish: "Chrome" });
p("plumbing", "Sealing", "aliraflow", "PTFE Thread Seal Tape", "AF-PTFE", 1.5, "roll", "fitting",
  "Seals threaded joints against leaks.",
  { Width: "12 mm", Length: "10 m", Use: "Water & air" });
p("plumbing", "Sealing", "aliraflow", "Silicone Sealant, Clear 300 ml", "AF-SIL", 14, "tube", "fitting",
  "Anti-fungal silicone for sinks, basins and showers.",
  { Volume: "300 ml", Colour: "Clear", Feature: "Anti-fungal" });
p("plumbing", "Pumps", "aliraflow", "Automatic Booster Pump 370W", "AF-BP37", null, "unit", "pump",
  "Boosts household water pressure with automatic on/off.",
  { Power: "370W", "Max head": "35 m", "Max flow": "45 L/min", Control: "Automatic pressure switch" });

// ───────── Electrical ─────────
p("electrical", "Cables", "arusa", "PVC Single Core Cable, 100 m", "AE-SC", null, "roll", "cable",
  "Copper single-core wiring cable for conduit installations.",
  { Conductor: "Stranded copper", Insulation: "PVC", Length: "100 m" }, v(["1.5 mm²", "AE-SC-15"], ["2.5 mm²", "AE-SC-25"], ["4.0 mm²", "AE-SC-40"], ["6.0 mm²", "AE-SC-60"]));
p("electrical", "Cables", "arusa", "Twin & Earth Flat Cable, 100 m", "AE-TE", null, "roll", "cable",
  "Flat PVC/PVC cable for surface wiring.",
  { Cores: "2 + earth", Length: "100 m" }, v(["1.5 mm²", "AE-TE-15"], ["2.5 mm²", "AE-TE-25"]));
p("electrical", "Cables", "arusa", "Armoured Cable 3-Core, per metre", "AE-SWA", null, "metre", "cable",
  "Steel-wire armoured cable for underground runs.",
  { Cores: "3", Armour: "Steel wire" }, v(["2.5 mm²", "AE-SWA-25"], ["4.0 mm²", "AE-SWA-40"], ["6.0 mm²", "AE-SWA-60"]));
p("electrical", "Cables", "arusa", "PVC Conduit Pipe, 2.9 m", "AE-CP", 4.5, "length", "cable",
  "Rigid conduit to protect wiring.",
  { Length: "2.9 m", Colour: "White" }, v(["20 mm", "AE-CP-20"], ["25 mm", "AE-CP-25"]));
p("electrical", "Switches", "arusa", "1-Gang 1-Way Switch", "AE-S11", 6.9, "unit", "switch",
  "Standard 10A wall switch, white.",
  { Rating: "10A 250V", Gang: "1", Finish: "White" });
p("electrical", "Switches", "arusa", "2-Gang 2-Way Switch", "AE-S22", 11.9, "unit", "switch",
  "Control lights from two places.",
  { Rating: "10A 250V", Gang: "2", Way: "2-way" });
p("electrical", "Switches", "arusa", "Water Heater Switch 20A with Neon", "AE-WH20", 15.9, "unit", "switch",
  "Double-pole switch for water heaters and air-cons.",
  { Rating: "20A 250V", Pole: "Double pole", Indicator: "Neon" });
p("electrical", "Sockets", "arusa", "13A Switched Socket, Single", "AE-SK1", 9.9, "unit", "socket",
  "Single 13A switched socket outlet.",
  { Rating: "13A 250V", Gang: "1", Finish: "White" });
p("electrical", "Sockets", "arusa", "13A Switched Socket, Twin", "AE-SK2", 16.9, "unit", "socket",
  "Twin 13A switched socket outlet.",
  { Rating: "13A 250V", Gang: "2", Finish: "White" });
p("electrical", "Sockets", "arusa", "13A Socket with 2 USB Ports", "AE-SKU", 39, "unit", "socket",
  "Charge phones without an adaptor.",
  { Rating: "13A 250V", USB: "2 × USB-A, 2.1A total", Finish: "White" });
p("electrical", "Circuit Breakers", "arusa", "Miniature Circuit Breaker 1P", "AE-MCB", 12, "unit", "breaker",
  "Single-pole MCB, Type C curve.",
  { Poles: "1", Curve: "C", "Breaking capacity": "6 kA" }, v(["10A", "AE-MCB-10"], ["16A", "AE-MCB-16"], ["20A", "AE-MCB-20"], ["32A", "AE-MCB-32"]));
p("electrical", "Circuit Breakers", "arusa", "RCCB 2P 30 mA", "AE-RCCB", 69, "unit", "breaker",
  "Earth-leakage protection for domestic boards.",
  { Poles: "2", Sensitivity: "30 mA" }, v(["40A", "AE-RCCB-40"], ["63A", "AE-RCCB-63"]));
p("electrical", "Circuit Breakers", "arusa", "Distribution Board, 8-Way", "AE-DB8", 89, "unit", "breaker",
  "Surface-mount metal DB with busbar and cover.",
  { Ways: "8", Enclosure: "Powder-coated steel", Mount: "Surface" });
p("electrical", "Extension", "arusa", "Extension Cable Reel 4-Way, 20 m", "AE-ER20", 129, "unit", "reel",
  "Heavy-duty reel with thermal cut-out for site use.",
  { Length: "20 m", Outlets: "4 × 13A", Protection: "Thermal cut-out" });
p("electrical", "Extension", "arusa", "Trailing Socket 4-Way with Surge", "AE-TS4", 45, "unit", "reel",
  "Individually switched outlets with surge protection.",
  { Outlets: "4 × 13A", Cable: "3 m", Protection: "Surge" });
p("electrical", "Lighting", "arusa", "LED T8 Tube 18W, 4 ft", "AE-T8", 9.5, "unit", "led",
  "Direct replacement for fluorescent tubes.",
  { Power: "18W", Length: "1,200 mm", "Light output": "1,800 lm" }, v(["Daylight 6500K", "AE-T8-65"], ["Cool white 4000K", "AE-T8-40"]));
p("electrical", "Lighting", "arusa", "LED Floodlight 50W IP65", "AE-FL50", 59, "unit", "led",
  "Weatherproof floodlight for yards and car parks.",
  { Power: "50W", "Light output": "5,000 lm", Rating: "IP65" });

// ───────── Safety & PPE ─────────
p("safety", "Head Protection", "selamat", "Safety Helmet with Ratchet", "SG-HR", 18, "unit", "helmet",
  "HDPE shell with 6-point suspension and ratchet adjuster.",
  { Shell: "HDPE", Suspension: "6-point, ratchet" }, v(["White", "SG-HR-WH"], ["Yellow", "SG-HR-YL"], ["Blue", "SG-HR-BL"], ["Red", "SG-HR-RD"]));
p("safety", "Head Protection", "selamat", "Vented Safety Helmet", "SG-HV", 26, "unit", "helmet",
  "Ventilated shell for hot outdoor sites.",
  { Shell: "ABS, vented", Suspension: "4-point, ratchet" });
p("safety", "Head Protection", "selamat", "Chin Strap for Helmets", "SG-CS", 4, "unit", "helmet",
  "Elastic 2-point chin strap, fits Selamat helmets.",
  { Type: "2-point elastic" });
p("safety", "Hand Protection", "selamat", "Cotton Knitted Gloves", "SG-CG", 15, "pack of 12 pairs", "gloves",
  "Everyday handling gloves.",
  { Material: "Cotton blend", Size: "Free size" });
p("safety", "Hand Protection", "selamat", "Nitrile-Coated Work Gloves", "SG-NG", 4.5, "pair", "gloves",
  "Grip in oily and wet conditions.",
  { Coating: "Nitrile palm", Liner: "Polyester" }, v(["M", "SG-NG-M"], ["L", "SG-NG-L"], ["XL", "SG-NG-XL"]));
p("safety", "Hand Protection", "selamat", "Cut-Resistant Gloves Level 5", "SG-CR5", 12, "pair", "gloves",
  "For handling sheet metal and glass.",
  { "Cut level": "5 (demo rating)", Coating: "PU palm" }, v(["M", "SG-CR5-M"], ["L", "SG-CR5-L"]));
p("safety", "Eye Protection", "selamat", "Clear Safety Glasses", "SG-SG", 6, "unit", "glasses",
  "Anti-scratch wraparound lenses.",
  { Lens: "Polycarbonate, anti-scratch", "UV protection": "Yes" });
p("safety", "Eye Protection", "selamat", "Anti-Fog Safety Goggles", "SG-GG", 14, "unit", "glasses",
  "Sealed goggles for dust and splashes.",
  { Lens: "Anti-fog polycarbonate", Vent: "Indirect" });
p("safety", "Hi-Vis", "selamat", "Hi-Vis Safety Vest", "SG-HV2", 9, "unit", "vest",
  "Reflective vest with zip front.",
  { Colour: "Lime / orange", Tape: "50 mm reflective" }, v(["M–L", "SG-HV2-ML"], ["XL–XXL", "SG-HV2-XL"]));
p("safety", "Hi-Vis", "selamat", "Hi-Vis Long-Sleeve Shirt", "SG-HLS", 35, "unit", "vest",
  "Breathable reflective shirt for road works.",
  { Fabric: "Polyester mesh", Tape: "Reflective" }, v(["M", "SG-HLS-M"], ["L", "SG-HLS-L"], ["XL", "SG-HLS-XL"]));
p("safety", "Footwear", "selamat", "Safety Boots, Steel Toe", "SG-SB", 89, "pair", "boots",
  "Mid-cut leather boots with steel toe cap and midsole.",
  { "Toe cap": "Steel", Midsole: "Steel", Upper: "Leather" }, v(["UK 7", "SG-SB-07"], ["UK 8", "SG-SB-08"], ["UK 9", "SG-SB-09"], ["UK 10", "SG-SB-10"]));
p("safety", "Footwear", "selamat", "Safety Shoes, Lightweight", "SG-SL", 79, "pair", "boots",
  "Composite toe trainers for warehouse and factory floors.",
  { "Toe cap": "Composite", Sole: "Anti-slip" }, v(["UK 7", "SG-SL-07"], ["UK 8", "SG-SL-08"], ["UK 9", "SG-SL-09"]));
p("safety", "Footwear", "selamat", "PVC Safety Wellington Boots", "SG-WB", 45, "pair", "boots",
  "Waterproof boots with steel toe for wet sites.",
  { Material: "PVC", "Toe cap": "Steel" }, v(["UK 8", "SG-WB-08"], ["UK 9", "SG-WB-09"]));
p("safety", "Hearing", "selamat", "Ear Muffs", "SG-EM", 25, "unit", "earmuff",
  "Padded ear defenders for noisy sites.",
  { "Noise reduction": "SNR 28 dB (demo)", Headband: "Adjustable" });
p("safety", "Hearing", "selamat", "Foam Ear Plugs", "SG-EP", 19, "box of 100 pairs", "earmuff",
  "Disposable soft foam plugs.",
  { "Noise reduction": "SNR 35 dB (demo)", Packing: "Individually paired" });
p("safety", "Respiratory", "selamat", "Dust Mask FFP2", "SG-FFP2", 29, "box of 20", "earmuff",
  "Folding particle mask for dust and grinding.",
  { Class: "FFP2 (demo)", Valve: "No" });

export const PRODUCTS = P;

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/["']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function productSlug(prod) {
  return `${slugify(prod.name)}-${slugify(prod.model)}`;
}

// Featured on the home page: a spread across collections.
export const FEATURED_MODELS = ["KT-CD18B", "KT-AG125", "BP-SS24", "BP-LD40", "PM-HB88", "AF-BV", "AE-MCB", "SG-SB"];
