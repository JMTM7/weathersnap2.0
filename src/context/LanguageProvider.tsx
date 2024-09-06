import { ReactNode, useEffect, useState } from 'react';
import { initialLocale, useActiveLocale } from '@hooks/useActiveLocale';
import { I18nProvider } from '@lingui/react';
import { LoadCatalog } from '@lib/i18n';
import { i18n } from '@lingui/core';
import { useUserLocaleManager } from '@state/user/hooks';

interface LanguageProviderProps {
  children: ReactNode;
}

LoadCatalog(initialLocale);

function LanguageProvider({ children }: LanguageProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useActiveLocale();
  const [, setUserLocale] = useUserLocaleManager();

  useEffect(() => {
    LoadCatalog(locale).then(() => {
      setIsLoaded(true);
      document.documentElement.setAttribute('lang', locale);
      setUserLocale(locale);
    });
  }, [locale, setUserLocale]);

  if (!isLoaded) {
    return <div>Loading translations...</div>;
  }

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}

export default LanguageProvider;
