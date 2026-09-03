import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plane, Compass, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AlgerianGuideBanner: React.FC = () => {
  const { setActiveTab, language, t } = useApp();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 p-6 sm:p-8 shadow-xl">
        
        {/* Glow effect */}
        <div className="absolute top-0 end-0 w-64 h-64 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇩🇿 🇲🇦 🇹🇳 🇪🇬</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                قسم مخصص للقادمين الجدد
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {t.algerianBannerTitle}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {t.algerianBannerSubtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] sm:text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ماذا تحتاج قبل السفر</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>كيف تبحث عن وظيفة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>أين تسكن بأمان واقتصاد</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>تجنب النصب والسماسرة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ماذا تفعل عند الوصول فوراً</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>تحويل وتصريف العملة</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('algeria-guide')}
              className="w-full lg:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <Compass className="w-4 h-4" />
              <span>{t.algerianBannerBtn}</span>
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              معلومات إرشادية وتأكيد المصادر الرسمية
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
