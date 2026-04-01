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
    name: "Sandwirt Areal — Young & Student Living",
    status: "Planning",
    developer: "IIG (Innsbrucker Immobiliengesellschaft)",
    beds: "~500",
    completion: "Fall 2028",
    investment: "€59M",
    type: "Mixed-use",
    notes: "Mixed-use: living, learning, working, gastronomy. 113 subsidized student residence places + 168 subsidized units for students/apprentices/starters. Fitness, laundry, study areas, youth center. EU-wide architecture competition (45 entries).",
    source: "",
  },
  {
    name: "Schlachthofblock — Comprehensive Renovation & New Build",
    status: "Under Construction",
    developer: "IIG",
    beds: "72 student + ~115 subsidized rental",
    completion: "End 2028",
    investment: "€70M (total)",
    type: "Renovation + New Build",
    notes: "10,000 sqm site. 211→292 apartments. 72 student beds in 25 shared units (corner buildings). Heritage Gründerzeit facade restored. Elevator additions, courtyard balconies, 3-group kindergarten.",
    source: "",
  },
  {
    name: "Ulfiswiese",
    status: "Planning",
    developer: "TBD",
    beds: "~200",
    completion: "TBD",
    investment: "TBD",
    type: "New Build",
    notes: "One of 14 sites identified in the 2019 city student housing study. Limited publicly available details as of March 2026.",
    source: "",
  },
  {
    name: "Campus Frau-Hitt — Expansion",
    status: "Under Construction",
    developer: "IIG / Akademikerhilfe",
    beds: "52 new (125 total)",
    completion: "Est. 2026",
    investment: "TBD",
    type: "Expansion",
    notes: "Expanding from 32 to 125 beds. 3 components: retained 1911 main building (32), renovated addition (41 micro-apartments ~14–15 sqm), new passive-house building (52). L-shaped design, courtyard garden.",
    source: "",
  },
  {
    name: "Andechsstraße 70",
    status: "Under Construction",
    developer: "TBD",
    beds: "~96",
    completion: "Est. 2026",
    investment: "TBD",
    type: "New Build",
    notes: "Identified in the 2019 city student housing study as a priority site.",
    source: "",
  },
  {
    name: "GreenINN (Karmelitergasse)",
    status: "Completed",
    developer: "IIG / OeAD Student Housing",
    beds: "173",
    completion: "Sep 2025",
    investment: "~€14M",
    type: "New Build",
    notes: "133 one- and two-room apartments, 6 stories (~3,100 sqm). Passive House Plus, timber-hybrid construction, PV panels, groundwater heat pump. Communal kitchens per floor, ground-floor retail.",
    source: "",
  },
  {
    name: "EUREGIO-Campus (Schlachthofblock corner buildings)",
    status: "Completed",
    developer: "home4students",
    beds: "72",
    completion: "Oct 2024",
    investment: "N/A (renovation)",
    type: "Renovation",
    notes: "25 furnished shared-living units (2–4 bedroom). Focus on Tyrol / South Tyrol / Trentino students. Renovated 2022, operated since Oct 2024.",
    source: "",
  },
  {
    name: "Pradler Saggen (NHT Building 1 — 11-story tower)",
    status: "Completed",
    developer: "Neue Heimat Tirol (NHT)",
    beds: "~96",
    completion: "2023",
    investment: "N/A",
    type: "New Build",
    notes: "38 two- and three-room apartments. Communal kitchen on ground floor. District heating + PV. Part of NHT's 550-apartment multiphase plan.",
    source: "",
  },
];

export default function InnsbruckPipelinePage() {
  const [filter, setFilter] = useState<Status>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const statuses: Status[] = ["All", "Completed", "Under Construction", "Planning", "Operational"];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.status === filter);

  const totalBeds = projects.reduce((sum, p) => {
    const match = p.beds.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <img src="/images/banners/innsbruck.jpg" alt="Innsbruck" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/innsbruck" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Innsbruck</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Pipeline</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Development Pipeline</h1>
          <p className="text-sm text-silver mt-2">{projects.length} projects &middot; ~{totalBeds.toLocaleString()}+ beds &middot; Innsbruck student housing pipeline</p>
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
                  {/* Status indicator bar */}
                  <div className="lg:w-2 flex-shrink-0 bg-gradient-to-b from-emerald-accent/30 to-transparent hidden lg:block" />

                  {/* Content */}
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

                      {/* Completion badge */}
                      <div className="flex-shrink-0 bg-emerald-accent/10 border border-emerald-accent/20 rounded-xl px-4 py-2.5 text-center">
                        <div className="text-[10px] text-emerald-accent/70 uppercase tracking-wider mb-0.5">Est. Completion</div>
                        <div className="text-xl font-bold text-emerald-accent font-serif">{p.completion}</div>
                      </div>
                    </div>

                    {/* Details grid */}
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

                {/* Expanded details */}
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
            <Link href="/frankfurt/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Frankfurt</div>
            </Link>
            <div className="bg-emerald-accent/10 border border-emerald-accent/30 rounded-xl px-5 py-4">
              <div className="text-emerald-accent text-xs font-bold uppercase tracking-wider mb-1">Current</div>
              <div className="text-snow font-bold">Innsbruck</div>
            </div>
            <Link href="/munich/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Munich</div>
            </Link>
            <Link href="/passau/pipeline" className="group bg-midnight-light border border-white/[0.06] hover:border-emerald-accent/30 rounded-xl px-5 py-4 transition-all duration-300">
              <div className="text-silver/50 text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-emerald-accent/70 transition-colors">Pipeline</div>
              <div className="text-silver group-hover:text-snow font-bold transition-colors">Passau</div>
            </Link>
          </div>
        </section>

        {/* Nav links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/innsbruck/comparables"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M15 8H1M7 2L1 8l6 6" />
            </svg>
            PBSA Comparables
          </Link>
          <Link href="/innsbruck/universities"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Universities
          </Link>
          <Link href="/innsbruck"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-8 py-4 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Innsbruck Overview
          </Link>
        </div>
      </main>
    </div>
  );
}
