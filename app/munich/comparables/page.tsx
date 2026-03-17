import Link from "next/link";

const pbsaProperties = [
  { name: "Studierendenwerk München (various)", type: "University", operator: "Studierendenwerk München", beds: "9,000+", single: "€280–€401", shared: "€200–€350", amenities: "Furnished, utilities included, long waitlists (1-7 semesters)" },
  { name: "Kolpinghaus Kardinal-Wendel-Haus", type: "Non-Profit", operator: "Kolpingwerk", beds: "~200", single: "€270–€500", shared: "—", amenities: "All-inclusive, city centre location, near Hauptbahnhof" },
  { name: "Campus Viva München V", type: "Private PBSA", operator: "Campus Viva", beds: "~300", single: "€610+", shared: "—", amenities: "Fully furnished, modern, kitchenette" },
  { name: "THE FIZZ Munich", type: "Premium PBSA", operator: "THE FIZZ (International Campus)", beds: "~400", single: "€700–€1,100", shared: "—", amenities: "Gym, common areas, 24h security, utilities incl." },
  { name: "Youniq Munich", type: "Private PBSA", operator: "Youniq", beds: "~250", single: "€500–€1,000", shared: "—", amenities: "Furnished student apartments, modern amenities" },
  { name: "Camplus München (est.)", type: "Private PBSA", operator: "Camplus", beds: "~150", single: "€600–€900", shared: "—", amenities: "Italian PBSA operator, community focus" },
];

const prsComps = [
  { type: "WG Room", range: "€400–€900", median: "€700", size: "12–20 m²", count: "High volume" },
  { type: "Studio / 1-Room", range: "€610–€1,600", median: "€1,200", size: "20–35 m²", count: "Placeholder" },
  { type: "2-Room Apartment", range: "€1,090–€2,800", median: "€1,565", size: "45–65 m²", count: "Placeholder" },
  { type: "3-Room Apartment", range: "€1,500–€3,000+", median: "€2,000", size: "70–95 m²", count: "Placeholder" },
];

export default function MunichComparables() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/munich" className="text-sm text-blue-600 hover:underline">&larr; Munich Overview</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Munich PBSA &amp; PRS Comparables</h1>
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800 truncate">{p.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        p.type === "University" ? "bg-blue-50 text-blue-700" :
                        p.type === "Premium PBSA" ? "bg-purple-50 text-purple-700" :
                        p.type === "Non-Profit" ? "bg-green-50 text-green-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>{p.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Operator: {p.operator}</p>
                    <p className="text-xs text-slate-400 mt-1">{p.amenities}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Est. Beds</p>
                    <p className="font-semibold text-slate-700">{p.beds}</p>
                  </div>
                  <div className="text-right min-w-[120px]">
                    <p className="text-xs text-slate-500">Single Room</p>
                    <p className="text-lg font-bold text-slate-800">{p.single}</p>
                    {p.shared !== "—" && <p className="text-xs text-slate-400">Shared: {p.shared}</p>}
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
              <p className="text-2xl font-bold text-slate-800">6+</p>
              <p className="text-xs text-slate-400">~10,300+ beds</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Avg Public PBSA</p>
              <p className="text-2xl font-bold text-slate-800">€401</p>
              <p className="text-xs text-slate-400">Studierendenwerk average</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Private PBSA Range</p>
              <p className="text-2xl font-bold text-slate-800">€500–€1,100</p>
              <p className="text-xs text-slate-400">THE FIZZ, Youniq, Campus Viva</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Premium PRS</p>
              <p className="text-2xl font-bold text-purple-700">€1,600–€2,800</p>
              <p className="text-xs text-slate-400">Placeholder estimate</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-400">
          &copy; 2026 Student Housing DACH &middot; Munich placeholder data
        </div>
      </footer>
    </div>
  );
}
