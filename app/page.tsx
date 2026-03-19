"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const cities = [
  {
    slug: "innsbruck",
    name: "Innsbruck",
    country: "Austria",
    flag: "\u{1F1E6}\u{1F1F9}",
    students: "28,000+",
    avgRent: "\u20AC1,380",
    premiumRange: "\u20AC1,850\u2013\u20AC4,169",
    universities: 4,
    status: "Live Data",
    photo: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=800&q=80",
    caption: "The Golden Roof & Alpine skyline",
  },
  {
    slug: "munich",
    name: "Munich",
    country: "Germany",
    flag: "\u{1F1E9}\u{1F1EA}",
    students: "148,000+",
    avgRent: "\u20AC1,150",
    premiumRange: "\u20AC1,350\u2013\u20AC3,580",
    universities: 6,
    status: "Live Data",
    photo: "https://images.unsplash.com/photo-1595867818082-083862f3d630?w=800&q=80",
    caption: "Marienplatz & the New Town Hall",
  },
  {
    slug: "passau",
    name: "Passau",
    country: "Germany",
    flag: "\u{1F1E9}\u{1F1EA}",
    students: "10,500+",
    avgRent: "\u20AC490",
    premiumRange: "\u20AC530\u2013\u20AC650",
    universities: 1,
    status: "Live Data",
    photo: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    caption: "Three-river city at the Danube",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(i => (i + 1) % cities.length), []);
  const prev = useCallback(() => setCurrent(i => (i - 1 + cities.length) % cities.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const city = cities[current];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Carousel */}
      <div
        className="relative w-full h-[420px] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {cities.map((c, i) => (
          <div
            key={c.slug}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={c.photo}
              alt={c.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex flex-col justify-end max-w-6xl mx-auto px-6 pb-10">
          <p className="text-[#00bc7d] text-sm font-semibold tracking-wider uppercase mb-2">DACH Student Housing Market</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{city.name}</h1>
          <p className="text-[#90a1b9] text-lg mb-6">{city.caption}</p>

          <div className="flex flex-wrap gap-6 text-white text-sm">
            <div><span className="text-[#90a1b9]">Students</span> <span className="font-semibold ml-1">{city.students}</span></div>
            <div><span className="text-[#90a1b9]">Median Rent</span> <span className="font-semibold ml-1">{city.avgRent}/mo</span></div>
            <div><span className="text-[#90a1b9]">Premium</span> <span className="font-semibold text-[#00bc7d] ml-1">{city.premiumRange}</span></div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#0f172a]/60 hover:bg-[#0f172a]/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#0f172a]/60 hover:bg-[#0f172a]/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {cities.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-[#00bc7d] w-6" : "bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* City Cards */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-xl font-bold text-[#0f172a] mb-1">Explore Markets</h2>
        <p className="text-[#62748e] text-sm mb-8">Market data and rent estimation for Austrian & German cities</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden hover:shadow-lg hover:border-[#009966]/40 transition-all group"
            >
              <div className="h-40 overflow-hidden">
                <img src={c.photo} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#009966] transition-colors">
                    {c.flag} {c.name}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#dbfce7] text-[#009966]">
                    {c.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#62748e]">Students</span>
                    <span className="font-semibold text-[#314158]">{c.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62748e]">Median Rent</span>
                    <span className="font-semibold text-[#314158]">{c.avgRent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62748e]">Premium Range</span>
                    <span className="font-semibold text-[#007595]">{c.premiumRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#62748e]">Universities</span>
                    <span className="font-semibold text-[#314158]">{c.universities}</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e2e8f0]">
                  <span className="text-sm text-[#009966] font-medium flex items-center gap-1">
                    City Overview <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-8 pb-8 text-center text-xs text-[#90a1b9]">
        Data as of March 2026
      </footer>
    </div>
  );
}
