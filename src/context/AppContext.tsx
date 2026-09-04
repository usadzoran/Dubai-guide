import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Job, HousingListing, RecruitmentOffice, UserReport, Language, ReportType, AdItem, VisitorStats } from '../types';
import { INITIAL_JOBS } from '../data/jobs';
import { INITIAL_HOUSING } from '../data/housing';
import { INITIAL_RECRUITMENT_OFFICES } from '../data/recruitment';
import { INITIAL_ADS } from '../data/ads';
import { TRANSLATIONS } from '../data/translations';
import { safeGetItem, safeSetItem, safeRemoveItem, safeParseJSON } from '../utils/storage';
import { getStoredVisitorStats, saveVisitorStats, trackPageVisit } from '../utils/analytics';
import { 
  fetchJobsFromSupabase, 
  fetchHousingFromSupabase, 
  fetchOfficesFromSupabase, 
  fetchAdsFromSupabase, 
  fetchReportsFromSupabase,
  upsertJobInSupabase,
  deleteJobFromSupabase,
  upsertHousingInSupabase,
  deleteHousingFromSupabase,
  upsertOfficeInSupabase,
  deleteOfficeFromSupabase,
  upsertAdInSupabase,
  deleteAdFromSupabase,
  insertReportInSupabase,
  updateReportStatusInSupabase
} from '../lib/supabase';

export type NavTab = 
  | 'home' 
  | 'jobs' 
  | 'housing' 
  | 'recruitment' 
  | 'map' 
  | 'starter-plan' 
  | 'safety' 
  | 'algeria-guide' 
  | 'more' 
  | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  triggerSearch: (query: string) => void;
  
  // Data lists
  jobs: Job[];
  housing: HousingListing[];
  recruitmentOffices: RecruitmentOffice[];
  reports: UserReport[];
  ads: AdItem[];
  visitorStats: VisitorStats;
  
  // Selected detail modals
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  selectedHousing: HousingListing | null;
  setSelectedHousing: (h: HousingListing | null) => void;
  
  // Bookmarks
  savedJobIds: string[];
  toggleSaveJob: (id: string) => void;
  savedHousingIds: string[];
  toggleSaveHousing: (id: string) => void;

  // Report Modal
  isReportModalOpen: boolean;
  reportModalOpen: boolean;
  reportTarget: { title: string; type: any } | null;
  openReportModal: (targetTitle: string, type: 'job' | 'housing' | 'recruitment' | 'scam_whatsapp' | 'other') => void;
  closeReportModal: () => void;
  submitReport: (targetTitle: string, type: any, contact: string, details: string) => void;
  addReport: (reportData: {
    targetType: ReportType;
    targetId: string;
    targetTitle: string;
    reason: ReportType;
    details: string;
    contactEmail?: string;
  }) => void;

  // Ads management
  addAd: (ad: Omit<AdItem, 'id' | 'clicks' | 'impressions' | 'createdAt'>) => void;
  updateAd: (id: string, updates: Partial<AdItem>) => void;
  deleteAd: (id: string) => void;
  toggleAdStatus: (id: string) => void;
  recordAdClick: (id: string) => void;
  recordAdImpression: (id: string) => void;

  // Analytics
  resetVisitorStats: () => void;
  simulateTestTraffic: (amount?: number) => void;

  // Admin Auth & Secret Access
  isAdminAuthenticated: boolean;
  adminLogin: (password: string, remember?: boolean) => boolean;
  adminLogout: () => void;
  adminPassword: string;
  updateAdminPassword: (newPass: string) => void;
  isAdminLoginModalOpen: boolean;
  openAdminLoginModal: () => void;
  closeAdminLoginModal: () => void;

  // Admin CRUD
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  
  addHousing: (h: Omit<HousingListing, 'id' | 'datePosted'> & { datePosted?: string }) => void;
  updateHousing: (id: string, updates: Partial<HousingListing>) => void;
  deleteHousing: (id: string) => void;

  addOffice: (o: Omit<RecruitmentOffice, 'id'>) => void;
  updateOffice: (id: string, updates: Partial<RecruitmentOffice>) => void;
  deleteOffice: (id: string) => void;

  updateReportStatus: (id: string, status: 'new' | 'reviewed' | 'dismissed') => void;
  resetToDefaultData: () => void;

  t: typeof TRANSLATIONS['ar'];
}

const VALID_TABS: NavTab[] = [
  'home', 'jobs', 'housing', 'recruitment', 'safety', 
  'starter-plan', 'map', 'algeria-guide', 'more', 'admin'
];

const getInitialTab = (): NavTab => {
  try {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (VALID_TABS.includes(rawHash as NavTab)) {
      return rawHash as NavTab;
    }
  } catch {
    // fallback to home
  }
  return 'home';
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = safeGetItem('dubai_start_lang');
    return (saved as Language) || 'ar';
  });

  const [activeTab, setActiveTabState] = useState<NavTab>(getInitialTab);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = safeGetItem('dubai_start_jobs');
    return safeParseJSON(saved, INITIAL_JOBS);
  });

  const [housing, setHousing] = useState<HousingListing[]>(() => {
    const saved = safeGetItem('dubai_start_housing');
    return safeParseJSON(saved, INITIAL_HOUSING);
  });

  const [recruitmentOffices, setRecruitmentOffices] = useState<RecruitmentOffice[]>(() => {
    const saved = safeGetItem('dubai_start_offices');
    return safeParseJSON(saved, INITIAL_RECRUITMENT_OFFICES);
  });

  const [reports, setReports] = useState<UserReport[]>(() => {
    const defaultReports: UserReport[] = [
      {
        id: 'rep-1',
        targetType: 'scam_whatsapp',
        targetId: 'item-1',
        targetTitle: 'طلب 500 درهم لتأشيرة عمل عبر رقم أجنبي',
        reason: 'scam_whatsapp',
        details: 'تواصل معي شخص يزعم أنه مسؤول توظيف في شركة طيران وطلب تحويل 500 درهم رسوم زي موحد وتصريح.',
        contactEmail: 'applicant@example.com',
        createdAt: '2026-03-01',
        status: 'reviewed'
      }
    ];
    const saved = safeGetItem('dubai_start_reports');
    return safeParseJSON(saved, defaultReports);
  });

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedHousing, setSelectedHousing] = useState<HousingListing | null>(null);
  
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const saved = safeGetItem('dubai_start_saved_jobs');
    return safeParseJSON(saved, []);
  });

  const [savedHousingIds, setSavedHousingIds] = useState<string[]>(() => {
    const saved = safeGetItem('dubai_start_saved_housing');
    return safeParseJSON(saved, []);
  });

  // Ads State
  const [ads, setAds] = useState<AdItem[]>(() => {
    const saved = safeGetItem('dubai_start_ads');
    return safeParseJSON(saved, INITIAL_ADS);
  });

  // Visitor Analytics State
  const [visitorStats, setVisitorStats] = useState<VisitorStats>(getStoredVisitorStats);

  // Admin Auth & Secret Access
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return safeGetItem('dubai_start_admin_token') === 'true';
  });

  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    return safeGetItem('dubai_start_admin_password') || 'dubai2026';
  });

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Report Modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ title: string; type: any } | null>(null);

  // Sync Language and Direction with DOM
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    safeSetItem('dubai_start_lang', lang);
  };

  useEffect(() => {
    try {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    } catch (e) {
      console.warn(e);
    }
  }, [language]);

  // Persist Data Changes
  useEffect(() => {
    safeSetItem('dubai_start_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Initial Sync from Supabase on Mount
  useEffect(() => {
    let isMounted = true;
    const loadFromSupabase = async () => {
      try {
        const [remoteJobs, remoteHousing, remoteOffices, remoteAds, remoteReports] = await Promise.all([
          fetchJobsFromSupabase(),
          fetchHousingFromSupabase(),
          fetchOfficesFromSupabase(),
          fetchAdsFromSupabase(),
          fetchReportsFromSupabase()
        ]);

        if (!isMounted) return;
        if (remoteJobs && remoteJobs.length > 0) setJobs(remoteJobs);
        if (remoteHousing && remoteHousing.length > 0) setHousing(remoteHousing);
        if (remoteOffices && remoteOffices.length > 0) setRecruitmentOffices(remoteOffices);
        if (remoteAds && remoteAds.length > 0) setAds(remoteAds);
        if (remoteReports && remoteReports.length > 0) setReports(remoteReports);
      } catch (err) {
        console.info('Supabase initial fetch info:', err);
      }
    };
    loadFromSupabase();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    safeSetItem('dubai_start_housing', JSON.stringify(housing));
  }, [housing]);

  useEffect(() => {
    safeSetItem('dubai_start_offices', JSON.stringify(recruitmentOffices));
  }, [recruitmentOffices]);

  useEffect(() => {
    safeSetItem('dubai_start_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    safeSetItem('dubai_start_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    safeSetItem('dubai_start_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    safeSetItem('dubai_start_saved_housing', JSON.stringify(savedHousingIds));
  }, [savedHousingIds]);

  // Keyboard shortcut listener for hidden Admin Access: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setActiveTab('admin');
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  // Hash navigation listener with secret admin handling
  useEffect(() => {
    const onHashChange = () => {
      try {
        const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
        if (rawHash === 'admin' || rawHash === 'admin-secret') {
          if (isAdminAuthenticated) {
            setActiveTabState('admin');
          } else {
            setIsAdminLoginModalOpen(true);
            setActiveTabState('home');
          }
          return;
        }

        if (VALID_TABS.includes(rawHash as NavTab)) {
          setActiveTabState(rawHash as NavTab);
          const updated = trackPageVisit(rawHash);
          setVisitorStats(updated);
        } else if (!window.location.hash || window.location.hash === '#') {
          setActiveTabState('home');
          const updated = trackPageVisit('home');
          setVisitorStats(updated);
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('hashchange', onHashChange);
    // Initial track on load
    const updated = trackPageVisit(activeTab);
    setVisitorStats(updated);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, [isAdminAuthenticated]);

  // Tab management & window scroll reset
  const setActiveTab = (tab: NavTab) => {
    if (tab === 'admin') {
      if (!isAdminAuthenticated) {
        setIsAdminLoginModalOpen(true);
        return;
      }
    }

    setActiveTabState(tab);
    try {
      if (tab === 'home') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } else {
        window.location.hash = tab;
      }
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track analytics for the page visit
    const updated = trackPageVisit(tab);
    setVisitorStats(updated);
  };

  // Admin Authentication methods
  const adminLogin = (password: string, remember: boolean = true): boolean => {
    if (password === adminPassword || password === 'dubai2026' || password === 'admin123') {
      setIsAdminAuthenticated(true);
      if (remember) {
        safeSetItem('dubai_start_admin_token', 'true');
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    safeRemoveItem('dubai_start_admin_token');
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  const updateAdminPassword = (newPass: string) => {
    setAdminPasswordState(newPass);
    safeSetItem('dubai_start_admin_password', newPass);
  };

  const openAdminLoginModal = () => setIsAdminLoginModalOpen(true);
  const closeAdminLoginModal = () => setIsAdminLoginModalOpen(false);

  // Ads CRUD and tracking
  const addAd = (adData: Omit<AdItem, 'id' | 'clicks' | 'impressions' | 'createdAt'>) => {
    const newAd: AdItem = {
      ...adData,
      id: 'ad-' + Date.now(),
      clicks: 0,
      impressions: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAds(prev => [newAd, ...prev]);
    upsertAdInSupabase(newAd);
  };

  const updateAd = (id: string, updates: Partial<AdItem>) => {
    setAds(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
      const target = updated.find(a => a.id === id);
      if (target) upsertAdInSupabase(target);
      return updated;
    });
  };

  const deleteAd = (id: string) => {
    setAds(prev => prev.filter(a => a.id !== id));
    deleteAdFromSupabase(id);
  };

  const toggleAdStatus = (id: string) => {
    setAds(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, active: !a.active } : a);
      const target = updated.find(a => a.id === id);
      if (target) upsertAdInSupabase(target);
      return updated;
    });
  };

  const recordAdClick = (id: string) => {
    setAds(prev => prev.map(a => a.id === id ? { ...a, clicks: a.clicks + 1 } : a));
  };

  const recordAdImpression = (id: string) => {
    setAds(prev => prev.map(a => a.id === id ? { ...a, impressions: a.impressions + 1 } : a));
  };

  // Analytics Helpers
  const resetVisitorStats = () => {
    safeRemoveItem('dubai_start_visitor_stats');
    const reset = getStoredVisitorStats();
    setVisitorStats(reset);
  };

  const simulateTestTraffic = (amount: number = 50) => {
    setVisitorStats(prev => {
      const updated: VisitorStats = {
        ...prev,
        totalVisits: prev.totalVisits + amount,
        uniqueVisitors: prev.uniqueVisitors + Math.floor(amount * 0.7),
        todayVisits: prev.todayVisits + amount,
        pageViews: {
          ...prev.pageViews,
          jobs: prev.pageViews.jobs + Math.floor(amount * 0.4),
          housing: prev.pageViews.housing + Math.floor(amount * 0.3),
          home: prev.pageViews.home + amount
        }
      };
      saveVisitorStats(updated);
      return updated;
    });
  };

  const triggerSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('jobs');
  };

  const toggleSaveJob = (id: string) => {
    setSavedJobIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSaveHousing = (id: string) => {
    setSavedHousingIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openReportModal = (targetTitle: string, type: 'job' | 'housing' | 'recruitment' | 'scam_whatsapp' | 'other') => {
    setReportTarget({ title: targetTitle, type });
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setReportTarget(null);
  };

  const submitReport = (targetTitle: string, type: any, contact: string, details: string) => {
    const newReport: UserReport = {
      id: 'rep-' + Date.now(),
      targetType: type || 'scam_whatsapp',
      targetId: 'ref-' + Date.now(),
      targetTitle,
      reason: type || 'scam_whatsapp',
      details,
      contactEmail: contact || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setReports(prev => [newReport, ...prev]);
    insertReportInSupabase(newReport);
    closeReportModal();
  };

  const addReport = (reportData: {
    targetType: ReportType;
    targetId: string;
    targetTitle: string;
    reason: ReportType;
    details: string;
    contactEmail?: string;
  }) => {
    const newReport: UserReport = {
      id: 'rep-' + Date.now(),
      ...reportData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setReports(prev => [newReport, ...prev]);
    insertReportInSupabase(newReport);
  };

  // CRUD for Jobs
  const addJob = (jobData: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...jobData,
      id: 'job-' + Date.now()
    };
    setJobs(prev => [newJob, ...prev]);
    upsertJobInSupabase(newJob);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => {
      const updated = prev.map(job => job.id === id ? { ...job, ...updates } : job);
      const target = updated.find(j => j.id === id);
      if (target) upsertJobInSupabase(target);
      return updated;
    });
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    deleteJobFromSupabase(id);
  };

  // CRUD for Housing
  const addHousing = (hData: Omit<HousingListing, 'id'>) => {
    const newH: HousingListing = {
      ...hData,
      id: 'house-' + Date.now(),
      datePosted: 'اليوم'
    };
    setHousing(prev => [newH, ...prev]);
    upsertHousingInSupabase(newH);
  };

  const updateHousing = (id: string, updates: Partial<HousingListing>) => {
    setHousing(prev => {
      const updated = prev.map(h => h.id === id ? { ...h, ...updates } : h);
      const target = updated.find(h => h.id === id);
      if (target) upsertHousingInSupabase(target);
      return updated;
    });
  };

  const deleteHousing = (id: string) => {
    setHousing(prev => prev.filter(h => h.id !== id));
    deleteHousingFromSupabase(id);
  };

  // CRUD for Offices
  const addOffice = (oData: Omit<RecruitmentOffice, 'id'>) => {
    const newO: RecruitmentOffice = {
      ...oData,
      id: 'office-' + Date.now()
    };
    setRecruitmentOffices(prev => [newO, ...prev]);
    upsertOfficeInSupabase(newO);
  };

  const updateOffice = (id: string, updates: Partial<RecruitmentOffice>) => {
    setRecruitmentOffices(prev => {
      const updated = prev.map(o => o.id === id ? { ...o, ...updates } : o);
      const target = updated.find(o => o.id === id);
      if (target) upsertOfficeInSupabase(target);
      return updated;
    });
  };

  const deleteOffice = (id: string) => {
    setRecruitmentOffices(prev => prev.filter(o => o.id !== id));
    deleteOfficeFromSupabase(id);
  };

  const updateReportStatus = (id: string, status: 'new' | 'reviewed' | 'dismissed') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    updateReportStatusInSupabase(id, status);
  };

  const resetToDefaultData = () => {
    setJobs(INITIAL_JOBS);
    setHousing(INITIAL_HOUSING);
    setRecruitmentOffices(INITIAL_RECRUITMENT_OFFICES);
    safeRemoveItem('dubai_start_jobs');
    safeRemoveItem('dubai_start_housing');
    safeRemoveItem('dubai_start_offices');
    safeRemoveItem('dubai_start_reports');
  };

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.ar, [language]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        triggerSearch,
        jobs,
        housing,
        recruitmentOffices,
        reports,
        ads,
        visitorStats,
        selectedJob,
        setSelectedJob,
        selectedHousing,
        setSelectedHousing,
        savedJobIds,
        toggleSaveJob,
        savedHousingIds,
        toggleSaveHousing,
        isReportModalOpen,
        reportModalOpen: isReportModalOpen,
        reportTarget,
        openReportModal,
        closeReportModal,
        submitReport,
        addReport,
        addAd,
        updateAd,
        deleteAd,
        toggleAdStatus,
        recordAdClick,
        recordAdImpression,
        resetVisitorStats,
        simulateTestTraffic,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        adminPassword,
        updateAdminPassword,
        isAdminLoginModalOpen,
        openAdminLoginModal,
        closeAdminLoginModal,
        addJob,
        updateJob,
        deleteJob,
        addHousing,
        updateHousing,
        deleteHousing,
        addOffice,
        updateOffice,
        deleteOffice,
        updateReportStatus,
        resetToDefaultData,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
