import { fetchOccurrenceRecords } from '@/lib/occurrenceFetch';
import { prepareOccurrenceRecordsForMap } from '@/lib/occurrenceRecords';
import { computeSightingRate } from '@/lib/sightingRate';
import { explainSightingRate } from '@/lib/sightingRateExplanation';

type SearchRequestBody = {
  species: string;
  latitude: number;
  longitude: number;
  month: number;
};

export async function POST(request: Request): Promise<Response> {
  const { species, latitude, longitude, month } = (await request.json()) as SearchRequestBody;
  const records = await fetchOccurrenceRecords({
    species,
    latitude,
    longitude,
  });
  const occurrences = prepareOccurrenceRecordsForMap({ records });
  const sightingRate = computeSightingRate({
    records: occurrences,
    selectedMonth: month,
  });
  const explanation = await explainSightingRate({
    species,
    latitude,
    longitude,
    month,
    sightingRate,
  });

  return Response.json(
    {
      rate: sightingRate,
      occurrences,
      explanation,
    },
    { status: 200 },
  );
}
