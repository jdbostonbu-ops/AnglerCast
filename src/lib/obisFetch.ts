type FetchObisOccurrencesInput = {
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

type ObisOccurrenceRecord = OccurrenceRecord;

type ObisOccurrenceResponse = {
  results?: ObisOccurrenceRecord[];
};

export const fetchObisOccurrences = async ({
  species,
}: FetchObisOccurrencesInput): Promise<OccurrenceRecord[]> => {
  const searchParams = new URLSearchParams({
    scientificname: species,
    size: '2000',
  });
  const response = await fetch(`https://api.obis.org/v3/occurrence?${searchParams}`);
  const obisResponse = (await response.json()) as ObisOccurrenceResponse;
  const results = obisResponse.results ?? [];

  return results.map(
    ({ scientificName, decimalLatitude, decimalLongitude, eventDate }) => ({
      scientificName,
      decimalLatitude,
      decimalLongitude,
      eventDate,
    }),
  );
};
