import Link from "next/link";

const histogram = [
  { range: "€200", count: 2 },
  { range: "€300", count: 12 },
  { range: "€400", count: 32 },
  { range: "€500", count: 40 },
  { range: "€600", count: 34 },
  { range: "€700", count: 22 },
  { range: "€800", count: 14 },
  { range: "€900+", count: 11 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function PassauPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Passau</h1>
          <p className="text-slate-500 mt-1">167 listings &middot; Median &euro;515/mo &middot; March 2026</p>
        </div>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Price Distribution</h2>
          <p className="text-sm text-slate-500 mb-6">Monthly rent across 167 active PRS listings (WG-gesucht, ImmobilienScout24 & immowelt)</p>

          <div className="bg-white rounded-xl border border-slate-200 p-6 pb-4">
            <div className="flex items-end gap-1.5 h-52">
              {histogram.map((bar) => (
                <div key={bar.range} className="flex-1 flex flex-col items-center justify-end h-full">
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
                <div key={bar.range} className="flex-1 text-center">
                  <span className="text-[10px] text-slate-400 leading-tight">{bar.range}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div>Median <span className="font-semibold text-slate-800">&euro;515</span></div>
              <div>Q25 <span className="font-semibold text-slate-800">&euro;420</span></div>
              <div>Q75 <span className="font-semibold text-slate-800">&euro;660</span></div>
              <div>Range <span className="font-semibold text-slate-800">&euro;270&ndash;&euro;995</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/passau/comparables" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            PBSA Comparables &rarr;
          </Link>
          <Link href="/passau/universities" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
            Universities
          </Link>
          <a href="https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Passau.87.1.1.0.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
