import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Briefcase, 
  BedDouble, 
  Building2, 
  Flag, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  X,
  Eye,
  Activity,
  Layers,
  Shield,
  KeyRound,
  Download,
  LogOut,
  Sparkles,
  Database,
  Users,
  UserCheck,
  Crown,
  ShieldAlert,
  Filter,
  Check,
  Mail
} from 'lucide-react';
import { Job, HousingListing, RecruitmentOffice, UserReport } from '../../types';
import { AdminVisitorsSection } from './AdminVisitorsSection';
import { AdminAdsSection } from './AdminAdsSection';
import { AdminSupabaseSection } from './AdminSupabaseSection';
import { AdminModeratorsSection } from './AdminModeratorsSection';

export const AdminDashboard: React.FC = () => {
  const { 
    jobs, 
    addJob, 
    deleteJob, 
    housing, 
    addHousing, 
    deleteHousing, 
    recruitmentOffices,
    reports,
    updateReportStatus,
    deleteReport,
    resetToDefaultData,
    setActiveTab,
    ads,
    visitorStats,
    adminPassword,
    updateAdminPassword,
    adminLogout,
    currentAdminSession,
    moderators,
    canAccess,
    realtimeStatus
  } = useApp();

  const isSuperAdmin = !currentAdminSession || currentAdminSession.role === 'super_admin';
  const canViewAnalytics = canAccess('viewAnalytics');
  const canManageAds = canAccess('manageAds');
  const canManageJobs = canAccess('manageJobs');
  const canManageHousing = canAccess('manageHousing');
  const canManageOffices = canAccess('manageOffices');
  const canManageReports = canAccess('manageReports');

  const [activeAdminTab, setActiveAdminTab] = useState<
    'visitors' | 'ads' | 'jobs' | 'housing' | 'offices' | 'reports' | 'security' | 'supabase' | 'moderators'
  >(() => {
    if (isSuperAdmin || canViewAnalytics) return 'visitors';
    if (canManageJobs) return 'jobs';
    if (canManageHousing) return 'housing';
    if (canManageAds) return 'ads';
    if (canManageOffices) return 'offices';
    if (canManageReports) return 'reports';
    return 'security';
  });

  // Job Form State
  const [showJobModal, setShowJobModal] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCompany, setNewJobCompany] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('Deira, Dubai');
  const [newJobCategory, setNewJobCategory] = useState('Warehouse');
  const [newJobSalary, setNewJobSalary] = useState('2,500 - 3,500 AED');
  const [newJobUrl, setNewJobUrl] = useState('https://www.linkedin.com/jobs/');
  const [newJobDesc, setNewJobDesc] = useState('');

  // Housing Form State
  const [showHousingModal, setShowHousingModal] = useState(false);
  const [newHouseTitle, setNewHouseTitle] = useState('');
  const [newHouseAddress, setNewHouseAddress] = useState('Near Union Metro, Deira, Dubai');
  const [newHouseArea, setNewHouseArea] = useState('Deira');
  const [newHouseType, setNewHouseType] = useState<'bed_space' | 'shared_room' | 'partition' | 'private_room' | 'studio'>('bed_space');
  const [newHousePrice, setNewHousePrice] = useState<number>(650);
  const [newHouseMetro, setNewHouseMetro] = useState('Union Metro Station');
  const [newHouseStatus, setNewHouseStatus] = useState<'verified' | 'check_before_payment' | 'suspicious'>('verified');
  const [newHousePhone, setNewHousePhone] = useState('+971501234567');

  // Security password state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordToast, setPasswordToast] = useState<string | null>(null);

  // Reports Filter State
  const [reportFilter, setReportFilter] = useState<'all' | 'new' | 'accepted' | 'reviewed'>('all');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle || !newJobCompany) return;

    addJob({
      title: newJobTitle,
      company: newJobCompany,
      location: newJobLocation,
      category: newJobCategory,
      employmentType: 'Full Time',
      experience: '1-2 years',
      salary: newJobSalary,
      source: 'LinkedIn',
      sourceUrl: newJobUrl,
      status: 'active',
      dateFound: 'اليوم',
      description: newJobDesc || `فرصة عمل لدى ${newJobCompany} في ${newJobLocation}. التقديم عبر الرابط الرسمي.`,
      requirements: ['اللغة الإنجليزية مقبولة', 'الجاهزية للبدء الفوري', 'إقامة أو تأشيرة سارية']
    });

    setNewJobTitle('');
    setNewJobCompany('');
    setNewJobDesc('');
    setShowJobModal(false);
    showNotification('تمت إضافة الوظيفة بنجاح!');
  };

  const handleAddHousing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHouseTitle || !newHousePrice) return;

    addHousing({
      title: newHouseTitle,
      type: newHouseType,
      area: newHouseArea,
      address: newHouseAddress,
      price: Number(newHousePrice),
      nearMetro: true,
      metroStation: newHouseMetro,
      metroWalkMinutes: 4,
      billsIncluded: true,
      gender: 'men',
      verificationStatus: newHouseStatus,
      verificationNote: newHouseStatus === 'verified' ? 'تم التحقق من عقد الإيجار ومطابقة فواتير DEWA' : 'عاين المكان قبل دفع أي عربون',
      contactPhone: newHousePhone,
      whatsapp: newHousePhone.replace('+', ''),
      description: `سكن مريح واقتصادي في ${newHouseArea} قرب ${newHouseMetro}. شامل فواتير الكهرباء والماء والإنترنت عالي السرعة.`,
      amenities: ['مكيف مركزي', 'واي فاي سريع', 'غسالة ملابس', 'مطبخ مجهز'],
      images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80']
    });

    setNewHouseTitle('');
    setShowHousingModal(false);
    showNotification('تمت إضافة إعلان السكن بنجاح!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.trim().length < 4) {
      setPasswordToast('كلمة المرور يجب أن لا تقل عن 4 أحرف أو أرقام!');
      return;
    }
    updateAdminPassword(newPasswordInput.trim());
    setNewPasswordInput('');
    setPasswordToast('تم تحديث كلمة مرور المشرف بنجاح! استخدمها للدخول القادم.');
    setTimeout(() => setPasswordToast(null), 4000);
  };

  const handleExportBackup = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      visitorStats,
      ads,
      jobs,
      housing,
      recruitmentOffices,
      reports
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dubai-start-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('تم تحميل نسخة احتياطية كاملة من قاعدة البيانات بنجاح!');
  };

  const pendingReportsCount = reports.filter(r => r.status === 'new').length;
  const acceptedReportsCount = reports.filter(r => r.status === 'accepted').length;
  const reviewedReportsCount = reports.filter(r => r.status === 'reviewed' || r.status === 'dismissed').length;
  const activeAdsCount = ads.filter(a => a.active).length;

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>لوحة التحكم الإدارية (Admin Dashboard)</span>
            </div>
            {isSuperAdmin ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>المدير العام (Super Admin)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-black">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>مشرف فرعي: {currentAdminSession?.name} (@{currentAdminSession?.username})</span>
              </div>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            مركز القيادة والبيانات DubaiStart
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            {isSuperAdmin 
              ? 'صلاحية كاملة: إدارة المشرفين، تتبع الزوار، مراجعة الإعلانات، وإدارة كافة أقسام المنصة.'
              : `أهلاً بك يا ${currentAdminSession?.name}! يمكنك إدارة الأقسام المصرح لك بها أدناه.`}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isSuperAdmin && (
            <>
              <button
                onClick={handleExportBackup}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="تصدير نسخة احتياطية"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">نسخة احتياطية</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('هل أنت متأكد من رغبتك في استعادة البيانات الأصلية الافتراضية؟')) {
                    resetToDefaultData();
                    showNotification('تمت إعادة ضبط كافة البيانات إلى الحالة الافتراضية بنجاح!');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>إعادة ضبط</span>
              </button>
            </>
          )}

          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-colors"
          >
            معاينة الموقع
          </button>

          <button
            onClick={adminLogout}
            className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 text-xs transition-colors"
            title="تسجيل الخروج وقفل اللوحة"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in duration-200">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white text-xs">✕</button>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 mb-6 sm:mb-8 bg-slate-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-800 w-full overflow-x-auto no-scrollbar scroll-smooth lg:flex-wrap">
        
        {/* Moderators Tab - Super Admin Only */}
        {isSuperAdmin && (
          <button
            onClick={() => setActiveAdminTab('moderators')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'moderators'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-amber-400/90 hover:text-amber-300 bg-amber-400/10 border border-amber-400/20'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>المشرفين (Modérateurs) ({moderators.length})</span>
          </button>
        )}

        {/* Visitors Stats Tab */}
        {canViewAnalytics && (
          <button
            onClick={() => setActiveAdminTab('visitors')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'visitors'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>إحصائيات وزوار الموقع ({visitorStats.totalVisits.toLocaleString()})</span>
          </button>
        )}

        {/* Ads Manager Tab */}
        {canManageAds && (
          <button
            onClick={() => setActiveAdminTab('ads')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'ads'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>قسم الإعلانات ({activeAdsCount} نشط)</span>
          </button>
        )}

        {/* Jobs Tab */}
        {canManageJobs && (
          <button
            onClick={() => setActiveAdminTab('jobs')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'jobs'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>إدارة الوظائف ({jobs.length})</span>
          </button>
        )}

        {/* Housing Tab */}
        {canManageHousing && (
          <button
            onClick={() => setActiveAdminTab('housing')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'housing'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>إدارة السكن ({housing.length})</span>
          </button>
        )}

        {/* Offices Tab */}
        {canManageOffices && (
          <button
            onClick={() => setActiveAdminTab('offices')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'offices'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>مكاتب التوظيف ({recruitmentOffices.length})</span>
          </button>
        )}

        {/* Reports Tab */}
        {canManageReports && (
          <button
            onClick={() => setActiveAdminTab('reports')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'reports'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flag className="w-4 h-4 text-rose-400" />
            <span>بلاغات الاحتيال ({reports.length})</span>
            {pendingReportsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>
        )}

        {/* Security & Password Tab */}
        <button
          onClick={() => setActiveAdminTab('security')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
            activeAdminTab === 'security'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>{isSuperAdmin ? 'أمان المدير العام' : 'معلومات الحساب'}</span>
        </button>

        {/* Supabase Database Tab - Super Admin only */}
        {isSuperAdmin && (
          <button
            onClick={() => setActiveAdminTab('supabase')}
            className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeAdminTab === 'supabase'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>قاعدة بيانات Supabase</span>
            <span 
              className={`w-2 h-2 rounded-full ${
                realtimeStatus === 'connected' ? 'bg-emerald-400 animate-pulse' :
                realtimeStatus === 'connecting' ? 'bg-amber-400 animate-ping' :
                'bg-slate-500'
              }`} 
              title={realtimeStatus === 'connected' ? 'متصل لحظياً' : 'جارٍ الاتصال'}
            />
          </button>
        )}

      </div>

      {/* TAB: VISITORS ANALYTICS */}
      {activeAdminTab === 'visitors' && (
        <AdminVisitorsSection />
      )}

      {/* TAB: ADS MANAGEMENT */}
      {activeAdminTab === 'ads' && (
        <AdminAdsSection />
      )}

      {/* TAB: JOBS MANAGEMENT */}
      {activeAdminTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">قائمة الوظائف المعروضة في المنصة</h3>
            <button
              onClick={() => setShowJobModal(true)}
              className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة وظيفة جديدة</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-start text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 text-start">المسمى الوظيفي</th>
                    <th className="p-3.5 text-start">الشركة</th>
                    <th className="p-3.5 text-start">المنطقة</th>
                    <th className="p-3.5 text-start">القطاع</th>
                    <th className="p-3.5 text-start">الحالة</th>
                    <th className="p-3.5 text-end">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white">{job.title}</td>
                      <td className="p-3.5 text-slate-300">{job.company}</td>
                      <td className="p-3.5 text-slate-400">{job.location}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                          {job.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                          نشطة
                        </span>
                      </td>
                      <td className="p-3.5 text-end">
                        <button
                          onClick={() => {
                            if (window.confirm('هل أنت متأكد من حذف هذه الوظيفة؟')) {
                              deleteJob(job.id);
                              showNotification('تم حذف الوظيفة بنجاح!');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
                          title="حذف الوظيفة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: HOUSING MANAGEMENT */}
      {activeAdminTab === 'housing' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-white">إعلانات السكن والغرف المشتركة</h3>
            <button
              onClick={() => setShowHousingModal(true)}
              className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة سكن جديد</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-start text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 text-start">عنوان الإعلان</th>
                    <th className="p-3.5 text-start">النوع</th>
                    <th className="p-3.5 text-start">المنطقة والمترو</th>
                    <th className="p-3.5 text-start">السعر</th>
                    <th className="p-3.5 text-start">حالة التحقق</th>
                    <th className="p-3.5 text-end">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {housing.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white max-w-xs truncate">{h.title}</td>
                      <td className="p-3.5 text-slate-300">{h.type}</td>
                      <td className="p-3.5 text-slate-400">{h.area} - {h.metroStation}</td>
                      <td className="p-3.5 font-bold text-amber-400">{h.price} درهم</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          h.verificationStatus === 'verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {h.verificationStatus === 'verified' ? 'موثق' : 'تحقق قبل الدفع'}
                        </span>
                      </td>
                      <td className="p-3.5 text-end">
                        <button
                          onClick={() => {
                            if (window.confirm('هل أنت متأكد من حذف هذا السكن؟')) {
                              deleteHousing(h.id);
                              showNotification('تم حذف إعلان السكن بنجاح!');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
                          title="حذف السكن"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: OFFICES */}
      {activeAdminTab === 'offices' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white">مكاتب التوظيف المعتمدة (مرخصة من وزارة الموارد البشرية MOHRE)</h3>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-start text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5 text-start">اسم المكتب</th>
                    <th className="p-3.5 text-start">التصنيف</th>
                    <th className="p-3.5 text-start">المنطقة</th>
                    <th className="p-3.5 text-start">حالة التحقق</th>
                    <th className="p-3.5 text-start">رسوم الباحث</th>
                    <th className="p-3.5 text-start">الموقع الإلكتروني</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recruitmentOffices.map((office) => (
                    <tr key={office.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white">{office.name}</td>
                      <td className="p-3.5 text-slate-300">{office.category}</td>
                      <td className="p-3.5 text-slate-400">{office.area}</td>
                      <td className="p-3.5 text-xs text-amber-400">{office.verificationLabel}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                          مجاناً بحكم القانون
                        </span>
                      </td>
                      <td className="p-3.5">
                        <a 
                          href={office.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sky-400 hover:underline"
                        >
                          زيارة الموقع ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: REPORTS */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-3xl shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>مركز مكافحة الاحتيال والشكاوى</span>
                </span>
                <span className="text-xs text-slate-400">({reports.length} بلاغ مسجل في المنصة)</span>
              </div>
              <h3 className="text-xl font-black text-white">سجل دعاوى وبلاغات الاحتيال الواردة</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                يمكنك فحص البلاغات وقبول دعوى الاحتيال وتثبيتها، ثم محوها من القائمة نهائياً بعد استكمال المراجعة أو حذف مصدر الإعلان المخالف.
              </p>
            </div>

            {/* Quick Action: Clear all accepted */}
            {acceptedReportsCount > 0 && (
              <button
                onClick={() => {
                  const acceptedList = reports.filter(r => r.status === 'accepted');
                  if (window.confirm(`هل أنت متأكد من محو كافة دعاوى الاحتيال المقبولة (${acceptedList.length} دعوى) من القائمة نهائياً؟`)) {
                    acceptedList.forEach(r => deleteReport(r.id));
                    showNotification(`تم محو ${acceptedList.length} دعوى احتيال مقبولة من القائمة بنجاح.`);
                  }
                }}
                className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition-all cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                <span>محو جميع الدعاوى المقبولة ({acceptedReportsCount})</span>
              </button>
            )}
          </div>

          {/* Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setReportFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                reportFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              الكل ({reports.length})
            </button>

            <button
              onClick={() => setReportFilter('new')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                reportFilter === 'new'
                  ? 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>قيد البت والمراجعة ({pendingReportsCount})</span>
            </button>

            <button
              onClick={() => setReportFilter('accepted')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                reportFilter === 'accepted'
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>دعاوى احتيال مقبولة ومؤكدة ({acceptedReportsCount})</span>
            </button>

            <button
              onClick={() => setReportFilter('reviewed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                reportFilter === 'reviewed'
                  ? 'bg-sky-500 text-white font-black shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>مراجعة / مؤرشفة ({reviewedReportsCount})</span>
            </button>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {reports
              .filter(r => {
                if (reportFilter === 'new') return r.status === 'new';
                if (reportFilter === 'accepted') return r.status === 'accepted';
                if (reportFilter === 'reviewed') return r.status === 'reviewed' || r.status === 'dismissed';
                return true;
              })
              .map((report) => {
                const linkedJob = jobs.find(j => j.id === report.targetId || j.title.toLowerCase() === report.targetTitle.toLowerCase());
                const linkedHousing = housing.find(h => h.id === report.targetId || h.title.toLowerCase() === report.targetTitle.toLowerCase());

                const getReasonText = (reason: string) => {
                  switch (reason) {
                    case 'scam_whatsapp': return 'احتيال عبر واتساب أو أرقام وهمية';
                    case 'fake_listing': return 'إعلان وهمي / صور مضللة';
                    case 'asking_fees': return 'طلب رسوم مسبقة غير قانونية';
                    case 'expired': return 'إعلان منتهي أو غير متاح';
                    case 'job': return 'بلاغ عن وظيفة مشبوهة';
                    case 'housing': return 'بلاغ عن سكن مشبوه';
                    case 'recruitment': return 'بلاغ عن مكتب توظيف غير مرخص';
                    default: return 'شبهة احتيال أو مخالفة';
                  }
                };

                return (
                  <div 
                    key={report.id} 
                    className={`rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 transition-all ${
                      report.status === 'accepted'
                        ? 'bg-slate-900/95 border-2 border-emerald-500/50 shadow-emerald-500/5'
                        : report.status === 'new'
                          ? 'bg-slate-900 border-2 border-rose-500/40 shadow-rose-500/5'
                          : 'bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Status Badge */}
                        {report.status === 'accepted' && (
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm shadow-emerald-500/10">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>تم قبول دعوى الاحتيال وتأكيدها</span>
                          </span>
                        )}

                        {report.status === 'new' && (
                          <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>بلاغ جديد بانتظار البت</span>
                          </span>
                        )}

                        {report.status === 'reviewed' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1.5">
                            <Eye className="w-3.5 h-3.5" />
                            <span>تمت المراجعة والتدقيق</span>
                          </span>
                        )}

                        {report.status === 'dismissed' && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                            مرفوض / غير احتيالي
                          </span>
                        )}

                        {/* Reason Pill */}
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20 text-[11px] font-semibold">
                          {getReasonText(report.reason || report.targetType)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                        <span>تاريخ البلاغ: {report.createdAt}</span>
                        {report.acceptedAt && (
                          <span className="text-emerald-400">تاريخ القبول: {report.acceptedAt}</span>
                        )}
                      </div>
                    </div>

                    {/* Target item title */}
                    <div>
                      <h4 className="text-base font-black text-white flex items-center gap-2">
                        <span>الجهة أو الإعلان المبلّغ عنه:</span>
                        <span className="text-amber-300 underline decoration-amber-400/30 underline-offset-4">{report.targetTitle}</span>
                      </h4>
                    </div>

                    {/* Accepted Alert Banner */}
                    {report.status === 'accepted' && (
                      <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start sm:items-center gap-2.5">
                          <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                          <div>
                            <p className="font-bold text-emerald-300">
                              تم قبول دعوى الاحتيال رسمياً وتثبيت صحة البلاغ.
                            </p>
                            <p className="text-[11px] text-emerald-400/90 mt-0.5">
                              أكدت الإدارة أن هذا الإعلان ينطوي على شبهة احتيال أو طلب رسوم غير قانونية. يمكنك الآن محوه من القائمة أدناه بنقرة واحدة.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`هل تريد محو دعوى الاحتيال "${report.targetTitle}" من القائمة الآن؟`)) {
                              deleteReport(report.id);
                              showNotification('تم محو دعوى الاحتيال من القائمة بنجاح.');
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shrink-0 flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>محو من القائمة الآن</span>
                        </button>
                      </div>
                    )}

                    {/* Complaint Details Box */}
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 block">تفاصيل الشكوى المقدمة:</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans select-text">
                        {report.details}
                      </p>
                    </div>

                    {/* Contact Email & Complainant Info */}
                    {report.contactEmail && (
                      <div className="flex items-center justify-between gap-3 flex-wrap bg-slate-950/40 px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span>البريد الإلكتروني لمقدم البلاغ:</span>
                          <span className="text-sky-300 font-mono select-all font-bold">{report.contactEmail}</span>
                        </div>
                        <a
                          href={`mailto:${report.contactEmail}?subject=${encodeURIComponent(`بخصوص بلاغك في DubaiStart: ${report.targetTitle}`)}&body=${encodeURIComponent(`مرحباً، بخصوص بلاغك الوارد إلينا عن "${report.targetTitle}"، نود إعلامك بأنه تم التحقق واتخاذ الإجراء اللازم.`)}`}
                          className="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-[11px] font-bold transition-colors"
                        >
                          مراسلة المبلّغ بالبريد
                        </a>
                      </div>
                    )}

                    {/* Linked items warning & one-click action */}
                    {linkedJob && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-amber-200">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>تم العثور على الوظيفة المطابقة في المنصة: <strong>{linkedJob.title}</strong> لدى <strong>{linkedJob.company}</strong></span>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل تريد حذف إعلان الوظيفة المخالف ("${linkedJob.title}") من المنصة فوراً؟`)) {
                              deleteJob(linkedJob.id);
                              showNotification('تم حذف إعلان الوظيفة المخالف من المنصة بنجاح!');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>حذف الوظيفة من المنصة</span>
                        </button>
                      </div>
                    )}

                    {linkedHousing && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-amber-200">
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>تم العثور على إعلان السكن المطابق في المنصة: <strong>{linkedHousing.title}</strong> ({linkedHousing.price} درهم)</span>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل تريد حذف إعلان السكن المخالف ("${linkedHousing.title}") من المنصة فوراً؟`)) {
                              deleteHousing(linkedHousing.id);
                              showNotification('تم حذف إعلان السكن المخالف من المنصة بنجاح!');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>حذف السكن من المنصة</span>
                        </button>
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      {/* Primary Actions: Accept & Delete */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* ACCEPT FRAUD CLAIM BUTTON */}
                        {report.status !== 'accepted' ? (
                          <button
                            onClick={() => {
                              updateReportStatus(report.id, 'accepted');
                              showNotification(`تم قبول دعوى الاحتيال ("${report.targetTitle}") وتأكيد صحتها بنجاح! يمكنك الآن محوها من القائمة في أي وقت.`);
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>قبول دعوى الاحتيال</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              updateReportStatus(report.id, 'new');
                              showNotification('تم إعادة فتح البلاغ كقيد المراجعة.');
                            }}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                            title="إلغاء القبول وإعادة البلاغ إلى قيد الانتظار"
                          >
                            إلغاء القبول
                          </button>
                        )}

                        {/* DELETE / REMOVE FROM LIST BUTTON */}
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت متأكد من محو دعوى الاحتيال "${report.targetTitle}" من القائمة نهائياً؟`)) {
                              deleteReport(report.id);
                              showNotification('تم محو دعوى الاحتيال من القائمة بنجاح.');
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            report.status === 'accepted'
                              ? 'bg-rose-600 hover:bg-rose-500 text-white font-black shadow-md shadow-rose-600/20'
                              : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-rose-200 border border-rose-500/30'
                          }`}
                          title="محو من القائمة نهائياً"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>محو من القائمة</span>
                        </button>
                      </div>

                      {/* Secondary status helpers */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {report.status !== 'reviewed' && report.status !== 'accepted' && (
                          <button
                            onClick={() => {
                              updateReportStatus(report.id, 'reviewed');
                              showNotification('تم تحديث حالة البلاغ إلى "تمت المراجعة"');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-xs font-bold border border-sky-500/30 transition-colors cursor-pointer"
                          >
                            وضع علامة "تمت المراجعة"
                          </button>
                        )}

                        {report.status !== 'dismissed' && report.status !== 'accepted' && (
                          <button
                            onClick={() => {
                              updateReportStatus(report.id, 'dismissed');
                              showNotification('تم رفض البلاغ وتصنيفه كغير احتيالي.');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition-colors cursor-pointer"
                          >
                            رفض الدعوى (غير احتيالي)
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            {reports.filter(r => {
              if (reportFilter === 'new') return r.status === 'new';
              if (reportFilter === 'accepted') return r.status === 'accepted';
              if (reportFilter === 'reviewed') return r.status === 'reviewed' || r.status === 'dismissed';
              return true;
            }).length === 0 && (
              <div className="text-center py-12 px-4 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-3">
                <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">لا توجد بلاغات في هذا التبويب</h4>
                <p className="text-xs text-slate-400">
                  {reportFilter === 'accepted' 
                    ? 'لم تقم بقبول أي دعوى احتيال بعد، أو تم محو جميع الدعاوى المقبولة من القائمة.'
                    : 'سجل البلاغات خالٍ في هذا القسم.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: MODERATORS MANAGEMENT (Super Admin Only) */}
      {activeAdminTab === 'moderators' && isSuperAdmin && (
        <AdminModeratorsSection />
      )}

      {/* TAB: SECURITY & SETTINGS */}
      {activeAdminTab === 'security' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 text-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {isSuperAdmin ? 'إعدادات أمان المدير العام والوصول' : 'بيانات حساب المشرف والصلاحيات'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isSuperAdmin 
                    ? 'تغيير كلمة المرور الرئيسية وطرق الوصول السري للوحة' 
                    : 'عرض معلومات حسابك والصلاحيات المخولة لك من طرف الإدارة'}
                </p>
              </div>
            </div>

            {isSuperAdmin ? (
              <>
                {passwordToast && (
                  <div className="p-3.5 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
                    {passwordToast}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      كلمة مرور المدير العام الحالية
                    </label>
                    <input 
                      type="text" 
                      readOnly 
                      value={adminPassword} 
                      dir="ltr"
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono text-xs select-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      كلمة المرور الجديدة (Master Password)
                    </label>
                    <input 
                      type="text" 
                      required
                      value={newPasswordInput} 
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      placeholder="أدخل كلمة مرور سرية جديدة..."
                      dir="ltr"
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    تحديث وحفظ كلمة المرور
                  </button>
                </form>
              </>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">الاسم:</span>
                    <span className="text-white font-bold">{currentAdminSession?.name}</span>
                  </div>
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-slate-400 font-sans">اسم المستخدم:</span>
                    <span className="text-amber-400 font-bold">@{currentAdminSession?.username}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">نوع الحساب:</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
                      مشرف فرعي (Modérateur)
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-300 mb-2">الصلاحيات المتاحة لحسابك:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      currentAdminSession?.permissions?.manageJobs 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                    }`}>
                      <span>إدارة الوظائف</span>
                      <span>{currentAdminSession?.permissions?.manageJobs ? '✓ مفعّلة' : '✗ معطلة'}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      currentAdminSession?.permissions?.manageHousing 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                    }`}>
                      <span>إدارة السكن</span>
                      <span>{currentAdminSession?.permissions?.manageHousing ? '✓ مفعّلة' : '✗ معطلة'}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      currentAdminSession?.permissions?.manageOffices 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                    }`}>
                      <span>مكاتب التوظيف</span>
                      <span>{currentAdminSession?.permissions?.manageOffices ? '✓ مفعّلة' : '✗ معطلة'}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      currentAdminSession?.permissions?.manageAds 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                    }`}>
                      <span>إدارة الإعلانات</span>
                      <span>{currentAdminSession?.permissions?.manageAds ? '✓ مفعّلة' : '✗ معطلة'}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      currentAdminSession?.permissions?.manageReports 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                    }`}>
                      <span>مراجعة البلاغات</span>
                      <span>{currentAdminSession?.permissions?.manageReports ? '✓ مفعّلة' : '✗ معطلة'}</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      currentAdminSession?.permissions?.viewAnalytics 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 line-through'
                    }`}>
                      <span>إحصائيات الزوار</span>
                      <span>{currentAdminSession?.permissions?.viewAnalytics ? '✓ مفعّلة' : '✗ معطلة'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <h4 className="font-bold text-white">طرق الوصول للوحة المشرف:</h4>
              <p>1. <strong>اختصار لوحة المفاتيح:</strong> الضغط على <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 font-mono">Ctrl + Shift + A</kbd> في أي وقت يفتح نافذة الدخول الفورية.</p>
              <p>2. <strong>النقرة الخفية في الفوتر:</strong> النقر 5 مرات متتالية على عبارة حقوق النشر أسفل الصفحة.</p>
              <p>3. <strong>رابط الهاش السري:</strong> إضافة <code className="text-amber-400 font-mono">#admin</code> في نهاية رابط الموقع في المتصفح.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SUPABASE DATABASE INTEGRATION */}
      {activeAdminTab === 'supabase' && isSuperAdmin && (
        <AdminSupabaseSection />
      )}

      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl text-start">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">إضافة وظيفة جديدة</h3>
              <button onClick={() => setShowJobModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">المسمى الوظيفي *</label>
                <input
                  required
                  type="text"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="مثال: موظف استقبال / باريستا / محاسب..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">اسم الشركة *</label>
                  <input
                    required
                    type="text"
                    value={newJobCompany}
                    onChange={(e) => setNewJobCompany(e.target.value)}
                    placeholder="Al Futtaim / Landmark..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">الراتب التقريبي</label>
                  <input
                    type="text"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    placeholder="3,000 - 4,500 AED"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">المنطقة في دبي</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    placeholder="Deira / Business Bay..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">القطاع</label>
                  <select
                    value={newJobCategory}
                    onChange={(e) => setNewJobCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="Hospitality">ضيافة ومطاعم</option>
                    <option value="Retail & Sales">مبيعات وتجزئة</option>
                    <option value="Warehouse">مستودعات ولوجستيات</option>
                    <option value="Customer Service">خدمة عملاء واستقبال</option>
                    <option value="Admin & Office">سكرتاريا ومكتبي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">رابط التقديم الرسمي</label>
                <input
                  type="url"
                  value={newJobUrl}
                  onChange={(e) => setNewJobUrl(e.target.value)}
                  placeholder="https://..."
                  dir="ltr"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold"
                >
                  حفظ ونشر الوظيفة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Housing Modal */}
      {showHousingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl text-start">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">إضافة إعلان سكن جديد</h3>
              <button onClick={() => setShowHousingModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddHousing} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">عنوان الإعلان *</label>
                <input
                  required
                  type="text"
                  value={newHouseTitle}
                  onChange={(e) => setNewHouseTitle(e.target.value)}
                  placeholder="مثال: سرير في غرفة ثلاثية هادئة شامل الخدمات..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">نوع السكن</label>
                  <select
                    value={newHouseType}
                    onChange={(e) => setNewHouseType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="bed_space">سرير فردي (Bed Space)</option>
                    <option value="partition">بارتيشن مغلق (Partition)</option>
                    <option value="shared_room">غرفة مشتركة</option>
                    <option value="private_room">غرفة خاصة</option>
                    <option value="studio">استوديو كامل</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">السعر الشهري (درهم) *</label>
                  <input
                    required
                    type="number"
                    value={newHousePrice}
                    onChange={(e) => setNewHousePrice(Number(e.target.value))}
                    placeholder="650"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">المنطقة</label>
                  <input
                    type="text"
                    value={newHouseArea}
                    onChange={(e) => setNewHouseArea(e.target.value)}
                    placeholder="Deira"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">أقرب محطة مترو</label>
                  <input
                    type="text"
                    value={newHouseMetro}
                    onChange={(e) => setNewHouseMetro(e.target.value)}
                    placeholder="Union Metro Station"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">حالة التحقق من السكن</label>
                <select
                  value={newHouseStatus}
                  onChange={(e) => setNewHouseStatus(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                >
                  <option value="verified">🟢 Information Verified</option>
                  <option value="check_before_payment">🟡 Check Before Payment</option>
                  <option value="suspicious">🔴 Suspicious</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">رقم هاتف التواصل والواتساب</label>
                <input
                  type="text"
                  value={newHousePhone}
                  onChange={(e) => setNewHousePhone(e.target.value)}
                  dir="ltr"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowHousingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold"
                >
                  حفظ ونشر السكن
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
