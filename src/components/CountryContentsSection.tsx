import React from 'react';
import { MapPin, Compass, BookOpen, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { CHAPTERS, type Chapter, type Landmark } from '../data/chaptersData.ts';
import { getLandmarksByChapter } from '../data/landmarksData.ts';

interface CountryContentsSectionProps {
  activeChapterNumber: number;
  activePlateNumber: number;
  onSelectCountry: (chapterNumber: number) => void;
  onOpenPlateInSketchbook: (plateNumber: number) => void;
  onOpenPlateModal: (landmark: Landmark) => void;
}

export const CountryContentsSection: React.FC<CountryContentsSectionProps> = ({
  activeChapterNumber,
  activePlateNumber,
  onSelectCountry,
  onOpenPlateInSketchbook,
  onOpenPlateModal,
}) => {
  // If chapter 0 (cover), default to chapter 1 (Singapore)
  const effectiveChapterNumber = activeChapterNumber === 0 ? 1 : activeChapterNumber;
  const currentChapter = CHAPTERS.find((c: Chapter) => c.number === effectiveChapterNumber) || CHAPTERS[0];
  const countryLandmarks = getLandmarksByChapter(effectiveChapterNumber);

  return (
    <section id="country-contents" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
      {/* Country Header & Bio Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2a231b] via-[#241e18] to-[#1c1814] border border-[#4a3e31] p-6 sm:p-10 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-[#B8755C]/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#B8755C] text-white font-semibold text-xs uppercase tracking-wider">
                CHAPTER {String(currentChapter.number).padStart(2, '0')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#383028] text-[#c9bcae] text-xs font-mono font-semibold">
                {currentChapter.countryCode}
              </span>
              <span className="text-xs text-[#a99c8d]">
                Plates {String(currentChapter.startPlate).padStart(3, '0')}–{String(currentChapter.endPlate).padStart(3, '0')} (9 Studies)
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-[#F3EBDD] tracking-wide mt-3">
              {currentChapter.country}
            </h2>

            <p className="font-body text-lg italic text-[#B8755C] mt-1">
              {currentChapter.tagline}
            </p>

            <p className="font-body text-base text-[#d6c9b8] mt-3 max-w-3xl leading-relaxed">
              {currentChapter.intro}
            </p>

            <div className="mt-4 pt-4 border-t border-[#3d3328] flex items-center gap-2 text-xs text-[#a99c8d]">
              <Sparkles className="w-4 h-4 text-[#B8755C]" />
              <span><strong>Artistic Direction:</strong> {currentChapter.styleDescription}</span>
            </div>
          </div>

          {/* Quick Country Switcher Bar */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <span className="text-[11px] uppercase tracking-widest text-[#a99c8d] font-semibold">
              Switch Country:
            </span>
            <div className="flex flex-wrap gap-1.5 max-w-xs">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => onSelectCountry(ch.number)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    ch.number === effectiveChapterNumber
                      ? 'bg-[#B8755C] text-white font-semibold shadow'
                      : 'bg-[#332b22] text-[#c4b6a4] hover:bg-[#453b30] hover:text-[#F3EBDD]'
                  }`}
                  title={ch.country}
                >
                  {ch.countryCode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of the 9 Landmarks for this specific country */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-2xl text-[#F3EBDD]">
          {currentChapter.country} Illustrated Studies ({countryLandmarks.length} Plates)
        </h3>
        <span className="text-xs text-[#a99c8d] italic">
          Click any plate to turn the 3D sketchbook
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countryLandmarks.map((landmark: Landmark) => {
          const isActive = landmark.plateNumber === activePlateNumber;
          const imgSrc = landmark.illustrationFile.startsWith('http')
            ? landmark.illustrationFile
            : `/landing-pages/meng-to-sketchbook/${landmark.illustrationFile}`;

          return (
            <div
              key={landmark.id}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg ${
                isActive
                  ? 'bg-[#2b241e] border-[#B8755C] ring-2 ring-[#B8755C]/40 shadow-[#B8755C]/15 -translate-y-1'
                  : 'bg-[#211b16] border-[#383028] hover:border-[#5a4c3e] hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Artwork image container */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-[#181410] cursor-pointer"
                  onClick={() => onOpenPlateInSketchbook(landmark.plateNumber)}
                >
                  <img
                    src={imgSrc}
                    alt={landmark.altText}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/landing-pages/meng-to-sketchbook/bg-wash.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

                  {/* Badges on artwork */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-[11px] font-semibold text-[#B8755C] border border-[#B8755C]/40">
                      PLATE {String(landmark.plateNumber).padStart(3, '0')}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <span className="flex items-center gap-1 truncate font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#B8755C] shrink-0" />
                      {landmark.place}
                    </span>
                    <span className="font-mono text-[10px] text-[#e3d7c7] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {landmark.coordinates}
                    </span>
                  </div>
                </div>

                {/* Card description body */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-xl text-[#F3EBDD] group-hover:text-[#B8755C] transition-colors leading-snug">
                      {landmark.title}
                    </h4>
                  </div>

                  <p className="text-xs uppercase tracking-wider text-[#a99c8d] mt-1 font-semibold">
                    {landmark.subjectClassification}
                  </p>

                  <p className="font-body text-sm italic text-[#c9bcae] mt-3 line-clamp-3 leading-relaxed">
                    “{landmark.description}”
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-[#332b22] mt-2 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenPlateModal(landmark)}
                  className="text-xs text-[#a99c8d] hover:text-[#F3EBDD] transition-colors flex items-center gap-1 py-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#B8755C]" />
                  <span>Curator Notes</span>
                </button>

                <button
                  onClick={() => onOpenPlateInSketchbook(landmark.plateNumber)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#B8755C] text-white shadow-md'
                      : 'bg-[#332b22] text-[#e8ded1] hover:bg-[#B8755C] hover:text-white'
                  }`}
                >
                  <span>{isActive ? 'Current Plate' : 'View in 3D'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
