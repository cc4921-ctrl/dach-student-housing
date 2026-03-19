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
    <nav className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <span className="bg-accent text-white w-7 h-7 rounded-md flex items-center justify-center text-xs font-black">D</span>
            DACH Student Housing
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {cities.map(c => (
              <div key={c.slug} className="relative group">
                <Link
                  href={`/${c.slug}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(`/${c.slug}`) ? "bg-primary-light text-white" : "text-silver hover:text-white hover:bg-primary-light"
                  }`}
                >
                  {c.label}
                </Link>
                <div className="absolute left-0 top-full pt-1 hidden group-hover:block">
                  <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[160px]">
                    <Link href={`/${c.slug}`} className="block px-4 py-2 text-sm text-navy hover:bg-accent-bg">Overview</Link>
                    <Link href={`/${c.slug}/comparables`} className="block px-4 py-2 text-sm text-navy hover:bg-accent-bg">PBSA Comparables</Link>
                    <Link href={`/${c.slug}/universities`} className="block px-4 py-2 text-sm text-navy hover:bg-accent-bg">Universities</Link>
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/map"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/map") ? "bg-primary-light text-white" : "text-silver hover:text-white hover:bg-primary-light"
              }`}
            >
              Map
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-silver">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-1 border-t border-primary-light pt-2">
            {cities.map(c => (
              <div key={c.slug}>
                <Link href={`/${c.slug}`} onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive(`/${c.slug}`) ? "bg-primary-light text-white" : "text-silver"}`}>
                  {c.label}
                </Link>
                <div className="pl-6 space-y-1">
                  <Link href={`/${c.slug}/comparables`} onClick={() => setOpen(false)} className="block px-3 py-1.5 text-xs text-navy-light hover:text-white">PBSA Comparables</Link>
                  <Link href={`/${c.slug}/universities`} onClick={() => setOpen(false)} className="block px-3 py-1.5 text-xs text-navy-light hover:text-white">Universities</Link>
                </div>
              </div>
            ))}
            <Link href="/map" onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive("/map") ? "bg-primary-light text-white" : "text-silver"}`}>
              Map
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
