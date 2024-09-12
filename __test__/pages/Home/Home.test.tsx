import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@pages/Home';

jest.mock('@assets/images/Home/landscape.png', () => 'mock-image.png');

jest.mock('@pages/Home/Home.module.scss', () => ({
  'page-title': 'page-title',
  'styled-image': 'styled-image',
  'animation-fade-in': 'animation-fade-in',
}));

describe('Home Component', () => {
  it('should render correctly and handle image loading', async () => {
    render(<Home />);

    expect(
      screen.getByText("Your Window to Tomorrow's Weather")
    ).toBeInTheDocument();
    const img = screen.getByAltText('landscape');
    expect(img).toBeInTheDocument();

    await waitFor(() => {
      expect(img).toHaveClass('styled-image false');
    });

    await waitFor(() => {
      expect(screen.getByText("Your Window to Tomorrow's Weather")).toHaveClass(
        'page-title false'
      );
    });
  });
});
