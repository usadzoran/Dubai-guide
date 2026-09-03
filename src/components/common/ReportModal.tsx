import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Flag, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { ReportType } from '../../types';

export const ReportModal: React.FC = () => {
  const { reportModalOpen, reportTarget, closeReportModal, addReport } = useApp();

  const [reason, setReason] = useState<ReportType>('scam_whatsapp');
  const [details, setDetails] = useState('');
  const [scammerPhone, setScammerPhone] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!reportModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    addReport({
      targetType: (reportTarget?.type as ReportType) || reason,
      targetId: 'item-ref',
      targetTitle: reportTarget?.title || 'بلاغ عام',
      reason,
      details: `${details} ${scammerPhone ? `[رقم المحتال المبلغ عنه: ${scammerPhone}]` : ''}`,
      contactEmail: reporterContact || undefined
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDetails('');
      setScammerPhone('');
      setReporterContact('');
      closeReportModal();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeReportModal}
          className="absolute top-4 end-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">تم استلام البلاغ بنجاح</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              شكراً لوعيك وحرصك على حماية إخوانك الباحثين عن عمل وسكن. سيقوم المشرفون بفحص هذا البلاغ واتخاذ الإجراء اللازم.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <ShieldAlert className="w-5 h-5" />
              <span>إبلاغ عن محتوى أو إعلان مشبوه</span>
            </div>

            {reportTarget && (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-500 block mb-0.5">العنصر المُبلَّغ عنه:</span>
                <strong className="text-white">{reportTarget.title}</strong>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                نوع المخالفة أو الاشتباه
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportType)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="scam_whatsapp">احتيال عبر WhatsApp أو طلب أموال</option>
                <option value="fake_listing">سكن غير حقيقي / طلب عربون قبل المعاينة</option>
                <option value="asking_fees">مكتب يطلب رسوم تسجيل أو مقابلة</option>
                <option value="expired">إعلان قديم أو منتهي أو الرقم لا يرد</option>
                <option value="other">مخالفة أخرى</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                رقم هاتف المشتبه به (اختياري)
              </label>
              <input
                type="text"
                value={scammerPhone}
                onChange={(e) => setScammerPhone(e.target.value)}
                placeholder="مثال: +971501234567"
                dir="ltr"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                تفاصيل ما حدث معك *
              </label>
              <textarea
                required
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="صف ما حدث بدقة (مثلاً: طلب مني 300 درهم لفتح ملف، أو طلب تحويل عبر ويسترن يونيون)..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                بريدك الإلكتروني للتواصل معك إذا لزم الأمر (اختياري)
              </label>
              <input
                type="email"
                value={reporterContact}
                onChange={(e) => setReporterContact(e.target.value)}
                placeholder="email@example.com"
                dir="ltr"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeReportModal}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-md shadow-rose-900/30"
              >
                إرسال البلاغ
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
