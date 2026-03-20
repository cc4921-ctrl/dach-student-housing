"use client";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const histogram = [
  { range: "€400", count: 12 },
  { range: "€600", count: 34 },
  { range: "€800", count: 52 },
  { range: "€1k", count: 76 },
  { range: "€1.2k", count: 64 },
  { range: "€1.4k", count: 38 },
  { range: "€1.6k", count: 24 },
  { range: "€1.8k", count: 16 },
  { range: "€2k", count: 10 },
  { range: "€2.5k", count: 8 },
  { range: "€3k+", count: 4 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { range: string } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-midnight-surface border border-white/[0.08] text-snow px-4 py-2.5 rounded-xl shadow-xl text-sm">
        <p className="font-bold">{payload[0].payload.range}</p>
        <p className="text-emerald-accent text-xs mt-0.5">{payload[0].value} listings</p>
      </div>
    );
  }
  return null;
};

export default function MunichPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero banner */}
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1400&q=80"
          alt="Munich"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Germany</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-snow tracking-tight">Munich</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm text-silver">338 listings</span>
            <span className="w-1 h-1 rounded-full bg-silver/40" />
            <span className="text-sm text-silver">Median €1,150/mo</span>
            <span className="w-1 h-1 rounded-full bg-silver/40" />
            <span className="text-sm text-silver">March 2026</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">Price Distribution</h2>
          <p className="text-sm text-silver mb-8">Monthly rent across 338 active PRS listings (ImmobilienScout24 &amp; WG-gesucht)</p>

          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={histogram} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="range" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {histogram.map((_, index) => (
                    <Cell key={index} fill={index === 3 ? "#00bc7d" : "#009966"} fillOpacity={index === 3 ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Median", value: "€1,150" },
                { label: "Q25", value: "€780" },
                { label: "Q75", value: "€1,450" },
                { label: "Range", value: "€380–€3,580" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-[10px] text-silver/60 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-snow font-serif">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-4">
          <Link href="/munich/comparables" className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            PBSA Comparables
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M1 8h14M9 2l6 6-6 6" /></svg>
          </Link>
          <Link href="/munich/universities" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Universities
          </Link>
          <Link href="/munich/gallery" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            THE FIZZ Gallery
          </Link>
        </section>
      </main>
    </div>
  );
}
