import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Train, 
  Wifi, 
  Zap, 
  ShieldCheck,
  Bookmark,
  Share2,
  Flag
} from 'lucide-react';
import { HousingListing } from '../../types';

interface Props {
  housing: HousingListing | null;
  onClose: () => void;
}

export const HousingDetailModal: React.FC<Props> = ({ housing, onClose }) => {
  const { savedHousingIds, toggleSaveHousing, openReportModal } = useApp();

  if (!housing) return null;

  const isSaved = savedHousingIds.includes(housing.id);

  const getStatusBadge = () => {
    switch (housing.verificationStatus) {
      case 'verified':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>🟢 Information Verified (معلومات موثقة)</span>
          </span>
        );
      case 'check_before_payment':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>🟡 Check Before Payment (عاين قبل الدفع)</span>
          </span>
        );
      case 'suspicious':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>🔴 Suspicious (تنبيه: غير موثق / مشبوه)</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 shrink-0 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {getStatusBadge()}
              {housing.nearMetro && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center gap-1">
                  <Train className="w-3.5 h-3.5" />
                  <span>قرب المترو ({housing.metroWalkMinutes} دقائق)</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {housing.title}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-slate-400 text-xs sm:text-sm">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{housing.address}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white shrink-0 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Images */}
          {housing.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl overflow-hidden">
              {housing.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={housing.title}
                  className="w-full h-44 sm:h-52 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          )}

          {/* Golden Warning Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-slate-950 border border-amber-500/40 text-xs text-amber-200 leading-relaxed">
            <div className="font-bold flex items-center gap-1.5 text-amber-400 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>تنبيه نظام حماية المستأجر:</span>
            </div>
            {housing.verificationNote || 'لا تحول عربونًا أبدًا قبل معاينة السكن والتحقق من العقد والجهة المؤجرة وفاتورة DEWA.'}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block mb-1">الإيجار الشهري</span>
              <span className="font-black text-amber-400 text-base">{housing.price} درهم</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block mb-1">فواتير DEWA والنت</span>
              <span className="font-bold text-white text-xs sm:text-sm">
                {housing.billsIncluded ? '🟢 مشمولة بالإيجار' : 'غير مشمولة'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block mb-1">محطة المترو</span>
              <span className="font-bold text-white text-xs truncate block">
                {housing.metroStation || 'باص متوفر'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block mb-1">الفئة المستهدفة</span>
              <span className="font-bold text-white text-xs">
                {housing.gender === 'men' ? 'رجال / شباب' : housing.gender === 'women' ? 'سيدات / بنات' : 'عائلات / مشترك'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-white font-bold text-sm mb-2">تفاصيل السكن</h4>
            <p className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs sm:text-sm leading-relaxed">
              {housing.description}
            </p>
          </div>

          {/* Amenities */}
          {housing.amenities.length > 0 && (
            <div>
              <h4 className="text-white font-bold text-sm mb-2">المميزات والمرافق المتوفرة</h4>
              <div className="flex flex-wrap gap-2">
                {housing.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveHousing(housing.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isSaved 
                  ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' 
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
              <span>{isSaved ? 'محفوظ' : 'حفظ'}</span>
            </button>

            <button
              onClick={() => openReportModal(housing.title, 'housing')}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:text-rose-400 text-xs font-semibold flex items-center gap-1"
              title="إبلاغ عن سكن مشبوه"
            >
              <Flag className="w-4 h-4" />
              <span>إبلاغ</span>
            </button>
          </div>

          {/* Direct WhatsApp and Phone Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {housing.whatsapp && (
              <a
                href={`https://wa.me/${housing.whatsapp}?text=${encodeURIComponent(`مرحباً، أستفسر بخصوص إعلان السكن على DubaiStart: ${housing.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-900/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مراسلة WhatsApp</span>
              </a>
            )}

            <a
              href={`tel:${housing.contactPhone}`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
            >
              <Phone className="w-4 h-4" />
              <span>اتصال للمعاينة</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
