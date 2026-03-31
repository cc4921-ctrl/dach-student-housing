"use client";

import Link from "next/link";

/* ── Placeholder data ─────────────────────────────────────────────── */

const rentHistory = [
  { year: "2020", pbsaAvg: 400, premiumPbsa: 620, prsMedian: 780, prsSqm: 22.5 },
  { year: "2021", pbsaAvg: 420, premiumPbsa: 650, prsMedian: 830, prsSqm: 24.0 },
  { year: "2022", pbsaAvg: 450, premiumPbsa: 680, prsMedian: 920, prsSqm: 26.2 },
  { year: "2023", pbsaAvg: 480, premiumPbsa: 700, prsMedian: 1050, prsSqm: 28.5 },
  { year: "2024", pbsaAvg: 500, premiumPbsa: 720, prsMedian: 1200, prsSqm: 30.1 },
  { year: "2025", pbsaAvg: 520, premiumPbsa: 749, prsMedian: 1380, prsSqm: 32.1 },
];

const spreadHistory = [
  { year: "2020", prsVsPbsa: 380, premiumVsPrs: -160, prsVsStudentenwerk: 406 },
  { year: "2021", prsVsPbsa: 410, premiumVsPrs: -180, prsVsStudentenwerk: 456 },
  { year: "2022", prsVsPbsa: 470, premiumVsPrs: -240, prsVsStudentenwerk: 546 },
  { year: "2023", prsVsPbsa: 570, premiumVsPrs: -350, prsVsStudentenwerk: 676 },
  { year: "2024", prsVsPbsa: 700, premiumVsPrs: -480, prsVsStudentenwerk: 826 },
  { year: "2025", prsVsPbsa: 860, premiumVsPrs: -631, prsVsStudentenwerk: 1006 },
];

const bedSupplyHistory = [
  { year: "2020", beds: 2600, provisionRate: "7.6%" },
  { year: "2021", beds: 2700, provisionRate: "7.9%" },
  { year: "2022", beds: 2800, provisionRate: "8.1%" },
  { year: "2023", beds: 2900, provisionRate: "8.3%" },
  { year: "2024", beds: 3000, provisionRate: "8.6%" },
  { year: "2025E", beds: 3100, provisionRate: "8.9%" },
  { year: "2028E", beds: 3920, provisionRate: "~11.2%" },
];

const keyTakeaways = [
  "PRS rents have exploded ~77% since 2020 (€780 → €1,380/mo) — the highest growth rate of any DACH study city — while PBSA rents grew only ~30% (€400 → €520/mo).",
  "The PRS–PBSA spread has more than doubled from €380/mo to €860/mo, creating enormous headroom for PBSA operators to price competitively while capturing margin.",
  "Even premium PBSA (STUWO at €749/mo) sits €631/mo below PRS median — an unprecedented discount that reflects both PBSA pricing discipline and runaway PRS inflation.",
  "PRS rent per sqm surged from €22.50 to €32.10 (+43%), the highest absolute level among the three study cities, driven by Innsbruck's geographic constraints.",
  "Provision rate remains critically low at 8.6%. Pipeline of ~920 beds would only reach ~11.2% by 2028 — well below the European ~25% average — sustaining structural undersupply.",
];

const summaryStats = [
  { label: "Students (2024/25)", value: "~35,000" },
  { label: "Intl Students", value: "43.6%" },
  { label: "City Population", value: "~131,000" },
  { label: "PBSA Beds", value: "~3,000" },
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

export default function InnsbruckGrowthPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero */}
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/innsbruck.jpg" alt="Innsbruck" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/innsbruck" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Innsbruck</Link>
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
              <div className="text-2xl font-bold text-snow font-serif">€520<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-emerald-accent mt-1">+30% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">Premium PBSA</div>
              <div className="text-2xl font-bold text-snow font-serif">€749<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-emerald-accent mt-1">+21% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">PRS Median</div>
              <div className="text-2xl font-bold text-snow font-serif">€1,380<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
              <div className="text-[11px] text-cat-amber mt-1">+77% since 2020</div>
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">PRS €/sqm</div>
              <div className="text-2xl font-bold text-snow font-serif">€32.10<span className="text-xs text-silver/40 font-sans font-normal ml-1">/sqm</span></div>
              <div className="text-[11px] text-cat-amber mt-1">+43% since 2020</div>
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
                      <td className="py-2.5 pr-4 font-mono">€{row.prsMedian.toLocaleString()}</td>
                      <td className="py-2.5 font-mono">€{row.prsSqm.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">CAGR (2020–2025): Avg PBSA ~5.4% · Premium PBSA ~3.9% · PRS Median ~12.1% · PRS €/sqm ~7.4%</p>
          </div>
        </section>

        {/* PBSA vs PRS Visual */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">PBSA vs PRS Rent Comparison</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 space-y-4">
            {rentHistory.map((row) => (
              <DualBarRow key={row.year} year={row.year} val1={row.pbsaAvg} val2={row.prsMedian} max={1500} label1="PBSA" label2="PRS" color1="bg-emerald-accent/60" color2="bg-cat-amber/60" />
            ))}
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.04]">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-emerald-accent/60" /><span className="text-[11px] text-silver/60">Avg PBSA</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-cat-amber/60" /><span className="text-[11px] text-silver/60">PRS Median</span></div>
            </div>
            <p className="text-xs text-silver/40">Note: Innsbruck shows the widest PBSA–PRS gap of any study city, with PRS rents 2.7x average PBSA.</p>
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
                      <td className="py-2.5 pr-4 font-mono">{row.premiumVsPrs > 0 ? "+" : ""}€{row.premiumVsPrs}/mo</td>
                      <td className="py-2.5 font-mono">+€{row.prsVsStudentenwerk.toLocaleString()}/mo</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">PRS–PBSA spread has grown from €380 to €860/mo (+126%), the most dramatic divergence in the DACH region.</p>
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
