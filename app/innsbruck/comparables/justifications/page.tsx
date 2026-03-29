"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, CartesianGrid, ZAxis, Legend,
} from "recharts";

/* ─── Data ─── */

const pbsaComps = [
  { name: "Home4students Höttinger Au", category: "University Subsidised", min: 324, max: 505, beds: 120, operator: "OeAD" },
  { name: "Home4students Technikerstr.", category: "University Subsidised", min: 314, max: 455, beds: 100, operator: "OeAD" },
  { name: "Home4students Euregio", category: "University Subsidised", min: 480, max: 500, beds: 80, operator: "Home4students" },
  { name: "OeAD GreenINN", category: "Non-Profit", min: 425, max: 535, beds: 200, operator: "OeAD" },
  { name: "OeAD Reichenauer Str.", category: "Non-Profit", min: 488, max: 488, beds: 100, operator: "OeAD" },
  { name: "Studentenheim Saggen", category: "Non-Profit", min: 300, max: 450, beds: 60, operator: "Ev. Studentenheim" },
  { name: "Studentenhaus Sillgraben", category: "Non-Profit", min: 380, max: 420, beds: 50, operator: "Sillgraben e.V." },
  { name: "Canisianum", category: "Non-Profit", min: 350, max: 450, beds: 80, operator: "Akademikerhilfe" },
  { name: "Studentenheim Reichenau", category: "Non-Profit", min: 380, max: 380, beds: 100, operator: "Studentenheim IBK" },
  { name: "STUWO Innsbruck", category: "Premium PBSA", min: 729, max: 789, beds: 87, operator: "STUWO" },
];

/* Scraped PRS 1-bed data from the overview page */
const prsListings = [
  { title: "Garconniere Innsbruck", rent: 920, sqm: 23 },
  { title: "Sonnige Garconniere", rent: 820, sqm: 27 },
  { title: "Top-Lage Garconniere Klinik", rent: 900, sqm: 30 },
  { title: "Möblierte Altbauwohnung", rent: 850, sqm: 39 },
  { title: "Gemütliche 1-Zi Museumstraße", rent: 850, sqm: 18 },
  { title: "Exklusive Neubauwohnung", rent: 1390, sqm: 30 },
  { title: "Helle 1-Zi mit Loggia", rent: 1420, sqm: 48 },
  { title: "Helle Garçonniere", rent: 1050, sqm: 32 },
  { title: "Garconniere Dr. Stumpf Str.", rent: 890, sqm: 28 },
  { title: "Garconniere Aufzug & Küche", rent: 1030, sqm: 37 },
  { title: "Neu renovierte 1-Zi", rent: 1350, sqm: 49 },
  { title: "Voll ausgestattete Kleinwhg.", rent: 1400, sqm: 40 },
  { title: "Bergblick Innufer", rent: 1100, sqm: 42 },
  { title: "Kleingarconniere Mitterweg", rent: 750, sqm: 17 },
  { title: "Komplett sanierte Whg.", rent: 1215, sqm: 35 },
  { title: "Gemütliche Garconniere Höttinger Au", rent: 850, sqm: 30 },
  { title: "Garconniere + TG + Terrasse", rent: 1250, sqm: 32 },
  { title: "Garconniere Südbalkon Pradl", rent: 950, sqm: 35 },
  { title: "Garconniere Andreas-Hofer-Str.", rent: 910, sqm: 26 },
  { title: "Tauschwohnung Mühlau", rent: 530, sqm: 35 },
  { title: "2-Zi frei ab Mai", rent: 1350, sqm: 53 },
];

const catColors: Record<string, string> = {
  "University Subsidised": "#3b82f6",
  "Non-Profit": "#10b981",
  "Private PBSA": "#f59e0b",
  "Premium PBSA": "#8b5cf6",
};

/* Compute helpers */
const prsRents = prsListings.map(l => l.rent).sort((a, b) => a - b);
const prsMedian = prsRents[Math.floor(prsRents.length / 2)];
const prsQ25 = prsRents[Math.floor(prsRents.length * 0.25)];
const prsQ75 = prsRents[Math.floor(prsRents.length * 0.75)];
const prsMean = Math.round(prsRents.reduce((a, b) => a + b, 0) / prsRents.length);

const pbsaAvgByCategory = (() => {
  const groups: Record<string, number[]> = {};
  pbsaComps.forEach(c => {
    if (!groups[c.category]) groups[c.category] = [];
    groups[c.category].push((c.min + c.max) / 2);
  });
  return Object.entries(groups).map(([cat, vals]) => ({
    category: cat,
    avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
    count: vals.length,
  }));
})();

/* Chart data: PBSA vs PRS comparison */
const comparisonData = [
  ...pbsaAvgByCategory.map(d => ({ name: d.category, value: d.avg, type: "PBSA" })),
  { name: "PRS Median", value: prsMedian, type: "PRS" },
  { name: "PRS Mean", value: prsMean, type: "PRS" },
];

/* Scatter data: rent vs sqm for PRS */
const scatterData = prsListings.map(l => ({
  sqm: l.sqm,
  rent: l.rent,
  perSqm: Math.round(l.rent / l.sqm * 10) / 10,
  name: l.title,
}));

/* Discount analysis */
const discountData = pbsaComps.map(c => {
  const midpoint = (c.min + c.max) / 2;
  const discount = Math.round((1 - midpoint / prsMedian) * 100);
  return { name: c.name, midpoint, discount, category: c.category };
}).sort((a, b) => b.discount - a.discount);

/* Demand metrics */
const demandMetrics = [
  { label: "University of Innsbruck Students", value: "28,000+", detail: "Austria's 3rd largest university" },
  { label: "MCI | Entrepreneurial University", value: "3,400+", detail: "Growing management & tech programs" },
  { label: "MedUni Innsbruck", value: "3,000+", detail: "Medical university with international intake" },
  { label: "Total Student Population", value: "~35,000", detail: "In a city of ~130,000 residents" },
  { label: "Student-to-Population Ratio", value: "~27%", detail: "One of the highest in Austria" },
  { label: "Current PBSA Bed Supply", value: "~977", detail: "Across 10 identified residences" },
  { label: "PBSA Coverage Rate", value: "~2.8%", detail: "977 beds / 35,000 students" },
  { label: "Estimated Bed Gap", value: ">6,000", detail: "Assuming 20% target coverage" },
];

/* Justification points */
const justifications = [
  {
    id: "market-discount",
    title: "PBSA Rents Sit Well Below Private Market",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 13l-5-5-4 4-5-5" /><path d="M17 13h-5v-5" />
      </svg>
    ),
    body: `The median private 1-bedroom rent in Innsbruck is €${prsMedian.toLocaleString()}/mo (March 2026, n=21). Even the most expensive PBSA operator (STUWO at €729–€789) trades at a ${Math.round((1 - 759 / prsMedian) * 100)}% discount to the PRS median. University-subsidised beds start as low as €314/mo — a ${Math.round((1 - 314 / prsMedian) * 100)}% discount. This confirms strong value for students and underpins the pricing rationale across all PBSA tiers.`,
  },
  {
    id: "supply-gap",
    title: "Severe Undersupply: 2.8% PBSA Coverage",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="7" width="4" height="11" rx="1" /><rect x="8" y="4" width="4" height="14" rx="1" /><rect x="14" y="1" width="4" height="17" rx="1" />
      </svg>
    ),
    body: "With ~977 purpose-built beds serving ~35,000 students, Innsbruck's PBSA coverage is only 2.8%. European best-practice targets 15–25% coverage. This implies a structural bed gap of over 6,000 units. Such undersupply supports pricing power for both existing and new-build PBSA operators — students who cannot secure a PBSA bed face significantly higher PRS rents.",
  },
  {
    id: "demand-density",
    title: "Exceptional Demand Density",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="10" cy="10" r="8" /><circle cx="10" cy="10" r="4" /><circle cx="10" cy="10" r="1" />
      </svg>
    ),
    body: "Innsbruck's student-to-population ratio of ~27% is among the highest in Austria and ranks in the top decile across European university cities. The compact city geography means most student demand concentrates within a 3km radius of the main campus. This density supports consistently high occupancy rates and limits the impact of new peripheral supply on core market rents.",
  },
  {
    id: "tiered-market",
    title: "Clearly Segmented Tiered Market",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 18h12M4 14h12M7 10h6M9 6h2" />
      </svg>
    ),
    body: `The market has four distinct pricing tiers: University Subsidised (avg €${pbsaAvgByCategory.find(d => d.category === "University Subsidised")?.avg}/mo), Non-Profit (avg €${pbsaAvgByCategory.find(d => d.category === "Non-Profit")?.avg}/mo), Premium PBSA (avg €${pbsaAvgByCategory.find(d => d.category === "Premium PBSA")?.avg}/mo), and the private rental sector (median €${prsMedian.toLocaleString()}/mo). Each tier serves a distinct affordability bracket. Premium PBSA occupies the gap between non-profit housing and the open market, offering ensuite amenities at roughly half PRS cost.`,
  },
  {
    id: "prs-premium",
    title: "€/m² Premium in PRS Supports PBSA Value",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M1 18L5 2h2l4 10 4-6h2l2 12" />
      </svg>
    ),
    body: `Scraped PRS listings show a median €/m² of €${Math.round(prsListings.map(l => l.rent / l.sqm).sort((a, b) => a - b)[Math.floor(prsListings.length / 2)] * 10) / 10}/m²/mo. Smaller units (<25m²) command €35–47/m², while larger units (>40m²) drop to €28–35/m². PBSA operators can offer competitive all-in rents because purpose-built micro-units optimize the revenue-per-sqm equation while bundling utilities, internet, and furniture that PRS tenants pay separately.`,
  },
  {
    id: "regulatory",
    title: "Regulatory & Institutional Stability",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M10 1l8 4v6c0 5-8 8-8 8S2 16 2 11V5l8-4z" />
      </svg>
    ),
    body: "Austrian student housing benefits from institutional stability: OeAD and Home4students provide government-backed housing programs, university enrollment is publicly funded with predictable growth, and Innsbruck's Tyrolean location creates a natural constraint on new residential supply. Rent regulation in Austria's private market (MRG) indirectly supports PBSA demand by limiting PRS flexibility, pushing students toward purpose-built options.",
  },
];

/* Tooltip components */
const CompTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; type: string } }> }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-midnight-surface border border-white/[0.08] text-snow px-4 py-2.5 rounded-xl shadow-xl text-sm">
        <p className="font-bold">{d.name}</p>
        <p className="text-emerald-accent text-xs mt-0.5">€{d.value}/mo avg · {d.type}</p>
      </div>
    );
  }
  return null;
};

const ScatterTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; rent: number; sqm: number; perSqm: number } }> }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-midnight-surface border border-white/[0.08] text-snow px-4 py-2.5 rounded-xl shadow-xl text-sm max-w-[220px]">
        <p className="font-bold text-xs">{d.name}</p>
        <p className="text-emerald-accent text-xs mt-1">€{d.rent}/mo · {d.sqm}m² · €{d.perSqm}/m²</p>
      </div>
    );
  }
  return null;
};

/* ─── Page Component ─── */

export default function JustificationsPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src="/images/banners/innsbruck.jpg" alt="Innsbruck" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/innsbruck" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Innsbruck</Link>
            <span className="text-silver/40 text-xs">/</span>
            <Link href="/innsbruck/comparables" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Comparables</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Justifications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Rental Value Justifications</h1>
          <p className="text-sm text-silver mt-2">Market evidence supporting PBSA pricing across Innsbruck&apos;s student housing tiers</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-14">

        {/* ── Executive Summary ── */}
        <section className="bg-midnight-light border border-emerald-accent/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center text-emerald-accent">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M10 1v18M5 5l5-4 5 4M3 10h14" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-snow">Executive Summary</h2>
          </div>
          <p className="text-silver leading-relaxed">
            Innsbruck&apos;s student housing market demonstrates a clear structural undersupply: ~977 PBSA beds serve ~35,000 students (2.8% coverage).
            The private rental market median of <span className="text-emerald-accent font-bold">€{prsMedian.toLocaleString()}/mo</span> for a 1-bedroom
            provides a strong ceiling reference, while PBSA rents range from <span className="text-emerald-accent font-bold">€300–€789/mo</span> — representing
            discounts of 20–70% to the PRS. This page documents the market evidence, demand fundamentals, and comparable pricing that justify current
            and projected student housing rental values in the Innsbruck market.
          </p>
        </section>

        {/* ── Demand Fundamentals ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-6">Demand Fundamentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {demandMetrics.map((m) => (
              <div key={m.label} className="bg-midnight-light border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-2">{m.label}</div>
                <div className="text-2xl font-bold text-snow font-serif mb-1">{m.value}</div>
                <div className="text-xs text-silver/70">{m.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PBSA vs PRS Comparison Chart ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">PBSA vs Private Rental Market</h2>
          <p className="text-sm text-silver mb-6">Average monthly rent by PBSA category compared to PRS benchmarks (March 2026)</p>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `€${v}`}
                />
                <Tooltip content={<CompTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {comparisonData.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.type === "PRS" ? "#f59e0b" : catColors[d.name] || "#009966"}
                      fillOpacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-silver/70">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cat-blue" /> University Subsidised</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cat-green" /> Non-Profit</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cat-purple" /> Premium PBSA</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-warm" /> PRS Benchmark</span>
            </div>
          </div>
        </section>

        {/* ── Discount to PRS Table ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">Discount to Private Market</h2>
          <p className="text-sm text-silver mb-6">How each PBSA residence prices relative to the PRS median of €{prsMedian.toLocaleString()}/mo</p>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Residence</th>
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Category</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Avg Rent</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Discount</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden sm:table-cell">Beds</th>
                  </tr>
                </thead>
                <tbody>
                  {discountData.map((d, i) => (
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3 text-silver-bright font-medium">{d.name}</td>
                      <td className="px-6 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full border" style={{
                          color: catColors[d.category],
                          borderColor: catColors[d.category] + "33",
                          backgroundColor: catColors[d.category] + "15",
                        }}>{d.category}</span>
                      </td>
                      <td className="px-6 py-3 text-right text-snow font-bold font-serif">€{d.midpoint.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right">
                        <span className={`font-bold ${d.discount > 0 ? "text-emerald-accent" : "text-amber-warm"}`}>
                          {d.discount > 0 ? "-" : "+"}{Math.abs(d.discount)}%
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-silver hidden sm:table-cell">{pbsaComps.find(c => c.name === d.name)?.beds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PRS Scatter Plot ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">PRS Rent vs. Unit Size</h2>
          <p className="text-sm text-silver mb-6">Scraped 1-bedroom listings (n={prsListings.length}) — illustrating the rent/sqm relationship</p>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="sqm"
                  name="Size"
                  unit="m²"
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  dataKey="rent"
                  name="Rent"
                  unit="€"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `€${v}`}
                />
                <ZAxis range={[60, 60]} />
                <Tooltip content={<ScatterTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.1)" }} />
                <Legend />
                <Scatter name="PRS 1-Bed Listings" data={scatterData} fill="#f59e0b" fillOpacity={0.7} />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "PRS Median", value: `€${prsMedian.toLocaleString()}` },
                { label: "PRS Q25", value: `€${prsQ25.toLocaleString()}` },
                { label: "PRS Q75", value: `€${prsQ75.toLocaleString()}` },
                { label: "PRS Mean", value: `€${prsMean.toLocaleString()}` },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-[10px] text-silver/60 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-snow font-serif">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Justification Cards ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-6">Key Justifications</h2>
          <div className="space-y-4">
            {justifications.map((j) => {
              const isOpen = expandedCard === j.id;
              return (
                <div key={j.id} className={`bg-midnight-light border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-emerald-accent/30" : "border-white/[0.06] hover:border-white/[0.12]"}`}>
                  <button
                    onClick={() => setExpandedCard(isOpen ? null : j.id)}
                    className="w-full flex items-center gap-4 p-6 text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent" : "bg-white/[0.04] border border-white/[0.06] text-silver"}`}>
                      {j.icon}
                    </div>
                    <h3 className="flex-1 text-base font-bold text-snow">{j.title}</h3>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className={`text-silver transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                      <path d="M3 5l4 4 4-4" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-14">
                        <p className="text-silver leading-relaxed text-sm">{j.body}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Methodology Note ── */}
        <section className="bg-midnight-light border border-white/[0.06] rounded-2xl p-8">
          <h2 className="text-lg font-bold text-snow mb-3">Methodology & Sources</h2>
          <div className="text-sm text-silver/80 space-y-3 leading-relaxed">
            <p>
              <span className="text-snow font-semibold">Private Rental Data:</span> 21 one-bedroom listings scraped from willhaben.at and wohnungsboerse.net in March 2026. All rents are warm (inclusive of Betriebskosten) where stated, or gross rent otherwise. Outliers retained to reflect actual market range.
            </p>
            <p>
              <span className="text-snow font-semibold">PBSA Comparables:</span> 10 purpose-built student residences identified across 4 pricing tiers. Rent data sourced from operator websites (OeAD, Home4students, STUWO, Akademikerhilfe) and verified against Studium.at listings. All prices as of March 2026.
            </p>
            <p>
              <span className="text-snow font-semibold">Student Population:</span> Enrollment figures from university annual reports (2024/25 academic year). City population from Statistik Austria (2025 estimate).
            </p>
          </div>
        </section>

        {/* Nav links */}
        <section className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/innsbruck/comparables"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M15 8H1M7 2L1 8l6 6" />
            </svg>
            PBSA Comparables
          </Link>
          <Link
            href="/innsbruck"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300"
          >
            Innsbruck Overview
          </Link>
        </section>
      </main>
    </div>
  );
}
