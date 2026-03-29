import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   SUMMARY STATISTICS (from cleaned Excel — March 2026)
   ═══════════════════════════════════════════════════════════════ */

const cityStats = [
  { city: "Innsbruck", listings: 179, median: 1380, mean: 1467, q25: 900, q75: 1710, min: 314, max: 4268, sources: "willhaben.at & ImmobilienScout24" },
  { city: "Munich", listings: 2832, median: 1290, mean: 1416, q25: 950, q75: 1700, min: 175, max: 4890, sources: "wg-gesucht.de & ImmobilienScout24" },
  { city: "Passau", listings: 276, median: 550, mean: 682, q25: 430, q75: 800, min: 200, max: 2000, sources: "WG-gesucht.de & ImmobilienScout24" },
];

const totalListings = cityStats.reduce((a, c) => a + c.listings, 0);

/* ═══════════════════════════════════════════════════════════════
   PBSA & UNIVERSITY COUNTS
   ═══════════════════════════════════════════════════════════════ */

const pbsaCounts = { Innsbruck: 11, Munich: 7, Passau: 8, total: 26 };
const uniCounts = { Innsbruck: 4, Munich: 6, Passau: 1, total: 11 };

/* ═══════════════════════════════════════════════════════════════
   SOURCES
   ═══════════════════════════════════════════════════════════════ */

const dataSources = [
  { category: "Private Rental (PRS)", items: [
    { source: "willhaben.at & ImmobilienScout24", scope: "Innsbruck apartment listings", count: 179, date: "March 2026" },
    { source: "wg-gesucht.de & ImmobilienScout24", scope: "Munich studio/1-room listings", count: 2832, date: "March 2026" },
    { source: "WG-gesucht.de & ImmobilienScout24", scope: "Passau apartment listings", count: 276, date: "March 2026" },
  ]},
  { category: "PBSA Comparables", items: [
    { source: "OeAD / Home4students / STUWO", scope: "Innsbruck student housing operators", count: 11, date: "March 2026" },
    { source: "Studierendenwerk München / THE FIZZ / Die Zimmerei / YOUNIQ / Campus Viva", scope: "Munich student residences", count: 7, date: "March 2026" },
    { source: "Studentenwerk / Wohnbauwerk / Boni / Vegis / River Living", scope: "Passau student residences", count: 8, date: "March 2026" },
  ]},
  { category: "Student Population", items: [
    { source: "University annual reports 2024/25", scope: "Enrollment data all institutions", count: 11, date: "2024/25" },
    { source: "Statistik Austria", scope: "Innsbruck city population", count: 1, date: "2025" },
    { source: "Bayerisches Landesamt für Statistik", scope: "Munich & Passau city population", count: 2, date: "2025" },
  ]},
];

export default function DataPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Overview</h1>
          <p className="text-slate-500 mt-1">{totalListings.toLocaleString()} PRS listings &middot; {pbsaCounts.total} PBSA residences &middot; {uniCounts.total} universities</p>
        </div>

        {/* ── City Summary Stats ── */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Private Rental Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cityStats.map(c => (
              <div key={c.city} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{c.city}</h3>
                <p className="text-xs text-slate-400 mb-4">{c.sources}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-500">Listings</span>
                    <span className="text-lg font-bold text-blue-600">{c.listings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-500">Median</span>
                    <span className="text-lg font-bold text-slate-800">&euro;{c.median.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-500">Mean</span>
                    <span className="text-sm font-semibold text-slate-700">&euro;{c.mean.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-slate-100 my-1" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-500">Q25 &ndash; Q75</span>
                    <span className="text-sm font-medium text-slate-600">&euro;{c.q25.toLocaleString()} &ndash; &euro;{c.q75.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-500">Range</span>
                    <span className="text-sm font-medium text-slate-600">&euro;{c.min.toLocaleString()} &ndash; &euro;{c.max.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Coverage ── */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Dataset Coverage</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Category</th>
                  <th className="text-right px-5 py-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Innsbruck</th>
                  <th className="text-right px-5 py-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Munich</th>
                  <th className="text-right px-5 py-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Passau</th>
                  <th className="text-right px-5 py-3 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="px-5 py-3 text-slate-700 font-medium">PRS Listings</td>
                  <td className="px-5 py-3 text-right text-slate-600">179</td>
                  <td className="px-5 py-3 text-right text-slate-600">2,832</td>
                  <td className="px-5 py-3 text-right text-slate-600">276</td>
                  <td className="px-5 py-3 text-right text-blue-600 font-bold">{totalListings.toLocaleString()}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-5 py-3 text-slate-700 font-medium">PBSA Residences</td>
                  <td className="px-5 py-3 text-right text-slate-600">{pbsaCounts.Innsbruck}</td>
                  <td className="px-5 py-3 text-right text-slate-600">{pbsaCounts.Munich}</td>
                  <td className="px-5 py-3 text-right text-slate-600">{pbsaCounts.Passau}</td>
                  <td className="px-5 py-3 text-right text-blue-600 font-bold">{pbsaCounts.total}</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-5 py-3 text-slate-700 font-medium">Universities</td>
                  <td className="px-5 py-3 text-right text-slate-600">{uniCounts.Innsbruck}</td>
                  <td className="px-5 py-3 text-right text-slate-600">{uniCounts.Munich}</td>
                  <td className="px-5 py-3 text-right text-slate-600">{uniCounts.Passau}</td>
                  <td className="px-5 py-3 text-right text-blue-600 font-bold">{uniCounts.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Sources ── */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Sources</h2>
          <div className="space-y-4">
            {dataSources.map((group, gi) => (
              <div key={gi} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">{group.category}</h3>
                </div>
                <div className="p-4 space-y-2">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-slate-700">{item.source}</span>
                        <span className="text-xs text-slate-400 ml-2">{item.scope}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-blue-600">{item.count.toLocaleString()} records</span>
                        <span className="text-[10px] text-slate-400">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Download ── */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Source Data Download</h2>
            <p className="text-sm text-slate-500 mt-1">Full dataset with all {totalListings.toLocaleString()} listings across Innsbruck, Munich &amp; Passau</p>
          </div>
          <a
            href="https://github.com/cc4921-ctrl/dach-student-housing/raw/main/public/Student_Rental_Listings_Innsbruck_Passau_Munich.xlsx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap"
          >
            Download Excel (.xlsx)
          </a>
        </section>

        {/* ── Back links ── */}
        <div className="flex flex-wrap gap-3">
          <Link href="/innsbruck" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            Innsbruck
          </Link>
          <Link href="/munich" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            Munich
          </Link>
          <Link href="/passau" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            Passau
          </Link>
          <Link href="/justifications" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            Justifications
          </Link>
        </div>
      </main>
    </div>
  );
}
