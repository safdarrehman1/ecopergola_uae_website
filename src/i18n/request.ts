import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const reqLoc = await requestLocale;
  const isSupported =
    typeof reqLoc === "string" &&
    routing.locales.includes(reqLoc as Locale);

  const locale: Locale = isSupported ? (reqLoc as Locale) : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
