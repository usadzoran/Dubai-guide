/**
 * Utility to sanitize user-facing errors.
 * Ensures that no technical details, database names, SQL, Supabase, or stack traces
 * are ever displayed to website visitors.
 */

export function getFriendlyErrorMessage(err: unknown, fallback: string = 'حدث خطأ مؤقت. يرجى المحاولة مرة أخرى.'): string {
  if (!err) return fallback;

  const raw = typeof err === 'string' ? err : (err as any)?.message || String(err);
  const lower = raw.toLowerCase();

  const technicalKeywords = [
    'supabase',
    'postgres',
    'postgrest',
    'sql',
    'relation',
    'column',
    'table',
    'jwt',
    'rls',
    'row level security',
    'pgrst',
    '42p01',
    'permission denied',
    'syntax error',
    'select',
    'insert',
    'upsert',
    'delete',
    'fetch error',
    'failed to fetch',
    'networkerror',
    'stack trace',
    'http 500',
    '500',
    '502',
    '503',
    'database error',
    'service_role',
    'anon key',
    'schema',
    'auth/invalid',
    'graphql'
  ];

  const hasTechnicalKeyword = technicalKeywords.some(keyword => lower.includes(keyword));

  if (hasTechnicalKeyword) {
    if (lower.includes('fetch') || lower.includes('network') || lower.includes('timeout') || lower.includes('connection')) {
      return 'تعذر تحميل البيانات حالياً. يرجى التحقق من اتصال الإنترنت والمحاولة لاحقاً.';
    }
    return fallback;
  }

  // If it's already an Arabic friendly message with reasonable length and no technical leak
  if (/[\u0600-\u06FF]/.test(raw) && raw.length < 150) {
    return raw;
  }

  return fallback;
}
