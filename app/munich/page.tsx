import Link from "next/link";

const histogram = [
  { label: "200", count: 7 },
  { label: "400", count: 15 },
  { label: "600", count: 34 },
  { label: "800", count: 62 },
  { label: "1k", count: 75 },
  { label: "1.2k", count: 71 },
  { label: "1.4k", count: 33 },
  { label: "1.6k", count: 16 },
  { label: "1.8k", count: 10 },
  { label: "2k", count: 6 },
  { label: "2.4k+", count: 9 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function MunichPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">&larr; Home</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Munich</h1>
          <p className="text-slate-500 mt-1">338 listings &middot; Median &euro;1,150/mo &middot; March 2026</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Price Distribution</h2>
          <p className="text-sm text-slate-500 mb-6">Monthly rent across 338 active 1-room listings (wg-gesucht.de &amp; ImmobilienScout24)</p>

          <div className="bg-white rounded-xl border border-slate-200 p-6 pb-4">
            <div className="flex items-end gap-1.5 h-52">
              {histogram.map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-slate-500 mb-1">{bar.count}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400"
                    style={{ height: `${(bar.count / maxCount) * 100}%`, minHeight: bar.count > 0 ? '4px' : '0' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-2 border-t border-slate-100 pt-2">
              {histogram.map((bar) => (
                <div key={bar.label} className="flex-1 text-center">
                  <span className="text-[10px] text-slate-400 leading-tight">&euro;{bar.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div>Median <span className="font-semibold text-slate-800">&euro;1,150</span></div>
              <div>Q25 <span className="font-semibold text-slate-800">&euro;900</span></div>
              <div>Q75 <span className="font-semibold text-slate-800">&euro;1,350</span></div>
              <div>Range <span className="font-semibold text-slate-800">&euro;190&ndash;&euro;3,580</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/munich/comparables" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            PBSA Comparables &rarr;
          </Link>
          <Link href="/munich/universities" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
            Universities
          </Link>
          <a href="https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Muenchen.90.1.1.0.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
