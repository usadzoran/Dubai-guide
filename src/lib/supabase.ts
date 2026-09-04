import { createClient } from '@supabase/supabase-js';
import { Job, HousingListing, RecruitmentOffice, UserReport, AdItem } from '../types';

export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://ozucwquzichilubjozuw.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dWN3cXV6aWNoaWx1YmpvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTQ3NTQsImV4cCI6MjEwNDA5MDc1NH0.CBVvkiJzsysSEAjRhYhn9vWl4eArcS7lMfB9vRstoWo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Test connectivity with Supabase
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const start = Date.now();
    // Test a basic query against supabase auth or general health
    const { error } = await supabase.from('jobs').select('count', { count: 'exact', head: true });
    const latency = Date.now() - start;

    if (error) {
      // If table doesn't exist yet (PGRST204 / 42P01), connection still works!
      if (error.code === '42P01' || error.message.includes('relation "public.jobs" does not exist')) {
        return { 
          success: true, 
          message: `متصل بـ Supabase بنجاح (${latency}ms) - الجداول بانتظار الإنشاء عبر سكربت SQL.` 
        };
      }
      return { success: false, message: `خطأ Supabase: ${error.message} (رمز: ${error.code || 'غير محدد'})` };
    }
    return { success: true, message: `متصل بقاعدة بيانات Supabase بنجاح (${latency}ms)` };
  } catch (err: any) {
    return { success: false, message: `تعذر الاتصال بـ Supabase: ${err?.message || 'خطأ في الشبكة'}` };
  }
}

// -------------------------------------------------------------
// JOBS
// -------------------------------------------------------------
export async function fetchJobsFromSupabase(): Promise<Job[] | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('date_found', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      category: row.category,
      employmentType: row.employment_type || 'Full Time',
      experience: row.experience || 'Entry Level',
      salary: row.salary,
      source: row.source || 'Direct',
      sourceUrl: row.source_url || '#',
      dateFound: row.date_found || new Date().toISOString().split('T')[0],
      status: row.status || 'active',
      description: row.description || '',
      requirements: Array.isArray(row.requirements) ? row.requirements : (row.requirements ? [row.requirements] : []),
      featured: Boolean(row.featured)
    }));
  } catch {
    return null;
  }
}

export async function upsertJobInSupabase(job: Job): Promise<boolean> {
  try {
    const { error } = await supabase.from('jobs').upsert({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      category: job.category,
      employment_type: job.employmentType,
      experience: job.experience,
      salary: job.salary,
      source: job.source,
      source_url: job.sourceUrl,
      date_found: job.dateFound,
      status: job.status,
      description: job.description,
      requirements: job.requirements,
      featured: job.featured || false
    });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteJobFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// HOUSING
// -------------------------------------------------------------
export async function fetchHousingFromSupabase(): Promise<HousingListing[] | null> {
  try {
    const { data, error } = await supabase
      .from('housing')
      .select('*')
      .order('date_posted', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      type: row.type,
      price: Number(row.price),
      area: row.area,
      address: row.address,
      nearMetro: Boolean(row.near_metro),
      metroStation: row.metro_station,
      metroWalkMinutes: row.metro_walk_minutes ? Number(row.metro_walk_minutes) : undefined,
      verificationStatus: row.verification_status || 'check_before_payment',
      verificationNote: row.verification_note || '',
      billsIncluded: Boolean(row.bills_included),
      images: Array.isArray(row.images) ? row.images : [],
      contactPhone: row.contact_phone || '',
      whatsapp: row.whatsapp || '',
      amenities: Array.isArray(row.amenities) ? row.amenities : [],
      gender: row.gender || 'any',
      description: row.description || '',
      datePosted: row.date_posted || new Date().toISOString().split('T')[0]
    }));
  } catch {
    return null;
  }
}

export async function upsertHousingInSupabase(h: HousingListing): Promise<boolean> {
  try {
    const { error } = await supabase.from('housing').upsert({
      id: h.id,
      title: h.title,
      type: h.type,
      price: h.price,
      area: h.area,
      address: h.address,
      near_metro: h.nearMetro,
      metro_station: h.metroStation,
      metro_walk_minutes: h.metroWalkMinutes,
      verification_status: h.verificationStatus,
      verification_note: h.verificationNote,
      bills_included: h.billsIncluded,
      images: h.images,
      contact_phone: h.contactPhone,
      whatsapp: h.whatsapp,
      amenities: h.amenities,
      gender: h.gender,
      description: h.description,
      date_posted: h.datePosted
    });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteHousingFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('housing').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// RECRUITMENT OFFICES
// -------------------------------------------------------------
export async function fetchOfficesFromSupabase(): Promise<RecruitmentOffice[] | null> {
  try {
    const { data, error } = await supabase.from('recruitment_offices').select('*');
    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      area: row.area,
      phone: row.phone,
      website: row.website,
      googleMapsUrl: row.google_maps_url,
      category: row.category,
      specializations: Array.isArray(row.specializations) ? row.specializations : [],
      rating: row.rating ? Number(row.rating) : undefined,
      reviewsCount: row.reviews_count ? Number(row.reviews_count) : undefined,
      openingHours: row.opening_hours,
      verificationLabel: row.verification_label || 'معتمد رسمياً',
      notes: row.notes,
      coordinates: Array.isArray(row.coordinates) ? [row.coordinates[0], row.coordinates[1]] : [25.2048, 55.2708]
    }));
  } catch {
    return null;
  }
}

export async function upsertOfficeInSupabase(o: RecruitmentOffice): Promise<boolean> {
  try {
    const { error } = await supabase.from('recruitment_offices').upsert({
      id: o.id,
      name: o.name,
      address: o.address,
      area: o.area,
      phone: o.phone,
      website: o.website,
      google_maps_url: o.googleMapsUrl,
      category: o.category,
      specializations: o.specializations,
      rating: o.rating,
      reviews_count: o.reviewsCount,
      opening_hours: o.openingHours,
      verification_label: o.verificationLabel,
      notes: o.notes,
      coordinates: o.coordinates
    });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteOfficeFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('recruitment_offices').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// ADS
// -------------------------------------------------------------
export async function fetchAdsFromSupabase(): Promise<AdItem[] | null> {
  try {
    const { data, error } = await supabase
      .from('ads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      placement: row.placement,
      imageUrl: row.image_url,
      ctaText: row.cta_text,
      ctaLink: row.cta_link,
      badge: row.badge,
      active: Boolean(row.active),
      clicks: Number(row.clicks || 0),
      impressions: Number(row.impressions || 0),
      bgStyle: row.bg_style || 'dark',
      createdAt: row.created_at || new Date().toISOString()
    }));
  } catch {
    return null;
  }
}

export async function upsertAdInSupabase(ad: AdItem): Promise<boolean> {
  try {
    const { error } = await supabase.from('ads').upsert({
      id: ad.id,
      title: ad.title,
      description: ad.description,
      placement: ad.placement,
      image_url: ad.imageUrl,
      cta_text: ad.ctaText,
      cta_link: ad.ctaLink,
      badge: ad.badge,
      active: ad.active,
      clicks: ad.clicks,
      impressions: ad.impressions,
      bg_style: ad.bgStyle,
      created_at: ad.createdAt
    });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteAdFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('ads').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function incrementAdStatsInSupabase(id: string, type: 'impression' | 'click'): Promise<void> {
  try {
    if (type === 'click') {
      await supabase.rpc('increment_ad_clicks', { ad_id: id });
    } else {
      await supabase.rpc('increment_ad_impressions', { ad_id: id });
    }
  } catch {
    // Ignore RPC failure if procedure not created
  }
}

// -------------------------------------------------------------
// USER REPORTS
// -------------------------------------------------------------
export async function fetchReportsFromSupabase(): Promise<UserReport[] | null> {
  try {
    const { data, error } = await supabase
      .from('user_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      targetType: row.target_type,
      targetId: row.target_id,
      targetTitle: row.target_title,
      reason: row.reason,
      details: row.details,
      contactEmail: row.contact_email,
      createdAt: row.created_at,
      status: row.status || 'new'
    }));
  } catch {
    return null;
  }
}

export async function insertReportInSupabase(report: UserReport): Promise<boolean> {
  try {
    const { error } = await supabase.from('user_reports').insert({
      id: report.id,
      target_type: report.targetType,
      target_id: report.targetId,
      target_title: report.targetTitle,
      reason: report.reason,
      details: report.details,
      contact_email: report.contactEmail,
      status: report.status,
      created_at: report.createdAt
    });
    return !error;
  } catch {
    return false;
  }
}

export async function updateReportStatusInSupabase(id: string, status: 'new' | 'reviewed' | 'dismissed'): Promise<boolean> {
  try {
    const { error } = await supabase.from('user_reports').update({ status }).eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// READY SQL SCRIPT FOR SUPABASE SQL EDITOR
// -------------------------------------------------------------
export const SUPABASE_SQL_SCHEMA = `-- ========================================================
-- دبي ستارت - سكيما قاعدة بيانات Supabase الرسمية
-- انسخ هذا الكود والصقه في نافذة SQL Editor في لوحة تحكم Supabase
-- ثم اضغط RUN
-- ========================================================

-- 1. جدول الوظائف (Jobs)
CREATE TABLE IF NOT EXISTS public.jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Full Time',
    experience TEXT DEFAULT 'Entry Level',
    salary TEXT,
    source TEXT DEFAULT 'Direct',
    source_url TEXT DEFAULT '#',
    date_found DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active',
    description TEXT DEFAULT '',
    requirements JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. جدول السكن (Housing)
CREATE TABLE IF NOT EXISTS public.housing (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    price NUMERIC NOT NULL,
    area TEXT NOT NULL,
    address TEXT NOT NULL,
    near_metro BOOLEAN DEFAULT FALSE,
    metro_station TEXT,
    metro_walk_minutes INTEGER,
    verification_status TEXT DEFAULT 'check_before_payment',
    verification_note TEXT DEFAULT '',
    bills_included BOOLEAN DEFAULT TRUE,
    images JSONB DEFAULT '[]'::jsonb,
    contact_phone TEXT,
    whatsapp TEXT,
    amenities JSONB DEFAULT '[]'::jsonb,
    gender TEXT DEFAULT 'any',
    description TEXT DEFAULT '',
    date_posted DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. جدول مكاتب التوظيف المعتمدة (Recruitment Offices)
CREATE TABLE IF NOT EXISTS public.recruitment_offices (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    area TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    google_maps_url TEXT,
    category TEXT NOT NULL,
    specializations JSONB DEFAULT '[]'::jsonb,
    rating NUMERIC DEFAULT 4.5,
    reviews_count INTEGER DEFAULT 0,
    opening_hours TEXT,
    verification_label TEXT DEFAULT 'معتمد رسمياً',
    notes TEXT,
    coordinates JSONB DEFAULT '[25.2048, 55.2708]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. جدول الإعلانات (Ads)
CREATE TABLE IF NOT EXISTS public.ads (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    placement TEXT NOT NULL,
    image_url TEXT,
    cta_text TEXT NOT NULL,
    cta_link TEXT NOT NULL,
    badge TEXT,
    active BOOLEAN DEFAULT TRUE,
    clicks INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    bg_style TEXT DEFAULT 'dark',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. جدول بلاغات الاحتيال (User Reports)
CREATE TABLE IF NOT EXISTS public.user_reports (
    id TEXT PRIMARY KEY,
    target_type TEXT NOT NULL,
    target_id TEXT NOT NULL,
    target_title TEXT NOT NULL,
    reason TEXT NOT NULL,
    details TEXT NOT NULL,
    contact_email TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. تفعيل الحماية RLS وسياسات القراءة والكتابة العامة
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.housing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow public write access on jobs" ON public.jobs FOR ALL USING (true);

CREATE POLICY "Allow public read access on housing" ON public.housing FOR SELECT USING (true);
CREATE POLICY "Allow public write access on housing" ON public.housing FOR ALL USING (true);

CREATE POLICY "Allow public read access on recruitment_offices" ON public.recruitment_offices FOR SELECT USING (true);
CREATE POLICY "Allow public write access on recruitment_offices" ON public.recruitment_offices FOR ALL USING (true);

CREATE POLICY "Allow public read access on ads" ON public.ads FOR SELECT USING (true);
CREATE POLICY "Allow public write access on ads" ON public.ads FOR ALL USING (true);

CREATE POLICY "Allow public read access on user_reports" ON public.user_reports FOR SELECT USING (true);
CREATE POLICY "Allow public write access on user_reports" ON public.user_reports FOR ALL USING (true);
`;
