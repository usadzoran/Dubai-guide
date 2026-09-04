import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  UploadCloud, 
  ExternalLink, 
  Copy, 
  Check, 
  Server, 
  Table, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  SUPABASE_URL, 
  testSupabaseConnection, 
  SUPABASE_SQL_SCHEMA,
  upsertJobInSupabase,
  upsertHousingInSupabase,
  upsertOfficeInSupabase,
  upsertAdInSupabase
} from '../../lib/supabase';
import { useApp } from '../../context/AppContext';

export const AdminSupabaseSection: React.FC = () => {
  const { jobs, housing, recruitmentOffices, ads } = useApp();
  
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const checkConnection = async () => {
    setConnectionStatus('checking');
    setStatusMessage('جارٍ فحص الاتصال بـ Supabase...');
    const res = await testSupabaseConnection();
    if (res.success) {
      setConnectionStatus('connected');
      setStatusMessage(res.message);
    } else {
      setConnectionStatus('error');
      setStatusMessage(res.message);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleSyncAllToSupabase = async () => {
    setIsSyncing(true);
    setSyncProgress('جارٍ بدء المزامنة مع Supabase...');

    try {
      let jobCount = 0;
      let housingCount = 0;
      let officeCount = 0;
      let adCount = 0;

      setSyncProgress(`مزامنة الوظائف (${jobs.length})...`);
      for (const j of jobs) {
        await upsertJobInSupabase(j);
        jobCount++;
      }

      setSyncProgress(`مزامنة السكن (${housing.length})...`);
      for (const h of housing) {
        await upsertHousingInSupabase(h);
        housingCount++;
      }

      setSyncProgress(`مزامنة مكاتب التوظيف (${recruitmentOffices.length})...`);
      for (const o of recruitmentOffices) {
        await upsertOfficeInSupabase(o);
        officeCount++;
      }

      setSyncProgress(`مزامنة الإعلانات (${ads.length})...`);
      for (const a of ads) {
        await upsertAdInSupabase(a);
        adCount++;
      }

      setSyncProgress(
        `اكتملت المزامنة بنجاح! تم رفع: ${jobCount} وظيفة، ${housingCount} سكن، ${officeCount} مكتب، ${adCount} إعلان إلى Supabase.`
      );
    } catch (err: any) {
      setSyncProgress(`حدث خطأ أثناء المزامنة: ${err?.message || 'تأكد من إنشاء الجداول أولاً'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  قاعدة بيانات Supabase الرسمية
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  PostgreSQL Cloud
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                مشروع Supabase نشط ومربوط بالمنصة للحفظ السحابي والمزامنة الفورية.
              </p>
              <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="text-slate-500">مشروعك:</span>
                <span className="text-emerald-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                  {SUPABASE_URL}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={checkConnection}
              disabled={connectionStatus === 'checking'}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 border border-slate-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus === 'checking' ? 'animate-spin' : ''}`} />
              <span>فحص الاتصال</span>
            </button>

            <a
              href="https://supabase.com/dashboard/project/ozucwquzichilubjozuw/sql"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>فتح لوحة Supabase</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center gap-3">
          {connectionStatus === 'checking' && (
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{statusMessage}</span>
            </div>
          )}
          {connectionStatus === 'connected' && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}
          {connectionStatus === 'error' && (
            <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}
          {connectionStatus === 'idle' && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Server className="w-4 h-4" />
              <span>جاهز للاتصال بـ Supabase</span>
            </div>
          )}
        </div>
      </div>

      {/* Sync & Tables Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sync Current Data */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">مزامنة البيانات الحالية</h3>
                <p className="text-xs text-slate-400">رفع الوظائف والسكن والإعلانات الحالية إلى Supabase</p>
              </div>
            </div>

            <div className="space-y-2.5 my-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>الوظائف الجاهزة للرفع:</span>
                <span className="font-mono font-bold text-amber-400">{jobs.length} وظيفة</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>عقارات السكن:</span>
                <span className="font-mono font-bold text-amber-400">{housing.length} عقار</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>مكاتب التوظيف:</span>
                <span className="font-mono font-bold text-amber-400">{recruitmentOffices.length} مكتب</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>الإعلانات:</span>
                <span className="font-mono font-bold text-amber-400">{ads.length} إعلان</span>
              </div>
            </div>

            {syncProgress && (
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-emerald-300 animate-in fade-in">
                {syncProgress}
              </div>
            )}
          </div>

          <button
            onClick={handleSyncAllToSupabase}
            disabled={isSyncing}
            className="mt-5 w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>جارٍ رفع البيانات...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4" />
                <span>رفع ومزامنة الكل إلى Supabase</span>
              </>
            )}
          </button>
        </div>

        {/* Database Tables Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">جداول قاعدة البيانات</h3>
                <p className="text-xs text-slate-400">هيكل الجداول المهيأة داخل Supabase</p>
              </div>
            </div>

            <div className="space-y-2 my-4">
              {[
                { name: 'jobs', label: 'الوظائف الشاغرة', icon: Zap },
                { name: 'housing', label: 'خيارات السكن والمشاركة', icon: Zap },
                { name: 'recruitment_offices', label: 'مكاتب التوظيف المعتمدة', icon: Zap },
                { name: 'ads', label: 'الإعلانات والبانرات الترويجية', icon: Zap },
                { name: 'user_reports', label: 'سجلات بلاغات الاحتيال', icon: ShieldCheck },
              ].map(t => (
                <div key={t.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <t.icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono font-bold text-white">{t.name}</span>
                    <span className="text-slate-400 text-[11px]">({t.label})</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    RLS مفعّل
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>الجداول محمية عبر Row Level Security مع سياسات القراءة والكتابة العامة.</span>
          </div>
        </div>
      </div>

      {/* SQL Setup Instructions & Copy Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <span>كود إنشاء الجداول (Supabase SQL Schema)</span>
              <span className="text-xs font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                خطوة واحدة فقط
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              إذا لم تكن قد قمت بتشغيل السكربت بعد، انسخ الكود التالي وافتحه في <strong className="text-slate-200">SQL Editor</strong> في لوحة تحكم Supabase واضغط <strong className="text-emerald-400">RUN</strong>:
            </p>
          </div>

          <button
            onClick={copySqlToClipboard}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 border border-slate-700 self-start sm:self-auto shrink-0"
          >
            {copiedSql ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ كود الـ SQL</span>
              </>
            )}
          </button>
        </div>

        <div className="relative">
          <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-400/90 overflow-x-auto max-h-72 leading-relaxed selection:bg-emerald-500 selection:text-slate-950">
            {SUPABASE_SQL_SCHEMA}
          </pre>
        </div>
      </div>
    </div>
  );
};
