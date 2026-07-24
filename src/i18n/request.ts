import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import {
  isLocale,
  localeFromAcceptLanguage,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;

  let locale: Locale;
  if (isLocale(stored)) {
    // Explicit user choice wins.
    locale = stored;
  } else {
    // First-time visitor: fall back to the browser's preferred language.
    const acceptLanguage = (await headers()).get("accept-language");
    locale = localeFromAcceptLanguage(acceptLanguage);
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return { locale, messages };
});
