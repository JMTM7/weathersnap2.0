import { render, screen } from '@testing-library/react';
import WeatherCard from '@pages/Weather/components/WeatherCard';
import { WeatherData } from '@hooks/useWeatherData';

const mockWeatherData: WeatherData = {
  name: 'London',
  sys: {
    country: 'GB',
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
    },
  ],
  main: {
    temp: 20,
    temp_min: 15,
    temp_max: 25,
    feels_like: 18,
    humidity: 60,
    pressure: 1012,
  },
  wind: {
    speed: 5,
  },
};

jest.mock('@data/cities.json', () => [
  { name: 'London', name_es: 'Londres', url: '/weather/london' },
]);

describe('WeatherCard', () => {
  it('should display weather data correctly', () => {
    const activeLanguage = 'EN';
    render(
      <WeatherCard
        weatherData={mockWeatherData}
        activeLanguage={activeLanguage}
        openForecast={false}
      />
    );
    expect(screen.getByText('London')).toBeInTheDocument();

    expect(screen.getByText('20°C')).toBeInTheDocument();

    expect(screen.getByAltText('clear sky')).toBeInTheDocument();

    expect(screen.getByText('clear sky')).toBeInTheDocument();

    expect(screen.getByText('15°C')).toBeInTheDocument();

    expect(screen.getByText('25°C')).toBeInTheDocument();

    expect(screen.getByText('18°C')).toBeInTheDocument();

    expect(screen.getByText('60%')).toBeInTheDocument();

    expect(screen.getByText('5m/s')).toBeInTheDocument();

    expect(
      screen.getByText(new Date().toLocaleDateString())
    ).toBeInTheDocument();
  });
});
