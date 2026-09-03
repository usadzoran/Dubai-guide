import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  HelpCircle, 
  Scale, 
  Lock, 
  Flag,
  FileText
} from 'lucide-react';
import { SAFETY_TIPS, EMERGENCY_CONTACTS } from '../../data/safety';

export const SafetyView: React.FC = () => {
  const { openReportModal } = useApp();

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold mb-3">
          <ShieldAlert className="w-4 h-4" />
          <span>دليل الحماية والوعي القانوني في دبي</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          🛡️ لا تدفع قبل أن تتحقق
        </h1>
        
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          دبي من أكثر مدن العالم أمناً وتنظيماً، لكن المحتالين يستغلون حماس القادمين الجدد. هذا الدليل يوضح لك الحيل الست الأكثر شيوعاً والقانون الإماراتي الذي يحميك.
        </p>

        {/* Action Button: Report Fraud */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => openReportModal('محاولة احتيال عامة', 'scam_whatsapp')}
            className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-rose-900/30 flex items-center gap-2"
          >
            <Flag className="w-4 h-4" />
            <span>إبلاغ عن محاولة احتيال أو رقم مشبوه</span>
          </button>
        </div>
      </div>

      {/* The 6 Main Anti-Fraud Cards (Prompt 11) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {SAFETY_TIPS.map((tip, index) => (
          <div
            key={tip.id}
            className="bg-slate-900/95 border border-rose-900/40 hover:border-rose-500/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-all"
          >
            <div>
              
              {/* Badge & Title */}
              <div className="flex items-start gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 font-black text-sm shrink-0 border border-rose-500/30">
                  {index + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {tip.title}
                </h3>
              </div>

              {/* 1. The Problem */}
              <div className="mb-3.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-rose-400 block mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  المشكلة (كيف تحدث؟):
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tip.problem}
                </p>
              </div>

              {/* 2. Why it's dangerous */}
              <div className="mb-3.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  لماذا هي خطيرة؟
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tip.whyDangerous}
                </p>
              </div>

              {/* 3. What to do */}
              <div className="mb-3.5 bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/30">
                <span className="text-xs font-bold text-emerald-400 block mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  ماذا تفعل؟ (الحل السليم):
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {tip.whatToDo}
                </p>
              </div>

            </div>

            {/* UAE Law Reference */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-amber-300/90 bg-amber-400/5 px-3 py-2 rounded-lg">
              <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{tip.uaeLawReference}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Official UAE Emergency & Hotline Directory */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              أرقام الطوارئ والجهات الرسمية في دبي
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              احتفظ بهذه الأرقام في هاتفك، الاتصال مجاني وعلى مدار 24 ساعة.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            جهات حكومية معتمدة 🇦🇪
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-slate-400 block mb-1">{contact.note}</span>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug">{contact.name}</h4>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-2">
                <span dir="ltr" className="font-mono text-base font-extrabold text-amber-400">
                  {contact.number}
                </span>
                <a
                  href={`tel:${contact.number}`}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white transition-colors"
                  title="اتصال مباشر"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
