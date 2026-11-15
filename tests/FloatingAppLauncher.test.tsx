import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FloatingAppLauncher } from '../src/components/layout/FloatingAppLauncher';
import i18n from '../src/i18n';

describe('FloatingAppLauncher Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('renders both floating action buttons for Observation and Prediction', () => {
    render(<FloatingAppLauncher />);

    const obsBtn = screen.getByRole('button', { name: /Explore FHI/i });
    const predBtn = screen.getByRole('button', { name: /Fire Prediction App/i });

    expect(obsBtn).toBeInTheDocument();
    expect(predBtn).toBeInTheDocument();
  });

  it('opens informative modal when clicking Explore FHI', () => {
    render(<FloatingAppLauncher />);

    const obsBtn = screen.getByRole('button', { name: /Explore FHI/i });
    fireEvent.click(obsBtn);

    // Modal should be visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Coming Soon for Review/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Interactive scientific platform providing 24 years/i)
    ).toBeInTheDocument();

    // Close button should close modal
    const closeBtn = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens informative modal when clicking Fire Prediction App', () => {
    render(<FloatingAppLauncher />);

    const predBtn = screen.getByRole('button', { name: /Fire Prediction App/i });
    fireEvent.click(predBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Ecosystem Preview · In Development/i)).toBeInTheDocument();
    expect(screen.getByText(/Forward-looking companion application/i)).toBeInTheDocument();
  });
});
