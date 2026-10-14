import React from 'react';
import { X, ChevronRight, MapPin, Palette } from 'lucide-react';
import { CHAPTERS, type Chapter } from '../data/chaptersData.ts';

interface ChapterDrawerProps {
  isOpen: boolean;
  activeChapterNumber: number;
  onClose: () => void;
  onSelectChapter: (chapterNumber: number) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  isOpen,
  activeChapterNumber,
  onClose,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl h-full bg-[#1e1a16] border-l border-[#3a3229] text-[#F3EBDD] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#3a3229] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B8755C] font-semibold">
              Curated Geographic Chapters
            </span>
            <h2 className="font-display text-2xl md:text-3xl tracking-wide text-[#F3EBDD] mt-1">
              Twelve Countries
            </h2>
            <p className="font-body italic text-sm text-[#a99c8d] mt-1">
              Select a chapter to turn the sketchbook to its opening plate.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#2a241f] hover:bg-[#383029] text-[#e6ded2] transition-colors"
            aria-label="Close chapter drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {CHAPTERS.map((ch: Chapter) => {
            const isActive = ch.number === activeChapterNumber;
            return (
              <div
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.number);
                  onClose();
                }}
                className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? 'bg-[#2b241e] border-[#B8755C] shadow-lg shadow-[#B8755C]/10'
                    : 'bg-[#25201b] border-[#383028] hover:border-[#524436] hover:bg-[#2e2721]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#B8755C]">
                        Chapter {String(ch.number).padStart(2, '0')}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#383028] text-[#a99c8d]">
                        {ch.countryCode}
                      </span>
                      <span className="text-xs text-[#8f8273]">
                        Plates {String(ch.startPlate).padStart(3, '0')}–{String(ch.endPlate).padStart(3, '0')}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-[#F3EBDD] group-hover:text-[#B8755C] transition-colors mt-1">
                      {ch.country}
                    </h3>
                    <p className="font-body text-xs font-semibold text-[#c7b9a5] mt-0.5">
                      {ch.tagline}
                    </p>
                    <p className="font-body italic text-sm text-[#a99c8d] mt-2 line-clamp-2">
                      {ch.intro}
                    </p>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#383028]/80 text-[11px] text-[#8e8172]">
                      <Palette className="w-3.5 h-3.5 text-[#B8755C]" />
                      <span className="line-clamp-1">{ch.styleDescription}</span>
                    </div>
                  </div>

                  <div className="shrink-0 self-center">
                    <div className="w-8 h-8 rounded-full bg-[#332b23] group-hover:bg-[#B8755C] group-hover:text-white text-[#a99c8d] flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
