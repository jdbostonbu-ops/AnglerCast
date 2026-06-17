import { afterEach, describe, expect, it, vi } from 'vitest';
import obisSample from '@/test/fixtures/obis-sample.json';
import { fetchObisOccurrences } from '@/lib/obisFetch';

describe('fetchObisOccurrences', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('parses a mocked real OBIS response into occurrence records', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(obisSample), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchObisOccurrences({
        species: 'Morone saxatilis',
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toEqual([
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 38.88368,
        decimalLongitude: -76.52863,
        eventDate: '2021-05-09 08:53:30',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 38.88087,
        decimalLongitude: -76.5452,
        eventDate: '2020-10-16 00:09:50',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 38.88087,
        decimalLongitude: -76.5452,
        eventDate: '2020-09-27 04:04:06',
      },
    ]);
  });

  it('returns an empty array when the OBIS response has no results property', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchObisOccurrences({
        species: 'Morone saxatilis',
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toEqual([]);
  });
});
