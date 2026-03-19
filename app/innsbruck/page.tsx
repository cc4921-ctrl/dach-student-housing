import Link from "next/link";

const histogram = [
  { label: "250", count: 1 },
  { label: "500", count: 4 },
  { label: "750", count: 13 },
  { label: "1k", count: 8 },
  { label: "1.25k", count: 16 },
  { label: "1.5k", count: 9 },
  { label: "1.75k", count: 4 },
  { label: "2k", count: 4 },
  { label: "2.25k", count: 4 },
  { label: "2.5k", count: 2 },
  { label: "3k+", count: 3 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function InnsbruckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Innsbruck</h1>
          <p className="text-slate-500 mt-1">68 listings &middot; Median &euro;1,380/mo &middot; March 2026</p>
        </div>
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-1">Price Distribution</h2>
          <p className="text-sm text-slate-500 mb-6">Monthly rent across 68 active PRS listings (willhaben.at &amp; ImmobilienScout24)</p>

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
              <div>Median <span className="font-semibold text-slate-800">&euro;1,380</span></div>
              <div>Q25 <span className="font-semibold text-slate-800">&euro;920</span></div>
              <div>Q75 <span className="font-semibold text-slate-800">&euro;1,870</span></div>
              <div>Range <span className="font-semibold text-slate-800">&euro;450&ndash;&euro;4,169</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/innsbruck/comparables" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            PBSA Comparables &rarr;
          </Link>
          <Link href="/innsbruck/universities" className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
            Universities
          </Link>
          <a href="https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?areaId=70101" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
