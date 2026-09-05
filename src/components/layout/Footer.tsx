import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ExternalLink, Heart, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, t, openAdminLoginModal } = useApp();
  const [clickCount, setClickCount] = useState(0);

  // Hidden discrete trigger for mobile admin: 7 rapid silent taps with no visual indicators or hints
  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 7) {
      setClickCount(0);
      openAdminLoginModal();
    }
  };

  // Reset click count if idle for 3 seconds
  React.useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇦🇪</span>
              <span className="text-xl font-extrabold text-white tracking-tight font-sans">
                Dubai<span className="text-amber-400">Start</span>
              </span>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              دليلك العملي الميداني للبداية الصحيحة في دبي. نوفر للوافدين الجدد والباحثين عن عمل وسكن دليلاً موثوقاً يختصر الوقت ويحميهم من الاحتيال.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300/80 bg-amber-400/10 border border-amber-400/20 px-3 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>منصة معلوماتية مستقلة - لا نتقاضى أي رسوم من الباحثين عن عمل</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              أقسام المنصة
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => setActiveTab('jobs')} className="hover:text-amber-400 transition-colors">
                  {t.catJobs} (LinkedIn Sources)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('housing')} className="hover:text-amber-400 transition-colors">
                  {t.catHousing} (Bed Space & Rooms)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('recruitment')} className="hover:text-amber-400 transition-colors">
                  {t.catRecruitment} (DIFC & SZR)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-amber-400 transition-colors">
                  {t.catPlaces} (خريطة المترو والخدمات)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('starter-plan')} className="hover:text-amber-400 transition-colors">
                  {t.catStarter} (خطة أول أسبوع)
                </button>
              </li>
            </ul>
          </div>

          {/* Guides & Safety */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              الأمان والدليل
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => setActiveTab('safety')} className="hover:text-amber-400 text-emerald-400 transition-colors font-medium">
                  🛡️ مكافحة الاحتيال وتنبيهات الأمان
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('algeria-guide')} className="hover:text-amber-400 transition-colors">
                  🇩🇿 دليل الجزائريين والمغاربة
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('more')} className="hover:text-amber-400 transition-colors">
                  📞 أرقام الطوارئ في دبي (999 & MOHRE)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-amber-400 transition-colors">
                  🗺️ خريطة دبي والمناطق الحيوية
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 text-xs leading-relaxed text-slate-400 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>إخلاء مسؤولية قانوني (Official Disclaimer)</span>
          </div>
          <p>
            {t.footerDisclaimer}
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            DubaiStart is an informational platform. Job listings and business information may come from external sources. We do not guarantee employment, accommodation, salaries, or transactions. Always verify information with the original source before paying money or sharing personal documents.
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div 
            onClick={handleSecretClick}
            className="cursor-default select-none text-slate-500"
          >
            <span>{t.footerRights}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>صُمم بعناية لمساعدة كل وافد طموح إلى دبي</span>
            <Heart className="w-3.5 h-3.5 text-red-400 inline fill-red-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};
