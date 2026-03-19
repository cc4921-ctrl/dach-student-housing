"use client";
import { useEffect, useRef, useState } from "react";

type MarkerType = "university" | "university-subsidised" | "non-profit" | "private-pbsa" | "premium-pbsa";
type FilterKey = "all" | "universities" | "residences";

interface MapMarker {
  lat: number;
  lng: number;
  type: MarkerType;
  city: string;
  name: string;
  detail: string;
  detail2?: string;
}

const markers: MapMarker[] = [
  // === INNSBRUCK UNIVERSITIES ===
  { lat: 47.2641, lng: 11.3856, type: "university", city: "Innsbruck", name: "University of Innsbruck", detail: "28,000 students · 20% international", detail2: "Full-spectrum research university" },
  { lat: 47.2625, lng: 11.3940, type: "university", city: "Innsbruck", name: "Medical University of Innsbruck", detail: "3,500 students · 20% international", detail2: "Medicine, dentistry, molecular medicine" },
  { lat: 47.2620, lng: 11.3440, type: "university", city: "Innsbruck", name: "MCI | The Entrepreneurial School", detail: "3,400 students · 25% international", detail2: "Business, engineering, tourism" },
  { lat: 47.2590, lng: 11.3480, type: "university", city: "Innsbruck", name: "UMIT TIROL", detail: "1,500 students · 15% international", detail2: "Health informatics, mechatronics" },

  // === INNSBRUCK RESIDENCES ===
  { lat: 47.2665, lng: 11.3780, type: "university-subsidised", city: "Innsbruck", name: "Home4students Höttinger Au 34", detail: "~120 beds · from €324/mo", detail2: "Single rooms €324–€505/mo" },
  { lat: 47.2635, lng: 11.3935, type: "university-subsidised", city: "Innsbruck", name: "Home4students Technikerstraße 7", detail: "~100 beds · from €314/mo", detail2: "Near Technical University" },
  { lat: 47.2600, lng: 11.3960, type: "university-subsidised", city: "Innsbruck", name: "Home4students Euregio-Campus", detail: "~80 beds · €480–€500/mo" },
  { lat: 47.2700, lng: 11.3900, type: "non-profit", city: "Innsbruck", name: "OeAD GreenINN", detail: "~200 beds · €425–€535/mo", detail2: "Passivhaus standard" },
  { lat: 47.2710, lng: 11.4050, type: "non-profit", city: "Innsbruck", name: "OeAD Reichenauer Straße", detail: "~100 beds · from €488/mo" },
  { lat: 47.2720, lng: 11.3880, type: "non-profit", city: "Innsbruck", name: "Studentenheim Saggen", detail: "~60 beds · €380–€450/mo", detail2: "Historic Saggen district" },
  { lat: 47.2730, lng: 11.3860, type: "non-profit", city: "Innsbruck", name: "Studentenhaus Sillgraben", detail: "~50 beds · €380–€420/mo" },
  { lat: 47.2650, lng: 11.3820, type: "non-profit", city: "Innsbruck", name: "Canisianum", detail: "~80 beds · €350–€450/mo" },
  { lat: 47.2680, lng: 11.4120, type: "non-profit", city: "Innsbruck", name: "Studentenheim Reichenau", detail: "~100 beds · €380/mo" },
  { lat: 47.2560, lng: 11.4020, type: "premium-pbsa", city: "Innsbruck", name: "STUWO Innsbruck", detail: "87 beds · €729–€789/mo", detail2: "Cat. A Studio €789, Cat. B €729" },

  // === MUNICH UNIVERSITIES ===
  { lat: 48.1505, lng: 11.5808, type: "university", city: "Munich", name: "LMU München", detail: "52,600 students · 17% international", detail2: "Germany's second-largest university" },
  { lat: 48.1497, lng: 11.5685, type: "university", city: "Munich", name: "TU München (Main)", detail: "51,900 students · 44% international", detail2: "Top-ranked technical university" },
  { lat: 48.2656, lng: 11.6714, type: "university", city: "Munich", name: "TU München (Garching)", detail: "TUM Garching campus", detail2: "Engineering & sciences campus" },
  { lat: 48.1540, lng: 11.5540, type: "university", city: "Munich", name: "Hochschule München", detail: "18,000 students · 15% international", detail2: "Applied sciences" },
  { lat: 48.0800, lng: 11.6380, type: "university", city: "Munich", name: "Universität der Bundeswehr", detail: "3,500 students · 10% international", detail2: "Federal defence university" },
  { lat: 48.1475, lng: 11.5763, type: "university", city: "Munich", name: "Hochschule für Musik und Theater", detail: "1,200 students · 40% international" },

  // === MUNICH RESIDENCES ===
  { lat: 48.1900, lng: 11.5990, type: "university-subsidised", city: "Munich", name: "Studentenstadt Freimann", detail: "~2,500 beds · €280–€504/mo", detail2: "Germany's largest student village" },
  { lat: 48.1950, lng: 11.5730, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Felsennelkenanger", detail: "~800 beds · €280–€455/mo" },
  { lat: 48.1560, lng: 11.5780, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Agnes-/Adelheidstr.", detail: "~450 beds · €354–€371/mo", detail2: "Central location" },
  { lat: 48.1530, lng: 11.5910, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Kaulbachstraße", detail: "~200 beds · €456–€505/mo", detail2: "Near English Garden" },
  { lat: 48.1100, lng: 11.5620, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Chiemgaustraße", detail: "~600 beds · €317–€411/mo" },
  { lat: 48.1980, lng: 11.5800, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Max-Bill-Str.", detail: "~400 beds · €280–€400/mo" },
  { lat: 48.2010, lng: 11.5850, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Heidemannstr.", detail: "~350 beds · €280–€400/mo" },
  { lat: 48.1700, lng: 11.5860, type: "non-profit", city: "Munich", name: "Ludwigskolleg (Erzdiözese)", detail: "170 beds · €280–€500/mo" },
  { lat: 48.1520, lng: 11.5450, type: "non-profit", city: "Munich", name: "Roncalli-Kolleg", detail: "124 beds · €280–€400/mo" },
  { lat: 48.1480, lng: 11.5650, type: "non-profit", city: "Munich", name: "Kolpinghaus Kardinal-Wendel", detail: "~200 beds · €270–€500/mo", detail2: "Near Hauptbahnhof" },
  { lat: 48.1350, lng: 11.5500, type: "private-pbsa", city: "Munich", name: "Campus Viva München V", detail: "~300 beds · €610–€750/mo" },
  { lat: 48.1320, lng: 11.5530, type: "private-pbsa", city: "Munich", name: "Campus Viva München VI", detail: "~280 beds · from €620/mo" },
  { lat: 48.1600, lng: 11.5700, type: "private-pbsa", city: "Munich", name: "Youniq Munich", detail: "~250 beds · from €704/mo" },
  { lat: 48.1420, lng: 11.5350, type: "private-pbsa", city: "Munich", name: "Studio M2", detail: "~400 beds · €560–€845/mo", detail2: "Small/Medium/Large studios" },
  { lat: 48.1510, lng: 11.5555, type: "premium-pbsa", city: "Munich", name: "THE FIZZ Munich", detail: "218 beds · €1,086–€1,919/mo", detail2: "Comfort & Premium studios" },
  { lat: 48.1180, lng: 11.5380, type: "premium-pbsa", city: "Munich", name: "Die Zimmerei", detail: "287 beds · €840–€1,520/mo", detail2: "Sendling, various Bude types" },

  // === PASSAU UNIVERSITIES ===
  { lat: 48.5671, lng: 13.4530, type: "university", city: "Passau", name: "University of Passau", detail: "10,568 students · 18% international", detail2: "Law, business, CS, humanities" },

  // === PASSAU RESIDENCES ===
  { lat: 48.5740, lng: 13.4660, type: "university-subsidised", city: "Passau", name: "Studentenwerk Bräugasse", detail: "95 beds · €260–€550/mo", detail2: "Altstadt location" },
  { lat: 48.5630, lng: 13.4480, type: "university-subsidised", city: "Passau", name: "Studentenwerk Donau-Schwaben-Str.", detail: "242 beds · €260–€550/mo" },
  { lat: 48.5660, lng: 13.4510, type: "university-subsidised", city: "Passau", name: "Studentenwerk Leonhard-Paminger-Str.", detail: "356 beds · €368–€386/mo", detail2: "New build 2025" },
  { lat: 48.5680, lng: 13.4550, type: "university-subsidised", city: "Passau", name: "Studentenwerk Maierhofstraße", detail: "20 beds · €260–€550/mo" },
  { lat: 48.5750, lng: 13.4640, type: "non-profit", city: "Passau", name: "Wohnbauwerk Marienheim", detail: "198 beds · €200–€550/mo", detail2: "City centre, Altstadt" },
  { lat: 48.5600, lng: 13.4350, type: "non-profit", city: "Passau", name: "Wohnbauwerk Haus St. Severin", detail: "160 beds · €200–€290/mo", detail2: "River views, 2km west" },
  { lat: 48.5700, lng: 13.4580, type: "non-profit", city: "Passau", name: "Boni Studentenwohnheim", detail: "165 beds · €250–€400/mo" },
  { lat: 48.5720, lng: 13.4700, type: "private-pbsa", city: "Passau", name: "Vegis St. Nicola / Kapfinger", detail: "209 beds · €349/mo", detail2: "Ensuite studios" },
  { lat: 48.5690, lng: 13.4620, type: "private-pbsa", city: "Passau", name: "River Living Passau", detail: "155 beds · €350–€650/mo" },
  { lat: 48.5650, lng: 13.4500, type: "private-pbsa", city: "Passau", name: "UNILIFE Passau", detail: "45 beds · €350–€600/mo" },
];

const markerColors: Record<MarkerType, string> = {
  "university": "#dc2626",
  "university-subsidised": "#2563eb",
  "non-profit": "#059669",
  "private-pbsa": "#475569",
  "premium-pbsa": "#7c3aed",
};

const markerLabels: Record<MarkerType, string> = {
  "university": "University",
  "university-subsidised": "University Subsidised",
  "non-profit": "Non-Profit",
  "private-pbsa": "Private PBSA",
  "premium-pbsa": "Premium PBSA",
};

const cityViews = {
  all: { lat: 47.8, lng: 12.3, zoom: 7 },
  Innsbruck: { lat: 47.265, lng: 11.39, zoom: 14 },
  Munich: { lat: 48.155, lng: 11.57, zoom: 12 },
  Passau: { lat: 48.568, lng: 13.455, zoom: 14 },
};

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const markersLayer = useRef<unknown>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      setLoaded(true);
    };
    document.body.appendChild(script);
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const L = (window as any).L;

    if (!mapInstance.current) {
      const map = L.map(mapRef.current, { center: [47.8, 12.3], zoom: 7, zoomControl: true });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);
      mapInstance.current = map;
      markersLayer.current = L.layerGroup().addTo(map);
    }

    const layer = markersLayer.current as any;
    layer.clearLayers();

    const filtered = markers.filter(m => {
      if (cityFilter !== "all" && m.city !== cityFilter) return false;
      if (filter === "universities") return m.type === "university";
      if (filter === "residences") return m.type !== "university";
      return true;
    });

    filtered.forEach(m => {
      const isUni = m.type === "university";
      const marker = L.circleMarker([m.lat, m.lng], {
        radius: isUni ? 10 : 7,
        fillColor: markerColors[m.type],
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85,
      });
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:200px">` +
        `<div style="font-weight:700;font-size:14px;margin-bottom:4px">${m.name}</div>` +
        `<div style="font-size:11px;color:#64748b;margin-bottom:2px">${markerLabels[m.type]} · ${m.city}</div>` +
        `<div style="font-size:12px;margin-top:6px">${m.detail}</div>` +
        (m.detail2 ? `<div style="font-size:11px;color:#64748b;margin-top:2px">${m.detail2}</div>` : ``) +
        `</div>`,
        { maxWidth: 280 }
      );
      layer.addLayer(marker);
    });

    if (cityFilter !== "all") {
      const view = cityViews[cityFilter as keyof typeof cityViews];
      (mapInstance.current as any).setView([view.lat, view.lng], view.zoom);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, [loaded, filter, cityFilter]);

  const jumpToCity = (city: string) => {
    setCityFilter(city);
    if (city === "all" && mapInstance.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapInstance.current as any).setView([47.8, 12.3], 7);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Map</h1>
          <p className="text-slate-500 mt-1">All universities and student residences across Innsbruck, Munich &amp; Passau</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex gap-1 mr-4">
            {["all", "Innsbruck", "Munich", "Passau"].map(c => (
              <button key={c} onClick={() => jumpToCity(c)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${cityFilter === c ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                {c === "all" ? "All Cities" : c}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {(["all", "universities", "residences"] as FilterKey[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${filter === f ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                {f === "all" ? "All" : f === "universities" ? "Universities" : "Residences"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden" style={{ height: "65vh" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
          {Object.entries(markerLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: markerColors[type as MarkerType] }} />
              {label}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
