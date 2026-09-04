import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react';

export const AdminStatusBadge: React.FC = () => {
  const { isAdminAuthenticated, activeTab, setActiveTab, adminLogout } = useApp();

  if (!isAdminAuthenticated) return null;

  return (
    <div className="fixed top-2 end-2 sm:top-3 sm:end-3 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900/90 backdrop-blur-md border border-amber-400/60 rounded-2xl px-3 py-1.5 shadow-2xl flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">مشرف النظام</span>
        </div>

        {activeTab !== 'admin' ? (
          <button
            onClick={() => setActiveTab('admin')}
            className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors flex items-center gap-1"
            title="الانتقال إلى لوحة التحكم"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>لوحة الإدارة</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('home')}
            className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 hover:text-white transition-colors"
          >
            معاينة الموقع
          </button>
        )}

        <button
          onClick={adminLogout}
          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="تسجيل الخروج من الإدارة"
          aria-label="تسجيل خروج"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
