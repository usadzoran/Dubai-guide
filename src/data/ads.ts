import { AdItem } from '../types';

export const INITIAL_ADS: AdItem[] = [
  {
    id: 'ad-top-sim',
    title: 'شريحة اتصال مجانية للقادمين الجدد: استلم بطاقة SIM إماراتية مع 2GB بيانات ترحيبية في صالة الوصول بمطار دبي DXB',
    description: 'عرض حصري للقادمين بتأشيرة سياحة أو زيارة، استلمها فور ختم الجوازات من منافذ المشغلين المعتمدين.',
    placement: 'top_banner',
    ctaText: 'تفاصيل الاستلام',
    ctaLink: 'https://www.du.ae',
    badge: 'شريحة مجانية 🎁',
    active: true,
    clicks: 142,
    impressions: 2840,
    bgStyle: 'gold',
    createdAt: '2026-02-15'
  },
  {
    id: 'ad-hero-pickup',
    title: 'خدمة استقبال المطار والتوصيل للسكن المؤقت (DXB Airport Pickup)',
    description: 'سائق خاص يستقبلك من بوابة المطار بسيارة مريحة، مع المساعدة في شراء بطاقة المترو والشريحة، وتوصيلك حتى باب سكنك بأسعار مدروسة.',
    placement: 'home_hero',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    ctaText: 'حجز استقبال عبر واتساب',
    ctaLink: 'https://wa.me/971501234567?text=مرحباً، أود الاستفسار عن خدمة استقبال المطار',
    badge: 'خدمة معتمدة ⭐',
    active: true,
    clicks: 318,
    impressions: 4620,
    bgStyle: 'gradient',
    createdAt: '2026-02-20'
  },
  {
    id: 'ad-jobs-ats',
    title: 'خدمة إعداد وفحص السيرة الذاتية وفق معايير التوظيف الخليجية (ATS Resume)',
    description: 'أكثر من 80% من الشركات في دبي تستخدم الفرز الآلي. جهّز سيرتك الذاتية بتنسيق ATS المقبول مع صيغة إنجليزية احترافية.',
    placement: 'jobs_feed',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    ctaText: 'فحص سيرتك الذاتية',
    ctaLink: 'https://wa.me/971501234567?text=أود فحص سيرتي الذاتية بنظام ATS',
    badge: 'تطوير وظيفي 💼',
    active: true,
    clicks: 289,
    impressions: 3950,
    bgStyle: 'emerald',
    createdAt: '2026-02-22'
  },
  {
    id: 'ad-housing-inspection',
    title: 'خدمة فحص السكن الميداني قبل دفع العربون لحمايتك من الاحتيال',
    description: 'متواجد في بلدك أو تخشى إرسال عربون لشخص مجهول؟ مندوبنا يعاين السكن على أرض الواقع، يتأكد من مطابقة الصور وعقد الإيجار ويزودك بتقرير مصور.',
    placement: 'housing_feed',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    ctaText: 'طلب فحص السكن الآن',
    ctaLink: 'https://wa.me/971501234567?text=أود طلب خدمة معاينة سكن للتحقق',
    badge: 'حماية وأمان 🛡️',
    active: true,
    clicks: 205,
    impressions: 3120,
    bgStyle: 'gold',
    createdAt: '2026-02-25'
  },
  {
    id: 'ad-badge-support',
    title: 'استشارة فورية للقادمين الجدد',
    description: 'لديك سؤال عن تأشيرات البحث عن عمل أو إجراءات الإقامة أو السكن في دبي؟ تحدث مع مستشار مجاناً.',
    placement: 'floating_badge',
    ctaText: 'محادثة سريعة',
    ctaLink: 'https://wa.me/971501234567?text=مرحباً، لدي استفسار عن الإقامة في دبي',
    badge: 'دعم مباشر 💬',
    active: true,
    clicks: 94,
    impressions: 1530,
    bgStyle: 'dark',
    createdAt: '2026-03-01'
  },
  {
    id: 'ad-html-travel-deal',
    title: 'إعلان HTML مخصص: عرض تذاكر طيران مخفضة وحقيبة إضافية مجاناً',
    description: 'كود HTML مخصص مع تصميم بطاقة زجاجية وزر واتساب مباشر',
    placement: 'jobs_feed',
    ctaText: 'حجز عبر واتساب',
    ctaLink: 'https://wa.me/971501234567?text=أود_الاستفسار_عن_عرض_التذاكر',
    badge: 'كود HTML ⚡',
    active: true,
    clicks: 112,
    impressions: 1840,
    bgStyle: 'gold',
    adType: 'html',
    htmlCode: `<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 18px; padding: 18px; color: #fff; direction: rtl; text-align: right; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 14px;">
      <div style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">✈️</div>
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #fbbf24; color: #0f172a; font-size: 11px; font-weight: 900; padding: 2px 8px; border-radius: 6px;">كود HTML ترويجي</span>
          <span style="font-size: 11px; color: #94a3b8;">خصم خاص للقادمين للبحث عن عمل في دبي</span>
        </div>
        <h4 style="margin: 4px 0 0 0; font-size: 15px; font-weight: 800; color: #fff;">حجز تذاكر الطيران وسفر دبي بأقل سعر ممكن</h4>
        <p style="margin: 3px 0 0 0; font-size: 12px; color: #cbd5e1;">استفد من كود الخصم DUBAI2026 عند الحجز واحصل على وزن أمتعة مجاني ومساعدة في إجراءات المطار.</p>
      </div>
    </div>
    <a href="https://wa.me/971501234567?text=أود_الاستفسار_عن_عرض_التذاكر" target="_blank" rel="noopener noreferrer" style="background: #fbbf24; color: #0f172a; padding: 10px 20px; border-radius: 12px; font-weight: 900; font-size: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);">
      <span>احجز الآن عبر واتساب</span>
      <span>&larr;</span>
    </a>
  </div>
</div>`,
    createdAt: '2026-03-02'
  }
];
