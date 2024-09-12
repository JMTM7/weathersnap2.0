import { useEffect, useState } from 'react';
import Landscape from '@assets/images/Home/landscape.png';
import { Trans } from '@lingui/macro';
import styles from './Home.module.scss';

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Landscape;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles.wrapper}>
        <img
          src={Landscape}
          alt="landscape"
          className={`${styles['styled-image']} ${isLoaded && styles['animation-fade-in']}`}
        />
        <h1
          className={`${styles['page-title']} ${isLoaded && styles['animation-fade-in']}`}
        >
          <Trans>Your Window to Tomorrow's Weather</Trans>
        </h1>
      </div>
    </div>
  );
}

export default Home;
