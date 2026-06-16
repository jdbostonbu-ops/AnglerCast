import { describe, expect, it } from 'vitest';
import { createRecommendation } from '@/lib/recommendation';

describe('createRecommendation', () => {
  it('returns the top species with a real full-precision coordinate and peak month', () => {
    const records = [
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.123456789012,
        decimalLongitude: -71.987654321098,
        eventDate: '2026-06-03T00:00:00.000Z',
      },
      {
        scientificName: 'Pomatomus saltatrix',
        decimalLatitude: 40.700000111222,
        decimalLongitude: -72.200000333444,
        eventDate: '2026-07-08T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.223456789012,
        decimalLongitude: -71.887654321098,
        eventDate: '2026-06-14T00:00:00.000Z',
      },
      {
        scientificName: 'Pomatomus saltatrix',
        decimalLatitude: 40.800000111222,
        decimalLongitude: -72.300000333444,
        eventDate: '2026-07-22T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.323456789012,
        decimalLongitude: -71.787654321098,
        eventDate: '2026-08-02T00:00:00.000Z',
      },
    ];

    expect(createRecommendation({ records })).toEqual({
      scientificName: 'Morone saxatilis',
      coordinate: {
        decimalLatitude: 41.123456789012,
        decimalLongitude: -71.987654321098,
      },
      peakMonth: 6,
      sampleSize: 3,
      confidence: 'low',
    });
  });

  it('includes sample size and a confidence flag based on record count', () => {
    const records = Array.from({ length: 10 }, (_, index) => ({
      scientificName: 'Morone saxatilis',
      decimalLatitude: 41.123456789012 + index,
      decimalLongitude: -71.987654321098 - index,
      eventDate: '2026-06-03T00:00:00.000Z',
    }));

    expect(createRecommendation({ records })).toEqual({
      scientificName: 'Morone saxatilis',
      coordinate: {
        decimalLatitude: 41.123456789012,
        decimalLongitude: -71.987654321098,
      },
      peakMonth: 6,
      sampleSize: 10,
      confidence: 'high',
    });
  });

  it('returns a valid low-confidence recommendation when data is sparse but not empty', () => {
    const records = [
      {
        scientificName: 'Salvelinus fontinalis',
        decimalLatitude: 44.156789012345,
        decimalLongitude: -73.987654321012,
        eventDate: '2026-05-11T00:00:00.000Z',
      },
    ];

    expect(createRecommendation({ records })).toEqual({
      scientificName: 'Salvelinus fontinalis',
      coordinate: {
        decimalLatitude: 44.156789012345,
        decimalLongitude: -73.987654321012,
      },
      peakMonth: 5,
      sampleSize: 1,
      confidence: 'low',
    });
  });
});

it('includes sample size and low confidence for a mid-range record count', () => {
  const records = Array.from({ length: 5 }, (_, index) => ({
    scientificName: 'Morone saxatilis',
    decimalLatitude: 41.123456789012 + index,
    decimalLongitude: -71.987654321098 - index,
    eventDate: '2026-06-03T00:00:00.000Z',
  }));

  expect(createRecommendation({ records })).toEqual({
    scientificName: 'Morone saxatilis',
    coordinate: {
      decimalLatitude: 41.123456789012,
      decimalLongitude: -71.987654321098,
    },
    peakMonth: 6,
    sampleSize: 5,
    confidence: 'low',
  });
});
