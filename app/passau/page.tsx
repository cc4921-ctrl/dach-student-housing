import Link from "next/link";

const stats = [
  { label: "Students", value: "10,500+", detail: "University of Passau" },
  { label: "Median PRS Rent", value: "€450", detail: "Placeholder estimate" },
  { label: "Price Range", value: "€200–€990", detail: "Per month" },
  { label: "Studentenwerk Avg", value: "€260–€550", detail: "Studentenwerk Niederbayern/Oberpfalz" },
];

const universities = [
  { name: "University of Passau", students: "10,568", intl: "1,916", pct: "18%", detail: "Law, business, computer science, humanities focus" },
];

const neighborhoods = [
  { name: "Innstadt", campus: "Close to university main campus", vibe: "Historic charm, river proximity, student conversions", level: "Mid" },
  { name: "Altstadt (Old Town)", campus: "City centre, 10 min to campus", vibe: "Premium historic location, riverfront", level: "High" },
  { name: "Haidenhof", campus: "South of centre", vibe: "Residential, affordable, good transport", level: "Low–Mid" },
  { name: "Grubweg", campus: "West of city", vibe: "Suburban, family area, budget options", level: "Low" },
];

const priceCategories = [
  { tier: "Budget", range: "€200–€350", desc: "Studentenwerk dorms, Wohnbauwerk", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  { tier: "Entry", range: "€350–€479", desc: "WG rooms, basic shared flats", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { tier: "Mid-Market", range: "€479–€600", desc: "Private 1-room, small apartments", color: "bg-slate-50 border-slate-200 text-slate-800" },
  { tier: "Premium", range: "€600–€800", desc: "Central apartments, Altstadt locations", color: "bg-purple-50 border-purple-200 text-purple-800" },
  { tier: "Luxury", range: "€800–€990+", desc: "Furnished premium, new-build", color: "bg-amber-50 border-amber-200 text-amber-800" },
];

const rentalBands = [
  { type: "WG Room", size: "12–25 m²", budget: "€260–€350", mid: "€350–€450", premium: "€450–€550" },
  { type: "Studio / 1-Room", size: "20–35 m²", budget: "€350–€400", mid: "€400–€600", premium: "€600–€990" },
  { type: "2-Room Apartment", size: "40–60 m²", budget: "€500–€600", mid: "€600–€800", premium: "€800–€1,200" },
  { type: "3-Room Apartment", size: "65–85 m²", budget: "€600–€700", mid: "€700–€900", premium: "€900–€1,500" },
];

export default function PassauPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">&larr; Home</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Student Housing in Passau</h1>
          <p className="text-slate-500 mt-1">Bavaria&apos;s three-river university city &middot; <span className="text-amber-600 font-medium">Placeholder data</span></p>
          <div className="flex gap-3 mt-4">
            <Link href="/passau/comparables" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">PBSA Comparables</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          Data on this page is placeholder / indicative. Full market scraping pending.
        </div>

        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Passau at a Glance</h2>
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
          <div className="grid grid-cols-1 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-2xl font-bold text-purple-700">€600–€990</p>
                <p className="text-xs text-slate-400 mt-1">Furnished, Altstadt, new-build</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Premium 2-Room (50–60 m²)</p>
                <p className="text-2xl font-bold text-purple-700">€800–€1,200</p>
                <p className="text-xs text-slate-400 mt-1">Central locations, modern finish</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Premium 3-Room (70+ m²)</p>
                <p className="text-2xl font-bold text-purple-700">€900–€1,500</p>
                <p className="text-xs text-slate-400 mt-1">Luxury tier, Altstadt premium</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-400">
          &copy; 2026 Student Housing DACH &middot; Passau placeholder data
        </div>
      </footer>
    </div>
  );
}
