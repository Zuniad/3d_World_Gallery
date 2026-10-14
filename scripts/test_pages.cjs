const fs = require('fs');
const path = require('path');

// Read the canonical meng-to-sketchbook.html
const rawHtml = fs.readFileSync('public/landing-pages/meng-to-sketchbook.html', 'utf8');

// Load landmarks and chapters
const landmarksData = fs.readFileSync('src/data/landmarksData.ts', 'utf8');
const landmarksMatch = landmarksData.match(/export const LANDMARKS: Landmark\[\] = (\[[\s\S]*?\]);/);
const landmarks = JSON.parse(landmarksMatch[1]);

console.log('Loaded landmarks count:', landmarks.length);

// Build pages array for the sketchbook engine:
// Index 0: Cover
// Index 1..108: Landmarks
const PAGES = [
  {
    file: 'plates/cover.svg',
    title: 'Atlas of Elsewhere',
    place: 'Frontispiece',
    chapter: 0,
    chapterTitle: 'Opening Cover',
    country: 'Global',
    plateNumber: 0,
    coordinates: 'Earth • Equatorial & Polar Meridians',
    description: 'A sketchbook of places, passages, and little discoveries collected during journeys around the world.'
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

console.log('Total sketchbook pages (Cover + 108 Plates):', PAGES.length);
