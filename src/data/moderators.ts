import { Moderator } from '../types';

export const INITIAL_MODERATORS: Moderator[] = [
  {
    id: 'mod-1',
    name: 'أحمد التميمي (مشرف وظائف وسكن)',
    username: 'ahmed_mod',
    password: 'ahmed2026@dubai',
    permissions: {
      manageJobs: true,
      manageHousing: true,
      manageOffices: false,
      manageAds: false,
      manageReports: true,
      viewAnalytics: true,
    },
    active: true,
    createdAt: '2026-03-01',
    lastLogin: '2026-03-03 14:30',
    notes: 'مسؤول مراجعة ونشر إعلانات التوظيف والتحقق من بلاغات السكن'
  },
  {
    id: 'mod-2',
    name: 'سارة المنصوري (مشرفة تسويق وإعلانات)',
    username: 'sara_ads',
    password: 'sara2026@dubai',
    permissions: {
      manageJobs: false,
      manageHousing: false,
      manageOffices: true,
      manageAds: true,
      manageReports: false,
      viewAnalytics: true,
    },
    active: true,
    createdAt: '2026-03-02',
    lastLogin: '2026-03-04 09:15',
    notes: 'مسؤولة الحملات الإعلانية ومكاتب التوظيف والبانرات الترويجية'
  }
];

export const generateModeratorLoginLink = (username: string, password: string): string => {
  try {
    const origin = window.location.origin + window.location.pathname;
    const encodedUser = encodeURIComponent(username);
    const encodedPass = encodeURIComponent(password);
    return `${origin}#mod-login?user=${encodedUser}&key=${encodedPass}`;
  } catch {
    return `#mod-login?user=${username}&key=${password}`;
  }
};
