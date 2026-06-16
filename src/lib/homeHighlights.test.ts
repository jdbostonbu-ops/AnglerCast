import { afterEach, describe, expect, it, vi } from 'vitest';
import { getHomeHighlights } from '@/lib/homeHighlights';

describe('getHomeHighlights', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns highlight cards using the dominant month from mocked GBIF occurrence records', async () => {
    const gbifResponse = {
      results: [
        {
          scientificName: 'Squalus acanthias Linnaeus, 1758',
          decimalLatitude: 41.063500987654,
          decimalLongitude: -71.862800123456,
          eventDate: '2026-06-03T00:00:00.000Z',
          locality: 'Block Island Sound',
        },
        {
          scientificName: 'Squalus acanthias Linnaeus, 1758',
          decimalLatitude: 41.163500987654,
          decimalLongitude: -71.762800123456,
          eventDate: '2026-06-18T00:00:00.000Z',
          locality: 'Block Island Sound',
        },
        {
          scientificName: 'Squalus acanthias Linnaeus, 1758',
          decimalLatitude: 41.263500987654,
          decimalLongitude: -71.662800123456,
          eventDate: '2026-06-29T00:00:00.000Z',
          locality: 'Block Island Sound',
        },
        {
          scientificName: 'Squalus acanthias Linnaeus, 1758',
          decimalLatitude: 41.363500987654,
          decimalLongitude: -71.562800123456,
          eventDate: '2026-05-11T00:00:00.000Z',
          locality: 'Block Island Sound',
        },
      ],
    };
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify(gbifResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    vi.stubGlobal('fetch', fetchMock);

    const highlights = await getHomeHighlights();

    expect(highlights.length).toBeGreaterThan(0);
    highlights.forEach((card) => {
      expect(card).toEqual({
        commonName: expect.any(String),
        scientificName: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        locationLabel: expect.any(String),
        month: 6,
        rate: 3 / 4,
        totalCount: 4,
        confidence: 'low',
      });
    });
    expect(fetchMock).toHaveBeenCalled();
  });
});
