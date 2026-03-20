"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Rooms",
    photos: [
      { src: "https://www.stuwo.at/wp-content/uploads/2020/07/STUWO-Innsbruck-Kategorie-A-2-1030x674.jpg", label: "Category A Room" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Zimmer_Kat.B_4-1030x686.jpg", label: "Category B Room" },
      { src: "https://www.stuwo.at/wp-content/uploads/2020/07/STUWO-Innsbruck-Apartment-mit-K%C3%BCche-1030x687.jpg", label: "Apartment with Kitchen" },
    ],
  },
  {
    name: "Kitchen & Bath",
    photos: [
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Vorraum_mit_K%C3%BCche_5-1030x686.jpg", label: "Kitchenette" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Badezimmer_1-1030x686.jpg", label: "Bathroom" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Gemeinschaftsk%C3%BCche_2-1030x686.jpg", label: "Community Kitchen" },
    ],
  },
  {
    name: "Amenities",
    photos: [
      { src: "https://www.stuwo.at/wp-content/uploads/2020/07/STUWO-Innsbruck-Gym-1030x687.jpg", label: "Gym" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Sauna_3-1030x686.jpg", label: "Sauna" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Musikraum_3-1030x686.jpg", label: "Music Room" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Fahrradabstellraum_1-1030x686.jpg", label: "Bike Storage" },
      { src: "https://www.stuwo.at/wp-content/uploads/2020/07/STUWO-Innsbruck-Fahrradanbindung-1030x687.jpg", label: "Bike Parking" },
    ],
  },
  {
    name: "Building",
    photos: [
      { src: "https://www.stuwo.at/wp-content/uploads/2024/07/H23_Aussenansicht%C2%AEchristian_flatscher26_Small-1030x709.jpg", label: "Exterior" },
      { src: "https://www.stuwo.at/wp-content/uploads/2019/07/H23_Au%C3%9Fenbereich_4-1030x686.jpg", label: "Outdoor Area" },
    ],
  },
];

export default function InnsbruckGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=1200&q=80"
          alt="Innsbruck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-6">
          <Link href="/innsbruck" className="text-[#90a1b9] text-sm hover:text-white">&larr; Innsbruck</Link>
          <h1 className="text-2xl font-bold text-white mt-1">STUWO Innsbruck</h1>
          <p className="text-[#90a1b9] text-sm">Residence Gallery &middot; {categories.reduce((a, c) => a + c.photos.length, 0)} photos</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                active === i
                  ? "bg-[#009966] text-white"
                  : "bg-white text-[#314158] border border-[#e2e8f0] hover:bg-[#f1f5f9]"
              }`}
            >
              {cat.name}
              <span className="ml-1.5 text-xs opacity-70">{cat.photos.length}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories[active].photos.map((photo) => (
            <button
              key={photo.label}
              onClick={() => setLightbox(photo.src)}
              className="group relative aspect-[3/2] rounded-xl overflow-hidden bg-[#e2e8f0] cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {photo.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white text-3xl font-light hover:text-[#00bc7d]">&times;</button>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh]" rounded-lg />
        </div>
      )}
    </div>
  
  
