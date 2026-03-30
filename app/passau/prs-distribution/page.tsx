import Link from "next/link";

/* ── Student-Filtered Distribution ──
   Filter: ≤50 sqm, ≤€1,000/mo, size ≥10 sqm — i.e. studios and 1-bed
   apartments realistic for a single student in Passau.
   Source: 53 listings from wg-gesucht.de & ImmobilienScout24, March 2026. */

const histogram = [
  { label: "300", count: 10 },
  { label: "400", count: 20 },
  { label: "500", count: 18 },
  { label: "600", count: 5 },
  { label: "700+", count: 0 },
];

const maxCount = Math.max(...histogram.map(h => h.count));

export default function PassauPRSPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-44 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Passau / PRS Distribution</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">Private Rental Distribution</h1>
          <p className="text-silver mt-1 text-sm">53 student-relevant listings &middot; Median &euro;490/mo &middot; March 2026</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Methodology note */}
        <div className="bg-emerald-accent/5 border border-emerald-accent/15 rounded-xl px-5 py-4 text-sm text-silver">
          <span className="text-emerald-accent font-bold text-xs uppercase tracking-wider">Student Filter Applied</span>
          <p className="mt-1.5">Listings narrowed to units &le;50&thinsp;m&sup2; and &le;&euro;1,000/mo &mdash; studios and 1-bed apartments realistic for a single student. This excludes large family flats, shared WGs priced per-unit, and luxury apartments that skew market averages.</p>
        </div>

        {/* Price Distribution */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-1">Price Distribution</h2>
          <p className="text-sm text-silver mb-6">Monthly rent across 53 student-relevant PRS listings (WG-gesucht &amp; ImmobilienScout24)</p>

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
              <div>Median <span className="font-semibold text-snow">&euro;490</span></div>
              <div>Q25 <span className="font-semibold text-snow">&euro;420</span></div>
              <div>Q75 <span className="font-semibold text-snow">&euro;530</span></div>
              <div>Range <span className="font-semibold text-snow">&euro;332&ndash;&euro;650</span></div>
            </div>
          </div>
        </section>

        {/* Summary Statistics */}
        <section>
          <h2 className="text-lg font-bold text-snow mb-4">Summary Statistics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Mean", value: "€480" },
              { label: "Median", value: "€490" },
              { label: "Q25", value: "€420" },
              { label: "Q75", value: "€530" },
              { label: "Min", value: "€332" },
              { label: "Max", value: "€650" },
              { label: "Listings", value: "53" },
              { label: "Sources", value: "wg-gesucht / IS24" },
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
              { label: "Mean €/m²", value: "€18.30" },
              { label: "Median €/m²", value: "€17.80" },
              { label: "Min €/m²", value: "€10.00" },
              { label: "Max €/m²", value: "€31.20" },
              { label: "Median Size", value: "25 m²" },
              { label: "Size Range", value: "15–48 m²" },
              { label: "Avg Size", value: "26 m²" },
              { label: "Sample", value: "53 listings" },
            ].map(s => (
              <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-xl p-4">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-base font-bold text-snow">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/passau" className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-6 py-3 rounded-xl hover:bg-emerald-glow transition-colors font-bold text-sm tracking-wide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform"><path d="M15 8H1M7 2L1 8l6 6" /></svg>
            Passau Overview
          </Link>
          <Link href="/passau/comparables" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all font-medium text-sm">
            PBSA Comparables
          </Link>
          <a href="https://www.wg-gesucht.de/1-zimmer-wohnungen-in-Passau.87.1.1.0.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all font-medium text-sm">
            Source Data &uarr;
          </a>
        </div>
      </main>
    </div>
  );
}
