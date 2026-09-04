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
  Database
} from 'lucide-react';
import { Job, HousingListing, RecruitmentOffice, UserReport } from '../../types';
import { AdminVisitorsSection } from './AdminVisitorsSection';
import { AdminAdsSection } from './AdminAdsSection';
import { AdminSupabaseSection } from './AdminSupabaseSection';

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
    resetToDefaultData,
    setActiveTab,
    ads,
    visitorStats,
    adminPassword,
    updateAdminPassword,
    adminLogout
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'visitors' | 'ads' | 'jobs' | 'housing' | 'offices' | 'reports' | 'security' | 'supabase'
  >('visitors');

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
  const activeAdsCount = ads.filter(a => a.active).length;

  return (
    <div className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>لوحة التحكم الإدارية السرية (Admin Dashboard)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            مركز القيادة والبيانات DubaiStart
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            متابعة زوار الموقع لحظياً، إدارة الإعلانات في مختلف المواضع، وتحديث الوظائف والسكن.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
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
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-900/90 p-1.5 sm:p-2 rounded-2xl border border-slate-800 w-full overflow-x-auto">
        
        {/* Visitors Stats Tab */}
        <button
          onClick={() => setActiveAdminTab('visitors')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'visitors'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>إحصائيات وزوار الموقع ({visitorStats.totalVisits.toLocaleString()})</span>
        </button>

        {/* Ads Manager Tab */}
        <button
          onClick={() => setActiveAdminTab('ads')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'ads'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>قسم الإعلانات ({activeAdsCount} نشط)</span>
        </button>

        {/* Jobs Tab */}
        <button
          onClick={() => setActiveAdminTab('jobs')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'jobs'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>إدارة الوظائف ({jobs.length})</span>
        </button>

        {/* Housing Tab */}
        <button
          onClick={() => setActiveAdminTab('housing')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'housing'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BedDouble className="w-4 h-4" />
          <span>إدارة السكن ({housing.length})</span>
        </button>

        {/* Offices Tab */}
        <button
          onClick={() => setActiveAdminTab('offices')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'offices'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>مكاتب التوظيف ({recruitmentOffices.length})</span>
        </button>

        {/* Reports Tab */}
        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
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

        {/* Security & Password Tab */}
        <button
          onClick={() => setActiveAdminTab('security')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'security'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>أمان المشرف</span>
        </button>

        {/* Supabase Database Tab */}
        <button
          onClick={() => setActiveAdminTab('supabase')}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
            activeAdminTab === 'supabase'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
              : 'text-emerald-400 hover:text-emerald-300'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>قاعدة بيانات Supabase</span>
        </button>

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
              <table className="w-full text-start text-xs text-slate-300">
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
              <table className="w-full text-start text-xs text-slate-300">
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
              <table className="w-full text-start text-xs text-slate-300">
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
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">سجل البلاغات والشكاوى الواردة من المستخدمين</h3>
            <span className="text-xs text-slate-400">{reports.length} بلاغ مسجل</span>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <div 
                key={report.id} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      report.status === 'new' 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {report.status === 'new' ? 'بلاغ جديد بحاجة للمراجعة' : 'تمت المراجعة'}
                    </span>
                    <span className="text-xs font-bold text-white">{report.targetTitle}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{report.createdAt}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {report.details}
                </p>

                {report.contactEmail && (
                  <div className="text-xs text-slate-400">
                    <span>بريد المبلّغ للتواصل: </span>
                    <span className="text-sky-400 font-mono">{report.contactEmail}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  {report.status === 'new' ? (
                    <button
                      onClick={() => {
                        updateReportStatus(report.id, 'reviewed');
                        showNotification('تم تحديث حالة البلاغ إلى "تمت المراجعة"');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-colors"
                    >
                      وضع علامة "تمت المراجعة"
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateReportStatus(report.id, 'dismissed');
                        showNotification('تم أرشفة البلاغ');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition-colors"
                    >
                      أرشفة
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
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
                <h3 className="text-lg font-black text-white">إعدادات أمان المشرف والوصول</h3>
                <p className="text-xs text-slate-400">تغيير كلمة المرور السرية وطرق الوصول للوحة</p>
              </div>
            </div>

            {passwordToast && (
              <div className="p-3.5 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold">
                {passwordToast}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كلمة مرور المشرف الحالية
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
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md shadow-amber-500/20"
              >
                تحديث وحفظ كلمة المرور
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <h4 className="font-bold text-white">طرق الوصول للوحة المشرف بعد إخفاء الزر عن الزوار:</h4>
              <p>1. <strong>اختصار لوحة المفاتيح:</strong> الضغط على <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">Ctrl + Shift + A</kbd> في أي وقت يفتح نافذة الدخول الفورية.</p>
              <p>2. <strong>النقرة الخفية في الفوتر:</strong> النقر 5 مرات متتالية على عبارة حقوق النشر أسفل الصفحة.</p>
              <p>3. <strong>رابط الهاش السري:</strong> إضافة <code className="text-amber-400 font-mono">#admin</code> أو <code className="text-amber-400 font-mono">#admin-secret</code> في نهاية رابط الموقع في المتصفح.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SUPABASE DATABASE INTEGRATION */}
      {activeAdminTab === 'supabase' && (
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
