import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from '@components/Header';

jest.mock('@components/Header/components/LanguageMenu', () => {
  const MockLanguageMenu = () => <div>Language Menu</div>;
  MockLanguageMenu.displayName = 'LanguageMenu';
  return MockLanguageMenu;
});

jest.mock('@components/Sidebar', () => {
  const MockSidebar = ({ isOpen }: { isOpen: boolean }) => (
    <div>{isOpen ? 'Sidebar is open' : 'Sidebar is closed'}</div>
  );
  MockSidebar.displayName = 'Sidebar';
  return MockSidebar;
});

jest.mock('@assets/images/logo.png', () => 'mock-image.png');

describe('Header Component', () => {
  it('renders Header component', () => {
    render(<Header />);

    expect(screen.getByAltText('logo')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'menu' })).toBeInTheDocument();

    expect(screen.getByText('Language Menu')).toBeInTheDocument();

    expect(screen.getByText('Sidebar is closed')).toBeInTheDocument();
  });

  it('toggles Sidebar when clicking the menu icon', async () => {
    render(<Header />);

    const menuIcon = screen.getByRole('button');
    fireEvent.click(menuIcon);

    await waitFor(() => {
      expect(screen.getByTestId('overlay')).toBeInTheDocument();
    });

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(screen.getByText('Sidebar is closed')).toBeInTheDocument();
  });
});
