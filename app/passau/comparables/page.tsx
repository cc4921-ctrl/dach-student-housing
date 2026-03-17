import Link from "next/link";

const pbsaProperties = [
  { name: "Studentenwerk Bräugasse", type: "University", operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "95", single: "€260–€550", shared: "—", amenities: "Furnished, all-inclusive (internet, heating, electricity)" },
  { name: "Studentenwerk Maierhofstraße", type: "University", operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "20", single: "€260–€550", shared: "—", amenities: "1 studio + 19 shared-facility rooms, all-inclusive" },
  { name: "Studentenwerk Donau-Schwaben-Straße", type: "University", operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "242", single: "€260–€550", shared: "—", amenities: "2-, 3-, 8-room flats, furnished, all-inclusive" },
  { name: "Studentenwerk Leonhard-Paminger-Str. (New 2025)", type: "University", operator: "Studentenwerk Niederbayern/Oberpfalz", beds: "~100", single: "€368–€386", shared: "—", amenities: "New-build May 2025, modern, all-inclusive" },
  { name: "Wohnbauwerk Marienheim", type: "Non-Profit", operator: "Wohnbauwerk (Catholic Church)", beds: "198", single: "€200–€550", shared: "—", amenities: "City centre, 169 1-bed + 29 2-bed flats, utilities incl." },
  { name: "Wohnbauwerk Haus St. Severin", type: "Non-Profit", operator: "Wohnbauwerk (Catholic Church)", beds: "160", single: "€260–€290", shared: "—", amenities: "2km west, river views, 148 single + 12 double" },
  { name: "Vegis St. Nicola / Kapfinger Wohnheim", type: "Private PBSA", operator: "Vegis Immobilien", beds: "209", single: "€349", shared: "€698 (double)", amenities: "Kitchenette, ensuite, internet, utilities incl." },
];

const prsComps = [
  { type: "WG Room", range: "€350–€479", median: "€425", size: "18–30 m²", count: "Placeholder" },
  { type: "Studio / 1-Room", range: "€400–€990", median: "€550", size: "20–35 m²", count: "Placeholder" },
  { type: "2-Room Apartment", range: "€595–€1,250", median: "€700", size: "40–60 m²", count: "Placeholder" },
  { type: "3-Room Apartment", range: "€700–€1,500", median: "€900", size: "65–85 m²", count: "Placeholder" },
];

export default function PassauComparables() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/passau" className="text-sm text-blue-600 hover:underline">&larr; Passau Overview</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Passau PBSA &amp; PRS Comparables</h1>
          <p className="text-slate-500 mt-1">Student accommodation operators and rental data &middot; <span className="text-amber-600 font-medium">Placeholder</span></p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          Data on this page is placeholder / indicative. Full market scraping pending.
        </div>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">PBSA Properties ({pbsaProperties.length} operators)</h2>
          <div className="space-y-4">
            {pbsaProperties.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-800">{p.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        p.type === "University" ? "bg-blue-50 text-blue-700" :
                        p.type === "Non-Profit" ? "bg-green-50 text-green-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>{p.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Operator: {p.operator}</p>
                    <p className="text-xs text-slate-400 mt-1">{p.amenities}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Beds</p>
                    <p className="font-semibold text-slate-700">{p.beds}</p>
                  </div>
                  <div className="text-right min-w-[120px]">
                    <p className="text-xs text-slate-500">Monthly Rate</p>
                    <p className="text-lg font-bold text-slate-800">{p.single}</p>
                    {p.shared !== "—" && <p className="text-xs text-slate-400">Double: {p.shared}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">PRS Rental Comparables by Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-600">Type</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Size</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Range</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Median</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Data</th>
                </tr>
              </thead>
              <tbody>
                {prsComps.map((c, i) => (
                  <tr key={c.type} className={i % 2 === 0 ? "" : "bg-slate-50/50"}>
                    <td className="p-4 font-medium text-slate-800">{c.type}</td>
                    <td className="p-4 text-slate-500">{c.size}</td>
                    <td className="p-4 font-semibold text-slate-700">{c.range}</td>
                    <td className="p-4 font-bold text-blue-700">{c.median}</td>
                    <td className="p-4 text-xs text-amber-600">{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Market Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">PBSA Properties</p>
              <p className="text-2xl font-bold text-slate-800">7</p>
              <p className="text-xs text-slate-400">~1,024 beds total</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Avg PBSA Rate</p>
              <p className="text-2xl font-bold text-slate-800">€340</p>
              <p className="text-xs text-slate-400">Range: €200–€550</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">New Build Rate</p>
              <p className="text-2xl font-bold text-slate-800">€368–€386</p>
              <p className="text-xs text-slate-400">Leonhard-Paminger (2025)</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Premium PRS</p>
              <p className="text-2xl font-bold text-purple-700">€800–€990</p>
              <p className="text-xs text-slate-400">Placeholder estimate</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-400">
          &copy; 2026 Student Housing DACH &middot; Passau placeholder data
        </div>
      </footer>
    </div>
  );
}
