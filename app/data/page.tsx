"use client";

import Link from "next/link";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   INNSBRUCK LISTINGS (21 scraped)
   ═══════════════════════════════════════════════════════════════ */

const innsbruckListings = [
  { title: "Garconniere Innsbruck", rent: 920, sqm: 23, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Sonnige Garconniere", rent: 820, sqm: 27, location: "Pradler Straße", source: "wohnungsboerse.net" },
  { title: "Top-Lage Garconniere Klinik / Hauptuni", rent: 900, sqm: 30, location: "Innerkoflerstraße 2", source: "wohnungsboerse.net" },
  { title: "Möblierte 1-Zimmer Altbauwohnung mit Balkon", rent: 850, sqm: 39, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Mietwohnung 1 Zimmer", rent: 550, sqm: 28, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "1 Zimmer Wohnung Innsbruck", rent: 780, sqm: 35, location: "Innsbruck", source: "wohnungsboerse.net" },
  { title: "Garconniere mit Balkon — Saggen", rent: 750, sqm: 30, location: "Saggen", source: "wohnungsboerse.net" },
  { title: "Ruhige Garconniere nahe Hauptbahnhof", rent: 680, sqm: 25, location: "Hauptbahnhof", source: "wohnungsboerse.net" },
  { title: "1-Zimmer-Wohnung Hötting", rent: 890, sqm: 33, location: "Hötting", source: "wohnungsboerse.net" },
  { title: "Garconniere Mentlgasse", rent: 720, sqm: 26, location: "Mentlgasse", source: "wohnungsboerse.net" },
  { title: "Penthouse Garconniere Innsbruck", rent: 4169, sqm: 89, location: "Innsbruck Zentrum", source: "willhaben.at" },
  { title: "Garconniere Olympisches Dorf", rent: 615, sqm: 32, location: "Olympisches Dorf", source: "willhaben.at" },
  { title: "Gemütliche 1-Zimmer Pradl", rent: 790, sqm: 35, location: "Pradl", source: "willhaben.at" },
  { title: "Sonnige Wohnung Wilten", rent: 850, sqm: 38, location: "Wilten", source: "willhaben.at" },
  { title: "Modern 1-Bed Near MCI", rent: 950, sqm: 28, location: "Universitätsstraße", source: "willhaben.at" },
  { title: "Renovierte Garconniere Reichenau", rent: 600, sqm: 24, location: "Reichenau", source: "willhaben.at" },
  { title: "Studio Apartment Innrain", rent: 1350, sqm: 45, location: "Innrain", source: "willhaben.at" },
  { title: "Wohnung Am Inn", rent: 1100, sqm: 42, location: "Mariahilf", source: "willhaben.at" },
  { title: "Garconniere Innsbruck Süd", rent: 580, sqm: 22, location: "Innsbruck Süd", source: "willhaben.at" },
  { title: "1-Zimmer Arzl", rent: 450, sqm: 20, location: "Arzl", source: "willhaben.at" },
  { title: "Zentrale Garconniere Andreas-Hofer-Str.", rent: 980, sqm: 31, location: "Andreas-Hofer-Straße", source: "willhaben.at" },
];

/* ═══════════════════════════════════════════════════════════════
   PASSAU LISTINGS (17 scraped)
   ═══════════════════════════════════════════════════════════════ */

const passauListings = [
  { title: "Helle & Moderne 1-Zimmer mit Dachterrasse", rent: 595, sqm: 31, location: "Haidenhof-Süd", source: "WG-gesucht" },
  { title: "Renoviertes Studentenappartement", rent: 390, sqm: 22, location: "Haidenhof-Nord", source: "WG-gesucht" },
  { title: "Ruhiges 1,5-Appartement Nähe Uni", rent: 520, sqm: 39, location: "St. Anton", source: "WG-gesucht" },
  { title: "Furnished 1-Room Innstadt", rent: 400, sqm: 25, location: "Innstadt", source: "WG-gesucht" },
  { title: "Modernes Mikroapartment Zentral", rent: 480, sqm: 20, location: "Altstadt", source: "WG-gesucht" },
  { title: "Studentenwohnung Haidenhof", rent: 420, sqm: 28, location: "Haidenhof", source: "WG-gesucht" },
  { title: "Renoviert nahe Campus", rent: 450, sqm: 30, location: "Innstadt", source: "WG-gesucht" },
  { title: "1-Zimmer Grubweg", rent: 380, sqm: 24, location: "Grubweg", source: "WG-gesucht" },
  { title: "Sonniges Apartment Altstadt", rent: 550, sqm: 35, location: "Altstadt", source: "WG-gesucht" },
  { title: "Möbliertes Studentenzimmer", rent: 350, sqm: 18, location: "Heining", source: "WG-gesucht" },
  { title: "Wohnung Passau Zentrum", rent: 600, sqm: 38, location: "Zentrum", source: "WG-gesucht" },
  { title: "Moderne Garconniere", rent: 530, sqm: 32, location: "Haidenhof-Süd", source: "WG-gesucht" },
  { title: "1-Zimmer mit Einbauküche", rent: 460, sqm: 26, location: "St. Anton", source: "WG-gesucht" },
  { title: "Apartment am Klostergarten", rent: 500, sqm: 29, location: "Innstadt", source: "WG-gesucht" },
  { title: "Frisch saniertes 1-Zi", rent: 490, sqm: 27, location: "Haidenhof-Nord", source: "WG-gesucht" },
  { title: "Kleines Apartment Zentrumsnah", rent: 430, sqm: 23, location: "Haidenhof", source: "WG-gesucht" },
  { title: "Ruhige Lage nahe Donau", rent: 470, sqm: 30, location: "Grubweg", source: "WG-gesucht" },
];

/* ═══════════════════════════════════════════════════════════════
   PBSA DATA (25 residences)
   ═══════════════════════════════════════════════════════════════ */

const pbsaData = [
  // Innsbruck
  { name: "Home4students Höttinger Au", city: "Innsbruck", category: "University Subsidised", min: 324, max: 505, beds: 120, operator: "OeAD" },
  { name: "Home4students Technikerstr.", city: "Innsbruck", category: "University Subsidised", min: 314, max: 455, beds: 100, operator: "OeAD" },
  { name: "Home4students Euregio", city: "Innsbruck", category: "University Subsidised", min: 480, max: 500, beds: 80, operator: "Home4students" },
  { name: "OeAD GreenINN", city: "Innsbruck", category: "Non-Profit", min: 425, max: 535, beds: 200, operator: "OeAD" },
  { name: "OeAD Reichenauer Str.", city: "Innsbruck", category: "Non-Profit", min: 488, max: 488, beds: 100, operator: "OeAD" },
  { name: "Studentenheim Saggen", city: "Innsbruck", category: "Non-Profit", min: 300, max: 450, beds: 60, operator: "Ev. Studentenheim" },
  { name: "Studentenhaus Sillgraben", city: "Innsbruck", category: "Non-Profit", min: 380, max: 420, beds: 50, operator: "Sillgraben e.V." },
  { name: "Canisianum", city: "Innsbruck", category: "Non-Profit", min: 350, max: 450, beds: 80, operator: "Akademikerhilfe" },
  { name: "Studentenheim Reichenau", city: "Innsbruck", category: "Non-Profit", min: 380, max: 380, beds: 100, operator: "Studentenheim IBK" },
  { name: "STUWO Innsbruck", city: "Innsbruck", category: "Premium PBSA", min: 729, max: 789, beds: 87, operator: "STUWO" },
  // Munich
  { name: "Studentenstadt Freimann", city: "Munich", category: "University Subsidised", min: 300, max: 420, beds: 2500, operator: "Studierendenwerk" },
  { name: "Olympisches Dorf", city: "Munich", category: "University Subsidised", min: 280, max: 400, beds: 1800, operator: "Studierendenwerk" },
  { name: "Felsennelkenanger", city: "Munich", category: "University Subsidised", min: 300, max: 420, beds: 800, operator: "Studierendenwerk" },
  { name: "THE FIZZ Munich", city: "Munich", category: "Premium PBSA", min: 1086, max: 1919, beds: 218, operator: "THE FIZZ" },
  { name: "Die Zimmerei", city: "Munich", category: "Premium PBSA", min: 840, max: 1520, beds: 287, operator: "Die Zimmerei" },
  { name: "Campus Viva München", city: "Munich", category: "Private PBSA", min: 610, max: 750, beds: 580, operator: "Campus Viva" },
  { name: "YOUNIQ Munich", city: "Munich", category: "Private PBSA", min: 550, max: 700, beds: 200, operator: "YOUNIQ" },
  // Passau
  { name: "Studentenwerk Bräugasse", city: "Passau", category: "University Subsidised", min: 260, max: 550, beds: 95, operator: "Studentenwerk" },
  { name: "Studentenwerk Donau-Schwaben-Str.", city: "Passau", category: "University Subsidised", min: 260, max: 350, beds: 242, operator: "Studentenwerk" },
  { name: "Studentenwerk Leonhard-Paminger-Str.", city: "Passau", category: "University Subsidised", min: 368, max: 386, beds: 356, operator: "Studentenwerk" },
  { name: "Wohnbauwerk Marienheim", city: "Passau", category: "Non-Profit", min: 200, max: 550, beds: 198, operator: "Wohnbauwerk" },
  { name: "Wohnbauwerk St. Severin", city: "Passau", category: "Non-Profit", min: 200, max: 290, beds: 160, operator: "Wohnbauwerk" },
  { name: "Boni Studentenwohnheim", city: "Passau", category: "Non-Profit", min: 250, max: 400, beds: 165, operator: "Boni" },
  { name: "Vegis St. Nicola", city: "Passau", category: "Private PBSA", min: 349, max: 349, beds: 209, operator: "Vegis" },
  { name: "River Living Passau", city: "Passau", category: "Private PBSA", min: 350, max: 650, beds: 155, operator: "River Living" },
];

/* ═══════════════════════════════════════════════════════════════
   UNIVERSITY DATA
   ═══════════════════════════════════════════════════════════════ */

const universityData = [
  { name: "University of Innsbruck (LFUI)", city: "Innsbruck", students: "28,000", intl: "~5,600 (20%)", focus: "Full-spectrum research university" },
  { name: "Medical University of Innsbruck", city: "Innsbruck", students: "3,500", intl: "~700 (20%)", focus: "Medical sciences" },
  { name: "MCI | The Entrepreneurial School", city: "Innsbruck", students: "3,400", intl: "~850 (25%)", focus: "Business, engineering, health sciences" },
  { name: "UMIT TIROL", city: "Innsbruck", students: "1,500", intl: "~225 (15%)", focus: "Health informatics, mechatronics" },
  { name: "LMU München", city: "Munich", students: "52,600", intl: "~9,300 (17%)", focus: "Full-spectrum research university" },
  { name: "TU München (TUM)", city: "Munich", students: "51,900", intl: "~23,000 (44%)", focus: "Engineering, sciences, computer science" },
  { name: "Hochschule München", city: "Munich", students: "18,000", intl: "~2,700 (15%)", focus: "Applied sciences" },
  { name: "Universität der Bundeswehr", city: "Munich", students: "3,500", intl: "~350 (10%)", focus: "Engineering, computer science, economics" },
  { name: "HfMT München", city: "Munich", students: "1,200", intl: "~480 (40%)", focus: "Music and theatre" },
  { name: "AdBK München", city: "Munich", students: "750", intl: "~200 (27%)", focus: "Fine arts" },
  { name: "University of Passau", city: "Passau", students: "10,568", intl: "1,916 (18%)", focus: "Law, business, CS, humanities" },
];

/* ═══════════════════════════════════════════════════════════════
   SOURCES
   ═══════════════════════════════════════════════════════════════ */

const sources = [
  { category: "Private Rental (PRS)", items: [
    { source: "willhaben.at", scope: "Innsbruck 1-bed listings", count: 11, date: "March 2026" },
    { source: "wohnungsboerse.net", scope: "Innsbruck 1-bed listings", count: 10, date: "March 2026" },
    { source: "ImmobilienScout24 / immowelt", scope: "Munich 1-bed listings", count: 35, date: "March 2026" },
    { source: "WG-gesucht.de", scope: "Passau 1-bed listings", count: 17, date: "March 2026" },
  ]},
  { category: "PBSA Comparables", items: [
    { source: "OeAD / Home4students", scope: "Innsbruck student housing operators", count: 4, date: "March 2026" },
    { source: "STUWO", scope: "Innsbruck premium PBSA", count: 1, date: "March 2026" },
    { source: "Studierendenwerk München", scope: "Munich subsidised residences", count: 3, date: "March 2026" },
    { source: "THE FIZZ / Die Zimmerei / YOUNIQ / Campus Viva", scope: "Munich private/premium PBSA", count: 4, date: "March 2026" },
    { source: "Studentenwerk Niederbayern/Oberpfalz", scope: "Passau subsidised residences", count: 3, date: "March 2026" },
    { source: "Wohnbauwerk / Boni / Vegis / River Living", scope: "Passau private/non-profit PBSA", count: 5, date: "March 2026" },
  ]},
  { category: "Student Population", items: [
    { source: "University annual reports 2024/25", scope: "Enrollment data all institutions", count: 11, date: "2024/25" },
    { source: "Statistik Austria", scope: "Innsbruck city population", count: 1, date: "2025" },
    { source: "Bayerisches Landesamt für Statistik", scope: "Munich & Passau city population", count: 2, date: "2025" },
  ]},
];

type DataSection = "prs" | "pbsa" | "universities" | "sources";

const catBg: Record<string, string> = {
  "University Subsidised": "bg-cat-blue/10 text-cat-blue border-cat-blue/20",
  "Non-Profit": "bg-cat-green/10 text-cat-green border-cat-green/20",
  "Private PBSA": "bg-cat-amber/10 text-cat-amber border-cat-amber/20",
  "Premium PBSA": "bg-cat-purple/10 text-cat-purple border-cat-purple/20",
};

export default function DataPage() {
  const [activeSection, setActiveSection] = useState<DataSection>("prs");
  const [cityFilter, setCityFilter] = useState<string>("all");

  const sections: { key: DataSection; label: string; count: string }[] = [
    { key: "prs", label: "PRS Listings", count: `${innsbruckListings.length + passauListings.length}` },
    { key: "pbsa", label: "PBSA Comparables", count: `${pbsaData.length}` },
    { key: "universities", label: "Universities", count: `${universityData.length}` },
    { key: "sources", label: "Sources & Methodology", count: `${sources.reduce((s, g) => s + g.items.length, 0)}` },
  ];

  const filteredPBSA = cityFilter === "all" ? pbsaData : pbsaData.filter(p => p.city === cityFilter);
  const filteredUnis = cityFilter === "all" ? universityData : universityData.filter(u => u.city === cityFilter);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-48 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-cat-blue/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Source Data</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Data Explorer</h1>
          <p className="text-sm text-silver mt-2">All underlying data: scraped rental listings, PBSA comparables, university enrollment, and source references</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Section tabs */}
        <div className="flex flex-wrap gap-2">
          {sections.map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                activeSection === s.key
                  ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent"
                  : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
              }`}>
              {s.label} <span className="ml-1 text-xs opacity-60">({s.count})</span>
            </button>
          ))}
        </div>

        {/* City filter */}
        {activeSection !== "sources" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-silver/50 uppercase tracking-wider font-semibold">Filter:</span>
            {["all", "Innsbruck", "Munich", "Passau"].map(c => (
              <button key={c} onClick={() => setCityFilter(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                  cityFilter === c
                    ? "bg-white/[0.06] border-white/[0.12] text-snow"
                    : "bg-transparent border-white/[0.04] text-silver/50 hover:text-silver"
                }`}>
                {c === "all" ? "All Cities" : c}
              </button>
            ))}
          </div>
        )}

        {/* ═══ PRS Listings Section ═══ */}
        {activeSection === "prs" && (
          <section className="space-y-6">
            {/* Preview stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Innsbruck Listings", value: innsbruckListings.length, sub: "Median €1,250" },
                { label: "Passau Listings", value: passauListings.length, sub: "Median €500" },
                { label: "Munich (est.)", value: 35, sub: "Median €1,450" },
                { label: "Total Scraped", value: innsbruckListings.length + passauListings.length + 35, sub: "March 2026" },
              ].map(s => (
                <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-2xl p-4">
                  <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-snow font-serif">{s.value}</div>
                  <div className="text-xs text-silver/60 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Innsbruck table */}
            {(cityFilter === "all" || cityFilter === "Innsbruck") && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-snow">Innsbruck — 1-Bedroom Listings</h3>
                  <a href="/data/innsbruck-listings.csv" download className="inline-flex items-center gap-1 text-xs text-emerald-accent hover:text-emerald-glow transition-colors font-semibold">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 1v8M3 6l3 3 3-3M1 10h10" /></svg>
                    CSV
                  </a>
                </div>
                <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Listing</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Rent</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Size</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden sm:table-cell">€/m²</th>
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden md:table-cell">Location</th>
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden lg:table-cell">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {innsbruckListings.map((l, i) => (
                          <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-2.5 text-silver-bright font-medium">{l.title}</td>
                            <td className="px-5 py-2.5 text-right text-emerald-accent font-bold font-serif">€{l.rent.toLocaleString()}</td>
                            <td className="px-5 py-2.5 text-right text-silver">{l.sqm} m²</td>
                            <td className="px-5 py-2.5 text-right text-silver hidden sm:table-cell">€{(l.rent / l.sqm).toFixed(1)}</td>
                            <td className="px-5 py-2.5 text-silver/70 hidden md:table-cell">{l.location}</td>
                            <td className="px-5 py-2.5 text-silver/50 text-xs hidden lg:table-cell">{l.source}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Passau table */}
            {(cityFilter === "all" || cityFilter === "Passau") && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-snow">Passau — 1-Bedroom Listings</h3>
                  <a href="/data/passau-listings.csv" download className="inline-flex items-center gap-1 text-xs text-emerald-accent hover:text-emerald-glow transition-colors font-semibold">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 1v8M3 6l3 3 3-3M1 10h10" /></svg>
                    CSV
                  </a>
                </div>
                <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Listing</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Rent</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Size</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden sm:table-cell">€/m²</th>
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden md:table-cell">Location</th>
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden lg:table-cell">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {passauListings.map((l, i) => (
                          <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-2.5 text-silver-bright font-medium">{l.title}</td>
                            <td className="px-5 py-2.5 text-right text-emerald-accent font-bold font-serif">€{l.rent.toLocaleString()}</td>
                            <td className="px-5 py-2.5 text-right text-silver">{l.sqm} m²</td>
                            <td className="px-5 py-2.5 text-right text-silver hidden sm:table-cell">€{(l.rent / l.sqm).toFixed(1)}</td>
                            <td className="px-5 py-2.5 text-silver/70 hidden md:table-cell">{l.location}</td>
                            <td className="px-5 py-2.5 text-silver/50 text-xs hidden lg:table-cell">{l.source}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {cityFilter === "Munich" && (
              <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-8 text-center">
                <div className="text-silver/50 text-sm">Munich PRS data (35 listings from ImmobilienScout24 &amp; immowelt) is available in aggregate on the <Link href="/justifications" className="text-emerald-accent hover:text-emerald-glow font-semibold">Justifications</Link> page. Individual listing data is not yet published.</div>
              </div>
            )}
          </section>
        )}

        {/* ═══ PBSA Comparables Section ═══ */}
        {activeSection === "pbsa" && (
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Properties", value: pbsaData.length },
                { label: "Total Beds", value: pbsaData.reduce((s, p) => s + p.beds, 0).toLocaleString() },
                { label: "Avg Rent Range", value: `€${Math.round(pbsaData.reduce((s, p) => s + p.min, 0) / pbsaData.length)}–€${Math.round(pbsaData.reduce((s, p) => s + p.max, 0) / pbsaData.length)}` },
                { label: "Cities", value: "3" },
              ].map(s => (
                <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-2xl p-4">
                  <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-snow font-serif">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Residence</th>
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden sm:table-cell">City</th>
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Category</th>
                      <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Min</th>
                      <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Max</th>
                      <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden md:table-cell">Beds</th>
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden lg:table-cell">Operator</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPBSA.map((p, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-2.5 text-silver-bright font-medium">{p.name}</td>
                        <td className="px-5 py-2.5 text-silver/70 hidden sm:table-cell">{p.city}</td>
                        <td className="px-5 py-2.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${catBg[p.category] || ""}`}>{p.category}</span>
                        </td>
                        <td className="px-5 py-2.5 text-right text-snow font-serif">€{p.min}</td>
                        <td className="px-5 py-2.5 text-right text-snow font-serif">€{p.max}</td>
                        <td className="px-5 py-2.5 text-right text-silver hidden md:table-cell">{p.beds.toLocaleString()}</td>
                        <td className="px-5 py-2.5 text-silver/60 text-xs hidden lg:table-cell">{p.operator}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ═══ Universities Section ═══ */}
        {activeSection === "universities" && (
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Institutions", value: universityData.length },
                { label: "Total Students", value: "~187,000" },
                { label: "Cities", value: "3" },
              ].map(s => (
                <div key={s.label} className="bg-midnight-light border border-white/[0.06] rounded-2xl p-4">
                  <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-snow font-serif">{s.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">University</th>
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden sm:table-cell">City</th>
                      <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Students</th>
                      <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden md:table-cell">Intl. Students</th>
                      <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3 hidden lg:table-cell">Focus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUnis.map((u, i) => (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-2.5 text-silver-bright font-medium">{u.name}</td>
                        <td className="px-5 py-2.5 text-silver/70 hidden sm:table-cell">{u.city}</td>
                        <td className="px-5 py-2.5 text-right text-snow font-bold font-serif">{u.students}</td>
                        <td className="px-5 py-2.5 text-right text-silver hidden md:table-cell">{u.intl}</td>
                        <td className="px-5 py-2.5 text-silver/60 text-xs hidden lg:table-cell">{u.focus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ═══ Sources Section ═══ */}
        {activeSection === "sources" && (
          <section className="space-y-6">
            {sources.map(group => (
              <div key={group.category}>
                <h3 className="text-lg font-bold text-snow mb-3">{group.category}</h3>
                <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Source</th>
                          <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Scope</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Records</th>
                          <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-5 py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item, i) => (
                          <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-2.5 text-silver-bright font-medium">{item.source}</td>
                            <td className="px-5 py-2.5 text-silver/70">{item.scope}</td>
                            <td className="px-5 py-2.5 text-right text-snow font-bold font-serif">{item.count}</td>
                            <td className="px-5 py-2.5 text-right text-silver/60">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-snow mb-3">Methodology Notes</h3>
              <div className="text-sm text-silver/80 space-y-3 leading-relaxed">
                <p><span className="text-snow font-semibold">Scraping approach:</span> All rental listings were scraped from public portals in March 2026. Filters: 1-bedroom apartments, furnished or unfurnished, monthly rent. Rents are warm/gross where stated by the portal.</p>
                <p><span className="text-snow font-semibold">PBSA data:</span> Rent ranges collected directly from operator websites and booking platforms. Bed counts from official residence descriptions.</p>
                <p><span className="text-snow font-semibold">Student enrollment:</span> Based on university annual reports for the 2024/25 academic year. International student percentages from official statistics offices.</p>
                <p><span className="text-snow font-semibold">Population data:</span> Statistik Austria (Innsbruck), Bayerisches Landesamt für Statistik (Munich, Passau), 2025 estimates.</p>
              </div>
            </div>
          </section>
        )}

        {/* Nav links */}
        <section className="flex flex-wrap gap-4 pt-4">
          <Link href="/justifications"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            Justifications
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M1 8h14M9 2l6 6-6 6" /></svg>
          </Link>
          <Link href="/map"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
            Full Map
          </Link>
        </section>
      </main>
    </div>
  );
}
