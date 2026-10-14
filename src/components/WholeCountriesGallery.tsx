import React, { useState, useMemo } from 'react';
import { Search, MapPin, Globe, Filter, BookOpen, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { LANDMARKS } from '../data/landmarksData.ts';
import { CHAPTERS, type Landmark } from '../data/chaptersData.ts';

interface WholeCountriesGalleryProps {
  activePlateNumber: number;
  onOpenPlateInSketchbook: (plateNumber: number) => void;
  onOpenPlateModal: (landmark: Landmark) => void;
}

const CATEGORIES = [
  'All Types',
  'Sacred Architecture',
  'Modern Waterfront',
  'Alpine Geology',
  'Historic Fortress',
  'Classical Domes',
  'Bridge & Spire',
  'Coastal Landscape'
];

export const WholeCountriesGallery: React.FC<WholeCountriesGalleryProps> = ({
  activePlateNumber,
  onOpenPlateInSketchbook,
  onOpenPlateModal,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Types');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLandmarks = useMemo(() => {
    return LANDMARKS.filter((l: Landmark) => {
      const matchCountry = selectedCountry === 'ALL' || l.countryCode === selectedCountry;
      const matchCategory =
        selectedCategory === 'All Types' ||
        l.subjectClassification.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5));

      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.place.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.subjectClassification.toLowerCase().includes(q) ||
        String(l.plateNumber) === q ||
        String(l.plateNumber).padStart(3, '0').includes(q);

      return matchCountry && matchCategory && matchSearch;
    });
  }, [selectedCountry, selectedCategory, searchQuery]);

  return (
    <section id="whole-gallery" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      {/* Gallery Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8755C]/15 border border-[#B8755C]/30 text-xs font-semibold text-[#B8755C] uppercase tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Global Exhibition</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F3EBDD] tracking-wide">
          Whole Countries Gallery Art
        </h2>
        <p className="font-body text-lg italic text-[#c9bcae] mt-2">
          A complete compendium of 108 architectural studies, landscape drawings, and cultural plates across twelve nations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#241f1a] border border-[#3d3328] rounded-2xl p-4 sm:p-6 mb-10 shadow-xl space-y-4">
        {/* Top row: Search and count */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a99c8d]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 108 artworks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1a1612] border border-[#42372c] text-sm text-[#F3EBDD] placeholder:text-[#8a7e70] placeholder:italic focus:outline-none focus:border-[#B8755C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a99c8d] hover:text-[#F3EBDD]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-[#a99c8d] flex items-center gap-3">
            <span>Showing <strong>{filteredLandmarks.length}</strong> of 108 artworks</span>
            {(selectedCountry !== 'ALL' || selectedCategory !== 'All Types' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCountry('ALL');
                  setSelectedCategory('All Types');
                  setSearchQuery('');
                }}
                className="text-[#B8755C] hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Country Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCountry('ALL')}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors font-medium ${
              selectedCountry === 'ALL'
                ? 'bg-[#B8755C] text-white shadow'
                : 'bg-[#1e1915] text-[#b3a595] hover:bg-[#332a21] hover:text-[#F3EBDD]'
            }`}
          >
            All Countries (12)
          </button>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.countryCode}
              onClick={() => setSelectedCountry(ch.countryCode)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors font-medium ${
                selectedCountry === ch.countryCode
                  ? 'bg-[#B8755C] text-white shadow'
                  : 'bg-[#1e1915] text-[#b3a595] hover:bg-[#332a21] hover:text-[#F3EBDD]'
              }`}
            >
              {ch.countryCode} • {ch.country}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] pt-1 border-t border-[#332b22]">
          <span className="text-[#8e8172] mr-1 hidden sm:inline">Theme:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#524335] text-[#F3EBDD] font-medium'
                  : 'bg-[#181410] text-[#8e8172] hover:text-[#e8ded1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLandmarks.map((landmark: Landmark) => {
          const isActive = landmark.plateNumber === activePlateNumber;
          const imgSrc = landmark.illustrationFile.startsWith('http')
            ? landmark.illustrationFile
            : `/landing-pages/meng-to-sketchbook/${landmark.illustrationFile}`;

          return (
            <div
              key={landmark.id}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-md ${
                isActive
                  ? 'bg-[#2b241e] border-[#B8755C] ring-2 ring-[#B8755C]/40 shadow-[#B8755C]/15 -translate-y-1'
                  : 'bg-[#211b16] border-[#383028] hover:border-[#5a4c3e] hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Artwork Thumbnail */}
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-[#181410] cursor-pointer"
                  onClick={() => onOpenPlateInSketchbook(landmark.plateNumber)}
                >
                  <img
                    src={imgSrc}
                    alt={landmark.altText}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none"></div>

                  {/* Header badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-[10px] font-semibold text-[#B8755C] border border-[#B8755C]/40">
                      PLATE {String(landmark.plateNumber).padStart(3, '0')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-[10px] font-medium text-[#c9bcae]">
                      {landmark.countryCode}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs text-white/90">
                    <span className="flex items-center gap-1 truncate font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#B8755C] shrink-0" />
                      {landmark.place}, {landmark.country}
                    </span>
                  </div>
                </div>

                {/* Card Title & Content */}
                <div className="p-4">
                  <h4 className="font-display text-lg text-[#F3EBDD] group-hover:text-[#B8755C] transition-colors leading-snug line-clamp-1">
                    {landmark.title}
                  </h4>

                  <span className="inline-block text-[10px] uppercase tracking-wider text-[#a99c8d] mt-1 font-semibold truncate max-w-full">
                    {landmark.subjectClassification}
                  </span>

                  <p className="font-body text-xs italic text-[#c9bcae] mt-2 line-clamp-2 leading-relaxed">
                    “{landmark.description}”
                  </p>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 pt-0 border-t border-[#332b22] mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenPlateModal(landmark)}
                  className="text-[11px] text-[#a99c8d] hover:text-[#F3EBDD] transition-colors flex items-center gap-1 py-1"
                >
                  <BookOpen className="w-3 h-3 text-[#B8755C]" />
                  <span>Notes</span>
                </button>

                <button
                  onClick={() => onOpenPlateInSketchbook(landmark.plateNumber)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                    isActive
                      ? 'bg-[#B8755C] text-white shadow'
                      : 'bg-[#332b22] text-[#e8ded1] hover:bg-[#B8755C] hover:text-white'
                  }`}
                >
                  <span>{isActive ? 'In Sketchbook' : 'Open in 3D'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLandmarks.length === 0 && (
        <div className="py-20 text-center text-[#a99c8d]">
          <Layers className="w-10 h-10 mx-auto text-[#5a4d40] mb-3" />
          <h3 className="font-display text-2xl text-[#F3EBDD]">No artworks match your filter</h3>
          <p className="font-body italic text-sm mt-1">Try another keyword or select All Countries.</p>
        </div>
      )}
    </section>
  );
};
