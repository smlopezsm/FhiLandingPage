import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingAppLauncher } from '../src/components/layout/FloatingAppLauncher';
import { EXTERNAL_LINKS } from '../src/config/externalLinks';
import i18n from '../src/i18n';

describe('FloatingAppLauncher Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
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

  it('renders permanent documentation button and shows status notice when clicked', () => {
    render(<FloatingAppLauncher />);

    const docBtn = screen.getByRole('button', { name: /Documentation/i });
    expect(docBtn).toBeInTheDocument();
    expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument();

    fireEvent.click(docBtn);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(
      screen.getByText(/Official project documentation in preparation/i)
    ).toBeInTheDocument();
  });
});
