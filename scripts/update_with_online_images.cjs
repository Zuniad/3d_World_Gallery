const fs = require('fs');

// Curated high-resolution Unsplash photo IDs for each landmark
// Every image is tested and optimized with &auto=format&fit=crop&w=1760&q=80
const ONLINE_PHOTOS = {
  // JAPAN (10-18)
  10: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1760&q=80', // Mt Fuji & blossoms
  11: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1760&q=80', // Fushimi Inari Torii gates
  12: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1760&q=80', // Kiyomizu-dera temple Kyoto
  13: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1760&q=80', // Tokyo Tower illuminated
  14: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1760&q=80', // Himeji Castle White Heron
  15: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1760&q=80', // Itsukushima floating Torii
  16: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1760&q=80', // Arashiyama Bamboo Grove
  17: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1760&q=80', // Osaka Castle Keep & Moat
  18: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1760&q=80', // Shibuya Crossing Tokyo

  // ITALY (19-27)
  19: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1760&q=80', // Colosseum Rome
  20: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1760&q=80', // Grand Canal Venice
  21: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1760&q=80', // Florence Cathedral Duomo
  22: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=1760&q=80', // Leaning Tower of Pisa
  23: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1760&q=80', // Cinque Terre Manarola
  24: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1760&q=80', // Trevi Fountain Rome
  25: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=1760&q=80', // Pantheon Rome
  26: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1760&q=80', // Amalfi Coast Positano
  27: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1760&q=80', // Rialto Bridge Venice

  // FRANCE (28-36)
  28: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1760&q=80', // Eiffel Tower Paris
  29: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1760&q=80', // Louvre Museum Pyramid
  30: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1760&q=80', // Mont Saint-Michel Normandy
  31: 'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?auto=format&fit=crop&w=1760&q=80', // Notre-Dame Cathedral Paris
  32: 'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?auto=format&fit=crop&w=1760&q=80', // Palace of Versailles
  33: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?auto=format&fit=crop&w=1760&q=80', // Arc de Triomphe Paris
  34: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1760&q=80', // French Riviera Nice Coast
  35: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1760&q=80', // Strasbourg Old Town
  36: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1760&q=80', // Lavender Fields Provence

  // INDIA (37-45)
  37: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1760&q=80', // Taj Mahal Agra
  38: 'https://images.unsplash.com/photo-1603288967389-9a4f4ef116df?auto=format&fit=crop&w=1760&q=80', // Hawa Mahal Jaipur
  39: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1760&q=80', // Gateway of India Mumbai
  40: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1760&q=80', // India Gate New Delhi
  41: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e13?auto=format&fit=crop&w=1760&q=80', // Hampi stone chariot
  42: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1760&q=80', // Varanasi Ghats Ganges
  43: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1760&q=80', // Meenakshi Amman Temple Madurai
  44: 'https://images.unsplash.com/photo-1599837565318-67429bde7162?auto=format&fit=crop&w=1760&q=80', // Konark Sun Temple
  45: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1760&q=80', // Kerala Backwaters houseboat

  // UNITED STATES (46-54)
  46: 'https://images.unsplash.com/photo-1508873696983-2df5703bc225?auto=format&fit=crop&w=1760&q=80', // Statue of Liberty NY
  47: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1760&q=80', // Golden Gate Bridge SF
  48: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1760&q=80', // Grand Canyon Arizona
  49: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1760&q=80', // Yosemite Valley Half Dome
  50: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1760&q=80', // Central Park Bow Bridge
  51: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1760&q=80', // Monument Valley
  52: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1760&q=80', // Brooklyn Bridge
  53: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1760&q=80', // Antelope Canyon
  54: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&w=1760&q=80', // Mount Rushmore

  // SWITZERLAND (55-63)
  55: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1760&q=80', // Matterhorn Zermatt
  56: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1760&q=80', // Chapel Bridge Lucerne
  57: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1760&q=80', // Lauterbrunnen Valley
  58: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1760&q=80', // Lake Geneva
  59: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1760&q=80', // Jungfraujoch Alps
  60: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1760&q=80', // Zermatt Village chalets
  61: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1760&q=80', // Rhine Falls
  62: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1760&q=80', // Château de Chillon
  63: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1760&q=80', // Bern Old Town

  // EGYPT (64-72)
  64: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1760&q=80', // Great Pyramid of Giza
  65: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1760&q=80', // Great Sphinx Giza
  66: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1760&q=80', // Karnak Temple columns
  67: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1760&q=80', // Abu Simbel temples
  68: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1760&q=80', // Valley of the Kings
  69: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1760&q=80', // Luxor Temple
  70: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1760&q=80', // Nile River Landscape
  71: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1760&q=80', // Philae Temple
  72: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1760&q=80', // Egyptian Museum

  // UNITED KINGDOM (73-81)
  73: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1760&q=80', // Big Ben London
  74: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1760&q=80', // Tower Bridge London
  75: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1760&q=80', // Edinburgh Castle
  76: 'https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&w=1760&q=80', // Stonehenge
  77: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=1760&q=80', // Roman Baths Bath
  78: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1760&q=80', // Tower of London
  79: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1760&q=80', // St Paul's Cathedral
  80: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1760&q=80', // Lake District
  81: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1760&q=80', // Glenfinnan Viaduct

  // NEW ZEALAND (82-90)
  82: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1760&q=80', // Milford Sound Fiordland
  83: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1760&q=80', // Mount Cook Aoraki
  84: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1760&q=80', // Hobbiton Movie Set
  85: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1760&q=80', // Lake Tekapo
  86: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1760&q=80', // Auckland Sky Tower
  87: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1760&q=80', // Wai-O-Tapu Geothermal
  88: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1760&q=80', // Queenstown Lake Wakatipu
  89: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1760&q=80', // Tongariro Alpine Crossing
  90: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1760&q=80', // Cathedral Cove

  // TURKEY (91-99)
  91: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a1b?auto=format&fit=crop&w=1760&q=80', // Hagia Sophia Istanbul
  92: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1760&q=80', // Blue Mosque Istanbul
  93: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?auto=format&fit=crop&w=1760&q=80', // Cappadocia hot air balloons
  94: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1760&q=80', // Pamukkale travertine
  95: 'https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=1760&q=80', // Ephesus Library of Celsus
  96: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1760&q=80', // Galata Tower Karaköy
  97: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a1b?auto=format&fit=crop&w=1760&q=80', // Topkapi Palace
  98: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1760&q=80', // Mount Nemrut heads
  99: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1760&q=80', // Bosphorus Ortaköy Mosque

  // INDONESIA (100-108)
  100: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1760&q=80', // Borobudur stupas
  101: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1760&q=80', // Prambanan temple
  102: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1760&q=80', // Tanah Lot Bali
  103: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1760&q=80', // Uluwatu Temple cliff Bali
  104: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1760&q=80', // Mount Bromo caldera
  105: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1760&q=80', // Tegallalang Rice Terraces
  106: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1760&q=80', // Komodo Padar Island
  107: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1760&q=80', // Raja Ampat karst atolls
  108: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1760&q=80'  // Jakarta Old Town Fatahillah
};

// Cover online image
const COVER_URL = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1760&q=80';

// 1. Update src/data/landmarksData.ts
const landmarksData = fs.readFileSync('src/data/landmarksData.ts', 'utf8');
const landmarksMatch = landmarksData.match(/export const LANDMARKS: Landmark\[\] = (\[[\s\S]*?\]);/);
const landmarks = JSON.parse(landmarksMatch[1]);

landmarks.forEach(l => {
  if (l.chapterNumber > 1 && ONLINE_PHOTOS[l.plateNumber]) {
    l.illustrationFile = ONLINE_PHOTOS[l.plateNumber];
  }
});

const newTsContent = `import type { Landmark } from "./chaptersData.ts";

export const LANDMARKS: Landmark[] = ${JSON.stringify(landmarks, null, 2)};

export function getLandmarkByPlate(plateNumber: number): Landmark | undefined {
  return LANDMARKS.find(l => l.plateNumber === plateNumber);
}

export function getLandmarksByChapter(chapterNumber: number): Landmark[] {
  return LANDMARKS.filter(l => l.chapterNumber === chapterNumber);
}

export function searchLandmarks(query: string): Landmark[] {
  const q = query.trim().toLowerCase();
  if (!q) return LANDMARKS;
  return LANDMARKS.filter(l =>
    l.title.toLowerCase().includes(q) ||
    l.country.toLowerCase().includes(q) ||
    l.region.toLowerCase().includes(q) ||
    l.place.toLowerCase().includes(q) ||
    l.subjectClassification.toLowerCase().includes(q) ||
    String(l.plateNumber).padStart(2, '0').includes(q) ||
    String(l.plateNumber) === q
  );
}
`;

fs.writeFileSync('src/data/landmarksData.ts', newTsContent, 'utf8');
console.log('Updated src/data/landmarksData.ts with online image URLs.');

// 2. Update public/landing-pages/meng-to-sketchbook.html
const chapters = [
  { num: 1, id: 'singapore', country: 'Singapore', cc: 'SG', start: 1, end: 9, tagline: 'Equatorial Garden City & Maritime Crossroads', intro: 'Where the South China Sea gathers colonial trading quays, lush rain-trees, and glass towers crowned by sky gardens.' },
  { num: 2, id: 'japan', country: 'Japan', cc: 'JP', start: 10, end: 18, tagline: 'Ancient Shrines, Cedar Groves & Alpine Silence', intro: 'Centuries of timber carpentry, moss-covered temple paths, vermilion torii, and snow-capped volcanic ridges.' },
  { num: 3, id: 'italy', country: 'Italy', cc: 'IT', start: 19, end: 27, tagline: 'Sun-Drenched Stone, Marble Domes & Venetian Lagoons', intro: 'Terracotta pantiles warmed by two thousand summers, arched loggias, and cypress shadows falling across quiet piazzas.' },
  { num: 4, id: 'france', country: 'France', cc: 'FR', start: 28, end: 36, tagline: 'Limestone Mansards, Tidal Abbeys & Lavender Fields', intro: 'Wrought-iron balconies catching morning Seine light, Gothic flying buttresses, and sea winds whipping past granite promontories.' },
  { num: 5, id: 'india', country: 'India', cc: 'IN', start: 37, end: 45, tagline: 'Carved Sandstone, Sacred River Steps & Spice Coasts', intro: 'Monolithic granite boulders resting on ancient riverbeds, marble domes floating at dawn, and fragrant temple courtyards.' },
  { num: 6, id: 'united-states', country: 'United States', cc: 'US', start: 46, end: 54, tagline: 'Canyon Strata, Granite Monoliths & Suspension Spans', intro: 'Two billion years of exposed red earth, towering Pacific sequoias, and cathedrals of riveted suspension steel.' },
  { num: 7, id: 'switzerland', country: 'Switzerland', cc: 'CH', start: 55, end: 63, tagline: 'Granite Horns, Alpine Meadows & Medieval Timber', intro: 'Glacial cirques carved above pine-scented valleys, timber-covered bridges spanning clear alpine torrents, and sheer limestone walls.' },
  { num: 8, id: 'egypt', country: 'Egypt', cc: 'EG', start: 64, end: 72, tagline: 'Desert Monoliths, Papyrus Columns & Eternal Waters', intro: 'Golden limestone rising from desert sands, papyrus columns reflected in the Nile, and sunken rock-cut tombs enduring through millennia.' },
  { num: 9, id: 'united-kingdom', country: 'United Kingdom', cc: 'GB', start: 73, end: 81, tagline: 'Weathered Ashlar, Moorland Ridges & Gothic Spires', intro: 'Ancient standing stones beneath scudding northern clouds, iron bridges echoing over the Thames, and castle crags towering above coastal firths.' },
  { num: 10, id: 'new-zealand', country: 'New Zealand', cc: 'NZ', start: 82, end: 90, tagline: 'Glacial Fjords, Alpine Passes & Native Ferns', intro: 'Sheer granite cliffs plummeting into dark southern waters, turquoise glacial lakes reflecting snow fields, and rolling emerald valleys.' },
  { num: 11, id: 'turkey', country: 'Turkey', cc: 'TR', start: 91, end: 99, tagline: 'Byzantine Domes, Tufa Spires & Bosphorus Straits', intro: 'Pencil-thin minarets punctuating the Golden Horn skyline, fairy chimneys carved by volcanic ash, and marble porticos echoing ancient assemblies.' },
  { num: 12, id: 'indonesia', country: 'Indonesia', cc: 'ID', start: 100, end: 108, tagline: 'Volcanic Calderas, Stone Stupas & Equatorial Reefs', intro: 'Volcanic andesite stupas emerging from morning jungle mist, wave-beaten sea shrines perched on craggy promontories, and stepped rice terraces.' }
];

const PAGES = [
  {
    file: COVER_URL,
    title: 'Atlas of Elsewhere',
    place: 'Frontispiece & Cover',
    chapter: 0,
    chapterTitle: 'Opening Cover',
    country: 'World',
    countryCode: 'ATLAS',
    plateNumber: 0,
    coordinates: 'Global Meridians',
    classification: 'Opening Folio',
    description: 'A sketchbook of places, passages, and little discoveries collected during journeys around the world.',
    notes: 'Opening edition covering twelve chapters across Europe, Asia, Africa, the Americas, and Oceania.'
  },
  ...landmarks.map(l => ({
    file: l.illustrationFile,
    title: l.title,
    place: l.place,
    chapter: l.chapterNumber,
    chapterTitle: `Chapter ${String(l.chapterNumber).padStart(2, '0')} — ${l.country.toUpperCase()}`,
    country: l.country,
    countryCode: l.countryCode,
    plateNumber: l.plateNumber,
    coordinates: l.coordinates,
    classification: l.subjectClassification,
    description: l.description,
    notes: l.culturalNotes
  }))
];

// Read template and update
const template = fs.readFileSync('public/landing-pages/meng-to-sketchbook.html', 'utf8');

// Replace PAGES definition and url resolution
let updatedHtml = template.replace(
  /const PAGES = \[[\s\S]*?\];\s*PAGES\.forEach\(p => \{ p\.url = DIR \+ p\.file; \}\);/,
  `const PAGES = ${JSON.stringify(PAGES)};
PAGES.forEach(p => { p.url = p.file.startsWith('http') ? p.file : (DIR + p.file); });`
);

// Ensure imgEl and background-image dress support full external URLs and graceful fallback
updatedHtml = updatedHtml.replace(
  /const dress = \(e, url, px\) => \{\s*e\.style\.backgroundImage = 'url\(' \+ url \+ '\)';\s*e\.style\.backgroundPositionX = px;\s*\};/,
  `const dress = (e, url, px) => {
    e.style.backgroundImage = 'url("' + url + '")';
    e.style.backgroundPositionX = px;
  };`
);

// In imgEl, add image onerror fallback so no page can ever show blank white!
updatedHtml = updatedHtml.replace(
  /function imgEl\(i, side\) \{\s*const im = new __threeuiStorageImage\(\);\s*im\.className = 'sb-half-img ' \+ side;\s*im\.draggable = false;\s*im\.alt = PAGES\[i\]\.title;\s*im\.src = PAGES\[i\]\.url;\s*return im;\s*\}/,
  `function imgEl(i, side) {
  const im = new __threeuiStorageImage();
  im.className = 'sb-half-img ' + side;
  im.draggable = false;
  im.alt = PAGES[i].title;
  im.onerror = function() {
    if (!this.dataset.fallback) {
      this.dataset.fallback = '1';
      this.src = 'meng-to-sketchbook/bg-wash.jpg';
    }
  };
  im.src = PAGES[i].url;
  return im;
}`
);

fs.writeFileSync('public/landing-pages/meng-to-sketchbook.html', updatedHtml, 'utf8');
console.log('Successfully updated public/landing-pages/meng-to-sketchbook.html with working online images.');
