import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Compass } from 'lucide-react';
import { LANDMARKS } from '../data/landmarksData.ts';
import { CHAPTERS, type Landmark } from '../data/chaptersData.ts';

interface PlatesIndexDrawerProps {
  isOpen: boolean;
  activePlateNumber: number;
  initialSearchQuery?: string;
  onClose: () => void;
  onSelectPlate: (plateNumber: number) => void;
}

export const PlatesIndexDrawer: React.FC<PlatesIndexDrawerProps> = ({
  isOpen,
  activePlateNumber,
  initialSearchQuery = '',
  onClose,
  onSelectPlate,
}) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('ALL');

  const filteredPlates = useMemo(() => {
    return LANDMARKS.filter((l: Landmark) => {
      const matchCountry = selectedCountryFilter === 'ALL' || l.countryCode === selectedCountryFilter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.place.toLowerCase().includes(q) ||
        l.subjectClassification.toLowerCase().includes(q) ||
        String(l.plateNumber) === q ||
        String(l.plateNumber).padStart(3, '0').includes(q);

      return matchCountry && matchQuery;
    });
  }, [query, selectedCountryFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl h-full bg-[#1e1a16] border-l border-[#3a3229] text-[#F3EBDD] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-[#3a3229] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B8755C] font-semibold">
                Archival Folio Catalog
              </span>
              <h2 className="font-display text-2xl md:text-3xl tracking-wide text-[#F3EBDD] mt-0.5">
                Plates Index (108 Studies)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#2a241f] hover:bg-[#383029] text-[#e6ded2] transition-colors"
              aria-label="Close plates index"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a99c8d]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by landmark name, city, country, plate number..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#28221c] border border-[#453b30] text-sm text-[#F3EBDD] placeholder:text-[#8a7e70] placeholder:italic focus:outline-none focus:border-[#B8755C] transition-colors"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a99c8d] hover:text-[#F3EBDD]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Country Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCountryFilter('ALL')}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                selectedCountryFilter === 'ALL'
                  ? 'bg-[#B8755C] text-white font-medium'
                  : 'bg-[#2a241f] text-[#a99c8d] hover:text-[#F3EBDD]'
              }`}
            >
              All (108)
            </button>
            {CHAPTERS.map((ch) => (
              <button
                key={ch.countryCode}
                onClick={() => setSelectedCountryFilter(ch.countryCode)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCountryFilter === ch.countryCode
                    ? 'bg-[#B8755C] text-white font-medium'
                    : 'bg-[#2a241f] text-[#a99c8d] hover:text-[#F3EBDD]'
                }`}
              >
                {ch.countryCode} • {ch.country}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="px-6 py-2 bg-[#171411] border-b border-[#332b22] text-xs text-[#a99c8d] flex justify-between">
          <span>Showing {filteredPlates.length} of 108 plates</span>
          {activePlateNumber > 0 && (
            <span className="text-[#B8755C]">
              Active: Plate {String(activePlateNumber).padStart(3, '0')}
            </span>
          )}
        </div>

        {/* Plates Grid List */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredPlates.map((l: Landmark) => {
            const isActive = l.plateNumber === activePlateNumber;
            const imgSrc = l.illustrationFile.startsWith('http')
              ? l.illustrationFile
              : `/landing-pages/meng-to-sketchbook/${l.illustrationFile}`;

            return (
              <div
                key={l.id}
                onClick={() => {
                  onSelectPlate(l.plateNumber);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                  isActive
                    ? 'bg-[#2b241e] border-[#B8755C] ring-1 ring-[#B8755C] shadow-md shadow-[#B8755C]/15'
                    : 'bg-[#241f1a] border-[#383028] hover:border-[#524436] hover:bg-[#2c251f]'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#181410] border border-[#3d342b]">
                    <img
                      src={imgSrc}
                      alt={l.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-[#B8755C] tracking-wider text-[11px]">
                        PLATE {String(l.plateNumber).padStart(3, '0')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#332b22] text-[10px] text-[#a99c8d] uppercase">
                        {l.countryCode}
                      </span>
                    </div>

                    <h3 className="font-display text-base text-[#F3EBDD] group-hover:text-[#B8755C] transition-colors leading-snug truncate">
                      {l.title}
                    </h3>

                    <p className="font-body text-xs italic text-[#a99c8d] mt-0.5 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-[#B8755C] shrink-0" />
                      <span>{l.place}, {l.country}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#332b22] flex items-center justify-between text-[11px] text-[#837667]">
                  <span className="truncate max-w-[150px]">{l.subjectClassification}</span>
                  <span className="text-[#B8755C] group-hover:underline">Open Plate →</span>
                </div>
              </div>
            );
          })}

          {filteredPlates.length === 0 && (
            <div className="col-span-full py-16 text-center text-[#a99c8d]">
              <Compass className="w-8 h-8 mx-auto text-[#5a4d40] mb-3" />
              <p className="font-display text-xl text-[#F3EBDD]">No plates found</p>
              <p className="font-body italic text-sm mt-1">Try another search query or clear the filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
