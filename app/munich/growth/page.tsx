"use client";

import Link from "next/link";

/* ── Placeholder data ─────────────────────────────────────────────── */

const rentHistory = [
  { year: "2020", pbsaAvg: 1050, premiumPbsa: 1650, prsMedian: 980, prsSqm: 22.1 },
  { year: "2021", pbsaAvg: 1100, premiumPbsa: 1720, prsMedian: 1020, prsSqm: 23.0 },
  { year: "2022", pbsaAvg: 1180, premiumPbsa: 1800, prsMedian: 1100, prsSqm: 24.8 },
  { year: "2023", pbsaAvg: 1260, premiumPbsa: 1860, prsMedian: 1180, prsSqm: 26.2 },
  { year: "2024", pbsaAvg: 1320, premiumPbsa: 1900, prsMedian: 1240, prsSqm: 27.4 },
  { year: "2025", pbsaAvg: 1374, premiumPbsa: 1919, prsMedian: 1290, prsSqm: 28.9 },
];

const spreadHistory = [
  { year: "2020", prsVsPbsa: -70, premiumVsPrs: 670, prsVsStudentenwerk: 627 },
  { year: "2021", prsVsPbsa: -80, premiumVsPrs: 700, prsVsStudentenwerk: 667 },
  { year: "2022", prsVsPbsa: -80, premiumVsPrs: 700, prsVsStudentenwerk: 747 },
  { year: "2023", prsVsPbsa: -80, premiumVsPrs: 680, prsVsStudentenwerk: 827 },
  { year: "2024", prsVsPbsa: -80, premiumVsPrs: 660, prsVsStudentenwerk: 887 },
  { year: "2025", prsVsPbsa: -84, premiumVsPrs: 629, prsVsStudentenwerk: 937 },
];

const bedSupplyHistory = [
  { year: "2020", beds: 11200, provisionRate: "8.8%" },
  { year: "2021", beds: 11400, provisionRate: "8.8%" },
  { year: "2022", beds: 11600, provisionRate: "9.0%" },
  { year: "2023", beds: 11800, provisionRate: "9.1%" },
  { year: "2024", beds: 12000, provisionRate: "9.2%" },
  { year: "2025E", beds: 12200, provisionRate: "9.4%" },
  { year: "2028E", beds: 13044, provisionRate: "~10.0%" },
];

const keyTakeaways = [
  "PRS rents have surged ~32% since 2020 (€980 → €1,290/mo). PBSA rents grew ~31% (€1,050 → €1,374/mo) — nearly tracking private market inflation.",
  "Munich is unique: average PBSA rents are higher than PRS median (spread of –€84/mo in 2025), reflecting the premium amenity package and all-inclusive pricing of operators like THE FIZZ and Die Zimmerei.",
  "Premium PBSA rents (€1,919/mo) sit €629 above PRS median — a 49% premium driven by best-in-class fit-out and central locations.",
  "PRS rent per sqm grew from €22.10 to €28.90 (+31%), reflecting persistent supply constraints in Germany's most expensive rental market.",
  "Provision rate has barely budged from 8.8% to 9.2% despite ~800 new beds. Pipeline of ~1,044 beds would only reach ~10% by 2028 — structural undersupply persists.",
];

const summaryStats = [
  { label: "Students (2024/25)", value: "~130,000" },
  { label: "Intl Students", value: "28.9%" },
  { label: "City Population", value: "~1.51M" },
  { label: "PBSA Beds", value: "~12,000" },
];

/* ── Helpers ───────────────────────────────────────────────────────── */

function DualBarRow({ year, val1, val2, max, label1, label2, color1, color2 }: { year: string; val1: number; val2: number; max: number; label1: string; label2: string; color1: string; color2: string }) {
  return (
    <div className="space-y-1">
      <span className="text-[11px] text-silver/60 font-mono">{year}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-silver/40 w-14">{label1}</span>
        <div className="flex-1 h-4 bg-white/[0.03] rounded overflow-hidden">
          <div className={`h-full ${color1} rounded`} style={{ width: `${(val1 / max) * 100}%` }} />
        </div>
        <span className="text-[11px] text-snow font-mono w-14 text-right">€{val1.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-silver/40 w-14">{label2}</span>
        <div className="flex-1 h-4 bg-white/[0.03] rounded overflow-hidden">
          <div className={`h-full ${color2} rounded`} style={{ width: `${(val2 / max) * 100}%` }} />
        </div>
        <span className="text-[11px] text-snow font-mono w-14 text-right">€{val2.toLocaleString()}</span>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function MunichGrowthPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero */}
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/munich" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Munich</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Growth</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Rental Growth</h1>
          <p className="text-sm text-silver mt-2">PBSA &amp; PRS rent trends, spreads &amp; supply dynamics &middot; 2020–2028</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Placeholder banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3 flex items-start gap-3">
          <span className="text-amber-400 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-amber-200 text-sm font-semibold">Placeholder Data</p>
            <p className="text-amber-200/70 text-xs mt-0.5">Figures on this page are indicative estimates pending final data verification. Treat as directional only.</p>
          </div>
        </div>

        {/* Key Takeaways */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Key Takeaways</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 space-y-3">
            {keyTakeaways.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-accent flex-shrink-0" />
                <p className="text-sm text-silver leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Headline rent metrics */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Current Rent Snapshot (2025)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">Avg PBSA</div>
              <div className="text-2xl font-bold text-snow font-serif">€1,374<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-emerald-accent mt-1">+31% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">Premium PBSA</div>
              <div className="text-2xl font-bold text-snow font-serif">€1,919<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-emerald-accent mt-1">+16% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">PRS Median</div>
              <div className="text-2xl font-bold text-snow font-serif">€1,290<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-cat-amber mt-1">+32% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">PRS €/sqm</div>
              <div className="text-2xl font-bold text-snow font-serif">€28.90<span className="text-xs text-silver/40 font-sans font-normal ml-1">/sqm</span></div>
              <div className="text-[11px] text-cat-amber mt-1">+31% since 2020</div>
            </div>
          </div>
        </section>

        {/* Rent Growth Table */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Rent Growth History</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-silver/50 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">Avg PBSA</th>
                    <th className="pb-3 pr-4">Premium PBSA</th>
                    <th className="pb-3 pr-4">PRS Median</th>
                    <th className="pb-3">PRS €/sqm</th>
                  </tr>
                </thead>
                <tbody>
                  {rentHistory.map((row, i) => (
                    <tr key={row.year} className={`border-t border-white/[0.04] ${i === rentHistory.length - 1 ? "text-emerald-accent font-semibold" : "text-silver"}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs">{row.year}</td>
                      <td className="py-2.5 pr-4 font-mono">€{row.pbsaAvg.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 font-mono">€{row.premiumPbsa.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 font-mono">€{row.prsMedian.toLocaleString()}</td>
                      <td className="py-2.5 font-mono">€{row.prsSqm.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">CAGR (2020–2025): Avg PBSA ~5.5% · Premium PBSA ~3.1% · PRS Median ~5.7% · PRS €/sqm ~5.5%</p>
          </div>
        </section>

        {/* PBSA vs PRS Visual */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">PBSA vs PRS Rent Comparison</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 space-y-4">
            {rentHistory.map((row) => (
              <DualBarRow key={row.year} year={row.year} val1={row.pbsaAvg} val2={row.prsMedian} max={1600} label1="PBSA" label2="PRS" color1="bg-emerald-accent/60" color2="bg-cat-amber/60" />
            ))}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-accent/60" /><span className="text-[11px] text-silver/60">Avg PBSA</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-cat-amber/60" /><span className="text-[11px] text-silver/60">PRS Median</span></div>
            </div>
            <p className="text-xs text-silver/40">Note: Munich PBSA averages above PRS median due to all-inclusive pricing at premium operators.</p>
          </div>
        </section>

        {/* Spread Analysis */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Rent Spread Analysis</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-silver/50 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">PRS vs Avg PBSA</th>
                    <th className="pb-3 pr-4">Premium vs PRS</th>
                    <th className="pb-3">PRS vs Studentenwerk</th>
                  </tr>
                </thead>
                <tbody>
                  {spreadHistory.map((row, i) => (
                    <tr key={row.year} className={`border-t border-white/[0.04] ${i === spreadHistory.length - 1 ? "text-emerald-accent font-semibold" : "text-silver"}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs">{row.year}</td>
                      <td className="py-2.5 pr-4 font-mono">{row.prsVsPbsa > 0 ? "+" : ""}€{row.prsVsPbsa}/mo</td>
                      <td className="py-2.5 pr-4 font-mono">+€{row.premiumVsPrs}/mo</td>
                      <td className="py-2.5 font-mono">+€{row.prsVsStudentenwerk}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">PRS–Studentenwerk spread has grown from €627 to €937/mo (+49%), highlighting the acute shortage of subsidised stock.</p>
          </div>
        </section>

        {/* Supply Pipeline (compact) */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Supply &amp; Provision Rate</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-silver/50 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">PBSA Beds</th>
                    <th className="pb-3">Provision Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {bedSupplyHistory.map((row) => (
                    <tr key={row.year} className={`border-t border-white/[0.04] ${row.year.includes("E") ? "text-emerald-accent/70 italic" : "text-silver"}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs">{row.year}</td>
                      <td className="py-2.5 pr-4 font-mono">~{row.beds.toLocaleString()}</td>
                      <td className="py-2.5 font-mono">{row.provisionRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Market Context (compact) */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Market Context</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {summaryStats.map(s => (
              <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className="text-lg font-bold text-snow font-serif">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
