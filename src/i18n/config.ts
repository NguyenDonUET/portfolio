export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie used to persist the user's explicit language choice. */
export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "vi";
}

/**
 * Resolve the best-matching supported locale from an `Accept-Language` header,
 * used to default new visitors to their browser language.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const primary = header
    .split(",")[0]
    ?.trim()
    .split("-")[0]
    ?.toLowerCase();
  return isLocale(primary) ? primary : defaultLocale;
}
