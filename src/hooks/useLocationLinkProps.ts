import { stringify } from 'qs';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import useParsedQueryString from './useParsedQueryString';

/**
 * Custom hook to generate location link props for locale changes.
 * @param {string|null} locale - The locale to include in the query string.
 * @returns {Object} - Object containing `to`.
 */
export function useLocationLinkProps(locale: string | null) {
  const location = useLocation();
  const qs = useParsedQueryString();

  return useMemo(() => {
    if (!locale) return {};

    return {
      to: {
        ...location,
        search: stringify({ ...qs, lng: locale }),
      },
    };
  }, [location, qs, locale]);
}
