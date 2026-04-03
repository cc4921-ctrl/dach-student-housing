"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";
type SortKey = "name" | "beds" | "category" | "minPrice";
type SortDir = "asc" | "desc";

interface Room { type: string; price: string; }
interface Residence { name: string; category: Exclude<Category, "All">; operator: string; beds: string; location: string; source: string; rooms: Room[]; }

const catColors: Record<string, { bg: string; text: string; dot: string }> = {
  "University Subsidised": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue", dot: "bg-cat-blue" },
  "Non-Profit": { bg: "bg-cat-green/10 border-cat-green/20", text: "text-cat-green", dot: "bg-cat-green" },
  "Private PBSA": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber", dot: "bg-cat-amber" },
  "Premium PBSA": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple", dot: "bg-cat-purple" },
};

const pbsa: Residence[] = [
  { name: "Studierendenwohnheim Bockenheim", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~850", location: "Bockenheimer Landstraße, Bockenheim", source: "https://www.studentenwerkfrankfurt.de/wohnen", rooms: [{ type: "Single Room (shared facilities)", price: "€280–€350/mo" }, { type: "WG Room (2–4 people)", price: "€310–€380/mo" }] },
  { name: "Studierendenwohnheim Niederrad", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~620", location: "Niederrad, near Uni-Klinikum", source: "https://www.studentenwerkfrankfurt.de/wohnen", rooms: [{ type: "Single Room", price: "€290–€360/mo" }, { type: "Studio Apartment", price: "€380–€450/mo" }] },
  { name: "Studierendenwohnheim Ginnheim", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~480", location: "Ginnheim", source: "https://www.studentenwerkfrankfurt.de/wohnen", rooms: [{ type: "Single (shared bath)", price: "€270–€340/mo" }] },
  { name: "Studierendenwohnheim Riedberg", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~350", location: "Campus Riedberg", source: "https://www.studentenwerkfrankfurt.de/wohnen", rooms: [{ type: "Single Room", price: "€300–€370/mo" }, { type: "WG Room", price: "€320–€390/mo" }] },
  { name: "Studierendenwohnheim Westend", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~400", location: "Westend, near IG Farben campus", source: "https://www.studentenwerkfrankfurt.de/wohnen", rooms: [{ type: "Single / WG", price: "€290–€380/mo" }] },
  { name: "Evangelisches Studierendenheim", category: "Non-Profit", operator: "Evangelische Kirche", beds: "~150", location: "Sachsenhausen", source: "", rooms: [{ type: "Single Room", price: "€300–€400/mo" }] },
  { name: "Friedrich-Dessauer-Haus", category: "Non-Profit", operator: "Katholische Gemeinde", beds: "~120", location: "Bockenheim", source: "", rooms: [{ type: "Single (shared facilities)", price: "€280–€380/mo" }] },
  { name: "Kolpinghaus Frankfurt", category: "Non-Profit", operator: "Kolpingwerk", beds: "~100", location: "Near Hauptbahnhof", source: "", rooms: [{ type: "Single Room", price: "€320–€420/mo" }] },
  { name: "Campus Viva Frankfurt", category: "Private PBSA", operator: "Campus Viva", beds: "~320", location: "Frankfurt Gallus", source: "https://www.campusviva.de/en/renting/frankfurt/", rooms: [{ type: "Standard Studio", price: "€550/mo" }, { type: "Premium Studio", price: "€720/mo" }] },
  { name: "Youniq Frankfurt", category: "Private PBSA", operator: "UPARTMENTS / Youniq", beds: "~280", location: "Frankfurt-Niederrad", source: "https://www.youniq.de/en/frankfurt", rooms: [{ type: "Standard Studio (18 m²)", price: "€600/mo" }, { type: "Large Studio (24 m²)", price: "€750/mo" }] },
  { name: "BASECAMP Frankfurt", category: "Private PBSA", operator: "BASECAMP", beds: "~200", location: "Frankfurt Europaviertel", source: "https://www.basecamp-student.de/en/frankfurt/", rooms: [{ type: "Single Studio", price: "€650/mo" }, { type: "XL Studio", price: "€850/mo" }] },
  { name: "i LIVE Frankfurt", category: "Private PBSA", operator: "i LIVE Group", beds: "~250", location: "Frankfurt Ostend", source: "https://www.ilive-group.com/en/", rooms: [{ type: "Smart Studio (18 m²)", price: "€580/mo" }, { type: "Comfort Studio (25 m²)", price: "€750/mo" }] },
  { name: "THE FIZZ Frankfurt", category: "Premium PBSA", operator: "International Campus", beds: "234", location: "Frankenallee, Europaviertel", source: "https://www.the-fizz.com/en/student-accommodation/frankfurt/", rooms: [{ type: "Single Studio X-Small (18 m²)", price: "€908–€972/mo" }, { type: "Single Studio Small (19–20 m²)", price: "€915–€979/mo" }, { type: "Single Studio Medium (21–23 m²)", price: "€917–€971/mo" }] },
  { name: "LY30 Frankfurt (Greystar)", category: "Premium PBSA", operator: "Greystar", beds: "~220", location: "Lyoner Straße 30, Niederrad", source: "https://www.greystar.com/ly30-frankfurt-germany/p_16696", rooms: [{ type: "Studio (26–27 m²)", price: "€733–€798/mo" }, { type: "2 Zimmer (55 m²)", price: "€1,120–€1,180/mo" }, { type: "2 Zimmer Plus (59–60 m²)", price: "€1,145–€1,205/mo" }, { type: "2 Zimmer WG-geeignet (59 m²)", price: "€1,088–€1,175/mo" }] },
  { name: "Yugo Urbanum Frankfurt", category: "Premium PBSA", operator: "Yugo (formerly Global Student Accommodation)", beds: "~300", location: "Gallus district, Frankfurt", source: "https://yugo.com/en-us/global/germany/frankfurt/urbanum", rooms: [{ type: "Studio S Bronze (18 m²)", price: "€844/mo" }, { type: "Studio S Silver (18 m²)", price: "€884/mo" }, { type: "Studio S Gold (18 m²)", price: "€914/mo" }, { type: "Studio S Platinum (18 m²)", price: "€949/mo" }, { type: "Studio S Diamond (19 m²)", price: "€989/mo" }, { type: "Studio M Bronze", price: "€994/mo" }, { type: "Studio M Silver", price: "€1,024/mo" }, { type: "Studio M Gold", price: "€1,069/mo" }, { type: "Studio L Bronze (29 m²)", price: "€1,109/mo" }, { type: "Studio L Silver–Platinum", price: "Sold out" }, { type: "Studio L Diamond (26 m²)", price: "Sold out" }, { type: "Studio XL Diamond (36 m²)", price: "Sold out" }, { type: "Studio XL Platinum (36 m²)", price: "Sold out" }, { type: "Studio XXL Diamond (47 m²)", price: "€1,509/mo" }, { type: "Studio XXL Platinum (47 m²)", price: "Sold out" }] },
];

function parseMinPrice(priceStr: string): number {
  const match = priceStr.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10);
}

function parseBeds(bedStr: string): number {
  const match = bedStr.replace(/[~,]/g, "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function extractPriceRange(rooms: Room[]): string {
  if (rooms.length === 0) return "Price on request";
  const prices: number[] = [];
  rooms.forEach((r) => {
    const s = r.price.replace(/[€,]/g, "");
    const nums = s.match(/\d+/g);
    if (nums) nums.forEach((n) => prices.push(parseInt(n)));
  });
  if (prices.length === 0) return "Price on request";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `€${min}` : `€${min}–€${max}`;
}

export default function FrankfurtComparablesPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const cats: Category[] = ["All", "University Subsidised", "Non-Profit", "Private PBSA", "Premium PBSA"];
  const filtered = filter === "All" ? pbsa : pbsa.filter((r) => r.category === filter);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "beds": cmp = parseBeds(a.beds) - parseBeds(b.beds); break;
        case "category": cmp = a.category.localeCompare(b.category); break;
        case "minPrice": cmp = parseMinPrice(a.rooms[0]?.price || "") - parseMinPrice(b.rooms[0]?.price || ""); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  }

  function toggleExpand(name: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const sortIcon = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : "";

  const totalBeds = pbsa.reduce((sum, r) => sum + parseBeds(r.beds), 0);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Banner */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src="/images/banners/frankfurt.jpg" alt="Frankfurt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/frankfurt" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Frankfurt</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Comparables</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">PBSA Comparables</h1>
          <p className="text-sm text-silver mt-2">{pbsa.length} properties &middot; ~{totalBeds.toLocaleString()} beds &middot; Frankfurt student housing market</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-silver mb-4">Showing {filtered.length} of {pbsa.length} properties</p>
            <div className="flex flex-wrap gap-2">
              {cats.map((cat) => {
                const c = catColors[cat] || { bg: "bg-white/[0.06]", text: "text-snow", dot: "bg-silver" };
                const isActive = filter === cat;
                return (
                  <button key={cat} onClick={() => setFilter(cat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                      isActive ? cat === "All" ? "bg-white/10 border-white/20 text-snow" : `${c.bg} border ${c.text}` : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
                    }`}>
                    {cat !== "All" && <span className={`w-2 h-2 rounded-full ${isActive ? c.dot : "bg-silver/30"}`} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Residence List */}
        <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_120px_140px_auto_48px] sm:grid-cols-[1fr_120px_160px_auto_48px] items-center px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
            <button onClick={() => toggleSort("name")} className="text-left text-[11px] font-semibold text-silver uppercase tracking-wider hover:text-snow transition-colors select-none">
              Property{sortIcon("name")}
            </button>
            <button onClick={() => toggleSort("beds")} className="text-right text-[11px] font-semibold text-silver uppercase tracking-wider hover:text-snow transition-colors select-none pr-4">
              Beds{sortIcon("beds")}
            </button>
            <button onClick={() => toggleSort("minPrice")} className="text-right text-[11px] font-semibold text-silver uppercase tracking-wider hover:text-snow transition-colors select-none">
              Price Range{sortIcon("minPrice")}
            </button>
            <button onClick={() => toggleSort("category")} className="text-left text-[11px] font-semibold text-silver uppercase tracking-wider hover:text-snow transition-colors select-none pl-5">
              Category{sortIcon("category")}
            </button>
            <div />
          </div>

          {/* Rows */}
          {sorted.map((r) => {
            const priceStr = extractPriceRange(r.rooms);
            const isOpen = expanded.has(r.name);
            const c = catColors[r.category];

            return (
              <div key={r.name} className={`border-b border-white/[0.04] last:border-b-0 transition-colors ${isOpen ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}>
                {/* Preview Row */}
                <button
                  onClick={() => toggleExpand(r.name)}
                  className="w-full grid grid-cols-[1fr_120px_140px_auto_48px] sm:grid-cols-[1fr_120px_160px_auto_48px] items-center px-5 py-4 text-left cursor-pointer group"
                >
                  {/* Name + Location */}
                  <div className="min-w-0 pr-4">
                    <div className="text-[15px] font-semibold text-snow truncate group-hover:text-emerald-accent transition-colors">{r.name}</div>
                    <div className="text-[12px] text-silver/50 truncate mt-0.5">{r.operator} &middot; {r.location}</div>
                  </div>

                  {/* Beds */}
                  <div className="text-right pr-4">
                    <span className="text-sm font-medium text-silver-bright">{r.beds}</span>
                  </div>

                  {/* Price Range */}
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-accent font-serif">{priceStr}</span>
                    <span className="text-[10px] text-silver/40 ml-1">/mo</span>
                  </div>

                  {/* Category */}
                  <div className="pl-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${c.bg} ${c.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                      {r.category}
                    </span>
                  </div>

                  {/* Chevron */}
                  <div className="flex justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className={`text-silver/40 group-hover:text-silver transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </button>

                {/* Expandable Room Details */}
                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="bg-midnight/60 border border-white/[0.06] rounded-xl overflow-hidden">
                      {/* Room list header */}
                      <div className="grid grid-cols-[1fr_auto] px-4 py-2.5 border-b border-white/[0.06]">
                        <span className="text-[10px] font-semibold text-silver/50 uppercase tracking-wider">Room Type</span>
                        <span className="text-[10px] font-semibold text-silver/50 uppercase tracking-wider">Rent</span>
                      </div>
                      {/* Room rows */}
                      {r.rooms.map((room, idx) => {
                        const isSoldOut = room.price.toLowerCase().includes("sold out");
                        return (
                          <div key={idx} className={`grid grid-cols-[1fr_auto] px-4 py-3 items-center ${idx < r.rooms.length - 1 ? "border-b border-white/[0.04]" : ""} ${idx % 2 === 1 ? "bg-white/[0.015]" : ""}`}>
                            <span className="text-sm text-silver">{room.type}</span>
                            <span className={`text-sm font-semibold font-serif ${isSoldOut ? "text-silver/30 italic" : "text-snow"}`}>
                              {room.price.replace("/mo", "")}
                            </span>
                          </div>
                        );
                      })}
                      {/* Source link */}
                      {r.source && (
                        <div className="px-4 py-2.5 border-t border-white/[0.06]">
                          <a href={r.source} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] text-emerald-accent/60 hover:text-emerald-accent transition-colors">
                            View source
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1v6" /></svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/[0.06] text-[11px] text-silver/40">
            {sorted.length} {sorted.length === 1 ? "property" : "properties"} &middot; Click any row to view room types &middot; Click column headers to sort
          </div>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-silver/40 py-12">No properties in this category</p>
        )}
      </main>
    </div>
  );
}
