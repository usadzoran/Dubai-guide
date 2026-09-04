import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Job, HousingListing, RecruitmentOffice, UserReport, Language, ReportType } from '../types';
import { INITIAL_JOBS } from '../data/jobs';
import { INITIAL_HOUSING } from '../data/housing';
import { INITIAL_RECRUITMENT_OFFICES } from '../data/recruitment';
import { TRANSLATIONS } from '../data/translations';
import { safeGetItem, safeSetItem, safeRemoveItem, safeParseJSON } from '../utils/storage';

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
    safeSetItem('dubai_start_saved_jobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    safeSetItem('dubai_start_saved_housing', JSON.stringify(savedHousingIds));
  }, [savedHousingIds]);

  useEffect(() => {
    const onHashChange = () => {
      try {
        const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
        if (VALID_TABS.includes(rawHash as NavTab)) {
          setActiveTabState(rawHash as NavTab);
        } else if (!window.location.hash || window.location.hash === '#') {
          setActiveTabState('home');
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Tab management & window scroll reset
  const setActiveTab = (tab: NavTab) => {
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
  };

  // CRUD for Jobs
  const addJob = (jobData: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...jobData,
      id: 'job-' + Date.now()
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(job => job.id === id ? { ...job, ...updates } : job));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  // CRUD for Housing
  const addHousing = (hData: Omit<HousingListing, 'id'>) => {
    const newH: HousingListing = {
      ...hData,
      id: 'house-' + Date.now(),
      datePosted: 'اليوم'
    };
    setHousing(prev => [newH, ...prev]);
  };

  const updateHousing = (id: string, updates: Partial<HousingListing>) => {
    setHousing(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const deleteHousing = (id: string) => {
    setHousing(prev => prev.filter(h => h.id !== id));
  };

  // CRUD for Offices
  const addOffice = (oData: Omit<RecruitmentOffice, 'id'>) => {
    const newO: RecruitmentOffice = {
      ...oData,
      id: 'office-' + Date.now()
    };
    setRecruitmentOffices(prev => [newO, ...prev]);
  };

  const updateOffice = (id: string, updates: Partial<RecruitmentOffice>) => {
    setRecruitmentOffices(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const deleteOffice = (id: string) => {
    setRecruitmentOffices(prev => prev.filter(o => o.id !== id));
  };

  const updateReportStatus = (id: string, status: 'new' | 'reviewed' | 'dismissed') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
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
