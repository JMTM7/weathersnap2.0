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

export interface WeatherData {
  main: WeatherMain;
  weather: WeatherDescription[];
  name: string;
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
}

const useWeatherData = (city: string | undefined, lang: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!city) {
      setWeatherLoading(false);
      setWeatherError(new Error('City is not provided.'));
      return;
    }
    setWeatherLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=${lang}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
      setWeatherLoading(false);
    } catch (weatherError) {
      console.error(
        'There has been a problem with your fetch operation:',
        weatherError
      );
      setWeatherError(weatherError as Error);
      setWeatherLoading(false);
    }
  }, [city, lang]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { weatherData, weatherLoading, weatherError };
};

export default useWeatherData;
