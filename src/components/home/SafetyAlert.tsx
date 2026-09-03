import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';

export const SafetyAlert: React.FC = () => {
  const { setActiveTab, language, t } = useApp();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4 sm:my-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/70 via-rose-950/40 to-slate-900 border border-rose-800/50 p-5 sm:p-6 shadow-lg">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  تنبيه قانوني هام
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {t.safetyAlertTitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-3xl">
                {t.safetyAlertText}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('safety')}
            className="self-stretch md:self-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md shadow-rose-900/30"
          >
            <span>{t.safetyAlertBtn}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
