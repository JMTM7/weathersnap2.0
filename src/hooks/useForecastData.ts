import { useCallback, useEffect, useState } from 'react';

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

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: ForecastMain;
  weather: ForecastDescription[];
}

interface ForecastData {
  list: ForecastItem[];
}

const useForecastData = (city: string | undefined, lang: string) => {
  const [forecastData, setForecastData] = useState<ForecastItem[][] | null>(
    null
  );
  const [forecastLoading, setForecastLoading] = useState<boolean>(true);
  const [forecastError, setForecastError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!city) {
      setForecastLoading(false);
      setForecastError(new Error('City is not provided.'));
      return;
    }
    setForecastLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=${lang}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ForecastData = await response.json();

      const now = new Date();
      const forecastList = data.list.map((item: ForecastItem) => ({
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
      setForecastData(filteredForecast);
      setForecastLoading(false);
    } catch (forecastError) {
      console.error(
        'There has been a problem with your fetch operation:',
        forecastError
      );
      setForecastError(forecastError as Error);
      setForecastLoading(false);
    }
  }, [city, lang]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { forecastData, forecastLoading, forecastError };
};

export default useForecastData;
