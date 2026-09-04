import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Globe, 
  Calendar, 
  Activity, 
  RotateCcw,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const AdminVisitorsSection: React.FC = () => {
  const { visitorStats, resetVisitorStats, simulateTestTraffic } = useApp();
  const [trafficAddedToast, setTrafficAddedToast] = useState(false);

  const handleSimulate = (amount: number) => {
    simulateTestTraffic(amount);
    setTrafficAddedToast(true);
    setTimeout(() => setTrafficAddedToast(false), 2500);
  };

  // Calculate maximum visits for chart scaling
  const maxDayVisits = Math.max(...visitorStats.dailyHistory.map(d => d.visits), 1);

  // Total page views sum
  const totalPageViews = Object.values(visitorStats.pageViews).reduce((a, b) => a + b, 0);

  const pageViewList = [
    { key: 'home', label: 'الصفحة الرئيسية', count: visitorStats.pageViews.home, color: 'bg-amber-400' },
    { key: 'jobs', label: 'قسم الوظائف', count: visitorStats.pageViews.jobs, color: 'bg-emerald-400' },
    { key: 'housing', label: 'قسم السكن والغرف', count: visitorStats.pageViews.housing, color: 'bg-sky-400' },
    { key: 'recruitment', label: 'مكاتب التوظيف المعتمدة', count: visitorStats.pageViews.recruitment, color: 'bg-indigo-400' },
    { key: 'map', label: 'خريطة دبي والمناطق', count: visitorStats.pageViews.map, color: 'bg-purple-400' },
    { key: 'starterPlan', label: 'خطة أول أسبوع في دبي', count: visitorStats.pageViews.starterPlan, color: 'bg-teal-400' },
    { key: 'safety', label: 'دليل الأمان ومكافحة الاحتيال', count: visitorStats.pageViews.safety, color: 'bg-rose-400' },
    { key: 'algeriaGuide', label: 'دليل الوافدين الجدد', count: visitorStats.pageViews.algeriaGuide, color: 'bg-orange-400' },
    { key: 'more', label: 'صفحة المزيد وأرقام الطوارئ', count: visitorStats.pageViews.more, color: 'bg-slate-400' }
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Top Banner Alert for simulation */}
      {trafficAddedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span>تمت محاكاة وإضافة زيارات تجريبية بنجاح لتحديث الرسوم البيانية!</span>
          <span className="text-emerald-400">✓</span>
        </div>
      )}

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Visits */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-400/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">إجمالي الزيارات</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {visitorStats.totalVisits.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% مقارنة بالأسبوع الماضي</span>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-400/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">الزوار الفريدون</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-400/15 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {visitorStats.uniqueVisitors.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400">
            <span>معدل تكرار الزيارة: 2.3 مرة</span>
          </div>
        </div>

        {/* Today Visits */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-sky-400/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">زيارات اليوم</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-400/15 text-sky-400 flex items-center justify-center border border-sky-400/30">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            {visitorStats.todayVisits.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>يتم التحديث لحظياً مع كل صفحة</span>
          </div>
        </div>

        {/* Online Now */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-400/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">المتصلين الآن</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
            <span>{visitorStats.liveOnline}</span>
            <span className="text-xs font-normal text-slate-400">مستخدم نشط</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>جلسات نشطة في الموقع</span>
          </div>
        </div>

      </div>

      {/* 7-Day Activity Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>معدل الزيارات لآخر 7 أيام (Daily Traffic)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              مقارنة بين إجمالي الزيارات اليومية والزوار الجدد الفريدين
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulate(50)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
              title="إضافة 50 زيارة تجريبية"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>+50 تجريبي</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('هل أنت متأكد من رغبتك في تصفير إحصائيات الزوار؟')) {
                  resetVisitorStats();
                }
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors border border-slate-700"
              title="تصفير الإحصائيات"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-48 sm:h-56 pt-8 pb-2 border-b border-slate-800">
          {visitorStats.dailyHistory.map((day, idx) => {
            const heightPercent = Math.min(100, Math.max(14, Math.round((day.visits / maxDayVisits) * 100)));
            const uniquePercent = Math.min(100, Math.max(10, Math.round((day.unique / maxDayVisits) * 100)));
            const isToday = idx === visitorStats.dailyHistory.length - 1;

            return (
              <div key={day.date} className="flex flex-col items-center h-full justify-end group relative">
                
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-950 border border-slate-700 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap shadow-xl z-20">
                  <div className="font-bold">{day.dayName} ({day.date})</div>
                  <div className="text-amber-400">{day.visits} زيارة ({day.unique} زائر)</div>
                </div>

                {/* Bars */}
                <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-full">
                  <div 
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday 
                        ? 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-lg shadow-amber-500/20' 
                        : 'bg-slate-700 group-hover:bg-amber-400/80'
                    }`}
                  />
                </div>

                {/* Day label */}
                <div className="mt-3 text-center">
                  <span className={`block text-[11px] sm:text-xs font-bold truncate ${isToday ? 'text-amber-400' : 'text-slate-400'}`}>
                    {day.dayName}
                  </span>
                  <span className="block text-[10px] text-slate-500 font-mono">
                    {day.visits}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-400" />
            <span>إجمالي الزيارات</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-700" />
            <span>الأيام السابقة</span>
          </div>
        </div>

      </div>

      {/* Breakdown Grid: Pages + Devices + Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Most Visited Pages */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">الصفحات والأقسام الأكثر زيارة</h3>
              <p className="text-xs text-slate-400">توزيع اهتمام الزوار على أقسام الموقع</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">{totalPageViews.toLocaleString()} مشاهدة</span>
          </div>

          <div className="space-y-3.5">
            {pageViewList.map((item) => {
              const percentage = totalPageViews > 0 ? Math.round((item.count / totalPageViews) * 100) : 0;
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono">{item.count.toLocaleString()}</span>
                      <span className="text-amber-400 font-bold w-10 text-end">{percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div 
                      style={{ width: `${percentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Devices & Geographic Breakdown */}
        <div className="space-y-6">
          
          {/* Devices Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">الأجهزة المستخدمة</h3>
            <p className="text-xs text-slate-400 mb-4">نوع الشاشات المستخدمة للتصفح</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">الهواتف الذكية</span>
                    <span className="block text-[10px] text-slate-400">Mobile Devices</span>
                  </div>
                </div>
                <span className="text-sm font-black text-amber-400 font-mono">
                  {visitorStats.deviceBreakdown.mobile}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-400/10 text-sky-400 flex items-center justify-center">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">أجهزة الكمبيوتر</span>
                    <span className="block text-[10px] text-slate-400">Desktop / Laptop</span>
                  </div>
                </div>
                <span className="text-sm font-black text-sky-400 font-mono">
                  {visitorStats.deviceBreakdown.desktop}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center">
                    <Tablet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">الأجهزة اللوحية</span>
                    <span className="block text-[10px] text-slate-400">Tablets & iPads</span>
                  </div>
                </div>
                <span className="text-sm font-black text-purple-400 font-mono">
                  {visitorStats.deviceBreakdown.tablet}%
                </span>
              </div>
            </div>
          </div>

          {/* Countries Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1">البلدان الأكثر تصفحاً</h3>
            <p className="text-xs text-slate-400 mb-4">تقدير جغرافي لاهتمام الزوار</p>

            <div className="space-y-2.5">
              {visitorStats.countryBreakdown.map(c => (
                <div key={c.code} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50 last:border-0">
                  <span className="text-slate-300 font-medium">{c.country}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-[11px]">{c.count.toLocaleString()}</span>
                    <span className="font-bold text-amber-400 w-8 text-end">{c.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
