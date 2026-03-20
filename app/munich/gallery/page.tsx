"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Single Apartments",
    photos: [
      { src: "https://www.the-fizz.com/wp-content/uploads/MGP-2021-05-the-fizz-student-ap2_single-L-web-18-600x690.jpg.webp", label: "Single L Apartment" },
      { src: "https://www.the-fizz.com/wp-content/uploads/MGP-2021-05-the-fizz-student-ap1_single-XXL-web-19-1024x683.jpg.webp", label: "Single XXL Living Area" },
      { src: "https://www.the-fizz.com/wp-content/uploads/MGP-2021-05-the-fizz-student-ap1_single-XXL-web-9-1024x683.jpg.webp", label: "Single XXL Workspace" },
      { src: "https://www.the-fizz.com/wp-content/uploads/THEFIZZMunich_Apartment-Single-XS_7J0A4746-1024x683.jpg.webp", label: "Single XS Apartment" },
      { src: "https://www.the-fizz.com/wp-content/uploads/THEFIZZMunich_Apartment_Bathroom_7J0A4674_1-1024x683.jpg.webp", label: "Bathroom" },
    ],
  },
  {
    name: "Flex Apartments",
    photos: [
      { src: "https://www.the-fizz.com/wp-content/uploads/3-THEFIZZMunich-Business-Terrasse-600x690.jpg.webp", label: "Flex Terrace" },
      { src: "https://www.the-fizz.com/wp-content/uploads/MGP-2021-05-the-fizz-business-ap1_XXL-web-11-1024x683.jpg.webp", label: "Business XXL Apartment" },
      { src: "https://www.the-fizz.com/wp-content/uploads/MGP-2021-05-the-fizz-business-ap2_L-web-23-683x1024.jpg.webp", label: "Business L Apartment" },
      { src: "https://www.the-fizz.com/wp-content/uploads/the-fizz-muenchen-business-AP1-1-1024x683.jpg.webp", label: "Business AP1" },
      { src: "https://www.the-fizz.com/wp-content/uploads/MGP-2021-05-the-fizz-student-ap1_single-XXL-web-14-1024x683.jpg.webp", label: "Student XXL Interior" },
    ],
  },
  {
    name: "Building & Facilities",
    photos: [
      { src: "https://www.the-fizz.com/wp-content/uploads/facade-munich.jpg.webp", label: "Building Facade" },
      { src: "https://www.the-fizz.com/wp-content/uploads/RooftopTerraceMunich-13-cut.jpg.webp", label: "Rooftop Terrace" },
      { src: "https://www.the-fizz.com/wp-content/uploads/RooftopTerraceMunich-7-768x576.jpg.webp", label: "Rooftop View" },
      { src: "https://www.the-fizz.com/wp-content/uploads/the-fizz-muenchen-gamingroom-3-768x512.jpg.webp", label: "Gaming Room" },
      { src: "https://www.the-fizz.com/wp-content/uploads/the-fizz-muenchen-kitchen-4-460x307.jpg.webp", label: "Community Kitchen" },
      { src: "https://www.the-fizz.com/wp-content/uploads/munich-outdoor-community-460x259.jpg.webp", label: "Outdoor Community Area" },
      { src: "https://www.the-fizz.com/wp-content/uploads/facility4-1.jpg.webp", label: "Facilities" },
    ],
  },
];

export default function MunichGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1595867818082-083862f3d630?w=1200&q=80"
          alt="Munich"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-6">
          <Link href="/munich" className="text-[#90a1b9] text-sm hover:text-white">&larr; Munich</Link>
          <h1 className="text-2xl font-bold text-white mt-1">THE FIZZ Munich</h1>
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
  
  
