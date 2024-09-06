import { useCallback, useEffect, useState } from 'react';

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherData {
  main: WeatherMain;
  weather: WeatherDescription[];
  name: string;
}

interface ForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface ForecastDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: ForecastMain;
  weather: ForecastDescription[];
}

interface ForecastData {
  list: ForecastItem[];
}

/**
 * Custom hook to fetch and manage weather data for a given city
 * @param {string} city - The name of the city for which to fetch weather and forecast data
 * @param {string} lang - The language currently used to display the web
 * @returns {Object} - An object containing weatherData, forecastData, loading, and error
 */
const useWeatherData = (city: string, lang: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastItem[][] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`
      );
      if (!weatherResponse.ok) {
        throw new Error('Network response was not ok for weather');
      }
      const weatherData: WeatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&lang=${lang}`
      );
      if (!forecastResponse.ok) {
        throw new Error('Network response was not ok for forecast');
      }
      const forecastData: ForecastData = await forecastResponse.json();

      const now = new Date();
      const forecastList = forecastData.list.map((item: ForecastItem) => ({
        ...item,
        dt: item.dt * 1000,
      }));

      const filteredForecast: ForecastItem[][] = [];
      for (let i = 0; i < 4; i++) {
        const start = now.getTime() + i * 3 * 60 * 60 * 1000;
        const end = start + 3 * 60 * 60 * 1000;
        const block = forecastList.filter(
          (item) => item.dt >= start && item.dt < end
        );
        if (block.length) {
          filteredForecast.push(block);
        }
      }
      setWeatherData(weatherData);
      setForecastData(filteredForecast);
      setLoading(false);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
      setError(error as Error);
      setLoading(false);
    }
  }, [city, lang]);

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [fetchData, city]);

  return { weatherData, forecastData, loading, error };
};

export default useWeatherData;
