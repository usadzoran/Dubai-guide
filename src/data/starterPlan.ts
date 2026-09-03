import { DayPlan, StarterPlanQuestionnaire } from '../types';

export interface StarterPlanDayItem {
  day: number;
  title: string;
  subtitle: string;
  estimatedBudget: string;
  tasks: string[];
}

export const STARTER_PLAN_DAYS: StarterPlanDayItem[] = [
  {
    day: 1,
    title: 'الوصول، بطاقة Nol وشريحة الاتصال',
    subtitle: 'أول ساعاتك في مطار دبي والتنقل إلى مكان إقامتك المؤقت',
    estimatedBudget: 'ميزانية اليوم: ~100 درهم (Nol + SIM)',
    tasks: [
      'استلم شريحة الاتصال السياحية من كشك الجوازات في صالة الوصول أو كشك Du / e& (سعر الباقة الأساسية 49-99 درهم)',
      'اشترِ بطاقة نول الفضية (Silver Nol Card) من محطة مترو المطار بقيمة 25 درهم (تحتوي على 19 درهم رصيد)',
      'اصرف 50-100 دولار أو يورو فقط في المطار لتغطية المشاوير الأولى واحتفظ بالباقي لصرافات المدينة',
      'توجه إلى سكنك المؤقت بواسطة المترو، وتأكد من تنزيل تطبيق Google Maps و S’hail'
    ]
  },
  {
    day: 2,
    title: 'الاستقرار في السكن وتثبيت العنوان',
    subtitle: 'تأمين مكان إقامة اقتصادي ونظيف قريب من المترو',
    estimatedBudget: 'ميزانية اليوم: 500-750 درهم (إيجار السرير للشهر الأول)',
    tasks: [
      'قم بمعاينة 2-3 غرف أو Bed Space بنفسك في ديرة أو بر دبي أو النهدة',
      'تأكد من عمل التكييف، توفر خدمة الإنترنت، وشمول فواتير الكهرباء والمياه (DEWA) بالإيجار',
      'لا تدفع أي عربون قبل استلام المفتاح ورؤية المشرف أو المستأجر الرئيسي بنفسك',
      'احفظ العنوان واسم البناية وأقرب محطة مترو في هاتفك للرجوع إليها في السيرة الذاتية'
    ]
  },
  {
    day: 3,
    title: 'تجهيز السيرة الذاتية ورقم الهاتف المحلي',
    subtitle: 'مواءمة الـ CV مع سوق العمل في دبي وإنشاء شبكة LinkedIn',
    estimatedBudget: 'ميزانية اليوم: مجاناً أو 15 درهم لطباعة نسخ',
    tasks: [
      'قم بتحديث السيرة الذاتية (CV) باللغة الإنجليزية وحذف الحالة العائلية ورقم الهوية الأجنبي',
      'أضف رقم هاتفك الإماراتي الجديد (+971) وعنوانك (Dubai, UAE) بوضوح في أعلى السيرة الذاتية',
      'عدّل موقعك الجغرافي على LinkedIn إلى "Dubai, United Arab Emirates" واضبط الحالة على Open to Work',
      'اطبع 10 نسخ ورقية من السيرة الذاتية في أقرب مكتبة أو مركز طباعة'
    ]
  },
  {
    day: 4,
    title: 'جولة ميدانية بالمترو وفهم خريطة الأعمال',
    subtitle: 'التعرف على مراكز الشركات والمناطق الصناعية والتجارية',
    estimatedBudget: 'ميزانية اليوم: 15-25 درهم (مترو نول)',
    tasks: [
      'اركب المترو (الخط الأحمر) وتعرف على المحطات الرئيسية: الاتحاد، برجمان، الخليج التجاري، DMCC',
      'قم بزيارة ميدانية سريعة لحي الأعمال في الخليج التجاري وشارع الشيخ زايد',
      'إذا كان تخصصك لوجستيات أو مخازن، تعرف على كيفية الوصول إلى القوز (Al Quoz) وجبل علي',
      'احفظ مواقع مراكز آمر وتسهيل القريبة من سكنك'
    ]
  },
  {
    day: 5,
    title: 'التقديم المكثف والذكي عبر المصادر المعتمدة',
    subtitle: 'التركيز على 20 وظيفة مطابقة 100% لمؤهلاتك',
    estimatedBudget: 'ميزانية اليوم: مجاناً',
    tasks: [
      'تصفح قسم الوظائف على DubaiStart والتقديم عبر الروابط الرسمية على LinkedIn ومواقع الشركات',
      'تجنب التقديم العشوائي، وركز على إعلانات التوظيف التي نُشرت خلال آخر 48 ساعة',
      'أرسل رسائل مهنية مباشرة لمسؤولي الموارد البشرية (HR Managers) عبر لينكدإن بأسلوب مهني ومختصر',
      'أنشئ ملف Excel أو مفكرة بسيطة لتسجيل كل شركة تقدمت لها ورقم الإعلان وتاريخ التقديم'
    ]
  },
  {
    day: 6,
    title: 'زيارة وكالات التوظيف المعتمدة مجاناً',
    subtitle: 'تسجيل السيرة الذاتية لدى مكاتب التوظيف المرخصة دون دفع أي رسوم',
    estimatedBudget: 'ميزانية اليوم: 20 درهم مواصلات',
    tasks: [
      'اختر 2-3 مكاتب توظيف من قائمة مكاتب DubaiStart في مركز دبي المالي أو شارع الشيخ زايد',
      'قم بزيارة المكاتب أو التقديم عبر بواباتها الرسمية بالإنترنت',
      'تذكر القاعدة الذهبية: إذا طلب أي مكتب رسوم "فتح ملف" أو "مقابلة"، غادر فوراً ولا تدفع درهماً واحداً',
      'تابع أي مكالمات أو إيميلات واردة وجهّز إجابات المقابلات باللغة الإنجليزية'
    ]
  },
  {
    day: 7,
    title: 'مراجعة الميزانية وجرد المصروفات وترتيب الأسبوع الثاني',
    subtitle: 'تقييم ما تم إنجازه والتأكد من بقاء رصيدك المالي آمناً',
    estimatedBudget: 'ميزانية اليوم: جرد وتوفير',
    tasks: [
      'راجع إجمالي ما أنفقته في الأسبوع الأول واستخدم حاسبة ميزانية دبي للتأكد من كفاية المبلغ المتبقي',
      'اشترِ المواد الغذائية الأساسية من السوبرماركت الاقتصادي واعتمد على الطبخ المنزلي لتقليص النفقات',
      'راجع الردود والإيميلات ورتّب مواعيد أي مقابلات تم تحديدها',
      'شحذ الهمة والتركيز على متابعة الشركات في الأسبوع الثاني'
    ]
  }
];

export function generateCustomStarterPlan(q: StarterPlanQuestionnaire): DayPlan[] {
  const isArabic = q.planLanguage === 'ar';
  const isFrench = q.planLanguage === 'fr';

  // Customized advise tailored to nationality and profession
  let nationalityTip = '';
  if (q.nationality === 'algeria' || q.nationality === 'dz') {
    nationalityTip = isArabic
      ? 'نصيحة خاصة بالجزائريين: تأكد من شحن بطاقة فيزا/ماستركارد دولية (مثل Paysera أو RedotPay أو بطاقة بنك جزائري مفعلة دولياً) لتغطية مصاريف اليوم الأول وسحب العملة بالدرهم.'
      : isFrench
      ? 'Conseil spécial Algériens : Prévoyez une carte internationale (Paysera, Wise ou RedotPay) pour vos dépenses et retraits en AED dès votre arrivée.'
      : 'Special tip for Algerians: Keep an international card (e.g. Paysera, RedotPay or international bank card) active for immediate AED withdrawal and initial expenses.';
  } else if (q.nationality === 'morocco' || q.nationality === 'ma') {
    nationalityTip = isArabic
      ? 'نصيحة خاصة بالمغاربة: احرص على تفعيل مخصصات السفر (Dotation Touristique) عبر بنكك المغربي قبل السفر لتسهيل السحب من صرافات دبي.'
      : 'Special tip for Moroccans: Ensure your international bank travel dotation is enabled for seamless ATM withdrawals across Dubai.';
  } else if (q.nationality === 'egypt' || q.nationality === 'eg') {
    nationalityTip = isArabic
      ? 'نصيحة خاصة بالمصريين: احتفظ بمبلغ سيولة نقدي كافٍ بالدولار أو الدرهم للطوارئ لتفادي قيود السحب على بعض البطاقات المحلية.'
      : 'Special tip for Egyptians: Carry enough cash in USD or AED for emergency expenses to avoid local card withdrawal limits.';
  }

  const housingTip = !q.hasHousing
    ? (isArabic
        ? '⚠️ تنبيه: لا تدفع عربوناً إلكترونياً لأي شخص. توجه فوراً إلى حي ديرة (Deira) أو بر دبي واحجز سريراً مؤقتاً (Bed Space) لعدة أيام فقط بعد معاينته بنفسك.'
        : '⚠️ Warning: Never transfer a deposit in advance. Visit Deira or Bur Dubai and book a temporary bed space only after inspecting it in person.')
    : (isArabic
        ? 'لقد وفّرت خطوة كبيرة بوجود سكن مؤقت. سجل عنوانك ورقم بنايتك بدقة للمراسلات ومحطات المترو القريبة.'
        : 'Having initial accommodation saves you precious time. Note down your exact building address and nearest metro station.');

  const professionTarget = q.profession || 'المهن العامة';

  if (isFrench) {
    return [
      {
        dayNumber: 1,
        title: 'Jour 1 : Arrivée, Connectivité & Transport',
        summary: 'Installation, carte SIM locale, carte de métro Nol et premier repérage.',
        tasks: [
          {
            id: 'd1-t1',
            text: 'Récupérer la carte SIM touristique gratuite (du ou e&) à l’aéroport DXB',
            tips: 'Disponible aux guichets d’immigration de l’aéroport de Dubaï avec 1 Go gratuit pour démarrer.'
          },
          {
            id: 'd1-t2',
            text: 'Acheter une carte de transport Nol Card (Silver) au métro',
            tips: 'Prix 25 AED (dont 19 AED de crédit). Indispensable pour le métro, bus et bateaux-bus RTA.'
          },
          {
            id: 'd1-t3',
            text: 'Rejoindre votre hébergement temporaire en toute sécurité',
            tips: housingTip
          },
          {
            id: 'd1-t4',
            text: 'Activer WhatsApp avec votre nouveau numéro émirati (+971)',
            tips: nationalityTip || 'Les recruteurs à Dubaï vous contacteront presque exclusivement par appel direct ou WhatsApp émirati.'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Jour 2 : CV Format Golfe & Profil LinkedIn',
        summary: 'Adapter vos documents selon les normes précises du marché du travail à Dubaï.',
        tasks: [
          {
            id: 'd2-t1',
            text: 'Formater votre CV en version 1 ou 2 pages en anglais',
            tips: 'Indiquez clairement : statut du visa (Visit Visa), disponibilité immédiate (Immediate Joiner), et numéro UAE +971.'
          },
          {
            id: 'd2-t2',
            text: 'Mettre à jour votre localisation LinkedIn sur "Dubai, United Arab Emirates"',
            tips: 'Activez l’option "Open to Work" visible uniquement par les recruteurs de la région.'
          },
          {
            id: 'd2-t3',
            text: `Recherche ciblée pour le secteur : ${professionTarget}`,
            tips: 'Filtrez par "Emirats Arabes Unis" et "Posté au cours des 24 dernières heures".'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Jour 3 : Visite des Agences de Recrutement Officielles',
        summary: 'Approche directe et inscription sur les portails des agences certifiées sans frais.',
        tasks: [
          {
            id: 'd3-t1',
            text: 'Consulter la liste officielle DubaiStart des agences vérifiées',
            tips: 'Ne payez JAMAIS de frais de dossier ou d’inscription. La loi UAE interdit tout paiement par le candidat.'
          },
          {
            id: 'd3-t2',
            text: 'Déposer votre CV en ligne chez Michael Page, TASC, Adecco et Ultimate HR',
            tips: 'Joignez une lettre de présentation concise et ciblez les rôles correspondant à votre profil.'
          }
        ]
      },
      {
        dayNumber: 4,
        title: 'Jour 4 : Dépôt Direct & Entretiens Terrain',
        summary: 'Démarchage terrain dans les zones d’activité économiques (Al Quoz, Business Bay, Deira).',
        tasks: [
          {
            id: 'd4-t1',
            text: 'Imprimer 15 à 20 copies de votre CV dans un centre d’impression',
            tips: 'Des photocopieurs et imprimeries sont disponibles près de toutes les stations de métro à Deira et Bur Dubai.'
          },
          {
            id: 'd4-t2',
            text: 'Visiter les zones d’entreprises adaptées à votre domaine',
            tips: 'Exemple : Al Quoz & Jebel Ali pour logistique/entrepôts ; Business Bay & DIFC pour fonctions administratives/ventes.'
          }
        ]
      },
      {
        dayNumber: 5,
        title: 'Jour 5 : Relances & Réseau Professionnel',
        summary: 'Suivi méthodique des candidatures envoyées et élargissement du réseau.',
        tasks: [
          {
            id: 'd5-t1',
            text: 'Envoyer des messages personnalisés sur LinkedIn aux Talent Acquisition Managers',
            tips: 'Rédigez un message court, courtois et professionnel en anglais.'
          },
          {
            id: 'd5-t2',
            text: 'Tenir un tableau de suivi des candidatures (Société, Contact, Statut)',
            tips: 'Notez le nom de l’interlocuteur et relancez après 3 à 5 jours ouvrés.'
          }
        ]
      },
      {
        dayNumber: 6,
        title: 'Jour 6 : Recherche de Logement Durable & Sécurisé',
        summary: 'Visites physiques et négociation de votre chambre ou lit à proximité du métro.',
        tasks: [
          {
            id: 'd6-t1',
            text: 'Visiter 3 à 4 options de logement répertoriées sur DubaiStart',
            tips: 'Vérifiez la climatisation, la propreté, la vitesse du Wi-Fi et les charges DEWA incluses.'
          },
          {
            id: 'd6-t2',
            text: 'Calculer le temps de marche réel jusqu’à la station de métro la plus proche',
            tips: 'En été, marcher plus de 10 minutes sous la chaleur de Dubaï peut devenir très éprouvant.'
          }
        ]
      },
      {
        dayNumber: 7,
        title: 'Jour 7 : Bilan Hebdomadaire & Planification du Mois',
        summary: 'Contrôle du budget restant, bilan des entretiens et recalibrage.',
        tasks: [
          {
            id: 'd7-t1',
            text: 'Faire le point financier sur vos dépenses de la première semaine',
            tips: 'Ajustez votre budget transport et repas en privilégiant les épiceries locales et le métro.'
          },
          {
            id: 'd7-t2',
            text: 'Programmer vos entretiens et rappels pour la semaine 2',
            tips: 'Le marché de Dubaï récompense la persévérance et le suivi quotidien.'
          }
        ]
      }
    ];
  }

  // Arabic default (also translated to English if selected)
  if (q.planLanguage === 'en') {
    return [
      {
        dayNumber: 1,
        title: 'Day 1: Arrival, Local SIM & Nol Card',
        summary: 'Smooth settlement, local phone line, transport card, and secure check-in.',
        tasks: [
          {
            id: 'd1-t1',
            text: 'Collect your free tourist SIM (du or e&) at DXB Airport immigration',
            tips: 'Free 1GB data is provided to newcomers upon arrival at passport control.'
          },
          {
            id: 'd1-t2',
            text: 'Purchase a Silver Nol Metro Card at the airport metro station',
            tips: 'Cost is 25 AED (comes with 19 AED usable balance). Essential for all public transit.'
          },
          {
            id: 'd1-t3',
            text: 'Check-in to your temporary accommodation safely',
            tips: housingTip
          },
          {
            id: 'd1-t4',
            text: 'Switch WhatsApp to your new UAE +971 number',
            tips: nationalityTip || 'Recruiters in Dubai almost strictly communicate via direct phone call or UAE WhatsApp.'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Day 2: Gulf Standard CV & LinkedIn Optimization',
        summary: 'Adapt your resume to local market expectations and set up job alert filters.',
        tasks: [
          {
            id: 'd2-t1',
            text: 'Format your 1-page English CV with UAE phone number and visa status',
            tips: 'State clearly: "Visa Status: Visit / Jobseeker Visa" and "Availability: Immediately".'
          },
          {
            id: 'd2-t2',
            text: 'Set LinkedIn location to "Dubai, United Arab Emirates"',
            tips: 'Turn on "Open to Work" specifically for regional recruiters.'
          },
          {
            id: 'd2-t3',
            text: `Search targeted openings in: ${professionTarget}`,
            tips: 'Filter by "United Arab Emirates" and "Past 24 Hours".'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Day 3: Official Recruitment Agencies Outreach',
        summary: 'Submit direct profiles to legitimate licensed agencies without paying any fees.',
        tasks: [
          {
            id: 'd3-t1',
            text: 'Browse DubaiStart verified recruitment agencies list',
            tips: 'Never pay registration fees. Under UAE Law, employers bear 100% of recruitment costs.'
          },
          {
            id: 'd3-t2',
            text: 'Apply through official career portals of Michael Page, TASC, and Adecco',
            tips: 'Target 5-10 specific job titles that fit your exact background.'
          }
        ]
      },
      {
        dayNumber: 4,
        title: 'Day 4: Field Visits & Commercial Zones Drop-off',
        summary: 'Direct field presence in commercial hubs (Al Quoz, Business Bay, Deira).',
        tasks: [
          {
            id: 'd4-t1',
            text: 'Print 15-20 crisp copies of your CV at a local print shop',
            tips: 'Copy centers are widely available near Union & BurJuman metro stations.'
          },
          {
            id: 'd4-t2',
            text: 'Conduct walk-in drop-offs in commercial parks matching your skill',
            tips: 'Warehousing/logistics in Al Quoz & Jebel Ali; Corporate/Sales in Business Bay & DIFC.'
          }
        ]
      },
      {
        dayNumber: 5,
        title: 'Day 5: Interview Follow-ups & Professional Networking',
        summary: 'Systematic pipeline management and follow-up messaging.',
        tasks: [
          {
            id: 'd5-t1',
            text: 'Send courteous LinkedIn connection requests to HR managers',
            tips: 'Include a friendly 2-sentence note highlighting your immediate availability.'
          },
          {
            id: 'd5-t2',
            text: 'Organize a tracking sheet of companies you reached out to',
            tips: 'Follow up politely after 3-4 working days.'
          }
        ]
      },
      {
        dayNumber: 6,
        title: 'Day 6: Inspect Long-term Housing & Metro Proximity',
        summary: 'Physical in-person inspection of monthly bed space or private rooms.',
        tasks: [
          {
            id: 'd6-t1',
            text: 'Visit 2-3 inspected rooms shortlisted on DubaiStart',
            tips: 'Check air conditioning, DEWA utility inclusions, kitchen facilities, and cleanliness.'
          },
          {
            id: 'd6-t2',
            text: 'Test the walking distance to the nearest Metro Station',
            tips: 'Keep it within 5-8 minutes walk to avoid high taxi fares or excessive heat.'
          }
        ]
      },
      {
        dayNumber: 7,
        title: 'Day 7: Weekly Review & Week 2 Planning',
        summary: 'Budget assessment, interview schedule review, and momentum retention.',
        tasks: [
          {
            id: 'd7-t1',
            text: 'Audit first week expenses against your total budget',
            tips: 'Keep transportation and daily groceries within a sustainable daily burn rate.'
          },
          {
            id: 'd7-t2',
            text: 'Schedule second week interviews and expand applications',
            tips: 'Consistency and fast response times are keys to landing an offer in Dubai.'
          }
        ]
      }
    ];
  }

  // Arabic Plan (Default)
  return [
    {
      dayNumber: 1,
      title: 'اليوم الأول: الوصول، شريحة الاتصال والمواصلات وتثبيت السكن',
      summary: 'الاستقرار الأولي، تشغيل خط الهاتف الإماراتي، استخراج بطاقة نول، والوصول الآمن للسكن.',
      tasks: [
        {
          id: 'd1-t1',
          text: 'استلام شريحة اتصال سياحية مجانية (du أو e&) عند ختم الجوازات بمطار دبي',
          tips: 'تُمنح مجاناً عند كاونتر الجوازات مع 1 جيجابايت إنترنت لتتمكن من تشغيل الخرائط والتواصل فور هبوطك.'
        },
        {
          id: 'd1-t2',
          text: 'شراء بطاقة نول الفضية (Nol Silver Card) من محطة المترو بالمطار',
          tips: 'سعرها 25 درهماً (منها 19 درهماً رصيد متاح). هي وسيلتك الأرخص والأسرع للتنقل في جميع خطوط المترو والحافلات والباصات المائية بدبي.'
        },
        {
          id: 'd1-t3',
          text: 'الذهاب إلى مكان السكن المؤقت ومعاينته قبل سداد باقي الإيجار',
          tips: housingTip
        },
        {
          id: 'd1-t4',
          text: 'تفعيل حساب الواتساب على رقم هاتفك الإماراتي الجديد (+971)',
          tips: nationalityTip || 'جميع الشركات وأصحاب العمل في دبي يفضلون التواصل عبر الاتصال المباشر أو الواتساب الإماراتي.'
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'اليوم الثاني: ضبط السيرة الذاتية بنظام الخليج وترتيب LinkedIn',
      summary: 'تحديث السيرة الذاتية وفق المعايير المعتمدة بدبي وإطلاق البحث الرقمي المركز.',
      tasks: [
        {
          id: 'd2-t1',
          text: 'تجهيز CV باللغة الإنجليزية في صفحة واحدة أو اثنتين بنسق واضح ومباشر',
          tips: 'اكتب في أعلى السيرة: رقم هاتفك الإماراتي (+971)، نوع التأشيرة (Visit Visa)، وتاريخ الجاهزية الفورية (Immediately Available).'
        },
        {
          id: 'd2-t2',
          text: 'تعديل الموقع الجغرافي على حساب LinkedIn إلى "Dubai, United Arab Emirates"',
          tips: 'فعّل خاصية "Open to Work" واجعلها تظهر لمسؤولي التوظيف فقط في منطقة الإمارات والخليج.'
        },
        {
          id: 'd2-t3',
          text: `البحث في إعلانات لينكدإن وبوابات الشركات لمهنة: ${professionTarget}`,
          tips: 'احرص على فرز الإعلانات حسب تاريخ النشر (آخر 24 ساعة) لتكون من أوائل المتقدمين.'
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'اليوم الثالث: استهداف مكاتب التوظيف المعتمدة والتقديم الرسمي',
      summary: 'التقديم المباشر في بوابات كبرى شركات التوظيف المرخصة دون دفع درهم واحد.',
      tasks: [
        {
          id: 'd3-t1',
          text: 'مراجعة مكاتب التوظيف الموثقة على DubaiStart (مثل Michael Page, TASC, Adecco, Ultimate HR)',
          tips: 'احذر: لا تدفع أي رسوم تسجيل أو فتح ملف. المكاتب النظامية لا تتقاضى أي مقابل من الباحث عن عمل.'
        },
        {
          id: 'd3-t2',
          text: 'إرسال السيرة الذاتية عبر المواقع الرسمية للوكالات مع رسالة تعريفية قصيرة ومهذبة',
          tips: 'حدد بوضوح المسمى الوظيفي المستهدف ومناطق تواجدك وسرعة استجابتك للمقابلات.'
        }
      ]
    },
    {
      dayNumber: 4,
      title: 'اليوم الرابع: النزول الميداني وتوزيع السير الذاتية في المناطق الحيوية',
      summary: 'التواجد على أرض الواقع في المراكز التجارية والصناعية المستهدفة.',
      tasks: [
        {
          id: 'd4-t1',
          text: 'طباعة 20 نسخة ورقية من السيرة الذاتية في مطابع ديرة أو بر دبي',
          tips: 'تكلفة طباعة الورقة تتراوح بين 0.5 إلى 1 درهم، والمطابع متوفرة بكثرة بالقرب من محطات المترو.'
        },
        {
          id: 'd4-t2',
          text: 'زيارة مجمعات الأعمال الميدانية حسب تخصصك',
          tips: 'إذا كنت في مجال المستودعات واللوجستيك (القوز، جبل علي، دبي الجنوب). إذا كنت في المبيعات والخدمات (الخليج التجاري، ديرة، مولات دبي).'
        }
      ]
    },
    {
      dayNumber: 5,
      title: 'اليوم الخامس: المتابعة المهنية وتوسيع شبكة المعارف (Follow-up)',
      summary: 'متابعة الشركات التي تقدمت إليها والتواصل مع مدراء الموارد البشرية.',
      tasks: [
        {
          id: 'd5-t1',
          text: 'إرسال رسائل متابعة مهنية لطيفة عبر LinkedIn لمسؤولي الموارد البشرية',
          tips: 'اكتب رسالة من سطرين توضح فيها شغفك واستعدادك للحضور لمقابلة في أي وقت هذا الأسبوع.'
        },
        {
          id: 'd5-t2',
          text: 'تنظيم جدول متابعة لجميع الوظائف التي تقدمت لها والملاحظات',
          tips: 'سجل اسم الشركة، التاريخ، والموقع حتى تكون مستعداً عند تلقي أي مكالمة غير متوقعة.'
        }
      ]
    },
    {
      dayNumber: 6,
      title: 'اليوم السادس: البحث عن السكن الشهري المستقر قرب المترو',
      summary: 'معاينة خيارات السكن الشهري والانتقال لتوفير تكاليف المواصلات والجهد.',
      tasks: [
        {
          id: 'd6-t1',
          text: 'زيارة 2 إلى 3 خيارات سكنية واقعية معروضة على قسم السكن في DubaiStart',
          tips: 'افحص بنفسك: التكييف، الهدوء، نظافة المرافق، شمول فواتير الكهرباء والمياه (DEWA) والإنترنت.'
        },
        {
          id: 'd6-t2',
          text: 'قياس المسافة مشياً على الأقدام إلى أقرب محطة مترو',
          tips: 'احرص أن تكون المسافة أقل من 7 دقائق مشياً لتجنب مصاريف التاكسي وضغط حرارة الجو صيفاً.'
        }
      ]
    },
    {
      dayNumber: 7,
      title: 'اليوم السابع: مراجعة الميزانية، تقييم الخيارات وترتيب الأسبوع الثاني',
      summary: 'حساب النفقات، تحديد المقابلات المتوقعة، وشحذ الهمة للأسبوع القادم.',
      tasks: [
        {
          id: 'd7-t1',
          text: 'جرد المصروفات للأسبوع الأول والتأكد من بقاء رصيدك المالي آمناً للشهر',
          tips: 'تناول وجباتك في السكن أو المطاعم الاقتصادية الشعبية يقلل نفقاتك بنسبة تفوق 60%.'
        },
        {
          id: 'd7-t2',
          text: 'مراجعة كافة الإعلانات والردود وتحديد مواعيد الأسبوع المقبل',
          tips: 'سوق دبي سريع ويتطلب مثابرة مستمرة وتحديثاً يومياً لطلباتك.'
        }
      ]
    }
  ];
}
