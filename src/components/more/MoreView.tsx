import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bookmark, 
  ShieldAlert, 
  Compass, 
  Sparkles, 
  Phone, 
  Globe, 
  Lock, 
  Smartphone, 
  Flag, 
  FileText, 
  ExternalLink,
  Info
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../../data/safety';

export const MoreView: React.FC = () => {
  const { 
    setActiveTab, 
    savedJobIds, 
    savedHousingIds, 
    language, 
    setLanguage, 
    openReportModal,
    t 
  } = useApp();

  const officialApps = [
    { name: 'DubaiNow', desc: 'تطبيق الخدمات الحكومية الشامل في دبي (فواتير، إقامة، تصاريح)' },
    { name: 'RTA Dubai & S’hail', desc: 'حجز المترو والباص والتكاسي ومتابعة مسارات النقل' },
    { name: 'ICP UAE', desc: 'فحص التأشيرات والإقامات التابعة للهيئة الاتحادية' },
    { name: 'MOHRE UAE', desc: 'بوابة وزارة الموارد البشرية والتوطين لحماية حقوق العمال' },
    { name: 'Dubai Police App', desc: 'خدمات الشرطة وتنبيهات المرور والإبلاغ عن الجرائم الإلكترونية' }
  ];

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          {t.navMore} (Services & Tools)
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          أدوات إضافية، المحفوظات، دليل الطوارئ، والتطبيقات الحكومية الإلزامية في دبي.
        </p>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        
        {/* Saved Items */}
        <div 
          onClick={() => setActiveTab('jobs')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">العناصر المحفوظة</h3>
              <p className="text-xs text-slate-400">{savedJobIds.length} وظيفة و {savedHousingIds.length} سكن محفوظ</p>
            </div>
          </div>
          <span className="text-amber-400 font-bold text-xs">عرض</span>
        </div>

        {/* Algeria / Maghreb Guide */}
        <div 
          onClick={() => setActiveTab('algeria-guide')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">دليل القادمين الجدد</h3>
              <p className="text-xs text-slate-400">نصائح وإرشادات خاصة للمسافرين الجدد</p>
            </div>
          </div>
          <span className="text-emerald-400 font-bold text-xs">فتح</span>
        </div>

        {/* 7-Day Starter Plan */}
        <div 
          onClick={() => setActiveTab('starter-plan')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400/50 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/15 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">خطة أول أسبوع وحاسبة الميزانية</h3>
              <p className="text-xs text-slate-400">قائمة المهام اليومية وحاسبة تكاليف الشهر الأول</p>
            </div>
          </div>
          <span className="text-amber-400 font-bold text-xs">فتح</span>
        </div>

        {/* Safety & Anti-Scam */}
        <div 
          onClick={() => setActiveTab('safety')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 cursor-pointer flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">تجنب الاحتيال وأرقام الطوارئ</h3>
              <p className="text-xs text-slate-400">القوانين والمواد الحامية وطرق الإبلاغ</p>
            </div>
          </div>
          <span className="text-rose-400 font-bold text-xs">فتح</span>
        </div>

      </div>

      {/* Official Essential Apps List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white">
            تطبيقات هامة يجب تحميلها على هاتفك فور وصولك
          </h2>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          {officialApps.map((app, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-white block">{app.name}</span>
                <span className="text-slate-400 text-xs">{app.desc}</span>
              </div>
              <span className="text-[11px] text-amber-400 shrink-0 font-medium">متوفر على App Store & Google Play</span>
            </div>
          ))}
        </div>
      </div>

      {/* Language Switch Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-bold text-white text-sm">لغة الواجهة (Interface Language)</h3>
            <p className="text-xs text-slate-400">اختر اللغة المناسبة لتصفح المنصة</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              language === 'ar' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-300'
            }`}
          >
            🇦🇪 العربية
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              language === 'en' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-300'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => setLanguage('fr')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              language === 'fr' ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-slate-300'
            }`}
          >
            🇫🇷 Français
          </button>
        </div>
      </div>

      {/* Report Button & Emergency Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={() => openReportModal('تقرير مشبوه من صفحة المزيد', 'other')}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Flag className="w-4 h-4" />
          <span>إبلاغ عن إعلان مشبوه أو رقم نصب</span>
        </button>

        <span className="text-xs text-slate-500 font-mono">DubaiStart Newcomer Hub</span>
      </div>

    </div>
  );
};
