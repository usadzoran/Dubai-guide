import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export const AdFloatingBadge: React.FC = () => {
  const { ads, recordAdClick, recordAdImpression, activeTab } = useApp();
  const [dismissed, setDismissed] = useState(false);

  // Don't show inside admin
  if (activeTab === 'admin') return null;

  const floatingAd = ads.find(a => a.placement === 'floating_badge' && a.active);

  useEffect(() => {
    if (floatingAd && !dismissed) {
      recordAdImpression(floatingAd.id);
    }
  }, [floatingAd?.id, dismissed]);

  if (!floatingAd || dismissed) return null;

  const handleClick = () => {
    recordAdClick(floatingAd.id);
    if (floatingAd.ctaLink) {
      window.open(floatingAd.ctaLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 start-4 z-40 max-w-[280px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div 
        onClick={handleClick}
        className="bg-slate-900/95 backdrop-blur-md border border-amber-400/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl hover:border-amber-400 cursor-pointer transition-all relative group text-start"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute -top-2 -end-2 w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-[10px] shadow"
          title="إغلاق"
          aria-label="إغلاق"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
            <MessageCircle className="w-4 h-4" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                {floatingAd.badge || 'إعلان'}
              </span>
              <span className="text-[11px] font-bold text-white group-hover:text-amber-300 transition-colors">
                {floatingAd.title}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 line-clamp-1">
              {floatingAd.description}
            </p>

            <span className="text-[10px] font-bold text-amber-400 block pt-0.5">
              {floatingAd.ctaText} ←
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
