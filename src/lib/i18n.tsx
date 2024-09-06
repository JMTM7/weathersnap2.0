import { i18n } from '@lingui/core';

export async function LoadCatalog(locale: string) {
  try {
    const catalog = await import(`@locales/${locale}.po`);
    i18n.loadAndActivate({ locale, messages: catalog.messages });
  } catch (error) {
    console.error(`Error loading catalog for locale "${locale}":`, error);
  }
}
