import Link from "next/link";

const histogram = [
  { label: "500", count: 9 },
  { label: "750", count: 19 },
  { label: "1k", count: 27 },
  { label: "1.25k", count: 16 },
  { label: "1.5k", count: 38 },
  { label: "1.75k", count: 26 },
  { label: "2k", count: 11 },
  { label: "2.25k", count: 7 },
  { label: "2.5k", count: 9 },
  { label: "3k+", count: 17 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function InnsbruckPRSPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-44 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Innsbruck / PRS Distribution</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">Private Rental Distribution</h1>
          <p className="text-silver mt-1 text-sm">179 listings &middot; Median &euro;1,380/mo &middot; March 2026</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section>
          <h2 className="text-lg font-bold text-snow mb-1">Price Distribution</h2>
          <p className="text-sm text-silver mb-6">Monthly rent across 179 active PRS listings (willhaben.at &amp; ImmobilienScout24)</p>

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
              <div>Median <span className="font-semibold text-snow">&euro;1,380</span></div>
              <div>Q25 <span className="font-semibold text-snow">&euro;900</span></div>
              <div>Q75 <span className="font-semibold text-snow">&euro;1,710</span></div>
              <div>Range <span className="font-semibold text-snow">&euro;314&ndash;&euro;4,268</span></div>
            </div>
          </div>
        </section>

        {/* Detailed Stats */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-4">Summary Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Mean", value: "€1,467" },
              { label: "Median", value: "€1,380" },
              { label: "Q25", value: "€900" },
              { label: "Q75", value: "€1,710" },
              { label: "Min", value: "€314" },
              { label: "Max", value: "€4,268" },
              { label: "Listings", value: "179" },
              { label: "Sources", value: "willhaben / IS24" },
            ].map(s => (
              <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-base font-bold text-snow">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/innsbruck" className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-6 py-3 rounded-xl hover:bg-emerald-glow transition-colors font-bold text-sm tracking-wide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform"><path d="M15 8H1M7 2L1 8l6 6" /></svg>
            Innsbruck Overview
          </Link>
          <Link href="/innsbruck/comparables" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all font-medium text-sm">
            PBSA Comparables
          </Link>
          <a href="https://www.willhaben.at/iad/immobilien/mietwohnungen/mietwohnung-angebote?areaId=70101" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all font-medium text-sm">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
