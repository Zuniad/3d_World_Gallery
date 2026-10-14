import React from 'react';
import { X, MapPin, Compass, BookOpen, ChevronLeft, ChevronRight, Share2, ZoomIn } from 'lucide-react';
import type { Landmark } from '../data/chaptersData.ts';

interface PlateDetailModalProps {
  landmark: Landmark | undefined;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const PlateDetailModal: React.FC<PlateDetailModalProps> = ({
  landmark,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!isOpen || !landmark) return null;

  const illustrationSrc = landmark.illustrationFile.startsWith('http')
    ? landmark.illustrationFile
    : `/landing-pages/meng-to-sketchbook/${landmark.illustrationFile}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#221c17] border border-[#473c30] text-[#F3EBDD] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#3b3227] flex items-center justify-between bg-[#1b1713]">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded bg-[#3d3226] text-[#B8755C] border border-[#524334]">
              Plate {String(landmark.plateNumber).padStart(3, '0')}
            </span>
            <span className="text-xs uppercase tracking-wider text-[#a99c8d]">
              Chapter {String(landmark.chapterNumber).padStart(2, '0')} • {landmark.country}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-1.5 rounded-lg bg-[#2e261f] hover:bg-[#3d332a] text-[#F3EBDD] transition-colors"
              title="Previous Plate"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-1.5 rounded-lg bg-[#2e261f] hover:bg-[#3d332a] text-[#F3EBDD] transition-colors"
              title="Next Plate"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-[#42372c] mx-1"></div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#2e261f] hover:bg-[#3d332a] text-[#F3EBDD] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Title & Place */}
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-[#F3EBDD] tracking-wide">
              {landmark.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#B8755C]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {landmark.place}, {landmark.country}
              </span>
              <span className="text-[#594c3d]">•</span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#a99c8d]">
                <Compass className="w-3.5 h-3.5" />
                {landmark.coordinates}
              </span>
              <span className="text-[#594c3d]">•</span>
              <span className="px-2 py-0.5 rounded bg-[#332b22] text-xs text-[#c9bcae]">
                {landmark.subjectClassification}
              </span>
            </div>
          </div>

          {/* Large Illustrated Spread Preview */}
          <div className="relative rounded-xl overflow-hidden border border-[#42372b] bg-[#181410] shadow-inner group">
            <img
              src={illustrationSrc}
              alt={landmark.altText}
              className="w-full h-auto max-h-[460px] object-contain mx-auto"
            />
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs text-[#d1c5b4] flex items-center gap-1.5 border border-white/10">
              <ZoomIn className="w-3.5 h-3.5 text-[#B8755C]" />
              <span>Drag loupe on the 3D sketchbook to magnify details</span>
            </div>
          </div>

          {/* Editorial Description & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[#28211b] border border-[#3d332a]">
              <span className="text-xs uppercase tracking-widest text-[#B8755C] font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Editorial Journal Observation
              </span>
              <p className="font-body text-lg italic text-[#F3EBDD] mt-3 leading-relaxed">
                “{landmark.description}”
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#28211b] border border-[#3d332a]">
              <span className="text-xs uppercase tracking-widest text-[#B8755C] font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Architectural & Cultural Notes
              </span>
              <p className="font-body text-sm text-[#cfc2b2] mt-3 leading-relaxed">
                {landmark.culturalNotes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
