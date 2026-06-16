import { describe, expect, it } from 'vitest';
import { computeDistance } from '@/lib/distance';

describe('computeDistance', () => {
  it('computes nautical miles from full-precision origin and destination coordinates', () => {
    const distance = computeDistance({
      origin: {
        latitude: 41.063500987654,
        longitude: -71.862800123456,
      },
      destination: {
        latitude: 41.173500987654,
        longitude: -71.682800123456,
      },
    });

    expect(distance).toBeCloseTo(10.4836, 4);
  });
});
