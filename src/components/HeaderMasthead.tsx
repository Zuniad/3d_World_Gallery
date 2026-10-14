import React from 'react';
import { BookOpen, Compass, Search, Info, Globe, Layers, Eye } from 'lucide-react';
import type { Chapter } from '../data/chaptersData.ts';

interface HeaderMastheadProps {
  currentChapter: Chapter | undefined;
  plateNumber: number;
  totalPlates: number;
  onOpenChapters: () => void;
  onOpenIndex: () => void;
  onOpenSearch: () => void;
  onOpenInfo: () => void;
  onGoToCover: () => void;
}

export const HeaderMasthead: React.FC<HeaderMastheadProps> = ({
  currentChapter,
  plateNumber,
  totalPlates,
  onOpenChapters,
  onOpenIndex,
  onOpenSearch,
  onOpenInfo,
  onGoToCover,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#241f1a]/90 backdrop-blur-md border-b border-[#3d342c] text-[#F3EBDD] px-4 md:px-8 py-3 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onGoToCover}
            className="text-left group flex items-center gap-3 focus:outline-none"
            title="Return to Cover"
          >
            <div className="w-9 h-9 rounded-full bg-[#3d3328] border border-[#5a4c3e] flex items-center justify-center text-[#B8755C] group-hover:bg-[#B8755C] group-hover:text-[#F3EBDD] transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl md:text-2xl tracking-wider text-[#F3EBDD] group-hover:text-[#B8755C] transition-colors">
                  ATLAS OF ELSEWHERE
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest bg-[#3d3328] text-[#B8755C] rounded-full border border-[#524436]">
                  Global Edition
                </span>
              </div>
              <p className="font-body italic text-xs text-[#a99c8d] hidden md:block">
                A sketchbook of places, passages, and little discoveries
              </p>
            </div>
          </button>
        </div>

        {/* Center Current Chapter & Plate indicator */}
        <div className="hidden lg:flex items-center gap-3 bg-[#1d1915] px-4 py-1.5 rounded-full border border-[#3d3328]">
          <span className="text-xs uppercase tracking-widest text-[#B8755C] font-semibold">
            {plateNumber === 0 ? 'Frontispiece' : `Plate ${String(plateNumber).padStart(3, '0')} of ${totalPlates}`}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#5a4d40]"></span>
          <span className="text-xs text-[#d1c5b4]">
            {currentChapter ? `${currentChapter.country} (${currentChapter.countryCode})` : 'Introduction'}
          </span>
        </div>

        {/* Right Actions Toolbar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenChapters}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#332b23] hover:bg-[#42382e] border border-[#4d4033] text-xs uppercase tracking-wider text-[#e6ded2] transition-colors"
            title="Browse Country Chapters"
          >
            <Globe className="w-3.5 h-3.5 text-[#B8755C]" />
            <span className="hidden sm:inline">12 Chapters</span>
          </button>

          <button
            onClick={onOpenIndex}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#332b23] hover:bg-[#42382e] border border-[#4d4033] text-xs uppercase tracking-wider text-[#e6ded2] transition-colors"
            title="View all 108 Plates Index"
          >
            <Layers className="w-3.5 h-3.5 text-[#B8755C]" />
            <span className="hidden sm:inline">108 Plates</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="p-2 rounded-lg bg-[#332b23] hover:bg-[#42382e] border border-[#4d4033] text-[#e6ded2] transition-colors"
            title="Search Landmarks"
            aria-label="Search Landmarks"
          >
            <Search className="w-4 h-4 text-[#B8755C]" />
          </button>

          <button
            onClick={onOpenInfo}
            className="p-2 rounded-lg bg-[#332b23] hover:bg-[#42382e] border border-[#4d4033] text-[#e6ded2] transition-colors"
            title="Plate Notes & Curator Details"
            aria-label="Plate Details"
          >
            <Info className="w-4 h-4 text-[#B8755C]" />
          </button>
        </div>
      </div>
    </header>
  );
};
