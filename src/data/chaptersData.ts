import fs from 'fs';
import path from 'path';

export interface Landmark {
  id: string;
  plateNumber: number;
  chapterNumber: number;
  country: string;
  countryCode: string;
  region: string;
  title: string;
  place: string;
  coordinates: string;
  subjectClassification: string;
  description: string;
  culturalNotes: string;
  illustrationFile: string;
  altText: string;
}

export interface Chapter {
  number: number;
  id: string;
  title: string;
  country: string;
  countryCode: string;
  tagline: string;
  intro: string;
  styleDescription: string;
  startPlate: number;
  endPlate: number;
  accentColor: string;
  palette: {
    wash: string;
    ink: string;
    accent: string;
    secondary: string;
  };
}

// Complete 12 Chapters definition
export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    id: 'singapore',
    country: 'Singapore',
    countryCode: 'SG',
    title: 'CHAPTER 01 — SINGAPORE',
    tagline: 'Equatorial Garden City & Maritime Crossroads',
    intro: 'Where the South China Sea gathers colonial trading quays, lush rain-trees, and glass towers crowned by sky gardens.',
    styleDescription: 'Delicate graphite architecture, tropical foliage borders, warm waterfront washes, and sun-lit harbour light.',
    startPlate: 1,
    endPlate: 9,
    accentColor: '#B8755C',
    palette: { wash: '#E5D6BD', ink: '#2B2721', accent: '#B8755C', secondary: '#69775A' }
  },
  {
    number: 2,
    id: 'japan',
    country: 'Japan',
    countryCode: 'JP',
    title: 'CHAPTER 02 — JAPAN',
    tagline: 'Ancient Shrines, Cedar Groves & Alpine Silence',
    intro: 'Centuries of timber carpentry, moss-covered temple paths, vermilion torii, and snow-capped volcanic ridges.',
    styleDescription: 'Delicate architectural ink lines, pale indigo washes, muted vermilion accents, cherry blossoms, and restrained Japanese travel-journal annotations.',
    startPlate: 10,
    endPlate: 18,
    accentColor: '#C45145',
    palette: { wash: '#E9E2D5', ink: '#242220', accent: '#C45145', secondary: '#4A6B82' }
  },
  {
    number: 3,
    id: 'italy',
    country: 'Italy',
    countryCode: 'IT',
    title: 'CHAPTER 03 — ITALY',
    tagline: 'Sun-Drenched Stone, Marble Domes & Venetian Lagoons',
    intro: 'Terracotta pantiles warmed by two thousand summers, arched loggias, and cypress shadows falling across quiet piazzas.',
    styleDescription: 'Warm terracotta, sun-faded ochre, stone-gray architectural lines, olive branches, and Mediterranean watercolor washes.',
    startPlate: 19,
    endPlate: 27,
    accentColor: '#C26D45',
    palette: { wash: '#EFE3D0', ink: '#2C2520', accent: '#C26D45', secondary: '#8A9A65' }
  },
  {
    number: 4,
    id: 'france',
    country: 'France',
    countryCode: 'FR',
    title: 'CHAPTER 04 — FRANCE',
    tagline: 'Limestone Mansards, Tidal Abbeys & Lavender Fields',
    intro: 'Wrought-iron balconies catching morning Seine light, Gothic flying buttresses, and sea winds whipping past granite promontories.',
    styleDescription: 'Graphite architecture, faded blue-gray skies, muted lavender, fine botanical borders, and elegant French editorial annotations.',
    startPlate: 28,
    endPlate: 36,
    accentColor: '#5C6E87',
    palette: { wash: '#EAE6DC', ink: '#252528', accent: '#5C6E87', secondary: '#8B7B96' }
  },
  {
    number: 5,
    id: 'india',
    country: 'India',
    countryCode: 'IN',
    title: 'CHAPTER 05 — INDIA',
    tagline: 'Carved Sandstone, Sacred River Steps & Spice Coasts',
    intro: 'Monolithic granite boulders resting on ancient riverbeds, marble domes floating at dawn, and fragrant temple courtyards.',
    styleDescription: 'Sandstone ochre, indigo, muted saffron, botanical greens, detailed stonework, and natural watercolor textures.',
    startPlate: 37,
    endPlate: 45,
    accentColor: '#D47E3D',
    palette: { wash: '#EADFC9', ink: '#2B231D', accent: '#D47E3D', secondary: '#486D7A' }
  },
  {
    number: 6,
    id: 'united-states',
    country: 'United States',
    countryCode: 'US',
    title: 'CHAPTER 06 — UNITED STATES',
    tagline: 'Canyon Strata, Granite Monoliths & Suspension Spans',
    intro: 'Two billion years of exposed red earth, towering Pacific sequoias, and cathedrals of riveted suspension steel.',
    styleDescription: 'Sepia field notes, geological pencil marks, faded blue skies, earthy desert washes, and vintage national-park journal details.',
    startPlate: 46,
    endPlate: 54,
    accentColor: '#A3684B',
    palette: { wash: '#EBE2D3', ink: '#2D2823', accent: '#A3684B', secondary: '#5A7D84' }
  },
  {
    number: 7,
    id: 'switzerland',
    country: 'Switzerland',
    countryCode: 'CH',
    title: 'CHAPTER 07 — SWITZERLAND',
    tagline: 'Granite Horns, Alpine Meadows & Medieval Timber',
    intro: 'Glacial cirques carved above pine-scented valleys, timber-covered bridges spanning clear alpine torrents, and sheer limestone walls.',
    styleDescription: 'Fine mountain contours, cold blue-gray washes, evergreen botanical details, and delicate alpine architectural studies.',
    startPlate: 55,
    endPlate: 63,
    accentColor: '#4E6A78',
    palette: { wash: '#E8E8E2', ink: '#1F2428', accent: '#4E6A78', secondary: '#5F7C56' }
  },
  {
    number: 8,
    id: 'egypt',
    country: 'Egypt',
    countryCode: 'EG',
    title: 'CHAPTER 08 — EGYPT',
    tagline: 'Desert Monoliths, Papyrus Columns & Eternal Waters',
    intro: 'Golden limestone rising from desert sands, papyrus columns reflected in the Nile, and sunken rock-cut tombs enduring through millennia.',
    styleDescription: 'Warm desert ochre, mineral blue, architectural linework, sand-textured paper, and restrained historical annotations.',
    startPlate: 64,
    endPlate: 72,
    accentColor: '#C9933B',
    palette: { wash: '#ECE0CA', ink: '#2A2318', accent: '#C9933B', secondary: '#3D6F8D' }
  },
  {
    number: 9,
    id: 'united-kingdom',
    country: 'United Kingdom',
    countryCode: 'GB',
    title: 'CHAPTER 09 — UNITED KINGDOM',
    tagline: 'Weathered Ashlar, Moorland Ridges & Gothic Spires',
    intro: 'Ancient standing stones beneath scudding northern clouds, iron bridges echoing over the Thames, and castle crags towering above coastal firths.',
    styleDescription: 'Muted green countryside, weathered stone, soft gray skies, graphite architecture, and botanical field notes.',
    startPlate: 73,
    endPlate: 81,
    accentColor: '#536D57',
    palette: { wash: '#E5E3DB', ink: '#222624', accent: '#536D57', secondary: '#707785' }
  },
  {
    number: 10,
    id: 'new-zealand',
    country: 'New Zealand',
    countryCode: 'NZ',
    title: 'CHAPTER 10 — NEW ZEALAND',
    tagline: 'Glacial Fjords, Alpine Passes & Native Ferns',
    intro: 'Sheer granite cliffs plummeting into dark southern waters, turquoise glacial lakes reflecting snow fields, and rolling emerald valleys.',
    styleDescription: 'Alpine greens, glacial blues, soft mist, topographical linework, and delicate native botanical motifs.',
    startPlate: 82,
    endPlate: 90,
    accentColor: '#3F716F',
    palette: { wash: '#E4EAE6', ink: '#1C2625', accent: '#3F716F', secondary: '#5F8257' }
  },
  {
    number: 11,
    id: 'turkey',
    country: 'Turkey',
    countryCode: 'TR',
    title: 'CHAPTER 11 — TURKEY',
    tagline: 'Byzantine Domes, Tufa Spires & Bosphorus Straits',
    intro: 'Pencil-thin minarets punctuating the Golden Horn skyline, fairy chimneys carved by volcanic ash, and marble porticos echoing ancient assemblies.',
    styleDescription: 'Warm limestone, faded turquoise, dusty rose, domed architectural silhouettes, and detailed historic street studies.',
    startPlate: 91,
    endPlate: 99,
    accentColor: '#43838E',
    palette: { wash: '#EDE5D5', ink: '#28231E', accent: '#43838E', secondary: '#B06B68' }
  },
  {
    number: 12,
    id: 'indonesia',
    country: 'Indonesia',
    countryCode: 'ID',
    title: 'CHAPTER 12 — INDONESIA',
    tagline: 'Volcanic Calderas, Stone Stupas & Equatorial Reefs',
    intro: 'Volcanic andesite stupas emerging from morning jungle mist, wave-beaten sea shrines perched on craggy promontories, and stepped rice terraces.',
    styleDescription: 'Tropical botanical studies, volcanic landscapes, muted emerald greens, volcanic gray, and ocean-blue watercolor washes.',
    startPlate: 100,
    endPlate: 108,
    accentColor: '#4B7757',
    palette: { wash: '#E4E6DD', ink: '#202621', accent: '#4B7757', secondary: '#486E78' }
  }
];
