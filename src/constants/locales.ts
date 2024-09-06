export const SUPPORTED_LOCALES = ['en-GB', 'es-ES'];
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number] | 'pseudo';

export const DEFAULT_LOCALE: SupportedLocale = 'en-GB';

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-GB': 'English',
  'es-ES': 'Español',
};
