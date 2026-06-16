type SightingRateConfidence = 'low' | 'moderate' | 'high';

type SightingRate = {
  rate: number;
  matchingMonthCount: number;
  totalCount: number;
  confidence: SightingRateConfidence;
};

type ExplainSightingRateInput = {
  species: string;
  latitude: number;
  longitude: number;
  month: number;
  sightingRate: SightingRate;
};

export const explainSightingRate = async ({
  species,
  latitude,
  longitude,
  month,
  sightingRate,
}: ExplainSightingRateInput): Promise<string> =>
  `${species} has ${sightingRate.matchingMonthCount} of ${sightingRate.totalCount} nearby historical records in month ${month} near ${latitude}, ${longitude}. Confidence: ${sightingRate.confidence}.`;
