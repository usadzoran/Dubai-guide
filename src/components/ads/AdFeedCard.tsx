import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AdPlacement } from '../../types';
import { ExternalLink, Sparkles } from 'lucide-react';
import { HtmlAdRenderer } from './HtmlAdRenderer';

interface AdFeedCardProps {
  placement: AdPlacement;
  adIndex?: number;
}

export const AdFeedCard: React.FC<AdFeedCardProps> = ({ placement, adIndex = 0 }) => {
  const { ads, recordAdClick, recordAdImpression } = useApp();

  const matchingAds = ads.filter(a => a.placement === placement && a.active);
  if (matchingAds.length === 0) return null;

  const ad = matchingAds[adIndex % matchingAds.length];
  if (!ad) return null;

  const isHtml = Boolean(ad.adType === 'html' || Boolean(ad.htmlCode?.trim()));

  useEffect(() => {
    if (ad && !isHtml) {
      recordAdImpression(ad.id);
    }
  }, [ad.id, isHtml]);

  // Custom HTML Ad
  if (isHtml && ad.htmlCode) {
    return (
      <div className="col-span-full my-2 w-full">
        <HtmlAdRenderer ad={ad} className="shadow-lg" />
      </div>
    );
  }

  const handleClick = () => {
    recordAdClick(ad.id);
    if (ad.ctaLink) {
      window.open(ad.ctaLink, '_blank', 'noopener,noreferrer');
    }
  };

  const isEmerald = ad.bgStyle === 'emerald';

  return (
    <div 
      onClick={handleClick}
      className={`rounded-3xl p-5 border transition-all cursor-pointer shadow-lg relative overflow-hidden group ${
        isEmerald 
          ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-emerald-950/20 border-emerald-500/30 hover:border-emerald-400/60'
          : 'bg-gradient-to-br from-amber-950/30 via-slate-900 to-amber-950/20 border-amber-500/30 hover:border-amber-400/60'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3.5 flex-1">
          {ad.imageUrl ? (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-800 shadow-md">
              <img 
                src={ad.imageUrl} 
                alt={ad.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              isEmerald 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-amber-400/10 border-amber-400/30 text-amber-400'
            }`}>
              <Sparkles className="w-6 h-6" />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {ad.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  isEmerald
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                }`}>
                  {ad.badge}
                </span>
              )}
              <span className="text-[10px] text-slate-400">إعلان موثوق</span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              {ad.title}
            </h4>

            <p className="text-xs text-slate-300 line-clamp-2">
              {ad.description}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto shrink-0 flex items-center justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
              isEmerald
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-500/20'
            }`}
          >
            <span>{ad.ctaText || 'تفاصيل الإعلان'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
