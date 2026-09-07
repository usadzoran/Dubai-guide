import { createClient } from '@supabase/supabase-js';
import { Job, HousingListing, RecruitmentOffice, UserReport, AdItem, Moderator } from '../types';

export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://ozucwquzichilubjozuw.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dWN3cXV6aWNoaWx1YmpvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MTQ3NTQsImV4cCI6MjEwNDA5MDc1NH0.CBVvkiJzsysSEAjRhYhn9vWl4eArcS7lMfB9vRstoWo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Row to Model Mappers
 */
export function mapJobRow(row: any): Job {
  return {
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
  };
}

export function mapHousingRow(row: any): HousingListing {
  return {
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
  };
}

export function mapOfficeRow(row: any): RecruitmentOffice {
  return {
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
  };
}

// Storage key for client-side HTML ads cache
const ADS_HTML_CACHE_KEY = 'dubai_start_ads_html_cache';

export function getCachedAdHtml(id: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = localStorage.getItem(ADS_HTML_CACHE_KEY);
    if (!raw) return undefined;
    const cache = JSON.parse(raw);
    return cache[id] || undefined;
  } catch {
    return undefined;
  }
}

export function setCachedAdHtml(id: string, htmlCode: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(ADS_HTML_CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    cache[id] = htmlCode;
    localStorage.setItem(ADS_HTML_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage errors
  }
}

export function mapAdRow(row: any): AdItem {
  let htmlCode: string | undefined = row.html_code || undefined;
  let rawDesc: string = row.description || '';
  let isHtml = row.ad_type === 'html' || Boolean(htmlCode);
  let cleanDesc = rawDesc;

  // 1. Detect HTML code embedded in description with <!--HTML_AD--> marker
  if (rawDesc.startsWith('<!--HTML_AD-->')) {
    htmlCode = rawDesc.substring('<!--HTML_AD-->'.length).trim();
    isHtml = true;
    cleanDesc = 'إعلان مخصص بكود HTML';
  } else if (!htmlCode && (
    rawDesc.includes('<div') || 
    rawDesc.includes('<script') || 
    rawDesc.includes('<iframe') || 
    rawDesc.includes('<ins ') || 
    rawDesc.includes('<a ')
  )) {
    // Description itself is raw HTML code
    htmlCode = rawDesc.trim();
    isHtml = true;
    cleanDesc = 'إعلان مخصص بكود HTML';
  }

  // 2. Check client-side HTML cache by ID if still undefined
  if (!htmlCode && row.id) {
    const cached = getCachedAdHtml(row.id);
    if (cached) {
      htmlCode = cached;
      isHtml = true;
    }
  }

  // 3. If ad is explicitly HTML or titled as HTML ad but htmlCode is empty, synthesize a functional HTML banner
  if (isHtml && !htmlCode) {
    const fallbackTitle = row.title || 'إعلان ترويجي مميز';
    const fallbackCta = row.cta_text || 'تواصل عبر واتساب';
    const fallbackLink = row.cta_link || 'https://wa.me/971501234567';
    htmlCode = `<div style="background: linear-gradient(135deg, #090d16 0%, #1e293b 100%); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 16px; padding: 16px; color: #fff; direction: rtl; text-align: right; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px;">⭐</div>
          <div>
            <div style="font-size: 11px; color: #fbbf24; font-weight: 800;">${row.badge || 'إعلان معتمد'}</div>
            <h4 style="margin: 2px 0; font-size: 15px; font-weight: 800; color: #fff;">${fallbackTitle}</h4>
            <p style="margin: 0; font-size: 12px; color: #cbd5e1;">${cleanDesc !== 'إعلان مخصص بكود HTML' ? cleanDesc : 'تواصل مع المعلن مباشرة للحصول على التفاصيل والعروض الخاصة.'}</p>
          </div>
        </div>
        <a href="${fallbackLink}" target="_blank" rel="noopener noreferrer" style="background: #fbbf24; color: #020617; padding: 8px 16px; border-radius: 10px; text-decoration: none; font-size: 12px; font-weight: 900; display: inline-flex; align-items: center; gap: 6px;">
          <span>${fallbackCta}</span> 💬
        </a>
      </div>
    </div>`;
  }

  // Update client cache if we have code
  if (htmlCode && row.id) {
    setCachedAdHtml(row.id, htmlCode);
  }

  return {
    id: row.id,
    title: row.title || (isHtml ? 'إعلان كود HTML' : 'إعلان بدون عنوان'),
    description: cleanDesc,
    placement: row.placement,
    imageUrl: row.image_url,
    ctaText: row.cta_text || 'تفاصيل الإعلان',
    ctaLink: row.cta_link || '#',
    badge: row.badge,
    active: row.active === undefined ? true : Boolean(row.active),
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    bgStyle: row.bg_style || 'dark',
    adType: isHtml ? 'html' : (row.ad_type || 'standard'),
    htmlCode: htmlCode,
    createdAt: row.created_at || new Date().toISOString()
  };
}

export function mapReportRow(row: any): UserReport {
  return {
    id: row.id,
    targetType: row.target_type,
    targetId: row.target_id,
    targetTitle: row.target_title,
    reason: row.reason,
    details: row.details,
    contactEmail: row.contact_email,
    createdAt: row.created_at,
    status: row.status || 'new'
  };
}

export function mapModeratorRow(row: any): Moderator {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    password: row.password,
    permissions: typeof row.permissions === 'object' && row.permissions !== null
      ? row.permissions
      : {
          manageJobs: true,
          manageHousing: true,
          manageOffices: true,
          manageAds: false,
          manageReports: true,
          viewAnalytics: false
        },
    active: Boolean(row.active),
    createdAt: row.created_at || new Date().toISOString(),
    lastLogin: row.last_login,
    notes: row.notes
  };
}

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
      phone: o.phone || null,
      website: o.website || null,
      google_maps_url: o.googleMapsUrl || null,
      category: o.category || 'Recruitment Agency',
      specializations: o.specializations || [],
      rating: o.rating || 4.5,
      reviews_count: o.reviewsCount || 0,
      opening_hours: o.openingHours || null,
      verification_label: o.verificationLabel || 'معتمد رسمي',
      notes: o.notes || null,
      coordinates: o.coordinates || [25.2048, 55.2708]
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

    return data.map(mapAdRow);
  } catch {
    return null;
  }
}

export async function upsertAdInSupabase(ad: AdItem): Promise<boolean> {
  try {
    const isHtml = ad.adType === 'html' || Boolean(ad.htmlCode?.trim());
    const finalHtml = ad.htmlCode?.trim();

    // Cache locally
    if (finalHtml && ad.id) {
      setCachedAdHtml(ad.id, finalHtml);
    }

    // Embed HTML in description using <!--HTML_AD--> prefix so it persists in Supabase TEXT column
    const encodedDescription = (isHtml && finalHtml)
      ? `<!--HTML_AD-->${finalHtml}`
      : (ad.description || '');

    const fullPayload: Record<string, any> = {
      id: ad.id,
      title: ad.title || (isHtml ? 'إعلان كود HTML مخصص' : 'إعلان ترويجي'),
      description: encodedDescription,
      placement: ad.placement,
      image_url: ad.imageUrl || null,
      cta_text: ad.ctaText || 'تفاصيل الإعلان',
      cta_link: ad.ctaLink || '#',
      badge: ad.badge || null,
      active: ad.active === undefined ? true : ad.active,
      clicks: ad.clicks || 0,
      impressions: ad.impressions || 0,
      bg_style: ad.bgStyle || 'gold',
      ad_type: isHtml ? 'html' : (ad.adType || 'standard'),
      html_code: finalHtml || null,
      created_at: ad.createdAt || new Date().toISOString()
    };

    const { error } = await supabase.from('ads').upsert(fullPayload);

    // If schema cache does not have ad_type / html_code yet, fallback to core columns
    // The HTML code is still safely persisted inside encodedDescription!
    if (error && (error.code === 'PGRST204' || error.message?.includes('ad_type') || error.message?.includes('html_code'))) {
      const { ad_type, html_code, ...corePayload } = fullPayload;
      const fallbackResult = await supabase.from('ads').upsert(corePayload);
      return !fallbackResult.error;
    }

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

export async function updateReportStatusInSupabase(id: string, status: 'new' | 'reviewed' | 'accepted' | 'dismissed'): Promise<boolean> {
  try {
    const { error } = await supabase.from('user_reports').update({ status }).eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

export async function deleteReportFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('user_reports').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// MODERATORS (Supabase Integration)
// -------------------------------------------------------------
export async function fetchModeratorsFromSupabase(): Promise<Moderator[] | null> {
  try {
    const { data, error } = await supabase
      .from('moderators')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data.map(mapModeratorRow);
  } catch {
    return null;
  }
}

export async function upsertModeratorInSupabase(mod: Moderator): Promise<boolean> {
  try {
    const { error } = await supabase.from('moderators').upsert({
      id: mod.id,
      name: mod.name,
      username: mod.username,
      password: mod.password,
      permissions: mod.permissions,
      active: mod.active,
      notes: mod.notes || '',
      last_login: mod.lastLogin || null,
      created_at: mod.createdAt
    });
    return !error;
  } catch {
    return false;
  }
}

export async function deleteModeratorFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('moderators').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// SUPABASE REALTIME SUBSCRIPTIONS
// -------------------------------------------------------------
export interface RealtimeHandlers {
  onJobInsert?: (job: Job) => void;
  onJobUpdate?: (job: Job) => void;
  onJobDelete?: (id: string) => void;

  onHousingInsert?: (housing: HousingListing) => void;
  onHousingUpdate?: (housing: HousingListing) => void;
  onHousingDelete?: (id: string) => void;

  onOfficeInsert?: (office: RecruitmentOffice) => void;
  onOfficeUpdate?: (office: RecruitmentOffice) => void;
  onOfficeDelete?: (id: string) => void;

  onAdInsert?: (ad: AdItem) => void;
  onAdUpdate?: (ad: AdItem) => void;
  onAdDelete?: (id: string) => void;

  onReportInsert?: (report: UserReport) => void;
  onReportUpdate?: (report: UserReport) => void;
  onReportDelete?: (id: string) => void;

  onModeratorInsert?: (mod: Moderator) => void;
  onModeratorUpdate?: (mod: Moderator) => void;
  onModeratorDelete?: (id: string) => void;

  onStatusChange?: (status: 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR') => void;
}

export function subscribeToSupabaseRealtime(handlers: RealtimeHandlers): () => void {
  handlers.onStatusChange?.('CONNECTING');

  const channel = supabase.channel('dubai_start_realtime_channel', {
    config: {
      broadcast: { self: true }
    }
  });

  // 1. Jobs Realtime Listener
  channel.on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'jobs' },
    (payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        handlers.onJobInsert?.(mapJobRow(payload.new));
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        handlers.onJobUpdate?.(mapJobRow(payload.new));
      } else if (payload.eventType === 'DELETE' && payload.old?.id) {
        handlers.onJobDelete?.(payload.old.id);
      }
    }
  );

  // 2. Housing Realtime Listener
  channel.on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'housing' },
    (payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        handlers.onHousingInsert?.(mapHousingRow(payload.new));
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        handlers.onHousingUpdate?.(mapHousingRow(payload.new));
      } else if (payload.eventType === 'DELETE' && payload.old?.id) {
        handlers.onHousingDelete?.(payload.old.id);
      }
    }
  );

  // 3. Recruitment Offices Realtime Listener
  channel.on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'recruitment_offices' },
    (payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        handlers.onOfficeInsert?.(mapOfficeRow(payload.new));
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        handlers.onOfficeUpdate?.(mapOfficeRow(payload.new));
      } else if (payload.eventType === 'DELETE' && payload.old?.id) {
        handlers.onOfficeDelete?.(payload.old.id);
      }
    }
  );

  // 4. Ads Realtime Listener
  channel.on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'ads' },
    (payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        handlers.onAdInsert?.(mapAdRow(payload.new));
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        handlers.onAdUpdate?.(mapAdRow(payload.new));
      } else if (payload.eventType === 'DELETE' && payload.old?.id) {
        handlers.onAdDelete?.(payload.old.id);
      }
    }
  );

  // 5. User Reports Realtime Listener
  channel.on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'user_reports' },
    (payload) => {
      if (payload.eventType === 'INSERT' && payload.new) {
        handlers.onReportInsert?.(mapReportRow(payload.new));
      } else if (payload.eventType === 'UPDATE' && payload.new) {
        handlers.onReportUpdate?.(mapReportRow(payload.new));
      } else if (payload.eventType === 'DELETE' && payload.old?.id) {
        handlers.onReportDelete?.(payload.old.id);
      }
    }
  );

  channel.subscribe((status, err) => {
    if (status === 'SUBSCRIBED') {
      handlers.onStatusChange?.('CONNECTED');
    } else if (status === 'CLOSED' || status === 'TIMED_OUT') {
      handlers.onStatusChange?.('DISCONNECTED');
    } else if (status === 'CHANNEL_ERROR') {
      console.warn('Supabase Realtime Channel Error:', err);
      handlers.onStatusChange?.('ERROR');
    }
  });

  return () => {
    supabase.removeChannel(channel);
  };
}

// -------------------------------------------------------------
// READY SQL SCRIPT FOR SUPABASE SQL EDITOR
// -------------------------------------------------------------
export const SUPABASE_SQL_SCHEMA = `-- ========================================================
-- دبي ستارت - سكيما قاعدة بيانات Supabase الرسمية (مع تفعيل التزامن اللحظي Realtime)
-- انسخ هذا الكود والصقه بالكامل في نافذة SQL Editor في لوحة تحكم Supabase
-- ثم اضغط RUN لتجهيز الجداول وسياسات الحماية وتفعيل التزامن اللحظي
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
    description TEXT DEFAULT '',
    placement TEXT NOT NULL,
    image_url TEXT,
    cta_text TEXT DEFAULT '',
    cta_link TEXT DEFAULT '',
    badge TEXT,
    active BOOLEAN DEFAULT TRUE,
    clicks INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    bg_style TEXT DEFAULT 'dark',
    ad_type TEXT DEFAULT 'standard',
    html_code TEXT,
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

-- 6. جدول المشرفين (Moderators)
CREATE TABLE IF NOT EXISTS public.moderators (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    permissions JSONB DEFAULT '{"manageJobs":true,"manageHousing":true,"manageOffices":true,"manageAds":false,"manageReports":true,"viewAnalytics":false}'::jsonb,
    active BOOLEAN DEFAULT TRUE,
    notes TEXT DEFAULT '',
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. إضافة الأعمدة الإضافية لجدول الإعلانات (ads) إذا لم تكن موجودة
ALTER TABLE public.ads ADD COLUMN IF NOT EXISTS ad_type TEXT DEFAULT 'standard';
ALTER TABLE public.ads ADD COLUMN IF NOT EXISTS html_code TEXT;

-- 7. تفعيل REPLICA IDENTITY FULL للجداول الخمسة الموجودة فعلياً
ALTER TABLE public.jobs REPLICA IDENTITY FULL;
ALTER TABLE public.housing REPLICA IDENTITY FULL;
ALTER TABLE public.recruitment_offices REPLICA IDENTITY FULL;
ALTER TABLE public.ads REPLICA IDENTITY FULL;
ALTER TABLE public.user_reports REPLICA IDENTITY FULL;

-- 8. تفعيل الحماية RLS وسياسات الوصول العامة للجداول الـ 5
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.housing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitment_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Allow public read access on jobs') THEN
    CREATE POLICY "Allow public read access on jobs" ON public.jobs FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'jobs' AND policyname = 'Allow public write access on jobs') THEN
    CREATE POLICY "Allow public write access on jobs" ON public.jobs FOR ALL USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'housing' AND policyname = 'Allow public read access on housing') THEN
    CREATE POLICY "Allow public read access on housing" ON public.housing FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'housing' AND policyname = 'Allow public write access on housing') THEN
    CREATE POLICY "Allow public write access on housing" ON public.housing FOR ALL USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'recruitment_offices' AND policyname = 'Allow public read access on recruitment_offices') THEN
    CREATE POLICY "Allow public read access on recruitment_offices" ON public.recruitment_offices FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'recruitment_offices' AND policyname = 'Allow public write access on recruitment_offices') THEN
    CREATE POLICY "Allow public write access on recruitment_offices" ON public.recruitment_offices FOR ALL USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ads' AND policyname = 'Allow public read access on ads') THEN
    CREATE POLICY "Allow public read access on ads" ON public.ads FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'ads' AND policyname = 'Allow public write access on ads') THEN
    CREATE POLICY "Allow public write access on ads" ON public.ads FOR ALL USING (true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_reports' AND policyname = 'Allow public read access on user_reports') THEN
    CREATE POLICY "Allow public read access on user_reports" ON public.user_reports FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_reports' AND policyname = 'Allow public write access on user_reports') THEN
    CREATE POLICY "Allow public write access on user_reports" ON public.user_reports FOR ALL USING (true);
  END IF;
END $$;

-- 9. تفعيل خاصية التزامن اللحظي (Supabase Realtime Publication) للجداول الـ 5 فقط
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.jobs;
  EXCEPTION WHEN duplicate_object THEN NULL; WHEN others THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.housing;
  EXCEPTION WHEN duplicate_object THEN NULL; WHEN others THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.recruitment_offices;
  EXCEPTION WHEN duplicate_object THEN NULL; WHEN others THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.ads;
  EXCEPTION WHEN duplicate_object THEN NULL; WHEN others THEN NULL;
  END;

  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.user_reports;
  EXCEPTION WHEN duplicate_object THEN NULL; WHEN others THEN NULL;
  END;
END $$;
`;
