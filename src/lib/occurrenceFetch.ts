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
  results: GbifOccurrenceRecord[];
};

export const fetchOccurrenceRecords = async ({
  species,
  latitude,
  longitude,
}: FetchOccurrenceRecordsInput): Promise<OccurrenceRecord[]> => {
  const searchParams = new URLSearchParams({
    scientificName: species,
    decimalLatitude: latitude.toString(),
    decimalLongitude: longitude.toString(),
  });
  const response = await fetch(`https://api.gbif.org/v1/occurrence/search?${searchParams}`);
  const gbifResponse = (await response.json()) as GbifOccurrenceResponse;

  return gbifResponse.results.map(
    ({ scientificName, decimalLatitude, decimalLongitude, eventDate }) => ({
      scientificName,
      decimalLatitude,
      decimalLongitude,
      eventDate,
    }),
  );
};
