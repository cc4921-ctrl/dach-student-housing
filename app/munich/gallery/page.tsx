"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Single Apartments",
    photos: [
      { src: "/images/gallery/munich/single-l.webp", label: "Single L Apartment" },
      { src: "/images/gallery/munich/single-xxl-living.webp", label: "Single XXL Living Area" },
      { src: "/images/gallery/munich/single-xxl-workspace.webp", label: "Single XXL Workspace" },
      { src: "/images/gallery/munich/single-xs.webp", label: "Single XS Apartment" },
      { src: "/images/gallery/munich/bathroom.webp", label: "Bathroom" },
    ],
  },
  {
    name: "Flex Apartments",
    photos: [
      { src: "/images/gallery/munich/flex-terrace.webp", label: "Flex Terrace" },
      { src: "/images/gallery/munich/business-xxl.webp", label: "Business XXL Apartment" },
      { src: "/images/gallery/munich/business-l.webp", label: "Business L Apartment" },
      { src: "/images/gallery/munich/business-ap1.webp", label: "Business AP1" },
      { src: "/images/gallery/munich/student-xxl-interior.webp", label: "Student XXL Interior" },
    ],
  },
  {
    name: "Building & Facilities",
    photos: [
      { src: "/images/gallery/munich/facade.webp", label: "Building Facade" },
      { src: "/images/gallery/munich/rooftop-terrace.webp", label: "Rooftop Terrace" },
      { src: "/images/gallery/munich/rooftop-view.webp", label: "Rooftop View" },
      { src: "/images/gallery/munich/gaming-room.webp", label: "Gaming Room" },
      { src: "/images/gallery/munich/community-kitchen.webp", label: "Community Kitchen" },
      { src: "/images/gallery/munich/outdoor-community.webp", label: "Outdoor Community Area" },
      { src: "/images/gallery/munich/facilities.webp", label: "Facilities" },
    ],
  },
];

export default function MunichGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-midnight">
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/munich" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Munich</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Gallery</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">THE FIZZ Munich</h1>
          <p className="text-sm text-silver mt-1">Premium PBSA — 218 beds, Munich center</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button key={cat.name} onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                active === i
                  ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent"
                  : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
              }`}>
              {cat.name}
              <span className="ml-1.5 text-[11px] opacity-60">{cat.photos.length}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories[active].photos.map((photo) => (
            <button key={photo.src} onClick={() => setLightbox(photo.src)}
              className="group relative aspect-[4/3] bg-midnight-surface rounded-xl overflow-hidden border border-white/[0.04] hover:border-emerald-accent/20 transition-all duration-300">
              <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-sm font-medium text-snow">{photo.label}</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-midnight/95 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-snow hover:bg-white/20 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
