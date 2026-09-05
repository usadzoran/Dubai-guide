import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Globe, 
  ShieldAlert, 
  Briefcase, 
  Home, 
  MapPin, 
  Compass, 
  Sparkles, 
  Lock,
  Bookmark,
  Menu,
  X
} from 'lucide-react';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    activeTab, 
    setActiveTab, 
    savedJobIds, 
    savedHousingIds,
    t 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const totalSaved = savedJobIds.length + savedHousingIds.length;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl">🇦🇪</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white font-sans">
                  Dubai<span className="text-amber-400">Start</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                  UAE
                </span>
              </div>
              <p className="text-xs text-slate-400 -mt-0.5 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'jobs' 
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t.catJobs}</span>
            </button>

            <button
              onClick={() => setActiveTab('housing')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'housing' 
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t.catHousing}</span>
            </button>

            <button
              onClick={() => setActiveTab('recruitment')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'recruitment' 
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t.catRecruitment}</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'map' 
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.catPlaces}</span>
            </button>

            <button
              onClick={() => setActiveTab('starter-plan')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'starter-plan' 
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.catStarter}</span>
            </button>

            <button
              onClick={() => setActiveTab('safety')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'safety' 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>{t.catSafety}</span>
            </button>
          </nav>

          {/* Right Action Icons & Language */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/70 text-slate-200 hover:border-amber-400/50 text-xs font-semibold transition-all cursor-pointer min-h-[38px]"
                title="Change Language"
                id="btn-language-toggle"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{language.toUpperCase()}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full mt-1 end-0 w-36 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl py-1 z-50 overflow-hidden">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors ${
                        language === l.code ? 'text-amber-400 bg-amber-400/10' : 'text-slate-300'
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Items badge */}
            {totalSaved > 0 && (
              <button 
                onClick={() => setActiveTab('more')}
                className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 hover:bg-slate-800 transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
                title="Saved Items"
              >
                <Bookmark className="w-4 h-4" />
                <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {totalSaved}
                </span>
              </button>
            )}

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[42px] min-h-[42px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white active:bg-slate-800 transition-colors cursor-pointer"
              id="btn-mobile-menu"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Collapsible Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800/80 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'home' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="text-base">🏠</span>
              <span>الرئيسية (Home)</span>
            </button>
            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'jobs' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>{t.catJobs}</span>
            </button>
            <button
              onClick={() => { setActiveTab('housing'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'housing' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>{t.catHousing}</span>
            </button>
            <button
              onClick={() => { setActiveTab('recruitment'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'recruitment' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t.catRecruitment}</span>
            </button>
            <button
              onClick={() => { setActiveTab('map'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'map' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{t.catPlaces}</span>
            </button>
            <button
              onClick={() => { setActiveTab('starter-plan'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'starter-plan' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.catStarter}</span>
            </button>
            <button
              onClick={() => { setActiveTab('algeria-guide'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'algeria-guide' ? 'bg-amber-400/15 text-amber-400 font-bold border border-amber-400/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="text-base">🇩🇿</span>
              <span>دليل القادمين من الجزائر والمغرب العربي</span>
            </button>
            <button
              onClick={() => { setActiveTab('safety'); setMobileMenuOpen(false); }}
              className={`w-full text-start px-3.5 py-3 min-h-[44px] rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === 'safety' ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>{t.catSafety}</span>
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
