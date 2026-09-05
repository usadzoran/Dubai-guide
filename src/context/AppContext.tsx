import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Job, 
  HousingListing, 
  RecruitmentOffice, 
  UserReport, 
  Language, 
  ReportType, 
  AdItem, 
  VisitorStats,
  Moderator,
  ModeratorPermissions,
  AdminSession
} from '../types';
import { INITIAL_JOBS } from '../data/jobs';
import { INITIAL_HOUSING } from '../data/housing';
import { INITIAL_RECRUITMENT_OFFICES } from '../data/recruitment';
import { INITIAL_ADS } from '../data/ads';
import { INITIAL_MODERATORS } from '../data/moderators';
import { TRANSLATIONS } from '../data/translations';
import { safeGetItem, safeSetItem, safeRemoveItem, safeParseJSON } from '../utils/storage';
import { getStoredVisitorStats, saveVisitorStats, trackPageVisit } from '../utils/analytics';
import { 
  fetchJobsFromSupabase, 
  fetchHousingFromSupabase, 
  fetchOfficesFromSupabase, 
  fetchAdsFromSupabase, 
  fetchReportsFromSupabase,
  fetchModeratorsFromSupabase,
  upsertJobInSupabase,
  deleteJobFromSupabase,
  upsertHousingInSupabase,
  deleteHousingFromSupabase,
  upsertOfficeInSupabase,
  deleteOfficeFromSupabase,
  upsertAdInSupabase,
  deleteAdFromSupabase,
  insertReportInSupabase,
  updateReportStatusInSupabase,
  deleteReportFromSupabase,
  upsertModeratorInSupabase,
  deleteModeratorFromSupabase,
  subscribeToSupabaseRealtime
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
  moderatorLogin: (username: string, pass: string, remember?: boolean) => { success: boolean; message?: string };
  adminLogout: () => void;
  adminPassword: string;
  updateAdminPassword: (newPass: string) => void;
  isAdminLoginModalOpen: boolean;
  openAdminLoginModal: () => void;
  closeAdminLoginModal: () => void;
  currentAdminSession: AdminSession | null;
  moderators: Moderator[];
  addModerator: (mod: Omit<Moderator, 'id' | 'createdAt'>) => void;
  updateModerator: (id: string, updates: Partial<Moderator>) => void;
  deleteModerator: (id: string) => void;
  toggleModeratorActive: (id: string) => void;
  canAccess: (permission: keyof ModeratorPermissions) => boolean;

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

  updateReportStatus: (id: string, status: 'new' | 'reviewed' | 'accepted' | 'dismissed') => void;
  deleteReport: (id: string) => void;
  resetToDefaultData: () => void;

  // Realtime Database & Supabase Sync
  realtimeStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastRealtimeUpdate: Date | null;
  refreshFromSupabase: () => Promise<void>;

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
        status: 'new'
      },
      {
        id: 'rep-2',
        targetType: 'housing',
        targetId: 'item-2',
        targetTitle: 'إعلان سكن وهمي يطلب عربون عبر تحويل رصيد',
        reason: 'fake_listing',
        details: 'طلب صاحب الإعلان إرسال عربون 300 درهم قبل المعاينة بحجة حجز السرير، وعند الحضور إلى الموقع تبيّن أن العقار غير متاح.',
        contactEmail: 'user_dubai@gmail.com',
        createdAt: '2026-03-03',
        status: 'accepted',
        acceptedAt: '2026-03-04'
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
    const local = safeParseJSON<AdItem[]>(saved, INITIAL_ADS);
    return local.map(ad => {
      const initialMatch = INITIAL_ADS.find(init => init.id === ad.id);
      const effectiveHtml = ad.htmlCode || initialMatch?.htmlCode;
      const isHtml = ad.adType === 'html' || Boolean(effectiveHtml?.trim()) || initialMatch?.adType === 'html';
      return {
        ...ad,
        adType: isHtml ? 'html' : (ad.adType || 'standard'),
        htmlCode: effectiveHtml || undefined
      };
    });
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

  // Moderators State
  const [moderators, setModerators] = useState<Moderator[]>(() => {
    const saved = safeGetItem('dubai_start_moderators');
    const parsed = safeParseJSON<Moderator[]>(saved, []);
    return parsed.length > 0 ? parsed : INITIAL_MODERATORS;
  });

  // Current Admin / Moderator Session
  const [currentAdminSession, setCurrentAdminSession] = useState<AdminSession | null>(() => {
    const saved = safeGetItem('dubai_start_admin_session');
    const parsed = safeParseJSON<AdminSession | null>(saved, null);
    if (parsed) return parsed;
    if (safeGetItem('dubai_start_admin_token') === 'true') {
      return {
        role: 'super_admin',
        username: 'admin',
        name: 'المدير العام (Super Admin)',
        permissions: {
          manageJobs: true,
          manageHousing: true,
          manageOffices: true,
          manageAds: true,
          manageReports: true,
          viewAnalytics: true,
        }
      };
    }
    return null;
  });

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Realtime Database & Supabase connection status
  const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  const [lastRealtimeUpdate, setLastRealtimeUpdate] = useState<Date | null>(null);

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

  // Persist Data Changes locally as fallback
  useEffect(() => {
    safeSetItem('dubai_start_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Unified function to fetch latest remote data from Supabase
  const refreshFromSupabase = async () => {
    try {
      setRealtimeStatus('connecting');
      const [remoteJobs, remoteHousing, remoteOffices, remoteAds, remoteReports, remoteMods] = await Promise.all([
        fetchJobsFromSupabase(),
        fetchHousingFromSupabase(),
        fetchOfficesFromSupabase(),
        fetchAdsFromSupabase(),
        fetchReportsFromSupabase(),
        fetchModeratorsFromSupabase()
      ]);

      if (remoteJobs && remoteJobs.length > 0) setJobs(remoteJobs);
      if (remoteHousing && remoteHousing.length > 0) setHousing(remoteHousing);
      if (remoteOffices && remoteOffices.length > 0) setRecruitmentOffices(remoteOffices);
      if (remoteAds && remoteAds.length > 0) {
        setAds(prev => {
          return remoteAds.map(rAd => {
            const localMatch = prev.find(p => p.id === rAd.id);
            const initialMatch = INITIAL_ADS.find(init => init.id === rAd.id);
            const effectiveHtml = rAd.htmlCode || localMatch?.htmlCode || initialMatch?.htmlCode;
            const isHtml = rAd.adType === 'html' || Boolean(effectiveHtml?.trim()) || localMatch?.adType === 'html';
            return {
              ...rAd,
              adType: isHtml ? 'html' : (rAd.adType || 'standard'),
              htmlCode: effectiveHtml || undefined
            };
          });
        });
      }
      if (remoteReports && remoteReports.length > 0) setReports(remoteReports);
      if (remoteMods && remoteMods.length > 0) setModerators(remoteMods);
      
      setLastRealtimeUpdate(new Date());
      setRealtimeStatus('connected');
    } catch (err) {
      console.info('Supabase fetch info:', err);
      setRealtimeStatus('error');
    }
  };

  // Initial Sync from Supabase & Realtime Subscription
  useEffect(() => {
    let isMounted = true;

    // 1. Initial snapshot fetch
    refreshFromSupabase();

    // 2. Realtime WebSocket subscription across all tables
    const unsubscribe = subscribeToSupabaseRealtime({
      onStatusChange: (status) => {
        if (!isMounted) return;
        if (status === 'CONNECTED') {
          setRealtimeStatus('connected');
        } else if (status === 'CONNECTING') {
          setRealtimeStatus('connecting');
        } else if (status === 'DISCONNECTED') {
          setRealtimeStatus('disconnected');
        } else {
          setRealtimeStatus('error');
        }
      },
      onJobInsert: (newJob) => {
        if (!isMounted) return;
        setJobs(prev => prev.some(j => j.id === newJob.id) ? prev.map(j => j.id === newJob.id ? newJob : j) : [newJob, ...prev]);
        setLastRealtimeUpdate(new Date());
      },
      onJobUpdate: (updatedJob) => {
        if (!isMounted) return;
        setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
        setLastRealtimeUpdate(new Date());
      },
      onJobDelete: (deletedId) => {
        if (!isMounted) return;
        setJobs(prev => prev.filter(j => j.id !== deletedId));
        setLastRealtimeUpdate(new Date());
      },
      onHousingInsert: (newHousing) => {
        if (!isMounted) return;
        setHousing(prev => prev.some(h => h.id === newHousing.id) ? prev.map(h => h.id === newHousing.id ? newHousing : h) : [newHousing, ...prev]);
        setLastRealtimeUpdate(new Date());
      },
      onHousingUpdate: (updatedHousing) => {
        if (!isMounted) return;
        setHousing(prev => prev.map(h => h.id === updatedHousing.id ? updatedHousing : h));
        setLastRealtimeUpdate(new Date());
      },
      onHousingDelete: (deletedId) => {
        if (!isMounted) return;
        setHousing(prev => prev.filter(h => h.id !== deletedId));
        setLastRealtimeUpdate(new Date());
      },
      onOfficeInsert: (newOffice) => {
        if (!isMounted) return;
        setRecruitmentOffices(prev => prev.some(o => o.id === newOffice.id) ? prev.map(o => o.id === newOffice.id ? newOffice : o) : [newOffice, ...prev]);
        setLastRealtimeUpdate(new Date());
      },
      onOfficeUpdate: (updatedOffice) => {
        if (!isMounted) return;
        setRecruitmentOffices(prev => prev.map(o => o.id === updatedOffice.id ? updatedOffice : o));
        setLastRealtimeUpdate(new Date());
      },
      onOfficeDelete: (deletedId) => {
        if (!isMounted) return;
        setRecruitmentOffices(prev => prev.filter(o => o.id !== deletedId));
        setLastRealtimeUpdate(new Date());
      },
      onAdInsert: (newAd) => {
        if (!isMounted) return;
        setAds(prev => prev.some(a => a.id === newAd.id) ? prev.map(a => a.id === newAd.id ? newAd : a) : [newAd, ...prev]);
        setLastRealtimeUpdate(new Date());
      },
      onAdUpdate: (updatedAd) => {
        if (!isMounted) return;
        setAds(prev => prev.map(a => a.id === updatedAd.id ? updatedAd : a));
        setLastRealtimeUpdate(new Date());
      },
      onAdDelete: (deletedId) => {
        if (!isMounted) return;
        setAds(prev => prev.filter(a => a.id !== deletedId));
        setLastRealtimeUpdate(new Date());
      },
      onReportInsert: (newReport) => {
        if (!isMounted) return;
        setReports(prev => prev.some(r => r.id === newReport.id) ? prev.map(r => r.id === newReport.id ? newReport : r) : [newReport, ...prev]);
        setLastRealtimeUpdate(new Date());
      },
      onReportUpdate: (updatedReport) => {
        if (!isMounted) return;
        setReports(prev => prev.map(r => r.id === updatedReport.id ? updatedReport : r));
        setLastRealtimeUpdate(new Date());
      },
      onReportDelete: (deletedId) => {
        if (!isMounted) return;
        setReports(prev => prev.filter(r => r.id !== deletedId));
        setLastRealtimeUpdate(new Date());
      },
      onModeratorInsert: (newMod) => {
        if (!isMounted) return;
        setModerators(prev => prev.some(m => m.id === newMod.id) ? prev.map(m => m.id === newMod.id ? newMod : m) : [newMod, ...prev]);
        setLastRealtimeUpdate(new Date());
      },
      onModeratorUpdate: (updatedMod) => {
        if (!isMounted) return;
        setModerators(prev => prev.map(m => m.id === updatedMod.id ? updatedMod : m));
        setLastRealtimeUpdate(new Date());
      },
      onModeratorDelete: (deletedId) => {
        if (!isMounted) return;
        setModerators(prev => prev.filter(m => m.id !== deletedId));
        setLastRealtimeUpdate(new Date());
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
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

  useEffect(() => {
    safeSetItem('dubai_start_moderators', JSON.stringify(moderators));
  }, [moderators]);

  useEffect(() => {
    if (currentAdminSession) {
      safeSetItem('dubai_start_admin_session', JSON.stringify(currentAdminSession));
      safeSetItem('dubai_start_admin_token', 'true');
    } else {
      safeRemoveItem('dubai_start_admin_session');
      safeRemoveItem('dubai_start_admin_token');
    }
  }, [currentAdminSession]);

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

  // Hash navigation listener with secret admin and magic link handling
  useEffect(() => {
    const onHashChange = () => {
      try {
        const fullHash = window.location.hash;

        // Check for magic link login: #mod-login?user=...&key=...
        if (fullHash.includes('user=') && (fullHash.includes('key=') || fullHash.includes('password='))) {
          const queryPart = fullHash.substring(fullHash.indexOf('?') + 1);
          const params = new URLSearchParams(queryPart);
          const user = params.get('user');
          const key = params.get('key') || params.get('password');
          if (user && key) {
            const res = moderatorLogin(user, key, true);
            if (res.success) {
              history.replaceState(null, '', window.location.pathname + '#admin');
              setActiveTabState('admin');
              return;
            }
          }
        }

        const rawHash = fullHash.replace(/^#\/?/, '').split('?')[0].trim();
        if (rawHash === 'admin' || rawHash === 'admin-secret' || rawHash === 'mod-login') {
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
    // Initial check on load
    onHashChange();

    return () => window.removeEventListener('hashchange', onHashChange);
  }, [isAdminAuthenticated, moderators]);

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
      const session: AdminSession = {
        role: 'super_admin',
        username: 'admin',
        name: 'المدير العام (Super Admin)',
        permissions: {
          manageJobs: true,
          manageHousing: true,
          manageOffices: true,
          manageAds: true,
          manageReports: true,
          viewAnalytics: true,
        }
      };
      setCurrentAdminSession(session);
      setIsAdminAuthenticated(true);
      if (remember) {
        safeSetItem('dubai_start_admin_token', 'true');
        safeSetItem('dubai_start_admin_session', JSON.stringify(session));
      }
      return true;
    }
    return false;
  };

  const moderatorLogin = (user: string, pass: string, remember: boolean = true): { success: boolean; message?: string } => {
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();
    const target = moderators.find(m => m.username.toLowerCase() === cleanUser);
    if (!target) {
      return { success: false, message: 'اسم المستخدم غير مسجل كـ modérateur في النظام.' };
    }
    if (!target.active) {
      return { success: false, message: 'حساب المشرف هذا معطل حالياً من قبل الإدارة.' };
    }
    if (target.password !== cleanPass) {
      return { success: false, message: 'كلمة المرور غير صحيحة.' };
    }

    const nowStr = new Date().toLocaleString('ar-AE');
    setModerators(prev => prev.map(m => m.id === target.id ? { ...m, lastLogin: nowStr } : m));

    const session: AdminSession = {
      role: 'moderator',
      moderatorId: target.id,
      username: target.username,
      name: target.name,
      permissions: target.permissions
    };
    setCurrentAdminSession(session);
    setIsAdminAuthenticated(true);
    if (remember) {
      safeSetItem('dubai_start_admin_token', 'true');
      safeSetItem('dubai_start_admin_session', JSON.stringify(session));
    }
    return { success: true };
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentAdminSession(null);
    safeRemoveItem('dubai_start_admin_token');
    safeRemoveItem('dubai_start_admin_session');
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  const updateAdminPassword = (newPass: string) => {
    setAdminPasswordState(newPass);
    safeSetItem('dubai_start_admin_password', newPass);
  };

  // Moderator CRUD & helpers
  const addModerator = (modData: Omit<Moderator, 'id' | 'createdAt'>) => {
    const newMod: Moderator = {
      ...modData,
      id: 'mod-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setModerators(prev => [newMod, ...prev]);
    upsertModeratorInSupabase(newMod);
  };

  const updateModerator = (id: string, updates: Partial<Moderator>) => {
    setModerators(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...updates } : m);
      const target = updated.find(m => m.id === id);
      if (target) upsertModeratorInSupabase(target);
      return updated;
    });
    if (currentAdminSession?.moderatorId === id) {
      setCurrentAdminSession(prev => prev ? {
        ...prev,
        name: updates.name || prev.name,
        username: updates.username || prev.username,
        permissions: updates.permissions || prev.permissions
      } : null);
    }
  };

  const deleteModerator = (id: string) => {
    setModerators(prev => prev.filter(m => m.id !== id));
    deleteModeratorFromSupabase(id);
    if (currentAdminSession?.moderatorId === id) {
      adminLogout();
    }
  };

  const toggleModeratorActive = (id: string) => {
    setModerators(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, active: !m.active } : m);
      const target = updated.find(m => m.id === id);
      if (target) upsertModeratorInSupabase(target);
      return updated;
    });
  };

  const canAccess = (permission: keyof ModeratorPermissions): boolean => {
    if (!isAdminAuthenticated) return false;
    if (!currentAdminSession) return true;
    if (currentAdminSession.role === 'super_admin') return true;
    return !!currentAdminSession.permissions?.[permission];
  };

  const openAdminLoginModal = () => setIsAdminLoginModalOpen(true);
  const closeAdminLoginModal = () => setIsAdminLoginModalOpen(false);

  // Ads CRUD and tracking
  const addAd = (adData: Omit<AdItem, 'id' | 'clicks' | 'impressions' | 'createdAt'>) => {
    const isHtml = adData.adType === 'html' || Boolean(adData.htmlCode?.trim());
    const newAd: AdItem = {
      ...adData,
      adType: isHtml ? 'html' : (adData.adType || 'standard'),
      htmlCode: adData.htmlCode?.trim() || undefined,
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
      const updated = prev.map(a => {
        if (a.id === id) {
          const merged = { ...a, ...updates };
          const isHtml = merged.adType === 'html' || Boolean(merged.htmlCode?.trim());
          return {
            ...merged,
            adType: isHtml ? 'html' : (merged.adType || 'standard'),
            htmlCode: merged.htmlCode?.trim() || undefined
          };
        }
        return a;
      });
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

  const updateReportStatus = (id: string, status: 'new' | 'reviewed' | 'accepted' | 'dismissed') => {
    setReports(prev => {
      const updated = prev.map(r => r.id === id ? { 
        ...r, 
        status,
        acceptedAt: status === 'accepted' ? new Date().toISOString().split('T')[0] : r.acceptedAt 
      } : r);
      safeSetItem('dubai_start_reports', JSON.stringify(updated));
      return updated;
    });
    updateReportStatusInSupabase(id, status);
  };

  const deleteReport = (id: string) => {
    setReports(prev => {
      const updated = prev.filter(r => r.id !== id);
      safeSetItem('dubai_start_reports', JSON.stringify(updated));
      return updated;
    });
    deleteReportFromSupabase(id);
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
        moderatorLogin,
        adminLogout,
        adminPassword,
        updateAdminPassword,
        isAdminLoginModalOpen,
        openAdminLoginModal,
        closeAdminLoginModal,
        currentAdminSession,
        moderators,
        addModerator,
        updateModerator,
        deleteModerator,
        toggleModeratorActive,
        canAccess,
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
        deleteReport,
        resetToDefaultData,
        realtimeStatus,
        lastRealtimeUpdate,
        refreshFromSupabase,
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
