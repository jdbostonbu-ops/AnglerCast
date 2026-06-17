import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fetchSpeciesAtLocation } from '@/lib/locationSpecies';

describe('fetchSpeciesAtLocation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the species recorded near the given location', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      json: async () => ({
        facets: [
          {
            field: 'SPECIES',
            counts: [
              { name: 'Micropterus salmoides', count: 2194 },
              { name: 'Lepomis macrochirus', count: 980 },
            ],
          },
        ],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSpeciesAtLocation({
      latitude: 44.5,
      longitude: -73.3,
    });

    expect(result).toEqual([
      { scientificName: 'Micropterus salmoides', recordCount: 2194 },
      { scientificName: 'Lepomis macrochirus', recordCount: 980 },
    ]);
  });
});