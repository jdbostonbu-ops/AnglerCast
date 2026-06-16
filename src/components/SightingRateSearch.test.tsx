import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SightingRateSearch } from '@/components/SightingRateSearch';

describe('SightingRateSearch', () => {
  it('renders species, latitude, longitude, and month inputs with a Search button', () => {
    render(<SightingRateSearch onSearch={vi.fn()} />);

    expect(screen.getByLabelText('Species')).toBeInTheDocument();
    expect(screen.getByLabelText('Latitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Longitude')).toBeInTheDocument();
    expect(screen.getByLabelText('Month')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('submits full-precision coordinates and the selected month to onSearch', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SightingRateSearch onSearch={onSearch} />);

    await user.type(screen.getByLabelText('Species'), 'Morone saxatilis');
    await user.type(screen.getByLabelText('Latitude'), '41.063500123456');
    await user.type(screen.getByLabelText('Longitude'), '-71.862800987654');
    await user.type(screen.getByLabelText('Month'), '6');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSearch).toHaveBeenCalledWith({
      species: 'Morone saxatilis',
      latitude: 41.063500123456,
      longitude: -71.862800987654,
      month: 6,
    });
  });

  it('shows a clear error and does not call onSearch for invalid or out-of-range coordinates', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SightingRateSearch onSearch={onSearch} />);

    await user.type(screen.getByLabelText('Species'), 'Morone saxatilis');
    await user.type(screen.getByLabelText('Latitude'), 'abc');
    await user.type(screen.getByLabelText('Longitude'), '-181');
    await user.type(screen.getByLabelText('Month'), '6');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(
      screen.getByText('Enter valid coordinates: latitude must be -90 to 90 and longitude must be -180 to 180.'),
    ).toBeInTheDocument();
    expect(onSearch).not.toHaveBeenCalled();
  });
});
