"use client";
import { useState, useMemo } from "react";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";
type ViewMode = "cards" | "table";
type SortKey = "name" | "operator" | "beds" | "category" | "minPrice";
type SortDir = "asc" | "desc";

const categories: Category[] = ["All", "University Subsidised", "Non-Profit", "Private PBSA", "Premium PBSA"];

const categoryColors: Record<string, string> = {
  "University Subsidised": "bg-blue-50 text-blue-700 border-blue-200",
  "Non-Profit": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Private PBSA": "bg-slate-50 text-slate-700 border-slate-200",
  "Premium PBSA": "bg-purple-50 text-purple-700 border-purple-200",
};

const pbsa = [
  {
    name: "Home4students Höttinger Au 34", category: "University Subsidised" as Category,
    operator: "Home4students / OeAD", beds: "~120", location: "Höttinger Au 34",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/hoettinger-au-34/",
    rooms: [
      { type: "Single Room", price: "from €324/mo" },
      { type: "Single (higher category)", price: "€505/mo" },
    ],
  },
  {
    name: "Home4students Technikerstraße 7", category: "University Subsidised" as Category,
    operator: "Home4students / OeAD", beds: "~100", location: "Technikerstraße 7",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/technikerstrasse/",
    rooms: [
      { type: "Single Room", price: "from €314/mo" },
      { type: "Single (higher category)", price: "€455/mo" },
    ],
  },
  {
    name: "Home4students Euregio-Campus", category: "University Subsidised" as Category,
    operator: "Home4students", beds: "~80", location: "Erzherzog-Eugen-Str. 39",
    source: "https://www.home4students.at/en/our-dormitories/dormitories-innsbruck/dorm-euregio-campus/",
    rooms: [
      { type: "Single Room", price: "€480–€500/mo" },
    ],
  },
  {
    name: "OeAD GreenINN", category: "Non-Profit" as Category,
    operator: "OeAD Housing", beds: "~200", location: "Near university",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/",
    rooms: [
      { type: "Standard Single", price: "from €425/mo" },
      { type: "Premium Single", price: "€535/mo" },
    ],
  },
  {
    name: "OeAD Reichenauer Straße", category: "Non-Profit" as Category,
    operator: "OeAD Housing", beds: "~100", location: "Reichenauer Straße",
    source: "https://www.oeadstudenthousing.at/en/accommodation/innsbruck/",
    rooms: [
      { type: "Single Room", price: "from €488/mo" },
    ],
  },
  {
    name: "Studentenheim Saggen", category: "Non-Profit" as Category,
    operator: "Ev. Studentenheim", beds: "~60", location: "Saggen district",
    source: "https://www.studentenwohnheim-saggen.at/",
    rooms: [
      { type: "Single Room", price: "€380–€450/mo" },
      { type: "Shared Room", price: "€300–€350/mo" },
    ],
  },
  {
    name: "Studentenhaus Sillgraben", category: "Non-Profit" as Category,
    operator: "Sillgraben e.V.", beds: "~50", location: "Rennweg 34, Saggen",
    source: "https://www.sillgraben.at/",
    rooms: [
      { type: "Single (ensuite)", price: "€380–€420/mo" },
    ],
  },
  {
    name: "Canisianum", category: "Non-Profit" as Category,
    operator: "Akademikerhilfe", beds: "~80", location: "Central Innsbruck",
    source: "https://www.akademikerhilfe.at/en/canisianum",
    rooms: [
      { type: "Single Room", price: "€350–€450/mo" },
    ],
  },
  {
    name: "Studentenheim Innsbruck (Reichenau)", category: "Non-Profit" as Category,
    operator: "Studentenheim Innsbruck", beds: "~100", location: "Reichenauerstr. 147",
    source: "https://www.studentenheim-innsbruck.at/",
    rooms: [
      { type: "Single Room", price: "€380/mo" },
    ],
  },
  {
    name: "STUWO Innsbruck", category: "Premium PBSA" as Category,
    operator: "STUWO", beds: "87", location: "Pradl",
    source: "https://www.stuwo.at/en/dormitories/innsbruck/",
    rooms: [
      { type: "Cat. A Studio (21–23 m², ensuite)", price: "€789/mo" },
      { type: "Cat. B Shared Apt (11–12 m²)", price: "€729/mo" },
    ],
  },
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

export default function InnsbruckComparables() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("cards");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filtered = filter === "All" ? pbsa : pbsa.filter(p => p.category === filter);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "operator": cmp = a.operator.localeCompare(b.operator); break;
        case "beds": cmp = parseBeds(a.beds) - parseBeds(b.beds); break;
        case "category": cmp = a.category.localeCompare(b.category); break;
        case "minPrice": cmp = parseMinPrice(a.rooms[0].price) - parseMinPrice(b.rooms[0].price); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  }

  const sortIcon = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">PBSA Comparables</h1>
            <p className="text-slate-500 mt-1">Innsbruck &middot; {pbsa.length} properties &middot; ~977 beds</p>
          </div>
          <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setView("cards")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${view === "cards" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-700"}`}>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/><rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
                Cards
              </span>
            </button>
            <button onClick={() => setView("table")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${view === "table" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-700"}`}>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="3" x2="15" y2="3"/><line x1="1" y1="8" x2="15" y2="8"/><line x1="1" y1="13" x2="15" y2="13"/><line x1="5" y1="1" x2="5" y2="15"/><line x1="10" y1="1" x2="10" y2="15"/></svg>
                Table
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${filter === cat ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
              {cat}
            </button>
          ))}
        </div>

        {view === "cards" ? (
          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button onClick={() => setExpanded(expanded === p.name ? null : p.name)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-800">{p.name}</h3>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[p.category]}`}>{p.category}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{p.operator} &middot; {p.location} &middot; {p.beds} beds</p>
                  </div>
                  <span className={`text-slate-400 transition-transform ${expanded === p.name ? "rotate-180" : ""}`}>&#9662;</span>
                </button>

                {expanded === p.name && (
                  <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-slate-500">
                          <th className="text-left pb-2 font-medium">Room Type</th>
                          <th className="text-right pb-2 font-medium">Monthly Rent</th>
                        </tr>
                      </thead>
                      <tbody>
                        {p.rooms.map(r => (
                          <tr key={r.type} className="border-t border-slate-100">
                            <td className="py-2.5 text-slate-700">{r.type}</td>
                            <td className="py-2.5 text-right font-semibold text-slate-800">{r.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <a href={p.source} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Source &uarr;</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th onClick={() => toggleSort("name")} className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900 select-none whitespace-nowrap">
                      Property{sortIcon("name")}
                    </th>
                    <th onClick={() => toggleSort("category")} className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900 select-none whitespace-nowrap">
                      Category{sortIcon("category")}
                    </th>
                    <th onClick={() => toggleSort("operator")} className="text-left px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900 select-none whitespace-nowrap">
                      Operator{sortIcon("operator")}
                    </th>
                    <th onClick={() => toggleSort("beds")} className="text-right px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900 select-none whitespace-nowrap">
                      Beds{sortIcon("beds")}
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">Room Types</th>
                    <th onClick={() => toggleSort("minPrice")} className="text-right px-4 py-3 font-semibold text-slate-600 cursor-pointer hover:text-slate-900 select-none whitespace-nowrap">
                      Price Range{sortIcon("minPrice")}
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-slate-600 whitespace-nowrap">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((p, i) => (
                    <tr key={p.name} className={`border-b border-slate-100 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{p.location}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${categoryColors[p.category]}`}>{p.category}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{p.operator}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-700">{p.beds}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          {p.rooms.map(r => (
                            <div key={r.type} className="text-xs text-slate-500">{r.type}</div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="space-y-0.5">
                          {p.rooms.map(r => (
                            <div key={r.type} className="text-xs font-semibold text-slate-700">{r.price}</div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <a href={p.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-xs hover:underline">Link</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-400">
              {sorted.length} {sorted.length === 1 ? "property" : "properties"} &middot; Click column headers to sort
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 py-12">No properties in this category</p>
        )}
      </main>
    </div>
  );
}
