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
  Eye
} from 'lucide-react';
import { Job, HousingListing, RecruitmentOffice, UserReport } from '../../types';

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
    setActiveTab
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default accessible for prototype
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [activeAdminTab, setActiveAdminTab] = useState<'jobs' | 'housing' | 'offices' | 'reports'>('jobs');

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
    alert('تمت إضافة الوظيفة بنجاح!');
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
    alert('تمت إضافة إعلان السكن بنجاح!');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>لوحة التحكم الإدارية (Internal Admin Dashboard)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            إدارة بيانات DubaiStart
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            إضافة وتعديل الوظائف، خيارات السكن، فحص بلاغات الاحتيال الواردة من المستخدمين.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('هل أنت متأكد من إعادة ضبط البيانات إلى الحالة التجريبية الأصلية؟')) {
                resetToDefaultData();
              }
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>إعادة ضبط البيانات</span>
          </button>
          
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
          >
            العودة للموقع
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveAdminTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeAdminTab === 'jobs'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>إدارة الوظائف ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('housing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeAdminTab === 'housing'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BedDouble className="w-4 h-4" />
          <span>إدارة السكن ({housing.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeAdminTab === 'reports'
              ? 'bg-amber-400 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flag className="w-4 h-4 text-rose-400" />
          <span>بلاغات المستخدمين ({reports.length})</span>
        </button>
      </div>

      {/* TAB 1: JOBS MANAGEMENT */}
      {activeAdminTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">قائمة الوظائف المعروضة</h3>
            <button
              onClick={() => setShowJobModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
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
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {job.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {job.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-end">
                        <button
                          onClick={() => {
                            if (window.confirm(`حذف إعلان "${job.title}"؟`)) {
                              deleteJob(job.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="حذف"
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

      {/* TAB 2: HOUSING MANAGEMENT */}
      {activeAdminTab === 'housing' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">قائمة إعلانات السكن</h3>
            <button
              onClick={() => setShowHousingModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
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
                    <th className="p-3.5 text-start">المنطقة</th>
                    <th className="p-3.5 text-start">السعر (شهري)</th>
                    <th className="p-3.5 text-start">حالة التحقق</th>
                    <th className="p-3.5 text-end">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {housing.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white">{h.title}</td>
                      <td className="p-3.5 text-slate-300">{h.type}</td>
                      <td className="p-3.5 text-slate-400">{h.area}</td>
                      <td className="p-3.5 font-bold text-amber-400">{h.price} AED</td>
                      <td className="p-3.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          h.verificationStatus === 'verified'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : h.verificationStatus === 'suspicious'
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {h.verificationStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-end">
                        <button
                          onClick={() => {
                            if (window.confirm(`حذف سكن "${h.title}"؟`)) {
                              deleteHousing(h.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="حذف"
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

      {/* TAB 3: USER REPORTS */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">سجل بلاغات الاحتيال والمحتوى المشبوه</h3>
            <span className="text-xs text-slate-400">إجمالي البلاغات: {reports.length}</span>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{report.targetTitle}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                      {report.reason}
                    </span>
                    <span className="text-[10px] text-slate-500">{report.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {report.details}
                  </p>
                  {report.contactEmail && (
                    <span className="text-[11px] text-slate-400 block">
                      المبلّغ: {report.contactEmail}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateReportStatus(report.id, 'reviewed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      report.status === 'reviewed'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    تم الفحص والتحقق
                  </button>
                  <button
                    onClick={() => updateReportStatus(report.id, 'dismissed')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      report.status === 'dismissed'
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    تجاهل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setShowJobModal(false)}
              className="absolute top-4 end-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">إضافة إعلان وظيفة جديد</h3>

            <form onSubmit={handleAddJob} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">المسمى الوظيفي *</label>
                <input
                  required
                  type="text"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="مثال: Warehouse Storekeeper"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">اسم الشركة *</label>
                <input
                  required
                  type="text"
                  value={newJobCompany}
                  onChange={(e) => setNewJobCompany(e.target.value)}
                  placeholder="مثال: Al Futtaim Logistics"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">المنطقة</label>
                  <input
                    type="text"
                    value={newJobLocation}
                    onChange={(e) => setNewJobLocation(e.target.value)}
                    placeholder="مثال: Al Quoz, Dubai"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">القطاع</label>
                  <select
                    value={newJobCategory}
                    onChange={(e) => setNewJobCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Warehouse">Warehouse</option>
                    <option value="Driver">Driver</option>
                    <option value="Sales">Sales</option>
                    <option value="Cleaner">Cleaner</option>
                    <option value="Security">Security</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">الراتب المتوقع</label>
                <input
                  type="text"
                  value={newJobSalary}
                  onChange={(e) => setNewJobSalary(e.target.value)}
                  placeholder="مثال: 3,000 - 4,000 AED"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">رابط التقديم الأصلي (LinkedIn / Career portal)</label>
                <input
                  type="url"
                  value={newJobUrl}
                  onChange={(e) => setNewJobUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/jobs/view/..."
                  dir="ltr"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
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
                  حفظ ونشر
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Housing Modal */}
      {showHousingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setShowHousingModal(false)}
              className="absolute top-4 end-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">إضافة إعلان سكن جديد</h3>

            <form onSubmit={handleAddHousing} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">عنوان الإعلان *</label>
                <input
                  required
                  type="text"
                  value={newHouseTitle}
                  onChange={(e) => setNewHouseTitle(e.target.value)}
                  placeholder="مثال: سرير في غرفة هادئة 3 دقائق من محطة مترو الاتحاد"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">النوع</label>
                  <select
                    value={newHouseType}
                    onChange={(e) => setNewHouseType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  >
                    <option value="bed_space">Bed Space</option>
                    <option value="shared_room">غرفة مشتركة</option>
                    <option value="partition">بارتيشن</option>
                    <option value="private_room">غرفة خاصة</option>
                    <option value="studio">استوديو</option>
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
