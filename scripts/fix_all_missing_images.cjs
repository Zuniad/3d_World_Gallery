const fs = require('fs');

const REPLACEMENTS = {
  16: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1760&q=80', // Arashiyama Bamboo Grove
  38: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1760&q=80', // Hawa Mahal Jaipur
  41: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1760&q=80', // Hampi Monuments
  46: 'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?auto=format&fit=crop&w=1760&q=80', // Statue of Liberty
  63: 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?auto=format&fit=crop&w=1760&q=80', // Bern Old Town
  86: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1760&q=80', // Auckland Sky Tower
  91: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1760&q=80', // Hagia Sophia
  97: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1760&q=80'  // Topkapi Palace
};

// Update src/data/landmarksData.ts
const text = fs.readFileSync('src/data/landmarksData.ts', 'utf8');
const match = text.match(/export const LANDMARKS: Landmark\[\] = (\[[\s\S]*?\]);/);
const landmarks = JSON.parse(match[1]);

landmarks.forEach(l => {
  if (REPLACEMENTS[l.plateNumber]) {
    l.illustrationFile = REPLACEMENTS[l.plateNumber];
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
console.log('Fixed landmarks in src/data/landmarksData.ts');

// Also update public/landing-pages/meng-to-sketchbook.html
const COVER_URL = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1760&q=80';

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

let html = fs.readFileSync('public/landing-pages/meng-to-sketchbook.html', 'utf8');

// Replace PAGES JSON in html
html = html.replace(
  /const PAGES = \[[\s\S]*?\];\s*PAGES\.forEach/,
  `const PAGES = ${JSON.stringify(PAGES)};\nPAGES.forEach`
);

fs.writeFileSync('public/landing-pages/meng-to-sketchbook.html', html, 'utf8');
console.log('Updated public/landing-pages/meng-to-sketchbook.html with fixed images.');
