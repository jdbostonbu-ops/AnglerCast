import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the AnglerCast landing page with the NavBar', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', {
        name: /AnglerCast/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Freshwater' })).toHaveAttribute(
      'href',
      '/freshwater',
    );
    expect(screen.getByRole('link', { name: 'Saltwater' })).toHaveAttribute(
      'href',
      '/saltwater',
    );
  });
});
