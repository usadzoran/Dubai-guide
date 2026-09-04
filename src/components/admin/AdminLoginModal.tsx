import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Eye, EyeOff, ShieldCheck, X, KeyRound, AlertCircle, User, Users } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { 
    isAdminLoginModalOpen, 
    closeAdminLoginModal, 
    adminLogin,
    moderatorLogin,
    setActiveTab 
  } = useApp();

  const [mode, setMode] = useState<'moderator' | 'super_admin'>('moderator');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-detect login parameters in hash on modal open
  useEffect(() => {
    if (isAdminLoginModalOpen) {
      try {
        const hash = window.location.hash;
        if (hash.includes('user=')) {
          const queryPart = hash.substring(hash.indexOf('?') + 1);
          const params = new URLSearchParams(queryPart);
          const u = params.get('user');
          const k = params.get('key') || params.get('password');
          if (u) setUsername(u);
          if (k) setPassword(k);
          setMode('moderator');
        }
      } catch (e) {
        // ignore
      }
    }
  }, [isAdminLoginModalOpen]);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (mode === 'super_admin') {
        const success = adminLogin(password, rememberMe);
        if (success) {
          setPassword('');
          closeAdminLoginModal();
          setActiveTab('admin');
        } else {
          setError('رمز دخول المدير العام غير صحيح! الرمز الافتراضي هو: dubai2026');
        }
      } else {
        // Moderator mode
        if (!username.trim() || !password.trim()) {
          setError('يرجى إدخال اسم المستخدم وكلمة المرور');
          setLoading(false);
          return;
        }

        const res = moderatorLogin(username, password, rememberMe);
        if (res.success) {
          setUsername('');
          setPassword('');
          closeAdminLoginModal();
          setActiveTab('admin');
        } else {
          setError(res.message || 'بيانات الدخول غير صحيحة.');
        }
      }
      setLoading(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl p-6 sm:p-7 overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 end-0 -mt-10 -me-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAdminLoginModal}
          className="absolute top-4 end-4 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              بوابة الدخول الإدارية 🔐
            </h3>
            <p className="text-xs text-slate-400">
              تسجيل دخول المشرفين (Modérateurs) والمدير العام
            </p>
          </div>
        </div>

        {/* Role Mode Selector Tabs */}
        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('moderator');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'moderator'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>مشرف (Modérateur)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('super_admin');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'super_admin'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>المدير العام (Super Admin)</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'moderator' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  اسم المستخدم (Username)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoFocus
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="مثال: ahmed_jobs"
                    dir="ltr"
                    className="w-full px-4 py-2.5 ps-10 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <User className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كلمة مرور المشرف (Password)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="أدخل كلمة المرور الممنوحة لك..."
                    dir="ltr"
                    className="w-full px-4 py-2.5 pe-10 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs font-mono focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                كلمة مرور المدير العام (Master Password)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="أدخل كلمة مرور المدير العام..."
                  dir="ltr"
                  className="w-full px-4 py-2.5 pe-10 bg-slate-950 border border-slate-800 rounded-2xl text-white text-xs focus:outline-none focus:border-amber-400 transition-colors tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Remember me */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-amber-400 focus:ring-0 w-4 h-4"
              />
              <span>تذكر الجلسة</span>
            </label>
            {mode === 'super_admin' && (
              <span className="text-[11px] text-amber-400/80 font-mono">الافتراضي: dubai2026</span>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-98 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'جارٍ التحقق...' : (mode === 'moderator' ? 'دخول المشرف (Modérateur)' : 'دخول المدير العام')}</span>
            </button>
          </div>

          {/* Hint */}
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>معلومات الدخول:</span>
            </div>
            <p>• إذا وصلك رابط تسجيل دخول من المدير العام، اضغط عليه ليتم نقلك وتسجيلك تلقائياً.</p>
            <p>• يمكنك الضغط على <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono">Ctrl+Shift+A</kbd> في أي صفحة لفتح هذه النافذة.</p>
          </div>
        </form>

      </div>
    </div>
  );
};
