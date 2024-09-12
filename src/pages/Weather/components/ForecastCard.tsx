import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ForecastItem } from '@hooks/useForecastData';
import { Trans } from '@lingui/macro';
import { format } from 'date-fns';
import styles from './forecast-card.module.scss';
import { useState } from 'react';

interface ForecastCardProps {
  forecastData: ForecastItem[][];
}

function ForecastCard({ forecastData }: ForecastCardProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  const nextBlock = () => {
    if (currentBlockIndex < forecastData.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  const prevBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };
  return (
    <div className={styles['card-body']}>
      <div className={styles['divider']} />
      <div className={styles.column}>
        <p className={styles['forecast-title']}>
          <Trans>Forecast 3h</Trans>
        </p>
        {forecastData.length > 0 && (
          <div className={styles['forecast-body']}>
            <button
              className={styles['button-icon']}
              onClick={prevBlock}
              disabled={currentBlockIndex === 0}
              aria-label="prev-forecast"
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                color={currentBlockIndex === 0 ? '#6d6d6d' : '#3b83bd'}
                fontSize={36}
              />
            </button>
            <div
              className={styles.column}
              style={{ gap: '1rem', width: '100%' }}
            >
              {forecastData[currentBlockIndex].map((forecast) => (
                <div key={forecast.dt}>
                  <p
                    className={styles['text-medium-header']}
                    style={{ textAlign: 'center', marginBottom: '1rem' }}
                  >
                    {forecast.main.temp}°C
                  </p>
                  <p
                    className={styles['text-body']}
                    style={{ textAlign: 'center' }}
                  >
                    {format(forecast.dt, 'dd/MM/yyyy')}{' '}
                    {format(forecast.dt, 'HH')}h
                  </p>
                  <div className={styles['row-center']}>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                      alt={forecast.weather[0].description}
                    />
                    <p className={styles['text-body']}>
                      {forecast.weather[0].description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              className={styles['button-icon']}
              onClick={nextBlock}
              disabled={currentBlockIndex === forecastData.length - 1}
              aria-label="next-forecast"
            >
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                color={
                  currentBlockIndex === forecastData.length - 1
                    ? '#6d6d6d'
                    : '#3b83bd'
                }
                fontSize={36}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForecastCard;
