import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomeButtons } from '@/components/HomeButtons';

describe('HomeButtons', () => {
  it('renders Freshwater and Saltwater buttons with correct routes', () => {
    render(<HomeButtons />);

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
