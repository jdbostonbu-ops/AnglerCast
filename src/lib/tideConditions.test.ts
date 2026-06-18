import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fetchTidePredictions } from '@/lib/tideConditions';

describe('fetchTidePredictions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the high and low tide predictions for the nearest station to the location', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        predictions: [
          { t: '2026-06-18 00:14', v: '3.431', type: 'H' },
          { t: '2026-06-18 06:59', v: '-0.111', type: 'L' },
          { t: '2026-06-18 12:47', v: '2.83', type: 'H' },
          { t: '2026-06-18 19:12', v: '0.299', type: 'L' },
        ],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchTidePredictions({
      latitude: 41.36,
      longitude: -72.09,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('station=8461490'),
    );
    expect(result).toEqual([
      { time: '2026-06-18 00:14', heightFeet: 3.431, type: 'high' },
      { time: '2026-06-18 06:59', heightFeet: -0.111, type: 'low' },
      { time: '2026-06-18 12:47', heightFeet: 2.83, type: 'high' },
      { time: '2026-06-18 19:12', heightFeet: 0.299, type: 'low' },
    ]);
  });

  it('returns an empty array when NOAA returns no predictions', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({}),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchTidePredictions({
      latitude: 41.36,
      longitude: -72.09,
    });

    expect(result).toEqual([]);
  });
});