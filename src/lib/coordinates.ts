type ParseCoordinateInput = {
  value: string;
  minimum: number;
  maximum: number;
};

type ParseCoordinateSuccessResult = {
  isValid: true;
  coordinate: number;
};

type ParseCoordinateFailureResult = {
  isValid: false;
  reason: 'not_numeric' | 'out_of_range';
};

type ParseCoordinateResult = ParseCoordinateSuccessResult | ParseCoordinateFailureResult;

export const parseCoordinate = ({
  value,
  minimum,
  maximum,
}: ParseCoordinateInput): ParseCoordinateResult => {
  const coordinate = Number(value);

  if (!Number.isFinite(coordinate)) {
    return {
      isValid: false,
      reason: 'not_numeric',
    };
  }

  if (coordinate < minimum || coordinate > maximum) {
    return {
      isValid: false,
      reason: 'out_of_range',
    };
  }

  return {
    isValid: true,
    coordinate,
  };
};
