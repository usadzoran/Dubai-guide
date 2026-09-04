import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Briefcase, BedDouble, MapPin, MoreHorizontal } from 'lucide-react';
import { NavTab } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: NavTab; label: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'الرئيسية',
      labelEn: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'jobs',
      label: 'الوظائف',
      labelEn: 'Jobs',
      icon: <Briefcase className="w-5 h-5" />
    },
    {
      id: 'housing',
      label: 'السكن',
      labelEn: 'Housing',
      icon: <BedDouble className="w-5 h-5" />
    },
    {
      id: 'map',
      label: 'الخريطة',
      labelEn: 'Map',
      icon: <MapPin className="w-5 h-5" />
    },
    {
      id: 'more',
      label: 'المزيد',
      labelEn: 'More',
      icon: <MoreHorizontal className="w-5 h-5" />
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 pb-safe shadow-2xl">
      <nav className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map(item => {
          const isActive = activeTab === item.id || (item.id === 'more' && ['starter-plan', 'recruitment', 'safety', 'algeria-guide', 'admin'].includes(activeTab));
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-h-[48px] py-1 transition-all relative select-none active:scale-95 ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={item.label}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
              )}
              <div className={`p-1 rounded-lg transition-transform duration-150 ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] sm:text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-black' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
