import React from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Eye, Maximize2, Minimize2, Info } from 'lucide-react';
import type { Landmark } from '../data/chaptersData.ts';

interface QuickControlsHUDProps {
  currentLandmark: Landmark | undefined;
  plateNumber: number;
  totalPlates: number;
  zoomLevel: number;
  isLoupeActive: boolean;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleLoupe: () => void;
  onToggleFullscreen: () => void;
  onOpenDetails: () => void;
}

export const QuickControlsHUD: React.FC<QuickControlsHUDProps> = ({
  currentLandmark,
  plateNumber,
  totalPlates,
  zoomLevel,
  isLoupeActive,
  isFullscreen,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleLoupe,
  onToggleFullscreen,
  onOpenDetails,
}) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 bg-[#241f1a]/95 backdrop-blur-md border border-[#42372c] text-[#F3EBDD] px-3.5 py-2.5 rounded-2xl shadow-2xl max-w-[94vw] sm:max-w-none transition-all">
      {/* Navigation Arrows */}
      <button
        onClick={onPrev}
        className="p-2 rounded-xl bg-[#332b23] hover:bg-[#453b30] text-[#e8dfd3] transition-colors flex items-center justify-center"
        title="Previous Plate (Left Arrow)"
        aria-label="Previous plate"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Plate Info Button */}
      <button
        onClick={onOpenDetails}
        className="text-left px-3 py-1 rounded-xl hover:bg-[#332b23] transition-colors flex items-center gap-2 group"
        title="Click to view plate details"
      >
        <div className="w-2 h-2 rounded-full bg-[#B8755C] group-hover:scale-125 transition-transform shrink-0"></div>
        <div className="truncate max-w-[120px] sm:max-w-[220px]">
          <div className="text-[11px] font-semibold text-[#B8755C] uppercase tracking-wider">
            {plateNumber === 0 ? 'Frontispiece' : `Plate ${String(plateNumber).padStart(3, '0')}`}
          </div>
          <div className="text-xs font-display text-[#F3EBDD] truncate">
            {currentLandmark ? currentLandmark.title : 'Atlas of Elsewhere'}
          </div>
        </div>
      </button>

      <button
        onClick={onNext}
        className="p-2 rounded-xl bg-[#332b23] hover:bg-[#453b30] text-[#e8dfd3] transition-colors flex items-center justify-center"
        title="Next Plate (Right Arrow)"
        aria-label="Next plate"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="w-[1px] h-6 bg-[#3d3328] mx-0.5 sm:mx-1 hidden sm:block"></div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-1 bg-[#1a1612] px-2 py-1 rounded-xl border border-[#382f25]">
        <button
          onClick={onZoomOut}
          disabled={zoomLevel <= 0.86}
          className="p-1.5 rounded-lg hover:bg-[#2b241d] disabled:opacity-30 text-[#e6ded2] transition-colors"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <span className="text-[11px] font-mono px-1.5 text-[#b3a696] min-w-[38px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={onZoomIn}
          disabled={zoomLevel >= 1.55}
          className="p-1.5 rounded-lg hover:bg-[#2b241d] disabled:opacity-30 text-[#e6ded2] transition-colors"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetZoom}
          className="p-1.5 rounded-lg hover:bg-[#2b241d] text-[#a99c8d] hover:text-[#F3EBDD] transition-colors ml-0.5"
          title="Reset Zoom (100%)"
          aria-label="Reset zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Magnifier Toggle */}
      <button
        onClick={onToggleLoupe}
        className={`px-2.5 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
          isLoupeActive
            ? 'bg-[#B8755C]/20 border-[#B8755C] text-[#F3EBDD]'
            : 'bg-[#1a1612] border-[#382f25] text-[#a99c8d] hover:text-[#F3EBDD]'
        }`}
        title="Toggle Draggable Magnifier Loupe"
        aria-pressed={isLoupeActive}
      >
        <Eye className="w-3.5 h-3.5 text-[#B8755C]" />
        <span className="hidden sm:inline">Loupe</span>
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={onToggleFullscreen}
        className="p-2 rounded-xl bg-[#332b23] hover:bg-[#453b30] text-[#e8dfd3] transition-colors hidden sm:flex items-center justify-center"
        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Sketchbook'}
        aria-label="Toggle fullscreen"
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </button>
    </div>
  );
};
