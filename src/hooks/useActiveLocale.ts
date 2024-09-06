import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@constants/locales';
import { parsedQueryString } from './useParsedQueryString';
import store from '../state';
import { useMemo } from 'react';
import useParsedQueryString from './useParsedQueryString';
import { useUserLocale } from '@state/user/hooks';

/**
 * Matches a locale string with the supported locales
 * @param {string} maybeSupportedLocale - The locale identifier to match
 * @returns {string | undefined} - The matched locale or undefined
 */
function parseLocale(maybeSupportedLocale: string) {
  if (typeof maybeSupportedLocale !== 'string') return undefined;

  const normalizedLocale = maybeSupportedLocale.toLowerCase();
  return SUPPORTED_LOCALES.find(
    (locale: string) =>
      locale.toLowerCase() === normalizedLocale ||
      locale.split('-')[0] === normalizedLocale
  );
}

/**
 * Retrieves the locale from the user agent
 * @returns {string | undefined} - The detected locale or undefined
 */
function getUserAgentLocale() {
  if (!navigator.language) return undefined;

  const [language, region] = navigator.language.split('-');
  return region
    ? (parseLocale(`${language}-${region.toUpperCase()}`) ??
        parseLocale(language))
    : parseLocale(language);
}

/**
 * Retrieves the locale from Redux store
 * @returns {string | undefined} - The locale stored in Redux or undefined
 */
function getStoredLocale() {
  return store.getState().user.userLocale ?? undefined;
}

/**
 * Determines the initial locale based on query string, stored locale, user agent, or default
 */
export const initialLocale = (() => {
  const parsedQuery = parsedQueryString(window.location.search);

  return (
    parseLocale(parsedQuery.lng as string) ??
    getStoredLocale() ??
    getUserAgentLocale() ??
    DEFAULT_LOCALE
  );
})();

/**
 * Custom hook to get the locale from the query string
 * @returns {string | undefined} - The locale from the query string or undefined
 */
function useUrlLocale() {
  const { lng } = useParsedQueryString();
  return parseLocale((lng as string) ?? '');
}

/**
 * Custom hook to get the currently active locale based on various sources
 * @returns {string} - The currently active locale
 */
export function useActiveLocale() {
  const urlLocale = useUrlLocale();
  const userLocale = useUserLocale();

  return useMemo(
    () => urlLocale ?? userLocale ?? getUserAgentLocale() ?? DEFAULT_LOCALE,
    [urlLocale, userLocale]
  );
}
