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

const pbsaCounts = { Innsbruck: 11, Munich: 7, Passau: 8, total: 26 };
const uniCounts = { Innsbruck: 4, Munich: 6, Passau: 1, total: 11 };

const dataSources = [
  { category: "Private Rental (PRS)", items: [
    { source: "willhaben.at & ImmobilienScout24", scope: "Innsbruck apartment listings", count: 179, date: "March 2026" },
    { source: "wg-gesucht.de & ImmobilienScout24", scope: "Munich studio/1-room listings", count: 2832, date: "March 2026" },
    { source: "WG-gesucht.de & ImmobilienScout24", scope: "Passau apartment listings", count: 276, date: "March 2026" },
  ]},
  { category: "PBSA Comparables", items: [
    { source: "OeAD / Home4students / STUWO", scope: "Innsbruck student housing operators", count: 11, date: "March 2026" },
    { source: "Studierendenwerk / THE FIZZ / Die Zimmerei / YOUNIQ / Campus Viva", scope: "Munich student residences", count: 7, date: "March 2026" },
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
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-44 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Research Data</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">Data Overview</h1>
          <p className="text-silver mt-1 text-sm">{totalListings.toLocaleString()} PRS listings &middot; {pbsaCounts.total} PBSA residences &middot; {uniCounts.total} universities</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* ── Coverage ── */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-4">Dataset Coverage</h2>
          <div className="bg-midnight-light rounded-2xl border border-white/[0.06] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-5 py-3 text-[10px] text-silver/50 uppercase tracking-wider font-semibold">Category</th>
                  <th className="text-right px-5 py-3 text-[10px] text-silver/50 uppercase tracking-wider font-semibold">Innsbruck</th>
                  <th className="text-right px-5 py-3 text-[10px] text-silver/50 uppercase tracking-wider font-semibold">Munich</th>
                  <th className="text-right px-5 py-3 text-[10px] text-silver/50 uppercase tracking-wider font-semibold">Passau</th>
                  <th className="text-right px-5 py-3 text-[10px] text-silver/50 uppercase tracking-wider font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/[0.04]">
                  <td className="px-5 py-3 text-silver-bright font-medium">PRS Listings</td>
                  <td className="px-5 py-3 text-right text-silver">179</td>
                  <td className="px-5 py-3 text-right text-silver">2,832</td>
                  <td className="px-5 py-3 text-right text-silver">276</td>
                  <td className="px-5 py-3 text-right text-emerald-accent font-bold">{totalListings.toLocaleString()}</td>
                </tr>
                <tr className="border-t border-white/[0.04]">
                  <td className="px-5 py-3 text-silver-bright font-medium">PBSA Residences</td>
                  <td className="px-5 py-3 text-right text-silver">{pbsaCounts.Innsbruck}</td>
                  <td className="px-5 py-3 text-right text-silver">{pbsaCounts.Munich}</td>
                  <td className="px-5 py-3 text-right text-silver">{pbsaCounts.Passau}</td>
                  <td className="px-5 py-3 text-right text-emerald-accent font-bold">{pbsaCounts.total}</td>
                </tr>
                <tr className="border-t border-white/[0.04]">
                  <td className="px-5 py-3 text-silver-bright font-medium">Universities</td>
                  <td className="px-5 py-3 text-right text-silver">{uniCounts.Innsbruck}</td>
                  <td className="px-5 py-3 text-right text-silver">{uniCounts.Munich}</td>
                  <td className="px-5 py-3 text-right text-silver">{uniCounts.Passau}</td>
                  <td className="px-5 py-3 text-right text-emerald-accent font-bold">{uniCounts.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Sources ── */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-4">Sources</h2>
          <div className="space-y-4">
            {dataSources.map((group, gi) => (
              <div key={gi} className="bg-midnight-light rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="p-4 border-b border-white/[0.06]">
                  <h3 className="font-semibold text-snow">{group.category}</h3>
                </div>
                <div className="p-4 space-y-2">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                      <div>
                        <span className="text-sm font-medium text-silver-bright">{item.source}</span>
                        <span className="text-xs text-silver/50 ml-2">{item.scope}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-emerald-accent">{item.count.toLocaleString()} records</span>
                        <span className="text-[10px] text-silver/40">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Nav links ── */}
        <div className="flex flex-wrap gap-3">
          {["Innsbruck", "Munich", "Passau"].map(c => (
            <Link key={c} href={`/${c.toLowerCase()}`} className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-5 py-2.5 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all text-sm font-medium">
              {c}
            </Link>
          ))}
          <Link href="/pricing-model" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-5 py-2.5 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all text-sm font-medium">
            Pricing Model
          </Link>
          <Link href="/downloads" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-5 py-2.5 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all text-sm font-medium">
            Downloads
          </Link>
        </div>
      </main>
    </div>
  );
}
