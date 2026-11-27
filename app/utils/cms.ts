/**
 * Helpers for reading nullable CMS fields.
 *
 * The snapshot keeps the CMS shape (`string | null`), so templates resolve the
 * value once at the component boundary instead of rendering `null`. A missing
 * value becomes an empty string or array; a fallback is passed only for
 * optional props and structural defaults (routes, logos, navigation).
 */

export function cmsText(value: string | null | undefined, fallback = ''): string {
  return value && value.trim().length > 0 ? value : fallback
}

/** Split a newline-delimited CMS field into trimmed, non-empty lines. */
export function cmsLines(value: string | null | undefined, fallback: readonly string[] = []): string[] {
  const lines = (value ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  return lines.length ? lines : [...fallback]
}

/** Filter a CMS list, falling back to the shipped copy when it is empty. */
export function cmsList(
  values: readonly (string | null | undefined)[] | null | undefined,
  fallback: readonly string[] = [],
): string[] {
  const items = (values ?? [])
    .map((value) => value?.trim() ?? '')
    .filter(Boolean)

  return items.length ? items : [...fallback]
}

/** Build a `tel:` href from a display phone number. */
export function cmsTel(value: string | null | undefined, fallback = ''): string {
  const number = cmsText(value, fallback).replace(/[^\d+]/g, '')
  return number ? `tel:${number}` : ''
}

/** Format an ISO date for display; an empty or invalid value becomes the fallback. */
export function cmsDate(value: string | null | undefined, fallback = '', locale = 'en-GB'): string {
  const raw = cmsText(value)
  if (!raw) return fallback

  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return fallback

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
