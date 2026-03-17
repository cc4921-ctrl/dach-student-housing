import Link from "next/link";

const stats = [
  { label: "Students", value: "28,000+", detail: "Across 4 universities" },
  { label: "Median PRS Rent", value: "€1,380", detail: "68 active listings sampled" },
  { label: "Price Range", value: "€450–€4,169", detail: "Per month" },
  { label: "PBSA Single Room", value: "€455–€789", detail: "Home4students / STUWO" },
];

const universities = [
  { name: "University of Innsbruck", students: "28,000", intl: "~4,200", pct: "15%", detail: "Austria's third-largest university" },
  { name: "Medical University of Innsbruck", students: "3,200", intl: "~640", pct: "20%", detail: "Specialised medical faculty" },
  { name: "MCI Management Center Innsbruck", students: "3,500", intl: "~700", pct: "20%", detail: "Business & technology focus" },
  { name: "Private University UMIT TIROL", students: "1,500", intl: "~225", pct: "15%", detail: "Health & life sciences" },
];

const neighborhoods = [
  { name: "Wilten", campus: "Near main university campus", vibe: "Academic hub, good transport links", level: "Mid–High" },
  { name: "Saggen", campus: "Central, near Old Town", vibe: "Premium residential, quiet", level: "High" },
  { name: "Hötting / Höttinger Au", campus: "West of centre, Technik campus nearby", vibe: "Student-friendly, newer developments", level: "Mid" },
  { name: "Pradl", campus: "East of centre", vibe: "More affordable, well-connected", level: "Mid" },
  { name: "Dreiheiligen", campus: "Close to centre and Sill river", vibe: "Mixed residential, developing area", level: "Mid" },
];

const priceCategories = [
  { tier: "Budget", range: "€450–€860", desc: "PBSA dorm rooms, basic garconnières", color: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  { tier: "Entry PRS", range: "€860–€1,200", desc: "1-room private apartments, WG rooms", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { tier: "Mid-Market", range: "€1,200–€1,600", desc: "2-room apartments, furnished studios", color: "bg-slate-50 border-slate-200 text-slate-800" },
  { tier: "Premium", range: "€1,600–€2,500", desc: "Large apartments, penthouses, terraces", color: "bg-purple-50 border-purple-200 text-purple-800" },
  { tier: "Luxury", range: "€2,500–€4,169", desc: "Designer lofts, panorama penthouses", color: "bg-amber-50 border-amber-200 text-amber-800" },
];

const rentalBands = [
  { type: "Studio / Garconnière", size: "17–30 m²", budget: "€700–€920", mid: "€900–€1,100", premium: "€1,390–€2,108" },
  { type: "1-Room Apartment", size: "25–35 m²", budget: "€820–€980", mid: "€1,050–€1,350", premium: "€1,390–€1,545" },
  { type: "2-Room Apartment", size: "40–60 m²", budget: "€1,190–€1,380", mid: "€1,380–€1,664", premium: "€1,850–€1,994" },
  { type: "3-Room Apartment", size: "70–95 m²", budget: "€1,600–€1,870", mid: "€1,870–€2,200", premium: "€2,200–€2,958" },
  { type: "4-Room / Penthouse", size: "95–148 m²", budget: "€2,294–€2,500", mid: "€2,500–€3,205", premium: "€3,205–€4,169" },
];

export default function InnsbruckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">&larr; Home</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Student Housing in Innsbruck</h1>
          <p className="text-slate-500 mt-1">Austria&apos;s alpine university city &middot; Live market data</p>
          <div className="flex gap-3 mt-4">
            <Link href="/innsbruck/comparables" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">PBSA Comparables</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        {/* At a Glance */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Innsbruck at a Glance</h2>
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

        {/* Universities */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Universities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {universities.map((u) => (
              <div key={u.name} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-800">{u.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{u.detail}</p>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <p className="text-xs text-slate-500">Total</p>
                    <p className="font-semibold text-slate-700">{u.students}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">International</p>
                    <p className="font-semibold text-slate-700">{u.intl}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">% Intl</p>
                    <p className="font-semibold text-slate-700">{u.pct}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRS Rental Value Bands */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">PRS Illustrative Rental Values</h2>
          <p className="text-sm text-slate-400 mb-4">Based on 68 active listings from willhaben.at &amp; ImmobilienScout24 (March 2026)</p>
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

        {/* Price Categories */}
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

        {/* Top Student Areas */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Top Student Neighborhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {neighborhoods.map((n) => (
              <div key={n.name} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-800">{n.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{n.campus}</p>
                <p className="text-sm text-slate-600 mt-2">{n.vibe}</p>
                <div className="mt-3">
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    Rent Level: {n.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Market Focus */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Premium Market Snapshot</h2>
          <div className="bg-white rounded-xl border border-purple-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500">Premium 2-Room (60 m²)</p>
                <p className="text-2xl font-bold text-purple-700">€1,850–€1,994</p>
                <p className="text-xs text-slate-400 mt-1">Penthouse, dachterrasse, city views</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Premium 3-Room (84–110 m²)</p>
                <p className="text-2xl font-bold text-purple-700">€2,200–€2,958</p>
                <p className="text-xs text-slate-400 mt-1">Neubau, panorama locations, balkon</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Luxury 4-Room (99–148 m²)</p>
                <p className="text-2xl font-bold text-purple-700">€2,338–€4,169</p>
                <p className="text-xs text-slate-400 mt-1">Designer lofts, 360° bergpanorama</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-purple-100">
              <p className="text-xs text-slate-400">
                Based on top-quartile listings (above €1,850/month) from willhaben.at and ImmobilienScout24, March 2026.
                17 premium listings identified from 68 total active listings.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-slate-400">
          &copy; 2026 Student Housing DACH &middot; Innsbruck data scraped March 2026
        </div>
      </footer>
    </div>
  );
}
