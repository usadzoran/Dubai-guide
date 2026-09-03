import { HousingListing } from '../types';

export const INITIAL_HOUSING: HousingListing[] = [
  {
    id: 'house-1',
    title: 'سرير (Bed Space) هادئ ونظيف قريب من مترو الاتحاد',
    type: 'bed_space',
    price: 650,
    area: 'Deira',
    address: 'شارع عمر بن الخطاب، بالقرب من محطة مترو الاتحاد (Union Metro)',
    nearMetro: true,
    metroStation: 'Union Metro Station',
    metroWalkMinutes: 3,
    verificationStatus: 'verified',
    verificationNote: 'تمت مطابقة بيانات المبنى ورقم التواصل والتأكد من وجود المبنى الفعلي',
    billsIncluded: true,
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '+971501234567',
    whatsapp: '971501234567',
    amenities: ['واي فاي سريع', 'كهرباء ومياه مشمولة', 'غسالة ملابس أوتوماتيك', 'مطبخ مجهز بالكامل', 'تنظيف دوري مرتين أسبوعياً'],
    gender: 'men',
    description: 'سكن شبابي هادئ وملائم جداً للقادمين الجدد والباحثين عن عمل في دبي. الغرفة واسعة تتسع لـ 4 أشخاص فقط، مع خزائن شخصية مقفلة لكل ساكن. خطوة واحدة من تقاطع الخطين الأحمر والأخضر بمترو الاتحاد.',
    datePosted: 'منذ يوم'
  },
  {
    id: 'house-2',
    title: 'بارتيشن خاص (Partition) للموظفين في بر دبي',
    type: 'partition',
    price: 950,
    area: 'Bur Dubai',
    address: 'قرب محطة مترو برجمان، منطقة المنخول',
    nearMetro: true,
    metroStation: 'BurJuman Metro Station',
    metroWalkMinutes: 5,
    verificationStatus: 'verified',
    verificationNote: 'معلومات الوحدة السكنية مطابقة لعنوان البناية في بلدية دبي',
    billsIncluded: true,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '+971559876543',
    whatsapp: '971559876543',
    amenities: ['باب بقفل مستقل', 'نافذة تهوية جيدة', 'إنترنت فايبر', 'مكيف مركزي ممتاز', 'مطبخ مجهز'],
    gender: 'men',
    description: 'بارتيشن خشب عازل ومرتفع للسقف يوفر خصوصية تامة لشخص واحد، يحتوي على سرير طبي مريح ودولاب ملابس ومكتب صغير، شامل فواتير الكهرباء والمياه والإنترنت.',
    datePosted: 'منذ يومين'
  },
  {
    id: 'house-3',
    title: 'غرفة مشتركة (شخصين فقط) في النهدة دبي',
    type: 'shared_room',
    price: 850,
    area: 'Al Nahda',
    address: 'النهدة 1، بجوار حديقة النهدة ومحطة مترو الاستاد',
    nearMetro: true,
    metroStation: 'Stadium Metro Station',
    metroWalkMinutes: 8,
    verificationStatus: 'check_before_payment',
    verificationNote: 'تأكد من معاينة السكن بنفسك قبل تحويل أي مبالغ أو عربون',
    billsIncluded: true,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '+971524455667',
    whatsapp: '971524455667',
    amenities: ['سريران منفصلان', 'حمام متصل', 'بالكونة مطلة', 'قريب من محلات السوبرماركت والمطاعم'],
    gender: 'men',
    description: 'غرفة نظيفة ومضيئة لشخصين في شقة عائلية هادئة. منطقة النهدة تتميز بوفرة الخدمات والمطاعم الشعبية المناسبة للميزانية وسهولة التنقل إلى الشارقة ودبي.',
    datePosted: 'منذ 3 أيام'
  },
  {
    id: 'house-4',
    title: 'غرفة ماستر خاصة للموظفين في القوز',
    type: 'private_room',
    price: 1800,
    area: 'Al Quoz',
    address: 'القوز 4، بالقرب من شارع الخيل والشركات اللوجستية',
    nearMetro: false,
    metroWalkMinutes: 20,
    verificationStatus: 'verified',
    verificationNote: 'تم التحقق من بيانات المالك والعقار عبر وسيط عقاري معتمد RERA',
    billsIncluded: true,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '+971587788990',
    whatsapp: '971587788990',
    amenities: ['حمام خاص ماستر', 'مكيف سبليت جديد', 'موقف سيارة متاح', 'ثلاجة خاصة بالغرفة'],
    gender: 'any',
    description: 'غرفة ماستر مستقلة تماماً بحمام خاص في فيلا هادئة بالقوز. موقع ممتاز للعاملين في المناطق الصناعية أو اللوجستية أو شارع الشيخ زايد.',
    datePosted: 'منذ 4 أيام'
  },
  {
    id: 'house-5',
    title: 'ستوديو مفروش بالكامل في المدينة العالمية (انترناشونال سيتي)',
    type: 'studio',
    price: 2600,
    area: 'International City',
    address: 'الحي الإنجليزي (England Cluster)، بناية X12',
    nearMetro: false,
    verificationStatus: 'verified',
    verificationNote: 'عقد إيجاري إلكتروني موثق من دائرة الأراضي والأملاك بدبي',
    billsIncluded: false,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '+971561122334',
    whatsapp: '971561122334',
    amenities: ['شرفة واسعة', 'أثاث جديد', 'مطبخ مفتوح', 'أمن 24/7', 'حراسة ومصاعد حديثة'],
    gender: 'any',
    description: 'ستوديو فسيح للإيجار الشهري المباشر بدون عمولة مكتب. إمكانية التسجيل في إيجاري أو الدفع الشهري بشيكات أو نقدياً مع المالك مباشرة.',
    datePosted: 'منذ 5 أيام'
  },
  {
    id: 'house-6',
    title: 'سرير بسعر منخفض جداً في بناية شعبية (تحذير)',
    type: 'bed_space',
    price: 350,
    area: 'Deira',
    address: 'منطقة سوق الذهب القديم، ديرة',
    nearMetro: true,
    metroStation: 'Al Ras Metro Station',
    metroWalkMinutes: 6,
    verificationStatus: 'suspicious',
    verificationNote: '⚠️ تنبيه: تم الإبلاغ عن طلب تحويل عربون قبل مشاهدة المكان أو كثافة سكانية غير قانونية في الغرفة',
    billsIncluded: false,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '+971500000000',
    whatsapp: '971500000000',
    amenities: ['سرير طابقين'],
    gender: 'men',
    description: 'ملاحظة للمستخدمين: السعر المنخفض بشكل غير معتاد (350 درهم شامل) غالباً ما يكون لغرف مكتظة بأكثر من 8 أشخاص أو احتيال لطلب عربون مالي. وضعنا هذا الإعلان لأغراض التوعية والحذر.',
    datePosted: 'منذ 6 أيام'
  }
];

export const HOUSING_AREAS = [
  { id: 'all', label: 'جميع المناطق' },
  { id: 'Deira', label: 'ديرة (Deira)' },
  { id: 'Bur Dubai', label: 'بر دبي (Bur Dubai)' },
  { id: 'Al Nahda', label: 'النهدة (Al Nahda)' },
  { id: 'Al Qusais', label: 'القصيص (Al Qusais)' },
  { id: 'Al Quoz', label: 'القوز (Al Quoz)' },
  { id: 'International City', label: 'المدينة العالمية' },
  { id: 'Dubai Marina', label: 'دبي مارينا' },
  { id: 'Business Bay', label: 'الخليج التجاري' },
  { id: 'Jebel Ali', label: 'جبل علي' }
];
