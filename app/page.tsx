"use client";
import Link from "next/link";
import { useState } from "react";

const cities = [
  {
    slug: "innsbruck",
    name: "Innsbruck",
    country: "Austria",
    flag: "🇦🇹",
    students: "28,000+",
    avgRent: "€1,250",
    premiumRange: "€1,850–€4,169",
    universities: 4,
    listings: 89,
    image: "/images/cities/innsbruck.jpg",
    tagline: "Alpine university city with historic charm",
  },
  {
    slug: "munich",
    name: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    students: "148,000+",
    avgRent: "€1,150",
    premiumRange: "€1,350–€3,580",
    universities: 6,
    listings: 338,
    image: "/images/cities/munich.jpg",
    tagline: "Germany's premium student market",
  },
  {
    slug: "passau",
    name: "Passau",
    country: "Germany",
    flag: "🇩🇪",
    students: "10,500+",
    avgRent: "€500",
    premiumRange: "€530–€650",
    universities: 1,
    listings: 70,
    image: "/images/cities/passau.jpg",
    tagline: "Three-river city, emerging PBSA opportunity",
  },
];

export default function Home() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-midnight-light to-slate-deep" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cat-blue/[0.03] blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-emerald-accent" />
              <span className="text-emerald-accent text-xs font-bold tracking-[0.2em] uppercase">Market Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-snow leading-[1.1] tracking-tight">
              Student Housing<br />
              <span className="text-emerald-accent italic">Market</span>
            </h1>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
                <span className="text-xs text-silver font-medium tracking-wide">Live Data &middot; March 2026</span>
              </div>
              <span className="text-xs text-silver/40">459 listings &middot; 3 cities</span>
            </div>
          </div>
        </div>
      </section>

      {/* City cards */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              onMouseEnter={() => setHoveredCity(city.slug)}
              onMouseLeave={() => setHoveredCity(null)}
              className="group relative bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden hover:border-emerald-accent/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-light via-midnight-light/40 to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-midnight/70 backdrop-blur-sm border border-white/[0.08] rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent" />
                  <span className="text-[10px] text-silver-bright font-medium tracking-wide">LIVE</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-snow group-hover:text-emerald-accent transition-colors duration-300">
                      {city.name}
                    </h2>
                    <p className="text-xs text-silver mt-0.5">{city.tagline}</p>
                  </div>
                  <span className="text-2xl mt-0.5">{city.flag}</span>
                </div>

                {/* Key metrics */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-silver/70 uppercase tracking-wider">Median Rent</span>
                    <span className="text-lg font-bold text-snow font-serif">{city.avgRent}</span>
                  </div>
                  <div className="h-px bg-white/[0.04]" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-silver/70 uppercase tracking-wider">Premium</span>
                    <span className="text-sm font-semibold text-cat-purple">{city.premiumRange}</span>
                  </div>
                  <div className="h-px bg-white/[0.04]" />
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div className="text-center">
                      <div className="text-lg font-bold text-snow">{city.listings}</div>
                      <div className="text-[10px] text-silver/60 uppercase tracking-wider mt-0.5">Listings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-snow">{city.universities}</div>
                      <div className="text-[10px] text-silver/60 uppercase tracking-wider mt-0.5">Unis</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-snow">{city.students.replace('+', '')}</div>
                      <div className="text-[10px] text-silver/60 uppercase tracking-wider mt-0.5">Students</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <span className="text-xs font-semibold text-emerald-accent tracking-wide uppercase">Explore market</span>
                  <span className="w-8 h-8 rounded-full bg-emerald-accent/10 flex items-center justify-center text-emerald-accent group-hover:bg-emerald-accent group-hover:text-midnight transition-all duration-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 7h12M8 2l5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xs text-silver/40">Data as of March 2026</span>
          <span className="text-xs text-silver/40">Sources: willhaben.at, ImmobilienScout24, operator websites</span>
        </div>
      </footer>
    </div>
  );
}
