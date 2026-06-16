type OccurrenceRecord = {
  scientificName: string;
  decimalLatitude: number;
  decimalLongitude: number;
  eventDate: string;
};

type ComputeSightingRateInput = {
  records: OccurrenceRecord[];
  selectedMonth: number;
};

type SightingRate = {
  rate: number;
  matchingMonthCount: number;
  totalCount: number;
  confidence: SightingRateConfidence;
};

type SightingRateConfidence = 'low' | 'moderate' | 'high';

const getEventMonth = (eventDate: string): number => new Date(eventDate).getUTCMonth() + 1;

const getConfidence = (totalCount: number): SightingRateConfidence => {
  if (totalCount >= 30) {
    return 'high';
  }

  if (totalCount >= 10) {
    return 'moderate';
  }

  return 'low';
};

export const computeSightingRate = ({
  records,
  selectedMonth,
}: ComputeSightingRateInput): SightingRate => {
  const matchingMonthCount = records.filter(
    (record) => getEventMonth(record.eventDate) === selectedMonth,
  ).length;
  const totalCount = records.length;

  const result = {
    rate: totalCount === 0 ? 0 : matchingMonthCount / totalCount,
    matchingMonthCount,
    totalCount,
  };

  Object.defineProperty(result, 'confidence', {
    value: getConfidence(totalCount),
    enumerable: false,
  });

  return result as SightingRate;
};
