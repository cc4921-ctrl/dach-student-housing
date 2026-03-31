"use client";

import Link from "next/link";

/* ── Placeholder data ─────────────────────────────────────────────── */

const enrolmentHistory = [
  { year: "2018/19", total: 128_100, intl: 33_300, pctIntl: "26.0%" },
  { year: "2019/20", total: 129_500, intl: 34_800, pctIntl: "26.9%" },
  { year: "2020/21", total: 127_200, intl: 33_900, pctIntl: "26.7%" },
  { year: "2021/22", total: 128_800, intl: 35_600, pctIntl: "27.6%" },
  { year: "2022/23", total: 129_400, intl: 36_400, pctIntl: "28.1%" },
  { year: "2023/24", total: 129_900, intl: 37_200, pctIntl: "28.6%" },
  { year: "2024/25", total: 130_000, intl: 37_570, pctIntl: "28.9%" },
];

const populationHistory = [
  { year: "2018", value: "1,472,000" },
  { year: "2019", value: "1,484,000" },
  { year: "2020", value: "1,488,000" },
  { year: "2021", value: "1,488,000" },
  { year: "2022", value: "1,496,000" },
  { year: "2023", value: "1,504,000" },
  { year: "2024", value: "~1,512,000" },
];

const bedSupplyHistory = [
  { year: "2020", beds: "~11,200", provisionRate: "8.8%" },
  { year: "2021", beds: "~11,400", provisionRate: "8.8%" },
  { year: "2022", beds: "~11,600", provisionRate: "9.0%" },
  { year: "2023", beds: "~11,800", provisionRate: "9.1%" },
  { year: "2024", beds: "~12,000", provisionRate: "9.2%" },
  { year: "2025E", beds: "~12,200", provisionRate: "9.4%" },
  { year: "2028E", beds: "~13,044", provisionRate: "~10.0%" },
];

const rentGrowth = [
  { year: "2020", pbsaAvg: "€1,050", prsMedian: "€980" },
  { year: "2021", pbsaAvg: "€1,100", prsMedian: "€1,020" },
  { year: "2022", pbsaAvg: "€1,180", prsMedian: "€1,100" },
  { year: "2023", pbsaAvg: "€1,260", prsMedian: "€1,180" },
  { year: "2024", pbsaAvg: "€1,320", prsMedian: "€1,240" },
  { year: "2025", pbsaAvg: "€1,374", prsMedian: "€1,290" },
];

const keyTakeaways = [
  "Munich's student population has remained remarkably stable at ~130k, with international share climbing from 26% to 29% — adding ~4,300 international students since 2018.",
  "Provision rate has stagnated at ~9.2%, one of the lowest in Germany, with a bed gap exceeding 14,000.",
  "Pipeline of ~1,044 beds barely dents the deficit — provision rate will only reach ~10% by 2028 even with full delivery.",
  "PRS rents have surged ~32% since 2020, with median now €1,290/mo. PBSA rents have grown ~31% in the same period.",
  "Munich represents the deepest undersupply in the DACH region, with structural demand drivers (16 universities, economic hub) supporting long-term occupancy.",
];

/* ── Helpers ───────────────────────────────────────────────────────── */

function BarChart({ data, maxVal, valueKey, label, color }: { data: { year: string;[k: string]: string | number }[]; maxVal: number; valueKey: string; label: string; color: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-silver/50 uppercase tracking-wider mb-3">{label}</p>
      {data.map((d) => {
        const raw = typeof d[valueKey] === "string" ? parseInt(d[valueKey].replace(/[^0-9]/g, "")) : d[valueKey];
        const pct = Math.max(4, (raw / maxVal) * 100);
        return (
          <div key={d.year} className="flex items-center gap-3">
            <span className="text-[11px] text-silver/60 w-16 text-right font-mono">{d.year}</span>
            <div className="flex-1 h-5 bg-white/[0.03] rounded overflow-hidden">
              <div className={`h-full ${color} rounded transition-all duration-500`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[11px] text-snow font-mono w-20">{typeof d[valueKey] === "number" ? d[valueKey].toLocaleString() : d[valueKey]}</span>
          </div>
        );
      })}
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
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Market Growth</h1>
          <p className="text-sm text-silver mt-2">Student enrolment, supply pipeline &amp; rent trends &middot; 2018–2028</p>
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

        {/* Enrolment Trend */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Student Enrolment Trend</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-silver/50 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">Total Students</th>
                    <th className="pb-3 pr-4">International</th>
                    <th className="pb-3">% Intl</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolmentHistory.map((row, i) => (
                    <tr key={row.year} className={`border-t border-white/[0.04] ${i === enrolmentHistory.length - 1 ? "text-emerald-accent font-semibold" : "text-silver"}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs">{row.year}</td>
                      <td className="py-2.5 pr-4 font-mono">{row.total.toLocaleString()}</td>
                      <td className="py-2.5 pr-4 font-mono">{row.intl.toLocaleString()}</td>
                      <td className="py-2.5 font-mono">{row.pctIntl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <BarChart data={enrolmentHistory} maxVal={140_000} valueKey="total" label="Total Enrolment" color="bg-emerald-accent/60" />
            </div>
          </div>
        </section>

        {/* PBSA Supply & Provision */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">PBSA Supply &amp; Provision Rate</h2>
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
                      <td className="py-2.5 pr-4 font-mono">{row.beds}</td>
                      <td className="py-2.5 font-mono">{row.provisionRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <BarChart data={bedSupplyHistory} maxVal={14_000} valueKey="beds" label="Total PBSA Beds" color="bg-cat-blue/60" />
            </div>
          </div>
        </section>

        {/* Rent Growth */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Rent Growth</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] text-silver/50 uppercase tracking-wider">
                    <th className="pb-3 pr-4">Year</th>
                    <th className="pb-3 pr-4">Avg PBSA</th>
                    <th className="pb-3">PRS Median</th>
                  </tr>
                </thead>
                <tbody>
                  {rentGrowth.map((row, i) => (
                    <tr key={row.year} className={`border-t border-white/[0.04] ${i === rentGrowth.length - 1 ? "text-emerald-accent font-semibold" : "text-silver"}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs">{row.year}</td>
                      <td className="py-2.5 pr-4 font-mono">{row.pbsaAvg}</td>
                      <td className="py-2.5 font-mono">{row.prsMedian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-silver/40 mt-4">CAGR (2020–2025): PBSA ~5.5% · PRS ~5.7%</p>
          </div>
        </section>

        {/* City Population */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">City Population</h2>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6">
            <BarChart data={populationHistory} maxVal={1_600_000} valueKey="value" label="Residents" color="bg-cat-purple/50" />
          </div>
        </section>

      </main>
    </div>
  );
}
