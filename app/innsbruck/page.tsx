import Link from "next/link";

const histogram = [
  { label: "€250–500", count: 1 },
  { label: "€500–750", count: 4 },
  { label: "€750–1,000", count: 13 },
  { label: "€1,000–1,250", count: 8 },
  { label: "€1,250–1,500", count: 16 },
  { label: "€1,500–1,750", count: 9 },
  { label: "€1,750–2,000", count: 4 },
  { label: "€2,000–2,250", count: 4 },
  { label: "€2,250–2,500", count: 4 },
  { label: "€2,500–3,000", count: 2 },
  { label: "€3,000+", count: 3 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function InnsbruckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">&larr; Home</Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">Innsbruck</h1>
          <p className="text-slate-500 mt-1">68 listings &middot; Median €1,380/mo &middot; March 2026</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Price Distribution</h2>
          <p className="text-sm text-slate-500 mb-6">Monthly rent across 68 active PRS listings (willhaben.at &amp; ImmobilienScout24)</p>

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
              <div>Median: <span className="font-semibold text-slate-800">€1,380</span></div>
              <div>Q25: <span className="font-semibold text-slate-800">€920</span></div>
              <div>Q75: <span className="font-semibold text-slate-800">€1,870</span></div>
              <div>Range: <span className="font-semibold text-slate-800">€450–€4,169</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/innsbruck/comparables"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            PBSA Comparables &rarr;
          </Link>
          <a
            href="https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?areaId=70101"
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
