"use client";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const histogram = [
  { range: "€250", count: 1 },
  { range: "€500", count: 5 },
  { range: "€750", count: 18 },
  { range: "€1k", count: 16 },
  { range: "€1.25k", count: 20 },
  { range: "€1.5k", count: 12 },
  { range: "€1.75k", count: 4 },
  { range: "€2k", count: 4 },
  { range: "€2.25k", count: 4 },
  { range: "€2.5k", count: 2 },
  { range: "€3k+", count: 3 },
];

const recentListings = [
  { title: "Garconniere Innsbruck", rent: 920, sqm: 23, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Sonnige Garconniere", rent: 820, sqm: 27, location: "Pradler Straße", source: "wohnungsboerse.net" },
  { title: "Top-Lage Garconniere Klinik / Hauptuni", rent: 900, sqm: 30, location: "Innerkoflerstraße", source: "wohnungsboerse.net" },
  { title: "Möblierte 1-Zimmer Altbauwohnung", rent: 850, sqm: 39, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Gemütliche 1-Zimmer Museumstraße", rent: 850, sqm: 18, location: "Museumstraße 33", source: "wohnungsboerse.net" },
  { title: "Exklusive Neubauwohnung (Erstbezug)", rent: 1390, sqm: 30, location: "Zentrum", source: "wohnungsboerse.net" },
  { title: "Helle 1-Zimmer mit Loggia", rent: 1420, sqm: 48, location: "Zentrum", source: "wohnungsboerse.net" },
  { title: "Helle Garçonniere", rent: 1050, sqm: 32, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Garconniere Dr. Stumpf Straße", rent: 890, sqm: 28, location: "Dr. Stumpf Str. 65", source: "wohnungsboerse.net" },
  { title: "Garconniere mit Aufzug & Einbauküche", rent: 1030, sqm: 37, location: "Andreas-Hofer-Str. 39a", source: "wohnungsboerse.net" },
  { title: "Neu renovierte 1-Schlafzimmer-Wohnung", rent: 1350, sqm: 49, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Voll ausgestattete Kleinwohnung", rent: 1400, sqm: 40, location: "Wilten", source: "wohnungsboerse.net" },
  { title: "Bergblick am Innufer – Großgarconniere", rent: 1100, sqm: 42, location: "Innpromenade", source: "wohnungsboerse.net" },
  { title: "Kleingarconniere Mitterweg", rent: 750, sqm: 17, location: "Mitterweg 87", source: "wohnungsboerse.net" },
  { title: "Komplett sanierte Wohnung", rent: 1215, sqm: 35, location: "Fürstenweg 20", source: "wohnungsboerse.net" },
  { title: "Gemütliche Garconniere", rent: 850, sqm: 30, location: "Höttinger Au", source: "wohnungsboerse.net" },
  { title: "Attraktive Garconniere + TG + Terrasse", rent: 1250, sqm: 32, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Garconniere mit Südbalkon, Pradl", rent: 950, sqm: 35, location: "Wetterherrenweg", source: "willhaben.at" },
  { title: "Garconniere Andreas-Hofer-Straße 55", rent: 910, sqm: 26, location: "Andreas-Hofer-Str. 55", source: "willhaben.at" },
  { title: "Tauschwohnung Mühlau", rent: 530, sqm: 35, location: "Mühlau", source: "wohnungsboerse.net" },
  { title: "2-Zimmer-Wohnung, frei ab Mai", rent: 1350, sqm: 53, location: "Innsbruck", source: "willhaben.at" },
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

export default function InnsbruckPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero banner */}
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src="/images/banners/innsbruck.jpg"
          alt="Innsbruck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Austria</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-snow tracking-tight">Innsbruck</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm text-silver">89 listings</span>
            <span className="w-1 h-1 rounded-full bg-silver/40" />
            <span className="text-sm text-silver">Median €1,250/mo</span>
            <span className="w-1 h-1 rounded-full bg-silver/40" />
            <span className="text-sm text-silver">March 2026</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Price Distribution */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-snow">Price Distribution</h2>
          </div>
          <p className="text-sm text-silver mb-8">Monthly rent across 89 active PRS listings (willhaben.at, wohnungsboerse.net &amp; ImmobilienScout24)</p>

          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={histogram} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis
                  dataKey="range"
                  tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "Instrument Sans" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {histogram.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === 4 ? "#00bc7d" : "#009966"}
                      fillOpacity={index === 4 ? 1 : 0.6}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Stats row */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Median", value: "€1,250" },
                { label: "Q25", value: "€850" },
                { label: "Q75", value: "€1,480" },
                { label: "Range", value: "€450–€4,169" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-[10px] text-silver/60 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-snow font-serif">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent 1-Bedroom Listings */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-snow">Recent 1-Bedroom Listings</h2>
            <span className="text-xs text-emerald-accent bg-emerald-accent/10 border border-emerald-accent/20 px-2.5 py-0.5 rounded-full font-semibold">{recentListings.length} scraped</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm text-silver">Live listings from willhaben.at &amp; wohnungsboerse.net · March 2026</p>
            <a href="/data/innsbruck-listings.csv" download className="inline-flex items-center gap-1.5 text-xs text-emerald-accent hover:text-emerald-glow transition-colors font-semibold whitespace-nowrap">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 1v8M3 6l3 3 3-3M1 10h10" /></svg>
              Raw CSV
            </a>
          </div>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Listing</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Rent</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Size</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden sm:table-cell">€/m²</th>
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden md:table-cell">Location</th>
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden lg:table-cell">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {recentListings.map((l, i) => (
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3 text-silver-bright font-medium">{l.title}</td>
                      <td className="px-6 py-3 text-right text-emerald-accent font-bold font-serif">€{l.rent.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right text-silver">{l.sqm} m²</td>
                      <td className="px-6 py-3 text-right text-silver hidden sm:table-cell">€{(l.rent / l.sqm).toFixed(1)}</td>
                      <td className="px-6 py-3 text-silver/70 hidden md:table-cell">{l.location}</td>
                      <td className="px-6 py-3 text-silver/50 text-xs hidden lg:table-cell">{l.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Action buttons */}
        <section className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/innsbruck/comparables"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300"
          >
            PBSA Comparables
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M1 8h14M9 2l6 6-6 6" />
            </svg>
          </Link>
          <Link
            href="/innsbruck/universities"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300"
          >
            Universities
          </Link>
          <Link
            href="/innsbruck/gallery"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300"
          >
            STUWO Gallery
          </Link>
        </section>
      </main>
    </div>
  );
}
