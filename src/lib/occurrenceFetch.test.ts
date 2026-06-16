import { afterEach, describe, expect, it, vi } from 'vitest';
import gbifSample from '@/test/fixtures/gbif-sample.json';
import { fetchOccurrenceRecords } from '@/lib/occurrenceFetch';

describe('fetchOccurrenceRecords', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('parses a mocked real GBIF response into occurrence records', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify(gbifSample), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      fetchOccurrenceRecords({
        species: 'Morone saxatilis',
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toEqual([
      {
        scientificName: 'Morone saxatilis (Walbaum, 1792)',
        decimalLatitude: 41.068833,
        decimalLongitude: -71.859208,
        eventDate: '2026-01-16T14:24:13',
      },
      {
        scientificName: 'Morone saxatilis (Walbaum, 1792)',
        decimalLatitude: 41.371706,
        decimalLongitude: -71.549922,
        eventDate: '2026-03-31T19:18:25',
      },
      {
        scientificName: 'Morone saxatilis (Walbaum, 1792)',
        decimalLatitude: 41.772969,
        decimalLongitude: -70.084617,
        eventDate: '2026-05-20T20:10:48',
      },
    ]);
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
