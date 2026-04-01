
const stats = [
  { label: "Students", value: "~10,568", accent: false },
  { label: "International %", value: "18.1%", accent: false },
  { label: "City Population", value: "~54,000", accent: false },
  { label: "Universities", value: "1", accent: false },
  { label: "PBSA Beds", value: "~1,895", accent: false },
  { label: "Provision Rate", value: "11.4%", accent: false },
  { label: "Bed Gap", value: "~230", accent: true },
  { label: "Pipeline Beds", value: "~429", accent: false },
];

const rentBenchmarks = [
  { label: "PRS Median", value: "€550", sub: "276 listings" },
  { label: "Avg PBSA", value: "€620", sub: "all operators" },
  { label: "Premium PBSA", value: "€784", sub: "River Living market-rate" },
  { label: "Studentenwerk", value: "€325", sub: "public benchmark" },
];


export default function PassauPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header with city photo */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden">
        <img src="/images/banners/passau.jpg" alt="Passau three rivers confluence" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">City Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight drop-shadow-lg">Passau</h1>
          <p className="text-silver mt-1 text-sm drop-shadow-md">Bavaria, Germany &middot; 10,568 students &middot; 18.1% international &middot; March 2026</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* Key Metrics */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Key Market Metrics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map(s => (
              <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.12] transition-colors">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">{s.label}</div>
                <div className={`text-xl font-bold font-serif ${s.accent ? "text-emerald-accent" : "text-snow"}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Rent Benchmarks */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Rent Benchmarks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rentBenchmarks.map(r => (
              <div key={r.label} className="bg-midnight-light border border-white/[0.06] rounded-xl p-4 hover:border-emerald-accent/20 transition-colors">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">{r.label}</div>
                <div className="text-2xl font-bold text-snow font-serif">{r.value}<span className="text-xs text-silver/40 font-sans font-normal ml-1">/mo</span></div>
                <div className="text-[11px] text-silver/40 mt-1">{r.sub}</div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
