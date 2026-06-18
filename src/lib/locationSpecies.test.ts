import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fetchSpeciesAtLocation } from '@/lib/locationSpecies';
import { getSpeciesForWaterType } from '@/lib/species';

vi.mock('@/lib/species', () => ({
  getSpeciesForWaterType: vi.fn(),
}));

describe('fetchSpeciesAtLocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('checks each known species for the water type and returns those recorded near the location', async () => {
    vi.mocked(getSpeciesForWaterType).mockReturnValue([
      { commonName: 'Striped Bass', scientificName: 'Morone saxatilis' },
      { commonName: 'Bluefish', scientificName: 'Pomatomus saltatrix' },
    ]);

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ json: async () => ({ count: 1200 }) })
      .mockResolvedValueOnce({ json: async () => ({ count: 0 }) });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSpeciesAtLocation({
      latitude: 41.2,
      longitude: -71.3,
      waterType: 'saltwater',
    });

    expect(getSpeciesForWaterType).toHaveBeenCalledWith('saltwater');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('Morone%20saxatilis'),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('decimalLatitude=40.7%2C41.7'),
    );
    expect(result).toEqual([
      { scientificName: 'Morone saxatilis', recordCount: 1200 },
    ]);
  });
});