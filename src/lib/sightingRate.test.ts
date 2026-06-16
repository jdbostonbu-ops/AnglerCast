import { describe, expect, it } from 'vitest';
import { computeSightingRate } from '@/lib/sightingRate';

describe('computeSightingRate', () => {
  it('computes the sighting rate as matching-month records divided by total records', () => {
    const records = [
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.063500987654,
        decimalLongitude: -71.862800123456,
        eventDate: '2026-06-03T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.163500987654,
        decimalLongitude: -71.762800123456,
        eventDate: '2026-06-18T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.263500987654,
        decimalLongitude: -71.662800123456,
        eventDate: '2026-05-11T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.363500987654,
        decimalLongitude: -71.562800123456,
        eventDate: '2026-07-22T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.463500987654,
        decimalLongitude: -71.462800123456,
        eventDate: '2026-09-05T00:00:00.000Z',
      },
    ];

    expect(computeSightingRate({ records, selectedMonth: 6 })).toEqual({
      rate: 0.4,
      matchingMonthCount: 2,
      totalCount: 5,
    });
  });

  it('returns a rate of 0 with 0 counts when there are no records', () => {
    expect(computeSightingRate({ records: [], selectedMonth: 6 })).toEqual({
      rate: 0,
      matchingMonthCount: 0,
      totalCount: 0,
    });
  });

  it('includes confidence based on sample size', () => {
    const createRecords = (count: number) =>
      Array.from({ length: count }, (_, index) => ({
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.063500987654 + index,
        decimalLongitude: -71.862800123456 - index,
        eventDate: '2026-06-03T00:00:00.000Z',
      }));

    expect(computeSightingRate({ records: createRecords(9), selectedMonth: 6 })).toMatchObject({
      totalCount: 9,
      confidence: 'low',
    });
    expect(computeSightingRate({ records: createRecords(10), selectedMonth: 6 })).toMatchObject({
      totalCount: 10,
      confidence: 'moderate',
    });
    expect(computeSightingRate({ records: createRecords(29), selectedMonth: 6 })).toMatchObject({
      totalCount: 29,
      confidence: 'moderate',
    });
    expect(computeSightingRate({ records: createRecords(30), selectedMonth: 6 })).toMatchObject({
      totalCount: 30,
      confidence: 'high',
    });
  });
});
