import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { FloatingAppLauncher } from '../src/components/layout/FloatingAppLauncher';
import { EXTERNAL_LINKS } from '../src/config/externalLinks';
import { DOCUMENTATION_URLS } from '../src/config/docs';
import i18n from '../src/i18n';

describe('FloatingAppLauncher Component', () => {
  beforeEach(() => {
    act(() => {
      i18n.changeLanguage('en');
    });
  });

  it('renders both floating action links pointing to official application URLs in a new tab', () => {
    render(<FloatingAppLauncher />);

    const obsLink = screen.getByRole('link', { name: /Explore Fire History Interface/i });
    const predLink = screen.getByRole('link', { name: /Fire Prediction App/i });

    expect(obsLink).toBeInTheDocument();
    expect(obsLink).toHaveAttribute('href', EXTERNAL_LINKS.fhi);
    expect(obsLink).toHaveAttribute('target', '_blank');
    expect(obsLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(predLink).toBeInTheDocument();
    expect(predLink).toHaveAttribute('href', EXTERNAL_LINKS.predict);
    expect(predLink).toHaveAttribute('target', '_blank');
    expect(predLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders bilingual documentation link dynamically adapting to active language', () => {
    // 1. In English by default
    const { rerender } = render(<FloatingAppLauncher />);

    const docLinkEn = screen.getByRole('link', { name: /Documentation/i });
    expect(docLinkEn).toBeInTheDocument();
    expect(docLinkEn).toHaveAttribute('href', DOCUMENTATION_URLS.en);
    expect(docLinkEn).toHaveAttribute('target', '_blank');
    expect(docLinkEn).toHaveAttribute('rel', 'noopener noreferrer');

    // 2. Change language to Spanish dynamically
    act(() => {
      i18n.changeLanguage('es');
    });
    rerender(<FloatingAppLauncher />);

    const docLinkEs = screen.getByRole('link', { name: /Documentación/i });
    expect(docLinkEs).toBeInTheDocument();
    expect(docLinkEs).toHaveAttribute('href', DOCUMENTATION_URLS.es);
    expect(docLinkEs).toHaveAttribute('target', '_blank');
    expect(docLinkEs).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
