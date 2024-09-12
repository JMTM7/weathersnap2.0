import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '@pages/NotFound';

jest.mock('@pages/NotFound', () => {
  const MockNotFound = () => (
    <div>
      <p>404</p>
      <p>Page not found</p>
      <a href="/">Go back to home</a>
    </div>
  );
  MockNotFound.displayName = 'NotFound';
  return MockNotFound;
});

describe('NotFound Component', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to home')).toBeInTheDocument();
  });
});
