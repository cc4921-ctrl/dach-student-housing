import Link from "next/link";

const pbsaProperties = [
  { name: "Home4students Höttinger Au 34", type: "University", operator: "Home4students", beds: "~120", single: "€505", shared: "€320", amenities: "Furnished, all-inclusive, internet, laundry, common rooms", location: "Höttinger Au" },
  { name: "Home4students Technikerstraße 7", type: "University", operator: "Home4students", beds: "~100", single: "€455", shared: "€310", amenities: "Furnished, all-inclusive, internet, laundry", location: "Technik campus" },
  { name: "Home4students Euregio-Campus", type: "University", operator: "Home4students", beds: "~80", single: "€480–€500", shared: "—", amenities: "Furnished, all-inclusive, modern build", location: "Erzherzog-Eugen-Straße 39" },
  { name: "STUWO Raimund Pradler", type: "Private PBSA", operator: "STUWO", beds: "~150", single: "€789", shared: "€729", amenities: "Fully furnished, kitchen, private bathroom, internet", location: "Pradl" },
  { name: "OeAD GreenINN", type: "Premium PBSA", operator: "OeAD Housing", beds: "~200", single: "€425–€535", shared: "—", amenities: "Passivhaus, furnished, bike storage, parking, cleaning", location: "Near university" },
  { name: "Studentenheim Saggen", type: "University", operator: "Various", beds: "~60", single: "€400–€450", shared: "€300–€350", amenities: "Basic furnished, shared kitchen, internet", location: "Saggen" },
];

const prsComps = [
  { type: "Garconnière / Studio", examples: "Garconniere am Mitterweg, INNRAIN 28, Kleingarconniere Mitterweg 87", range: "€700–€920", median: "€820", size: "17–30 m²", count: 17 },
  { type: "2-Room Apartment", examples: "Salamander 0B16, Kranebitter Allee, Kohlstattgasse", range: "€980–€1,994", median: "€1,380", size: "34–60 m²", count: 32 },
  { type: "3-Room Apartment", examples: "Panoramalage Arzl, Erstbezug Innrain 41, Traumhafte Sill", range: "€1,600–€2,958", median: "€2,050", size: "70–110 m²", count: 10 },
  { type: "4-Room / Penthouse", examples: "Planötzenhofstraße 29, Penthouse 360° Bergpanorama", range: "€2,294–€4,169", median: "€2,495", size: "73–148 m²", count: 7 },
];

const marketSummary = {
  totalPBSA: 6,
  totalBeds: "~710",
  avgPBSA: "€530",
  pbsaRange: "€310–€789",
  totalPRS: 68,
  avgPRS: "€1,495",
  prsRange: "€450–€4,169",
  premiumPRS: "€1,850–€4,169",
};

export default function InnsbruckComparables() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/innsbruck" className="text-sm text-blue-600 hover:underline">&larr; Innsbruck Overview</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Innsbruck PBSA &amp; PRS Comparables</h1>
          <p className="text-slate-500 mt-1">Student accommodation operators and private rental market data</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* PBSA Properties */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">PBSA Properties ({pbsaProperties.length} operators)</h2>
          <div className="space-y-4">
            {pbsaProperties.map((p) => (
              <div key={p.name} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800 truncate">{p.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        p.type === "University" ? "bg-blue-50 text-blue-700" :
                        p.type === "Premium PBSA" ? "bg-purple-50 text-purple-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>{p.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Operator: {p.operator} &middot; {p.location}</p>
                    <p className="text-xs text-slate-400 mt-1">{p.amenities}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Est. Beds</p>
                    <p className="font-semibold text-slate-700">{p.beds}</p>
                  </div>
                  <div className="text-right min-w-[120px]">
                    <p className="text-xs text-slate-500">Single Room</p>
                    <p className="text-lg font-bold text-slate-800">{p.single}</p>
                    <p className="text-xs text-slate-400">Shared: {p.shared}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRS Comparables by Type */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">PRS Rental Comparables by Type</h2>
          <p className="text-sm text-slate-400 mb-4">From 68 active listings on willhaben.at &amp; ImmobilienScout24</p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-600">Type</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Size</th>
                  <th className="text-left p-4 font-semibold text-slate-600"># Listings</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Range</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Median</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Example Properties</th>
                </tr>
              </thead>
              <tbody>
                {prsComps.map((c, i) => (
                  <tr key={c.type} className={i % 2 === 0 ? "" : "bg-slate-50/50"}>
                    <td className="p-4 font-medium text-slate-800">{c.type}</td>
                    <td className="p-4 text-slate-500">{c.size}</td>
                    <td className="p-4 text-slate-500">{c.count}</td>
                    <td className="p-4 font-semibold text-slate-700">{c.range}</td>
                    <td className="p-4 font-bold text-blue-700">{c.median}</td>
                    <td className="p-4 text-xs text-slate-400 max-w-xs">{c.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Market Summary */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Market Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">PBSA Properties</p>
              <p className="text-2xl font-bold text-slate-800">{marketSummary.totalPBSA}</p>
              <p className="text-xs text-slate-400">{marketSummary.totalBeds} beds</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Avg PBSA Rate</p>
              <p className="text-2xl font-bold text-slate-800">{marketSummary.avgPBSA}</p>
              <p className="text-xs text-slate-400">Range: {marketSummary.pbsaRange}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">PRS Listings</p>
              <p className="text-2xl font-bold text-slate-800">{marketSummary.totalPRS}</p>
              <p className="text-xs text-slate-400">Active March 2026</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Premium PRS</p>
              <p className="text-2xl font-bold text-purple-700">{marketSummary.premiumPRS}</p>
              <p className="text-xs text-slate-400">Top quartile (17 listings)</p>
            </div>
          </div>
        </section>

        {/* Private PBSA Studio Pricing */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Premium PBSA Studio Pricing</h2>
          <div className="bg-white rounded-xl border border-purple-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-slate-500">STUWO Single Room</p>
                <p className="text-2xl font-bold text-purple-700">€789</p>
                <p className="text-xs text-slate-400">Fully furnished, ensuite, all-inclusive</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">OeAD GreenINN Premium</p>
                <p className="text-2xl font-bold text-purple-700">€535</p>
                <p className="text-xs text-slate-400">Passivhaus, premium category</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Home4students Max</p>
                <p className="text-2xl font-bold text-purple-700">€505</p>
                <p className="text-xs text-slate-400">Höttinger Au 34, single room</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Est. Premium PBSA Target</p>
                <p className="text-2xl font-bold text-amber-600">€750–€950</p>
                <p className="text-xs text-slate-400">New-build premium PBSA opportunity</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-400">
          &copy; 2026 Student Housing DACH &middot; Innsbruck comparables as of March 2026
        </div>
      </footer>
    </div>
  );
}
