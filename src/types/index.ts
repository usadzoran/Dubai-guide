export type Language = 'ar' | 'en' | 'fr';

export type JobStatus = 'active' | 'check_status' | 'expired';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  employmentType: 'Full Time' | 'Part Time' | 'Contract';
  experience: 'Entry Level' | '1-2 years' | '3-5 years' | 'Experienced';
  salary?: string;
  source: string;
  sourceUrl: string;
  dateFound: string;
  status: JobStatus;
  description: string;
  requirements: string[];
  featured?: boolean;
}

export type HousingType = 'bed_space' | 'shared_room' | 'partition' | 'private_room' | 'studio';

export type VerificationStatus = 'verified' | 'check_before_payment' | 'suspicious';

export interface HousingListing {
  id: string;
  title: string;
  type: HousingType;
  price: number; // in AED
  area: string;
  address: string;
  nearMetro: boolean;
  metroStation?: string;
  metroWalkMinutes?: number;
  verificationStatus: VerificationStatus;
  verificationNote: string;
  billsIncluded: boolean;
  images: string[];
  contactPhone: string;
  whatsapp: string;
  amenities: string[];
  gender: 'men' | 'women' | 'any';
  description: string;
  datePosted: string;
}

export interface RecruitmentOffice {
  id: string;
  name: string;
  address: string;
  area: string;
  phone?: string;
  website: string;
  googleMapsUrl: string;
  category: string;
  specializations: string[];
  rating?: number;
  reviewsCount?: number;
  openingHours?: string;
  verificationLabel: string;
  notes?: string;
  coordinates: [number, number]; // [lat, lng]
}

export type PlaceCategory = 'all' | 'metro' | 'recruitment' | 'housing_hub' | 'government' | 'cheap_market' | 'service';

export interface MapPoint {
  id: string;
  name: string;
  nameEn?: string;
  type: 'job' | 'recruitment' | 'housing' | 'metro' | 'service' | 'government' | 'cheap_market' | 'housing_hub';
  category: string;
  coordinates: [number, number]; // [lat, lng]
  address: string;
  area?: string;
  metroStation?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  extraInfo?: string;
  description?: string;
  googleMapsUrl?: string;
}

export type MapPlace = MapPoint;

export interface SafetyTip {
  id: string;
  title: string;
  problem: string;
  whyDangerous: string;
  whatToDo: string;
  uaeLawReference: string;
  iconName: string;
}

export interface StarterPlanQuestionnaire {
  nationality: string;
  profession: string;
  budget: string;
  hasHousing: boolean;
  hasJobOffer: boolean;
  planLanguage: Language;
}

export interface DayPlan {
  dayNumber: number;
  title: string;
  summary: string;
  tasks: {
    id: string;
    text: string;
    tips: string;
    completed?: boolean;
    urgent?: boolean;
  }[];
}

export type ReportType = 'job' | 'housing' | 'recruitment' | 'scam_whatsapp' | 'fake_listing' | 'asking_fees' | 'expired' | 'other';

export interface UserReport {
  id: string;
  targetType: ReportType;
  targetId: string;
  targetTitle: string;
  reason: ReportType;
  details: string;
  contactEmail?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'dismissed';
}

export type AdPlacement = 'top_banner' | 'home_hero' | 'jobs_feed' | 'housing_feed' | 'floating_badge';

export interface AdItem {
  id: string;
  title: string;
  description: string;
  placement: AdPlacement;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  active: boolean;
  clicks: number;
  impressions: number;
  bgStyle?: 'gold' | 'emerald' | 'dark' | 'gradient';
  createdAt: string;
  adType?: 'standard' | 'html';
  htmlCode?: string;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  liveOnline: number;
  pageViews: {
    home: number;
    jobs: number;
    housing: number;
    recruitment: number;
    map: number;
    starterPlan: number;
    safety: number;
    algeriaGuide: number;
    more: number;
    admin: number;
  };
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  countryBreakdown: {
    country: string;
    code: string;
    percentage: number;
    count: number;
  }[];
  dailyHistory: {
    date: string;
    dayName: string;
    visits: number;
    unique: number;
  }[];
}

export interface ModeratorPermissions {
  manageJobs: boolean;
  manageHousing: boolean;
  manageOffices: boolean;
  manageAds: boolean;
  manageReports: boolean;
  viewAnalytics: boolean;
}

export interface Moderator {
  id: string;
  name: string;
  username: string;
  password: string;
  permissions: ModeratorPermissions;
  active: boolean;
  createdAt: string;
  lastLogin?: string;
  notes?: string;
}

export type AdminRole = 'super_admin' | 'moderator';

export interface AdminSession {
  role: AdminRole;
  moderatorId?: string;
  username: string;
  name: string;
  permissions: ModeratorPermissions;
}
