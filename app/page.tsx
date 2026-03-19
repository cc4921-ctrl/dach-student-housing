import Link from "next/link";

const cities = [
  {
    slug: "innsbruck",
    name: "Innsbruck",
    country: "Austria",
    flag: "🇦🇹",
    students: "28,000+",
    avgRent: "€1,380",
    premiumRange: "€1,850–€4,169",
    universities: 4,
    status: "Live Data",
  },
  {
    slug: "munich",
    name: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    students: "148,000+",
    avgRent: "€1,150",
    premiumRange: "€1,350–€3,580",
    universities: 6,
    status: "Live Data",
  },
  {
    slug: "passau",
    name: "Passau",
    country: "Germany",
    flag: "🇩🇪",
    students: "10,500+",
    avgRent: "€490",
    premiumRange: "€530–€650",
    universities: 1,
    status: "Live Data",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-800">DACH Student Housing Market</h1>
        <p className="text-slate-500 mt-1 mb-8">Market data and rent estimation for Austrian &amp; German cities</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{city.flag}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    city.status === "Live Data"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {city.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {city.name}
                </h2>
                <p className="text-sm text-slate-500">{city.country}</p>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Students</span>
                    <span className="font-semibold text-slate-700">{city.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Median Rent</span>
                    <span className="font-semibold text-slate-700">{city.avgRent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Premium Range</span>
                    <span className="font-semibold text-purple-600">{city.premiumRange}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Universities</span>
                    <span className="font-semibold text-slate-700">{city.universities}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                    City Overview
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-16 pb-8 text-center text-xs text-slate-400">
        Data as of March 2026
      </footer>
    </div>
  );
}
