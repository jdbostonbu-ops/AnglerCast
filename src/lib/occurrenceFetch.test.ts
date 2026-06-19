import { afterEach, describe, expect, it, vi } from 'vitest';
import gbifSample from '@/test/fixtures/gbif-sample.json';
import { fetchOccurrenceRecords } from '@/lib/occurrenceFetch';

describe('fetchOccurrenceRecords', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('queries GBIF with a bounding box around the searched point', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ results: [] }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetchOccurrenceRecords({
      species: 'Morone saxatilis',
      latitude: 41,
      longitude: -71.5,
    });

    const requestedUrl = (fetchMock.mock.calls[0] as unknown as [string])[0];
    expect(requestedUrl).toEqual(expect.any(String));
    expect(String(requestedUrl)).toContain('decimalLatitude=40.5%2C41.5');
    expect(String(requestedUrl)).toContain('decimalLongitude=-72%2C-71');
  });

  it('requests up to 300 records from GBIF', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ results: [] }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    await fetchOccurrenceRecords({
      species: 'Morone saxatilis',
      latitude: 41,
      longitude: -71.5,
    });

    const requestedUrl = String((fetchMock.mock.calls[0] as unknown as [string])[0]);
    expect(requestedUrl).toContain('limit=300');
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
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('returns an empty array when the GBIF response has no results property', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({}), {
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
    ).resolves.toEqual([]);
  });

  it('returns merged records from GBIF and OBIS without replacing GBIF', async () => {
    const gbifRecord = {
      scientificName: 'GBIF Morone saxatilis',
      decimalLatitude: 41.068833,
      decimalLongitude: -71.859208,
      eventDate: '2026-01-16T14:24:13',
    };
    const obisRecord = {
      scientificName: 'OBIS Morone saxatilis',
      decimalLatitude: 38.88368,
      decimalLongitude: -76.52863,
      eventDate: '2021-05-09 08:53:30',
    };
    const fetchMock = vi.fn(async (requestedUrl: string | URL | Request) => {
      const url = String(requestedUrl);

      if (url.includes('api.gbif.org')) {
        return new Response(JSON.stringify({ results: [gbifRecord] }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (url.includes('api.obis.org')) {
        return new Response(JSON.stringify({ results: [obisRecord] }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      return new Response(JSON.stringify({ results: [] }), {
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
    ).resolves.toEqual([gbifRecord, obisRecord]);
  });

  it('deduplicates overlapping records returned by GBIF and OBIS', async () => {
    const sharedRecord = {
      scientificName: 'Shared Morone saxatilis',
      decimalLatitude: 41.068833,
      decimalLongitude: -71.859208,
      eventDate: '2026-01-16T14:24:13',
    };
    const gbifOnlyRecord = {
      scientificName: 'GBIF-only Morone saxatilis',
      decimalLatitude: 41.371706,
      decimalLongitude: -71.549922,
      eventDate: '2026-03-31T19:18:25',
    };
    const obisOnlyRecord = {
      scientificName: 'OBIS-only Morone saxatilis',
      decimalLatitude: 38.88368,
      decimalLongitude: -76.52863,
      eventDate: '2021-05-09 08:53:30',
    };
    const fetchMock = vi.fn(async (requestedUrl: string | URL | Request) => {
      const url = String(requestedUrl);

      if (url.includes('api.gbif.org')) {
        return new Response(JSON.stringify({ results: [sharedRecord, gbifOnlyRecord] }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (url.includes('api.obis.org')) {
        return new Response(JSON.stringify({ results: [sharedRecord, obisOnlyRecord] }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      return new Response(JSON.stringify({ results: [] }), {
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
    ).resolves.toEqual([sharedRecord, gbifOnlyRecord, obisOnlyRecord]);
  });
});
