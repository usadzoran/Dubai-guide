import { TRANSLATIONS as BASE_TRANSLATIONS, Translations } from './i18n';

export interface ExtendedTranslations extends Translations {
  navHome: string;
  navJobs: string;
  navHousing: string;
  navRecruitment: string;
  navMap: string;
  navSafety: string;
  navPlan: string;
  navMore: string;
  navAdmin: string;
}

export const TRANSLATIONS: Record<'ar' | 'en' | 'fr', ExtendedTranslations> = {
  ar: {
    ...BASE_TRANSLATIONS.ar,
    navHome: 'الرئيسية',
    navJobs: 'الوظائف',
    navHousing: 'السكن',
    navRecruitment: 'مكاتب التوظيف',
    navMap: 'الخريطة',
    navSafety: 'تجنب الاحتيال',
    navPlan: 'خطة أول أسبوع',
    navMore: 'المزيد والأدوات',
    navAdmin: 'لوحة التحكم'
  },
  en: {
    ...BASE_TRANSLATIONS.en,
    navHome: 'Home',
    navJobs: 'Jobs',
    navHousing: 'Housing',
    navRecruitment: 'Agencies',
    navMap: 'Map',
    navSafety: 'Safety',
    navPlan: 'First Week',
    navMore: 'More Tools',
    navAdmin: 'Admin'
  },
  fr: {
    ...BASE_TRANSLATIONS.fr,
    navHome: 'Accueil',
    navJobs: 'Emplois',
    navHousing: 'Logement',
    navRecruitment: 'Agences',
    navMap: 'Carte',
    navSafety: 'Sécurité',
    navPlan: '1ère Semaine',
    navMore: 'Plus d’outils',
    navAdmin: 'Admin'
  }
};
