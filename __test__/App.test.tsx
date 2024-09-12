import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@pages/ContactForm', () => {
  const MockContactForm = () => <div>Contact Form Page</div>;
  MockContactForm.displayName = 'ContactForm';
  return MockContactForm;
});

jest.mock('@pages/Home', () => {
  const MockHome = () => <div>Home Page</div>;
  MockHome.displayName = 'Home';
  return MockHome;
});

jest.mock('@pages/NotFound', () => {
  const MockNotFound = () => <div>404 Not Found</div>;
  MockNotFound.displayName = 'NotFound';
  return MockNotFound;
});

jest.mock('@pages/Weather', () => {
  const MockWeather = () => <div>Weather Page</div>;
  MockWeather.displayName = 'Weather';
  return MockWeather;
});

jest.mock('../src/components/Header', () => {
  const MockHeader = () => <header>Header Component</header>;
  MockHeader.displayName = 'Header';
  return MockHeader;
});

describe('App Component', () => {
  it('should render Header and Home page by default', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Header Component')).toBeInTheDocument();
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('should render ContactForm page when navigating to /contact', () => {
    window.history.pushState({}, 'Contact Page', '/contact');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Contact Form Page')).toBeInTheDocument();
  });

  it('should render Weather page when navigating to /weather/:city', () => {
    window.history.pushState({}, 'Weather Page', '/weather/london');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText('Weather Page')).toBeInTheDocument();
  });

  it('should render NotFound page for an unknown route', () => {
    window.history.pushState({}, 'Not Found Page', '/unknown-route');

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
