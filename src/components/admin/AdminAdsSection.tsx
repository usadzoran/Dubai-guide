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
  Sparkles, 
  X,
  Code,
  FileCode,
  Layout,
  Copy,
  Check,
  Play,
  Layers
} from 'lucide-react';
import { HtmlAdRenderer } from '../ads/HtmlAdRenderer';

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

// Ready-made HTML Ad templates
const HTML_TEMPLATES = [
  {
    name: 'بنر ترويجي عصري (Responsive Banner)',
    icon: '✨',
    code: `<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 16px; padding: 18px; color: #fff; font-family: inherit; direction: rtl; text-align: right;">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 14px;">
      <div style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">✈️</div>
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #fbbf24; color: #0f172a; font-size: 11px; font-weight: 900; padding: 2px 8px; border-radius: 6px;">عرض حصري</span>
          <span style="font-size: 11px; color: #94a3b8;">خصم خاص للقادمين الجدد</span>
        </div>
        <h4 style="margin: 4px 0 0 0; font-size: 16px; font-weight: 800; color: #fff;">حجز تذاكر الطيران وسفر دبي بأقل سعر</h4>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1;">استفد من كود الخصم DUBAI2026 عند الحجز واحصل على حقيبة وزن إضافية مجاناً.</p>
      </div>
    </div>
    <a href="https://wa.me/971501234567?text=أود_الاستفسار_عن_عرض_التذاكر" target="_blank" rel="noopener noreferrer" style="background: #fbbf24; color: #0f172a; padding: 10px 22px; border-radius: 12px; font-weight: 900; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);">
      <span>احجز الآن عبر واتساب</span>
      <span>&larr;</span>
    </a>
  </div>
</div>`
  },
  {
    name: 'شريط تنبيهي متحرك (Animated Ticker)',
    icon: '⚡',
    code: `<div style="background: linear-gradient(90deg, #d97706, #f59e0b, #d97706); color: #0f172a; padding: 10px 16px; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: space-between; border-radius: 12px; direction: rtl; text-align: right;">
  <div style="display: flex; align-items: center; gap: 8px;">
    <span style="background: #0f172a; color: #fbbf24; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 4px;">عاجل</span>
    <span>🔥 فتح باب التقديم لـ 50 وظيفة أمن واستقبال في مطار دبي DXB - متوفر سكن ومواصلات</span>
  </div>
  <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" style="background: #0f172a; color: #fff; padding: 5px 14px; border-radius: 8px; font-size: 12px; font-weight: 800; text-decoration: none; white-space: nowrap;">قدم الآن</a>
</div>`
  },
  {
    name: 'بطاقة واتساب تفاعلية (WhatsApp CTA)',
    icon: '💬',
    code: `<div style="background: #064e3b; border: 1px solid #10b981; border-radius: 16px; padding: 16px; color: #ecfdf5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; direction: rtl; text-align: right;">
  <div>
    <span style="background: #10b981; color: #022c22; font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 6px;">خدمة موثوقة</span>
    <h4 style="margin: 4px 0 2px 0; font-size: 15px; font-weight: bold; color: #fff;">استشارة قانونية وتعديل الوضع في دبي</h4>
    <p style="margin: 0; font-size: 12px; color: #a7f3d0;">تواصل مباشرة مع مستشار قانوني معتمد لحل غرامات التأشيرات وتغيير الإقامة.</p>
  </div>
  <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" style="background: #25D366; color: #fff; padding: 10px 18px; border-radius: 10px; font-weight: bold; font-size: 12px; text-decoration: none; white-space: nowrap; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
    تحدث مع المستشار 💬
  </a>
</div>`
  },
  {
    name: 'كود إعلانات جوجل (Google AdSense)',
    icon: '🌐',
    code: `<!-- وحدة إعلانية Google AdSense -->
<div style="text-align: center; margin: 10px 0; min-height: 90px; background: #0f172a; border: 1px dashed #334155; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
  <span style="font-size: 10px; color: #64748b; margin-bottom: 6px;">إعلان مخصص من Google</span>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block; width:100%; height:90px;"
       data-ad-client="ca-pub-0000000000000000"
       data-ad-slot="1234567890"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>`
  },
  {
    name: 'تضمين Iframe خارجي (External Iframe)',
    icon: '🖼️',
    code: `<div style="border-radius: 16px; overflow: hidden; border: 1px solid #334155; max-width: 100%; text-align: center;">
  <iframe src="https://example.com/banner" width="100%" height="120" style="border:0;" loading="lazy"></iframe>
</div>`
  }
];

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
  const [previewAdModal, setPreviewAdModal] = useState<AdItem | null>(null);

  // Form states
  const [adType, setAdType] = useState<'standard' | 'html'>('html');
  const [htmlCode, setHtmlCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [placement, setPlacement] = useState<AdPlacement>('top_banner');
  const [imageUrl, setImageUrl] = useState('');
  const [ctaText, setCtaText] = useState('تفاصيل العرض');
  const [ctaLink, setCtaLink] = useState('https://wa.me/971501234567');
  const [badge, setBadge] = useState('إعلان مميز ⭐');
  const [bgStyle, setBgStyle] = useState<'gold' | 'emerald' | 'dark' | 'gradient'>('gold');
  const [active, setActive] = useState(true);

  // Copy feedback state
  const [copiedCode, setCopiedCode] = useState(false);

  const openAddModal = (defaultType: 'standard' | 'html' = 'html') => {
    setEditingAd(null);
    setAdType(defaultType);
    setTitle('');
    setDescription('');
    setPlacement('home_hero');
    setImageUrl('');
    setCtaText('تواصل عبر واتساب');
    setCtaLink('https://wa.me/971501234567');
    setBadge('عرض ترويجي ⭐');
    setBgStyle('gold');
    setActive(true);
    // Pre-populate with responsive banner template if html
    setHtmlCode(defaultType === 'html' ? HTML_TEMPLATES[0].code : '');
    setModalOpen(true);
  };

  const openEditModal = (ad: AdItem) => {
    setEditingAd(ad);
    const isHtml = ad.adType === 'html' || Boolean(ad.htmlCode);
    setAdType(isHtml ? 'html' : 'standard');
    setHtmlCode(ad.htmlCode || '');
    setTitle(ad.title);
    setDescription(ad.description || '');
    setPlacement(ad.placement);
    setImageUrl(ad.imageUrl || '');
    setCtaText(ad.ctaText || '');
    setCtaLink(ad.ctaLink || '');
    setBadge(ad.badge || '');
    setBgStyle(ad.bgStyle || 'gold');
    setActive(ad.active);
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isHtml = adType === 'html' || Boolean(htmlCode.trim());
    if (!title.trim() && !isHtml) return;

    const finalTitle = title.trim() || (isHtml ? 'إعلان كود HTML مخصص' : 'إعلان جديد');
    const finalHtmlCode = isHtml ? htmlCode.trim() : undefined;

    const adPayload = {
      title: finalTitle,
      description: description.trim() || (isHtml ? 'إعلان مخصص بكود HTML' : ''),
      placement,
      imageUrl: imageUrl.trim() || undefined,
      ctaText: ctaText.trim() || (isHtml ? '' : 'تفاصيل الإعلان'),
      ctaLink: ctaLink.trim() || '#',
      badge: badge.trim() || undefined,
      bgStyle,
      active,
      adType: (isHtml ? 'html' : 'standard') as 'html' | 'standard',
      htmlCode: finalHtmlCode
    };

    if (editingAd) {
      updateAd(editingAd.id, adPayload);
    } else {
      addAd(adPayload);
    }

    setModalOpen(false);
  };

  const applyPresetImage = (url: string) => {
    setImageUrl(url);
  };

  const applyHtmlTemplate = (templateCode: string) => {
    setHtmlCode(templateCode);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white">إدارة الحملات والإعلانات</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
              يدعم كود HTML المخصص و AdSense
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            تحكم كامل في الإعلانات المعروضة: إدخال كود HTML مخصص، بنرات جوجل أدسنس، أو إنشاء بنرات قياسية مع متابعة النقرات والمشاهدات.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* New HTML Ad button */}
          <button
            onClick={() => openAddModal('html')}
            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Code className="w-4 h-4" />
            <span>إضافة إعلان بكود HTML</span>
          </button>

          {/* New Standard Banner button */}
          <button
            onClick={() => openAddModal('standard')}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إعلان قياسي (بانر)</span>
          </button>
        </div>
      </div>

      {/* Info notice about HTML Ads */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30 mt-0.5">
          <Code className="w-5 h-5" />
        </div>
        <div className="text-xs space-y-1">
          <div className="font-black text-white flex items-center gap-2">
            <span>ميزة إدخال الإعلانات على شكل HTML</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">مفعلة بالكامل</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            يمكنك إدخال أي كود HTML مخصص (صور مع روابط، وسائط، نصوص مخصصة، إعلانات Google AdSense عبر سكربتات، أو بطاقات تواصل مباشرة). يتم عرض الكود في المكان المختار تلقائياً وتتبع النقرات والمشاهدات في الوقت الفعلي.
          </p>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px]">إجمالي الإعلانات</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-white">{ads.length}</p>
          <span className="text-[10px] text-slate-500">
            {ads.filter(a => a.adType === 'html').length} كود HTML | {ads.filter(a => a.adType !== 'html').length} قياسي
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px]">الإعلانات النشطة</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">
            {ads.filter(a => a.active).length}
          </p>
          <span className="text-[10px] text-slate-500">معروضة حالياً للزوار</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px]">إجمالي المشاهدات</span>
            <Eye className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-xl font-black text-white">
            {ads.reduce((sum, a) => sum + (a.impressions || 0), 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-500">مرات ظهور الإعلانات</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px]">إجمالي النقرات</span>
            <MousePointerClick className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-xl font-black text-white">
            {ads.reduce((sum, a) => sum + (a.clicks || 0), 0).toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-500">تفاعلات المستخدمين</span>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4 text-start">الإعلان والنوع</th>
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
                const isHtml = ad.adType === 'html' || Boolean(ad.htmlCode);

                return (
                  <tr key={ad.id} className="hover:bg-slate-800/40 transition-colors">
                    
                    {/* Ad Title & details */}
                    <td className="p-4 max-w-xs">
                      <div className="flex items-start gap-3">
                        {isHtml ? (
                          <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
                            <Code className="w-5 h-5" />
                          </div>
                        ) : ad.imageUrl ? (
                          <img 
                            src={ad.imageUrl} 
                            alt="" 
                            className="w-10 h-10 rounded-xl object-cover border border-slate-800 shrink-0" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center shrink-0">
                            <Layout className="w-5 h-5" />
                          </div>
                        )}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {isHtml ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black font-mono">
                                HTML كود
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                                بانر قياسي
                              </span>
                            )}
                            {ad.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                                {ad.badge}
                              </span>
                            )}
                            <span className="font-bold text-white text-xs">
                              {ad.title}
                            </span>
                          </div>

                          {isHtml ? (
                            <p className="text-[11px] font-mono text-slate-400 line-clamp-1 text-slate-500" dir="ltr">
                              {ad.htmlCode?.substring(0, 70)}...
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 line-clamp-1">
                              {ad.description}
                            </p>
                          )}

                          <div className="flex items-center gap-2 pt-0.5">
                            {isHtml && (
                              <button
                                onClick={() => setPreviewAdModal(ad)}
                                className="text-[10px] text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 font-bold underline cursor-pointer"
                              >
                                <Eye className="w-3 h-3" />
                                <span>معاينة كود HTML</span>
                              </button>
                            )}
                            {ad.ctaLink && ad.ctaLink !== '#' && (
                              <a 
                                href={ad.ctaLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] text-sky-400 hover:underline inline-flex items-center gap-1 font-mono"
                              >
                                <span>{ad.ctaText || 'رابط الإعلان'}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Placement */}
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-[11px] font-bold border ${placementInfo?.color || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                        {placementInfo?.label || ad.placement}
                      </span>
                    </td>

                    {/* Impressions */}
                    <td className="p-4 text-center font-mono font-bold text-white">
                      {ad.impressions?.toLocaleString() || 0}
                    </td>

                    {/* Clicks */}
                    <td className="p-4 text-center font-mono font-bold text-amber-400">
                      {ad.clicks?.toLocaleString() || 0}
                    </td>

                    {/* CTR */}
                    <td className="p-4 text-center">
                      <span className="font-mono text-slate-300 font-bold bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                        {ctr}%
                      </span>
                    </td>

                    {/* Active toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black transition-colors cursor-pointer ${
                          ad.active 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {ad.active ? 'نشط ويعمل' : 'معطّل مؤقتاً'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-end">
                      <div className="flex items-center justify-end gap-1">
                        {isHtml && (
                          <button
                            onClick={() => setPreviewAdModal(ad)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="معاينة حية"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => openEditModal(ad)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="تعديل الإعلان"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف الإعلان: "${ad.title}"؟`)) {
                              deleteAd(ad.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-5 sm:p-7 max-h-[92vh] overflow-y-auto text-start">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  {adType === 'html' ? <Code className="w-5 h-5 text-amber-400" /> : <Layout className="w-5 h-5 text-amber-400" />}
                  <span>{editingAd ? 'تعديل بيانات الإعلان' : 'إنشاء إعلان جديد'}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  اختر طريقة إدخال الإعلان: كود HTML مخصص أو بانر قياسي مع صورة ورابط
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ad Type Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => setAdType('html')}
                className={`py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  adType === 'html'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>إدخال كود HTML مخصص (AdSense / كود مخصص)</span>
              </button>

              <button
                type="button"
                onClick={() => setAdType('standard')}
                className={`py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  adType === 'standard'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layout className="w-4 h-4" />
                <span>إعلان قياسي (بانر بصورة ورابط)</span>
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
                    عنوان الإعلان الداخلي (للإدارة والتمييز) *
                  </label>
                  <input
                    type="text"
                    required={adType === 'standard'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: إعلان تذاكر الطيران / كود أدسنس الهيرو..."
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
                    placeholder="مثال: إعلان مدفوع ⭐"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* -------------------- HTML CODE SECTION -------------------- */}
              {adType === 'html' && (
                <div className="space-y-3 pt-2">
                  
                  {/* Template Presets Bar */}
                  <div>
                    <label className="block text-slate-300 font-bold mb-1.5 flex items-center justify-between">
                      <span>قوالب HTML جاهزة سريعة للإدراج:</span>
                      <span className="text-[11px] text-amber-400 font-normal">انقر على القالب لنسخه إلى المحرر</span>
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {HTML_TEMPLATES.map((tmpl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => applyHtmlTemplate(tmpl.code)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:border-amber-400"
                        >
                          <span>{tmpl.icon}</span>
                          <span>{tmpl.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* HTML Code Editor */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-300 font-bold flex items-center gap-1.5">
                        <FileCode className="w-4 h-4 text-amber-400" />
                        <span>كود HTML المخصص (HTML / JavaScript / Iframes / AdSense) *</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(htmlCode)}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
                      </button>
                    </div>

                    <textarea
                      rows={8}
                      dir="ltr"
                      required={adType === 'html'}
                      value={htmlCode}
                      onChange={(e) => setHtmlCode(e.target.value)}
                      placeholder="<div>أدخل كود الـ HTML هنا...</div>"
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-amber-300 font-mono text-xs focus:border-amber-400 focus:outline-none leading-relaxed shadow-inner"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      يدعم عناصر HTML كاملة مثل <code>&lt;div&gt;</code>, <code>&lt;a href="..."&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;iframe&gt;</code> وسكربتات التتبع وإعلانات أدسنس.
                    </p>
                  </div>

                  {/* Live HTML Preview Section */}
                  {htmlCode.trim() && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>معاينة حية لحظية للكود (Live Preview):</span>
                        </span>
                        <span className="text-[10px] text-slate-500">تحديث فوري أثناء الكتابة</span>
                      </div>
                      
                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 overflow-hidden">
                        <HtmlAdRenderer 
                          ad={{
                            id: 'preview-ad',
                            title: title || 'معاينة الإعلان',
                            description: '',
                            placement,
                            ctaText: '',
                            ctaLink: '#',
                            badge: badge || undefined,
                            active: true,
                            clicks: 0,
                            impressions: 0,
                            createdAt: '',
                            adType: 'html',
                            htmlCode
                          }} 
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* -------------------- STANDARD BANNER SECTION -------------------- */}
              {adType === 'standard' && (
                <div className="space-y-4 pt-2">
                  
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
                        required={adType === 'standard'}
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
                        required={adType === 'standard'}
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
                        className="px-2 py-0.5 rounded bg-slate-800 hover:text-white cursor-pointer"
                      >
                        استقبال مطار 🚗
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetImage('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:text-white cursor-pointer"
                      >
                        سيرة ذاتية ATS 📄
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetImage('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80')}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:text-white cursor-pointer"
                      >
                        معاينة سكن 🏠
                      </button>
                    </div>
                  </div>

                  {/* Theme styling */}
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

                </div>
              )}

              {/* Active Switch */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200 font-bold">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-400 focus:ring-0 w-4 h-4 cursor-pointer"
                  />
                  <span>تفعيل الإعلان فوراً وعرضه للمستخدمين</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingAd ? 'حفظ التعديلات' : 'إضافة الإعلان الآن'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Quick HTML Ad Preview Modal from table */}
      {previewAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-start">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">معاينة كود HTML للإعلان</h3>
              </div>
              <button
                onClick={() => setPreviewAdModal(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-[11px] font-bold text-slate-400 mb-2">المظهر المباشر:</p>
                <HtmlAdRenderer ad={previewAdModal} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-400">الكود المصدري المستخدم:</span>
                  <button
                    onClick={() => handleCopyCode(previewAdModal.htmlCode || '')}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
                  </button>
                </div>
                <pre dir="ltr" className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-amber-300 font-mono text-[11px] max-h-40 overflow-y-auto">
                  {previewAdModal.htmlCode}
                </pre>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    const target = previewAdModal;
                    setPreviewAdModal(null);
                    openEditModal(target);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل هذا الكود</span>
                </button>
                <button
                  onClick={() => setPreviewAdModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
