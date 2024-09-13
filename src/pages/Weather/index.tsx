import { Link, useParams } from 'react-router-dom';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ForecastCard from './components/ForecastCard';
import LoadingImage from '@assets/images/Weather/loading.webp';
import { Trans } from '@lingui/macro';
import WeatherCard from './components/WeatherCard';
import styles from './weather.module.scss';
import { useActiveLocale } from '@hooks/useActiveLocale';
import useForecastData from '@hooks/useForecastData';
import { useState } from 'react';
import useWeatherData from '@hooks/useWeatherData';

function Weather() {
  const { city } = useParams();
  const activeLanguage = useActiveLocale().split('-')[1];
  const [openForecast, setOpenForecast] = useState(false);

  const { weatherData, weatherLoading, weatherError } = useWeatherData(
    city,
    activeLanguage
  );
  const { forecastData, forecastLoading, forecastError } = useForecastData(
    city,
    activeLanguage
  );

  if (weatherLoading && forecastLoading) {
    return (
      <div className={styles['column']}>
        <img
          className={styles['loading-spinner']}
          src={LoadingImage}
          alt="loading"
        />
      </div>
    );
  }

  if (weatherError || forecastError || !weatherData || !forecastData) {
    return (
      <div className={styles['column-center']}>
        <div className={styles['not-found-data']}>
          <Trans>No data available</Trans>
          <Link className={styles['home-link']} to="/">
            <Trans>Go back to Home</Trans>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['page-wrapper']}>
      <div className={styles['wrapper']}>
        <WeatherCard
          weatherData={weatherData}
          activeLanguage={activeLanguage}
          openForecast={openForecast}
        />
        <div className={styles['forecast-button-container']}>
          <button
            className={styles['button-icon']}
            onClick={() => setOpenForecast(!openForecast)}
          >
            <FontAwesomeIcon
              icon={openForecast ? faMinusCircle : faPlusCircle}
              color="#000080"
              fontSize={36}
            />
          </button>
        </div>
        {openForecast && <ForecastCard forecastData={forecastData} />}
      </div>
    </div>
  );
}

export default Weather;
