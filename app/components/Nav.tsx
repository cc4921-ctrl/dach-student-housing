"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const cities = [
  { slug: "innsbruck", label: "Innsbruck" },
  { slug: "munich", label: "Munich" },
  { slug: "passau", label: "Passau" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="bg-midnight/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative w-8 h-8 rounded-lg bg-emerald-accent flex items-center justify-center text-midnight font-bold text-sm tracking-tight overflow-hidden">
              D
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-300" />
            </span>
            <span className="text-sm font-bold text-snow tracking-wide uppercase">
              DACH<span className="text-silver font-normal ml-1.5 normal-case tracking-normal hidden sm:inline">Student Housing</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {cities.map(c => (
              <div key={c.slug} className="relative group">
                <Link
                  href={`/${c.slug}`}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 ${
                    isActive(`/${c.slug}`)
                      ? "text-emerald-accent bg-emerald-accent/10"
                      : "text-silver hover:text-snow hover:bg-white/[0.04]"
                  }`}
                >
                  {c.label}
                </Link>
                <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                  <div className="bg-midnight-light border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 py-2 min-w-[180px] backdrop-blur-xl">
                    <Link href={`/${c.slug}`} className="block px-4 py-2.5 text-[13px] text-silver hover:text-snow hover:bg-white/[0.04] transition-colors">
                      Overview
                    </Link>
                    <Link href={`/${c.slug}/comparables`} className="block px-4 py-2.5 text-[13px] text-silver hover:text-snow hover:bg-white/[0.04] transition-colors">
                      PBSA Comparables
                    </Link>
                    <Link href={`/${c.slug}/universities`} className="block px-4 py-2.5 text-[13px] text-silver hover:text-snow hover:bg-white/[0.04] transition-colors">
                      Universities
                    </Link>
                    {c.slug !== "passau" && (
                      <Link href={`/${c.slug}/gallery`} className="block px-4 py-2.5 text-[13px] text-silver hover:text-snow hover:bg-white/[0.04] transition-colors">
                        Gallery
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/map"
              className={`px-4 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 ${
                isActive("/map")
                  ? "text-emerald-accent bg-emerald-accent/10"
                  : "text-silver hover:text-snow hover:bg-white/[0.04]"
              }`}
            >
              Map
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-silver hover:text-snow transition-colors" aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-5 pt-2 space-y-1 border-t border-white/[0.06] animate-[fadeIn_0.15s_ease-out]">
            {cities.map(c => (
              <div key={c.slug}>
                <Link href={`/${c.slug}`} onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive(`/${c.slug}`) ? "text-emerald-accent bg-emerald-accent/10" : "text-silver"}`}>
                  {c.label}
                </Link>
                <div className="pl-6 space-y-0.5">
                  <Link href={`/${c.slug}/comparables`} onClick={() => setOpen(false)} className="block px-4 py-2 text-xs text-silver/70 hover:text-snow transition-colors">PBSA Comparables</Link>
                  <Link href={`/${c.slug}/universities`} onClick={() => setOpen(false)} className="block px-4 py-2 text-xs text-silver/70 hover:text-snow transition-colors">Universities</Link>
                  {c.slug !== "passau" && <Link href={`/${c.slug}/gallery`} onClick={() => setOpen(false)} className="block px-4 py-2 text-xs text-silver/70 hover:text-snow transition-colors">Gallery</Link>}
                </div>
              </div>
            ))}
            <Link href="/map" onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive("/map") ? "text-emerald-accent bg-emerald-accent/10" : "text-silver"}`}>
              Map
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
