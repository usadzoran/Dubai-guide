import { RecruitmentOffice } from '../types';

export const INITIAL_RECRUITMENT_OFFICES: RecruitmentOffice[] = [
  {
    id: 'office-1',
    name: 'Michael Page Middle East',
    address: 'Office No. 202, Al Fattan Currency House Tower 1, DIFC',
    area: 'DIFC / Sheikh Zayed Road',
    phone: '+971 4 709 0300',
    website: 'https://www.michaelpage.ae/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Michael+Page+Middle+East+DIFC+Dubai',
    category: 'Recruitment Agency',
    specializations: [
      'Banking',
      'Digital & Technology',
      'Engineering',
      'Finance & Accounting',
      'Healthcare',
      'Supply Chain & Logistics',
      'Sales & Marketing'
    ],
    rating: 4.4,
    reviewsCount: 310,
    openingHours: 'الأحد - الخميس: 8:30 ص - 6:00 م',
    verificationLabel: 'معلومات الشركة متاحة ومسجلة رسمياً',
    notes: 'واحدة من كبرى شركات التوظيف الدولية في دبي. لا تتقاضى أي رسوم تسجيل أو تقديم من المرشحين إطلاقاً.',
    coordinates: [25.2114, 55.2818]
  },
  {
    id: 'office-2',
    name: 'TASC Outsourcing',
    address: '24th Floor, Nassima Tower, Sheikh Zayed Road',
    area: 'Sheikh Zayed Road',
    phone: '+971 4 358 8500',
    website: 'https://tascoutsourcing.com/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=TASC+Outsourcing+Nassima+Tower+Dubai',
    category: 'Recruitment & Staffing Outsourcing',
    specializations: [
      'IT & Tech Support',
      'Retail & Customer Care',
      'Logistics & Warehousing',
      'Oil & Gas',
      'Administrative Support'
    ],
    rating: 4.2,
    reviewsCount: 450,
    openingHours: 'الأحد - الخميس: 8:00 ص - 5:30 م',
    verificationLabel: 'تم التحقق من بيانات الموقع والترخيص التجاري',
    notes: 'شركة توظيف وتعهيد عمالة كبرى في الإمارات وتوفر وظائف تعاقدية ودائمة.',
    coordinates: [25.2215, 55.2812]
  },
  {
    id: 'office-3',
    name: 'Ultimate HR Solutions',
    address: '201, 2nd Floor, Hilal Bank Building, Al Qusais / Business Bay Office',
    area: 'Business Bay / Al Qusais',
    phone: '+971 4 343 0888',
    website: 'https://uhrsolutions.com/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ultimate+HR+Solutions+Dubai',
    category: 'HR Consultancy & Recruitment',
    specializations: [
      'Banking Sales',
      'Drivers & Couriers',
      'Hospitality & Catering',
      'Customer Service',
      'Field Operations'
    ],
    rating: 4.0,
    reviewsCount: 620,
    openingHours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    verificationLabel: 'معلومات الشركة متاحة رسمياً في دبي',
    notes: 'تختص بالتوظيف الميداني ومبيعات البنوك والضيافة والتوزيع. تنبيه: لا تدفع أي رسوم لفتح ملف.',
    coordinates: [25.1867, 55.2644]
  },
  {
    id: 'office-4',
    name: 'Nathan & Nathan Human Resource Solutions',
    address: 'Office 1401, Marina Plaza, Dubai Marina',
    area: 'Dubai Marina',
    phone: '+971 4 447 2060',
    website: 'https://nathanhr.ae/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nathan+and+Nathan+Marina+Plaza+Dubai',
    category: 'Recruitment & HR Outsourcing',
    specializations: [
      'Human Resources',
      'Accounting & Finance',
      'Corporate Services',
      'Legal & Compliance',
      'Operations'
    ],
    rating: 4.3,
    reviewsCount: 190,
    openingHours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    verificationLabel: 'تم التحقق من بيانات الموقع',
    notes: 'مرخصة من دائرة الاقتصاد والسياحة وتدير شؤون موظفين لشركات متعددة في دبي وأبوظبي.',
    coordinates: [25.0772, 55.1403]
  },
  {
    id: 'office-5',
    name: 'Caliberly HR Services',
    address: 'Sheikh Zayed Road, Trade Centre Area',
    area: 'Sheikh Zayed Road',
    phone: '+971 4 329 1100',
    website: 'https://caliberly.com/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caliberly+Dubai+Sheikh+Zayed+Road',
    category: 'Executive Search & Talent Acquisition',
    specializations: [
      'Logistics & Supply Chain',
      'Construction & Contracting',
      'Sales Management',
      'Procurement'
    ],
    rating: 4.1,
    reviewsCount: 95,
    openingHours: 'الأحد - الخميس: 9:00 ص - 5:30 م',
    verificationLabel: 'معلومات الشركة متاحة',
    notes: 'تساعد الباحثين عن عمل من خلال منصتها وقنوات لينكدإن الرسمية دون وسيط غير مرخص.',
    coordinates: [25.2285, 55.2891]
  },
  {
    id: 'office-6',
    name: 'CareerLink HR Consultancy',
    address: 'Dubai Silicon Oasis, SIT Tower',
    area: 'Dubai Silicon Oasis',
    phone: '+971 4 392 5522',
    website: 'https://careerlinkhr.com/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=CareerLink+HR+Dubai+Silicon+Oasis',
    category: 'Recruitment & Career Consultancy',
    specializations: [
      'Technology & Telecom',
      'Customer Support',
      'Administrative Roles',
      'Supply Chain Support'
    ],
    rating: 4.0,
    reviewsCount: 140,
    openingHours: 'الأحد - الخميس: 9:00 ص - 6:00 م',
    verificationLabel: 'تم التحقق من بيانات الموقع',
    notes: 'تركز على الشركات في واحة دبي للسيليكون والمناطق الحرة المجاورة.',
    coordinates: [25.1228, 55.3789]
  },
  {
    id: 'office-7',
    name: 'Adecco Middle East',
    address: 'Office 701, Al Saada Tower, Business Bay',
    area: 'Business Bay',
    phone: '+971 4 368 7900',
    website: 'https://adeccome.com/',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Adecco+Middle+East+Dubai',
    category: 'Global Staffing Leader',
    specializations: [
      'Corporate Roles',
      'Hospitality',
      'Engineering',
      'Customer Service',
      'Manufacturing & Warehousing'
    ],
    rating: 4.3,
    reviewsCount: 380,
    openingHours: 'الأحد - الخميس: 8:30 ص - 5:30 م',
    verificationLabel: 'شركة عالمية معتمدة ومسجلة في الإمارات',
    notes: 'فرع لمجموعة Adecco السويسرية العالمية. لا تتقاضى أي مبالغ من طالبي الوظائف.',
    coordinates: [25.1912, 55.2755]
  }
];
