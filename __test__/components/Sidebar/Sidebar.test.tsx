import { fireEvent, render, screen } from '@testing-library/react';
import Sidebar from '@components/Sidebar';
import { useActiveLocale } from '@hooks/useActiveLocale';

jest.mock('@hooks/useActiveLocale', () => ({
  useActiveLocale: jest.fn(),
}));

jest.mock('@data/cities.json', () => [
  { url: '/city1', name: 'City 1', name_es: 'Ciudad 1' },
  { url: '/city2', name: 'City 2', name_es: 'Ciudad 2' },
]);

jest.mock('@components/Sidebar/Sidebar.module.scss', () => ({
  'sidebar-container': 'sidebar-container',
  closed: 'closed',
}));

describe('Sidebar', () => {
  beforeEach(() => {
    (useActiveLocale as jest.Mock).mockReturnValue('en-US');
  });

  test('renders sidebar with default state', () => {
    render(<Sidebar isOpen />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('toggles city dropdown', () => {
    render(<Sidebar isOpen />);

    expect(screen.queryByText('City 1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Cities'));

    expect(screen.getByText('City 1')).toBeInTheDocument();
    expect(screen.getByText('City 2')).toBeInTheDocument();
  });

  test('displays city names based on active locale', () => {
    render(<Sidebar isOpen />);

    (useActiveLocale as jest.Mock).mockReturnValue('es-ES');

    fireEvent.click(screen.getByText('Cities'));

    expect(screen.getByText('Ciudad 1')).toBeInTheDocument();
    expect(screen.getByText('Ciudad 2')).toBeInTheDocument();
  });

  test('sidebar is closed when isOpen is false', () => {
    render(<Sidebar isOpen={false} />);

    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toHaveClass('closed');
  });
});
