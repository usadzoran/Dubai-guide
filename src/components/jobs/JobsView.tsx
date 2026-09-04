import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Briefcase, 
  Calendar, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { JOB_CATEGORIES, DUBAI_AREAS } from '../../data/jobs';
import { Job, JobStatus } from '../../types';
import { JobDetailModal } from './JobDetailModal';
import { AdFeedCard } from '../ads/AdFeedCard';

export const JobsView: React.FC = () => {
  const { 
    jobs, 
    searchQuery, 
    setSearchQuery, 
    selectedJob, 
    setSelectedJob, 
    savedJobIds, 
    toggleSaveJob,
    t 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedExp, setSelectedExp] = useState<string>('all');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  // Smart Search Expansion Logic (Item 25 in Prompt)
  const expandedQueryTerms = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const terms = [q];

    if (q.includes('سائق') || q.includes('سواقة') || q.includes('توصيل')) {
      terms.push('driver', 'delivery', 'van', 'courier', 'rider');
    }
    if (q.includes('مخزن') || q.includes('مستودع') || q.includes('تخزين') || q.includes('شحن')) {
      terms.push('warehouse', 'picker', 'storekeeper', 'helper', 'logistics', 'supply chain');
    }
    if (q.includes('أمن') || q.includes('حارس') || q.includes('سكيورتي')) {
      terms.push('security', 'guard', 'sira');
    }
    if (q.includes('مبيعات') || q.includes('بائع') || q.includes('كاشير')) {
      terms.push('sales', 'retail', 'cashier', 'associate');
    }
    if (q.includes('مطعم') || q.includes('ضيافة') || q.includes('مطبخ')) {
      terms.push('restaurant', 'catering', 'food', 'hotel');
    }
    if (q.includes('تنظيف') || q.includes('نظافة') || q.includes('عامل')) {
      terms.push('cleaner', 'helper', 'assistant');
    }
    if (q.includes('إدارة') || q.includes('سكرتار') || q.includes('مكتبي')) {
      terms.push('admin', 'office', 'clerk');
    }

    return terms;
  }, [searchQuery]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Saved filter
      if (onlySaved && !savedJobIds.includes(job.id)) return false;

      // Category filter
      if (selectedCategory !== 'all' && job.category !== selectedCategory) return false;

      // Area filter
      if (selectedArea !== 'all' && !job.location.toLowerCase().includes(selectedArea.toLowerCase())) return false;

      // Employment type filter
      if (selectedType !== 'all' && job.employmentType !== selectedType) return false;

      // Experience filter
      if (selectedExp !== 'all' && job.experience !== selectedExp) return false;

      // Smart Search filter
      if (expandedQueryTerms.length > 0) {
        const textToSearch = `${job.title} ${job.company} ${job.location} ${job.category} ${job.description} ${(job.requirements || []).join(' ')}`.toLowerCase();
        const matchesAny = expandedQueryTerms.some((term) => textToSearch.includes(term));
        if (!matchesAny) return false;
      }

      return true;
    });
  }, [jobs, selectedCategory, selectedArea, selectedType, selectedExp, expandedQueryTerms, onlySaved, savedJobIds]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedArea('all');
    setSelectedType('all');
    setSelectedExp('all');
    setSearchQuery('');
    setOnlySaved(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedArea !== 'all' || selectedType !== 'all' || selectedExp !== 'all' || searchQuery !== '' || onlySaved;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Header & Title */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/25 text-xs font-bold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>فرص عمل بروابط تقديم حقيقية</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              وظائف في دبي (Jobs in Dubai)
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              تصفح الوظائف المعروضة في دبي من مصادر معتمدة مثل LinkedIn وبوابات الشركات. التقديم يتم مباشرة عبر الموقع الأصلي دون وسيط.
            </p>
          </div>

          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`self-start sm:self-auto px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              onlySaved 
                ? 'bg-amber-400 text-slate-950 border-amber-400' 
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-slate-950' : ''}`} />
            <span>الوظائف المحفوظة ({savedJobIds.length})</span>
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>ملاحظة هامة:</strong> منصة DubaiStart لا تدعي ملكية هذه الوظائف ولا تستقبل سير ذاتية. التقديم يتم عبر المصادر الرسمية (مثل LinkedIn). لا تدفع أي رسوم لأي جهة.
          </span>
        </div>
      </div>

      {/* Search and Filters Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-lg space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالمسمى، الشركة، أو الكلمة الدلالية (مثال: سائق، مخزن، talabat، مساعد)..."
            className="w-full ps-10 pe-10 py-3 bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Keyword Synonyms Notice (Prompt 25) */}
        {expandedQueryTerms.length > 1 && (
          <div className="flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-400/10 px-3 py-1.5 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              البحث الذكي نشط: تم توسيع البحث ليشمل ({expandedQueryTerms.slice(1).join(', ')})
            </span>
          </div>
        )}

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
          
          {/* Category Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">المهنة / القطاع</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              {JOB_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Area Filter */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">المنطقة في دبي</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              {DUBAI_AREAS.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.label}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">نوع الدوام</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">جميع أنواع الدوام</option>
              <option value="Full Time">دوام كامل (Full Time)</option>
              <option value="Part Time">دوام جزئي (Part Time)</option>
              <option value="Contract">عقد محدد (Contract)</option>
            </select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">مستوى الخبرة</label>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="all">جميع المستويات</option>
              <option value="Entry Level">مبتدئ (Entry Level)</option>
              <option value="1-2 years">سنة إلى سنتين</option>
              <option value="3-5 years">3 إلى 5 سنوات</option>
              <option value="Experienced">خبير / متقدم</option>
            </select>
          </div>

        </div>

        {/* Reset Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>تم العثور على <strong>{filteredJobs.length}</strong> وظيفة مطابقة</span>
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:text-amber-300 font-bold underline"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">لا توجد وظائف مطابقة للبحث</h3>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-4">
            جرب تغيير الكلمات المفتاحية أو اختيار منطقة أخرى أو إعادة ضبط الفلاتر
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
          >
            إظهار كافة الوظائف
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredJobs.map((job, index) => {
            const isSaved = savedJobIds.includes(job.id);
            return (
              <React.Fragment key={job.id}>
                <div
                  className="group relative bg-slate-900 border border-slate-800 hover:border-amber-400/50 rounded-2xl p-5 transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between"
                >
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                        {job.category}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        المصدر: {job.source}
                      </span>
                      {job.status === 'active' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                          🟢 نشط
                        </span>
                      )}
                      {job.status === 'check_status' && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                          🟡 تحقق
                        </span>
                      )}
                      {job.status === 'expired' && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400">
                          🔴 منتهية
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved 
                          ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' 
                          : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                      }`}
                      title={isSaved ? 'إزالة من المحفوظات' : 'حفظ الوظيفة'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Company */}
                  <h3 
                    onClick={() => setSelectedJob(job)}
                    className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer mb-1"
                  >
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 flex-wrap">
                    <span className="font-semibold text-slate-200">{job.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{job.location}</span>
                    </span>
                    {job.salary && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400/90 font-medium">{job.salary}</span>
                      </>
                    )}
                  </div>

                  {/* Description snippet */}
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
                    {job.description}
                  </p>

                  {/* Meta Pills */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-4 flex-wrap">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {job.employmentType}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {job.experience}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                      {job.dateFound}
                    </span>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-slate-500">
                    التقديم عبر {job.source}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                      id={`btn-view-${job.id}`}
                    >
                      عرض الوظيفة
                    </button>
                    <a
                      href={job.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 transition-colors"
                      title="التقديم عبر المصدر الأصلي"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Main Card Div End */}
                </div>

                {index === 1 && (
                  <div className="md:col-span-2">
                    <AdFeedCard placement="jobs_feed" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Modal Popup */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

    </div>
  );
};
