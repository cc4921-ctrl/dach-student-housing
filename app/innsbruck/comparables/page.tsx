"use client";
import { useState } from "react";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";

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

export default function InnsbruckComparables() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All" ? pbsa : pbsa.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">PBSA Comparables</h1>
          <p className="text-slate-500 mt-1">Innsbruck &middot; {pbsa.length} properties &middot; ~977 beds</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${filter === cat ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
              {cat}
            </button>
          ))}
        </div>

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

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 py-12">No properties in this category</p>
        )}
      </main>
    </div>
  );
}
