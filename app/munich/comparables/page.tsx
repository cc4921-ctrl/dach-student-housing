"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";
type ViewMode = "cards" | "table";
type SortKey = "name" | "operator" | "beds" | "category" | "minPrice";
type SortDir = "asc" | "desc";

interface Room { type: string; price: string; }
interface Residence { name: string; category: Exclude<Category, "All">; operator: string; beds: string; location: string; source: string; photos: string[]; rooms: Room[]; }

const catColors: Record<string, { bg: string; text: string; dot: string }> = {
  "University Subsidised": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue", dot: "bg-cat-blue" },
  "Non-Profit": { bg: "bg-cat-green/10 border-cat-green/20", text: "text-cat-green", dot: "bg-cat-green" },
  "Private PBSA": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber", dot: "bg-cat-amber" },
  "Premium PBSA": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple", dot: "bg-cat-purple" },
};

const pbsa: Residence[] = [
  { name: "Studierendenwerk Studentenstadt Freimann", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~2,500", location: "Christoph-Probst-Str., Freimann", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/freimann/building-highrise.jpg", "/images/residences/munich/freimann/building-brutalist.jpg", "/images/residences/munich/freimann/building-renovated.jpg", "/images/residences/munich/freimann/room-single-1.jpg", "/images/residences/munich/freimann/room-desk.jpg", "/images/residences/munich/freimann/room-furnished.jpg", "/images/residences/munich/freimann/room-single-2.jpg", "/images/residences/munich/freimann/common-sink-area.jpg"], rooms: [{ type: "Single Room", price: "€280–€400/mo" }, { type: "Studio Apartment", price: "€380–€504/mo" }] },
  { name: "Studierendenwerk Felsennelkenanger", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~800", location: "Felsennelkenanger, Munich North", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/felsennelkenanger/building-garden.jpg", "/images/residences/munich/felsennelkenanger/building-facade.jpg", "/images/residences/munich/felsennelkenanger/room-desk-view.jpg", "/images/residences/munich/felsennelkenanger/room-wardrobe.jpg", "/images/residences/munich/felsennelkenanger/room-balcony.jpg", "/images/residences/munich/felsennelkenanger/room-partial-apt.jpg"], rooms: [{ type: "Single (shared facilities)", price: "€280–€370/mo" }, { type: "WG for 2–6 people", price: "€316–€455/mo" }] },
  { name: "Studierendenwerk Agnes-/Adelheidstraße", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~450", location: "Agnesstraße, Central Munich", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/studierendenwerk/studierendenwerk-1.jpg", "/images/residences/munich/studierendenwerk/studierendenwerk-2.jpg"], rooms: [{ type: "WG Room (3–6 people)", price: "€354–€371/mo" }] },
  { name: "Studierendenwerk Kaulbachstraße", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~200", location: "Kaulbachstraße, English Garden", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/studierendenwerk/studierendenwerk-3.jpg", "/images/residences/munich/studierendenwerk/studierendenwerk-4.jpg"], rooms: [{ type: "WG Room (2–3 people)", price: "€456–€505/mo" }] },
  { name: "Studierendenwerk Chiemgaustraße", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~600", location: "Chiemgaustraße, South/West", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/studierendenwerk/studierendenwerk-5.jpg", "/images/residences/munich/studierendenwerk/studierendenwerk-1.jpg"], rooms: [{ type: "WG Room (4–6 people)", price: "€317–€411/mo" }] },
  { name: "Studierendenwerk Max-Bill-Straße", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~400", location: "Max-Bill-Straße, Munich North", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/studierendenwerk/studierendenwerk-2.jpg", "/images/residences/munich/studierendenwerk/studierendenwerk-3.jpg"], rooms: [{ type: "Single / WG", price: "€280–€400/mo" }] },
  { name: "Studierendenwerk Heidemannstraße", category: "University Subsidised", operator: "Studierendenwerk München", beds: "~350", location: "Heidemannstraße, Munich North", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/", photos: ["/images/residences/munich/studierendenwerk/studierendenwerk-4.jpg", "/images/residences/munich/studierendenwerk/studierendenwerk-5.jpg"], rooms: [{ type: "Single / WG", price: "€280–€400/mo" }] },
  { name: "Ludwigskolleg (Erzdiözese)", category: "Non-Profit", operator: "Erzdiözese München", beds: "170", location: "Guerickestraße 19, 80805", source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime", photos: ["/images/residences/munich/kolpinghaus/kolpinghaus-1.jpg"], rooms: [{ type: "Single (shared bath)", price: "€280–€400/mo" }, { type: "Single (private bath)", price: "€350–€500/mo" }] },
  { name: "Roncalli-Kolleg (Erzdiözese)", category: "Non-Profit", operator: "Erzdiözese München", beds: "124", location: "Nymphenburger Str. 99, 80636", source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime", photos: ["/images/residences/munich/kolpinghaus/kolpinghaus-2.jpg"], rooms: [{ type: "Single (shared facilities)", price: "€280–€400/mo" }] },
  { name: "Sophie-Barat-Haus (Erzdiözese)", category: "Non-Profit", operator: "Erzdiözese München", beds: "104", location: "Central Munich", source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime", photos: ["/images/residences/munich/kolpinghaus/kolpinghaus-3.jpg"], rooms: [{ type: "Single (women only)", price: "€280–€400/mo" }] },
  { name: "Theresianum (Erzdiözese)", category: "Non-Profit", operator: "Erzdiözese München", beds: "63", location: "Kirchenstraße 6, 81675", source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime", photos: ["/images/residences/munich/kolpinghaus/kolpinghaus-4.jpg"], rooms: [{ type: "Single (women, private bath)", price: "€350–€500/mo" }] },
  { name: "Kolpinghaus Kardinal-Wendel-Haus", category: "Non-Profit", operator: "Kolpingwerk", beds: "~200", location: "Near Hauptbahnhof", source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/further-accommodation/privately-run-halls-of-residence/", photos: ["/images/residences/munich/kolpinghaus/kolpinghaus-1.jpg", "/images/residences/munich/kolpinghaus/kolpinghaus-2.jpg", "/images/residences/munich/kolpinghaus/kolpinghaus-3.jpg"], rooms: [{ type: "Single Room", price: "€270–€500/mo" }] },
  { name: "ESWM Evangelische Studentenwohnheime", category: "Non-Profit", operator: "ESWM e.V.", beds: "~300", location: "Various locations", source: "https://www.eswm.de/en/residences/overview.html", photos: ["/images/residences/munich/studierendenwerk/studierendenwerk-1.jpg", "/images/residences/munich/studierendenwerk/studierendenwerk-2.jpg"], rooms: [{ type: "Single / WG", price: "€280–€450/mo" }] },
  { name: "Campus Viva München V", category: "Private PBSA", operator: "Campus Viva", beds: "~300", location: "Munich", source: "https://www.campusviva.de/en/renting/munich/", photos: ["/images/residences/munich/campus-viva/campus-viva-1.jpg", "/images/residences/munich/campus-viva/campus-viva-2.jpg", "/images/residences/munich/campus-viva/campus-viva-3.jpg"], rooms: [{ type: "Standard Studio", price: "€610/mo" }, { type: "Premium Studio", price: "€750/mo" }] },
  { name: "Campus Viva München VI", category: "Private PBSA", operator: "Campus Viva", beds: "~280", location: "Munich", source: "https://www.campusviva.de/en/renting/muenchen-vi/", photos: ["/images/residences/munich/campus-viva/campus-viva-4.jpg", "/images/residences/munich/campus-viva/campus-viva-5.jpg", "/images/residences/munich/campus-viva/campus-viva-1.jpg"], rooms: [{ type: "Standard Studio", price: "€620/mo" }] },
  { name: "Youniq Munich", category: "Private PBSA", operator: "UPARTMENTS / Youniq", beds: "~250", location: "Munich", source: "https://www.residenceetudiante.fr/en/residence/youniq-munich.html", photos: ["/images/residences/munich/campus-viva/campus-viva-2.jpg", "/images/residences/munich/campus-viva/campus-viva-3.jpg"], rooms: [{ type: "Standard Studio (12 m²)", price: "€704/mo" }] },
  { name: "Studio M2 (Building 1 & 2)", category: "Private PBSA", operator: "Studio M2", beds: "~400", location: "Munich", source: "https://studentenappartements-muenchen.de/en/", photos: ["/images/residences/munich/studio-m2-1.jpg", "/images/residences/munich/studio-m2-2.jpg"], rooms: [{ type: "Small Studio (21 m²)", price: "€560/mo" }, { type: "Medium Studio (26 m²)", price: "€670/mo" }, { type: "Large Studio (32 m²)", price: "€845/mo" }] },
  { name: "THE FIZZ Munich", category: "Premium PBSA", operator: "International Campus", beds: "218", location: "Hanebergstraße", source: "https://www.the-fizz.com/en/student-accommodation/munich/", photos: ["/images/residences/munich/the-fizz-1.webp", "/images/residences/munich/the-fizz-2.webp", "/images/residences/munich/the-fizz-3.webp"], rooms: [{ type: "Comfort Room", price: "€1,086–€1,424/mo" }, { type: "Premium Studio", price: "€1,424–€1,919/mo" }] },
  { name: "Die Zimmerei", category: "Premium PBSA", operator: "Die Zimmerei", beds: "287", location: "Resi-Huber-Platz 1, Sendling", source: "https://zimmerei.apartments/en/rent-apartment-munich/", photos: ["/images/residences/munich/die-zimmerei/building-aerial.jpg", "/images/residences/munich/die-zimmerei/room-basic.jpg", "/images/residences/munich/die-zimmerei/room-desk.jpg", "/images/residences/munich/die-zimmerei/room-bed.jpg"], rooms: [{ type: "Shared Bude (13 m²)", price: "€840/mo" }, { type: "Basic Bude (15 m²)", price: "€1,060/mo" }, { type: "Bigger Bude (20 m²)", price: "€1,080/mo" }, { type: "Large / Maxi / XL Bude", price: "€1,200–€1,520/mo" }] },
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
  return min === max ? `€${min}/mo` : `€${min}–€${max}/mo`;
}

function PhotoCarousel({ photos, name }: { photos: string[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover || photos.length <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % photos.length), 4000);
    return () => clearInterval(t);
  }, [hover, photos.length]);

  if (photos.length === 0) {
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
      <img src={photos[idx]} alt={`${name} - ${idx + 1}`} className="w-full h-full object-cover transition-opacity duration-500" />
      {photos.length > 1 && (
        <>
          <button onClick={() => setIdx((p) => (p - 1 + photos.length) % photos.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-midnight/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-opacity" style={{ opacity: hover ? 1 : 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 2L4 7l5 5" /></svg>
          </button>
          <button onClick={() => setIdx((p) => (p + 1) % photos.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-midnight/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center transition-opacity" style={{ opacity: hover ? 1 : 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 2l5 5-5 5" /></svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
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
  const [cardExpanded, setCardExpanded] = useState<string | null>(null);
  const [tableExpanded, setTableExpanded] = useState<Set<string>>(new Set());
  const [view, setView] = useState<ViewMode>("cards");
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
        case "operator": cmp = a.operator.localeCompare(b.operator); break;
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

  function toggleTableExpand(name: string) {
    setTableExpanded(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const sortIcon = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : "";

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
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          <div className="flex items-center bg-midnight-light border border-white/[0.06] rounded-lg overflow-hidden">
            <button onClick={() => setView("cards")}
              className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${view === "cards" ? "bg-emerald-accent/15 text-emerald-accent" : "text-silver/60 hover:text-silver"}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
              Cards
            </button>
            <button onClick={() => setView("table")}
              className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${view === "table" ? "bg-emerald-accent/15 text-emerald-accent" : "text-silver/60 hover:text-silver"}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="3" x2="15" y2="3"/><line x1="1" y1="8" x2="15" y2="8"/><line x1="1" y1="13" x2="15" y2="13"/></svg>
              Table
            </button>
          </div>
        </div>

        {view === "cards" ? (
          <div className="space-y-4">
            {filtered.map((r) => {
              const priceStr = extractPriceRange(r.rooms);
              const isOpen = cardExpanded === r.name;
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
                          <p className="text-xs text-silver/60 mt-1">{r.operator} &middot; {r.location}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                              {r.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 bg-emerald-accent/10 border border-emerald-accent/20 rounded-xl px-4 py-2.5 text-center">
                          <div className="text-[10px] text-emerald-accent/70 uppercase tracking-wider mb-0.5">Price Range</div>
                          <div className="text-lg font-bold text-emerald-accent font-serif">{priceStr}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div><div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">Capacity</div><div className="text-sm font-medium text-silver-bright">{r.beds} beds</div></div>
                        <div><div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">Room Types</div><div className="text-sm font-medium text-silver-bright">{r.rooms.length}</div></div>
                      </div>
                      {r.rooms.length > 0 && (
                        <button onClick={() => setCardExpanded(isOpen ? null : r.name)}
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
                      <a href={r.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs text-emerald-accent/70 hover:text-emerald-accent transition-colors">
                        Source <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1v6" /></svg>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
            {/* Column Headers */}
            <div className="hidden sm:grid grid-cols-[1fr_100px_150px_auto_44px] items-center px-5 py-3 border-b border-white/[0.08] bg-white/[0.02]">
              <button onClick={() => toggleSort("name")} className="text-left text-[11px] font-semibold text-silver uppercase tracking-wider hover:text-snow transition-colors select-none">
                Property{sortIcon("name")}
              </button>
              <button onClick={() => toggleSort("beds")} className="text-right text-[11px] font-semibold text-silver uppercase tracking-wider hover:text-snow transition-colors select-none pr-3">
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
              const isOpen = tableExpanded.has(r.name);
              const c = catColors[r.category];

              return (
                <div key={r.name} className={`border-b border-white/[0.04] last:border-b-0 transition-colors ${isOpen ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}>
                  <button onClick={() => toggleTableExpand(r.name)}
                    className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_100px_150px_auto_44px] items-center px-5 py-4 text-left cursor-pointer group gap-3 sm:gap-0">
                    <div className="min-w-0 pr-4">
                      <div className="text-[15px] font-semibold text-snow truncate group-hover:text-emerald-accent transition-colors">{r.name}</div>
                      <div className="text-[12px] text-silver/50 truncate mt-0.5">{r.operator} &middot; {r.location}</div>
                    </div>
                    <div className="hidden sm:block text-right pr-3">
                      <span className="text-sm font-medium text-silver-bright">{r.beds}</span>
                    </div>
                    <div className="text-right sm:text-right">
                      <span className="text-sm font-bold text-emerald-accent font-serif">{priceStr}</span>
                    </div>
                    <div className="hidden sm:block pl-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${c.bg} ${c.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                        {r.category}
                      </span>
                    </div>
                    <div className="hidden sm:flex justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`text-silver/40 group-hover:text-silver transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </div>
                  </button>
                  <div className="sm:hidden flex items-center gap-3 px-5 pb-3 -mt-1">
                    <span className="text-xs text-silver/60">{r.beds} beds</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${c.bg} ${c.text}`}>
                      <span className={`w-1 h-1 rounded-full ${c.dot}`} />
                      {r.category}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <div className="bg-midnight/60 border border-white/[0.06] rounded-xl overflow-hidden">
                        <div className="grid grid-cols-[1fr_auto] px-4 py-2.5 border-b border-white/[0.06]">
                          <span className="text-[10px] font-semibold text-silver/50 uppercase tracking-wider">Room Type</span>
                          <span className="text-[10px] font-semibold text-silver/50 uppercase tracking-wider">Rent</span>
                        </div>
                        {r.rooms.map((room, idx) => (
                          <div key={idx} className={`grid grid-cols-[1fr_auto] px-4 py-3 items-center ${idx < r.rooms.length - 1 ? "border-b border-white/[0.04]" : ""} ${idx % 2 === 1 ? "bg-white/[0.015]" : ""}`}>
                            <span className="text-sm text-silver">{room.type}</span>
                            <span className="text-sm font-semibold font-serif text-snow">{room.price.replace("/mo", "")}</span>
                          </div>
                        ))}
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

            <div className="px-5 py-3 border-t border-white/[0.06] text-[11px] text-silver/40">
              {sorted.length} {sorted.length === 1 ? "property" : "properties"} &middot; Click any row to view room types &middot; Click column headers to sort
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-silver/40 py-12">No properties in this category</p>
        )}
      </main>
    </div>
  );
}
