import Link from "next/link";

const stats = [
  { label: "Students", value: "~130,000", accent: false },
  { label: "International %", value: "28.9%", accent: false },
  { label: "City Population", value: "~1.51M", accent: false },
  { label: "Universities", value: "16", accent: false },
  { label: "PBSA Beds", value: "~12,000", accent: false },
  { label: "Provision Rate", value: "9.2%", accent: false },
  { label: "Bed Gap", value: ">14,000", accent: true },
  { label: "Occupancy", value: "96%", accent: false },
];

const rentBenchmarks = [
  { label: "PRS Median", value: "€1,290", sub: "2,832 listings" },
  { label: "Avg PBSA", value: "€1,374", sub: "all operators" },
  { label: "Premium PBSA", value: "€1,919", sub: "THE FIZZ / Die Zimmerei" },
  { label: "Studentenwerk", value: "€353", sub: "public benchmark" },
];

const pages = [
  { href: "/munich/comparables", label: "PBSA Comparables", desc: "20 residences · pricing & photos", primary: true },
  { href: "/munich/prs-distribution", label: "PRS Distribution", desc: "2,832 listings · price histogram" },
  { href: "/munich/pipeline", label: "Pipeline", desc: "9 projects · development tracker" },
  { href: "/munich/universities", label: "Universities", desc: "16 institutions · 130k students" },
  { href: "/munich/gallery", label: "Gallery", desc: "Residence photo gallery" },
];

export default function MunichPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header with city photo */}
      <div className="relative w-full h-72 sm:h-80 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich skyline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">City Overview</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight drop-shadow-lg">Munich</h1>
          <p className="text-silver mt-1 text-sm drop-shadow-md">Bavaria, Germany &middot; 130,000 students &middot; 28.9% international &middot; March 2026</p>
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

        {/* Quick Navigation */}
        <section>
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Explore</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pages.map(p => (
              <Link key={p.href} href={p.href}
                className={`group rounded-xl border p-5 transition-all duration-200 ${
                  p.primary
                    ? "bg-emerald-accent/5 border-emerald-accent/20 hover:border-emerald-accent/40"
                    : "bg-midnight-light border-white/[0.06] hover:border-white/[0.15]"
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-bold ${p.primary ? "text-emerald-accent" : "text-snow"}`}>{p.label}</h3>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-silver/30 group-hover:text-emerald-accent group-hover:translate-x-0.5 transition-all"><path d="M1 8h14M9 2l6 6-6 6" /></svg>
                </div>
                <p className="text-xs text-silver/60">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
