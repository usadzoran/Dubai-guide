import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle,
  Search,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { RecruitmentOffice } from '../../types';

export const RecruitmentView: React.FC = () => {
  const { recruitmentOffices, setActiveTab } = useApp();
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');

  const filteredOffices = recruitmentOffices.filter(office => {
    if (selectedArea !== 'all' && !office.area.toLowerCase().includes(selectedArea.toLowerCase())) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const match = 
        office.name.toLowerCase().includes(q) ||
        office.area.toLowerCase().includes(q) ||
        office.address.toLowerCase().includes(q) ||
        office.specializations.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 text-xs font-bold mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>وكالات التوظيف المعتمدة والمرخصة</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          مكاتب التوظيف في دبي
        </h1>
        
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          مكاتب وشركات توظيف يمكن العثور عليها في دبي. تحقق دائمًا من تفاصيل الوظيفة والرسوم قبل التعامل. وفقاً لقانون العمل الإماراتي، لا تتقاضى المكاتب النظامية أي رسوم تسجيل أو تقديم من المرشح نهائياً.
        </p>

        {/* Warning Badge */}
        <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>تنبيه قانوني صارم:</strong> لا تصدق أي مكتب يطلب منك "رسوم فتح ملف" أو "رسوم مقابلة". التوظيف القانوني في الإمارات مجاني 100% للباحث عن عمل.
          </span>
        </div>
      </div>

      {/* Search & Area Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث باسم المكتب أو التخصص (Finance, Logistics, Sales)..."
            className="w-full ps-10 pe-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-300 focus:border-amber-400 focus:outline-none"
        >
          <option value="all">كافة المناطق</option>
          <option value="DIFC">مركز دبي المالي (DIFC)</option>
          <option value="Sheikh Zayed">شارع الشيخ زايد (SZR)</option>
          <option value="Business Bay">الخليج التجاري (Business Bay)</option>
          <option value="Dubai Marina">دبي مارينا</option>
          <option value="Silicon Oasis">واحة دبي للسيليكون</option>
        </select>
      </div>

      {/* Offices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffices.map((office) => (
          <div
            key={office.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-400/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
          >
            <div>
              
              {/* Logo placeholder & Title */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400 font-black text-base shrink-0 shadow-inner">
                  {office.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-white truncate">
                    {office.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{office.area}</span>
                  </div>
                </div>
              </div>

              {/* Verification Tag */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{office.verificationLabel}</span>
                </span>
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs text-slate-300 mb-4 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-slate-400 leading-snug">{office.address}</span>
                </div>

                {office.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span dir="ltr" className="font-mono text-slate-200">{office.phone}</span>
                  </div>
                )}

                {office.openingHours && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-300">{office.openingHours}</span>
                  </div>
                )}

                {office.rating && (
                  <div className="flex items-center gap-1 text-amber-400 font-semibold pt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{office.rating}</span>
                    <span className="text-slate-500 font-normal">({office.reviewsCount} تقييم Google)</span>
                  </div>
                )}
              </div>

              {/* Specializations Tags */}
              {office.specializations.length > 0 && (
                <div className="mb-4">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">التخصصات والقطاعات:</span>
                  <div className="flex flex-wrap gap-1">
                    {office.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Extra Notes */}
              {office.notes && (
                <p className="text-[11px] text-slate-400 italic mb-4">
                  💡 {office.notes}
                </p>
              )}

            </div>

            {/* Action Buttons as requested in item 8 */}
            <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2">
              
              {/* Button: الموقع على الخريطة */}
              <a
                href={office.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                title="فتح في خرائط جوجل"
              >
                <Navigation className="w-3 h-3 text-amber-400" />
                <span>الخريطة</span>
              </a>

              {/* Button: اتصال */}
              {office.phone ? (
                <a
                  href={`tel:${office.phone}`}
                  className="px-2 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>اتصال</span>
                </a>
              ) : (
                <button
                  disabled
                  className="px-2 py-2 rounded-xl bg-slate-950 text-slate-600 text-[11px] font-medium text-center"
                >
                  عبر الموقع
                </button>
              )}

              {/* Button: زيارة الموقع */}
              <a
                href={office.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-extrabold text-center flex items-center justify-center gap-1 transition-colors shadow-sm"
              >
                <span>الموقع</span>
                <ExternalLink className="w-3 h-3" />
              </a>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
