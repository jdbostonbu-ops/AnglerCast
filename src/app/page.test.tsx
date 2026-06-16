import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HomePage from '@/app/page';

vi.mock('@/lib/homeHighlights', () => ({
  getHomeHighlights: vi.fn().mockResolvedValue([
    {
      commonName: 'Spiny Dogfish',
      scientificName: 'Squalus acanthias',
      latitude: 41.0,
      longitude: -71.5,
      locationLabel: 'Long Island Sound',
      month: 6,
      rate: 0.5,
      totalCount: 100,
      confidence: 'high',
    },
  ]),
}));

describe('HomePage', () => {
  it('renders the AnglerCast landing page with the NavBar', async () => {
    render(await HomePage());

    expect(
      screen.getByRole('heading', {
        name: /AnglerCast/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Search freshwater' })).toHaveAttribute(
      'href',
      '/freshwater',
    );
    expect(screen.getByRole('link', { name: 'Search saltwater' })).toHaveAttribute(
      'href',
      '/saltwater',
    );
  });
});
