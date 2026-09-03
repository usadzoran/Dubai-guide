import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Train, 
  Building2, 
  BedDouble, 
  Building, 
  ShoppingBag, 
  Navigation, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';
import L from 'leaflet';
import { MAP_POINTS, PLACE_CATEGORIES } from '../../data/places';
import { MapPoint } from '../../types';

export const MapView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [activePlace, setActivePlace] = useState<MapPoint | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Filter places
  const filteredPlaces = MAP_POINTS.filter((place) => {
    if (selectedCategory !== 'all' && place.category !== selectedCategory) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = 
        place.name.toLowerCase().includes(q) ||
        (place.nameEn && place.nameEn.toLowerCase().includes(q)) ||
        (place.area && place.area.toLowerCase().includes(q)) ||
        (place.metroStation && place.metroStation.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Dubai centered map
      const map = L.map(mapContainerRef.current, {
        center: [25.22, 55.30],
        zoom: 11,
        scrollWheelZoom: true,
      });

      // Standard OSM tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Clean up on component unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filtered places change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Helper to get marker badge based on category
    const getCategoryBadge = (cat: string) => {
      switch (cat) {
        case 'metro': return '🚇';
        case 'recruitment': return '🏢';
        case 'housing': return '🛏️';
        case 'service': return '🏛️';
        default: return '📍';
      }
    };

    filteredPlaces.forEach((place) => {
      const emoji = getCategoryBadge(place.category);
      
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="
          background: #0f172a;
          border: 2px solid #f59e0b;
          border-radius: 9999px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
          cursor: pointer;
        ">${emoji}</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const [lat, lng] = place.coordinates;
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: sans-serif; direction: rtl; text-align: right; min-width: 180px; color: #0f172a;">
          <h4 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${place.name}</h4>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #475569;">${place.area || place.address}</p>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b;">${place.description || place.extraInfo || ''}</p>
          <a href="${place.googleMapsUrl || `https://maps.google.com/?q=${lat},${lng}`}" target="_blank" style="
            display: inline-block;
            background: #0f172a;
            color: #f59e0b;
            font-size: 11px;
            font-weight: bold;
            padding: 4px 8px;
            border-radius: 6px;
            text-decoration: none;
          ">الاتجاهات في خرائط Google ↗</a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setActivePlace(place);
      });

      markersRef.current.push(marker);
    });
  }, [filteredPlaces]);

  // Center map on a specific place
  const handleSelectPlace = (place: MapPoint) => {
    setActivePlace(place);
    if (mapInstanceRef.current) {
      const [lat, lng] = place.coordinates;
      mapInstanceRef.current.setView([lat, lng], 14, { animate: true });
      
      // Find matching marker and open popup
      const marker = markersRef.current.find(
        (m) => m.getLatLng().lat === lat && m.getLatLng().lng === lng
      );
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-bold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>خريطة النقاط والمحطات الحيوية</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          خريطة دبي للبداية (Dubai Starter Map)
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
          محطات المترو المركزية، مكاتب التوظيف المعتمدة، مناطق السكن الاقتصادي، ومراكز آمر وتسهيل الحكومية، وصرافة العملات والأسواق المخفضة.
        </p>
      </div>

      {/* Categories Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PLACE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Leaflet Map Container (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          <div 
            ref={mapContainerRef} 
            className="w-full h-[450px] sm:h-[550px] z-10"
            id="dubai-interactive-map"
          />

          {/* Map Overlay helper badge */}
          <div className="absolute top-3 end-3 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-amber-400 shadow-md">
            اضغط على أي نقطة لعرض التفاصيل والاتجاهات
          </div>
        </div>

        {/* Sidebar list of places with quick search (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col h-[450px] sm:h-[550px]">
          
          {/* Quick Search */}
          <div className="relative mb-3">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالمكان أو المحطة..."
              className="w-full ps-9 pe-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="text-xs text-slate-400 font-semibold mb-2">
            تم العثور على {filteredPlaces.length} مكان:
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pe-1">
            {filteredPlaces.map((place) => {
              const isSelected = activePlace?.id === place.id;
              return (
                <div
                  key={place.id}
                  onClick={() => handleSelectPlace(place)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400/50 text-white'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {place.name}
                    </h4>
                    {place.metroStation && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 shrink-0 flex items-center gap-0.5">
                        <Train className="w-2.5 h-2.5" />
                        <span>مترو</span>
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {place.description || place.extraInfo}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px]">
                    <span className="text-slate-500">{place.area || place.address}</span>
                    <a
                      href={place.googleMapsUrl || `https://maps.google.com/?q=${place.coordinates[0]},${place.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-amber-400 hover:underline flex items-center gap-0.5 font-bold"
                    >
                      <span>خرائط Google</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
