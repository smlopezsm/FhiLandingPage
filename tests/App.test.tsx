import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import i18n from '../src/i18n';

describe('LandingPage App Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('renders all sections and main branding in English by default', () => {
    render(<App />);

    // Brand and subtitle
    expect(screen.getAllByText(/FHI/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Harmonizing 24 Years of Satellite Fire Observations/i)[0]).toBeInTheDocument();

    // Section 2: Challenge
    expect(screen.getAllByText(/NASA Space Apps Challenge/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Harmonization of MODIS and VIIRS Hot Spots/i)[0]).toBeInTheDocument();

    // Section 3: Solution
    expect(screen.getAllByText(/Our Solution: FHI \(Fire History Interface\)/i)[0]).toBeInTheDocument();

    // Section 4: Fire Prediction App
    expect(screen.getAllByText(/Companion Fire Prediction App/i)[0]).toBeInTheDocument();

    // Section 5: Team
    expect(screen.getByText(/The Team Behind the Project/i)).toBeInTheDocument();

    // Floating action buttons
    expect(screen.getAllByRole('button', { name: /Explore FHI/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Fire Prediction App/i })[0]).toBeInTheDocument();
  });

  it('toggles language between English and Spanish seamlessly', () => {
    render(<App />);

    // Find language switcher
    const langBtn = screen.getByRole('button', { name: /Switch to Spanish/i });
    expect(langBtn).toBeInTheDocument();

    fireEvent.click(langBtn);

    // Should now display Spanish content
    expect(
      screen.getAllByText(/Armonizando 24 Años de Observaciones Satelitales de Fuego/i)[0]
    ).toBeInTheDocument();
    expect(screen.getAllByText(/NASA Space Apps Challenge/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Nuestra Solución: FHI \(Fire History Interface\)/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/App Complementaria de Predicción/i)[0]).toBeInTheDocument();
  });
});
