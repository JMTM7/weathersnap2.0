import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageMenu from './components/LanguageMenu';
import Logo from '@assets/images/logo.png';
import Sidebar from '@components/Sidebar';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.scss';
import { useState } from 'react';

function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className={styles['header-frame']}>
        <div className={styles.row} style={{ gap: '2rem' }}>
          <button
            className={styles['button-icon-transparent']}
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
            aria-label="menu"
          >
            <FontAwesomeIcon icon={faBars} fontSize={30} color="#3ea3e4" />
          </button>
          <a href="/">
            <img src={Logo} alt="logo" width="200px" />
          </a>
        </div>
        <LanguageMenu />
      </div>
      {isSidebarOpen && (
        <div
          data-testid="overlay"
          className={styles.overlay}
          onClick={toggleSidebar}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}

export default Header;
