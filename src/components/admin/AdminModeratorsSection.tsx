import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Copy, 
  Check, 
  Share2, 
  Key, 
  Lock, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  XCircle,
  Clock,
  Briefcase,
  BedDouble,
  Building2,
  Layers,
  Flag,
  Activity,
  Send
} from 'lucide-react';
import { Moderator, ModeratorPermissions } from '../../types';
import { useApp } from '../../context/AppContext';
import { generateModeratorLoginLink } from '../../data/moderators';

const DEFAULT_PERMISSIONS: ModeratorPermissions = {
  manageJobs: true,
  manageHousing: true,
  manageOffices: false,
  manageAds: false,
  manageReports: true,
  viewAnalytics: false
};

export const AdminModeratorsSection: React.FC = () => {
  const { 
    moderators, 
    addModerator, 
    updateModerator, 
    deleteModerator, 
    toggleModeratorActive,
    currentAdminSession
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMod, setEditingMod] = useState<Moderator | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notes, setNotes] = useState('');
  const [permissions, setPermissions] = useState<ModeratorPermissions>(DEFAULT_PERMISSIONS);
  const [formError, setFormError] = useState<string | null>(null);

  // Copy Feedback state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setName('');
    setUsername('');
    setPassword(generateRandomPassword());
    setNotes('');
    setPermissions(DEFAULT_PERMISSIONS);
    setFormError(null);
    setEditingMod(null);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (mod: Moderator) => {
    setEditingMod(mod);
    setName(mod.name);
    setUsername(mod.username);
    setPassword(mod.password);
    setNotes(mod.notes || '');
    setPermissions(mod.permissions);
    setFormError(null);
    setShowAddModal(true);
  };

  const generateRandomPassword = () => {
    const chars = 'abcdefghjkmnpqrstuvwxyz23456789@#';
    let res = 'mod_';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };

  const handlePermissionToggle = (key: keyof ModeratorPermissions) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '_');
    if (!cleanUsername || !name.trim() || !password.trim()) {
      setFormError('يرجى ملء جميع الحقول الإلزامية.');
      return;
    }

    // Check username uniqueness if adding new or changing username
    const existing = moderators.find(
      m => m.username.toLowerCase() === cleanUsername && m.id !== editingMod?.id
    );
    if (existing) {
      setFormError('اسم المستخدم هذا مستعمل مسبقاً، يرجى اختيار اسم مستخدم آخر.');
      return;
    }

    if (editingMod) {
      updateModerator(editingMod.id, {
        name: name.trim(),
        username: cleanUsername,
        password: password.trim(),
        notes: notes.trim(),
        permissions
      });
      showToast(`تم تحديث بيانات المشرف ${name} بنجاح!`);
    } else {
      addModerator({
        name: name.trim(),
        username: cleanUsername,
        password: password.trim(),
        notes: notes.trim(),
        permissions,
        active: true
      });
      showToast(`تم إنشاء حساب المشرف ${name} بنجاح!`);
    }

    setShowAddModal(false);
  };

  const copyModeratorInvite = (mod: Moderator) => {
    const loginLink = generateModeratorLoginLink(mod.username, mod.password);
    const message = `مرحباً ${mod.name}،
تم إنشاء حساب مشرف لك في منصة "دبي ستارت":
🔗 رابط تسجيل الدخول المباشر: ${loginLink}
👤 اسم المستخدم: ${mod.username}
🔑 كلمة المرور: ${mod.password}

يرجى الضغط على الرابط أعلاه لتسجيل الدخول تلقائياً والبدء بالعمل.`;

    navigator.clipboard.writeText(message);
    setCopiedId(mod.id);
    setTimeout(() => setCopiedId(null), 3000);
    showToast('تم نسخ بيانات الدخول والرابط إلى الحافظة!');
  };

  const shareViaWhatsApp = (mod: Moderator) => {
    const loginLink = generateModeratorLoginLink(mod.username, mod.password);
    const message = `مرحباً ${mod.name}،
تم إنشاء حساب مشرف لك في منصة "دبي ستارت":
🔗 رابط تسجيل الدخول المباشر: ${loginLink}
👤 اسم المستخدم: ${mod.username}
🔑 كلمة المرور: ${mod.password}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 text-start">
      {/* Toast */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold flex items-center justify-between animate-in fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-400 shadow-lg">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  إدارة المشرفين (Modérateurs) والصلاحيات
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {moderators.length} مشرف
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                أنشئ حسابات للمشرفين، حدد صلاحياتهم بدقة، وأرسل لهم روابط تسجيل دخول تحتوي على اسم المستخدم وكلمة المرور تلقائياً.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>إنشاء مشرف جديد</span>
          </button>
        </div>
      </div>

      {/* Moderators List */}
      <div className="space-y-4">
        {moderators.map((mod) => (
          <div
            key={mod.id}
            className={`bg-slate-900 border rounded-3xl p-5 sm:p-6 shadow-lg transition-all ${
              mod.active 
                ? 'border-slate-800 hover:border-slate-700' 
                : 'border-rose-900/40 bg-slate-900/60 opacity-80'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Info Column */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-black text-sm">
                    {mod.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-white">{mod.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        mod.active 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {mod.active ? '🟢 نشط' : '🔴 معطّل'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                      <span>اسم المستخدم:</span>
                      <strong className="text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {mod.username}
                      </strong>
                    </div>
                  </div>
                </div>

                {mod.notes && (
                  <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                    {mod.notes}
                  </p>
                )}

                {/* Permissions Badges */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>الصلاحيات الممنوحة:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.permissions.manageJobs && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/20 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" /> الوظائف
                      </span>
                    )}
                    {mod.permissions.manageHousing && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 flex items-center gap-1">
                        <BedDouble className="w-3 h-3" /> السكن
                      </span>
                    )}
                    {mod.permissions.manageOffices && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> مكاتب التوظيف
                      </span>
                    )}
                    {mod.permissions.manageAds && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-purple-400/10 text-purple-300 border border-purple-400/20 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> الإعلانات
                      </span>
                    )}
                    {mod.permissions.manageReports && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-rose-400/10 text-rose-300 border border-rose-400/20 flex items-center gap-1">
                        <Flag className="w-3 h-3" /> بلاغات الاحتيال
                      </span>
                    )}
                    {mod.permissions.viewAnalytics && (
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-blue-400/10 text-blue-300 border border-blue-400/20 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> الإحصائيات
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Column */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                {/* Share credentials and link */}
                <button
                  onClick={() => copyModeratorInvite(mod)}
                  className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  title="نسخ رابط الدخول واسم المستخدم وكلمة المرور"
                >
                  {copiedId === mod.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>تم نسخ الرابط والبيانات!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ رابط الدخول والبيانات</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => shareViaWhatsApp(mod)}
                    className="flex-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="إرسال رابط الدخول عبر واتساب"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال واتساب</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(mod)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                    title="تعديل الصلاحيات أو كلمة المرور"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleModeratorActive(mod.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      mod.active 
                        ? 'bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                    }`}
                    title={mod.active ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                  >
                    {mod.active ? <XCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`هل أنت متأكد من حذف حساب المشرف "${mod.name}"؟`)) {
                        deleteModerator(mod.id);
                        showToast(`تم حذف حساب المشرف ${mod.name}.`);
                      }
                    }}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all cursor-pointer"
                    title="حذف المشرف نهائياً"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[10px] text-slate-500 font-mono text-end mt-1">
                  آخر دخول: {mod.lastLogin || 'لم يسجل دخول بعد'}
                </div>
              </div>

            </div>
          </div>
        ))}

        {moderators.length === 0 && (
          <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white">لا يوجد مشرفين مضافين حالياً</h4>
            <p className="text-xs text-slate-400 mt-1">اضغط على زر "إنشاء مشرف جديد" لإضافة أول مشرف وتعيين صلاحياته.</p>
          </div>
        )}
      </div>

      {/* Modal: Create or Edit Moderator */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl text-start my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingMod ? 'تعديل بيانات وصلاحيات المشرف' : 'إنشاء حساب مشرف جديد (Modérateur)'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    سيتم إنشاء رابط دخول خاص يحتوي على اسم المستخدم وكلمة المرور
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Name */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  الاسم الكامل للمشرف *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: أحمد عبد الله (مشرف الوظائف)"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    اسم المستخدم (Username) *
                  </label>
                  <input
                    required
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ahmed_jobs"
                    dir="ltr"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-bold">
                      كلمة المرور *
                    </label>
                    <button
                      type="button"
                      onClick={() => setPassword(generateRandomPassword())}
                      className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> توليد
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="كلمة المرور..."
                      dir="ltr"
                      className="w-full p-2.5 pe-9 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Permissions checkboxes */}
              <div>
                <label className="block text-slate-300 font-bold mb-2">
                  الصلاحيات الممنوحة للمشرف (Permissions):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageJobs}
                      onChange={() => handlePermissionToggle('manageJobs')}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <span className="text-slate-200 font-semibold">إدارة الوظائف (إضافة/تعديل/حذف)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageHousing}
                      onChange={() => handlePermissionToggle('manageHousing')}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <span className="text-slate-200 font-semibold">إدارة السكن والغرف</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageOffices}
                      onChange={() => handlePermissionToggle('manageOffices')}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <span className="text-slate-200 font-semibold">إدارة مكاتب التوظيف</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageAds}
                      onChange={() => handlePermissionToggle('manageAds')}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <span className="text-slate-200 font-semibold">إدارة الإعلانات والبانرات</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.manageReports}
                      onChange={() => handlePermissionToggle('manageReports')}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <span className="text-slate-200 font-semibold">مراجعة بلاغات الاحتيال</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.viewAnalytics}
                      onChange={() => handlePermissionToggle('viewAnalytics')}
                      className="w-4 h-4 accent-amber-400 rounded"
                    />
                    <span className="text-slate-200 font-semibold">مشاهدة إحصائيات الزوار</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  ملاحظات أو المهام الموكلة (اختياري)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: مسؤول مراجعة عقود السكن خلال الفترة الصباحية..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition-all shadow-lg shadow-amber-400/20 cursor-pointer"
                >
                  {editingMod ? 'حفظ التعديلات' : 'إنشاء المشرف وتوليد الرابط'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
