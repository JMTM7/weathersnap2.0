import { CSSProperties, useEffect, useState } from 'react';
import Landscape from '@assets/images/Home/landscape.png';
import { Trans } from '@lingui/macro';
import styles from './Home.module.scss';

interface CustomCSSProperties extends CSSProperties {
  '--isLoaded'?: string;
  '--isLoadedBlur'?: string;
  '--isLoadedFadeIn'?: string;
}

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Landscape;
    img.onload = () => setIsLoaded(true);
  }, []);

  const dynamicStyles: CustomCSSProperties = {
    '--isLoaded': isLoaded ? '1' : '0',
    '--isLoadedBlur': isLoaded ? 'blur(0)' : 'blur(20px)',
    '--isLoadedFadeIn': isLoaded ? 'fadeIn' : 'none',
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        <img
          src={Landscape}
          alt="landscape"
          className={`${styles.styledImage} ${isLoaded && styles.fadeIn}`}
          style={dynamicStyles}
        />
        <h1
          className={`${styles['page-title']} ${isLoaded && styles.fadeIn}`}
          style={dynamicStyles}
        >
          <Trans>Your Window to Tomorrow's Weather</Trans>
        </h1>
      </div>
    </div>
  );
}

export default Home;
