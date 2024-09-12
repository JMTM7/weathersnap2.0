import { fireEvent, render, screen } from '@testing-library/react';
import ForecastCard from '@pages/Weather/components/ForecastCard';
import { ForecastItem } from '@hooks/useForecastData';
import { format } from 'date-fns';

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span>Icon</span>,
}));

describe('ForecastCard Component', () => {
  const mockForecastData: ForecastItem[][] = [
    [
      {
        dt: new Date('2024-09-11T12:00:00Z').getTime(),
        dt_txt: '2024-09-11 12:00:00',
        main: {
          temp: 22,
          feels_like: 21,
          temp_min: 20,
          temp_max: 23,
          pressure: 1012,
          humidity: 80,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
      },
    ],
    [
      {
        dt: new Date('2024-09-11T15:00:00Z').getTime(),
        dt_txt: '2024-09-11 15:00:00',
        main: {
          temp: 25,
          feels_like: 24,
          temp_min: 23,
          temp_max: 26,
          pressure: 1011,
          humidity: 75,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
      },
    ],
  ];

  it('should correctly display the initial forecast data', () => {
    render(<ForecastCard forecastData={mockForecastData} />);

    expect(
      screen.getByText((content) => content.includes('22°C'))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T12:00:00Z'), 'dd/MM/yyyy'))
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T12:00:00Z'), 'HH'))
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText('clear sky')).toBeInTheDocument();
  });

  it('should disable the previous button because it is the initial forecast and there is no previous', () => {
    render(<ForecastCard forecastData={mockForecastData} />);

    const prevButton = screen.getByRole('button', {
      name: 'prev-forecast',
    });
    expect(prevButton).toBeDisabled();
  });

  it('should disable next button when on last data', () => {
    render(<ForecastCard forecastData={mockForecastData} />);

    const nextButton = screen.getByRole('button', {
      name: 'next-forecast',
    });
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it('should navigate blocks with next and previous buttons', () => {
    render(<ForecastCard forecastData={mockForecastData} />);

    const prevButton = screen.getByRole('button', {
      name: 'prev-forecast',
    });
    const nextButton = screen.getByRole('button', {
      name: 'next-forecast',
    });

    //Initial data
    expect(
      screen.getByText((content) => content.includes('22°C'))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T12:00:00Z'), 'dd/MM/yyyy'))
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T12:00:00Z'), 'HH'))
      )
    ).toBeInTheDocument();

    fireEvent.click(nextButton);

    //Second data
    expect(
      screen.getByText((content) => content.includes('25°C'))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T15:00:00Z'), 'dd/MM/yyyy'))
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T15:00:00Z'), 'HH'))
      )
    ).toBeInTheDocument();

    fireEvent.click(prevButton);

    //Initial Data
    expect(
      screen.getByText((content) => content.includes('22°C'))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T12:00:00Z'), 'dd/MM/yyyy'))
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(format(new Date('2024-09-11T12:00:00Z'), 'HH'))
      )
    ).toBeInTheDocument();
  });
});
