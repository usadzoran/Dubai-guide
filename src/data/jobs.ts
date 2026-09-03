import { Job } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Warehouse Assistant',
    company: 'IRE',
    location: 'Al Quoz, Dubai',
    category: 'Warehouse',
    employmentType: 'Full Time',
    experience: '1-2 years',
    salary: '3,000 - 3,800 AED',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Warehouse%20Assistant%20IRE%20Dubai',
    dateFound: 'منذ يومين',
    status: 'active',
    featured: true,
    description: 'المساعدة في العمليات اللوجستية اليومية داخل المستودع، فحص الشحنات الواردة والتأكد من مطابقتها لفواتير الاستلام، ومتابعة تخزين البضائع في الأماكن المخصصة وفق المعايير.',
    requirements: [
      'خبرة سنة على الأقل في المستودعات أو العمليات اللوجستية',
      'القدرة على استخدام قارئ الباركود وبرامج إدارة المخازن الأساسية',
      'مهارات جيدة في اللغة الإنجليزية للمحادثة وتدوين السجلات',
      'اللياقة البدنية للتعامل مع الشحنات وتحريك البضائع'
    ]
  },
  {
    id: 'job-2',
    title: 'Warehouse Assistant II',
    company: 'DHL Global Forwarding',
    location: 'Dubai South (DWC), Dubai',
    category: 'Warehouse',
    employmentType: 'Full Time',
    experience: '1-2 years',
    salary: '3,500 - 4,500 AED (شامل المزايا)',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Warehouse%20Assistant%20II%20DHL%20Dubai',
    dateFound: 'منذ 3 أيام',
    status: 'active',
    featured: true,
    description: 'دعم إدارة حركة الشحن الدولي والإيداع الجمركي، استلام الشحنات وتنسيق ترتيبها على منصات التحميل ومتابعة تجهيز طرود التصدير والاستيراد لشبكة DHL العالمية.',
    requirements: [
      'فهم أساسي لإجراءات الشحن والمناولة السريعة',
      'الالتزام الصارم بقواعد الصحة والسلامة المهنية العالمية لشركة DHL',
      'معرفة العمل على أنظمة WMS أو ما يعادلها ميزة إضافية',
      'إجادة اللغة الإنجليزية المكتوبة والشفوية'
    ]
  },
  {
    id: 'job-3',
    title: 'Warehouse Assistant-1',
    company: 'Hellmann Worldwide Logistics',
    location: 'Jebel Ali Free Zone (JAFZA), Dubai',
    category: 'Warehouse',
    employmentType: 'Full Time',
    experience: 'Entry Level',
    salary: '2,800 - 3,500 AED',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Hellmann%20Worldwide%20Logistics%20Warehouse%20Dubai',
    dateFound: 'منذ 4 أيام',
    status: 'active',
    description: 'تنفيذ أعمال الجرد المخزني الدوري، فرز وتغليف المنتجات حسب طلبات العملاء، والتنسيق مع فرق النقل والتوزيع داخل المنطقة الحرة بجبل علي.',
    requirements: [
      'مستوى مبتدئ أو خبرة بسيطة في مراكز التوزيع',
      'الانتباه العالي للتفاصيل والدقة في قراءة أرقام الشحنات (SKU)',
      'الاستعداد للعمل بنظام الورديات المتناوبة',
      'حضور ذهني وتحمل ضغط العمل الموسمي'
    ]
  },
  {
    id: 'job-4',
    title: 'Picker',
    company: 'talabat',
    location: 'Al Barsha / Al Quoz, Dubai',
    category: 'Warehouse',
    employmentType: 'Full Time',
    experience: 'Entry Level',
    salary: '2,500 - 3,200 AED + حوافز إنجاز',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Picker%20talabat%20Dubai',
    dateFound: 'منذ يوم',
    status: 'active',
    featured: true,
    description: 'العمل في مراكز طلبات مارت (talabat Mart)، انتقاء وتجهيز طلبات البقالة والمنتجات التموينية بدقة وسرعة قياسية لتسليمها لسائقي التوصيل في أسرع وقت ممكن.',
    requirements: [
      'سرعة الحركة والتركيز على دقة الطلبات وتواريخ الصلاحية',
      'القدرة على التعامل مع التطبيقات الذكية على أجهزة التجميع',
      'مرونة في ساعات العمل والورديات المسائية',
      'لا يُشترط خبرة سابقة طويلة (تدريب مدفوع في الأسبوع الأول)'
    ]
  },
  {
    id: 'job-5',
    title: 'Warehouse Helper',
    company: 'Nabors Industries',
    location: 'Jebel Ali, Dubai',
    category: 'Warehouse',
    employmentType: 'Full Time',
    experience: 'Entry Level',
    salary: '2,700 - 3,300 AED',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Nabors%20Industries%20Warehouse%20Helper%20Dubai',
    dateFound: 'منذ 5 أيام',
    status: 'check_status',
    description: 'مساعدة الفنيين ومشرفي المستودع في تحميل وتفريغ المعدات والقطع الصناعية، تنظيف وصيانة مناطق التخزين والحفاظ على بيئة عمل آمنة ومنظمة وفق المعايير الصناعية.',
    requirements: [
      'قدرة بدنية جيدة وتحمل الأوزان والمناولة اليدوية',
      'الالتزام بارتداء معدات الحماية الشخصية (PPE) طوال فترة العمل',
      'العمل بروح الفريق والتعاون مع الزملاء',
      'معرفة أساسية بمبادئ السلامة في بيئات العمل الصناعية'
    ]
  },
  {
    id: 'job-6',
    title: 'General Assistant',
    company: 'Emirates Flight Catering',
    location: 'Dubai International Airport (DXB), Dubai',
    category: 'Restaurant',
    employmentType: 'Full Time',
    experience: 'Entry Level',
    salary: '3,000 - 3,600 AED + سكن ومواصلات',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Emirates%20Flight%20Catering%20General%20Assistant%20Dubai',
    dateFound: 'منذ يومين',
    status: 'active',
    featured: true,
    description: 'المشاركة في إعداد وتجهيز وجبات ومعدات الضيافة لرحلات طيران الإمارات، الالتزام بأعلى معايير سلامة الأغذية والنظافة العالمية، ومساعدة طواقم التموين في صالات التحضير.',
    requirements: [
      'معايير نظافة شخصية ممتازة وتفانٍ في العمل الفندقي/الغذائي',
      'شهادة تدريب في سلامة الغذاء (HACCP أو Basic Food Hygiene ميزة)',
      'القدرة على العمل في بيئات التبريد والتكييف المستمر',
      'إجادة اللغة الإنجليزية الأساسية للتواصل'
    ]
  },
  {
    id: 'job-7',
    title: 'Admin Officer',
    company: 'Emirates',
    location: 'Emirates Group Headquarters, Garhoud, Dubai',
    category: 'Admin',
    employmentType: 'Full Time',
    experience: '1-2 years',
    salary: '5,000 - 6,500 AED + تذاكر سفر',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Emirates%20Admin%20Officer%20Dubai',
    dateFound: 'منذ 4 أيام',
    status: 'active',
    description: 'إدارة المهام المكتبية والسكرتارية في أقسام مجموعة الإمارات، تنظيم المراسلات الرسمية وجدولة الاجتماعات، وإدخال البيانات في أنظمة الشركة ومتابعة إصدار التصاريح للموظفين الجدد.',
    requirements: [
      'دبلوم أو بكالوريوس في إدارة الأعمال أو تخصص ذي صلة',
      'إتقان ممتاز لبرامج Microsoft Office (Excel, Word, Outlook)',
      'إجادة اللغتين الإنجليزية والعربية بطلاقة كتابة وتحدثاً',
      'مهارات تنظيمية عالية وحسن التعامل مع الزوار والموظفين'
    ]
  },
  {
    id: 'job-8',
    title: 'Delivery Driver (Motorcycle / Car)',
    company: 'Careem / Fetchr Logistics',
    location: 'Deira / Bur Dubai',
    category: 'Driver',
    employmentType: 'Full Time',
    experience: '1-2 years',
    salary: '3,500 - 5,000 AED (بالعمولة + أساسي)',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Delivery%20Driver%20Dubai',
    dateFound: 'منذ 3 أيام',
    status: 'active',
    description: 'توصيل الطرود والطلبات السريعة إلى العملاء في مختلف مناطق دبي، استخدام تطبيقات الملاحة لتحديد أقصر المسارات والالتزام بالمواعيد المحددة مع المحافظة على سلامة الشحنات.',
    requirements: [
      'رخصة قيادة إماراتية سارية (دراجة نارية أو مركبة خفيفة)',
      'معرفة جيدة بشوارع وأحياء دبي (ديرة، بر دبي، الخليج التجاري، مارينا)',
      'هاتف ذكي والقدرة على استخدام تطبيقات الـ GPS وتحديث حالة التسليم',
      'سجل قيادة نظيف ولباقة في التعامل مع الزبائن'
    ]
  },
  {
    id: 'job-9',
    title: 'Retail Sales Associate',
    company: 'Alshaya Group',
    location: 'Dubai Mall / Mall of the Emirates',
    category: 'Sales',
    employmentType: 'Full Time',
    experience: 'Entry Level',
    salary: '4,000 - 5,200 AED + عمولات مبيعات',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Alshaya%20Sales%20Associate%20Dubai',
    dateFound: 'منذ 4 أيام',
    status: 'active',
    description: 'استقبال الزوار في متاجر العلامات التجارية العالمية، تقديم المشورة حول المنتجات ومساعدتهم في اختيار ما يناسبهم، وإتمام عمليات البيع عبر الكاشير والحفاظ على ترتيب المعرض.',
    requirements: [
      'شخصية اجتماعية ومظهر لائق ومهارات تواصل عالية',
      'إجادة اللغة الإنجليزية (اللغة العربية أو الفرنسية ميزة إضافية كبيرة)',
      'القدرة على العمل بنظام الفترات المتغيرة ومواسم التخفيضات',
      'حماس لتحقيق أهداف المبيعات الشهرية'
    ]
  },
  {
    id: 'job-10',
    title: 'Security Guard',
    company: 'Transguard Group',
    location: 'Business Bay / Downtown, Dubai',
    category: 'Security',
    employmentType: 'Full Time',
    experience: '1-2 years',
    salary: '2,600 - 3,200 AED + سكن ومواصلات',
    source: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Transguard%20Security%20Guard%20Dubai',
    dateFound: 'منذ 6 أيام',
    status: 'active',
    description: 'مراقبة المداخل والمخارج في الأبراج السكنية والتجارية، التحقق من هويات الزوار وتسجيل الدخول، ومتابعة شاشات المراقبة والتعامل السريع مع أي حالات طوارئ أو مخالفات أمنية.',
    requirements: [
      'شهادة SIRA (مؤسسة تنظيم الصناعة الأمنية بدبي) ميزة أو الاستعداد لاجتياز الدورة',
      'اللياقة البدنية والانضباط واليقظة طوال فترة الوردية',
      'القدرة على التحدث بالإنجليزية للتعامل مع المقيمين والزوار',
      'خلو السجل الجنائي وحسن السيرة والسلوك'
    ]
  }
];

export const JOB_CATEGORIES = [
  { id: 'all', label: 'جميع المهن', labelEn: 'All Jobs' },
  { id: 'Warehouse', label: 'مستودعات ولوجستيك', labelEn: 'Warehouse' },
  { id: 'Driver', label: 'سائقين وتوصيل', labelEn: 'Driver & Delivery' },
  { id: 'Sales', label: 'مبيعات وتجزئة', labelEn: 'Sales' },
  { id: 'Restaurant', label: 'مطاعم وضيافة', labelEn: 'Restaurant & Catering' },
  { id: 'Admin', label: 'إدارة وسكرتارية', labelEn: 'Admin' },
  { id: 'Security', label: 'حراسة وأمن', labelEn: 'Security' },
  { id: 'Cleaner', label: 'تنظيف وخدمات', labelEn: 'Cleaner' },
  { id: 'Construction', label: 'بناء وتشطيبات', labelEn: 'Construction' },
  { id: 'Hotel', label: 'فنادق واستقبال', labelEn: 'Hotel' }
];

export const DUBAI_AREAS = [
  { id: 'all', label: 'جميع المناطق' },
  { id: 'Deira', label: 'ديرة (Deira)' },
  { id: 'Bur Dubai', label: 'بر دبي (Bur Dubai)' },
  { id: 'Al Quoz', label: 'القوز (Al Quoz)' },
  { id: 'Business Bay', label: 'الخليج التجاري (Business Bay)' },
  { id: 'Dubai Marina', label: 'دبي مارينا (Dubai Marina)' },
  { id: 'Jebel Ali', label: 'جبل علي (Jebel Ali / JAFZA)' },
  { id: 'Dubai Silicon Oasis', label: 'واحة دبي للسيليكون (DSO)' },
  { id: 'Al Nahda', label: 'النهدة (Al Nahda)' },
  { id: 'Al Barsha', label: 'البرشاء (Al Barsha)' },
  { id: 'International City', label: 'المدينة العالمية (International City)' }
];
