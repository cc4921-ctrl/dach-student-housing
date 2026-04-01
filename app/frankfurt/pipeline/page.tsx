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
    name: "THE FIZZ Frankfurt (Europaviertel)",
    status: "Operational",
    developer: "International Campus GmbH",
    beds: "~350 apartments",
    completion: "2020",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "Modern PBSA in Frankfurt's Europaviertel, close to Messe and Westend campus. Furnished studios with all-inclusive rent model.",
    source: "https://www.the-fizz.com/en/student-accommodation/frankfurt/",
  },
  {
    name: "THE FIZZ Frankfurt — Expansion",
    status: "Planning",
    developer: "International Campus GmbH",
    beds: "TBC",
    completion: "TBC",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "IC actively evaluating further sites in Frankfurt for FIZZ-branded residences, including potential office-to-residential conversions.",
    source: "https://ic-campus.com/en/",
  },
  {
    name: "Greystar Frankfurt Student Living",
    status: "Under Construction",
    developer: "Greystar",
    beds: "~220 apartments",
    completion: "2026",
    investment: "Not disclosed",
    type: "Private (Premium PBSA)",
    notes: "Premium student apartments in Frankfurt Gallus targeting young professionals and students. Part of Greystar's European expansion.",
    source: "https://www.greystar.com",
  },
  {
    name: "OmniLiv Platform — Frankfurt Pipeline",
    status: "Planning",
    developer: "PGIM Real Estate / OmniLiv",
    beds: "TBC",
    completion: "TBC (2026–2028 expected)",
    investment: "Part of broader platform",
    type: "Private (Micro-Living / PBSA)",
    notes: "Frankfurt is one of three primary target cities (alongside Berlin and Munich) for PGIM's dedicated micro-living platform targeting students and young professionals.",
    source: "https://www.pgim.com/global/en/borrower/about-us/newsroom/press-releases/pgim-real-estate-launches-german-micro-living-platform",
  },
  {
    name: "Studierendenwerk Riedberg Expansion",
    status: "Planning",
    developer: "Studierendenwerk Frankfurt",
    beds: "~200 beds",
    completion: "2027–2028",
    investment: "State-funded",
    type: "Public (New Build)",
    notes: "Planned expansion of student housing at Riedberg science campus to serve growing STEM student population at Goethe University.",
    source: "https://www.studentenwerkfrankfurt.de/wohnen",
  },
  {
    name: "BASECAMP Frankfurt (Europaviertel)",
    status: "Operational",
    developer: "BASECAMP",
    beds: "~200 apartments",
    completion: "2019",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "Student apartments with community facilities, roof terrace, gym. Focus on international students with flexible lease terms.",
    source: "https://www.basecamp-student.de/en/frankfurt/",
  },
  {
    name: "Campus Viva Frankfurt",
    status: "Operational",
    developer: "Campus Viva",
    beds: "~320 apartments",
    completion: "Operational",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "Student-focused micro-apartments in Frankfurt Gallus with communal spaces and bike storage.",
    source: "https://www.campusviva.de/en/",
  },
  {
    name: "i LIVE Frankfurt Ostend",
    status: "Completed",
    developer: "i LIVE Group",
    beds: "~250 apartments",
    completion: "2023",
    investment: "Not disclosed",
    type: "Private (PBSA)",
    notes: "Modern student residence in Frankfurt's Ostend district near the EZB. Smart studios with digital access and community app.",
    source: "https://www.ilive-group.com/en/",
  },
];

export default function FrankfurtPipelinePage() {
  const [filter, setFilter] = useState<Status>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const statuses: Status[] = ["All", "Completed", "Under Construction", "Planning", "Operational"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src="/images/banners/frankfurt.jpg" alt="Frankfurt" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/frankfurt" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Frankfurt</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Development Pipeline</h1>
          <p className="text-sm text-silver mt-2">{projects.length} projects &middot; Frankfurt student housing pipeline</p>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link href="/innsbruck/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Innsbruck</div>
            </Link>
            <Link href="/munich/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Munich</div>
            </Link>
            <Link href="/passau/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Passau</div>
            </Link>
            <div className="bg-emerald-accent/10 border border-emerald-accent/30 rounded-xl px-5 py-4">
              <div className="text-emerald-accent text-xs font-bold uppercase tracking-wider mb-1">Current</div>
              <div className="text-snow font-bold">Frankfurt</div>
            </div>
          </div>
        </section>

        {/* Nav links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/frankfurt/comparables"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M15 8H1M7 2L1 8l6 6" />
            </svg>
            PBSA Comparables
          </Link>
          <Link href="/frankfurt/universities"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Universities
          </Link>
          <Link href="/frankfurt"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Frankfurt Overview
          </Link>
        </div>
      </main>
    </div>
  );
}
