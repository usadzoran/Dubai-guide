export function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`[DubaiStart] Failed to read ${key} from storage:`, e);
    return null;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`[DubaiStart] Failed to write ${key} to storage:`, e);
  }
}

export function safeRemoveItem(key: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`[DubaiStart] Failed to remove ${key} from storage:`, e);
  }
}

export function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    console.warn(`[DubaiStart] Failed to parse JSON:`, e);
    return fallback;
  }
}
