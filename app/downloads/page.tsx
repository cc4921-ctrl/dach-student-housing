import Link from "next/link";

const downloads = [
  {
    title: "Student Rental Listings Dataset",
    description: "Full PRS dataset with 3,287 listings across Innsbruck, Munich & Passau. Includes price, size, location, and source for each listing.",
    file: "/Student_Rental_Listings_Innsbruck_Passau_Munich.xlsx",
    filename: "Student_Rental_Listings_Innsbruck_Passau_Munich.xlsx",
    meta: "3,287 listings · March 2026 · willhaben.at / wg-gesucht.de / ImmobilienScout24",
    tag: "PRS Data",
    tagColor: "text-cat-amber bg-cat-amber/10 border-cat-amber/20",
  },
  {
    title: "Pipeline & Residences Summary",
    description: "Operational PBSA inventory and development pipeline for all three cities. Includes beds, operators, rents, and project status.",
    file: "/Pipeline_and_Residences_Summary.xlsx",
    filename: "Pipeline_and_Residences_Summary.xlsx",
    meta: "Pipeline + Residences · March 2026 · Innsbruck, Munich, Passau",
    tag: "PBSA Data",
    tagColor: "text-cat-purple bg-cat-purple/10 border-cat-purple/20",
  },
  {
    title: "PBSA ↔ PRS Anchoring Model",
    description: "Full pricing model with market inputs, PRS benchmarks, PBSA comparables, proposed rents by scenario, market scorecard and sensitivity analysis.",
    file: "/PBSA_PRS_Anchoring_Model.xlsx",
    filename: "PBSA_PRS_Anchoring_Model.xlsx",
    meta: "6 sheets · March 2026 · Munich-anchored multiplier model",
    tag: "Pricing Model",
    tagColor: "text-cat-blue bg-cat-blue/10 border-cat-blue/20",
  },
];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-44 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Research Files</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">Downloads</h1>
          <p className="text-silver mt-1 text-sm">{downloads.length} source files — all data backing this research</p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-4">
        {downloads.map((d, i) => (
          <div key={i} className="bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/20 rounded-2xl p-6 transition-colors group">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${d.tagColor}`}>
                    {d.tag}
                  </span>
                </div>
                <h2 className="text-base font-bold text-snow mb-1">{d.title}</h2>
                <p className="text-sm text-silver/70 leading-relaxed mb-3">{d.description}</p>
                <p className="text-[11px] text-silver/40 font-mono">{d.meta}</p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={d.file}
                  download={d.filename}
                  className="inline-flex items-center gap-2 bg-emerald-accent text-midnight px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-glow transition-colors whitespace-nowrap"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M8 1v10M4 7l4 4 4-4M2 14h12" />
                  </svg>
                  Download .xlsx
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Nav */}
        <div className="pt-6 flex flex-wrap gap-3">
          <Link href="/data" className="inline-flex items-center gap-2 bg-transparent text-silver border border-white/[0.1] px-5 py-2.5 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all text-sm font-medium">
            Data Overview
          </Link>
          <Link href="/pricing-model" className="inline-flex items-center gap-2 bg-transparent text-silver border border-white/[0.1] px-5 py-2.5 rounded-xl hover:text-snow hover:border-white/[0.2] transition-all text-sm font-medium">
            Pricing Model
          </Link>
        </div>
      </main>
    </div>
  );
}
