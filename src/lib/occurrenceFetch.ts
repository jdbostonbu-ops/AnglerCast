import { fetchObisOccurrences } from '@/lib/obisFetch';

type FetchOccurrenceRecordsInput = {
  species: string;
  latitude: number;
  longitude: number;
};

type OccurrenceRecord = {
  scientificName: string;
  decimalLatitude: number;
  decimalLongitude: number;
  eventDate: string;
};

type GbifOccurrenceRecord = OccurrenceRecord;

type GbifOccurrenceResponse = {
  results?: GbifOccurrenceRecord[];
};

const recordKey = ({
  scientificName,
  decimalLatitude,
  decimalLongitude,
  eventDate,
}: OccurrenceRecord): string => {
  return `${scientificName}|${decimalLatitude}|${decimalLongitude}|${eventDate}`;
};

export const fetchOccurrenceRecords = async ({
  species,
  latitude,
  longitude,
}: FetchOccurrenceRecordsInput): Promise<OccurrenceRecord[]> => {
  const latitudeRange = `${latitude - 0.5},${latitude + 0.5}`;
  const longitudeRange = `${longitude - 0.5},${longitude + 0.5}`;
  const searchParams = new URLSearchParams({
    scientificName: species,
    decimalLatitude: latitudeRange,
    decimalLongitude: longitudeRange,
    limit: '300',
  });
  const response = await fetch(`https://api.gbif.org/v1/occurrence/search?${searchParams}`);
  const gbifResponse = (await response.json()) as GbifOccurrenceResponse;
  const results = gbifResponse.results ?? [];
  const gbifResults = results.map(
    ({ scientificName, decimalLatitude, decimalLongitude, eventDate }) => ({
      scientificName,
      decimalLatitude,
      decimalLongitude,
      eventDate,
    }),
  );
  const obisResults = await fetchObisOccurrences({ species, latitude, longitude });
  const mergedResults = [...gbifResults, ...obisResults];
  const seenRecordKeys = new Set<string>();

  return mergedResults.filter((record) => {
    const key = recordKey(record);

    if (seenRecordKeys.has(key)) {
      return false;
    }

    seenRecordKeys.add(key);
    return true;
  });
};
