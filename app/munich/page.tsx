import Link from "next/link";

const stats = [
  { label: "Students", value: "148,000+", detail: "Across 6+ universities" },
  { label: "Median Studio Rent", value: "€1,150", detail: "Based on 338 active listings" },
  { label: "Price Range", value: "€190–€3,580", detail: "Per month, 1-room apartments" },
  { label: "Studierendenwerk Avg", value: "€401", detail: "9,000+ rooms, long waitlists" },
];

const universities = [
  { name: "Ludwig-Maximilians-Universität (LMU)", students: "52,600", intl: "~9,300", pct: "17%", detail: "Germany's second-largest university" },
  { name: "Technical University of Munich (TUM)", students: "51,900", intl: "~23,000", pct: "44%", detail: "Top-ranked technical university" },
  { name: "Hochschule München (HM)", students: "18,000", intl: "~2,700", pct: "15%", detail: "University of applied sciences" },
  { name: "Universität der Bundeswehr München", students: "3,500", intl: "~350", pct: "10%", detail: "Federal defence university" },
];

const neighborhoods = [
  { name: "Maxvorstadt", campus: "LMU, TUM main campuses", vibe: "Central academic hub, highest demand", level: "Very High" },
  { name: "Schwabing", campus: "Adjacent to LMU", vibe: "Cosmopolitan, vibrant student life", level: "Very High" },
  { name: "Neuhausen", campus: "20 min to campuses", vibe: "Quieter residential, good value", level: "High" },
  { name: "Garching", campus: "TUM Garching campus", vibe: "Suburban, affordable, campus-adjacent", level: "Mid" },
  { name: "Sendling", campus: "South of centre", vibe: "Up-and-coming, well-connected", level: "Mid–High" },
];

const priceCategories = [
  { tier: "Budget", range: "€280–€500", desc: "Studierendenwerk dorms, Kolpinghaus", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  { tier: "Entry PBSA", range: "€500–€800", desc: "Campus Viva, basic private PBSA", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { tier: "Mid-Market", range: "€800–€1,200", desc: "THE FIZZ, Youniq, furnished studios", color: "bg-slate-50 border-slate-200 text-slate-800" },
  { tier: "Premium", range: "€1,200–€1,600", desc: "Premium PBSA studios, central PRS", color: "bg-purple-50 border-purple-200 text-purple-800" },
  { tier: "Luxury", range: "€1,600–€2,800", desc: "Premium furnished, central 2-room", color: "bg-amber-50 border-amber-200 text-amber-800" },
];

const rentalBands = [
  { type: "WG Room", size: "12–20 m²", budget: "€400–€500", mid: "€500–€700", premium: "€700–€900" },
  { type: "Studio / 1-Room", size: "20–35 m²", budget: "€500–€900", mid: "€900–€1,200", premium: "€1,200–€1,600" },
  { type: "2-Room Apartment", size: "45–65 m²", budget: "€1,090–€1,300", mid: "€1,300–€1,800", premium: "€1,800–€2,800" },
  { type: "3-Room Apartment", size: "70–95 m²", budget: "€1,500–€1,800", mid: "€1,800–€2,200", premium: "€2,200–€3,000+" },
];

export default function MunichPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">&larr; Home</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Student Housing in Munich</h1>
          <p className="text-slate-500 mt-1">Germany&apos;s most expensive student city &middot; <span className="text-green-600 font-medium">338 live listings · March 2026</span></p>
          <div className="flex gap-3 mt-4">
            <Link href="/munich/comparables" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">PBSA Comparables</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
          Live data from 338 scraped listings across wg-gesucht.de &amp; ImmobilienScout24 · March 2026
        </div>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Munich at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Universities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {universities.map((u) => (
              <div key={u.name} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-800">{u.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{u.detail}</p>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div><p className="text-xs text-slate-500">Total</p><p className="font-semibold text-slate-700">{u.students}</p></div>
                  <div><p className="text-xs text-slate-500">International</p><p className="font-semibold text-slate-700">{u.intl}</p></div>
                  <div><p className="text-xs text-slate-500">% Intl</p><p className="font-semibold text-slate-700">{u.pct}</p></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">PRS Illustrative Rental Values</h2>
          <p className="text-sm text-slate-400 mb-4">Placeholder estimates based on market research</p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-slate-200 text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-4 font-semibold text-slate-600">Apartment Type</th>
                  <th className="text-left p-4 font-semibold text-slate-600">Typical Size</th>
                  <th className="text-left p-4 font-semibold text-emerald-700">Budget</th>
                  <th className="text-left p-4 font-semibold text-blue-700">Mid-Market</th>
                  <th className="text-left p-4 font-semibold text-purple-700">Premium</th>
                </tr>
              </thead>
              <tbody>
                {rentalBands.map((b, i) => (
                  <tr key={b.type} className={i % 2 === 0 ? "" : "bg-slate-50/50"}>
                    <td className="p-4 font-medium text-slate-800">{b.type}</td>
                    <td className="p-4 text-slate-500">{b.size}</td>
                    <td className="p-4 text-emerald-700 font-medium">{b.budget}</td>
                    <td className="p-4 text-blue-700 font-medium">{b.mid}</td>
                    <td className="p-4 text-purple-700 font-bold">{b.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Price Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {priceCategories.map((c) => (
              <div key={c.tier} className={`rounded-xl border p-4 ${c.color}`}>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">{c.tier}</p>
                <p className="text-xl font-bold mt-1">{c.range}</p>
                <p className="text-xs mt-2 opacity-70">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Top Student Neighborhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {neighborhoods.map((n) => (
              <div key={n.name} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-800">{n.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{n.campus}</p>
                <p className="text-sm text-slate-600 mt-2">{n.vibe}</p>
                <div className="mt-3"><span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">Rent Level: {n.level}</span></div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Premium Market Snapshot</h2>
          <div className="bg-white rounded-xl border border-purple-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500">Premium Studio (25–35 m²)</p>
                <p className="text-2xl font-bold text-purple-700">€1,200–€1,600</p>
                <p className="text-xs text-slate-400 mt-1">THE FIZZ, Youniq, premium operators</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Premium 2-Room (50–65 m²)</p>
                <p className="text-2xl font-bold text-purple-700">€1,800–€2,800</p>
                <p className="text-xs text-slate-400 mt-1">Central furnished apartments</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Premium 3-Room (80+ m²)</p>
                <p className="text-2xl font-bold text-purple-700">€2,200–€3,000+</p>
                <p className="text-xs text-slate-400 mt-1">Maxvorstadt / Schwabing premium</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-400">
          &copy; 2026 Student Housing DACH &middot; Munich placeholder data
        </div>
      </footer>
    </div>
  );
}
