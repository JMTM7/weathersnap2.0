import { fireEvent, render, screen } from '@testing-library/react';
import LanguageMenu from '@components/Header/components/LanguageMenu';
import { MemoryRouter } from 'react-router-dom';
import { useActiveLocale } from '@hooks/useActiveLocale';
import { useUserLocaleManager } from '@state/user/hooks';

jest.mock('@hooks/useActiveLocale', () => ({
  useActiveLocale: jest.fn(),
}));

jest.mock('@state/user/hooks', () => ({
  useUserLocaleManager: jest.fn(),
}));

jest.mock('@constants/locales', () => ({
  LOCALE_LABEL: {
    'en-US': 'English',
    'es-ES': 'Español',
  },
  SUPPORTED_LOCALES: ['en-US', 'es-ES'],
}));

const mockSetUserLocale = jest.fn();

describe('LanguageMenu', () => {
  beforeEach(() => {
    (useActiveLocale as jest.Mock).mockReturnValue('en-US');
    (useUserLocaleManager as jest.Mock).mockReturnValue([
      undefined,
      mockSetUserLocale,
    ]);
  });

  test('renders the drop-down with the flags and languages that appearm', () => {
    render(
      <MemoryRouter>
        <LanguageMenu />
      </MemoryRouter>
    );

    const globeIcon = screen.getByAltText('flag');
    expect(globeIcon).toBeInTheDocument();

    expect(screen.queryByText('Español')).not.toBeInTheDocument();

    fireEvent.click(globeIcon);

    expect(screen.getByText('Español')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Español'));

    expect(screen.queryByText('Español')).not.toBeInTheDocument();
  });

  test('change the language in the displayed menu item', () => {
    render(
      <MemoryRouter>
        <LanguageMenu />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('flag'));

    fireEvent.click(screen.getByText('Español'));

    expect(mockSetUserLocale).toHaveBeenCalledWith('es-ES');
  });
});
