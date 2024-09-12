import {
  faChevronDown,
  faChevronRight,
  faCity,
  faFileContract,
  faHouse,
} from '@fortawesome/free-solid-svg-icons';
import CitiesLinks from '@data/cities.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trans } from '@lingui/macro';
import styles from './Sidebar.module.scss';
import { useActiveLocale } from '@hooks/useActiveLocale';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const activeLanguage = useActiveLocale();
  const [isCitiesOpen, setCitiesOpen] = useState(false);

  const toggleCities = () => setCitiesOpen(!isCitiesOpen);

  return (
    <div
      className={`${styles['sidebar-container']} ${!isOpen && styles['closed']}`}
      data-testid="sidebar"
    >
      <a href="/" className={styles['nav-item']}>
        <FontAwesomeIcon icon={faHouse} fontSize={18} />
        <Trans>Home</Trans>
      </a>

      <div className={styles['dropdown-header']} onClick={toggleCities}>
        <FontAwesomeIcon
          icon={isCitiesOpen ? faChevronDown : faChevronRight}
          fontSize={16}
        />
        <Trans>Cities</Trans>
      </div>

      {isCitiesOpen && (
        <div className={styles['dropdown-content']}>
          {CitiesLinks.map((city) => (
            <a href={city.url} className={styles['city-item']} key={city.url}>
              <FontAwesomeIcon icon={faCity} fontSize={18} />
              {activeLanguage === 'es-ES' ? city.name_es : city.name}
            </a>
          ))}
        </div>
      )}

      <a href="/contact" className={styles['nav-item']}>
        <FontAwesomeIcon icon={faFileContract} fontSize={18} />
        <Trans>Contact</Trans>
      </a>
    </div>
  );
}

export default Sidebar;
