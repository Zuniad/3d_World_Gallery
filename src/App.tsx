/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Scene } from './Scene.tsx';
import { HeaderMasthead } from './components/HeaderMasthead.tsx';
import { ChapterDrawer } from './components/ChapterDrawer.tsx';
import { PlatesIndexDrawer } from './components/PlatesIndexDrawer.tsx';
import { PlateDetailModal } from './components/PlateDetailModal.tsx';
import { QuickControlsHUD } from './components/QuickControlsHUD.tsx';
import { CountryContentsSection } from './components/CountryContentsSection.tsx';
import { WholeCountriesGallery } from './components/WholeCountriesGallery.tsx';
import { CHAPTERS, type Chapter, type Landmark } from './data/chaptersData.ts';
import { LANDMARKS, getLandmarkByPlate } from './data/landmarksData.ts';
import { Globe, Layers, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentPlateNumber, setCurrentPlateNumber] = useState<number>(0);
  const [currentChapterNumber, setCurrentChapterNumber] = useState<number>(1);
  const [isChapterDrawerOpen, setIsChapterDrawerOpen] = useState<boolean>(false);
  const [isIndexDrawerOpen, setIsIndexDrawerOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [modalLandmark, setModalLandmark] = useState<Landmark | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isLoupeActive, setIsLoupeActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'country' | 'all-gallery'>('country');

  const containerRef = useRef<HTMLDivElement>(null);

  // Active landmark
  const currentLandmark = getLandmarkByPlate(currentPlateNumber);
  const currentChapter = CHAPTERS.find((c: Chapter) => c.number === currentChapterNumber) || CHAPTERS[0];

  // Send message or call direct API on the ThreeUI sketchbook iframe
  const postToSketchbook = useCallback((data: any) => {
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      // 1. Send via postMessage
      try {
        iframe.contentWindow.postMessage(data, '*');
      } catch (e) {}

      // 2. Direct same-origin API call for instant zero-lag response
      try {
        const sb = (iframe.contentWindow as any).sketchbook;
        if (sb) {
          if (data.type === 'GO_TO_PAGE_INDEX') {
            sb.goTo(data.pageIndex);
          } else if (data.type === 'GO_TO_PLATE') {
            const target = sb.PAGES.findIndex((p: any) => p.plateNumber === data.plateNumber);
            if (target !== -1) sb.goTo(target);
          } else if (data.type === 'SET_CHAPTER') {
            const target = sb.PAGES.findIndex((p: any) => p.chapter === data.chapterNumber);
            if (target !== -1) sb.goTo(target);
          } else if (data.type === 'NEXT_PLATE') {
            sb.step('next');
          } else if (data.type === 'PREV_PLATE') {
            sb.step('prev');
          }
        }
      } catch (err) {}
    }
  }, []);

  // Listen to messages from the ThreeUI sketchbook iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;
      if (event.data.type === 'SKETCHBOOK_PAGE_CHANGED') {
        const pNum = event.data.plateNumber !== undefined ? event.data.plateNumber : event.data.pageIndex;
        setCurrentPlateNumber(pNum);
        if (event.data.chapter && event.data.chapter > 0) {
          setCurrentChapterNumber(event.data.chapter);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        setIsChapterDrawerOpen(false);
        setIsIndexDrawerOpen(false);
        setIsDetailModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPlateNumber, postToSketchbook]);

  const handleSelectChapter = (chapterNum: number) => {
    setCurrentChapterNumber(chapterNum);
    setViewMode('country');
    // Find first plate of chapter
    const ch = CHAPTERS.find(c => c.number === chapterNum);
    if (ch) {
      setCurrentPlateNumber(ch.startPlate);
      postToSketchbook({ type: 'SET_CHAPTER', chapterNumber: chapterNum });
    }
    // Scroll smoothly to country contents below
    setTimeout(() => {
      document.getElementById('country-contents')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleSelectPlate = (plateNum: number) => {
    setCurrentPlateNumber(plateNum);
    const landmark = getLandmarkByPlate(plateNum);
    if (landmark) {
      setCurrentChapterNumber(landmark.chapterNumber);
    }
    postToSketchbook({ type: 'GO_TO_PLATE', plateNumber: plateNum });
  };

  const handleOpenPlateInSketchbook = (plateNum: number) => {
    handleSelectPlate(plateNum);
    document.getElementById('sketchbook-hero')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleNext = () => {
    // Total pages: 109 (Cover is 0, plates 1 to 108)
    const nextPlate = (currentPlateNumber + 1) % 109;
    setCurrentPlateNumber(nextPlate);
    const landmark = getLandmarkByPlate(nextPlate);
    if (landmark) setCurrentChapterNumber(landmark.chapterNumber);
    postToSketchbook({ type: 'NEXT_PLATE', pageIndex: nextPlate });
  };

  const handlePrev = () => {
    const prevPlate = (currentPlateNumber - 1 + 109) % 109;
    setCurrentPlateNumber(prevPlate);
    const landmark = getLandmarkByPlate(prevPlate);
    if (landmark) setCurrentChapterNumber(landmark.chapterNumber);
    postToSketchbook({ type: 'PREV_PLATE', pageIndex: prevPlate });
  };

  const handleZoomIn = () => {
    const nextZoom = Math.min(1.6, zoomLevel * 1.15);
    setZoomLevel(nextZoom);
    postToSketchbook({ type: 'SET_ZOOM', zoom: nextZoom });
  };

  const handleZoomOut = () => {
    const nextZoom = Math.max(0.85, zoomLevel / 1.15);
    setZoomLevel(nextZoom);
    postToSketchbook({ type: 'SET_ZOOM', zoom: nextZoom });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    postToSketchbook({ type: 'SET_ZOOM', zoom: 1 });
  };

  const handleToggleLoupe = () => {
    const nextState = !isLoupeActive;
    setIsLoupeActive(nextState);
    postToSketchbook({ type: 'TOGGLE_LOUPE', on: nextState });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleOpenModal = (landmark: Landmark) => {
    setModalLandmark(landmark);
    setIsDetailModalOpen(true);
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#181512] text-[#2b2721] overflow-x-hidden">
      {/* Top Editorial Masthead */}
      <HeaderMasthead
        currentChapter={currentChapter}
        plateNumber={currentPlateNumber}
        totalPlates={LANDMARKS.length}
        onOpenChapters={() => setIsChapterDrawerOpen(true)}
        onOpenIndex={() => {
          setSearchQuery('');
          setIsIndexDrawerOpen(true);
        }}
        onOpenSearch={() => {
          setSearchQuery('');
          setIsIndexDrawerOpen(true);
        }}
        onOpenInfo={() => {
          if (currentLandmark) handleOpenModal(currentLandmark);
          else setIsChapterDrawerOpen(true);
        }}
        onGoToCover={() => handleSelectPlate(0)}
      />

      {/* 3D Sketchbook Hero Section */}
      <section id="sketchbook-hero" className="w-full pt-16 pb-6 relative flex flex-col items-center">
        <div className="w-full h-[78vh] min-h-[580px] max-h-[820px]">
          <Scene />
        </div>
      </section>

      {/* Floating Quick Controls HUD */}
      <QuickControlsHUD
        currentLandmark={currentLandmark}
        plateNumber={currentPlateNumber}
        totalPlates={LANDMARKS.length}
        zoomLevel={zoomLevel}
        isLoupeActive={isLoupeActive}
        isFullscreen={isFullscreen}
        onPrev={handlePrev}
        onNext={handleNext}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onToggleLoupe={handleToggleLoupe}
        onToggleFullscreen={toggleFullscreen}
        onOpenDetails={() => {
          if (currentLandmark) handleOpenModal(currentLandmark);
          else setIsChapterDrawerOpen(true);
        }}
      />

      {/* Content Mode Switcher: "Selected Country Contents" vs "Whole Countries Gallery Art" */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between border-b border-[#382f25] pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('country')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                viewMode === 'country'
                  ? 'bg-[#B8755C] text-white shadow-lg'
                  : 'bg-[#241f1a] text-[#a99c8d] hover:text-[#F3EBDD] hover:bg-[#2e2721]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{currentChapter.country} Contents Only</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-black/30">9</span>
            </button>

            <button
              onClick={() => setViewMode('all-gallery')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                viewMode === 'all-gallery'
                  ? 'bg-[#B8755C] text-white shadow-lg'
                  : 'bg-[#241f1a] text-[#a99c8d] hover:text-[#F3EBDD] hover:bg-[#2e2721]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Whole Countries Gallery Art</span>
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-black/30">108</span>
            </button>
          </div>

          <div className="text-xs text-[#a99c8d] italic">
            {viewMode === 'country'
              ? `Displaying dedicated plates for ${currentChapter.country}`
              : 'Browse all 108 architectural and landscape plates worldwide'}
          </div>
        </div>
      </div>

      {/* Display either Selected Country Contents OR Whole Countries Gallery Art */}
      {viewMode === 'country' ? (
        <CountryContentsSection
          activeChapterNumber={currentChapterNumber}
          activePlateNumber={currentPlateNumber}
          onSelectCountry={handleSelectChapter}
          onOpenPlateInSketchbook={handleOpenPlateInSketchbook}
          onOpenPlateModal={handleOpenModal}
        />
      ) : (
        <WholeCountriesGallery
          activePlateNumber={currentPlateNumber}
          onOpenPlateInSketchbook={handleOpenPlateInSketchbook}
          onOpenPlateModal={handleOpenModal}
        />
      )}

      {/* Chapter Selection Drawer */}
      <ChapterDrawer
        isOpen={isChapterDrawerOpen}
        activeChapterNumber={currentChapterNumber}
        onClose={() => setIsChapterDrawerOpen(false)}
        onSelectChapter={handleSelectChapter}
      />

      {/* All 108 Plates Index Drawer */}
      <PlatesIndexDrawer
        isOpen={isIndexDrawerOpen}
        activePlateNumber={currentPlateNumber}
        initialSearchQuery={searchQuery}
        onClose={() => setIsIndexDrawerOpen(false)}
        onSelectPlate={handleOpenPlateInSketchbook}
      />

      {/* Plate Details Modal */}
      <PlateDetailModal
        landmark={modalLandmark || currentLandmark}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
