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
  { lat: 47.26307, lng: 11.38419, type: "university", city: "Innsbruck", name: "University of Innsbruck", detail: "28,000 students · 20% international", detail2: "Innrain 52, 6020 Innsbruck" },
  { lat: 47.25970, lng: 11.38723, type: "university", city: "Innsbruck", name: "Medical University of Innsbruck", detail: "3,800 students · 20% international", detail2: "Christoph-Probst-Platz 1, 6020 Innsbruck" },
  { lat: 47.26991, lng: 11.39836, type: "university", city: "Innsbruck", name: "MCI | The Entrepreneurial School", detail: "3,700 students · 25% international", detail2: "Universitätsstraße 15, 6020 Innsbruck" },
  { lat: 47.28387, lng: 11.51741, type: "university", city: "Innsbruck", name: "UMIT TIROL", detail: "500 students · 15% international", detail2: "Eduard-Wallnöfer-Zentrum 1, 6060 Hall in Tirol" },

  // === INNSBRUCK RESIDENCES ===
  { lat: 47.26647, lng: 11.38342, type: "non-profit", city: "Innsbruck", name: "Home4students Höttinger Au 34", detail: "~120 beds · from €324/mo", detail2: "Höttinger Au 34, 6020 Innsbruck" },
  { lat: 47.26440, lng: 11.35006, type: "non-profit", city: "Innsbruck", name: "Home4students Technikerstraše 7", detail: "~100 beds · from €314/mo", detail2: "Technikerstraše 7, 6020 Innsbruck" },
  { lat: 47.26406, lng: 11.37806, type: "non-profit", city: "Innsbruck", name: "OeAD GreenINN", detail: "~200 beds · €425–€535/mo", detail2: "Fürstenweg, 6020 Innsbruck · Passivhaus standard" },
  { lat: 47.27083, lng: 11.41295, type: "non-profit", city: "Innsbruck", name: "OeAD Reichenauer Straße", detail: "~100 beds · from €488/mo", detail2: "Reichenauer Straße, 6020 Innsbruck" },
  { lat: 47.27479, lng: 11.40203, type: "non-profit", city: "Innsbruck", name: "Studentenheim Saggen", detail: "~60 beds · €380–€450/mo", detail2: "Gänsbacherstraße 4, 6020 Innsbruck" },
  { lat: 47.27838, lng: 11.40280, type: "non-profit", city: "Innsbruck", name: "Studentenhaus Sillgraben", detail: "~50 beds · €380–€420/mo", detail2: "Rennweg 34, 6020 Innsbruck" },
  { lat: 47.27457, lng: 11.39893, type: "non-profit", city: "Innsbruck", name: "Canisianum", detail: "~80 beds · €344–€580/mo", detail2: "Tschurtschenthalerstraße 7, 6020 Innsbruck" },
  { lat: 47.26918, lng: 11.38445, type: "non-profit", city: "Innsbruck", name: "Frau Hitt-Campus (Akademikerhilfe)", detail: "Non-profit · €344–€580/mo", detail2: "Frau-Hitt-Straße 14, 6020 Innsbruck" },
  { lat: 47.26803, lng: 11.39268, type: "non-profit", city: "Innsbruck", name: "Studentenheim Roter Adler (WIST)", detail: "Non-profit residence", detail2: "Seilergasse 4–6, 6020 Innsbruck" },
  { lat: 47.25809, lng: 11.35494, type: "non-profit", city: "Innsbruck", name: "Studentenheim Dr. Hertha Firnberg (WIST)", detail: "Non-profit residence", detail2: "Fürstenweg 174a, 6020 Innsbruck" },
  { lat: 47.25775, lng: 11.35520, type: "non-profit", city: "Innsbruck", name: "Studentenheim Panorama (WIST)", detail: "Non-profit residence", detail2: "Fürstenweg 174, 6020 Innsbruck" },
  { lat: 47.26501, lng: 11.33116, type: "non-profit", city: "Innsbruck", name: "Studentenheim Dr. Adolf Sollath (OeAD/WIST)", detail: "Non-profit residence", detail2: "Hans Untermüllerstr. 8, 6020 Innsbruck" },
  { lat: 47.26485, lng: 11.33082, type: "non-profit", city: "Innsbruck", name: "Studentenheim Rapoldi (OeAD/WIST)", detail: "Non-profit residence", detail2: "Hans Untermüllerstr. 6, 6020 Innsbruck" },
  { lat: 47.25349, lng: 11.35485, type: "non-profit", city: "Innsbruck", name: "Campus Sieglanger 1 & 2 (OeAD/WIST)", detail: "Non-profit residence", detail2: "Weingartnerstr. 129 & 131, 6020 Innsbruck" },
  { lat: 47.26525, lng: 11.37194, type: "non-profit", city: "Innsbruck", name: "Studentenheim Karwendel 1 & 2 (OeAD)", detail: "Non-profit residence", detail2: "Höttinger Au 84 & 84a, 6020 Innsbruck" },
  { lat: 47.26492, lng: 11.34617, type: "non-profit", city: "Innsbruck", name: "Europaheim", detail: "Non-profit residence", detail2: "Technikerstraše 9b, 6020 Innsbruck" },
  { lat: 47.26199, lng: 11.38268, type: "non-profit", city: "Innsbruck", name: "Internationales Studentenhaus (ÖAD)", detail: "Non-profit residence", detail2: "Rechengasse 7, 6020 Innsbruck" },
  { lat: 47.26100, lng: 11.39057, type: "non-profit", city: "Innsbruck", name: "Müllerheim (Akademikerhilfe)", detail: "Non-profit · €344–€580/mo", detail2: "Müllerstraße 29, 6020 Innsbruck" },
  { lat: 47.26255, lng: 11.39027, type: "non-profit", city: "Innsbruck", name: "Haus Maximilianstraße 8 (Akademikerhilfe)", detail: "Non-profit · €344–€580/mo", detail2: "Maximilianstraße 8, 6020 Innsbruck" },
  { lat: 47.26309, lng: 11.36950, type: "non-profit", city: "Innsbruck", name: "Haus Am Gießen 20 (Akademikerhilfe)", detail: "Non-profit · €344–€580/mo", detail2: "Am Gießen 20, 6020 Innsbruck" },
  { lat: 47.27416, lng: 11.44207, type: "non-profit", city: "Innsbruck", name: "Haus Schützenstraße 43 (Akademikerhilfe)", detail: "Non-profit · €344–€580/mo", detail2: "Schützenstraße 43, 6020 Innsbruck" },
  { lat: 47.26648, lng: 11.38384, type: "non-profit", city: "Innsbruck", name: "Studentenheim Savoy", detail: "Non-profit residence", detail2: "Höttinger Au 26/4, 6020 Innsbruck" },
  { lat: 47.26847, lng: 11.40291, type: "non-profit", city: "Innsbruck", name: "Studentenheim Dr. Karl Kunst", detail: "Non-profit residence", detail2: "Dreiheiligenstraße 9, 6020 Innsbruck" },
  { lat: 47.26990, lng: 11.40354, type: "non-profit", city: "Innsbruck", name: "Campus Dreiheiligen", detail: "Non-profit residence", detail2: "Kohlstattgasse 1, 6020 Innsbruck" },
  { lat: 47.26457, lng: 11.36577, type: "premium-pbsa", city: "Innsbruck", name: "STUWO Innsbruck", detail: "87 beds · €729–€789/mo", detail2: "Kranebitter Allee 30, 6020 Innsbruck" },

  // === MUNICH UNIVERSITIES ===
  { lat: 48.15048, lng: 11.57984, type: "university", city: "Munich", name: "LMU München", detail: "52,658 students · 17% international", detail2: "Geschwister-Scholl-Platz 1, 80539 München" },
  { lat: 48.14907, lng: 11.56745, type: "university", city: "Munich", name: "TU München (Main)", detail: "51,954 students · 44% international", detail2: "Arcisstraße 21, 80333 München" },
  { lat: 48.26256, lng: 11.66803, type: "university", city: "Munich", name: "TU München (Garching)", detail: "TUM Garching campus", detail2: "Boltzmannstr. 3, 85748 Garching" },
  { lat: 48.15349, lng: 11.55303, type: "university", city: "Munich", name: "Hochschule München", detail: "18,500 students · 15% international", detail2: "Lothstraße 34, 80335 München" },
  { lat: 48.08021, lng: 11.63837, type: "university", city: "Munich", name: "Universität der Bundeswehr", detail: "3,000 students · 10% international", detail2: "Werner-Heisenberg-Weg 39, 85577 Neubiberg" },
  { lat: 48.14610, lng: 11.56745, type: "university", city: "Munich", name: "Hochschule für Musik und Theater", detail: "1,400 students · 40% international", detail2: "Arcisstraße 12, 80333 München" },

  // === MUNICH RESIDENCES ===
  { lat: 48.18441, lng: 11.61004, type: "university-subsidised", city: "Munich", name: "Studentenstadt Freimann", detail: "~2,500 beds · €300–€420/mo", detail2: "Christoph-Probst-Straße 10, 80805 München" },
  { lat: 48.18013, lng: 11.55276, type: "university-subsidised", city: "Munich", name: "Olympisches Dorf", detail: "~1,800 beds · €280–€400/mo", detail2: "Helene-Mayer-Ring 9, 80809 München" },
  { lat: 48.20967, lng: 11.56404, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Felsennelkenanger", detail: "~800 beds · €300–€420/mo", detail2: "Felsennelkenanger 7–21, 80937 München" },
  { lat: 48.15722, lng: 11.56728, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Agnes-/Adelheidstr.", detail: "~450 beds · €300–€420/mo", detail2: "Adelheidstraße 13/15, 80798 München" },
  { lat: 48.15122, lng: 11.58418, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Kaulbachstraße", detail: "~200 beds · €300–€420/mo", detail2: "Kaulbachstraße 49, 80539 München" },
  { lat: 48.10632, lng: 11.58796, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Chiemgaustraße", detail: "~600 beds · €300–€420/mo", detail2: "Traunsteiner Straße 1–13, 81549 München" },
  { lat: 48.18707, lng: 11.59867, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Max-Bill-Str.", detail: "~400 beds · €300–€420/mo", detail2: "Max-Bill-Straße 67, 80807 München" },
  { lat: 48.20094, lng: 11.60661, type: "university-subsidised", city: "Munich", name: "Studierendenwerk Heidemannstr.", detail: "~350 beds · €300–€420/mo", detail2: "Paul-Hindemith-Allee 4/6, 80939 München" },
  { lat: 48.15047, lng: 11.57470, type: "non-profit", city: "Munich", name: "Ludwigskolleg (Erzdiözese)", detail: "170 beds · €280–€500/mo", detail2: "Schellingstraße 35, 80799 München" },
  { lat: 48.15035, lng: 11.54249, type: "non-profit", city: "Munich", name: "Roncalli-Kolleg", detail: "124 beds · €280–€400/mo" },
  { lat: 48.13794, lng: 11.56280, type: "non-profit", city: "Munich", name: "Kolpinghaus Kardinal-Wendel", detail: "~200 beds · €270–€500/mo", detail2: "Adolf-Kolping-Straße 1, 80336 München" },
  { lat: 48.09394, lng: 11.52957, type: "private-pbsa", city: "Munich", name: "Campus Viva München", detail: "~580 beds · €610–€750/mo", detail2: "South Munich" },
  { lat: 48.18663, lng: 11.56583, type: "private-pbsa", city: "Munich", name: "YOUNIQ Munich", detail: "~200 beds · €550–€700/mo", detail2: "Schleißheimer Straße 323, 80809 München" },
  { lat: 48.14450, lng: 11.50297, type: "private-pbsa", city: "Munich", name: "Studio M2", detail: "~400 beds · €535–€680/mo", detail2: "München-Laim, near S-Bahn Laim" },
  { lat: 48.16267, lng: 11.53716, type: "premium-pbsa", city: "Munich", name: "THE FIZZ Munich", detail: "218 beds · €1,086–€1,919/mo", detail2: "Hanebergstraße 2, 80637 München" },
  { lat: 48.11252, lng: 11.54948, type: "premium-pbsa", city: "Munich", name: "Die Zimmerei", detail: "287 beds · €840–€1,520/mo", detail2: "Sendling, München" },

  // === PASSAU UNIVERSITIES ===
  { lat: 48.56640, lng: 13.44961, type: "university", city: "Passau", name: "University of Passau", detail: "10,568 students · 18% international", detail2: "Innstraße 41, 94032 Passau" },

  // === PASSAU RESIDENCES ===
  { lat: 48.57477, lng: 13.47213, type: "university-subsidised", city: "Passau", name: "Studentenwerk Bräugasse", detail: "95 beds · €260–€550/mo", detail2: "Bräugasse 11–15, 94032 Passau" },
  { lat: 48.56400, lng: 13.41163, type: "university-subsidised", city: "Passau", name: "Studentenwerk Donau-Schwaben-Str.", detail: "242 beds · €260–€550/mo", detail2: "Donau-Schwaben-Straße 14–24, 94036 Passau" },
  { lat: 48.56535, lng: 13.43874, type: "university-subsidised", city: "Passau", name: "Studentenwerk Leonhard-Paminger-Str.", detail: "356 beds · €260–€550/mo", detail2: "Leonhard-Paminger-Straße, 94032 Passau" },
  { lat: 48.56683, lng: 13.44045, type: "university-subsidised", city: "Passau", name: "Studentenwerk Maierhofstraße", detail: "20 beds · €260–€550/mo", detail2: "Maierhofstraße 11, 94032 Passau" },
  { lat: 48.57396, lng: 13.46925, type: "non-profit", city: "Passau", name: "Wohnbauwerk Marienheim", detail: "198 beds · €200–€550/mo", detail2: "City centre, Altstadt" },
  { lat: 48.56036, lng: 13.43001, type: "non-profit", city: "Passau", name: "Wohnbauwerk Haus St. Severin", detail: "160 beds · €200–€550/mo", detail2: "Schönleitnerweg, 94032 Passau" },
  { lat: 48.57131, lng: 13.43265, type: "non-profit", city: "Passau", name: "Boni Studentenwohnheim", detail: "165 beds · €250–€400/mo", detail2: "Holzheimerstraße, 94032 Passau" },
  { lat: 48.57129, lng: 13.45297, type: "private-pbsa", city: "Passau", name: "Vegis St. Nicola / Kapfinger", detail: "209 beds · €349/mo", detail2: "St. Nicola, 94032 Passau" },
  { lat: 48.57168, lng: 13.44152, type: "private-pbsa", city: "Passau", name: "River Living Passau", detail: "155 beds · €350–€650/mo", detail2: "Spitalhofstraße 30, 94032 Passau" },
  { lat: 48.57436, lng: 13.45382, type: "private-pbsa", city: "Passau", name: "UNILIFE Passau", detail: "45 beds · €350–€600/mo", detail2: "Near Passau Hbf" },
  { lat: 48.56749, lng: 13.44989, type: "private-pbsa", city: "Passau", name: "Campus Living Passau", detail: "127 beds", detail2: "Innstraße 72/74, 94032 Passau" },
];

const markerColors: Record<MarkerType, string> = {
  "university": "#ef4444",
  "university-subsidised": "#3b82f6",
  "non-profit": "#10b981",
  "private-pbsa": "#f59e0b",
  "premium-pbsa": "#8b5cf6",
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
  Innsbruck: { lat: 47.264, lng: 11.385, zoom: 13 },
  Munich: { lat: 48.155, lng: 11.57, zoom: 12 },
  Passau: { lat: 48.568, lng: 13.445, zoom: 13 },
};

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const markersLayer = useRef<unknown>(null);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [loaded, setLoaded] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const tileLayerRef = useRef<unknown>(null);

  useEffect(() => {
    if (loaded) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    // Inject dark popup styles
    const style = document.createElement("style");
    style.id = "map-theme-style";
    style.textContent = `
      .leaflet-popup-content-wrapper { background: #131b2e !important; color: #f1f5f9 !important; border-radius: 12px !important; border: 1px solid rgba(255,255,255,0.06) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }
      .leaflet-popup-tip { background: #131b2e !important; }
      .leaflet-popup-close-button { color: #94a3b8 !important; }
      .leaflet-popup-close-button:hover { color: #00bc7d !important; }
      .leaflet-control-zoom a { background: #131b2e !important; color: #f1f5f9 !important; border-color: rgba(255,255,255,0.06) !important; }
      .leaflet-control-zoom a:hover { background: #1a2540 !important; color: #00bc7d !important; }
      .leaflet-control-attribution { background: rgba(12,18,32,0.8) !important; color: #64748b !important; }
      .leaflet-control-attribution a { color: #94a3b8 !important; }
    `;
    document.head.appendChild(style);

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
      const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      const tile = L.tileLayer(darkTiles, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);
      tileLayerRef.current = tile;
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
        color: lightMode ? "#ffffff" : "#0c1220",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      });
      marker.bindPopup(
        `<div style="font-family:system-ui;min-width:200px">` +
        `<div style="font-weight:700;font-size:14px;margin-bottom:4px;color:${lightMode ? '#1e293b' : '#f1f5f9'}">${m.name}</div>` +
        `<div style="font-size:11px;color:#00bc7d;margin-bottom:2px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">${markerLabels[m.type]} · ${m.city}</div>` +
        `<div style="font-size:12px;margin-top:6px;color:${lightMode ? '#475569' : '#cbd5e1'}">${m.detail}</div>` +
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
  }, [loaded, filter, cityFilter, lightMode]);

  // Handle light/dark tile switching
  useEffect(() => {
    if (!loaded || !mapInstance.current || !tileLayerRef.current) return;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const L = (window as any).L;
    const map = mapInstance.current as any;
    const oldTile = tileLayerRef.current as any;
    map.removeLayer(oldTile);
    const url = lightMode
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    const newTile = L.tileLayer(url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);
    tileLayerRef.current = newTile;

    // Update popup/control styles
    const styleEl = document.getElementById("map-theme-style");
    if (styleEl) {
      if (lightMode) {
        styleEl.textContent = `
          .leaflet-popup-content-wrapper { background: #ffffff !important; color: #1e293b !important; border-radius: 12px !important; border: 1px solid rgba(0,0,0,0.08) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }
          .leaflet-popup-tip { background: #ffffff !important; }
          .leaflet-popup-close-button { color: #64748b !important; }
          .leaflet-popup-close-button:hover { color: #00bc7d !important; }
          .leaflet-control-zoom a { background: #ffffff !important; color: #1e293b !important; border-color: rgba(0,0,0,0.1) !important; }
          .leaflet-control-zoom a:hover { background: #f1f5f9 !important; color: #00bc7d !important; }
          .leaflet-control-attribution { background: rgba(255,255,255,0.8) !important; color: #64748b !important; }
          .leaflet-control-attribution a { color: #475569 !important; }
        `;
      } else {
        styleEl.textContent = `
          .leaflet-popup-content-wrapper { background: #131b2e !important; color: #f1f5f9 !important; border-radius: 12px !important; border: 1px solid rgba(255,255,255,0.06) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }
          .leaflet-popup-tip { background: #131b2e !important; }
          .leaflet-popup-close-button { color: #94a3b8 !important; }
          .leaflet-popup-close-button:hover { color: #00bc7d !important; }
          .leaflet-control-zoom a { background: #131b2e !important; color: #f1f5f9 !important; border-color: rgba(255,255,255,0.06) !important; }
          .leaflet-control-zoom a:hover { background: #1a2540 !important; color: #00bc7d !important; }
          .leaflet-control-attribution { background: rgba(12,18,32,0.8) !important; color: #64748b !important; }
          .leaflet-control-attribution a { color: #94a3b8 !important; }
        `;
      }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }, [lightMode, loaded]);

  const jumpToCity = (city: string) => {
    setCityFilter(city);
    if (city === "all" && mapInstance.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mapInstance.current as any).setView([47.8, 12.3], 7);
    }
  };

  return (
    <div className="min-h-screen bg-midnight">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-px bg-emerald-accent" />
            <span className="text-emerald-accent text-[10px] font-bold tracking-[0.2em] uppercase">Interactive Map</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-snow tracking-tight">Universities &amp; Residences</h1>
          <p className="text-sm text-silver mt-2">All universities and student residences across Innsbruck, Munich &amp; Passau</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-1.5">
            {["all", "Innsbruck", "Munich", "Passau"].map(c => (
              <button key={c} onClick={() => jumpToCity(c)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                  cityFilter === c
                    ? "bg-emerald-accent/10 border-emerald-accent/30 text-emerald-accent"
                    : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
                }`}>
                {c === "all" ? "All Cities" : c}
              </button>
            ))}
          </div>
          <div className="w-px h-8 bg-white/[0.06] self-center mx-1" />
          <div className="flex gap-1.5">
            {(["all", "universities", "residences"] as FilterKey[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
                  filter === f
                    ? "bg-white/10 border-white/20 text-snow"
                    : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
                }`}>
                {f === "all" ? "All Types" : f === "universities" ? "Universities" : "Residences"}
              </button>
            ))}
          </div>
          <div className="w-px h-8 bg-white/[0.06] self-center mx-1" />
          <button
            onClick={() => setLightMode(!lightMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium border transition-all duration-200 ${
              lightMode
                ? "bg-amber-400/10 border-amber-400/30 text-amber-400"
                : "bg-transparent border-white/[0.06] text-silver/70 hover:text-silver hover:border-white/[0.12]"
            }`}
          >
            {lightMode ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            )}
            {lightMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* Map container */}
        <div className="bg-midnight-light rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: "65vh" }}>
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-5 text-xs">
          {Object.entries(markerLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border border-midnight" style={{ backgroundColor: markerColors[type as MarkerType] }} />
              <span className="text-silver/70">{label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
