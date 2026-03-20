"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Rooms",
    photos: [
      { src: "/images/gallery/innsbruck/room-cat-a.jpg", label: "Category A Room" },
      { src: "/images/gallery/innsbruck/room-cat-b.jpg", label: "Category B Room" },
      { src: "/images/gallery/innsbruck/apartment-kitchen.jpg", label: "Apartment with Kitchen" },
    ],
  },
  {
    name: "Kitchen & Bath",
    photos: [
      { src: "/images/gallery/innsbruck/kitchenette.jpg", label: "Kitchenette" },
      { src: "/images/gallery/innsbruck/bathroom.jpg", label: "Bathroom" },
      { src: "/images/gallery/innsbruck/community-kitchen.jpg", label: "Community Kitchen" },
    ],
  },
  {
    name: "Amenities",
    photos: [
      { src: "/images/gallery/innsbruck/gym.jpg", label: "Gym" },
      { src: "/images/gallery/innsbruck/sauna.jpg", label: "Sauna" },
      { src: "/images/gallery/innsbruck/music-room.jpg", label: "Music Room" },
      { src: "/images/gallery/innsbruck/bike-storage.jpg", label: "Bike Storage" },
      { src: "/images/gallery/innsbruck/bike-parking.jpg", label: "Bike Parking" },
    ],
  },
  {
    name: "Building",
    photos: [
      { src: "/images/gallery/innsbruck/exterior.jpg", label: "Exterior" },
      { src: "/images/gallery/innsbruck/outdoor-area.jpg", label: "Outdoor Area" },
    ],
  },
];

export default function InnsbruckGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/innsbruck.jpg" alt="Innsbruck" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/innsbruck" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Innsbruck</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Gallery</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">STUWO Innsbruck</h1>
          <p className="text-sm text-silver mt-1">Premium PBSA — 87 beds, Pradl district</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Category tabs */}
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

        {/* Photo grid */}
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

      {/* Lightbox */}
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
