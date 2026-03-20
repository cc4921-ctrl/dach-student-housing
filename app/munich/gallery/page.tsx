"use client";
import { useState } from "react";
import Link from "next/link";

interface PhotoItem { src: string; label: string; }
interface GalleryCategory { name: string; photos: PhotoItem[]; }
interface ResidenceGallery { name: string; category: string; categories: GalleryCategory[]; }

const residences: ResidenceGallery[] = [
  {
    name: "Studentenstadt Freimann",
    category: "University Subsidised",
    categories: [
      {
        name: "Buildings",
        photos: [
          { src: "/images/residences/munich/freimann/building-highrise.jpg", label: "High-Rise Tower" },
          { src: "/images/residences/munich/freimann/building-brutalist.jpg", label: "Mid-Rise Block" },
          { src: "/images/residences/munich/freimann/building-renovated.jpg", label: "Renovated Wing" },
        ],
      },
      {
        name: "Rooms",
        photos: [
          { src: "/images/residences/munich/freimann/room-single-1.jpg", label: "Single Room" },
          { src: "/images/residences/munich/freimann/room-desk.jpg", label: "Desk & Workspace" },
          { src: "/images/residences/munich/freimann/room-furnished.jpg", label: "Furnished Room" },
          { src: "/images/residences/munich/freimann/room-single-2.jpg", label: "Single Room (Variant)" },
        ],
      },
      {
        name: "Common Areas",
        photos: [
          { src: "/images/residences/munich/freimann/common-sink-area.jpg", label: "Shared Washroom" },
        ],
      },
    ],
  },
  {
    name: "Felsennelkenanger",
    category: "University Subsidised",
    categories: [
      {
        name: "Buildings",
        photos: [
          { src: "/images/residences/munich/felsennelkenanger/building-garden.jpg", label: "Garden & Playground" },
          { src: "/images/residences/munich/felsennelkenanger/building-facade.jpg", label: "Red Facade Detail" },
        ],
      },
      {
        name: "Rooms",
        photos: [
          { src: "/images/residences/munich/felsennelkenanger/room-desk-view.jpg", label: "Room with City View" },
          { src: "/images/residences/munich/felsennelkenanger/room-wardrobe.jpg", label: "Room with Wardrobe" },
          { src: "/images/residences/munich/felsennelkenanger/room-balcony.jpg", label: "Room with Balcony" },
          { src: "/images/residences/munich/felsennelkenanger/room-partial-apt.jpg", label: "Partial Apartment" },
          { src: "/images/residences/munich/felsennelkenanger/floor-plan.png", label: "Floor Plan" },
        ],
      },
    ],
  },
  {
    name: "THE FIZZ Munich",
    category: "Premium PBSA",
    categories: [
      {
        name: "Rooms",
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
          { src: "/images/gallery/munich/business-xxl.webp", label: "Business XXL" },
          { src: "/images/gallery/munich/business-l.webp", label: "Business L" },
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
    ],
  },
  {
    name: "Die Zimmerei",
    category: "Premium PBSA",
    categories: [
      {
        name: "Buildings",
        photos: [
          { src: "/images/residences/munich/die-zimmerei/building-aerial.jpg", label: "Aerial View" },
        ],
      },
      {
        name: "Rooms",
        photos: [
          { src: "/images/residences/munich/die-zimmerei/room-basic.jpg", label: "Basic Bude" },
          { src: "/images/residences/munich/die-zimmerei/room-desk.jpg", label: "Workspace" },
          { src: "/images/residences/munich/die-zimmerei/room-bed.jpg", label: "Bedroom" },
        ],
      },
    ],
  },
  {
    name: "Studio M2",
    category: "Private PBSA",
    categories: [
      {
        name: "Buildings",
        photos: [
          { src: "/images/residences/munich/studio-m2-1.jpg", label: "Building Exterior" },
          { src: "/images/residences/munich/studio-m2-2.jpg", label: "Location" },
        ],
      },
    ],
  },
];

const catBadge: Record<string, { bg: string; text: string }> = {
  "University Subsidised": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue" },
  "Premium PBSA": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple" },
  "Private PBSA": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber" },
};

export default function MunichGallery() {
  const [activeResidence, setActiveResidence] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const res = residences[activeResidence];
  const allPhotos = res.categories.flatMap(c => c.photos);
  const catPhotos = res.categories[activeCategory]?.photos ?? [];
  const badge = catBadge[res.category] || { bg: "bg-white/[0.06]", text: "text-silver" };

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-56 overflow-hidden">
        <img src="/images/banners/munich.jpg" alt="Munich" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/munich" className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase hover:text-emerald-glow transition-colors">Munich</Link>
            <span className="text-silver/40 text-xs">/</span>
            <span className="text-silver text-[10px] font-bold tracking-[0.2em] uppercase">Gallery</span>
          </div>
          <h1 className="text-3xl font-serif text-snow tracking-tight">Residence Gallery</h1>
          <p className="text-sm text-silver mt-1">{residences.length} residences &middot; {residences.reduce((sum, r) => sum + r.categories.reduce((s, c) => s + c.photos.length, 0), 0)} photos</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Residence selector */}
        <div className="mb-8">
          <p className="text-[10px] text-silver/50 uppercase tracking-[0.15em] font-bold mb-3">Select Residence</p>
          <div className="flex flex-wrap gap-2">
            {residences.map((r, i) => (
              <button key={r.name} onClick={() => { setActiveResidence(i); setActiveCategory(0); }}
                className={`px-4 py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                  activeResidence === i
                    ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent"
                    : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
                }`}>
                {r.name}
                <span className="ml-1.5 text-[11px] opacity-50">{r.categories.reduce((s, c) => s + c.photos.length, 0)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Residence info bar */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-snow">{res.name}</h2>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.bg} ${badge.text}`}>
            {res.category}
          </span>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {res.categories.map((cat, i) => (
            <button key={cat.name} onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                activeCategory === i
                  ? "bg-white/10 border-white/20 text-snow"
                  : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
              }`}>
              {cat.name}
              <span className="ml-1.5 text-[11px] opacity-60">{cat.photos.length}</span>
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catPhotos.map((photo) => (
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
