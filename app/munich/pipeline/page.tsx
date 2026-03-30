"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "All" | "Completed" | "Under Construction" | "Planning" | "Operational";

interface PipelineProject {
  name: string;
  status: Status;
  developer: string;
  beds: string;
  completion: string;
  investment: string;
  type: string;
  notes: string;
  source: string;
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Completed": { bg: "bg-cat-green/10 border-cat-green/20", text: "text-cat-green", dot: "bg-cat-green" },
  "Under Construction": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber", dot: "bg-cat-amber" },
  "Planning": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple", dot: "bg-cat-purple" },
  "Operational": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue", dot: "bg-cat-blue" },
};

const projects: PipelineProject[] = [
  {
    name: "Studentenstadt Freimann — House 12 Renovation",
    status: "Under Construction",
    developer: "BayernHeim / Studierendenwerk München Oberbayern",
    beds: "~520 beds (of 1,044 total)",
    completion: "2027",
    investment: "~€151M (total for Houses 9+12)",
    type: "Public (Renovation)",
    notes: "Gutted to raw structure and comprehensively renovated. 40-year occupancy binding for student use.",
    source: "https://www.stmwk.bayern.de/pressemitteilung/12809/baustart-in-der-muenchner-studentenstadt-bayernheim-saniert-1044-wohnheimplaetze.html",
  },
  {
    name: "Studentenstadt Freimann — House 9 Renovation",
    status: "Under Construction",
    developer: "BayernHeim / Studierendenwerk München Oberbayern",
    beds: "~524 beds (of 1,044 total)",
    completion: "2028",
    investment: "Incl. above (€151M total)",
    type: "Public (Renovation)",
    notes: "Part of Germany's largest student settlement (14 buildings, built 1961–1975). State-funded renovation programme.",
    source: "https://bayernheim.de/neuausbau-in-der-studentenstadt-muenchen-schreitet-voran-zentrale-meilensteine-erreicht/",
  },
  {
    name: "Schwere-Reiter-Straße Residence",
    status: "Completed",
    developer: "Studierendenwerk München Oberbayern",
    beds: "241 apartments",
    completion: "2024",
    investment: "Not disclosed",
    type: "Public (New Build)",
    notes: "Munich's tallest timber-framed building. Demonstrates feasibility of wood construction at scale.",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/news/news-studentisches-wohnen/241-neue-studierendenwohnplaetze/",
  },
  {
    name: "Josef-Wirth-Weg Studentenwohnheim",
    status: "Completed",
    developer: "Private developer (details not public)",
    beds: "209 apartments + 164 parking",
    completion: "Recently completed",
    investment: "Not disclosed",
    type: "Private (New Build)",
    notes: "Privately financed student residence with modern apartment layouts.",
    source: "",
  },
  {
    name: "Männerwohnheim Gabelsberger-/Schleißheimerstr. Expansion",
    status: "Under Construction",
    developer: "Studierendenwerk München Oberbayern",
    beds: "Not disclosed",
    completion: "2025–2026",
    investment: "Not disclosed",
    type: "Public (Expansion + Renovation)",
    notes: "New adjacent building completed summer 2025; residents relocated while historic building is renovated.",
    source: "https://www.studierendenwerk-muenchen-oberbayern.de/en/accommodation/halls-of-residence/",
  },
  {
    name: "THE FIZZ Munich (Hanebergstraße)",
    status: "Operational",
    developer: "International Campus GmbH",
    beds: "234 apartments",
    completion: "2021",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "9-storey new build + 5-storey existing. Acquired from SIGNA. Up to 40m² furnished units. Planning additional Munich expansion via hotel/office conversions.",
    source: "https://www.the-fizz.com/en/student-accommodation/munich/",
  },
  {
    name: "THE FIZZ Munich — Expansion Pipeline",
    status: "Planning",
    developer: "International Campus GmbH",
    beds: "TBC",
    completion: "TBC",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "IC actively seeking hotel and office conversions in Munich for additional FIZZ-branded student residences.",
    source: "https://ic-campus.com/en/",
  },
  {
    name: "OmniLiv Platform — Munich Pipeline",
    status: "Planning",
    developer: "PGIM Real Estate / OmniLiv",
    beds: "TBC",
    completion: "TBC (2026–2028 expected)",
    investment: "Part of broader platform",
    type: "Private (Micro-Living / PBSA)",
    notes: "Dedicated micro-living platform targeting students & young professionals in top 7 German cities. Munich is one of three primary focus cities alongside Berlin and Frankfurt.",
    source: "https://www.pgim.com/global/en/borrower/about-us/newsroom/press-releases/pgim-real-estate-launches-german-micro-living-platform",
  },
  {
    name: "Campus Viva Munich",
    status: "Operational",
    developer: "Campus Viva",
    beds: "Not disclosed",
    completion: "Operational",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "Student apartments in Munich's south, near landscaped park and shopping centre.",
    source: "https://www.campusviva.de/en/",
  },
];

export default function MunichPipelinePage() {
  const [filter, setFilter] = useState<Status>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const statuses: Status[] = ["All", "Completed", "Under Construction", "Planning", "Operational"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/munich" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Munich</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Development Pipeline</h1>
          <p className="text-sm text-silver mt-2">{projects.length} projects &middot; Munich student housing pipeline</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-silver">Showing {filtered.length} of {projects.length} projects</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => {
              const c = statusColors[s] || { bg: "bg-white/[0.06]", text: "text-snow", dot: "bg-silver" };
              const isActive = filter === s;
              return (
                <button key={s} onClick={() => setFilter(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                    isActive
                      ? s === "All" ? "bg-white/10 border-white/20 text-snow" : `${c.bg} border ${c.text}`
                      : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
                  }`}
                >
                  {s !== "All" && <span className={`w-2 h-2 rounded-full ${isActive ? c.dot : "bg-silver/30"}`} />}
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project cards */}
        <div className="space-y-4">
          {filtered.map((p) => {
            const isOpen = expanded === p.name;
            const c = statusColors[p.status] || statusColors["Planning"];

            return (
              <div key={p.name} className={`bg-midnight-light border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-emerald-accent/30" : "border-white/[0.06] hover:border-white/[0.12]"}`}>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2 flex-shrink-0 bg-gradient-to-b from-emerald-accent/30 to-transparent hidden lg:block" />
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h2 className="text-lg font-bold text-snow">{p.name}</h2>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${c.bg} ${c.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                            {p.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 bg-emerald-accent/10 border border-emerald-accent/20 rounded-xl px-4 py-2.5 text-center">
                        <div className="text-[10px] text-emerald-accent/70 uppercase tracking-wider mb-0.5">Est. Completion</div>
                        <div className="text-xl font-bold text-emerald-accent font-serif">{p.completion}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      {[
                        { label: "Developer", value: p.developer },
                        { label: "Capacity", value: `${p.beds} beds` },
                        { label: "Investment", value: p.investment },
                        { label: "Type", value: p.type },
                      ].map((d) => (
                        <div key={d.label}>
                          <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{d.label}</div>
                          <div className="text-sm font-medium text-silver-bright">{d.value}</div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setExpanded(isOpen ? null : p.name)}
                      className="text-emerald-accent text-[13px] font-semibold hover:text-emerald-glow transition-colors flex items-center gap-1.5">
                      {isOpen ? "Hide Details" : "View Details"}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                        <path d="M3 5l3 3 3-3" />
                      </svg>
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="border-t border-white/[0.06] bg-midnight/50 px-6 py-5">
                    <h3 className="text-sm font-bold text-snow mb-3 uppercase tracking-wider">Project Notes</h3>
                    <p className="text-sm text-silver leading-relaxed">{p.notes}</p>
                    {p.source && (
                      <a href={p.source} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-xs text-emerald-accent/70 hover:text-emerald-accent transition-colors">
                        Source
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1v6" /></svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cross-city pipeline nav */}
        <section className="mt-12">
          <h2 className="text-sm font-bold text-silver/50 uppercase tracking-[0.2em] mb-4">Pipeline by City</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/innsbruck/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Innsbruck</div>
            </Link>
            <div className="bg-emerald-accent/10 border border-emerald-accent/30 rounded-xl px-5 py-4">
              <div className="text-emerald-accent text-xs font-bold uppercase tracking-wider mb-1">Current</div>
              <div className="text-snow font-bold">Munich</div>
            </div>
            <Link href="/passau/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Passau</div>
            </Link>
          </div>
        </section>

        {/* Nav links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/munich/comparables"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M15 8H1M7 2L1 8l6 6" />
            </svg>
            PBSA Comparables
          </Link>
          <Link href="/munich/universities"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Universities
          </Link>
          <Link href="/munich"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Munich Overview
          </Link>
        </div>
      </main>
    </div>
  );
}
