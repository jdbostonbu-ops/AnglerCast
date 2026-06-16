import { describe, expect, it } from 'vitest';
import { prepareOccurrenceRecordsForMap } from '@/lib/occurrenceRecords';

describe('prepareOccurrenceRecordsForMap', () => {
  it('drops records at latitude 0 and longitude 0 so no marker is placed at Null Island', () => {
    const records = [
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 0,
        decimalLongitude: 0,
        eventDate: '2026-06-03T00:00:00.000Z',
      },
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.063500987654,
        decimalLongitude: -71.862800123456,
        eventDate: '2026-06-18T00:00:00.000Z',
      },
      {
        scientificName: 'Salvelinus fontinalis',
        decimalLatitude: 44.156789012345,
        decimalLongitude: -73.987654321012,
        eventDate: '2026-05-11T00:00:00.000Z',
      },
    ];

    expect(prepareOccurrenceRecordsForMap({ records })).toEqual([
      {
        scientificName: 'Morone saxatilis',
        decimalLatitude: 41.063500987654,
        decimalLongitude: -71.862800123456,
        eventDate: '2026-06-18T00:00:00.000Z',
      },
      {
        scientificName: 'Salvelinus fontinalis',
        decimalLatitude: 44.156789012345,
        decimalLongitude: -73.987654321012,
        eventDate: '2026-05-11T00:00:00.000Z',
      },
    ]);
  });
});
