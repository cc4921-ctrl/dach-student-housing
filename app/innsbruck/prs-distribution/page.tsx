import Link from "next/link";

/* ── Student-Filtered Distribution ──
   Filter: ≤50 sqm, ≤€1,500/mo, size ≥10 sqm — studios and 1-bed
   apartments realistic for a single student in Innsbruck.
   Source: 84 of 163 total listings from willhaben.at & ImmobilienScout24, March 2026. */

const histogram = [
  { label: "400", count: 4 },
  { label: "600", count: 12 },
  { label: "800", count: 20 },
  { label: "1k", count: 20 },
  { label: "1.2k", count: 7 },
  { label: "1.5k", count: 21 },
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
          <p className="text-silver mt-1 text-sm">84 student-relevant listings &middot; Median &euro;928/mo &middot; March 2026</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Methodology note */}
        <div className="bg-emerald-accent/5 border border-emerald-accent/15 rounded-xl px-5 py-4 text-sm text-silver">
          <span className="text-emerald-accent font-bold text-xs uppercase tracking-wider">Student Filter Applied</span>
          <p className="mt-1.5">Listings narrowed to units &le;50&thinsp;m&sup2; and &le;&euro;1,500/mo &mdash; studios and 1-bed apartments realistic for a single student. This excludes large family flats, shared WGs priced per-unit, and luxury apartments that skew market averages. 84 of 163 total listings pass this filter.</p>
        </div>

        {/* Price Distribution */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-1">Price Distribution</h2>
          <p className="text-sm text-silver mb-6">Monthly rent across 84 student-relevant PRS listings (willhaben.at &amp; ImmobilienScout24)</p>

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
              <div>Median <span className="font-semibold text-snow">&euro;928</span></div>
              <div>Q25 <span className="font-semibold text-snow">&euro;729</span></div>
              <div>Q75 <span className="font-semibold text-snow">&euro;1,300</span></div>
              <div>Range <span className="font-semibold text-snow">&euro;342&ndash;&euro;1,500</span></div>
            </div>
          </div>
        </section>

        {/* Summary Statistics */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-4">Summary Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Mean", value: "€975" },
              { label: "Median", value: "€928" },
              { label: "Q25", value: "€729" },
              { label: "Q75", value: "€1,300" },
              { label: "Min", value: "€342" },
              { label: "Max", value: "€1,500" },
              { label: "Listings", value: "84 of 163" },
              { label: "Sources", value: "willhaben / IS24" },
            ].map(s => (
              <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-base font-bold text-snow">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Price per sqm */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-4">Price per Square Metre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Mean €/m²", value: "€32.10" },
              { label: "Median €/m²", value: "€29.90" },
              { label: "Min €/m²", value: "€8.60" },
              { label: "Max €/m²", value: "€69.00" },
              { label: "Median Size", value: "32 m²" },
              { label: "Size Range", value: "10–50 m²" },
              { label: "Avg Size", value: "31 m²" },
              { label: "Sample", value: "84 listings" },
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
