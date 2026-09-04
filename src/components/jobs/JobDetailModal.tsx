import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Building, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Bookmark,
  Share2,
  Flag
} from 'lucide-react';
import { Job } from '../../types';

interface Props {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<Props> = ({ job, onClose }) => {
  const { savedJobIds, toggleSaveJob, openReportModal, t } = useApp();

  if (!job) return null;

  const [copied, setCopied] = useState(false);
  const isSaved = savedJobIds.includes(job.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} at ${job.company} - DubaiStart`,
          text: `فرصة عمل في دبي: ${job.title} لدى ${job.company}`,
          url: window.location.href
        });
      } catch {
        // user cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unavailable
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  {job.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  المصدر: {job.source}
                </span>
                {job.status === 'active' && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    🟢 نشط
                  </span>
                )}
                {job.status === 'check_status' && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    🟡 تحقق من الحالة
                  </span>
                )}
                {job.status === 'expired' && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    🔴 قد تكون منتهية
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">
                {job.title}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-slate-300 text-sm">
                <Building className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">{job.company}</span>
                <span>•</span>
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{job.location}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Status Alert if not active */}
          {job.status !== 'active' && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>قد تكون الوظيفة انتهت أو اكتمل عدد المتقدمين. يرجى التحقق مباشرة من الرابط الأصلي.</span>
            </div>
          )}

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">نوع العمل</span>
              <span className="font-bold text-white text-xs sm:text-sm">{job.employmentType}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">مستوى الخبرة</span>
              <span className="font-bold text-white text-xs sm:text-sm">{job.experience}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">الراتب المتوقع</span>
              <span className="font-bold text-amber-400 text-xs sm:text-sm">{job.salary || 'حسب المقابلة'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">تاريخ الرصد</span>
              <span className="font-bold text-white text-xs sm:text-sm">{job.dateFound}</span>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>وصف الدور والمسؤوليات (ملخص)</span>
            </h4>
            <p className="leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm">
              {job.description}
            </p>
          </div>

          {/* Requirements List */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-white font-bold text-sm mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>المتطلبات الأساسية للقبول</span>
              </h4>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div className="font-bold text-amber-400">
              ملاحظة التقديم الرسمية:
            </div>
            <p>
              هذا الإعلان مصدره <strong className="text-white">{job.source}</strong>. منصة DubaiStart لا تستقبل طلبات التوظيف ولا تطلب أي معلومات سرية أو كلمات مرور. اضغط على الزر الأخضر بالأسفل للانتقال فوراً والتقديم عبر المصدر الأصلي المعتمد.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSaveJob(job.id)}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                isSaved 
                  ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
              <span>{isSaved ? 'محفوظة' : 'حفظ'}</span>
            </button>

            <button
              onClick={handleShare}
              className={`p-2.5 rounded-xl border transition-colors text-xs font-semibold flex items-center gap-1 ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'تم النسخ ✓' : 'مشاركة'}</span>
            </button>

            <button
              onClick={() => openReportModal(`${job.title} (${job.company})`, 'job')}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:text-rose-400 transition-colors text-xs font-semibold flex items-center gap-1"
              title="إبلاغ عن إعلان مشبوه"
            >
              <Flag className="w-4 h-4" />
              <span>إبلاغ</span>
            </button>
          </div>

          {/* Primary Apply Button */}
          <a
            href={job.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>التقديم عبر {job.source} (المصدر الأصلي)</span>
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>

      </div>
    </div>
  );
};
