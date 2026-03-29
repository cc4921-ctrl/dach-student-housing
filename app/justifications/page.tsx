"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  CartesianGrid,
} from "recharts";

/* ═══════════════════════════════════════════════════════════════
   DATA — all three cities
   ═══════════════════════════════════════════════════════════════ */

interface PBSAComp {
  name: string; city: string; category: string; min: number; max: number;
  beds: number; operator: string; address: string; lat: number; lng: number;
}

const pbsaComps: PBSAComp[] = [
  // ── Innsbruck ──
  { name: "Home4students Höttinger Au", city: "Innsbruck", category: "University Subsidised", min: 324, max: 505, beds: 120, operator: "OeAD", address: "Höttinger Au 34, 6020 Innsbruck", lat: 47.26647, lng: 11.38342 },
  { name: "Home4students Technikerstr.", city: "Innsbruck", category: "University Subsidised", min: 314, max: 455, beds: 100, operator: "OeAD", address: "Technikerstraße 7, 6020 Innsbruck", lat: 47.26440, lng: 11.35006 },
  { name: "Home4students Euregio", city: "Innsbruck", category: "University Subsidised", min: 480, max: 500, beds: 80, operator: "Home4students", address: "Erzherzog-Eugen-Str. 39, 6020 Innsbruck", lat: 47.26199, lng: 11.38268 },
  { name: "OeAD GreenINN", city: "Innsbruck", category: "Non-Profit", min: 425, max: 535, beds: 200, operator: "OeAD", address: "Fürstenweg, 6020 Innsbruck", lat: 47.26406, lng: 11.37806 },
  { name: "OeAD Reichenauer Str.", city: "Innsbruck", category: "Non-Profit", min: 488, max: 488, beds: 100, operator: "OeAD", address: "Reichenauer Straße, 6020 Innsbruck", lat: 47.27083, lng: 11.41295 },
  { name: "Studentenheim Saggen", city: "Innsbruck", category: "Non-Profit", min: 300, max: 450, beds: 60, operator: "Ev. Studentenheim", address: "Gänsbacherstraße 4, 6020 Innsbruck", lat: 47.27479, lng: 11.40203 },
  { name: "Studentenhaus Sillgraben", city: "Innsbruck", category: "Non-Profit", min: 380, max: 420, beds: 50, operator: "Sillgraben e.V.", address: "Rennweg 34, 6020 Innsbruck", lat: 47.27838, lng: 11.40280 },
  { name: "Canisianum", city: "Innsbruck", category: "Non-Profit", min: 350, max: 450, beds: 80, operator: "Akademikerhilfe", address: "Tschurtschenthalerstraße 7, 6020 Innsbruck", lat: 47.27457, lng: 11.39893 },
  { name: "Studentenheim Reichenau", city: "Innsbruck", category: "Non-Profit", min: 380, max: 380, beds: 100, operator: "Studentenheim IBK", address: "Reichenauerstr. 147, 6020 Innsbruck", lat: 47.27100, lng: 11.41400 },
  { name: "STUWO Innsbruck", city: "Innsbruck", category: "Premium PBSA", min: 729, max: 789, beds: 87, operator: "STUWO", address: "Kranebitter Allee 30, 6020 Innsbruck", lat: 47.26457, lng: 11.36577 },
  // ── Munich ──
  { name: "Studentenstadt Freimann", city: "Munich", category: "University Subsidised", min: 300, max: 420, beds: 2500, operator: "Studierendenwerk", address: "Christoph-Probst-Str. 10, 80805 München", lat: 48.18441, lng: 11.61004 },
  { name: "Olympisches Dorf", city: "Munich", category: "University Subsidised", min: 280, max: 400, beds: 1800, operator: "Studierendenwerk", address: "Helene-Mayer-Ring 9, 80809 München", lat: 48.18013, lng: 11.55276 },
  { name: "Felsennelkenanger", city: "Munich", category: "University Subsidised", min: 300, max: 420, beds: 800, operator: "Studierendenwerk", address: "Felsennelkenanger 7–21, 80937 München", lat: 48.20967, lng: 11.56404 },
  { name: "THE FIZZ Munich", city: "Munich", category: "Premium PBSA", min: 1086, max: 1919, beds: 218, operator: "THE FIZZ", address: "Hanebergstraße 2, 80637 München", lat: 48.16267, lng: 11.53716 },
  { name: "Die Zimmerei", city: "Munich", category: "Premium PBSA", min: 840, max: 1520, beds: 287, operator: "Die Zimmerei", address: "Sendling, 81369 München", lat: 48.11252, lng: 11.54948 },
  { name: "Campus Viva München", city: "Munich", category: "Private PBSA", min: 610, max: 750, beds: 580, operator: "Campus Viva", address: "South Munich, 81379 München", lat: 48.09394, lng: 11.52957 },
  { name: "YOUNIQ Munich", city: "Munich", category: "Private PBSA", min: 550, max: 700, beds: 200, operator: "YOUNIQ", address: "Schleißheimer Str. 323, 80809 München", lat: 48.18663, lng: 11.56583 },
  // ── Passau ──
  { name: "Studentenwerk Bräugasse", city: "Passau", category: "University Subsidised", min: 260, max: 550, beds: 95, operator: "Studentenwerk", address: "Bräugasse 11–15, 94032 Passau", lat: 48.57477, lng: 13.47213 },
  { name: "Studentenwerk Donau-Schwaben-Str.", city: "Passau", category: "University Subsidised", min: 260, max: 350, beds: 242, operator: "Studentenwerk", address: "Donau-Schwaben-Str. 14–24, 94036 Passau", lat: 48.56400, lng: 13.41163 },
  { name: "Studentenwerk Leonhard-Paminger-Str.", city: "Passau", category: "University Subsidised", min: 368, max: 386, beds: 356, operator: "Studentenwerk", address: "Leonhard-Paminger-Str., 94032 Passau", lat: 48.56535, lng: 13.43874 },
  { name: "Wohnbauwerk Marienheim", city: "Passau", category: "Non-Profit", min: 200, max: 550, beds: 198, operator: "Wohnbauwerk", address: "Altstadt, 94032 Passau", lat: 48.57396, lng: 13.46925 },
  { name: "Wohnbauwerk St. Severin", city: "Passau", category: "Non-Profit", min: 200, max: 290, beds: 160, operator: "Wohnbauwerk", address: "Schönleitnerweg, 94032 Passau", lat: 48.56036, lng: 13.43001 },
  { name: "Boni Studentenwohnheim", city: "Passau", category: "Non-Profit", min: 250, max: 400, beds: 165, operator: "Boni", address: "Holzheimerstraße, 94032 Passau", lat: 48.57131, lng: 13.43265 },
  { name: "Vegis St. Nicola", city: "Passau", category: "Private PBSA", min: 349, max: 349, beds: 209, operator: "Vegis", address: "St. Nicola, 94032 Passau", lat: 48.57129, lng: 13.45297 },
  { name: "River Living Passau", city: "Passau", category: "Private PBSA", min: 350, max: 650, beds: 155, operator: "River Living", address: "Spitalhofstraße 30, 94032 Passau", lat: 48.57168, lng: 13.44152 },
];

/* Stonehill target / reference properties — CORRECT ADDRESSES */
interface TargetProperty {
  name: string; city: string; address: string; lat: number; lng: number; detail: string;
}

const targetProperties: TargetProperty[] = [
  { name: "Höttinger Au (Target)", city: "Innsbruck", address: "Höttinger Au / Bachlechnerstraße, 6020 Innsbruck, Austria", lat: 47.26647, lng: 11.38342, detail: "Adjacent to Home4students — prime university corridor" },
  { name: "Hafen (Target)", city: "Innsbruck", address: "Areal \"Hafen\", Innrain area, 6020 Innsbruck, Austria", lat: 47.26200, lng: 11.40500, detail: "Emerging student quarter near Inn river & campus — area designation" },
  { name: "Ungererstraße (Target)", city: "Munich", address: "Ungererstraße 71, 80805 Munich (Schwabing), Germany", lat: 48.17100, lng: 11.58850, detail: "Schwabing premium micro-living — near Studentenstadt Freimann & LMU" },
  { name: "Haitzingerstraße (Target)", city: "Passau", address: "Haitzingerstraße 4, 94032 Passau, Germany", lat: 48.57250, lng: 13.44800, detail: "Central Passau location — walking distance to University of Passau" },
];

/* University locations per city */
interface University {
  name: string; city: string; address: string; lat: number; lng: number;
  students: string; shortName: string;
}

const universities: University[] = [
  // ── Innsbruck ──
  { name: "University of Innsbruck (LFUI)", city: "Innsbruck", address: "Innrain 52, 6020 Innsbruck, Austria", lat: 47.26380, lng: 11.38470, students: "28,000", shortName: "Uni Innsbruck" },
  { name: "Medical University of Innsbruck", city: "Innsbruck", address: "Christoph-Probst-Platz, Innrain 52, 6020 Innsbruck, Austria", lat: 47.26350, lng: 11.38800, students: "3,500", shortName: "Med Uni IBK" },
  { name: "MCI | The Entrepreneurial School", city: "Innsbruck", address: "Universitätsstraße 15, 6020 Innsbruck, Austria", lat: 47.26440, lng: 11.39250, students: "3,400", shortName: "MCI" },
  { name: "UMIT TIROL", city: "Innsbruck", address: "Eduard-Wallnöfer-Zentrum 1, 6060 Hall in Tirol, Austria", lat: 47.28900, lng: 11.50500, students: "1,500", shortName: "UMIT" },
  // ── Munich ──
  { name: "Ludwig-Maximilians-Universität (LMU)", city: "Munich", address: "Geschwister-Scholl-Platz 1, 80539 München, Germany", lat: 48.15060, lng: 11.58020, students: "52,600", shortName: "LMU" },
  { name: "Technical University of Munich (TUM)", city: "Munich", address: "Arcisstraße 21, 80333 München, Germany", lat: 48.14870, lng: 11.56870, students: "51,900", shortName: "TUM" },
  { name: "Hochschule München (HM)", city: "Munich", address: "Lothstraße 34, 80335 München, Germany", lat: 48.15410, lng: 11.55360, students: "18,000", shortName: "HM" },
  { name: "Universität der Bundeswehr", city: "Munich", address: "Werner-Heisenberg-Weg 39, 85579 Neubiberg, Germany", lat: 48.08060, lng: 11.63720, students: "3,500", shortName: "UniBwM" },
  { name: "Hochschule für Musik und Theater", city: "Munich", address: "Arcisstraße 12, 80333 München, Germany", lat: 48.14960, lng: 11.57020, students: "1,200", shortName: "HMTM" },
  { name: "Akademie der Bildenden Künste", city: "Munich", address: "Akademiestraße 2, 80799 München, Germany", lat: 48.15450, lng: 11.58040, students: "750", shortName: "AdBK" },
  // ── Passau ──
  { name: "University of Passau", city: "Passau", address: "Innstraße 41, 94032 Passau, Germany", lat: 48.56680, lng: 13.45180, students: "10,568", shortName: "Uni Passau" },
];

/* PRS benchmarks per city */
const prsBenchmarks: Record<string, { median: number; mean: number; q25: number; q75: number; n: number; sources: string }> = {
  Innsbruck: { median: 1380, mean: 1467, q25: 900, q75: 1710, n: 179, sources: "willhaben.at & ImmobilienScout24" },
  Munich: { median: 1290, mean: 1416, q25: 950, q75: 1700, n: 2832, sources: "wg-gesucht.de & ImmobilienScout24" },
  Passau: { median: 550, mean: 682, q25: 430, q75: 800, n: 276, sources: "WG-gesucht.de & ImmobilienScout24" },
};

/* Demand metrics per city */
const demandByCity: Record<string, { students: string; population: string; ratio: string; pbsaBeds: string; coverage: string; bedGap: string }> = {
  Innsbruck: { students: "~35,000", population: "~130,000", ratio: "~27%", pbsaBeds: "~977", coverage: "~2.8%", bedGap: ">6,000" },
  Munich: { students: "~130,000", population: "~1,580,000", ratio: "~8%", pbsaBeds: "~12,000", coverage: "~9.2%", bedGap: ">14,000" },
  Passau: { students: "~10,600", population: "~54,000", ratio: "~20%", pbsaBeds: "~1,895", coverage: "~17.9%", bedGap: "~230" },
};

const cityList = ["Innsbruck", "Munich", "Passau"] as const;

const catColors: Record<string, string> = {
  "University Subsidised": "#3b82f6",
  "Non-Profit": "#10b981",
  "Private PBSA": "#f59e0b",
  "Premium PBSA": "#8b5cf6",
};

const catBgColors: Record<string, { bg: string; text: string }> = {
  "University Subsidised": { bg: "bg-cat-blue/10 border-cat-blue/20", text: "text-cat-blue" },
  "Non-Profit": { bg: "bg-cat-green/10 border-cat-green/20", text: "text-cat-green" },
  "Private PBSA": { bg: "bg-cat-amber/10 border-cat-amber/20", text: "text-cat-amber" },
  "Premium PBSA": { bg: "bg-cat-purple/10 border-cat-purple/20", text: "text-cat-purple" },
};

/* ═══════════════════════════════════════════════════════════════
   COMPUTED
   ═══════════════════════════════════════════════════════════════ */

function cityComps(city: string) { return pbsaComps.filter(c => c.city === city); }

function cityAvgByCategory(city: string) {
  const groups: Record<string, number[]> = {};
  cityComps(city).forEach(c => {
    if (!groups[c.category]) groups[c.category] = [];
    groups[c.category].push((c.min + c.max) / 2);
  });
  return Object.entries(groups).map(([cat, vals]) => ({
    category: cat,
    avg: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
    count: vals.length,
  }));
}

function cityComparisonData(city: string) {
  const prs = prsBenchmarks[city];
  return [
    ...cityAvgByCategory(city).map(d => ({ name: d.category, value: d.avg, type: "PBSA" })),
    { name: "PRS Median", value: prs.median, type: "PRS" },
  ];
}

function cityDiscountData(city: string) {
  const prs = prsBenchmarks[city];
  return cityComps(city).map(c => {
    const mid = (c.min + c.max) / 2;
    const discount = Math.round((1 - mid / prs.median) * 100);
    return { ...c, midpoint: mid, discount };
  }).sort((a, b) => b.discount - a.discount);
}

/* ═══════════════════════════════════════════════════════════════
   MAP COMPONENT — with university markers & travel radii
   ═══════════════════════════════════════════════════════════════ */

function PropertyMap({ city, darkMode }: { city: string | "all"; darkMode: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    if (document.querySelector('link[href*="leaflet"]')) { setLoaded(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.id = "just-map-style";
    style.textContent = `
      .just-map.map-dark .leaflet-popup-content-wrapper { background: #131b2e !important; color: #f1f5f9 !important; border-radius: 12px !important; border: 1px solid rgba(255,255,255,0.06) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }
      .just-map.map-dark .leaflet-popup-tip { background: #131b2e !important; }
      .just-map.map-dark .leaflet-popup-close-button { color: #94a3b8 !important; }
      .just-map.map-dark .leaflet-popup-close-button:hover { color: #00bc7d !important; }
      .just-map.map-dark .leaflet-control-zoom a { background: #131b2e !important; color: #f1f5f9 !important; border-color: rgba(255,255,255,0.06) !important; }
      .just-map.map-dark .leaflet-control-zoom a:hover { background: #1a2540 !important; color: #00bc7d !important; }
      .just-map.map-dark .leaflet-control-attribution { background: rgba(12,18,32,0.8) !important; color: #64748b !important; font-size: 10px !important; }
      .just-map.map-dark .leaflet-control-attribution a { color: #94a3b8 !important; }
      .just-map.map-light .leaflet-popup-content-wrapper { background: #ffffff !important; color: #1e293b !important; border-radius: 12px !important; border: 1px solid rgba(0,0,0,0.08) !important; box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important; }
      .just-map.map-light .leaflet-popup-tip { background: #ffffff !important; }
      .just-map.map-light .leaflet-popup-close-button { color: #64748b !important; }
      .just-map.map-light .leaflet-popup-close-button:hover { color: #00bc7d !important; }
      .just-map.map-light .leaflet-control-zoom a { background: #ffffff !important; color: #1e293b !important; border-color: rgba(0,0,0,0.1) !important; }
      .just-map.map-light .leaflet-control-zoom a:hover { background: #f1f5f9 !important; color: #00bc7d !important; }
      .just-map.map-light .leaflet-control-attribution { background: rgba(255,255,255,0.9) !important; color: #64748b !important; font-size: 10px !important; }
      .just-map.map-light .leaflet-control-attribution a { color: #475569 !important; }
    `;
    document.head.appendChild(style);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const L = (window as any).L;

    const views: Record<string, [number, number, number]> = {
      all: [47.8, 12.3, 7],
      Innsbruck: [47.267, 11.388, 14],
      Munich: [48.155, 11.57, 12],
      Passau: [48.568, 13.445, 14],
    };

    if (mapInstance.current) {
      (mapInstance.current as any).remove();
      mapInstance.current = null;
    }

    const [lat, lng, zoom] = views[city] || views.all;
    const map = L.map(mapRef.current, { center: [lat, lng], zoom, zoomControl: true, scrollWheelZoom: false });
    const tileUrl = darkMode
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;
    const layer = L.layerGroup().addTo(map);

    // PBSA comparables
    const comps = city === "all" ? pbsaComps : pbsaComps.filter(c => c.city === city);
    const borderColor = darkMode ? "#0c1220" : "#ffffff";
    comps.forEach(m => {
      const color = catColors[m.category] || "#009966";
      const marker = L.circleMarker([m.lat, m.lng], {
        radius: 7, fillColor: color, color: borderColor, weight: 2, opacity: 1, fillOpacity: 0.85,
      });
      const popTitle = darkMode ? "#f1f5f9" : "#1e293b";
      const popBody = darkMode ? "#cbd5e1" : "#475569";
      const popMuted = darkMode ? "#64748b" : "#94a3b8";
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:200px">` +
        `<div style="font-weight:700;font-size:13px;color:${popTitle}">${m.name}</div>` +
        `<div style="font-size:10px;color:#00bc7d;margin:3px 0;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">${m.category} · ${m.city}</div>` +
        `<div style="font-size:12px;color:${popBody}">€${m.min}–€${m.max}/mo · ${m.beds} beds</div>` +
        `<div style="font-size:11px;color:${popMuted};margin-top:2px">${m.address}</div>` +
        `</div>`, { maxWidth: 280 }
      );
      layer.addLayer(marker);
    });

    const popTitle = darkMode ? "#f1f5f9" : "#1e293b";
    const popBody = darkMode ? "#cbd5e1" : "#475569";
    const popMuted = darkMode ? "#64748b" : "#94a3b8";

    // Stonehill targets
    const targets = city === "all" ? targetProperties : targetProperties.filter(t => t.city === city);
    targets.forEach(t => {
      const marker = L.circleMarker([t.lat, t.lng], {
        radius: 10, fillColor: "#ef4444", color: darkMode ? "#ffffff" : "#ffffff", weight: 3, opacity: 1, fillOpacity: 0.9,
      });
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:200px">` +
        `<div style="font-weight:700;font-size:13px;color:${popTitle}">${t.name}</div>` +
        `<div style="font-size:10px;color:#ef4444;margin:3px 0;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">STONEHILL TARGET · ${t.city}</div>` +
        `<div style="font-size:12px;color:${popBody}">${t.detail}</div>` +
        `<div style="font-size:11px;color:${popMuted};margin-top:2px">${t.address}</div>` +
        `</div>`, { maxWidth: 280 }
      );
      layer.addLayer(marker);
    });

    // University markers (diamond-shaped via DivIcon)
    const unis = city === "all" ? universities : universities.filter(u => u.city === city);
    unis.forEach(u => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;background:#facc15;border:2px solid ${borderColor};border-radius:2px;transform:rotate(45deg);box-shadow:0 0 8px rgba(250,204,21,0.4)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const marker = L.marker([u.lat, u.lng], { icon });
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:200px">` +
        `<div style="font-weight:700;font-size:13px;color:${popTitle}">${u.name}</div>` +
        `<div style="font-size:10px;color:#facc15;margin:3px 0;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">UNIVERSITY · ${u.city}</div>` +
        `<div style="font-size:12px;color:${popBody}">${u.students} students</div>` +
        `<div style="font-size:11px;color:${popMuted};margin-top:2px">${u.address}</div>` +
        `</div>`, { maxWidth: 280 }
      );
      layer.addLayer(marker);
    });

    return () => {
      if (mapInstance.current) {
        (mapInstance.current as any).remove();
        mapInstance.current = null;
      }
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, [loaded, city, darkMode]);

  return (
    <div className={`just-map ${darkMode ? "map-dark" : "map-light"} bg-midnight-light rounded-2xl border border-white/[0.06] overflow-hidden`} style={{ height: "480px" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TOOLTIP
   ═══════════════════════════════════════════════════════════════ */

const CompTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; type: string } }> }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-midnight-surface border border-white/[0.08] text-snow px-4 py-2.5 rounded-xl shadow-xl text-sm">
        <p className="font-bold">{d.name}</p>
        <p className="text-emerald-accent text-xs mt-0.5">€{d.value}/mo avg · {d.type}</p>
      </div>
    );
  }
  return null;
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function JustificationsPage() {
  const [activeCity, setActiveCity] = useState<string>("Innsbruck");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [mapDark, setMapDark] = useState(true);

  const toggleRow = (name: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const prs = prsBenchmarks[activeCity];
  const demand = demandByCity[activeCity];
  const comparison = cityComparisonData(activeCity);
  const discounts = cityDiscountData(activeCity);
  const cityUnis = universities.filter(u => u.city === activeCity);
  const cityTargets = targetProperties.filter(t => t.city === activeCity);

  return (
    <div className="min-h-screen bg-midnight">
      {/* Header */}
      <div className="relative w-full h-56 overflow-hidden bg-midnight-light">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-accent/5 via-midnight to-midnight" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Stonehill Capital</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Rental Value Justifications</h1>
          <p className="text-sm text-silver mt-2">Market evidence supporting proposed PBSA rental values across Innsbruck, Munich &amp; Passau</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-14">

        {/* ── City Selector ── */}
        <div className="flex flex-wrap gap-2">
          {cityList.map(c => (
            <button key={c} onClick={() => setActiveCity(c)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                activeCity === c
                  ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent"
                  : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
              }`}>
              {c}
            </button>
          ))}
        </div>

        {/* ── Target Properties Map with Uni Radii ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
            <div>
              <h2 className="text-xl font-bold text-snow">Property &amp; University Locations — {activeCity}</h2>
              <p className="text-sm text-silver mt-1">PBSA comparables, Stonehill targets &amp; universities</p>
            </div>
            <div className="flex gap-2 self-start">
              <button
                onClick={() => setMapDark(!mapDark)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  mapDark
                    ? "bg-transparent border-white/[0.08] text-silver/60 hover:text-silver"
                    : "bg-cat-amber/10 border-cat-amber/30 text-cat-amber"
                }`}
              >
                {mapDark ? "Light Map" : "Dark Map"}
              </button>
            </div>
          </div>
          <PropertyMap city={activeCity} darkMode={mapDark} />
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-silver/70">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ef4444] border-2 border-white" /> Stonehill Target</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#facc15] border-2 border-[#0c1220] rounded-sm" style={{ transform: "rotate(45deg)" }} /> University</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cat-blue" /> Uni. Subsidised</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cat-green" /> Non-Profit</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cat-amber" /> Private PBSA</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cat-purple" /> Premium PBSA</span>
          </div>
        </section>

        {/* ── Target Property Details ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-4">Stonehill Target Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {targetProperties.map(t => (
              <div key={t.name} className={`bg-midnight-light border rounded-2xl p-5 transition-colors ${t.city === activeCity ? "border-red-500/30" : "border-white/[0.06] opacity-50"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444] border-2 border-white flex-shrink-0" />
                  <h3 className="text-sm font-bold text-snow">{t.name}</h3>
                </div>
                <div className="text-xs text-silver mb-1">{t.address}</div>
                <div className="text-xs text-silver/70">{t.detail}</div>
                <div className="mt-2 text-[10px] text-emerald-accent/70 uppercase tracking-wider font-semibold">{t.city}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── University Locations ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-4">Universities — {activeCity}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityUnis.map(u => (
              <div key={u.name} className="bg-midnight-light border border-white/[0.06] rounded-2xl p-5 hover:border-yellow-500/20 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-[#facc15] border-2 border-[#0c1220] rounded-sm flex-shrink-0" style={{ transform: "rotate(45deg)" }} />
                  <h3 className="text-sm font-bold text-snow">{u.shortName}</h3>
                </div>
                <div className="text-xs text-silver font-medium mb-1">{u.name}</div>
                <div className="text-xs text-silver/60 mb-2">{u.address}</div>
                <div className="text-xs text-snow font-bold">{u.students} students</div>
                {/* Proximity to Stonehill targets */}
                {cityTargets.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/[0.04]">
                    <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">Distance to Stonehill targets</div>
                    {cityTargets.map(t => {
                      const distKm = Math.sqrt(
                        Math.pow((u.lat - t.lat) * 111.32, 2) +
                        Math.pow((u.lng - t.lng) * 111.32 * Math.cos(u.lat * Math.PI / 180), 2)
                      );
                      const cycleMin = Math.round(distKm / 14 * 60);
                      return (
                        <div key={t.name} className="flex justify-between items-center text-xs mt-1">
                          <span className="text-silver/60">{t.name.replace(" (Target)", "")}</span>
                          <span className="text-snow font-medium">{distKm.toFixed(1)} km · ~{cycleMin} min</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Demand Fundamentals ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-6">Demand Fundamentals — {activeCity}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Students", value: demand.students },
              { label: "City Population", value: demand.population },
              { label: "Student Ratio", value: demand.ratio },
              { label: "PBSA Beds", value: demand.pbsaBeds },
              { label: "Coverage", value: demand.coverage },
              { label: "Bed Gap", value: demand.bedGap },
            ].map(m => (
              <div key={m.label} className="bg-midnight-light border border-white/[0.06] rounded-2xl p-4 hover:border-white/[0.12] transition-colors">
                <div className="text-[10px] text-silver/50 uppercase tracking-wider mb-1.5">{m.label}</div>
                <div className="text-xl font-bold text-snow font-serif">{m.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PBSA vs PRS Chart ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">PBSA vs Private Rental Market — {activeCity}</h2>
          <p className="text-sm text-silver mb-6">Average rent by PBSA category vs PRS median (March 2026, n={prs.n} scraped from {prs.sources})</p>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparison} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} interval={0} angle={-15} textAnchor="end" height={55} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `€${v}`} />
                <Tooltip content={<CompTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {comparison.map((d, i) => (
                    <Cell key={i} fill={d.type === "PRS" ? "#f59e0b" : catColors[d.name] || "#009966"} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "PRS Median", value: `€${prs.median.toLocaleString()}` },
                { label: "PRS Q25", value: `€${prs.q25.toLocaleString()}` },
                { label: "PRS Q75", value: `€${prs.q75.toLocaleString()}` },
                { label: "PRS Mean", value: `€${prs.mean.toLocaleString()}` },
              ].map(s => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="text-[10px] text-silver/60 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-lg font-bold text-snow font-serif">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Discount Table with Addresses ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-2">Comparable Properties &amp; Discount to PRS — {activeCity}</h2>
          <p className="text-sm text-silver mb-6">Each PBSA residence with address, priced relative to PRS median of €{prs.median.toLocaleString()}/mo</p>
          <div className="bg-midnight-light border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Residence</th>
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden lg:table-cell">Address</th>
                    <th className="text-left text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Category</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Avg Rent</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3">Discount</th>
                    <th className="text-right text-[10px] text-silver/50 uppercase tracking-wider font-semibold px-6 py-3 hidden sm:table-cell">Beds</th>
                  </tr>
                </thead>
                <tbody>
                  {discounts.map((d, i) => {
                    const isExpanded = expandedRows.has(d.name);
                    return (
                      <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => toggleRow(d.name)}>
                        <td className="px-6 py-3">
                          <div className="text-silver-bright font-medium">{d.name}</div>
                          {isExpanded && <div className="text-xs text-silver/50 mt-1 lg:hidden">{d.address}</div>}
                        </td>
                        <td className="px-6 py-3 text-xs text-silver/60 hidden lg:table-cell">{d.address}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${catBgColors[d.category]?.bg} ${catBgColors[d.category]?.text}`}>
                            {d.category}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right text-snow font-bold font-serif">€{Math.round(d.midpoint).toLocaleString()}</td>
                        <td className="px-6 py-3 text-right">
                          <span className={`font-bold ${d.discount > 0 ? "text-emerald-accent" : "text-amber-warm"}`}>
                            {d.discount > 0 ? "-" : "+"}{Math.abs(d.discount)}%
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right text-silver hidden sm:table-cell">{d.beds}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Cross-City Summary ── */}
        <section>
          <h2 className="text-xl font-bold text-snow mb-6">Cross-City Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cityList.map(c => {
              const p = prsBenchmarks[c];
              const d = demandByCity[c];
              const comps = cityComps(c);
              const totalBeds = comps.reduce((sum, x) => sum + x.beds, 0);
              const avgRent = Math.round(comps.reduce((sum, x) => sum + (x.min + x.max) / 2, 0) / comps.length);
              const avgDiscount = Math.round((1 - avgRent / p.median) * 100);
              return (
                <div key={c} className={`bg-midnight-light border rounded-2xl p-6 transition-all ${c === activeCity ? "border-emerald-accent/30" : "border-white/[0.06]"}`}>
                  <h3 className="text-lg font-bold text-snow mb-4 font-serif">{c}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-silver/60">PRS Median</span><span className="text-snow font-bold">€{p.median.toLocaleString()}/mo</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">PBSA Avg Rent</span><span className="text-snow font-bold">€{avgRent}/mo</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">Avg Discount</span><span className="text-emerald-accent font-bold">-{avgDiscount}%</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">PBSA Properties</span><span className="text-snow">{comps.length}</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">Total Beds</span><span className="text-snow">{totalBeds.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">Students</span><span className="text-snow">{d.students}</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">Coverage</span><span className="text-snow">{d.coverage}</span></div>
                    <div className="flex justify-between"><span className="text-silver/60">Bed Gap</span><span className="text-amber-warm font-bold">{d.bedGap}</span></div>
                  </div>
                  <button onClick={() => setActiveCity(c)} className="mt-4 w-full text-center text-xs text-emerald-accent hover:text-emerald-glow transition-colors font-semibold py-2 border border-emerald-accent/20 rounded-lg hover:bg-emerald-accent/5">
                    View {c} Detail
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="bg-midnight-light border border-white/[0.06] rounded-2xl p-8">
          <h2 className="text-lg font-bold text-snow mb-3">Methodology &amp; Sources</h2>
          <div className="text-sm text-silver/80 space-y-3 leading-relaxed">
            <p><span className="text-snow font-semibold">Private Rental Data:</span> Innsbruck: 179 listings (willhaben.at &amp; ImmobilienScout24). Munich: 2,832 listings (wg-gesucht.de &amp; ImmobilienScout24). Passau: 276 listings (WG-gesucht.de &amp; ImmobilienScout24). All scraped March 2026. Rents are warm/gross where stated.</p>
            <p><span className="text-snow font-semibold">PBSA Comparables:</span> {pbsaComps.length} purpose-built residences across 4 pricing tiers. Rent data from operator websites (OeAD, Studierendenwerk, STUWO, THE FIZZ, etc.) as of March 2026.</p>
            <p><span className="text-snow font-semibold">Target Properties:</span> Höttinger Au / Bachlechnerstraße and Areal Hafen / Innrain (Innsbruck), Ungererstraße 71 (Munich Schwabing), and Haitzingerstraße 4 (Passau). Stonehill acquisition/development targets.</p>
            <p><span className="text-snow font-semibold">University Locations:</span> {universities.length} institutions mapped. Addresses from official university websites.</p>
            <p><span className="text-snow font-semibold">Student Population:</span> Enrollment from university annual reports (2024/25). City population from Statistik Austria / Bayerisches Landesamt für Statistik (2025).</p>
          </div>
        </section>

        {/* ── Nav links ── */}
        <section className="flex flex-wrap gap-4">
          {cityList.map(c => (
            <Link key={c} href={`/${c.toLowerCase()}/comparables`}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-silver border border-white/[0.1] px-6 py-3 rounded-xl font-medium text-sm tracking-wide hover:text-snow hover:border-white/[0.2] transition-all duration-300">
              {c} Comparables
            </Link>
          ))}
          <Link href="/map"
            className="group inline-flex items-center justify-center gap-3 bg-emerald-accent text-midnight px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-emerald-glow transition-colors duration-300">
            Full Map
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform"><path d="M1 8h14M9 2l6 6-6 6" /></svg>
          </Link>
        </section>
      </main>
    </div>
  );
}
