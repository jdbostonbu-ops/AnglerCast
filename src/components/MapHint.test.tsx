import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MapHint } from '@/components/MapHint';

describe('MapHint', () => {
  it('tells the user they can zoom in and out to see more occurrences', () => {
    render(<MapHint />);

    expect(
      screen.getByText(/zoom in and out on the map to see more occurrences/i),
    ).toBeInTheDocument();
  });
});