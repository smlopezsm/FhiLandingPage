import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeamPhotoFrame } from '../src/components/visual/TeamPhotoFrame';
import i18n from '../src/i18n';

describe('TeamPhotoFrame Component', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('renders graceful placeholder when team photograph is not present', () => {
    render(<TeamPhotoFrame />);

    expect(screen.getByText(/Team Photo Placeholder/i)).toBeInTheDocument();
    expect(screen.getByText(/Awaiting official team photograph/i)).toBeInTheDocument();
  });
});
