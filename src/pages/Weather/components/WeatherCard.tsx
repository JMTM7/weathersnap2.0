import Cities from '@data/cities.json';
import { Trans } from '@lingui/macro';
import { WeatherData } from '@hooks/useWeatherData';
import styles from './weather-card.module.scss';

interface WeatherCardProps {
  weatherData: WeatherData;
  activeLanguage: string;
  openForecast: boolean;
}

function WeatherCard({
  weatherData,
  activeLanguage,
  openForecast,
}: WeatherCardProps) {
  const date = new Date();
  const bgCard = weatherData.name
    ? `url(/images/cities/${weatherData.name}.webp)`
    : 'none';

  const nameCity = Cities.find((city) => city.name === weatherData.name);

  return (
    <>
      <div
        className={styles['card-header']}
        style={{ backgroundImage: bgCard }}
      >
        <div className={styles['row-between']} style={{ padding: '1rem' }}>
          <div className={styles['row']} style={{ gap: '1rem' }}>
            <p className={styles['text-large-header']}>
              {activeLanguage === 'ES' ? nameCity?.name_es : nameCity?.name}
            </p>
            <img
              src={`/images/flags/${weatherData.sys.country}.svg`}
              alt={weatherData.sys.country}
              width="24px"
            />
          </div>
          <div>
            <p className={styles['text-medium-header']}>
              {date.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className={styles['temperature-container']}>
          <div className={styles.column}>
            <p className={styles['text-large-header']}>
              {weatherData.main.temp}°C
            </p>
            <div className={styles['row-between']}>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
              <p className={styles['text-body']}>
                {weatherData.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles['card-body']} ${openForecast && styles['open']}`}
      >
        <div className={styles['data-container']}>
          <div className={styles['row-between']}>
            <p className={styles['text-body']}>
              <Trans>Minimum temperature</Trans>
            </p>
            <p className={styles['text-body']}>{weatherData.main.temp_min}°C</p>
          </div>
          <div className={styles['row-between']}>
            <p className={styles['text-body']}>
              <Trans>Maximum temperature</Trans>
            </p>
            <p className={styles['text-body']}>{weatherData.main.temp_max}°C</p>
          </div>
          <div className={styles['row-between']}>
            <p className={styles['text-body']}>
              <Trans>Feels like</Trans>
            </p>
            <p className={styles['text-body']}>
              {weatherData.main.feels_like}°C
            </p>
          </div>
          <div className={styles['row-between']}>
            <p className={styles['text-body']}>
              <Trans>Humidity</Trans>
            </p>
            <p className={styles['text-body']}>{weatherData.main.humidity}%</p>
          </div>
          <div className={styles['row-between']}>
            <p className={styles['text-body']}>
              <Trans>Wind speed</Trans>
            </p>
            <p className={styles['text-body']}>{weatherData.wind.speed}m/s</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
