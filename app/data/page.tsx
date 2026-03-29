"use client";

import Link from "next/link";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   INNSBRUCK LISTINGS (66 scraped)
   ═══════════════════════════════════════════════════════════════ */

const innsbruckListings = [
  { title: "Lager in Innsbruck zu vermieten", rent: 450, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "TAUSCHWOHNUNG Kleine Flat in Mühlau sucht Tausch in Innsbruck", rent: 530, sqm: 35, location: "Innenstadt, Innsbruck", source: "immobilienscout24.de" },
  { title: "Zwischenmiete Ende März/ Anfang April", rent: 650, sqm: 28, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "Garconniere am Mitterweg", rent: 700, sqm: 24, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "WG-Zimmer im Loft-Stil mit eigenem Bad in 3er WG", rent: 740, sqm: 22, location: "6020 Innsbruck, Dreiheiligenstraße 33a", source: "willhaben.at" },
  { title: "INNSBRUCK - GARCONNIERE - INNRAIN 28", rent: 750, sqm: 23, location: "6020 Innsbruck, Innrain 28", source: "willhaben.at" },
  { title: "Kleingarconniere für Einzelperson Mitterweg 87 (Top 97)", rent: 750, sqm: 17, location: "Mitterweg 87, Höttinger Au, Innsbruck", source: "immobilienscout24.de" },
  { title: "Erstbezug nach Renovierung: Schöne, helle Garconniere mit Loggia in Pradl", rent: 820, sqm: 29, location: "6020 Innsbruck, Pembaurstraße 24", source: "willhaben.at" },
  { title: "Cozy 1-room apartment on Museum Street", rent: 850, sqm: 18, location: "Museumstrasse 33, city center, Innsbruck", source: "ImmobilienScout24.at" },
  { title: "890€ iBK(DEZ)-Ampass oder Mils / Garconniere", rent: 860, sqm: 25, location: "", source: "willhaben.at" },
  { title: "Alpine Redidence for Students", rent: 895, sqm: 32, location: "Scheuchenstuelgasse 14, Höttinger Au, Innsbruck", source: "immobilienscout24.de" },
  { title: "Helle Garconniere mit Balkon - Hötting West (Technik)", rent: 900, sqm: 30, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "INNSBRUCK - GARCONNIERE - ANDREAS-HOFER-STRASSE 55", rent: 910, sqm: 26, location: "6020 Innsbruck, Andreas-Hofer-Straße 55", source: "willhaben.at" },
  { title: "Garconniere", rent: 920, sqm: 23, location: "6020 Innsbruck, Mitterweg 80", source: "willhaben.at" },
  { title: "KOFFER PACKEN, EINZIEHEN und WOHLFÜHLEN", rent: 970, sqm: 37, location: "Gewerbegebiet Mühlau / Arzl, Innsbruck", source: "immobilienscout24.de" },
  { title: "Prime location studio apartment, 30 sqm, Innsbruck Clinic / Main University with", rent: 976, sqm: 30, location: "Innerkoflerstrasse 2, Wilten, Innsbruck", source: "ImmobilienScout24.at" },
  { title: "Moderne 1,5-Zimmer-Wohnung in Neu-Arzl", rent: 980, sqm: 34, location: "6020 Innsbruck, Pontlatzer Straße", source: "willhaben.at" },
  { title: "Schöne 2,5 - Zimmer Wohnung in Mühlau mit Bergpanorama sucht neuen Mieter", rent: 1018, sqm: 50, location: "Haller Straße 77, Gewerbegebiet Mühlau / Arzl, Innsbruck", source: "immobilienscout24.de" },
  { title: "Neubauwohnungen / Erstbezug in zentrumsnaher Lage zu vermieten! Innsbruck/Kapuzi", rent: 1040, sqm: 45, location: "Kapuzinergasse, Dreiheiligen-Schlachthof, Innsbruck", source: "immobilienscout24.de" },
  { title: "GARÇONNIÈRE / 1-ZIMMER-WOHNUNG", rent: 1052, sqm: 24, location: "6020 Innsbruck, Südtiroler Platz 1", source: "willhaben.at" },
  { title: "TAUSCHWOHNUNG Altbauwohnung", rent: 1100, sqm: 75, location: "Wilten, Innsbruck", source: "immobilienscout24.de" },
  { title: "PRADL - Wetterherrenweg Gemütliche 2-Zimmer-Wohnung", rent: 1122, sqm: 46, location: "Wetterherrenweg, Pradl, Innsbruck", source: "immobilienscout24.de" },
  { title: "Moderne Mietwohnung im Herzen von Innsbruck (provisionsfrei)", rent: 1189, sqm: 42, location: "6020 Innsbruck, Leopoldstraße 32b", source: "willhaben.at" },
  { title: "schöne 2 Zimmerwohnung mit Westbalkon", rent: 1190, sqm: 54, location: "6020 Innsbruck, Franz-Baumann-Weg", source: "willhaben.at" },
  { title: "Frisch sanierte 2-Zimmer-Wohnung in der Höttinger Au - Erstbezug nach Generalsan", rent: 1200, sqm: 43, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "Neubauwohnung mit Balkon und TG-Platz", rent: 1250, sqm: 52, location: "6020 Innsbruck, Mitterweg 88", source: "willhaben.at" },
  { title: "grün - grüner - salamander 0B16", rent: 1255, sqm: 41, location: "6020 Innsbruck, Franz-Fischer-Straße 26a", source: "willhaben.at" },
  { title: "Wunderschöne Gartenwohnung, Neubau", rent: 1320, sqm: 48, location: "Pradl, Innsbruck", source: "immobilienscout24.de" },
  { title: "Neubau 2 Zimmerwohnung Erstbezug", rent: 1350, sqm: 50, location: "6020 Innsbruck, Hunoldstraße 14 G05", source: "willhaben.at" },
  { title: "Ca. 43m² große 2-Zimmer-NEUBAU-Wohnung mit WEST-Balkon in Innsbruck", rent: 1350, sqm: 43, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "Wunderschöne, neu renovierte 2-Zimmer Wohnung im Zentrum von Innsbruck", rent: 1360, sqm: 47, location: "6020 Innsbruck, Örleyweg 18", source: "willhaben.at" },
  { title: "wohnen über den Dächern von Saggen / 2-Zimmer Maisonette", rent: 1380, sqm: 42, location: "6020 Innsbruck, Kohlstattgasse 4", source: "willhaben.at" },
  { title: "2-Zimmerwohnung in Innenstadtlage (Hötting) inkl. TG-Platz - erst ab 01. Septemb", rent: 1380, sqm: 43, location: "6020 Innsbruck, Santifallerstraße 2-4", source: "willhaben.at" },
  { title: "Villen SAGGEN Bestlage 50m2 Dachgeschoss", rent: 1390, sqm: 50, location: "6020 Innsbruck, Claudiastrasse 7", source: "willhaben.at" },
  { title: "Exklusive klimatisierte Neubauwohnung (Erstbezug) im Herzen Innsbrucks", rent: 1390, sqm: 32, location: "6020 Innsbruck, Lieberstraße 2", source: "willhaben.at" },
  { title: "Charmante 2-Zimmer-Wohnung mit Aussicht", rent: 1392, sqm: 49, location: "6020 Innsbruck", source: "willhaben.at" },
  { title: "Gepflegte, möblierte 2-Zimmer-Wohnung in top Innenstadtlage", rent: 1400, sqm: 52, location: "6020 Innsbruck, Blasius-Hueber-Straße", source: "willhaben.at" },
  { title: "TAUSCHWOHNUNG Helle 3-Zimmer-Wohnung in Innsbruck Höttinger Au", rent: 1400, sqm: 85, location: "Innenstadt, Innsbruck", source: "immobilienscout24.de" },
  { title: "gemütliche 2-Zimmer-Wohnung mit ruhig gelegener Terrasse und Garten", rent: 1450, sqm: 57, location: "6020 Innsbruck, Kranebitter Allee 98", source: "willhaben.at" },
  { title: "Helle 2-Zimmer Neubauwohnung in Innsbruck", rent: 1450, sqm: 46, location: "Nagillergasse 79, Höttinger Au, Innsbruck", source: "immobilienscout24.de" },
  { title: "Dachterrassenappartement", rent: 1500, sqm: 44, location: "Scheuchenstuelgasse 14, Höttinger Au, Innsbruck", source: "immobilienscout24.de" },
  { title: "Möblierte 2-Zimmer Wohnung / Ordination nahe Altstadt & Uni - 67 m²", rent: 1539, sqm: 67, location: "6020 Innsbruck, Innstraße 81", source: "willhaben.at" },
  { title: "Voll möbliertes Apartment in zentraler Lage!", rent: 1545, sqm: 34, location: "6020 Innsbruck, Innrain 2/Top 19", source: "willhaben.at" },
  { title: "Stadthaus INNRAIN 21 - Erstbezug 2-Zi-Wohnung (Top 12)", rent: 1575, sqm: 58, location: "6020 Innsbruck, Innrain 21", source: "willhaben.at" },
  { title: "Terrassenwohnung vom Feinsten!", rent: 1600, sqm: 73, location: "6020 Innsbruck, Höhenstraße 20", source: "willhaben.at" },
  { title: "Traumhafte 3-Zimmer-Wohnung direkt an der Sill", rent: 1600, sqm: 70, location: "Sillgasse 3, Wilten, Innsbruck", source: "immobilienscout24.de" },
  { title: "Hötting - 2 Zimmerwohnung mit 34 m² Terrasse", rent: 1634, sqm: 68, location: "Reichenau, Innsbruck", source: "immobilienscout24.de" },
  { title: "Hochwertige 2-Zimmer-Wohnung mit modernem Flair in gefragter Lage!", rent: 1664, sqm: 53, location: "", source: "willhaben.at" },
  { title: "Lebensqualität mit alpinem Flair", rent: 1677, sqm: 75, location: "Vill, Innsbruck", source: "immobilienscout24.de" },
  { title: "Panoramalage Innsbruck-Arzl / LUXURY Wohnung 70m2 + Terrasse 20m2", rent: 1850, sqm: 70, location: "6020 Innsbruck, Diesnerstrasse 31", source: "willhaben.at" },
];

/* ═══════════════════════════════════════════════════════════════
   MUNICH LISTINGS (338 scraped — showing top 50)
   ═══════════════════════════════════════════════════════════════ */

const munichListings = [
  { title: "Schöne 1-Zimmer Wohnung - Schwabing", rent: 190, sqm: 30, location: "München Schwabing-West | Freiligrathstraße 74, 808...", source: "wg-gesucht.de" },
  { title: "Münchner Studentenunterkunft mit eigenem Bad und Küche zur Kurzzeitmiete verfügb", rent: 200, sqm: 20, location: "München Laim | St.-Veit-Str 6", source: "wg-gesucht.de" },
  { title: "March 18th 2026 - March 23rd 2026 (5 nights) Apartment near Wettersteinplatz, be", rent: 200, sqm: 40, location: "München Au-Haidhausen | Gozbertstrasse 8", source: "wg-gesucht.de" },
  { title: "1-Zimmer Wohnung / ONE WEEK", rent: 250, sqm: 27, location: "München Schwabing | nähere Infos bei Interesse", source: "wg-gesucht.de" },
  { title: "Zwischenmiete Studentenstadt (10.03. – 30.03.) - Perfect Bridge for April 1st!", rent: 254, sqm: 12, location: "München Schwabing-Freimann | Willi-Graf-Straße", source: "wg-gesucht.de" },
  { title: "Cozy studio for a short stay (1 or 2 weeks)", rent: 300, sqm: 35, location: "München Ludwigsvorstadt-Isarvorstadt | Holzstraße", source: "wg-gesucht.de" },
  { title: "Zwischenmiete 1,5-Zimmer Altbauwohnung", rent: 320, sqm: 30, location: "München Schwanthalerhöhe | Tulbeckstr. 3", source: "wg-gesucht.de" },
  { title: "München Studentenwohneim Untermiete", rent: 430, sqm: 19, location: "München Neuhausen-Nymphenburg | Helene-Mayer-Ring Haus B", source: "wg-gesucht.de" },
  { title: "Untermiete/Zwischenmiete 1-Zimmerwohnung mit Küche und Toilete", rent: 430, sqm: 19, location: "München Neuhausen-Nymphenburg | Helene-Mayer-Ring 7 Haus B", source: "wg-gesucht.de" },
  { title: "CENTER -ONE ROOM SHARED BETWEEN TWO PERSON-Kolumbusplatz-NO: FEMALE", rent: 450, sqm: 45, location: "München Kolumbusplatz | Kolumbusplatz", source: "wg-gesucht.de" },
  { title: "WG- Zimmer", rent: 450, sqm: 8, location: "München Moosach | Bingener Straße 13", source: "wg-gesucht.de" },
  { title: "Einzimmerapartment zur Untermiete", rent: 451, sqm: 19, location: "München Obergiesing-Fasangarten | Traunsteiner Straße 3", source: "wg-gesucht.de" },
  { title: "Möbliertes Studio in Sendling (5 Min Harras) – Nachmieter gesucht", rent: 480, sqm: 21, location: "München Sendling | Karwendelstraße", source: "wg-gesucht.de" },
  { title: "Zwischenmiete März", rent: 490, sqm: 28, location: "München Milbertshofen-Am Hart | Nietzschestraße", source: "wg-gesucht.de" },
  { title: "Möbliertes 1-Zimmer Apartment – 2 Monate+ – 500€ warm", rent: 500, sqm: 15, location: "München Sendling | Karwendelstr.", source: "wg-gesucht.de" },
  { title: "A studio apartment", rent: 500, sqm: 18, location: "München Moosach | Helene Mayer Ring", source: "wg-gesucht.de" },
  { title: "Olympiadorf Studentenwohnheim", rent: 550, sqm: 19, location: "München Milbertshofen-Am Hart | Helene-Mayer-Ring 7", source: "wg-gesucht.de" },
  { title: "29.03.26 - 12.04.26: Möblierte 1,5-Zimmer-Wohnung", rent: 550, sqm: 50, location: "München Ramersdorf-Perlach | Quiddestraße", source: "wg-gesucht.de" },
  { title: "Room in student housing, private bathroom and kitchen", rent: 550, sqm: 18, location: "München Schwabing-Freimann | Josef-Wirth-Weg 19", source: "wg-gesucht.de" },
  { title: "Möblierte 1-Zimmer-Wohnung in Milbertshofen", rent: 573, sqm: 30, location: "Milbertshofen, München", source: "ImmobilienScout24" },
  { title: "Köln für München Tausch - 1Zi Wohnung in Sendling", rent: 585, sqm: 25, location: "München Sendling | Karwendelstraße 27", source: "wg-gesucht.de" },
  { title: "Altbauwohnung in Sendling zur Zwischenmiete", rent: 590, sqm: 42, location: "München Sendling | Kidlerstraße", source: "wg-gesucht.de" },
  { title: "1 Zimmer Wohnung nähe Rotkreutzplatz", rent: 600, sqm: 25, location: "München Neuhausen-Nymphenburg | Sedlmayrstraße", source: "wg-gesucht.de" },
  { title: "Untervermietung 1-Zimmer- Wohnung März-April. Subrenting one-room appartment in ", rent: 600, sqm: 35, location: "München Thalkirchen-Obersendling-... | Geigenbergerstraße", source: "wg-gesucht.de" },
  { title: "Gemütliche Garconniere im Hüttenstyle", rent: 600, sqm: 35, location: "München Sendling | Straße", source: "wg-gesucht.de" },
  { title: "Tauschwohnung 1,5-Zimmer-Wohnung Untere Au", rent: 600, sqm: 27, location: "Untere Au, München", source: "ImmobilienScout24" },
  { title: "Short-term Studio in Olympiapark", rent: 610, sqm: 20, location: "München Milbertshofen-Am Hart | Helene-Mayer-Ring", source: "wg-gesucht.de" },
  { title: "Möbliertes Zimmer zur Untermiete in Reihenhaus an Studentin/Auszubildende/Wochen", rent: 640, sqm: 24, location: "München Gartenstadt Johanneskirchen | Nähe Syltweg", source: "wg-gesucht.de" },
  { title: "Möbliertes Einzelzimmer nähe Königsplatz / TU München ruhige Lage", rent: 650, sqm: 20, location: "München Maxvorstadt | Richard Wagner Str. 13", source: "wg-gesucht.de" },
  { title: "Zimmer am Englischen Garten, sehr gute Wohnlage", rent: 650, sqm: 15, location: "München Schwabing | Osterwald 000", source: "wg-gesucht.de" },
  { title: "Schickes Zimmer in München-Pasing", rent: 660, sqm: 19, location: "München Pasing-Obermenzing | Offenbachstr.", source: "wg-gesucht.de" },
  { title: "STUDENTEN Appartements in Neuhausen München", rent: 670, sqm: 16, location: "München Neuhausen-Nymphenburg | Merianstraße 8", source: "wg-gesucht.de" },
  { title: "1,5 Zimmer mit eigenem Eingang in der Blumenau/Hadern", rent: 680, sqm: 26, location: "München Hadern | Eisenhutstraße 10 12", source: "wg-gesucht.de" },
  { title: "Nachmieter Gesucht", rent: 680, sqm: 30, location: "München Laim | Landsberger Straße", source: "wg-gesucht.de" },
  { title: "1 Zimmer Wohnung in München Trudering, Altbau, befristet bis 01.07.2027", rent: 685, sqm: 43, location: "München Trudering-Riem | Kirchtruderingerstr 11d", source: "wg-gesucht.de" },
  { title: "private WG Room", rent: 690, sqm: 15, location: "München Maxvorstadt | Nymphenburger Straße 54", source: "wg-gesucht.de" },
  { title: "28 sqm Studio Vermietung *24.03 - 13.04* (3 Wochen)", rent: 699, sqm: 28, location: "München Milbertshofen-Am Hart | moosacher str -", source: "wg-gesucht.de" },
  { title: "Wilhelm-Busch-Straße, Munich", rent: 700, sqm: 58, location: "München | Wilhelm-Busch-Straße", source: "wg-gesucht.de" },
  { title: "VollMöblierte 1 Zimmer befristet", rent: 700, sqm: 25, location: "München Ludwigsvorstadt-Isarvorstadt | Klenzestraße 30", source: "wg-gesucht.de" },
  { title: "1 Zimmer Ferienwohnung in Unity", rent: 715, sqm: 20, location: "München Pasing-Obermenzing | Landsberger Straße 441", source: "wg-gesucht.de" },
  { title: "Möbliertes 1-Zimmer-Apartment (21 m2) – Zwischenmiete (31.03.–25.04.)", rent: 728, sqm: 21, location: "München Laim | Landsberger Straße 272", source: "wg-gesucht.de" },
  { title: "1-Zimmer-Wohnung mit Balkon und Garage Rotkreuzplatz", rent: 730, sqm: 37, location: "Neuhausen, München", source: "ImmobilienScout24" },
  { title: "1 Zimmer wohnung - Milbertshofen befristet 01.03 - 01.05.2026", rent: 735, sqm: 25, location: "München Milbertshofen | Ricarda-Huch-Straße 1", source: "wg-gesucht.de" },
  { title: "1 Zimmer Apartment nahe TUM", rent: 745, sqm: 15, location: "München Maxvorstadt | Augustenstraße 82", source: "wg-gesucht.de" },
  { title: "1-Zimmerwohnung ab Mitte April in Solln", rent: 750, sqm: 26, location: "München Thalkirchen-Obersendling-... | Drygalski - Allee 118", source: "wg-gesucht.de" },
  { title: "Attraktive 1-Zimmer-Wohnung – Mai & Juni", rent: 750, sqm: 30, location: "München Thalkirchen-Obersendling-... | baierbrunnerstraße", source: "wg-gesucht.de" },
  { title: "UNTERMIETE - 1-Zimmer-Wohnung in Germering - nur April 2026", rent: 750, sqm: 38, location: "München Unterpfaffenhofen | Hartstraße", source: "wg-gesucht.de" },
  { title: "Möbliertes Studentenapartment in München-Laim zur Zwischenmiete 16.05.2026 – 31.", rent: 750, sqm: 20, location: "München Laim | Landsberger Straße", source: "wg-gesucht.de" },
  { title: "1-Zimmer Appartment im Dachgeschoss mit eigenem Bad zur Untermiete", rent: 760, sqm: 20, location: "München Neuhausen-Nymphenburg | Elvirastraße", source: "wg-gesucht.de" },
  { title: "Helle, gemütliche 1Zi. Wohnung bei weltoffener WG", rent: 760, sqm: 22, location: "München Süd-Ost | Münchner Straße 18", source: "wg-gesucht.de" },
];

/* ═══════════════════════════════════════════════════════════════
   PASSAU LISTINGS (167 scraped — showing top 50)
   ═══════════════════════════════════════════════════════════════ */

const passauListings = [
  { title: "1-room apartment in Passau (Auerbach) near Spitalhofstraße", rent: 270, sqm: 21, location: "Danziger Straße 17 e, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "1-room apartment in Passau (Auerbach) near Spitalhofstraße", rent: 280, sqm: 21, location: "Danziger Straße 15 d, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "Student apartment in a quiet and prime central location – only 500 m from the un", rent: 285, sqm: 17, location: "Dr.-Hans-Kapfinger-Straße 13, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Passau city center, fully furnished student apartment, directly next to the mona", rent: 285, sqm: 20, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Passau-Innstadt: 1-room student apartment", rent: 290, sqm: 18, location: "Lederergasse 5, Innstadt, Passau", source: "ImmobilienScout24.de" },
  { title: "Passau city center, furnished student apartment directly at the university, unde", rent: 290, sqm: 20, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Small but perfectly formed, centrally located, fully furnished 1-room apartment ", rent: 300, sqm: 21, location: "Neuburger Straße 19, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Winter garden apartment Fully furnished apartment near Passau University / 2 km ", rent: 300, sqm: 19, location: "Holzheimerstraße 4, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "Beautiful, bright 1-room student apartment near the university", rent: 300, sqm: 22, location: "Kapuzinerstraße 71, Innstadt, Passau", source: "ImmobilienScout24.de" },
  { title: "1-room student apartment with conservatory", rent: 300, sqm: 20, location: "Holzheimerstr 4/4a, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "Available student apartment in a quiet city location – only 1 km from the univer", rent: 305, sqm: 22, location: "Neuburger Str. 31 a, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "1-room apartment in a quiet city location – only 1 km from the university", rent: 305, sqm: 20, location: "Neuburger Straße 31 a, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Bright 1-room apartment with south-facing balcony and fitted kitchen", rent: 320, sqm: 21, location: "Gleiwitzer Str. 15, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "Student apartment directly opposite the university", rent: 320, sqm: 20, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Student residence near city center, 1-room apartment with fitted kitchen and con", rent: 330, sqm: 19, location: "Holzheimerstraße 4, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "Passau city center, quiet and spacious apartment in a listed building", rent: 330, sqm: 37, location: "Hacklberg, Passau", source: "ImmobilienScout24.de" },
  { title: "Studenten Zimmer", rent: 332, sqm: 19, location: "Passau Haidenhof-Süd | Ingling 58", source: "wg-gesucht.de" },
  { title: "Sublet möbliertes modernes 1-Zimmer Apartment in zentraler Lage", rent: 345, sqm: 20, location: "Passau Innstadt | St.-Gertraud-Straße 2", source: "wg-gesucht.de" },
  { title: "Passau city center, large gallery student apartment, fully furnished, directly n", rent: 350, sqm: 27, location: "Franz-Stockbauer-Weg 1, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Schönes Appartment gleich bei der Handwerkskammmer", rent: 357, sqm: 27, location: "Passau Haidenhof-Nord | Vo", source: "wg-gesucht.de" },
  { title: "Ruhiges Apartment in sehr schöner Lage", rent: 360, sqm: 30, location: "Passau Altstadt | Haidengasse 16", source: "wg-gesucht.de" },
  { title: "Modernes 1 Zimmer Apartment in Passau Haidenhof", rent: 360, sqm: 20, location: "Passau Haidenhof-Süd | Ludwigstraße 5", source: "wg-gesucht.de" },
  { title: "Studium Zugang-gewinnt Unterkunft vom 01.04.2026", rent: 360, sqm: 15, location: "Passau Haidenhof-Süd | Karlsbaderstraße 8", source: "wg-gesucht.de" },
  { title: "Gepflegte 1-Zimmer Wohnung", rent: 370, sqm: 25, location: "Passau Haidenhof-Süd | Neuburger Straße 1", source: "wg-gesucht.de" },
  { title: "Brand new, furnished room with all-inclusive amenities in a shared apartment for", rent: 370, sqm: 20, location: "Wiener Straße 12 a, Innstadt, Passau", source: "ImmobilienScout24.de" },
  { title: "Charming old building! 1-room apartment in Passau's old town", rent: 370, sqm: 26, location: "Lederergasse 5, Innstadt, Passau", source: "ImmobilienScout24.de" },
  { title: "Cool apartment with a small eat-in kitchen and a large room", rent: 370, sqm: 47, location: "Grubweg, Passau", source: "ImmobilienScout24.de" },
  { title: "Lichtdurchflutete 1ZW in Passaus schönster Altstadt", rent: 375, sqm: 24, location: "Passau Altstadt | Innstraße", source: "wg-gesucht.de" },
  { title: "Renovation completed - 1-room apartment available immediately", rent: 388, sqm: 34, location: "Frühlingstr. 19, Haidenhof Nord, Passau", source: "ImmobilienScout24.de" },
  { title: "Renoviertes Studentenappartement in guter Lage! Vollmöbliert!", rent: 390, sqm: 22, location: "Passau Haidenhof-Nord | Danziger Strasse 17 e, Ap", source: "wg-gesucht.de" },
  { title: "Beautiful 1-room apartment for rent in a central location - M547", rent: 390, sqm: 19, location: "Nibelungenstr. 7, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Large student apartment in the city center", rent: 390, sqm: 35, location: "Passau, Passau", source: "ImmobilienScout24.de" },
  { title: "Wunderschöne Wohnung mit Blick auf den Inn - beste Lage", rent: 395, sqm: 33, location: "Passau Altstadt | Innstraße 20", source: "wg-gesucht.de" },
  { title: "Günstige 1 Zimmer Wohnung in Passau-Haidenhof", rent: 400, sqm: 25, location: "Passau Haidenhof-Süd | Ludwigstraße 12", source: "wg-gesucht.de" },
  { title: "Top modern student apartment in the heart of Passau", rent: 400, sqm: 20, location: "Franz-Stockbauer-Weg 1, St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Old Town apartment near the cathedral. Spacious apartment with convenient access", rent: 400, sqm: 30, location: "Kastnergasse 2, Passau, Passau", source: "ImmobilienScout24.de" },
  { title: "Single room in a shared apartment in a central location with a south-facing balc", rent: 400, sqm: 106, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Apartment in Nähe Uni, Krankenhaus", rent: 420, sqm: 20, location: "Passau Haidenhof-Süd | Innstraße 77b", source: "wg-gesucht.de" },
  { title: "Warmmiete, voll möbliert - Apartment, sehr zentrale Lage", rent: 420, sqm: 23, location: "Passau Haidenhof-Süd | Neuburgerstr. 31", source: "wg-gesucht.de" },
  { title: "Student Nachmieter gesucht schönes 1-Zimmer-Apartment in Passau", rent: 420, sqm: 22, location: "Passau Passau | Neuburger Straße 31a", source: "wg-gesucht.de" },
  { title: "Furnished renovated apartment in a prime central location in Passau", rent: 420, sqm: 25, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "1-room apartment with balcony and fantastic view", rent: 420, sqm: 39, location: "Schulbergstr. 77, Grubweg, Passau", source: "ImmobilienScout24.de" },
  { title: "Charmantes Altbau Appartment 25 qm", rent: 425, sqm: 25, location: "Passau Altstadt | Steiningergasse 5", source: "wg-gesucht.de" },
  { title: "Studenten-Apartment in Top Lage", rent: 430, sqm: 28, location: "Passau Haidenhof | Bruckergasse", source: "wg-gesucht.de" },
  { title: "Helles, schönes 1-Zimmer Apartment", rent: 430, sqm: 30, location: "Passau Altstadt | Rindermarkt 22", source: "wg-gesucht.de" },
  { title: "2-room apartment at the university", rent: 430, sqm: 32, location: "Haidenhof South, Passau", source: "ImmobilienScout24.de" },
  { title: "Modern apartment with a short walk to Passau city center!", rent: 430, sqm: 27, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "MÖBLIERTE 1-Zimmer Wohnung", rent: 440, sqm: 25, location: "Passau Altstadt | Schmiedgasse 5", source: "wg-gesucht.de" },
  { title: "Passau city center, partially furnished 2-room student apartment, directly next ", rent: 440, sqm: 37, location: "St. Nikola, Passau", source: "ImmobilienScout24.de" },
  { title: "Modern furnished Apartment 1-Room in Passau", rent: 450, sqm: 25, location: "Passau Altstadt | Schrottgasse 3", source: "wg-gesucht.de" },
];

/* ═══════════════════════════════════════════════════════════════
   PBSA DATA (25 residences)
   ═══════════════════════════════════════════════════════════════ */

const pbsaData = [
  // Innsbruck
  { name: "Home4students Höttinger Au", city: "Innsbruck", category: "University Subsidised", min: 324, max: 505, beds: 120, operator: "OeAD" },
  { name: "Home4students Technikerstr.", city: "Innsbruck", category: "University Subsidised", min: 314, max: 455, beds: 100, operator: "OeAD" },
  { name: "Home4students Euregio", city: "Innsbruck", category: "University Subsidised", min: 480, max: 500, beds: 80, operator: "Home4students" },
  { name: "OeAD GreenINN", city: "Innsbruck", category: "Non-Profit", min: 425, max: 535, beds: 200, operator: "OeAD" },
  { name: "OeAD Reichenauer Str.", city: "Innsbruck", category: "Non-Profit", min: 488, max: 488, beds: 100, operator: "OeAD" },
  { name: "Studentenheim Saggen", city: "Innsbruck", category: "Non-Profit", min: 300, max: 450, beds: 60, operator: "Ev. Studentenheim" },
  { name: "Studentenhaus Sillgraben", city: "Innsbruck", category: "Non-Profit", min: 380, max: 420, beds: 50, operator: "Sillgraben e.V." },
  { name: "Canisianum", city: "Innsbruck", category: "Non-Profit", min: 350, max: 450, beds: 80, operator: "Akademikerhilfe" },
  { name: "Studentenheim Reichenau", city: "Innsbruck", category: "Non-Profit", min: 380, max: 380, beds: 100, operator: "Studentenheim IBK" },
  { name: "STUWO Innsbruck", city: "Innsbruck", category: "Premium PBSA", min: 729, max: 789, beds: 87, operator: "STUWO" },
  { name: "in\'s International Student House", city: "Innsbruck", category: "Non-Profit", min: 400, max: 500, beds: 60, operator: "in\'s Studentenhaus" },
  // Munich
  { name: "Studentenstadt Freimann", city: "Munich", category: "University Subsidised", min: 300, max: 420, beds: 2500, operator: "Studierendenwerk" },
  { name: "Olympisches Dorf", city: "Munich", category: "University Subsidised", min: 280, max: 400, beds: 1800, operator: "Studierendenwerk" },
  { name: "Felsennelkenanger", city: "Munich", category: "University Subsidised", min: 300, max: 420, beds: 800, operator: "Studierendenwerk" },
  { name: "THE FIZZ Munich", city: "Munich", category: "Premium PBSA", min: 1086, max: 1919, beds: 218, operator: "THE FIZZ" },
  { name: "Die Zimmerei", city: "Munich", category: "Premium PBSA", min: 840, max: 1520, beds: 287, operator: "Die Zimmerei" },
  { name: "Campus Viva München", city: "Munich", category: "Private PBSA", min: 610, max: 750, beds: 580, operator: "Campus Viva" },
  { name: "YOUNIQ Munich", city: "Munich", category: "Private PBSA", min: 550, max: 700, beds: 200, operator: "YOUNIQ" },
  // Passau
  { name: "Studentenwerk Bräugasse", city: "Passau", category: "University Subsidised", min: 260, max: 550, beds: 95, operator: "Studentenwerk" },
  { name: "Studentenwerk Donau-Schwaben-Str.", city: "Passau", category: "University Subsidised", min: 260, max: 350, beds: 242, operator: "Studentenwerk" },
  { name: "Studentenwerk Leonhard-Paminger-Str.", city: "Passau", category: "University Subsidised", min: 368, max: 386, beds: 356, operator: "Studentenwerk" },
  { name: "Wohnbauwerk Marienheim", city: "Passau", category: "Non-Profit", min: 200, max: 550, beds: 198, operator: "Wohnbauwerk" },
  { name: "Wohnbauwerk St. Severin", city: "Passau", category: "Non-Profit", min: 200, max: 290, beds: 160, operator: "Wohnbauwerk" },
  { name: "Boni Studentenwohnheim", city: "Passau", category: "Non-Profit", min: 250, max: 400, beds: 165, operator: "Boni" },
  { name: "Vegis St. Nicola", city: "Passau", category: "Private PBSA", min: 349, max: 349, beds: 209, operator: "Vegis" },
  { name: "River Living Passau", city: "Passau", category: "Private PBSA", min: 350, max: 650, beds: 155, operator: "River Living" },
];

/* ═══════════════════════════════════════════════════════════════
   UNIVERSITY DATA
   ═══════════════════════════════════════════════════════════════ */

const universityData = [
  { name: "University of Innsbruck (LFUI)", city: "Innsbruck", students: "28,000", intl: "~5,600 (20%)", focus: "Full-spectrum research university" },
  { name: "Medical University of Innsbruck", city: "Innsbruck", students: "3,500", intl: "~700 (20%)", focus: "Medical sciences" },
  { name: "MCI | The Entrepreneurial School", city: "Innsbruck", students: "3,400", intl: "~850 (25%)", focus: "Business, engineering, health sciences" },
  { name: "UMIT TIROL", city: "Innsbruck", students: "1,500", intl: "~225 (15%)", focus: "Health informatics, mechatronics" },
  { name: "LMU München", city: "Munich", students: "52,600", intl: "~9,300 (17%)", focus: "Full-spectrum research university" },
  { name: "TU München (TUM)", city: "Munich", students: "51,900", intl: "~23,000 (44%)", focus: "Engineering, sciences, computer science" },
  { name: "Hochschule München", city: "Munich", students: "18,000", intl: "~2,700 (15%)", focus: "Applied sciences" },
  { name: "Universität der Bundeswehr", city: "Munich", students: "3,500", intl: "~350 (10%)", focus: "Engineering, computer science, economics" },
  { name: "HfMT München", city: "Munich", students: "1,200", intl: "~480 (40%)", focus: "Music and theatre" },
  { name: "AdBK München", city: "Munich", students: "750", intl: "~200 (27%)", focus: "Fine arts" },
  { name: "University of Passau", city: "Passau", students: "10,568", intl: "1,916 (18%)", focus: "Law, business, CS, humanities" },
];

/* ═══════════════════════════════════════════════════════════════
   SOURCES
   ═══════════════════════════════════════════════════════════════ */

const sources = [
  { category: "Private Rental (PRS)", items: [
    { source: "willhaben.at", scope: "Innsbruck apartment listings", count: 42, date: "March 2026" },
    { source: "ImmobilienScout24.at", scope: "Innsbruck apartment listings", count: 2, date: "March 2026" },
    { source: "wg-gesucht.de & ImmobilienScout24", scope: "Munich studio/1-room listings", count: 338, date: "March 2026" },
    { source: "WG-gesucht.de & ImmobilienScout24", scope: "Passau apartment listings", count: 167, date: "March 2026" },
  ]},
  { category: "PBSA Comparables", items: [
    { source: "OeAD / Home4students / STUWO", scope: "Innsbruck student housing operators", count: 11, date: "March 2026" },
    { source: "Studierendenwerk München", scope: "Munich subsidised residences", count: 3, date: "March 2026" },
    { source: "THE FIZZ / Die Zimmerei / YOUNIQ / Campus Viva", scope: "Munich private/premium PBSA", count: 4, date: "March 2026" },
    { source: "Studentenwerk / Wohnbauwerk / Boni / Vegis / River Living", scope: "Passau student residences", count: 8, date: "March 2026" },
  ]},
  { category: "Student Population", items: [
    { source: "University annual reports 2024/25", scope: "Enrollment data all institutions", count: 11, date: "2024/25" },
    { source: "Statistik Austria", scope: "Innsbruck city population", count: 1, date: "2025" },
    { source: "Bayerisches Landesamt für Statistik", scope: "Munich & Passau city population", count: 2, date: "2025" },
  ]},
];

type DataSection = "prs" | "pbsa" | "universities" | "sources";

const catBg: Record<string, string> = {
  "University Subsidised": "bg-blue-50 text-blue-700 border-blue-200",
  "Non-Profit": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Private PBSA": "bg-amber-50 text-amber-700 border-amber-200",
  "Premium PBSA": "bg-purple-50 text-purple-700 border-purple-200",
};

export default function DataPage() {
  const [activeSection, setActiveSection] = useState<DataSection>("prs");
  const [cityFilter, setCityFilter] = useState<string>("all");

  const sections: { key: DataSection; label: string; count: string }[] = [
    { key: "prs", label: "PRS Listings", count: `${innsbruckListings.length + munichListings.length + passauListings.length}` },
    { key: "pbsa", label: "PBSA Residences", count: `${pbsaData.length}` },
    { key: "universities", label: "Universities", count: `${universityData.length}` },
    { key: "sources", label: "Sources", count: `${sources.reduce((a, s) => a + s.items.length, 0)}` },
  ];

  const allListings = [...innsbruckListings.map(l => ({ ...l, city: "Innsbruck" })),
                       ...munichListings.map(l => ({ ...l, city: "Munich" })),
                       ...passauListings.map(l => ({ ...l, city: "Passau" }))];
  const filteredListings = cityFilter === "all" ? allListings : allListings.filter(l => l.city === cityFilter);
  const filteredPBSA = cityFilter === "all" ? pbsaData : pbsaData.filter(p => p.city === cityFilter);
  const filteredUnis = cityFilter === "all" ? universityData : universityData.filter(u => u.city === cityFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Explorer</h1>
          <p className="text-slate-500 mt-1">571 PRS listings · {pbsaData.length} PBSA residences · {universityData.length} universities</p>
        </div>

        {/* City filter */}
        <div className="flex gap-2">
          {["all", "Innsbruck", "Munich", "Passau"].map(city => (
            <button key={city} onClick={() => setCityFilter(city)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                cityFilter === city ? "bg-blue-600 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}>
              {city === "all" ? "All Cities" : city}
            </button>
          ))}
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-2">
          {sections.map(s => (
            <button key={s.key} onClick={() => setActiveSection(s.key)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                activeSection === s.key ? "bg-white text-blue-600 border border-slate-200 border-b-white -mb-[1px]" : "text-slate-500 hover:text-slate-700"
              }`}>
              {s.label} <span className="text-xs opacity-60">({s.count})</span>
            </button>
          ))}
        </div>

        {/* PRS Section */}
        {activeSection === "prs" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">Private Rental Listings</h2>
                <p className="text-xs text-slate-500 mt-0.5">{filteredListings.length} listings · sorted by rent</p>
              </div>
              <div className="flex gap-3 text-xs text-slate-500">
                <a href="/data/innsbruck-listings.csv" download className="text-blue-600 hover:underline">IBK CSV</a>
                <a href="/data/munich-listings.csv" download className="text-blue-600 hover:underline">MUC CSV</a>
                <a href="/data/passau-listings.csv" download className="text-blue-600 hover:underline">PAS CSV</a>
              </div>
            </div>
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-50 z-10">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">City</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Listing</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rent</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Size</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden sm:table-cell">€/m²</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden md:table-cell">Location</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden lg:table-cell">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((l, i) => (
                    <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2 text-slate-500 text-xs">{l.city}</td>
                      <td className="px-4 py-2 text-slate-700 font-medium">{l.title}</td>
                      <td className="px-4 py-2 text-right text-blue-600 font-bold">€{l.rent.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right text-slate-500">{l.sqm ? `${l.sqm} m²` : "—"}</td>
                      <td className="px-4 py-2 text-right text-slate-400 hidden sm:table-cell">{l.sqm ? `€${(l.rent / l.sqm).toFixed(1)}` : "—"}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs hidden md:table-cell">{l.location}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs hidden lg:table-cell">{l.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PBSA Section */}
        {activeSection === "pbsa" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">PBSA Residences</h2>
              <p className="text-xs text-slate-500 mt-0.5">{filteredPBSA.length} residences · {filteredPBSA.reduce((a, p) => a + p.beds, 0).toLocaleString()} beds</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">City</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Name</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Category</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rent Range</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Beds</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden md:table-cell">Operator</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPBSA.map((p, i) => (
                    <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50">
                      <td className="px-4 py-2 text-slate-500 text-xs">{p.city}</td>
                      <td className="px-4 py-2 text-slate-700 font-medium">{p.name}</td>
                      <td className="px-4 py-2"><span className={`text-xs px-2 py-0.5 rounded-full border ${catBg[p.category] || ""}`}>{p.category}</span></td>
                      <td className="px-4 py-2 text-right text-blue-600 font-semibold">€{p.min}{p.min !== p.max ? `–€${p.max}` : ""}</td>
                      <td className="px-4 py-2 text-right text-slate-500">{p.beds}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs hidden md:table-cell">{p.operator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Universities Section */}
        {activeSection === "universities" && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">Universities</h2>
              <p className="text-xs text-slate-500 mt-0.5">{filteredUnis.length} institutions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">City</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">University</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Students</th>
                    <th className="text-right px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">International</th>
                    <th className="text-left px-4 py-2.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold hidden md:table-cell">Focus</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUnis.map((u, i) => (
                    <tr key={i} className="border-t border-slate-50 hover:bg-slate-50/50">
                      <td className="px-4 py-2 text-slate-500 text-xs">{u.city}</td>
                      <td className="px-4 py-2 text-slate-700 font-medium">{u.name}</td>
                      <td className="px-4 py-2 text-right text-slate-600 font-semibold">{u.students}</td>
                      <td className="px-4 py-2 text-right text-slate-500">{u.intl}</td>
                      <td className="px-4 py-2 text-slate-400 text-xs hidden md:table-cell">{u.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sources Section */}
        {activeSection === "sources" && (
          <div className="space-y-4">
            {sources.map((group, gi) => (
              <div key={gi} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">{group.category}</h3>
                </div>
                <div className="p-4 space-y-2">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-slate-700">{item.source}</span>
                        <span className="text-xs text-slate-400 ml-2">{item.scope}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-blue-600">{item.count} records</span>
                        <span className="text-[10px] text-slate-400">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
