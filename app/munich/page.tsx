import Link from "next/link";

const histogram = [
  { label: "€0–200", count: 1 },
  { label: "€200–400", count: 6 },
  { label: "€400–600", count: 15 },
  { label: "€600–800", count: 34 },
  { label: "€800–1,000", count: 62 },
  { label: "€1,000–1,200", count: 75 },
  { label: "€1,200–1,400", count: 71 },
  { label: "€1,400–1,600", count: 33 },
  { label: "€1,600–1,800", count: 16 },
  { label: "€1,800–2,000", count: 10 },
  { label: "€2,000–2,400", count: 6 },
  { label: "€2,400+", count: 9 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function MunichPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">&larr; Home</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Munich</h1>
          <p className="text-slate-500 mt-1">338 listings &middot; Median €1,150/mo &middot; March 2026</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Price Distribution</h2>
          <p className="text-sm text-slate-500 mb-6">Monthly rent across 338 active 1-room listings (wg-gesucht.de &amp; ImmobilienScout24)</p>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="space-y-2">
              {histogram.map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-28 text-right shrink-0 font-mono">{bar.label}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className="h-7 rounded-r bg-blue-500 transition-all"
                      style={{ width: `${(bar.count / maxCount) * 100}%`, minWidth: bar.count > 0 ? '4px' : '0' }}
                    />
                    <span className="text-xs text-slate-600 font-medium">{bar.count}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div>Median: <span className="font-semibold text-slate-800">€1,150</span></div>
              <div>Q25: <span className="font-semibold text-slate-800">€900</span></div>
              <div>Q75: <span className="font-semibold text-slate-800">€1,350</span></div>
              <div>Range: <span className="font-semibold text-slate-800">€190–€3,580</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/munich/comparables"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            PBSA Comparables &rarr;
          </Link>
          <a
            href="https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Muenchen.90.1.1.0.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            Source Data ↗
          </a>
        </div>
      </main>
    </div>
  );
}
