"use client";

import { useState, useMemo } from "react";
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
  // === Studierendenwerk Frankfurt am Main (25 residences) ===
  { name: "Beethovenplatz 4", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "55", location: "Beethovenplatz 4, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/beethovenplatz-4", photos: ["/images/residences/frankfurt/studierendenwerk/beethovenplatz.jpg"], rooms: [{ type: "Under renovation (completion fall 2026)", price: "TBD" }] },
  { name: "Bockenheimer Landstraße 135", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~60", location: "Bockenheimer Landstr. 135, Bockenheim", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/bockenheimer-landstrasse-135", photos: ["/images/residences/frankfurt/studierendenwerk/bockenheimer-landstr.jpg"], rooms: [{ type: "Single Room (9–14.5 m²)", price: "€248–€288/mo" }, { type: "2-Room Apartment (45 m²)", price: "€445–€523/mo" }] },
  { name: "Fröbelstraße 6–8", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "36", location: "Fröbelstraße 6–8, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/froebelstrasse-6-8", photos: ["/images/residences/frankfurt/studierendenwerk/froebelstr.jpg"], rooms: [{ type: "WG Room (10–17 m²)", price: "€303–€338/mo" }, { type: "Apartment (23–36 m²)", price: "€380–€461/mo" }] },
  { name: "Ginnheimer Landstraße 39a–c", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~80", location: "Ginnheimer Landstr. 39a–c, Ginnheim", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/ginnheimer-landstrasse-39", photos: ["/images/residences/frankfurt/studierendenwerk/ginnheimer-39.jpg"], rooms: [{ type: "Einzelappartement (<20 m²)", price: "€414/mo" }, { type: "Accessible Apartment (<30 m²)", price: "€414–€490/mo" }] },
  { name: "Ginnheimer Landstraße 40", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "282", location: "Ginnheimer Landstr. 40, Ginnheim", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/ginnheimer-landstrasse-40", photos: ["/images/residences/frankfurt/studierendenwerk/ginnheimer-40.jpg"], rooms: [{ type: "Under renovation", price: "TBD" }] },
  { name: "Ginnheimer Landstraße 42", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "443", location: "Ginnheimer Landstr. 42, Ginnheim", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/ginnheimer-landstrasse-42", photos: ["/images/residences/frankfurt/studierendenwerk/ginnheimer-42.jpg"], rooms: [{ type: "Einzelzimmer (10–14.5 m²)", price: "€252–€291/mo" }, { type: "4er-WG Zimmer", price: "€258–€289/mo" }, { type: "Accessible Apartment (61 m²)", price: "€595/mo" }] },
  { name: "Hahnstraße 41b (Niederrad)", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "48", location: "Hahnstraße 41b, Niederrad", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/hahnstrasse-41b", photos: ["/images/residences/frankfurt/studierendenwerk/hahnstr-niederrad.jpg"], rooms: [{ type: "WG Room (12.5–15.5 m²)", price: "€296–€330/mo" }] },
  { name: "Homburger Straße 30", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "28", location: "Homburger Str. 30, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/homburger-strasse-30", photos: ["/images/residences/frankfurt/studierendenwerk/homburger-str.jpg"], rooms: [{ type: "Various room types", price: "€314–€400/mo" }] },
  { name: "Jügelstraße 1", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "60", location: "Jügelstraße 1, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/juegelstrasse-1", photos: ["/images/residences/frankfurt/studierendenwerk/juegelstr.jpg"], rooms: [{ type: "Various room types", price: "€258–€558/mo" }] },
  { name: "Kleine Seestraße 11", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "25", location: "Kleine Seestr. 11, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/kleine-seestrasse-11", photos: ["/images/residences/frankfurt/studierendenwerk/kleine-seestr.jpg"], rooms: [{ type: "WG Room", price: "€298–€340/mo" }] },
  { name: "Kronberger Straße 43", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "39", location: "Kronberger Str. 43, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/kronberger-strasse-43", photos: ["/images/residences/frankfurt/studierendenwerk/kronberger-str.jpg"], rooms: [{ type: "Various room types", price: "€290–€607/mo" }] },
  { name: "Ludwig-Landmann-Straße 343", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "295", location: "Ludwig-Landmann-Str. 343, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/ludwig-landmann-strasse-343", photos: ["/images/residences/frankfurt/studierendenwerk/ludwig-landmann.jpg"], rooms: [{ type: "Various room types", price: "€296–€477/mo" }] },
  { name: "Max-Kade-Häuser / Hansaallee 19", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "408", location: "Hansaallee 19, Westend", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/hansaallee-19", photos: ["/images/residences/frankfurt/studierendenwerk/hansaallee.jpg"], rooms: [{ type: "Apartment (16.5–28.5 m²)", price: "€372–€498/mo" }] },
  { name: "Max-von-Laue-Straße 14 (Riedberg)", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~100", location: "Max-von-Laue-Str. 14, Riedberg", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/max-von-laue-strasse-14", photos: ["/images/residences/frankfurt/studierendenwerk/riedberg-max-von-laue.jpg"], rooms: [{ type: "Apartment (<21 m²)", price: "€419/mo" }] },
  { name: "Platensiedlung", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "173", location: "Platensiedlung, Ginnheim", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/platensiedlung", photos: ["/images/residences/frankfurt/studierendenwerk/platensiedlung.jpg"], rooms: [{ type: "Apartment (22.5–25.5 m²)", price: "€476–€508/mo" }] },
  { name: "Porthstraße 1–3", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "159", location: "Porthstraße 1–3, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/porthstrasse-1-3", photos: ["/images/residences/frankfurt/studierendenwerk/porthstr.jpg"], rooms: [{ type: "Various room types", price: "€244–€643/mo" }] },
  { name: "Rat-Beil-Straße 29", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "48", location: "Rat-Beil-Str. 29, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/rat-beil-strasse-29", photos: ["/images/residences/frankfurt/studierendenwerk/rat-beil-str.jpg"], rooms: [{ type: "Apartment (21–38 m²)", price: "€421–€508/mo" }] },
  { name: "Riedbergallee 4", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "304", location: "Riedbergallee 4, Riedberg", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/riedbergallee-4", photos: ["/images/residences/frankfurt/studierendenwerk/riedbergallee.jpg"], rooms: [{ type: "Various room types", price: "€366–€455/mo" }] },
  { name: "Sandhöfer Allee 2", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "165", location: "Sandhöfer Allee 2, Niederrad", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/sandhoefer-allee-2", photos: ["/images/residences/frankfurt/studierendenwerk/sandhoefer-allee.jpg"], rooms: [{ type: "Apartment (16–20 m²)", price: "€393–€423/mo" }] },
  { name: "Sandhofstraße 3–5", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "177", location: "Sandhofstraße 3–5, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/sandhofstrasse-3-5", photos: ["/images/residences/frankfurt/studierendenwerk/sandhofstr.jpg"], rooms: [{ type: "Various room types", price: "€454–€727/mo" }] },
  { name: "Schloßstraße 119", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "41", location: "Schloßstraße 119, Bockenheim", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/schlossstrasse-119", photos: ["/images/residences/frankfurt/studierendenwerk/schlossstr.jpg"], rooms: [{ type: "Various room types", price: "€303–€400/mo" }] },
  { name: "Stralsunder Straße 24–30", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "150", location: "Stralsunder Str. 24–30, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/stralsunder-strasse-24-30", photos: ["/images/residences/frankfurt/studierendenwerk/stralsunder-str.jpg"], rooms: [{ type: "Various room types", price: "€251–€677/mo" }] },
  { name: "Uhlandstraße 23", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "28", location: "Uhlandstraße 23, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/uhlandstrasse-23", photos: ["/images/residences/frankfurt/studierendenwerk/uhlandstr.jpg"], rooms: [{ type: "Various room types", price: "€308–€565/mo" }] },
  { name: "Wiesenhüttenplatz 37", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "48", location: "Wiesenhüttenplatz 37, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/wiesenhuettenplatz-37", photos: ["/images/residences/frankfurt/studierendenwerk/wiesenhuettenplatz.jpg"], rooms: [{ type: "Apartment", price: "€399–€482/mo" }] },
  { name: "Westhausen (Siedlung)", category: "University Subsidised", operator: "Studierendenwerk Frankfurt", beds: "~40", location: "Westhausen, Frankfurt", source: "https://www.swffm.de/wohnen/wohnheime/frankfurt-am-main/westhausen", photos: ["/images/residences/frankfurt/studierendenwerk/westhausen.jpg"], rooms: [{ type: "WG Room", price: "€313–€347/mo" }] },
  // === Non-Profit ===
  { name: "Evangelisches Studierendenheim", category: "Non-Profit", operator: "Evangelische Kirche", beds: "~150", location: "Sachsenhausen", source: "", photos: [], rooms: [{ type: "Single Room", price: "€300–€400/mo" }] },
  { name: "Friedrich-Dessauer-Haus", category: "Non-Profit", operator: "Katholische Gemeinde", beds: "~120", location: "Bockenheim", source: "", photos: [], rooms: [{ type: "Single (shared facilities)", price: "€280–€380/mo" }] },
  { name: "Kolpinghaus Frankfurt", category: "Non-Profit", operator: "Kolpingwerk", beds: "~100", location: "Near Hauptbahnhof", source: "", photos: [], rooms: [{ type: "Single Room", price: "€320–€420/mo" }] },
  { name: "Campus Viva Frankfurt", category: "Private PBSA", operator: "Campus Viva", beds: "~320", location: "Frankfurt Gallus", source: "https://www.campusviva.de/en/renting/frankfurt/", photos: [], rooms: [{ type: "Standard Studio", price: "€550/mo" }, { type: "Premium Studio", price: "€720/mo" }] },
  { name: "Youniq Frankfurt", category: "Private PBSA", operator: "UPARTMENTS / Youniq", beds: "~280", location: "Frankfurt-Niederrad", source: "https://www.youniq.de/en/frankfurt", photos: [], rooms: [{ type: "Standard Studio (18 m²)", price: "€600/mo" }, { type: "Large Studio (24 m²)", price: "€750/mo" }] },
  { name: "BASECAMP Frankfurt", category: "Private PBSA", operator: "BASECAMP", beds: "~200", location: "Frankfurt Europaviertel", source: "https://www.basecamp-student.de/en/frankfurt/", photos: [], rooms: [{ type: "Single Studio", price: "€650/mo" }, { type: "XL Studio", price: "€850/mo" }] },
  { name: "i LIVE Frankfurt", category: "Private PBSA", operator: "i LIVE Group", beds: "~250", location: "Frankfurt Ostend", source: "https://www.ilive-group.com/en/", photos: [], rooms: [{ type: "Smart Studio (18 m²)", price: "€580/mo" }, { type: "Comfort Studio (25 m²)", price: "€750/mo" }] },
  { name: "THE FIZZ Frankfurt", category: "Premium PBSA", operator: "International Campus", beds: "234", location: "Frankenallee, Europaviertel", source: "https://www.the-fizz.com/en/student-accommodation/frankfurt/", photos: ["/images/residences/frankfurt/the-fizz/exterior-1.jpg", "/images/residences/frankfurt/the-fizz/exterior-2.jpg", "/images/residences/frankfurt/the-fizz/room-1.jpg", "/images/residences/frankfurt/the-fizz/room-2.jpg", "/images/residences/frankfurt/the-fizz/room-3.jpg", "/images/residences/frankfurt/the-fizz/room-4.jpg", "/images/residences/frankfurt/the-fizz/kitchen-1.jpg", "/images/residences/frankfurt/the-fizz/kitchen-2.jpg", "/images/residences/frankfurt/the-fizz/lobby-1.jpg", "/images/residences/frankfurt/the-fizz/lobby-2.jpg", "/images/residences/frankfurt/the-fizz/gym-1.jpg", "/images/residences/frankfurt/the-fizz/cinema-1.jpg", "/images/residences/frankfurt/the-fizz/study-1.jpg", "/images/residences/frankfurt/the-fizz/rooftop-1.jpg", "/images/residences/frankfurt/the-fizz/rooftop-2.jpg"], rooms: [{ type: "Single Studio X-Small (18 m²)", price: "€908–€972/mo" }, { type: "Single Studio Small (19–20 m²)", price: "€915–€979/mo" }, { type: "Single Studio Medium (21–23 m²)", price: "€917–€971/mo" }] },
  { name: "LY30 Frankfurt (Greystar)", category: "Premium PBSA", operator: "Greystar", beds: "~220", location: "Lyoner Straße 30, Niederrad", source: "https://www.greystar.com/ly30-frankfurt-germany/p_16696", photos: ["/images/residences/frankfurt/greystar/exterior-1.jpg", "/images/residences/frankfurt/greystar/exterior-2.jpg", "/images/residences/frankfurt/greystar/exterior-3.jpg", "/images/residences/frankfurt/greystar/living-1.jpg", "/images/residences/frankfurt/greystar/living-2.jpg", "/images/residences/frankfurt/greystar/kitchen-1.jpg", "/images/residences/frankfurt/greystar/bedroom-1.jpg", "/images/residences/frankfurt/greystar/bedroom-2.jpg", "/images/residences/frankfurt/greystar/bathroom-1.jpg", "/images/residences/frankfurt/greystar/clubhouse-1.jpg", "/images/residences/frankfurt/greystar/bike-storage-1.jpg"], rooms: [{ type: "Studio (26–27 m²)", price: "€733–€798/mo" }, { type: "2 Zimmer (55 m²)", price: "€1,120–€1,180/mo" }, { type: "2 Zimmer Plus (59–60 m²)", price: "€1,145–€1,205/mo" }, { type: "2 Zimmer WG-geeignet (59 m²)", price: "€1,088–€1,175/mo" }] },
  { name: "Yugo Urbanum Frankfurt", category: "Premium PBSA", operator: "Yugo (formerly Global Student Accommodation)", beds: "~300", location: "Gallus district, Frankfurt", source: "https://yugo.com/en-us/global/germany/frankfurt/urbanum", photos: ["/images/residences/frankfurt/yugo-urbanum/room-diamond-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-diamond-2.jpg", "/images/residences/frankfurt/yugo-urbanum/room-diamond-3.jpg", "/images/residences/frankfurt/yugo-urbanum/room-diamond-4.jpg", "/images/residences/frankfurt/yugo-urbanum/room-bronze-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-bronze-2.jpg", "/images/residences/frankfurt/yugo-urbanum/kitchen-1.jpg", "/images/residences/frankfurt/yugo-urbanum/bathroom-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-large-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-large-2.jpg", "/images/residences/frankfurt/yugo-urbanum/room-xl-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-xl-2.jpg", "/images/residences/frankfurt/yugo-urbanum/room-xxl-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-xxl-2.jpg", "/images/residences/frankfurt/yugo-urbanum/room-platinum-1.jpg", "/images/residences/frankfurt/yugo-urbanum/room-platinum-2.jpg", "/images/residences/frankfurt/yugo-urbanum/room-large-3.jpg"], rooms: [{ type: "Studio S Bronze (18 m²)", price: "€844/mo" }, { type: "Studio S Silver (18 m²)", price: "€884/mo" }, { type: "Studio S Gold (18 m²)", price: "€914/mo" }, { type: "Studio S Platinum (18 m²)", price: "€949/mo" }, { type: "Studio S Diamond (19 m²)", price: "€989/mo" }, { type: "Studio M Bronze", price: "€994/mo" }, { type: "Studio M Silver", price: "€1,024/mo" }, { type: "Studio M Gold", price: "€1,069/mo" }, { type: "Studio L Bronze (29 m²)", price: "€1,109/mo" }, { type: "Studio L Silver–Platinum", price: "Sold out" }, { type: "Studio L Diamond (26 m²)", price: "Sold out" }, { type: "Studio XL Diamond (36 m²)", price: "Sold out" }, { type: "Studio XL Platinum (36 m²)", price: "Sold out" }, { type: "Studio XXL Diamond (47 m²)", price: "€1,509/mo" }, { type: "Studio XXL Platinum (47 m²)", price: "Sold out" }] },
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

export default function FrankfurtComparablesPage() {
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
        {/* Filters + View Toggle */}
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

        {/* ===== CARDS VIEW ===== */}
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
                      {r.source && (
                        <a href={r.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs text-emerald-accent/70 hover:text-emerald-accent transition-colors">
                          Source <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1v6" /></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ===== TABLE VIEW (with dropdown rows) ===== */
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
                  {/* Clickable Preview Row */}
                  <button
                    onClick={() => toggleTableExpand(r.name)}
                    className="w-full grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_100px_150px_auto_44px] items-center px-5 py-4 text-left cursor-pointer group gap-3 sm:gap-0"
                  >
                    {/* Name + Location */}
                    <div className="min-w-0 pr-4">
                      <div className="text-[15px] font-semibold text-snow truncate group-hover:text-emerald-accent transition-colors">{r.name}</div>
                      <div className="text-[12px] text-silver/50 truncate mt-0.5">{r.operator} &middot; {r.location}</div>
                    </div>

                    {/* Beds - hidden on mobile, shown inline in row on desktop */}
                    <div className="hidden sm:block text-right pr-3">
                      <span className="text-sm font-medium text-silver-bright">{r.beds}</span>
                    </div>

                    {/* Price Range */}
                    <div className="text-right sm:text-right">
                      <span className="text-sm font-bold text-emerald-accent font-serif">{priceStr}</span>
                    </div>

                    {/* Category - hidden on mobile */}
                    <div className="hidden sm:block pl-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap ${c.bg} ${c.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                        {r.category}
                      </span>
                    </div>

                    {/* Chevron */}
                    <div className="hidden sm:flex justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`text-silver/40 group-hover:text-silver transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M4 6l4 4 4-4" />
                      </svg>
                    </div>
                  </button>

                  {/* Mobile-only meta row (beds + category) */}
                  <div className="sm:hidden flex items-center gap-3 px-5 pb-3 -mt-1">
                    <span className="text-xs text-silver/60">{r.beds} beds</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${c.bg} ${c.text}`}>
                      <span className={`w-1 h-1 rounded-full ${c.dot}`} />
                      {r.category}
                    </span>
                  </div>

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
        )}

        {filtered.length === 0 && (
          <p className="text-center text-silver/40 py-12">No properties in this category</p>
        )}
      </main>
    </div>
  );
}
