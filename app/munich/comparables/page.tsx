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
    name: "Studierendenwerk Studentenstadt Freimann", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~2,500", location: "Christoph-Probst-Str., Freimann",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "Single Room", price: "€280–€400/mo" },
      { type: "Studio Apartment", price: "€380–€504/mo" },
    ],
  },
  {
    name: "Studierendenwerk Felsennelkenanger", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~800", location: "Felsennelkenanger, Munich North",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "Single (shared facilities)", price: "€280–€370/mo" },
      { type: "WG for 2–6 people", price: "€316–€455/mo" },
    ],
  },
  {
    name: "Studierendenwerk Agnes-/Adelheidstraße", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~450", location: "Agnesstraße, Central Munich",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "WG Room (3–6 people)", price: "€354–€371/mo" },
    ],
  },
  {
    name: "Studierendenwerk Kaulbachstraße", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~200", location: "Kaulbachstraße, English Garden",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "WG Room (2–3 people)", price: "€456–€505/mo" },
    ],
  },
  {
    name: "Studierendenwerk Chiemgaustraße", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~600", location: "Chiemgaustraße, South/West",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "WG Room (4–6 people)", price: "€317–€411/mo" },
    ],
  },
  {
    name: "Studierendenwerk Max-Bill-Straße", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~400", location: "Max-Bill-Straße, Munich North",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "Single / WG", price: "€280–€400/mo" },
    ],
  },
  {
    name: "Studierendenwerk Heidemannstraße", category: "University Subsidised" as Category,
    operator: "Studierendenwerk München", beds: "~350", location: "Heidemannstraße, Munich North",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
    rooms: [
      { type: "Single / WG", price: "€280–€400/mo" },
    ],
  },
  {
    name: "Ludwigskolleg (Erzdiözese)", category: "Non-Profit" as Category,
    operator: "Erzdiözese München", beds: "170", location: "Guerickestraße 19, 80805",
    source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime",
    rooms: [
      { type: "Single (shared bath)", price: "€280–€400/mo" },
      { type: "Single (private bath)", price: "€350–€500/mo" },
    ],
  },
  {
    name: "Roncalli-Kolleg (Erzdiözese)", category: "Non-Profit" as Category,
    operator: "Erzdiözese München", beds: "124", location: "Nymphenburger Str. 99, 80636",
    source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime",
    rooms: [
      { type: "Single (shared facilities)", price: "€280–€400/mo" },
    ],
  },
  {
    name: "Sophie-Barat-Haus (Erzdiözese)", category: "Non-Profit" as Category,
    operator: "Erzdiözese München", beds: "104", location: "Central Munich",
    source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime",
    rooms: [
      { type: "Single (women only)", price: "€280–€400/mo" },
    ],
  },
  {
    name: "Theresianum (Erzdiözese)", category: "Non-Profit" as Category,
    operator: "Erzdiözese München", beds: "63", location: "Kirchenstraße 6, 81675",
    source: "https://www.erzbistum-muenchen.de/bildung/studium/wohnheime",
    rooms: [
      { type: "Single (women, private bath)", price: "€350–€500/mo" },
    ],
  },
  {
    name: "Kolpinghaus Kardinal-Wendel-Haus", category: "Non-Profit" as Category,
    operator: "Kolpingwerk", beds: "~200", location: "Near Hauptbahnhof",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/further-accommodation/privately-run-halls-of-residence/",
    rooms: [
      { type: "Single Room", price: "€270–€500/mo" },
    ],
  },
  {
    name: "ESWM Evangelische Studentenwohnheime", category: "Non-Profit" as Category,
    operator: "ESWM e.V.", beds: "~300", location: "Various locations",
    source: "https://www.eswm.de/en/residences/overview.html",
    rooms: [
      { type: "Single / WG", price: "€280–€450/mo" },
    ],
  },
  {
    name: "Campus Viva München V", category: "Private PBSA" as Category,
    operator: "Campus Viva", beds: "~300", location: "Munich",
    source: "https://www.campusviva.de/en/renting/munich/",
    rooms: [
      { type: "Standard Studio", price: "€610/mo" },
      { type: "Premium Studio", price: "€750/mo" },
    ],
  },
  {
    name: "Campus Viva München VI", category: "Private PBSA" as Category,
    operator: "Campus Viva", beds: "~280", location: "Munich",
    source: "https://www.campusviva.de/en/renting/muenchen-vi/",
    rooms: [
      { type: "Standard Studio", price: "€620/mo" },
    ],
  },
  {
    name: "Youniq Munich", category: "Private PBSA" as Category,
    operator: "UPARTMENTS / Youniq", beds: "~250", location: "Munich",
    source: "https://www.residenceetudiante.fr/en/residence/youniq-munich.html",
    rooms: [
      { type: "Standard Studio (12 m²)", price: "€704/mo" },
    ],
  },
  {
    name: "Studio M2 (Building 1 & 2)", category: "Private PBSA" as Category,
    operator: "Studio M2", beds: "~400", location: "Munich",
    source: "https://studentenappartements-muenchen.de/en/",
    rooms: [
      { type: "Small Studio (21 m²)", price: "€560/mo" },
      { type: "Medium Studio (26 m²)", price: "€670/mo" },
      { type: "Large Studio (32 m²)", price: "€845/mo" },
    ],
  },
  {
    name: "THE FIZZ Munich", category: "Premium PBSA" as Category,
    operator: "International Campus", beds: "218", location: "Hanebergstraße",
    source: "https://www.the-fizz.com/en/student-accommodation/munich/",
    rooms: [
      { type: "Comfort Room", price: "€1,086–€1,424/mo" },
      { type: "Premium Studio", price: "€1,424–€1,919/mo" },
    ],
  },
  {
    name: "Die Zimmerei", category: "Premium PBSA" as Category,
    operator: "Die Zimmerei", beds: "287", location: "Resi-Huber-Platz 1, Sendling",
    source: "https://zimmerei.apartments/en/rent-apartment-munich/",
    rooms: [
      { type: "Shared Bude (13 m²)", price: "€840/mo" },
      { type: "Basic Bude (15 m²)", price: "€1,060/mo" },
      { type: "Bigger Bude (20 m²)", price: "€1,080/mo" },
      { type: "Large / Maxi / XL Bude", price: "€1,200–€1,520/mo" },
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
          <p className="text-slate-500 mt-1">Munich &middot; {pbsa.length} properties &middot; ~7,996 beds</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
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
