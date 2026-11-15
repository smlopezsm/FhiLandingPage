import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TeamPhotoFrame } from '../src/components/visual/TeamPhotoFrame';
import i18n from '../src/i18n';

describe('TeamPhotoFrame Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('renders official team photograph with caption and metadata', () => {
    render(<TeamPhotoFrame />);

    const img = screen.getByRole('img', {
      name: /Team FHI \(Fire History Interface\) · NASA Space Apps Challenge 2026/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/team/team-photo.webp');
    expect(
      screen.getAllByText(/Team FHI \(Fire History Interface\) · NASA Space Apps Challenge 2026/i)[0]
    ).toBeInTheDocument();
  });

  it('renders graceful fallback when image fails to load', () => {
    render(<TeamPhotoFrame />);

    const img = screen.getByRole('img', {
      name: /Team FHI \(Fire History Interface\) · NASA Space Apps Challenge 2026/i,
    });
    fireEvent.error(img);

    expect(screen.getByText(/Team Photo Placeholder/i)).toBeInTheDocument();
    expect(screen.getByText(/Awaiting official team photograph/i)).toBeInTheDocument();
  });
});
