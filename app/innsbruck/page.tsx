"use client";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const histogram = [
  { range: "\u20AC250", count: 1 },
  { range: "\u20AC500", count: 4 },
  { range: "\u20AC750", count: 13 },
  { range: "\u20AC1k", count: 8 },
  { range: "\u20AC1.25k", count: 16 },
  { range: "\u20AC1.5k", count: 9 },
  { range: "\u20AC1.75k", count: 4 },
  { range: "\u20AC2k", count: 4 },
  { range: "\u20AC2.25k", count: 4 },
  { range: "\u20AC2.5k", count: 2 },
  { range: "\u20AC3k+", count: 3 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { range: string } }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] text-white px-3 py-2 rounded-lg shadow-lg text-sm">
        <p className="font-semibold">{payload[0].payload.range}</p>
        <p className="text-[#00bc7d]">{payload[0].value} listings</p>
      </div>
    );
  }
  return null;
};

export default function InnsbruckPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Photo Banner */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=1200&q=80"
          alt="Innsbruck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-6">
          <h1 className="text-3xl font-bold text-white">Innsbruck</h1>
          <p className="text-[#90a1b9] mt-1">68 listings &middot; Median &euro;1,380/mo &middot; March 2026</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-[#0f172a] mb-1">Price Distribution</h2>
          <p className="text-sm text-[#62748e] mb-6">Monthly rent across 68 active PRS listings (willhaben.at &amp; ImmobilienScout24)</p>

          <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={histogram} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="range" tick={{ fill: "#62748e", fontSize: 11 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
                <YAxis tick={{ fill: "#90a1b9", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {histogram.map((_, index) => (
                    <Cell key={index} fill={index === 4 ? "#009966" : "#00bc7d"} fillOpacity={index === 4 ? 1 : 0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center gap-6 text-sm text-[#62748e]">
              <div>Median <span className="font-semibold text-[#0f172a]">&euro;1,380</span></div>
              <div>Q25 <span className="font-semibold text-[#0f172a]">&euro;920</span></div>
              <div>Q75 <span className="font-semibold text-[#0f172a]">&euro;1,870</span></div>
              <div>Range <span className="font-semibold text-[#0f172a]">&euro;450&ndash;&euro;4,169</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/innsbruck/comparables" className="inline-flex items-center justify-center gap-2 bg-[#009966] text-white px-6 py-3 rounded-lg hover:bg-[#007a55] transition-colors font-medium">
            PBSA Comparables &rarr;
          </Link>
          <Link href="/innsbruck/universities" className="inline-flex items-center justify-center gap-2 bg-white text-[#314158] border border-[#e2e8f0] px-6 py-3 rounded-lg hover:bg-[#f8fafc] transition-colors font-medium">
            Universities
          </Link>
          <a href="https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?areaId=70101" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#e2e8f0] text-[#314158] px-6 py-3 rounded-lg hover:bg-[#f8fafc] transition-colors font-medium">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
