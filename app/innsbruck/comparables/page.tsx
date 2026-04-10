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
  /* ── WIST Residences ── */
  { name: "Adolf Sollath Heim", category: "University Subsidised", operator: "WIST", beds: "75", location: "Hans-Untermüller-Str. 6-8", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/adolf-sollath-1.jpg", "/images/residences/innsbruck/wist/adolf-sollath-2.jpg", "/images/residences/innsbruck/wist/adolf-sollath-3.jpg"], rooms: [{ type: "Single Room", price: "€298–€408/mo" }, { type: "Double Room", price: "€278/mo" }, { type: "Studio (33 m²)", price: "€468/mo" }] },
  { name: "Campus Sieglanger", category: "University Subsidised", operator: "WIST", beds: "50", location: "Weingartnerstr. 129-131", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/campus-sieglanger-1.jpg", "/images/residences/innsbruck/wist/campus-sieglanger-2.jpg", "/images/residences/innsbruck/wist/campus-sieglanger-3.jpg"], rooms: [{ type: "Single Room", price: "€388/mo" }, { type: "Studio", price: "€408–€428/mo" }, { type: "Apartment (2 pers.)", price: "€408/mo p.P." }, { type: "Single Apartment", price: "€558/mo" }] },
  { name: "Karl Kunst Heim", category: "University Subsidised", operator: "WIST", beds: "100", location: "Dreiheiligenstr. 9", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/karl-kunst-1.jpg", "/images/residences/innsbruck/wist/karl-kunst-2.jpg", "/images/residences/innsbruck/wist/karl-kunst-3.jpg"], rooms: [{ type: "Single Room", price: "€348–€388/mo" }, { type: "Double Room", price: "€278–€328/mo" }, { type: "Double as Single", price: "€438–€478/mo" }] },
  { name: "Panorama Heim", category: "University Subsidised", operator: "WIST", beds: "160", location: "Fürstenweg 174A", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/panorama-1.jpg", "/images/residences/innsbruck/wist/panorama-2.jpg", "/images/residences/innsbruck/wist/panorama-3.jpg"], rooms: [{ type: "Single Room", price: "€348–€458/mo" }, { type: "Double Room", price: "€288–€308/mo" }, { type: "WG", price: "€338–€438/mo" }, { type: "Large Studio (32 m²)", price: "€438/mo" }] },
  { name: "Hertha Firnberg Heim", category: "University Subsidised", operator: "WIST", beds: "110", location: "Fürstenweg 174", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/hertha-firnberg-1.jpg", "/images/residences/innsbruck/wist/hertha-firnberg-2.jpg", "/images/residences/innsbruck/wist/hertha-firnberg-3.jpg"], rooms: [{ type: "Single Room", price: "€318–€468/mo" }, { type: "Double Room", price: "€288/mo" }, { type: "Double as Single", price: "€448/mo" }] },
  { name: "Karwendel Heim 1", category: "University Subsidised", operator: "WIST", beds: "85", location: "Höttinger Au 84", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/karwendel1-1.jpg", "/images/residences/innsbruck/wist/karwendel1-2.jpg", "/images/residences/innsbruck/wist/karwendel1-3.jpg"], rooms: [{ type: "Single Room", price: "€318–€418/mo" }, { type: "Double Room", price: "€278/mo" }, { type: "Studio", price: "€468/mo" }] },
  { name: "Karwendel Heim 2", category: "University Subsidised", operator: "WIST", beds: "80", location: "Höttinger Au 84A", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/karwendel2-1.jpg", "/images/residences/innsbruck/wist/karwendel2-2.jpg", "/images/residences/innsbruck/wist/karwendel2-3.jpg"], rooms: [{ type: "Single Room", price: "€408–€488/mo" }, { type: "Double Room", price: "€298/mo" }] },
  { name: "Rapoldi Heim", category: "University Subsidised", operator: "WIST", beds: "32", location: "Hans-Untermüller-Str. 6-8", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/rapoldi-1.jpg", "/images/residences/innsbruck/wist/rapoldi-2.jpg", "/images/residences/innsbruck/wist/rapoldi-3.jpg"], rooms: [{ type: "Single Room", price: "€268–€358/mo" }, { type: "Double Room", price: "€218/mo" }] },
  { name: "Savoy Heim", category: "University Subsidised", operator: "WIST", beds: "25", location: "Höttinger Au 26", source: "https://www.wist.at/en/prices/", photos: ["/images/residences/innsbruck/wist/savoy-1.jpg", "/images/residences/innsbruck/wist/savoy-2.jpg", "/images/residences/innsbruck/wist/savoy-3.jpg"], rooms: [{ type: "Single Room", price: "€428–€468/mo" }, { type: "Double Room", price: "€278–€308/mo" }] },
  { name: "Roter Adler Heim", category: "University Subsidised", operator: "WIST", beds: "30", location: "Seilergasse 4", source: "http://wist.at/002/news/index.php", photos: [], rooms: [{ type: "Single Room", price: "€300–€400/mo" }] },
  /* ── Akademikerhilfe ── */
  { name: "Canisianum", category: "Non-Profit", operator: "Akademikerhilfe", beds: "204", location: "Tschurtschenthalerstr. 7", source: "https://www.akademikerhilfe.at/en/canisianum", photos: ["/images/residences/innsbruck/akademikerhilfe/canisianum-1.jpg", "/images/residences/innsbruck/akademikerhilfe/canisianum-2.jpg", "/images/residences/innsbruck/akademikerhilfe/canisianum-3.jpg"], rooms: [{ type: "Single Room", price: "€477–€688/mo" }, { type: "Twin Room", price: "€410/mo p.P." }] },
  { name: "Frau Hitt-Campus", category: "Non-Profit", operator: "Akademikerhilfe", beds: "35", location: "Frau-Hitt-Str. 14", source: "https://www.akademikerhilfe.at/en/frau-hitt-campus", photos: ["/images/residences/innsbruck/akademikerhilfe/frau-hitt-1.jpg", "/images/residences/innsbruck/akademikerhilfe/frau-hitt-2.jpg", "/images/residences/innsbruck/akademikerhilfe/frau-hitt-3.jpg"], rooms: [{ type: "Single Room (Cat. A)", price: "€432–€471/mo" }, { type: "Single Room (Cat. A+)", price: "€539/mo" }] },
  { name: "Müllerheim", category: "Non-Profit", operator: "Akademikerhilfe", beds: "48", location: "Müllerstr. 29", source: "https://www.akademikerhilfe.at/en/mullerheim", photos: ["/images/residences/innsbruck/akademikerhilfe/mullerheim-1.jpg", "/images/residences/innsbruck/akademikerhilfe/mullerheim-2.jpg", "/images/residences/innsbruck/akademikerhilfe/mullerheim-3.jpg"], rooms: [{ type: "Single Room (9–12 m²)", price: "€344/mo" }, { type: "Single Room (12–16 m²)", price: "€403/mo" }, { type: "Single Room (~24 m²)", price: "€457/mo" }] },
  { name: "Haus Am Gießen 20", category: "Non-Profit", operator: "Akademikerhilfe", beds: "54", location: "Am Gießen 20", source: "https://www.akademikerhilfe.at/en/haus-am-giessen-20", photos: ["/images/residences/innsbruck/akademikerhilfe/am-giessen-1.jpg", "/images/residences/innsbruck/akademikerhilfe/am-giessen-2.jpg", "/images/residences/innsbruck/akademikerhilfe/am-giessen-3.jpg"], rooms: [{ type: "Single Room (~10 m²)", price: "€350/mo" }, { type: "Single Room (~16 m²)", price: "€411/mo" }] },
  { name: "Haus Maximilianstr. 8", category: "Non-Profit", operator: "Akademikerhilfe", beds: "96", location: "Maximilianstr. 8", source: "https://www.akademikerhilfe.at/en/haus-maximilianstrasse-8", photos: ["/images/residences/innsbruck/akademikerhilfe/maximilianstr-1.jpg", "/images/residences/innsbruck/akademikerhilfe/maximilianstr-2.jpg", "/images/residences/innsbruck/akademikerhilfe/maximilianstr-3.jpg"], rooms: [{ type: "Single Room", price: "€580–€644/mo" }] },
  { name: "Haus Schützenstr. 43", category: "Non-Profit", operator: "Akademikerhilfe", beds: "95", location: "Schützenstr. 43", source: "https://www.akademikerhilfe.at/en/haus-schutzenstrasse-43", photos: ["/images/residences/innsbruck/akademikerhilfe/schutzenstr-1.jpg", "/images/residences/innsbruck/akademikerhilfe/schutzenstr-2.jpg", "/images/residences/innsbruck/akademikerhilfe/schutzenstr-3.jpg"], rooms: [{ type: "Single Room", price: "€438/mo" }, { type: "Twin Room", price: "€356/mo p.P." }] },
  /* ── Home4students ── */
  { name: "Home4students Höttinger Au", category: "University Subsidised", operator: "Home4students", beds: "229", location: "Höttinger Au 34", source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/hoettinger-au-34/", photos: ["/images/residences/innsbruck/home4students/hoettinger-au-1.jpg", "/images/residences/innsbruck/home4students/hoettinger-au-2.jpg"], rooms: [{ type: "Single Room", price: "from €512/mo" }, { type: "Double Room", price: "from €324/mo" }] },
  { name: "Home4students Technikerstr.", category: "University Subsidised", operator: "Home4students", beds: "259", location: "Technikerstr. 7", source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/technikerstrasse/", photos: ["/images/residences/innsbruck/home4students/technikerstr-1.jpg", "/images/residences/innsbruck/home4students/technikerstr-2.jpg"], rooms: [{ type: "Single Room", price: "from €461/mo" }, { type: "Double Room", price: "from €314/mo" }] },
  { name: "Home4students EUREGIO-Campus", category: "University Subsidised", operator: "Home4students", beds: "72", location: "Erzherzog-Eugen-Str. 25/39", source: "https://www.home4students.at/en/our-dormitories/dormitories-innsbruck/dorm-euregio-campus/", photos: ["/images/residences/innsbruck/home4students/euregio-campus-1.jpg", "/images/residences/innsbruck/home4students/euregio-campus-2.jpg"], rooms: [{ type: "Single Room", price: "€480–€500/mo" }] },
  /* ── Large Non-Profit / Other ── */
  { name: "in's – International Student House", category: "Non-Profit", operator: "ISH", beds: "714", location: "Rechengasse 7", source: "https://www.studentenhaus.info/en/", photos: ["/images/residences/innsbruck/generic-student-housing-4.jpg"], rooms: [{ type: "Single Room", price: "€345–€615/mo" }] },
  { name: "Europaheim", category: "Non-Profit", operator: "Europaheim (self-managed)", beds: "269", location: "Technikerstr. 9b", source: "", photos: ["/images/residences/innsbruck/europaheim/europaheim-2.jpg", "/images/residences/innsbruck/europaheim/europaheim-3.jpg", "/images/residences/innsbruck/europaheim/europaheim-1.png"], rooms: [{ type: "Single Room", price: "€593/mo" }] },
  { name: "Südtiroler StudentInnenheim Anton Zelger", category: "Non-Profit", operator: "Südtirolerheim", beds: "190", location: "Viktor-Franz-Hess-Str. 4", source: "", photos: [], rooms: [{ type: "Single Room", price: "€300/mo" }] },
  { name: "Kolpinghaus Innsbruck", category: "Non-Profit", operator: "Kolpinghaus", beds: "120", location: "Viktor-Franz-Hess-Str. 7", source: "", photos: [], rooms: [{ type: "Half-board only", price: "On request" }] },
  { name: "Campushotel Hall in Tirol", category: "Non-Profit", operator: "Campushotel", beds: "152", location: "Eduard Wallnöfer-Zentrum 2, 6060 Hall", source: "", photos: [], rooms: [{ type: "Typ A", price: "€382.90/mo" }, { type: "Typ B Garçonnière", price: "€535.80/mo" }] },
  { name: "Campus Dreiheiligen", category: "Private PBSA", operator: "Immobilien Dr. Rhomberg", beds: "93", location: "Kohlstattgasse 1 & 1a", source: "", photos: ["/images/residences/innsbruck/dreiheiligen/photo-1.jpg", "/images/residences/innsbruck/dreiheiligen/photo-2.jpg", "/images/residences/innsbruck/dreiheiligen/photo-3.jpg", "/images/residences/innsbruck/dreiheiligen/photo-4.jpg"], rooms: [{ type: "Single Room", price: "€443–€520/mo" }, { type: "Double Room", price: "€320/mo" }] },
  { name: "Bischof Paulus Heim", category: "Non-Profit", operator: "Universitätspfarre", beds: "87", location: "Santifallerstr. 3", source: "", photos: [], rooms: [{ type: "Single Room (incl. VAT)", price: "€528/mo" }] },
  { name: "Studentenwohnheim Saggen", category: "Non-Profit", operator: "Diakonie Tirol", beds: "58", location: "Gänsbacherstr. 4", source: "https://www.studentenwohnheim-saggen.at/", photos: ["/images/residences/innsbruck/generic-student-housing-1.jpg"], rooms: [{ type: "Single Room", price: "from €415/mo" }, { type: "Apartment", price: "from €485/mo" }, { type: "2-bed Apt", price: "from €340/mo" }] },
  { name: "Katholisches Studentinnenheim", category: "Non-Profit", operator: "Private (Catholic)", beds: "50", location: "Speckbacherstr. 29", source: "", photos: [], rooms: [{ type: "Single Room", price: "€150–€370/mo" }, { type: "Double Room", price: "€230/mo" }] },
  { name: "Studentenheim Tiroler Jugendherbergswerk", category: "Non-Profit", operator: "Tiroler Jugendherbergswerk", beds: "32", location: "Reichenauerstr. 147", source: "https://www.studentenheim-innsbruck.at/", photos: ["/images/residences/innsbruck/generic-student-housing-3.jpg"], rooms: [{ type: "Single Room", price: "€395/mo" }] },
  { name: "FOX 54", category: "Premium PBSA", operator: "Edinger Tourismusberatung GmbH", beds: "30", location: "Maximilianstr. 2", source: "", photos: [], rooms: [{ type: "Single Apartment", price: "€1,000/mo" }] },
  { name: "Ungarisches Studentenheim", category: "Non-Profit", operator: "Hungarian association", beds: "21", location: "Richard-Wagner-Str. 3", source: "", photos: [], rooms: [{ type: "Single Room", price: "€300–€480/mo" }] },
  { name: "STUV – Studentenunterstützungsverein", category: "Non-Profit", operator: "STUV (Catholic)", beds: "19", location: "Zollerstr. 3", source: "", photos: [], rooms: [{ type: "Single (in WG)", price: "€380/mo" }] },
  { name: "Jesuitenkolleg", category: "Non-Profit", operator: "Jesuiten", beds: "15", location: "Universitätsstr. 8", source: "", photos: [], rooms: [{ type: "Single Room", price: "€290–€480/mo" }] },
  { name: "Studentenhaus Sillgraben", category: "Non-Profit", operator: "Private", beds: "14", location: "Rennweg 34", source: "https://www.sillgraben.at/", photos: ["/images/residences/innsbruck/generic-student-housing-2.jpg"], rooms: [{ type: "Single Room + Board", price: "€910/mo total" }] },
  { name: "Inncampus", category: "Non-Profit", operator: "UPAD (Italian)", beds: "14", location: "Andreas-Hofer-Str. 46/4", source: "https://www.inncampus.at", photos: [], rooms: [{ type: "Single Room", price: "On request" }] },
  { name: "Retterheim", category: "Non-Profit", operator: "Private", beds: "20", location: "Scheuchenstuelgasse 14", source: "", photos: [], rooms: [{ type: "Single Room", price: "On request" }] },
  { name: "Studentenheim Josef Pembauer", category: "Non-Profit", operator: "Pembaurheim", beds: "40", location: "Defreggerstr. 32", source: "http://www.pembaurheim.at/wp/", photos: [], rooms: [{ type: "Single Room", price: "On request" }] },
  /* ── Premium PBSA ── */
  { name: "STUWO Raimund Pradler", category: "Premium PBSA", operator: "STUWO", beds: "87", location: "Kranebitter Allee 30", source: "https://www.stuwo.at/en/dormitories/innsbruck/", photos: ["/images/residences/innsbruck/stuwo-1.jpg", "/images/residences/innsbruck/stuwo-2.jpg", "/images/residences/innsbruck/stuwo-3.jpg", "/images/residences/innsbruck/stuwo-4.jpg"], rooms: [{ type: "Single (all-inclusive)", price: "€689–€749/mo" }] },
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

export default function InnsbruckComparablesPage() {
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
        <img src="/images/banners/innsbruck.jpg" alt="Innsbruck" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/innsbruck" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Innsbruck</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Comparables</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">PBSA Comparables</h1>
          <p className="text-sm text-silver mt-2">{pbsa.length} properties &middot; ~{pbsa.reduce((s, r) => s + parseBeds(r.beds), 0).toLocaleString()} beds &middot; Innsbruck student housing market</p>
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
            <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-white/[0.06] px-6 py-3 bg-midnight/50">
              <button onClick={() => toggleSort("name")} className="col-span-5 text-left font-semibold text-silver cursor-pointer hover:text-snow select-none flex items-center gap-1">
                Property{sortIcon("name")}
              </button>
              <button onClick={() => toggleSort("beds")} className="col-span-2 text-left font-semibold text-silver cursor-pointer hover:text-snow select-none flex items-center gap-1">
                Beds{sortIcon("beds")}
              </button>
              <button onClick={() => toggleSort("minPrice")} className="col-span-3 text-left font-semibold text-silver cursor-pointer hover:text-snow select-none flex items-center gap-1">
                Price Range{sortIcon("minPrice")}
              </button>
              <button onClick={() => toggleSort("category")} className="col-span-2 text-left font-semibold text-silver cursor-pointer hover:text-snow select-none flex items-center gap-1">
                Category{sortIcon("category")}
              </button>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {sorted.map((r) => {
                const c = catColors[r.category];
                const isExpanded = tableExpanded.has(r.name);
                const priceStr = extractPriceRange(r.rooms);

                return (
                  <div key={r.name}>
                    <button
                      onClick={() => toggleTableExpand(r.name)}
                      className="w-full hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 items-start">
                        <div className="col-span-5">
                          <div className="flex items-start gap-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                              <path d="M4 6l4 4 4-4" />
                            </svg>
                            <div className="text-left">
                              <div className="font-bold text-snow">{r.name}</div>
                              <div className="text-xs text-silver/50 mt-0.5">{r.location}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-sm font-medium text-silver-bright">{r.beds}</div>
                        </div>
                        <div className="col-span-3">
                          <div className="text-sm text-emerald-accent font-semibold">{priceStr}</div>
                        </div>
                        <div className="col-span-2">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                            {r.category}
                          </span>
                        </div>
                      </div>

                      <div className="sm:hidden px-4 py-4 text-left">
                        <div className="flex items-start gap-2">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className={`flex-shrink-0 mt-0.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                            <path d="M4 6l4 4 4-4" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-bold text-snow">{r.name}</div>
                            <div className="text-xs text-silver/50 mt-0.5">{r.location}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-silver/60">{r.beds} beds</span>
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${c.bg} ${c.text}`}>
                                <span className={`w-1 h-1 rounded-full ${c.dot}`} />
                                {r.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-emerald-accent font-semibold mt-2">{priceStr}</div>
                      </div>
                    </button>

                    {isExpanded && r.rooms.length > 0 && (
                      <div className="px-4 sm:px-6 py-4 bg-midnight/50 border-t border-white/[0.04]">
                        <div className="bg-midnight border border-white/[0.06] rounded-lg p-4">
                          <h4 className="text-sm font-bold text-snow mb-3 uppercase tracking-wider">Room Types</h4>
                          <div className="space-y-2">
                            {r.rooms.map((room, idx) => (
                              <div key={idx} className="flex justify-between items-center py-2 border-b border-white/[0.04] last:border-b-0">
                                <span className="text-sm text-silver">{room.type}</span>
                                <span className="text-sm font-bold text-snow font-serif">{room.price}</span>
                              </div>
                            ))}
                          </div>
                          {r.source && (
                            <a href={r.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-xs text-emerald-accent/70 hover:text-emerald-accent transition-colors">
                              Source <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1v6" /></svg>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-4 sm:px-6 py-2.5 border-t border-white/[0.06] text-[11px] text-silver/40">
              {sorted.length} {sorted.length === 1 ? "property" : "properties"} &middot; Click rows to expand room details
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
