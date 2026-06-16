type CheckEtaIsReasonableInput = {
  etaHours: number;
  distanceNauticalMiles: number;
  speedKnots: number;
};

type CheckEtaIsReasonableResult =
  | {
      isReasonable: true;
    }
  | {
      isReasonable: false;
      reason: 'non_positive_eta';
    }
  | {
      isReasonable: false;
      reason: 'implausible_eta';
    };

export const checkEtaIsReasonable = ({
  etaHours,
  distanceNauticalMiles,
  speedKnots,
}: CheckEtaIsReasonableInput): CheckEtaIsReasonableResult => {
  const expectedEtaHours = distanceNauticalMiles / speedKnots;

  if (etaHours <= 0) {
    return {
      isReasonable: false,
      reason: 'non_positive_eta',
    };
  }

  if (etaHours < expectedEtaHours || etaHours > expectedEtaHours * 3) {
    return {
      isReasonable: false,
      reason: 'implausible_eta',
    };
  }

  return {
    isReasonable: true,
  };
};
