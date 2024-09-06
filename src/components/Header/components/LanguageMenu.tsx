import { LOCALE_LABEL, SUPPORTED_LOCALES } from '@constants/locales';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import styles from './LanguageMenu.module.scss';
import { useActiveLocale } from '@hooks/useActiveLocale';
import { useLocationLinkProps } from '@hooks/useLocationLinkProps';
import { useUserLocaleManager } from '@state/user/hooks';

interface LanguageMenuItemProps {
  locale: string;
  active: boolean;
  onClick?: () => void;
}

function LanguageMenuItem({ locale, active, onClick }: LanguageMenuItemProps) {
  const { to } = useLocationLinkProps(locale);

  if (active || !to) return null;

  const countryCode = locale.split('-')[1];
  return (
    <Link to={to} className={styles['internal-menu-item']} onClick={onClick}>
      <img
        src={`${import.meta.env.BASE_URL}images/flags/${countryCode}.svg`}
        width="16px"
        alt="flag"
      />
      <span className="text-body">{LOCALE_LABEL[locale]}</span>
    </Link>
  );
}

function LanguageMenu() {
  const activeLocale = useActiveLocale();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [, setUserLocale] = useUserLocaleManager();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleLocaleChange = useCallback(
    (locale: string) => {
      setUserLocale(locale);
      setMenuOpen(false);
    },
    [setUserLocale]
  );

  const countryCode = activeLocale.split('-')[1];

  return (
    <div onClick={toggleMenu}>
      <div className={styles['globe-icon']}>
        <img
          src={`${import.meta.env.BASE_URL}images/flags/${countryCode}.svg`}
          alt="flag"
        />
      </div>
      {isMenuOpen && (
        <div className={styles['menu-flyout']} onClick={toggleMenu}>
          {SUPPORTED_LOCALES.map((locale) => (
            <LanguageMenuItem
              locale={locale}
              active={activeLocale === locale}
              key={locale}
              onClick={() => handleLocaleChange(locale)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageMenu;
