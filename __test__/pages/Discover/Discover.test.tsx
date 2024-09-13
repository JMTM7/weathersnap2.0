import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CitiesLinks from '@data/cities.json';
import Discover from '@pages/Discover';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { useActiveLocale } from '@hooks/useActiveLocale';

jest.mock('@hooks/useActiveLocale', () => ({
  useActiveLocale: jest.fn().mockReturnValue('en-US'),
}));

jest.mock('@utils/userAgent', () => ({
  isMobile: false,
}));

jest.mock('@lingui/macro', () => ({
  t: (text: string) => text,
}));

const messages = {
  en: {
    'Search cities...': 'Search cities...',
  },
  es: {
    'Search cities...': 'Buscar ciudades...',
  },
};

i18n.load('en', messages.en);
i18n.load('es', messages.es);

describe('Discover Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDiscover = (locale: 'en' | 'es') => {
    i18n.activate(locale);
    return render(
      <I18nProvider i18n={i18n}>
        <BrowserRouter>
          <Discover />
        </BrowserRouter>
      </I18nProvider>
    );
  };

  it('should filter cities based on search input', () => {
    renderDiscover('en');

    const searchInput = screen.getByPlaceholderText(
      i18n._(t`Search cities...`)
    );
    fireEvent.change(searchInput, { target: { value: 'London' } });

    const cityItems = screen.getAllByRole('link', { name: /London/i });

    cityItems.forEach((item) => {
      expect(screen.getByText('London')).toBeInTheDocument();

      const cityImage = item.querySelector('img');
      expect(cityImage).toBeInTheDocument();
      expect(cityImage).toHaveAttribute(
        'src',
        expect.stringContaining('/images/cities/London.webp')
      );
    });
  });

  it('should navigate to next and previous cities', () => {
    renderDiscover('en');

    const itemsPerPage = 3;
    const totalPages = Math.ceil(CitiesLinks.length / itemsPerPage);

    const nextButton = screen.getByLabelText('next-items');
    const prevButton = screen.getByLabelText('prev-items');

    expect(prevButton).toBeDisabled();

    if (totalPages > 1) {
      fireEvent.click(nextButton);

      expect(prevButton).not.toBeDisabled();

      fireEvent.click(nextButton);

      if (totalPages > 2) {
        expect(nextButton).not.toBeDisabled();
      } else {
        expect(nextButton).toBeDisabled();
      }

      fireEvent.click(prevButton);
      expect(prevButton).toBeDisabled();
    }
  });

  it('should filter cities based on search input in the spanish language', () => {
    (useActiveLocale as jest.Mock).mockReturnValue('es-ES');
    renderDiscover('es');

    const searchInput = screen.getByPlaceholderText(
      i18n._(t`Search cities...`)
    );
    fireEvent.change(searchInput, { target: { value: 'Madrid' } });

    CitiesLinks.forEach((city) => {
      if (city.name_es.toLowerCase().includes('madrid')) {
        expect(screen.getByText(city.name_es)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(city.name_es)).not.toBeInTheDocument();
      }
    });
  });
});
