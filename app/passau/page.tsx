"use client";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const histogram = [
  { range: "€200", count: 2 },
  { range: "€300", count: 8 },
  { range: "€400", count: 19 },
  { range: "€500", count: 18 },
  { range: "€600", count: 14 },
  { range: "€700", count: 4 },
  { range: "€800", count: 3 },
  { range: "€900+", count: 2 },
];

const recentListings = [
  { title: "Helle 1-Zimmer mit Dachterrasse", rent: 595, sqm: 31, location: "Haidenhof-Süd", source: "WG-gesucht" },
  { title: "Renoviertes Studentenappartement", rent: 390, sqm: 22, location: "Haidenhof-Nord", source: "WG-gesucht" },
  { title: "1,5-Zimmer Nähe Uni & Klinikum", rent: 520, sqm: 39, location: "St. Anton", source: "WG-gesucht" },
  { title: "Furnished 1-Room Apartment Innstadt", rent: 400, sqm: 25, location: "Innstadt", source: "WG-gesucht" },
  { title: "Möblierte 1-Zimmer Hacklberg", rent: 510, sqm: 35, location: "Hacklberg", source: "WG-gesucht" },
  { title: "Studentenapartment mit Aussicht", rent: 530, sqm: 26, location: "Innstadt", source: "WG-gesucht" },
  { title: "Modernes Wohnheimzimmer UniLife", rent: 560, sqm: 18, location: "Haidenhof", source: "WG-gesucht" },
  { title: "Apartment Nähe Uni, Krankenhaus", rent: 420, sqm: 20, location: "Haidenhof-Süd", source: "WG-gesucht" },
  { title: "Apartment TOP Lage Altstadt", rent: 575, sqm: 34, location: "Altstadt", source: "WG-gesucht" },
  { title: "Neu renoviertes Appartement Innstadt", rent: 550, sqm: 29, location: "Innstadt", source: "WG-gesucht" },
  { title: "Vollmöblierte Wohnung für Studierende", rent: 500, sqm: 26, location: "Innstadt", source: "WG-gesucht" },
  { title: "Möblierte 1-Zimmer, 260€ Kaltmiete", rent: 370, sqm: 20, location: "Haidenhof-Nord", source: "WG-gesucht" },
  { title: "Warm rental, central location", rent: 420, sqm: 23, location: "Haidenhof-Süd", source: "WG-gesucht" },
  { title: "Gemütliches Appartement + TG-Stellplatz", rent: 500, sqm: 25, location: "Haidenhof-Süd", source: "WG-gesucht" },
  { title: "Uninahe 1-Zimmer Innstadt", rent: 550, sqm: 32, location: "Innstadt", source: "WG-gesucht" },
  { title: "Wunderschöne 1-Zimmer Wohnung", rent: 600, sqm: 31, location: "Haidenhof-Nord", source: "WG-gesucht" },
  { title: "1-Zimmer-Appartement Altbau", rent: 481, sqm: 34, location: "Altstadt", source: "WG-gesucht" },
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

export default function PassauPage() {
  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src="/images/banners/passau.jpg"
          alt="Passau"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Germany</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-snow tracking-tight">Passau</h1>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm text-silver">70 listings</span>
            <span className="w-1 h-1 rounded-full bg-silver/40" />
            <span className="text-sm text-silver">Median €500/mo</span>
            <span className="w-1 h-1 rounded-full bg-silver/40" />
            <span className="text-sm text-silver">March 2026</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">Price Distribution</h2>
          <p className="text-sm text-silver mb-8">Monthly rent across 70 active PRS listings (WG-gesucht, ImmobilienScout24 &amp; immowelt)</p>

          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={histogram} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="range" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {histogram.map((_, index) => (
                    <Cell key={index} fill={index === 2 ? "#00bc7d" : "#009966"} fillOpacity={index === 2 ? 1 : 0.6} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Median", value: "€500" },
                { label: "Q25", value: "€400" },
                { label: "Q75", value: "€580" },
                { label: "Range", value: "€240–€950" },
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
          <p className="text-sm text-silver mb-6">Live listings from WG-gesucht.de · March 2026</p>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Listing</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Rent</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Size</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden sm:table-cell">€/m²</th>
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden md:table-cell">District</th>
                  </tr>
                </thead>
                <tbody>
                  {recentListings.map((l, i) => (
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3 text-silver-bright font-medium">{l.title}</td>
                      <td className="px-6 py-3 text-right text-emerald-accent font-bold font-serif">€{l.rent}</td>
                      <td className="px-6 py-3 text-right text-silver">{l.sqm} m²</td>
                      <td className="px-6 py-3 text-right text-silver hidden sm:table-cell">€{(l.rent / l.sqm).toFixed(1)}</td>
                      <td className="px-6 py-3 text-silver/70 hidden md:table-cell">{l.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-4">
          <Link href="/passau/comparables" className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            PBSA Comparables
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M1 8h14M9 2l6 6-6 6" /></svg>
          </Link>
          <Link href="/passau/universities" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Universities
          </Link>
        </section>
      </main>
    </div>
  );
}
