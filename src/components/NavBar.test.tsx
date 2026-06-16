import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NavBar } from '@/components/NavBar';

describe('NavBar', () => {
  it('renders Freshwater, Saltwater, About, and Contact links', () => {
    render(<NavBar />);

    expect(screen.getByRole('link', { name: 'Freshwater' })).toHaveAttribute(
      'href',
      '/freshwater',
    );
    expect(screen.getByRole('link', { name: 'Saltwater' })).toHaveAttribute(
      'href',
      '/saltwater',
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });
});
