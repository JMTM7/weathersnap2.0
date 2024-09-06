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
          <div
            className={styles['row-align-center']}
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faBars} fontSize={30} color="#3ea3e4" />
          </div>
          <a href="/">
            <img src={Logo} alt="logo" width="200px" />
          </a>
        </div>
        <LanguageMenu />
      </div>
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}

export default Header;
