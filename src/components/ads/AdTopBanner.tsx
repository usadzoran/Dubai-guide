import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ExternalLink, X } from 'lucide-react';

export const AdTopBanner: React.FC = () => {
  const { ads, recordAdClick, recordAdImpression } = useApp();
  const [dismissed, setDismissed] = useState(false);

  // Find active top_banner ad
  const topAd = ads.find(a => a.placement === 'top_banner' && a.active);

  useEffect(() => {
    if (topAd && !dismissed) {
      recordAdImpression(topAd.id);
    }
  }, [topAd?.id, dismissed]);

  if (!topAd || dismissed) return null;

  const handleClick = () => {
    recordAdClick(topAd.id);
    if (topAd.ctaLink) {
      window.open(topAd.ctaLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <aside 
      aria-label="إعلان ترويجي"
      className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 px-3 sm:px-4 py-2 text-xs font-semibold shadow-md relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        <div 
          onClick={handleClick}
          className="flex-1 flex items-center justify-center sm:justify-start gap-2 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
        >
          {topAd.badge && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              {topAd.badge}
            </span>
          )}
          <span className="truncate text-[11px] sm:text-xs font-bold">
            {topAd.title}
          </span>
          <span className="hidden md:inline-flex items-center gap-1 font-black underline underline-offset-2 shrink-0">
            <span>{topAd.ctaText || 'المزيد'}</span>
            <ExternalLink className="w-3 h-3" />
          </span>
        </div>

        {/* Dismiss button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="p-1 rounded-full hover:bg-slate-950/20 text-slate-950/80 hover:text-slate-950 transition-colors shrink-0"
          title="إغلاق الإعلان"
          aria-label="إغلاق الإعلان"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </aside>
  );
};
