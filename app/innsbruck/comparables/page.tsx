"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";

interface Room { type: string; price: string; }
interface Residence { name: string; category: Category; operator: string; beds: string; location: string; source: string; photos: string[]; rooms: Room[]; }

const catColors: Record<string, { bg: string; text: string; dot: string }> = {
  "University Subsidised": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue", dot: "bg-cat-blue" },
  "Non-Profit": { bg: "bg-cat-green/10 border-cat-green/20", text: "text-cat-green", dot: "bg-cat-green" },
  "Private PBSA": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber", dot: "bg-cat-amber" },
  "Premium PBSA": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple", dot: "bg-cat-purple" },
};

const pbsa: Residence[] = [
  {
    name: "Home4students Höttinger Au 34", category: "University Subsidised", operator: "Home4students / OeAD", beds: "~120", location: "Höttinger Au 34",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/hoettinger-au-34/",
    photos: ["https://oeadstudenthousing-public-production.s3.amazonaws.com/images/hoettinger_au_34_header.2e16d0ba.fill-1580x240.jpg"],
    rooms: [{ type: "Single Room", price: "from €324/mo" }, { type: "Single (higher category)", price: "€505/mo" }],
  },
  {
    name: "Home4students Technikerstraße 7", category: "University Subsidised", operator: "Home4students / OeAD", beds: "~100", location: "Technikerstraße 7",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/technikerstrasse/",
    photos: ["https://oeadstudenthousing-public-production.s3.amazonaws.com/images/technikerstrasse_header.2e16d0ba.fill-1580x240.jpg"],
    rooms: [{ type: "Single Room", price: "from €314/mo" }, { type: "Single (higher category)", price: "€455/mo" }],
  },
  {
    name: "Home4students Euregio-Campus", category: "University Subsidised", operator: "Home4students", beds: "~80", location: "Erzherzog-Eugen-Str. 39",
    source: "https://www.home4students.at/en/our-dormitories/dormitories-innsbruck/dorm-euregio-campus/",
    photos: ["https://www.home4students.at/wp-content/uploads/2024/04/%C2%A9-IIG-Martin-Vandory-2-scaled-e1712062727471.jpg"],
    rooms: [{ type: "Single Room", price: "€480–€500/mo" }],
  },
  {
    name: "OeAD GreenINN", category: "Non-Profit", operator: "OeAD Housing", beds: "~200", location: "Near university",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/", photos: [],
    rooms: [{ type: "Standard Single", price: "from €425/mo" }, { type: "Premium Single", price: "€535/mo" }],
  },
  {
    name: "OeAD Reichenauer Straße", category: "Non-Profit", operator: "OeAD Housing", beds: "~100", location: "Reichenauer Straße",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/", photos: [],
    rooms: [{ type: "Single Room", price: "from €488/mo" }],
  },
  {
    name: "Studentenheim Saggen", category: "Non-Profit", operator: "Ev. Studentenheim", beds: "~60", location: "Saggen district",
    source: "https://www.studentenwohnheim-saggen.at/", photos: [],
    rooms: [{ type: "Single Room", price: "€380–€450/mo" }, { type: "Shared Room", price: "€300–€350/mo" }],
  },
  {
    name: "Studentenhaus Sillgraben", category: "Non-Profit", operator: "Sillgraben e.V.", beds: "~50", location: "Rennweg 34, Saggen",
    source: "https://www.sillgraben.at/", photos: [],
    rooms: [{ type: "Single (ensuite)", price: "€380–€420/mo" }],
  },
  {
    name: "Canisianum", category: "Non-Profit", operator: "Akademikerhilfe", beds: "~80", location: "Central Innsbruck",
    source: "https://www.akademikerhilfe.at/en/canisianum",
    photos: [
      "https://www.akademikerhilfe.at/sites/default/files/2022-11/001_canisianum-innsbruck-2022_wga-zt_foto_kurt.hoerbst_2211082119.jpg",
      "https://www.akademikerhilfe.at/sites/default/files/2022-11/004_canisianum-innsbruck-2022_wga-zt_foto_kurt.hoerbst_2211085651.jpg",
      "https://www.akademikerhilfe.at/sites/default/files/2022-03/kurt.hoerbst%20-%20Blick%20auf%20Einheiten.jpg",
    ],
    rooms: [{ type: "Single Room", price: "€350–€450/mo" }],
  },
  {
    name: "Studentenheim Innsbruck (Reichenau)", category: "Non-Profit", operator: "Studentenheim Innsbruck", beds: "~100", location: "Reichenauerstr. 147",
    source: "https://www.studentenheim-innsbruck.at/", photos: [],
    rooms: [{ type: "Single Room", price: "€380/mo" }],
  },
  {
    name: "STUWO Innsbruck", category: "Premium PBSA", operator: "STUWO", beds: "87", location: "Pradl",
    source: "https://www.stuwo.at/en/dormitories/innsbruck/",
    photos: [
      "https://www.stuwo.at/wp-content/uploads/2024/07/H23_Aussenansicht%C2%AEchristian_flatscher26_Small-1030x709.jpg",
      "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Au%C3%9Fenbereich_4-1030x686.jpg",
      "https://www.stuwo.at/wp-content/uploads/2020/07/STUWO-Innsbruck-Kategorie-A-2-1030x674.jpg",
      "https://www.stuwo.at/wp-content/uploads/2020/07/STUWO-Innsbruck-Gym-1030x687.jpg",
    ],
    rooms: [{ type: "Cat. A Studio (21–23 m², ensuite)", price: "€789/mo" }, { type: "Cat. B Shared Apt (11–12 m²)", price: "€729/mo" }],
  },
];

function extractPriceRange(rooms: Room[]): { min: number; max: number } {
  const prices: number[] = [];
  rooms.forEach((room) => {
    const p = room.price.replace(/[€\/mo]/g, "").trim();
    if (p.includes("–")) { const [a, b] = p.split("–").map((s) => parseFloat(s.trim())); prices.push(a, b); }
    else if (p.includes("from")) { prices.push(parseFloat(p.replace("from", "").trim())); }
    else { const n = parseFloat(p); if (!isNaN(n)) prices.push(n); }
  });
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

function PhotoCarousel({ photos, name }: { photos: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const imgs = photos.length > 0 ? photos : ["https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=60"];

  useEffect(() => {
    if (hover || imgs.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, [hover, imgs.length]);

  return (
    <div className="relative w-full h-full bg-midnight-surface rounded-xl overflow-hidden" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <img src={imgs[idx]} alt={`${name} - ${idx + 1}`} className="w-full h-full object-cover transition-opacity duration-500" />
      {imgs.length > 1 && (
        <>
          <button onClick={() => setIdx((p) => (p - 1 + imgs.length) % imgs.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-midnight/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity" style={{ opacity: hover ? 1 : 0 }} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2L4 7l5 5" /></svg>
          </button>
          <button onClick={() => setIdx((p) => (p + 1) % imgs.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-midnight/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-opacity" style={{ opacity: hover ? 1 : 0 }} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 2l5 5-5 5" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {imgs.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "bg-emerald-accent w-5" : "bg-white/40 w-1.5 hover:bg-white/60"}`} aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function InnsbruckComparablesPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const cats: Category[] = ["All", "University Subsidised", "Non-Profit", "Private PBSA", "Premium PBSA"];
  const filtered = filter === "All" ? pbsa : pbsa.filter((r) => r.category === filter);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1400&q=80" alt="Innsbruck" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/innsbruck" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Innsbruck</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Comparables</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">PBSA Comparables</h1>
          <p className="text-sm text-silver mt-2">10 properties &middot; ~977 beds &middot; Innsbruck student housing market</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-silver">Showing {filtered.length} of {pbsa.length} properties</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((cat) => {
              const c = catColors[cat] || { bg: "bg-white/[0.06]", text: "text-snow", dot: "bg-silver" };
              const isActive = filter === cat;
              return (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                    isActive
                      ? cat === "All" ? "bg-white/10 border-white/20 text-snow" : `${c.bg} border ${c.text}`
                      : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
                  }`}
                >
                  {cat !== "All" && <span className={`w-2 h-2 rounded-full ${isActive ? c.dot : "bg-silver/30"}`} />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Property cards */}
        <div className="space-y-4">
          {filtered.map((r) => {
            const price = extractPriceRange(r.rooms);
            const isOpen = expanded === r.name;
            const c = catColors[r.category] || catColors["Private PBSA"];

            return (
              <div key={r.name} className={`bg-midnight-light border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-emerald-accent/30" : "border-white/[0.06] hover:border-white/[0.12]"}`}>
                <div className="flex flex-col lg:flex-row">
                  {/* Photo */}
                  <div className="lg:w-80 h-56 lg:h-auto flex-shrink-0">
                    <PhotoCarousel photos={r.photos} name={r.name} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h2 className="text-lg font-bold text-snow">{r.name}</h2>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                            {r.category}
                          </span>
                        </div>
                      </div>

                      {/* Price badge */}
                      <div className="flex-shrink-0 bg-emerald-accent/10 border border-emerald-accent/20 rounded-xl px-4 py-2.5 text-center">
                        <div className="text-[10px] text-emerald-accent/70 uppercase tracking-wider mb-0.5">Price Range</div>
                        <div className="text-xl font-bold text-emerald-accent font-serif">
                          €{price.min}–€{price.max}
                          <span className="text-xs font-normal text-emerald-accent/60 ml-0.5">/mo</span>
                        </div>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      {[
                        { label: "Operator", value: r.operator },
                        { label: "Capacity", value: `${r.beds} beds` },
                        { label: "Location", value: r.location },
                        { label: "Room Types", value: `${r.rooms.length}` },
                      ].map((d) => (
                        <div key={d.label}>
                          <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{d.label}</div>
                          <div className="text-sm font-medium text-silver-bright">{d.value}</div>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => setExpanded(isOpen ? null : r.name)}
                      className="text-emerald-accent text-[13px] font-semibold hover:text-emerald-glow transition-colors flex items-center gap-1.5">
                      {isOpen ? "Hide Details" : "View Details"}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M3 5l3 3 3-3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {isOpen && (
                  <div className="border-t border-white/[0.06] bg-midnight/50 px-6 py-5">
                    <h3 className="text-sm font-bold text-snow mb-3 uppercase tracking-wider">Room Types</h3>
                    <div className="space-y-2">
                      {r.rooms.map((room, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2.5 border-b border-white/[0.04] last:border-b-0">
                          <span className="text-sm text-silver">{room.type}</span>
                          <span className="text-sm font-bold text-snow font-serif">{room.price}</span>
                        </div>
                      ))}
                    </div>
                    {r.source && (
                      <a href={r.source} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-xs text-emerald-accent/70 hover:text-emerald-accent transition-colors">
                        Source
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1v6" /></svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
