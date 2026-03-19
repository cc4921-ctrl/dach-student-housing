"use client";
import Link from "next/link";
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
    name: "Studierendenwerk München", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "9,000+", location: "Various across Munich",
    rooms: [
      { type: "Single Room (shared facilities)", price: "€280–€320/mo" },
      { type: "Single Apartment", price: "€350–€401/mo" },
      { type: "Shared Room", price: "€200–€350/mo" },
    ],
  },
  {
    name: "Kolpinghaus Kardinal-Wendel-Haus", category: "Non-Profit" as Category,
    operator: "Kolpingwerk", beds: "~200", location: "Near Hauptbahnhof",
    rooms: [
      { type: "Single Room", price: "€270–€500/mo" },
    ],
  },
  {
    name: "Campus Viva München V", category: "Private PBSA" as Category,
    operator: "Campus Viva", beds: "~300", location: "Munich",
    rooms: [
      { type: "Standard Studio", price: "€610/mo" },
      { type: "Premium Studio", price: "€750/mo" },
    ],
  },
  {
    name: "Youniq Munich", category: "Private PBSA" as Category,
    operator: "Youniq", beds: "~250", location: "Munich",
    rooms: [
      { type: "Small Studio", price: "€500–€650/mo" },
      { type: "Standard Studio", price: "€650–€800/mo" },
      { type: "Large Studio", price: "€800–€1,000/mo" },
    ],
  },
  {
    name: "Camplus München", category: "Private PBSA" as Category,
    operator: "Camplus", beds: "~150", location: "Munich",
    rooms: [
      { type: "Single Studio", price: "€600–€750/mo" },
      { type: "Premium Studio", price: "€750–€900/mo" },
    ],
  },
  {
    name: "THE FIZZ Munich", category: "Premium PBSA" as Category,
    operator: "International Campus", beds: "~400", location: "Munich",
    rooms: [
      { type: "Comfort Room", price: "€700–€850/mo" },
      { type: "Standard Studio", price: "€850–€1,000/mo" },
      { type: "Premium Studio", price: "€1,000–€1,100/mo" },
    ],
  },
  {
    name: "Studio M2", category: "Premium PBSA" as Category,
    operator: "Studio M2", beds: "~120", location: "Munich",
    rooms: [
      { type: "Micro Studio (18 m²)", price: "€535/mo" },
      { type: "Standard Studio (22 m²)", price: "€695/mo" },
      { type: "Large Studio (28 m²)", price: "€835/mo" },
    ],
  },
  {
    name: "Die Zimmerei", category: "Premium PBSA" as Category,
    operator: "Die Zimmerei", beds: "~80", location: "Sendling",
    rooms: [
      { type: "Shared Room", price: "€840/mo" },
      { type: "Single Room (shared kitchen)", price: "€990–€1,090/mo" },
    ],
  },
];

export default function MunichComparables() {
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All" ? pbsa : pbsa.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link href="/munich" className="text-sm text-blue-600 hover:underline">&larr; Munich</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">PBSA Comparables</h1>
          <p className="text-slate-500 mt-1">Munich &middot; 8 properties &middot; ~10,500+ beds</p>
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
