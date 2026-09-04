import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdItem, AdPlacement } from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Eye, 
  MousePointerClick, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Layers, 
  X,
  RotateCcw
} from 'lucide-react';

const PLACEMENT_LABELS: Record<AdPlacement, { label: string; desc: string; color: string }> = {
  top_banner: {
    label: 'الشريط الإعلاني العلوي',
    desc: 'يظهر في أعلى الموقع قبل الهيدر مباشرة على جميع الصفحات',
    color: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  home_hero: {
    label: 'بنر الصفحة الرئيسية (Hero)',
    desc: 'بنر عريض وجذاب يظهر في الصفحة الرئيسية بين الهيرو والخدمات',
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  },
  jobs_feed: {
    label: 'بطاقة في قائمة الوظائف',
    desc: 'تظهر كبطاقة إعلانية موثوقة ومدمجة داخل شبكة الوظائف',
    color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  housing_feed: {
    label: 'بطاقة في قائمة السكن',
    desc: 'تظهر كبطاقة إعلانية موثوقة داخل شبكة خيارات السكن والغرف',
    color: 'bg-sky-500/20 text-sky-300 border-sky-500/40'
  },
  floating_badge: {
    label: 'ويدجت عائم في الزاوية',
    desc: 'بطاقة صغيرة ثابتة في الزاوية السفلية للمساعدة السريعة',
    color: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  }
};

export const AdminAdsSection: React.FC = () => {
  const { 
    ads, 
    addAd, 
    updateAd, 
    deleteAd, 
    toggleAdStatus 
  } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [placement, setPlacement] = useState<AdPlacement>('top_banner');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('تفاصيل العرض');
  const [ctaLink, setCtaLink] = useState('https://wa.me/971501234567');
  const [badge, setBadge] = useState('إعلان مميز ⭐');
  const [bgStyle, setBgStyle] = useState<'gold' | 'emerald' | 'dark' | 'gradient'>('gold');
  const [active, setActive] = useState(true);

  const openAddModal = () => {
    setEditingAd(null);
    setTitle('');
    setDescription('');
    setPlacement('home_hero');
    setImageUrl('');
    setCtaText('تواصل عبر واتساب');
    setCtaLink('https://wa.me/971501234567');
    setBadge('عرض ترويجي ⭐');
    setBgStyle('gold');
    setActive(true);
    setModalOpen(true);
  };

  const openEditModal = (ad: AdItem) => {
    setEditingAd(ad);
    setTitle(ad.title);
    setDescription(ad.description);
    setPlacement(ad.placement);
    setImageUrl(ad.imageUrl || '');
    setCtaText(ad.ctaText);
    setCtaLink(ad.ctaLink);
    setBadge(ad.badge || '');
    setBgStyle(ad.bgStyle || 'gold');
    setActive(ad.active);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingAd) {
      updateAd(editingAd.id, {
        title,
        description,
        placement,
        imageUrl: imageUrl || undefined,
        ctaText,
        ctaLink,
        badge,
        bgStyle,
        active
      });
    } else {
      addAd({
        title,
        description,
        placement,
        imageUrl: imageUrl || undefined,
        ctaText,
        ctaLink,
        badge,
        bgStyle,
        active
      });
    }

    setModalOpen(false);
  };

  // Preset image helpers
  const applyPresetImage = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>إدارة الإعلانات وتوزيعها في أماكن الموقع (Ads Manager)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            تحكم في أماكن ظهور الإعلانات (الشريط العلوي، الهيرو، شبكة الوظائف، شبكة السكن، والويدجت العائم)
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة إعلان جديد</span>
        </button>
      </div>

      {/* Placement Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {(Object.keys(PLACEMENT_LABELS) as AdPlacement[]).map((key) => {
          const count = ads.filter(a => a.placement === key && a.active).length;
          const info = PLACEMENT_LABELS[key];
          return (
            <div 
              key={key} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border mb-1.5 ${info.color}`}>
                  {info.label}
                </span>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {info.desc}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">الإعلانات النشطة:</span>
                <span className={`font-bold ${count > 0 ? 'text-emerald-400 font-mono' : 'text-slate-500 font-mono'}`}>
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ads List Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4 text-start">الإعلان والعنوان</th>
                <th className="p-4 text-start">الموقع والمكان</th>
                <th className="p-4 text-center">المشاهدات</th>
                <th className="p-4 text-center">النقرات</th>
                <th className="p-4 text-center">نسبة النقر (CTR)</th>
                <th className="p-4 text-center">الحالة</th>
                <th className="p-4 text-end">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ads.map((ad) => {
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : '0.0';
                const placementInfo = PLACEMENT_LABELS[ad.placement];

                return (
                  <tr key={ad.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Ad Title & details */}
                    <td className="p-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        {ad.imageUrl && (
                          <img 
                            src={ad.imageUrl} 
                            alt="" 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {ad.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                                {ad.badge}
                              </span>
                            )}
                            <span className="font-bold text-white text-xs">
                              {ad.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {ad.description}
                          </p>
                          <a 
                            href={ad.ctaLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-sky-400 hover:underline inline-flex items-center gap-1 font-mono pt-0.5"
                          >
                            <span>{ad.ctaText}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Placement */}
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${placementInfo.color}`}>
                        {placementInfo.label}
                      </span>
                    </td>

                    {/* Impressions */}
                    <td className="p-4 text-center font-mono font-medium text-slate-300">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>{ad.impressions.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Clicks */}
                    <td className="p-4 text-center font-mono font-medium text-amber-400">
                      <div className="flex items-center justify-center gap-1">
                        <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
                        <span>{ad.clicks.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* CTR */}
                    <td className="p-4 text-center font-mono font-bold">
                      <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-emerald-400 text-xs">
                        {ctr}%
                      </span>
                    </td>

                    {/* Active toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                          ad.active 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30' 
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {ad.active ? '● نشط' : '○ متوقف'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-end whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(ad)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-400/20 hover:text-amber-300 text-slate-400 transition-colors"
                          title="تعديل الإعلان"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
                              deleteAd(ad.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-colors"
                          title="حذف الإعلان"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto text-start">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-black text-white">
                  {editingAd ? 'تعديل الإعلان' : 'إنشاء إعلان جديد'}
                </h3>
                <p className="text-xs text-slate-400">
                  حدد نص الإعلان، رابط التحويل، ومكان الظهور في الموقع
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Placement Selector */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  مكان ظهور الإعلان في الموقع (Placement) *
                </label>
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value as AdPlacement)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white font-bold focus:border-amber-400 focus:outline-none"
                >
                  <option value="top_banner">الشريط العلوي في أعلى كافة الصفحات (Top Header Banner)</option>
                  <option value="home_hero">الصفحة الرئيسية - بنر ترويجي بارز (Home Hero Banner)</option>
                  <option value="jobs_feed">شبكة الوظائف - بطاقة ضمن الوظائف (Jobs Feed Card)</option>
                  <option value="housing_feed">شبكة السكن - بطاقة ضمن خيارات السكن (Housing Feed Card)</option>
                  <option value="floating_badge">ويدجت عائم في الزاوية السفلية (Floating Corner Badge)</option>
                </select>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold mb-1">
                    عنوان الإعلان الرئيسي *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: خدمة استقبال المطار وتوصيل السكن..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    شارة الإعلان (Badge)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="مثال: خدمة موثوقة ⭐"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  تفاصيل ووصف الإعلان
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="شرح مختصر للخدمة أو العرض الترويجي..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* CTA Button Text & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    نص زر الإجراء (CTA Button Text) *
                  </label>
                  <input
                    type="text"
                    required
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="مثال: تواصل عبر واتساب / تفاصيل العرض"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    رابط التحويل (URL أو رابط واتساب) *
                  </label>
                  <input
                    type="text"
                    required
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    placeholder="https://wa.me/971501234567..."
                    dir="ltr"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  رابط الصورة التوضيحية (اختياري)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  dir="ltr"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none font-mono mb-2"
                />
                
                {/* Presets */}
                <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400">
                  <span>صور جاهزة سريعة:</span>
                  <button
                    type="button"
                    onClick={() => applyPresetImage('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
                  >
                    استقبال مطار 🚗
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetImage('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
                  >
                    سيرة ذاتية ATS 📄
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetImage('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80')}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
                  >
                    معاينة سكن 🏠
                  </button>
                </div>
              </div>

              {/* Theme & Active Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    طراز التصميم اللوني
                  </label>
                  <select
                    value={bgStyle}
                    onChange={(e) => setBgStyle(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="gold">ذهبي / كهرماني (Gold / Amber)</option>
                    <option value="emerald">أخضر زمردي موثوق (Emerald)</option>
                    <option value="gradient">تدرج ليلي فخم (Dark Gradient)</option>
                    <option value="dark">داكن كلاسيكي (Classic Dark)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200 font-bold">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-800 text-amber-400 focus:ring-0 w-4 h-4"
                    />
                    <span>تفعيل الإعلان فوراً في الموقع</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingAd ? 'حفظ التعديلات' : 'إضافة الإعلان الآن'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
