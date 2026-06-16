import { describe, expect, it } from 'vitest';
import { checkEtaIsReasonable } from '@/lib/eta';

describe('checkEtaIsReasonable', () => {
  it('returns valid for a plausible ETA based on distance and speed', () => {
    expect(
      checkEtaIsReasonable({
        etaHours: 2,
        distanceNauticalMiles: 20,
        speedKnots: 10,
      }),
    ).toEqual({
      isReasonable: true,
    });
  });

  it('rejects a negative or zero ETA with a clear reason', () => {
    expect(
      checkEtaIsReasonable({
        etaHours: 0,
        distanceNauticalMiles: 20,
        speedKnots: 10,
      }),
    ).toEqual({
      isReasonable: false,
      reason: 'non_positive_eta',
    });

    expect(
      checkEtaIsReasonable({
        etaHours: -1,
        distanceNauticalMiles: 20,
        speedKnots: 10,
      }),
    ).toEqual({
      isReasonable: false,
      reason: 'non_positive_eta',
    });
  });

  it('rejects an ETA that is wildly out of range for the distance and speed', () => {
    expect(
      checkEtaIsReasonable({
        etaHours: 0.1,
        distanceNauticalMiles: 20,
        speedKnots: 10,
      }),
    ).toEqual({
      isReasonable: false,
      reason: 'implausible_eta',
    });

    expect(
      checkEtaIsReasonable({
        etaHours: 100,
        distanceNauticalMiles: 20,
        speedKnots: 10,
      }),
    ).toEqual({
      isReasonable: false,
      reason: 'implausible_eta',
    });
  });
});
