"use client";

import Link from "next/link";

/* ── Placeholder data ─────────────────────────────────────────────── */

const rentHistory = [
  { year: "2020", pbsaAvg: 340, premiumPbsa: 480, prsMedian: 420, prsSqm: 13.8 },
  { year: "2021", pbsaAvg: 350, premiumPbsa: 500, prsMedian: 440, prsSqm: 14.5 },
  { year: "2022", pbsaAvg: 365, premiumPbsa: 530, prsMedian: 475, prsSqm: 15.6 },
  { year: "2023", pbsaAvg: 380, premiumPbsa: 555, prsMedian: 510, prsSqm: 16.8 },
  { year: "2024", pbsaAvg: 390, premiumPbsa: 575, prsMedian: 535, prsSqm: 17.5 },
  { year: "2025", pbsaAvg: 397, premiumPbsa: 591, prsMedian: 550, prsSqm: 18.3 },
];

const spreadHistory = [
  { year: "2020", prsVsPbsa: 80, premiumVsPrs: 60, prsVsStudentenwerk: 95 },
  { year: "2021", prsVsPbsa: 90, premiumVsPrs: 60, prsVsStudentenwerk: 115 },
  { year: "2022", prsVsPbsa: 110, premiumVsPrs: 55, prsVsStudentenwerk: 150 },
  { year: "2023", prsVsPbsa: 130, premiumVsPrs: 45, prsVsStudentenwerk: 185 },
  { year: "2024", prsVsPbsa: 145, premiumVsPrs: 40, prsVsStudentenwerk: 210 },
  { year: "2025", prsVsPbsa: 153, premiumVsPrs: 41, prsVsStudentenwerk: 225 },
];

const bedSupplyHistory = [
  { year: "2020", beds: 1540, provisionRate: "13.5%" },
  { year: "2021", beds: 1540, provisionRate: "13.9%" },
  { year: "2022", beds: 1695, provisionRate: "15.6%" },
  { year: "2023", beds: 1695, provisionRate: "15.9%" },
  { year: "2024", beds: 1895, provisionRate: "17.9%" },
  { year: "2025E", beds: 1895, provisionRate: "17.9%" },
  { year: "2028E", beds: 2324, provisionRate: "~22.0%" },
];

const keyTakeaways = [
  "PRS rents have grown ~31% since 2020 (€420 → €550/mo), outpacing PBSA rent growth of ~17% (€340 → €397/mo) — widening the affordability gap that PBSA operators can capture.",
  "The PRS–PBSA spread has nearly doubled from €80/mo to €153/mo, meaning students increasingly pay a premium for private market housing over purpose-built stock.",
  "Premium PBSA (River Living market-rate) rents grew ~23% from €480 to €591/mo, sitting €41/mo above PRS median — suggesting pricing power for high-quality product.",
  "PRS rent per sqm climbed from €13.80 to €18.30 — a 33% increase — reflecting both rent inflation and a shift toward smaller, higher-density listings.",
  "PBSA provision rate improved from 13.5% to 17.9%, but pipeline of ~429 beds (incl. Stonehill 291) would push this to ~22% by 2028 — still below the European average of ~25%.",
];

const summaryStats = [
  { label: "Students (2024/25)", value: "10,568" },
  { label: "Intl Students", value: "18.1%" },
  { label: "City Population", value: "~54,000" },
  { label: "PBSA Beds", value: "~1,895" },
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
        <span className="text-[11px] text-snow font-mono w-12 text-right">€{val1}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-silver/40 w-14">{label2}</span>
        <div className="flex-1 h-4 bg-white/[0.03] rounded overflow-hidden">
          <div className={`h-full ${color2} rounded`} style={{ width: `${(val2 / max) * 100}%` }} />
        </div>
        <span className="text-[11px] text-snow font-mono w-12 text-right">€{val2}</span>
      </div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function PassauGrowthPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero */}
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/passau.jpg" alt="Passau" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/passau" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Passau</Link>
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
              <div className="text-2xl font-bold text-snow font-serif">€397<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-emerald-accent mt-1">+17% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">Premium PBSA</div>
              <div className="text-2xl font-bold text-snow font-serif">€591<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-emerald-accent mt-1">+23% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">PRS Median</div>
              <div className="text-2xl font-bold text-snow font-serif">€550<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-cat-amber mt-1">+31% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">PRS €/sqm</div>
              <div className="text-2xl font-bold text-snow font-serif">€18.30<span className="text-xs text-silver/40 font-sans font-normal ml-1">/sqm</span></div>
              <div className="text-[11px] text-cat-amber mt-1">+33% since 2020</div>
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
                      <td className="py-2.5 pr-4 font-mono">€{row.pbsaAvg}</td>
                      <td className="py-2.5 pr-4 font-mono">€{row.premiumPbsa}</td>
                      <td className="py-2.5 pr-4 font-mono">€{row.prsMedian}</td>
                      <td className="py-2.5 font-mono">€{row.prsSqm.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">CAGR (2020–2025): Avg PBSA ~3.1% · Premium PBSA ~4.3% · PRS Median ~5.6% · PRS €/sqm ~5.8%</p>
          </div>
        </section>

        {/* PBSA vs PRS Visual */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">PBSA vs PRS Rent Comparison</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 space-y-4">
            {rentHistory.map((row) => (
              <DualBarRow key={row.year} year={row.year} val1={row.pbsaAvg} val2={row.prsMedian} max={650} label1="PBSA" label2="PRS" color1="bg-emerald-accent/60" color2="bg-cat-amber/60" />
            ))}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-accent/60" /><span className="text-[11px] text-silver/60">Avg PBSA</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-cat-amber/60" /><span className="text-[11px] text-silver/60">PRS Median</span></div>
            </div>
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
                      <td className="py-2.5 pr-4 font-mono">+€{row.prsVsPbsa}/mo</td>
                      <td className="py-2.5 pr-4 font-mono">+€{row.premiumVsPrs}/mo</td>
                      <td className="py-2.5 font-mono">+€{row.prsVsStudentenwerk}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">PRS–PBSA spread has nearly doubled (+91%), reflecting PRS inflation outpacing managed PBSA pricing.</p>
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
