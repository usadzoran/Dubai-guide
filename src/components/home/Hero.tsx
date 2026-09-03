import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ArrowLeft, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab, triggerSearch, language, t } = useApp();
  const [localInput, setLocalInput] = useState('');

  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const quickSearchTags = [
    { label: 'Warehouse', labelAr: 'مستودعات', query: 'Warehouse' },
    { label: 'Driver', labelAr: 'سائق', query: 'Driver' },
    { label: 'Cleaner', labelAr: 'تنظيف', query: 'Cleaner' },
    { label: 'Sales', labelAr: 'مبيعات', query: 'Sales' },
    { label: 'Bed Space', labelAr: 'سرير', query: 'Bed Space' },
    { label: 'Room', labelAr: 'غرفة', query: 'Room' },
    { label: 'Recruitment', labelAr: 'مكتب توظيف', query: 'Recruitment Office' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localInput.trim()) {
      triggerSearch(localInput);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/60">
      
      {/* Decorative ambient subtle lights (Dubai Gold & Deep Navy) */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
          <span>🇦🇪</span>
          <span>DubaiStart</span>
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          <span className="text-slate-300 font-normal">{t.tagline}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] mb-5">
          {language === 'ar' ? (
            <>
              وصلت دبي؟ <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                ابدأ من المكان الصحيح.
              </span>
            </>
          ) : (
            <>
              {t.heroHeadline.split('\n')[0]} <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                {t.heroHeadline.split('\n')[1] || 'Start from the right place.'}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {t.heroSubheadline}
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
            id="btn-hero-jobs"
          >
            <span>{t.btnFindJob}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => setActiveTab('housing')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 hover:border-amber-400/50 transition-all flex items-center justify-center gap-2"
            id="btn-hero-housing"
          >
            <span>{t.btnFindHousing}</span>
          </button>
        </div>

        {/* Main Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto mb-5">
          <div className="relative flex items-center bg-slate-900 border-2 border-slate-700/80 focus-within:border-amber-400 rounded-2xl shadow-xl transition-all p-1.5">
            <div className="ps-3 text-slate-400">
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            
            <input
              type="text"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent px-3 py-2.5 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              id="hero-search-input"
            />

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold transition-colors shrink-0 shadow-sm"
              id="hero-search-submit"
            >
              {t.searchBtn}
            </button>
          </div>
        </form>

        {/* Quick Search Suggestions / Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-slate-400">
          <span className="text-slate-500 font-medium me-1">أمثلة سريعة:</span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag.query}
              type="button"
              onClick={() => {
                setLocalInput(tag.query);
                triggerSearch(tag.query);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-amber-400/15 border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-colors"
            >
              {language === 'ar' ? `${tag.labelAr} (${tag.label})` : tag.label}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
