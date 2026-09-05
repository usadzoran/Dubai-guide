import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ExternalLink, Sparkles } from 'lucide-react';
import { HtmlAdRenderer } from './HtmlAdRenderer';

export const AdHeroBanner: React.FC = () => {
  const { ads, recordAdClick, recordAdImpression } = useApp();

  const heroAds = ads.filter(a => a.placement === 'home_hero' && a.active);

  useEffect(() => {
    heroAds.forEach(ad => {
      const isHtml = ad.adType === 'html' || Boolean(ad.htmlCode?.trim());
      if (!isHtml) {
        recordAdImpression(ad.id);
      }
    });
  }, [heroAds.map(a => a.id).join(','), heroAds.map(a => a.adType).join(',')]);

  if (heroAds.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 space-y-4">
      {heroAds.map((heroAd) => {
        const isHtml = heroAd.adType === 'html' || Boolean(heroAd.htmlCode?.trim());

        // Custom HTML Ad
        if (isHtml && heroAd.htmlCode) {
          return (
            <div key={heroAd.id} className="w-full">
              <HtmlAdRenderer ad={heroAd} className="shadow-xl" />
            </div>
          );
        }

        const handleClick = () => {
          recordAdClick(heroAd.id);
          if (heroAd.ctaLink) {
            window.open(heroAd.ctaLink, '_blank', 'noopener,noreferrer');
          }
        };

        return (
          <div 
            key={heroAd.id}
            onClick={handleClick}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/10 border border-amber-500/30 p-5 sm:p-6 shadow-xl hover:border-amber-400/60 transition-all cursor-pointer group"
          >
            {/* Background glow */}
            <div className="absolute top-0 end-0 -mt-10 -me-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
              
              <div className="flex items-start gap-4 flex-1">
                {heroAd.imageUrl ? (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-amber-500/20 shadow-md">
                    <img 
                      src={heroAd.imageUrl} 
                      alt={heroAd.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                    <Sparkles className="w-7 h-7" />
                  </div>
                )}

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    {heroAd.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black">
                        {heroAd.badge}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400">إعلان ترويجي مميز</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {heroAd.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-2xl">
                    {heroAd.description}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                  className="w-full md:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                >
                  <span>{heroAd.ctaText || 'تفاصيل الإعلان'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};
