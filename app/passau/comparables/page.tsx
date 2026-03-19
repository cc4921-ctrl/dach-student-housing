"use client";
import Link from "next/link";
import { useState } from "react";

type Category = "All" | "University Subsidised" | "Non-Profit" | "Private PBSA" | "Premium PBSA";

const categories: Category[] = ["All", "University Subsidised", "Non-Profit", "Private PBSA"];

const categoryColors: Record<string, string> = {
  "University Subsidised": "bg-blue-50 text-blue-700 border-blue-200",
  "Non-Profit": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Private PBSA": "bg-slate-50 text-slate-700 border-slate-200",
  "Premium PBSA": "bg-purple-50 text-purple-700 border-purple-200",
};

const pbsa = [
  {
    name: "Studentenwerk Bräugasse", category: "University Subsidised" as Category,
    operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "95", location: "Altstadt",
    rooms: [
      { type: "Single Room", price: "€260–€370/mo" },
      { type: "Single Apartment", price: "€450–€550/mo" },
    ],
  },
  {
    name: "Studentenwerk Maierhofstraße", category: "University Subsidised" as Category,
    operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "20", location: "Near campus",
    rooms: [
      { type: "Studio Apartment", price: "€550/mo" },
      { type: "Shared-Facility Room", price: "€260–€350/mo" },
    ],
  },
  {
    name: "Studentenwerk Donau-Schwaben-Straße", category: "University Subsidised" as Category,
    operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "242", location: "Haidenhof",
    rooms: [
      { type: "Room in 2-Bed Flat", price: "€260–€320/mo" },
      { type: "Room in 3-Bed Flat", price: "€280–€350/mo" },
      { type: "Room in 8-Bed Flat", price: "€260–€300/mo" },
    ],
  },
  {
    name: "Studentenwerk Leonhard-Paminger-Str. (New 2025)", category: "University Subsidised" as Category,
    operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "~100", location: "Near campus",
    rooms: [
      { type: "Single Apartment (new-build)", price: "€368–€386/mo" },
    ],
  },
  {
    name: "Wohnbauwerk Marienheim", category: "Non-Profit" as Category,
    operator: "Wohnbauwerk (Catholic Church)", beds: "198", location: "City centre",
    rooms: [
      { type: "1-Bed Apartment", price: "€350–€550/mo" },
      { type: "2-Bed Apartment (per person)", price: "€200–€300/mo" },
    ],
  },
  {
    name: "Wohnbauwerk Haus St. Severin", category: "Non-Profit" as Category,
    operator: "Wohnbauwerk (Catholic Church)", beds: "160", location: "2km west, river views",
    rooms: [
      { type: "Single Room", price: "€260–€290/mo" },
      { type: "Double Room (per person)", price: "€200–€230/mo" },
    ],
  },
  {
    name: "Vegis St. Nicola / Kapfinger Wohnheim", category: "Private PBSA" as Category,
    operator: "Vegis Immobilien", beds: "209", location: "St. Nicola / Innstadt",
    rooms: [
      { type: "Single Studio (ensuite)", price: "€349/mo" },
      { type: "Double Studio", price: "€698/mo (€349 each)" },
    ],
  },
];

export default function PassauComparables() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All" ? pbsa : pbsa.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link href="/passau" className="text-sm text-blue-600 hover:underline">&larr; Passau</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">PBSA Comparables</h1>
          <p className="text-slate-500 mt-1">Passau &middot; 7 properties &middot; ~1,024 beds</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                filter === cat
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(p => (
            <div key={p.name} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === p.name ? null : p.name)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-800">{p.name}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[p.category]}`}>
                      {p.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{p.operator} &middot; {p.location} &middot; {p.beds} beds</p>
                </div>
                <span className={`text-slate-400 transition-transform ${expanded === p.name ? "rotate-180" : ""}`}>
                  &#9662;
                </span>
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
