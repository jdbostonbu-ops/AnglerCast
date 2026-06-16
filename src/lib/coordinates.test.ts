import { describe, expect, it } from 'vitest';
import { parseCoordinate } from '@/lib/coordinates';

describe('parseCoordinate', () => {
  it('preserves a full-precision coordinate unchanged', () => {
    expect(
      parseCoordinate({
        value: '-71.862800987654',
        minimum: -180,
        maximum: 180,
      }),
    ).toEqual({
      isValid: true,
      coordinate: -71.862800987654,
    });
  });

  it('rejects out-of-range and non-numeric input with a clear reason', () => {
    expect(
      parseCoordinate({
        value: '200',
        minimum: -90,
        maximum: 90,
      }),
    ).toEqual({
      isValid: false,
      reason: 'out_of_range',
    });

    expect(
      parseCoordinate({
        value: 'abc',
        minimum: -180,
        maximum: 180,
      }),
    ).toEqual({
      isValid: false,
      reason: 'not_numeric',
    });
  });
});
