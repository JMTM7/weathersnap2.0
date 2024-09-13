import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import CitiesLinks from '@data/cities.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { isMobile } from '@utils/userAgent';
import styles from './discover.module.scss';
import { t } from '@lingui/macro';
import { useActiveLocale } from '@hooks/useActiveLocale';
import { useLingui } from '@lingui/react';
import { useState } from 'react';

function Discover() {
  const { i18n } = useLingui();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const activeLanguage = useActiveLocale().split('-')[1];
  const itemsPerPage = isMobile ? 2 : 3;

  const filteredCities = CitiesLinks.filter((city) => {
    const cityName = activeLanguage === 'ES' ? city.name_es : city.name;
    return cityName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  const currentCities = filteredCities.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['wrapper']}>
        <div className={styles['search-container']}>
          <FontAwesomeIcon icon={faSearch} fontSize="24px" color="#3498db" />
          <input
            type="text"
            placeholder={i18n._(t`Search cities...`)}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles['search-input']}
          />
        </div>
        <div className={styles['cities-list']}>
          {currentCities.map((city) => (
            <Link
              key={city.url}
              className={styles['city-item']}
              to={`/weather/${city.name}`}
            >
              <img
                src={`/images/cities/${city.name}.webp`}
                alt={city.name}
                className={styles['city-image']}
              />
              <div className={styles['city-name']}>
                {activeLanguage === 'ES' ? city.name_es : city.name}
              </div>
            </Link>
          ))}
        </div>
        {filteredCities.length > itemsPerPage && (
          <div className={styles['row-align-center']} style={{ gap: '1rem' }}>
            <button
              className={styles['button-icon']}
              onClick={prevPage}
              disabled={currentPage === 0}
              aria-label="prev-items"
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                color={currentPage === 0 ? '#6d6d6d' : '#3b83bd'}
                fontSize={36}
              />
            </button>
            <button
              className={styles['button-icon']}
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="next-items"
            >
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                color={currentPage === totalPages - 1 ? '#6d6d6d' : '#3b83bd'}
                fontSize={36}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Discover;
