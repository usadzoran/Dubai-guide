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
  }
];
