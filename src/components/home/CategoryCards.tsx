import React from 'react';
import { useApp, NavTab } from '../../context/AppContext';
import { 
  Briefcase, 
  BedDouble, 
  Building2, 
  MapPin, 
  ShieldAlert, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';

export const CategoryCards: React.FC = () => {
  const { setActiveTab, language, t } = useApp();
  const isRtl = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const categories: {
    id: NavTab;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    badge?: string;
  }[] = [
    {
      id: 'jobs',
      title: t.catJobs,
      description: t.catJobsDesc,
      icon: <Briefcase className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500/15 to-transparent border-amber-500/30 hover:border-amber-400',
      badge: 'LinkedIn Sourced'
    },
    {
      id: 'housing',
      title: t.catHousing,
      description: t.catHousingDesc,
      icon: <BedDouble className="w-6 h-6 text-sky-400" />,
      color: 'from-sky-500/15 to-transparent border-sky-500/30 hover:border-sky-400',
      badge: 'قرب المترو'
    },
    {
      id: 'recruitment',
      title: t.catRecruitment,
      description: t.catRecruitmentDesc,
      icon: <Building2 className="w-6 h-6 text-indigo-400" />,
      color: 'from-indigo-500/15 to-transparent border-indigo-500/30 hover:border-indigo-400',
      badge: 'بدون رسوم'
    },
    {
      id: 'map',
      title: t.catPlaces,
      description: t.catPlacesDesc,
      icon: <MapPin className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/15 to-transparent border-emerald-500/30 hover:border-emerald-400',
      badge: 'خريطة تفاعلية'
    },
    {
      id: 'safety',
      title: t.catSafety,
      description: t.catSafetyDesc,
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      color: 'from-rose-500/15 to-transparent border-rose-500/30 hover:border-rose-400',
      badge: 'مهم جداً ⚠️'
    },
    {
      id: 'starter-plan',
      title: t.catStarter,
      description: t.catStarterDesc,
      icon: <Sparkles className="w-6 h-6 text-amber-300" />,
      color: 'from-amber-400/20 to-amber-600/10 border-amber-400/40 hover:border-amber-300',
      badge: 'خطة 7 أيام'
    }
  ];

  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.categoriesTitle}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          {t.categoriesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b bg-slate-900/90 border transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 ${cat.color}`}
            id={`card-${cat.id}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner group-hover:scale-105 transition-transform">
                {cat.icon}
              </div>
              {cat.badge && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                  {cat.badge}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
              {cat.title}
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 min-h-[38px]">
              {cat.description}
            </p>

            <div className="flex items-center text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors gap-1.5 pt-2 border-t border-slate-800/60">
              <span>استكشف القسم</span>
              <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
