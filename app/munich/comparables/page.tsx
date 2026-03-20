"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";
interface Room { type: string; price: string; }
interface Residence { name: string; category: Exclude<Category, "All">; beds: string; rooms: Room[]; photos: string[]; }

const catColors: Record<string, { bg: string; text: string; dot: string }> = {
  "University Subsidised": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue", dot: "bg-cat-blue" },
  "Non-Profit": { bg: "bg-cat-green/10 border-cat-green/20", text: "text-cat-green", dot: "bg-cat-green" },
  "Private PBSA": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber", dot: "bg-cat-amber" },
  "Premium PBSA": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple", dot: "bg-cat-purple" },
};

const residences: Residence[] = [
  { name: "Studierendenwerk Studentenstadt Freimann", category: "University Subsidised", beds: "~2,500", rooms: [{ type: "Single", price: "€280-400" }], photos: ["/images/residences/munich/freimann/building-highrise.jpg", "/images/residences/munich/freimann/building-brutalist.jpg", "/images/residences/munich/freimann/building-renovated.jpg", "/images/residences/munich/freimann/room-single-1.jpg", "/images/residences/munich/freimann/room-desk.jpg", "/images/residences/munich/freimann/room-furnished.jpg", "/images/residences/munich/freimann/room-single-2.jpg", "/images/residences/munich/freimann/common-sink-area.jpg"] },
  { name: "Studierendenwerk Felsennelkenanger", category: "University Subsidised", beds: "~800", rooms: [], photos: ["/images/residences/munich/felsennelkenanger/building-garden.jpg", "/images/residences/munich/felsennelkenanger/building-facade.jpg", "/images/residences/munich/felsennelkenanger/room-desk-view.jpg", "/images/residences/munich/felsennelkenanger/room-wardrobe.jpg", "/images/residences/munich/felsennelkenanger/room-balcony.jpg", "/images/residences/munich/felsennelkenanger/room-partial-apt.jpg"] },
  { name: "Studierendenwerk Agnes-/Adelheidstraße", category: "University Subsidised", beds: "~450", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-3.jpg"] },
  { name: "Studierendenwerk Kaulbachstraße", category: "University Subsidised", beds: "~200", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-4.jpg"] },
  { name: "Studierendenwerk Chiemgaustraße", category: "University Subsidised", beds: "~600", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-1.jpg"] },
  { name: "Studierendenwerk Max-Bill-Straße", category: "University Subsidised", beds: "~400", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-2.jpg"] },
  { name: "Studierendenwerk Heidemannstraße", category: "University Subsidised", beds: "~350", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-3.jpg"] },
  { name: "Ludwigskolleg (Erzdiözese)", category: "Non-Profit", beds: "170", rooms: [], photos: ["/images/residences/munich/generic-student-room-1.jpg"] },
  { name: "Roncalli-Kolleg (Erzdiözese)", category: "Non-Profit", beds: "124", rooms: [], photos: ["/images/residences/munich/generic-student-room-2.jpg"] },
  { name: "Sophie-Barat-Haus (Erzdiözese)", category: "Non-Profit", beds: "104", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-4.jpg"] },
  { name: "Theresianum (Erzdiözese)", category: "Non-Profit", beds: "63", rooms: [], photos: ["/images/residences/munich/generic-student-room-1.jpg"] },
  { name: "Kolpinghaus Kardinal-Wendel-Haus", category: "Non-Profit", beds: "~200", rooms: [], photos: ["/images/residences/munich/generic-student-room-2.jpg"] },
  { name: "ESWM Evangelische Studentenwohnheime", category: "Non-Profit", beds: "~300", rooms: [], photos: ["/images/residences/munich/generic-student-dorm-1.jpg"] },
  { name: "Campus Viva München V", category: "Private PBSA", beds: "~300", rooms: [{ type: "Standard", price: "€610" }, { type: "Premium", price: "€750" }], photos: ["/images/residences/munich/generic-student-dorm-2.jpg"] },
  { name: "Campus Viva München VI", category: "Private PBSA", beds: "~280", rooms: [{ type: "Standard", price: "€620" }], photos: ["/images/residences/munich/generic-student-dorm-3.jpg"] },
  { name: "Youniq Munich", category: "Private PBSA", beds: "~250", rooms: [{ type: "Standard", price: "€704" }], photos: ["/images/residences/munich/generic-student-dorm-4.jpg"] },
  { name: "Studio M2", category: "Private PBSA", beds: "~400", rooms: [{ type: "Small", price: "€560" }, { type: "Medium", price: "€670" }, { type: "Large", price: "€845" }], photos: ["/images/residences/munich/studio-m2-1.jpg", "/images/residences/munich/studio-m2-2.jpg"] },
  { name: "THE FIZZ Munich", category: "Premium PBSA", beds: "218", rooms: [{ type: "Comfort", price: "€1,086-1,424" }, { type: "Premium", price: "€1,424-1,919" }], photos: ["/images/residences/munich/the-fizz-1.webp", "/images/residences/munich/the-fizz-2.webp", "/images/residences/munich/the-fizz-3.webp"] },
  { name: "Die Zimmerei", category: "Premium PBSA", beds: "287", rooms: [{ type: "Shared", price: "€840" }, { type: "Basic", price: "€1,060" }, { type: "Bigger", price: "€1,080" }, { type: "Large", price: "€1,200-1,520" }], photos: ["/images/residences/munich/die-zimmerei/building-aerial.jpg", "/images/residences/munich/die-zimmerei/room-basic.jpg", "/images/residences/munich/die-zimmerei/room-desk.jpg", "/images/residences/munich/die-zimmerei/room-bed.jpg"] },
];

function extractPriceRange(rooms: Room[]): { min: number; max: number } | null {
  if (rooms.length === 0) return null;
  const prices: number[] = [];
  rooms.forEach((r) => {
    const s = r.price.replace(/[€,]/g, "");
    const nums = s.match(/\d+/g);
    if (nums) nums.forEach((n) => prices.push(parseInt(n)));
  });
  if (prices.length === 0) return null;
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

function PhotoCarousel({ photos, name }: { photos: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const imgs = photos.length > 0 ? photos : [];

  useEffect(() => {
    if (hover || imgs.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, [hover, imgs.length]);

  if (imgs.length === 0) {
    return (
      <div className="w-full h-full bg-midnight-surface rounded-xl flex items-center justify-center">
        <svg className="w-10 h-10 text-silver/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-midnight-surface rounded-xl overflow-hidden" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <img src={imgs[idx]} alt={`${name} - ${idx + 1}`} className="w-full h-full object-cover transition-opacity duration-500" />
      {imgs.length > 1 && (
        <>
          <button onClick={() => setIdx((p) => (p - 1 + imgs.length) % imgs.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-midnight/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-opacity" style={{ opacity: hover ? 1 : 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2L4 7l5 5" /></svg>
          </button>
          <button onClick={() => setIdx((p) => (p + 1) % imgs.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-midnight/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-opacity" style={{ opacity: hover ? 1 : 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 2l5 5-5 5" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {imgs.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "bg-emerald-accent w-5" : "bg-white/40 w-1.5"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function MunichComparablesPage() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const cats: Category[] = ["All", "University Subsidised", "Non-Profit", "Private PBSA", "Premium PBSA"];
  const filtered = filter === "All" ? residences : residences.filter((r) => r.category === filter);

  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative w-full h-64 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/munich" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Munich</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Comparables</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">PBSA Comparables</h1>
          <p className="text-sm text-silver mt-2">19 properties &middot; ~7,996 beds &middot; Munich student housing market</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="text-sm text-silver mb-4">Showing {filtered.length} of {residences.length} properties</p>
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

        <div className="space-y-4">
          {filtered.map((r) => {
            const price = extractPriceRange(r.rooms);
            const isOpen = expanded === r.name;
            const c = catColors[r.category];

            return (
              <div key={r.name} className={`bg-midnight-light border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-emerald-accent/30" : "border-white/[0.06] hover:border-white/[0.12]"}`}>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-80 h-56 lg:h-auto flex-shrink-0">
                    <PhotoCarousel photos={r.photos} name={r.name} />
                  </div>
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
                      {price && (
                        <div className="flex-shrink-0 bg-emerald-accent/10 border border-emerald-accent/20 rounded-xl px-4 py-2.5 text-center">
                          <div className="text-[10px] text-emerald-accent/70 uppercase tracking-wider mb-0.5">Price Range</div>
                          <div className="text-xl font-bold text-emerald-accent font-serif">€{price.min}–€{price.max}<span className="text-xs font-normal text-emerald-accent/60 ml-0.5">/mo</span></div>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div><div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">Capacity</div><div className="text-sm font-medium text-silver-bright">{r.beds} beds</div></div>
                      <div><div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">Room Types</div><div className="text-sm font-medium text-silver-bright">{r.rooms.length || "—"}</div></div>
                    </div>
                    {r.rooms.length > 0 && (
                      <button onClick={() => setExpanded(isOpen ? null : r.name)}
                        className="text-emerald-accent text-[13px] font-semibold hover:text-emerald-glow transition-colors flex items-center gap-1.5">
                        {isOpen ? "Hide Details" : "View Details"}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}><path d="M3 5l3 3 3-3" /></svg>
                      </button>
                    )}
                  </div>
                </div>
                {isOpen && r.rooms.length > 0 && (
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
