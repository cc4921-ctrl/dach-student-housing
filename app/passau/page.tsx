import Link from "next/link";

const histogram = [
  { label: "300", count: 12 },
  { label: "400", count: 39 },
  { label: "500", count: 54 },
  { label: "600", count: 47 },
  { label: "700", count: 28 },
  { label: "800", count: 23 },
  { label: "900+", count: 73 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function PassauPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-44 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">City Overview</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">Passau</h1>
          <p className="text-silver mt-1 text-sm">276 listings &middot; Median &euro;550/mo &middot; March 2026</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section>
          <h2 className="text-lg font-bold text-snow mb-1">Price Distribution</h2>
          <p className="text-sm text-silver mb-6">Monthly rent across 276 active PRS listings (WG-gesucht &amp; ImmobilienScout24)</p>

          <div className="bg-midnight-light rounded-2xl border border-white/[0.06] p-6 pb-4">
            <div className="flex items-end gap-1.5 h-52">
              {histogram.map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium text-silver/70 mb-1">{bar.count}</span>
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-emerald-accent to-emerald-glow"
                    style={{ height: `${(bar.count / maxCount) * 100}%`, minHeight: bar.count > 0 ? '4px' : '0' }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-2 border-t border-white/[0.06] pt-2">
              {histogram.map((bar) => (
                <div key={bar.label} className="flex-1 text-center">
                  <span className="text-[10px] text-silver/50 leading-tight">&euro;{bar.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-6 text-sm text-silver">
              <div>Median <span className="font-semibold text-snow">&euro;550</span></div>
              <div>Q25 <span className="font-semibold text-snow">&euro;430</span></div>
              <div>Q75 <span className="font-semibold text-snow">&euro;800</span></div>
              <div>Range <span className="font-semibold text-snow">&euro;200&ndash;&euro;2,000</span></div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/passau/comparables" className="inline-flex items-center justify-center gap-2 bg-emerald-accent text-midnight px-6 py-3 rounded-xl hover:bg-emerald-glow transition-colors font-bold text-sm tracking-wide">
            PBSA Comparables &rarr;
          </Link>
          <Link href="/passau/universities" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all font-medium text-sm">
            Universities
          </Link>
          <a href="https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Passau.87.1.1.0.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all font-medium text-sm">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
