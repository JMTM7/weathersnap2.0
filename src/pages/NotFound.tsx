import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import styles from './not-found.module.scss';

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles['page-title']}>404</p>
      <p className={styles['page-title']}>
        <Trans>Page not found</Trans>
      </p>
      <Link className={styles['home-link']} to="/">
        <Trans>Go back to home</Trans>
      </Link>
    </div>
  );
}

export default NotFound;
