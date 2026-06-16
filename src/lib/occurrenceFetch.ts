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
  const latitudeRange = `${latitude - 0.5},${latitude + 0.5}`;
  const longitudeRange = `${longitude - 0.5},${longitude + 0.5}`;
  const searchParams = new URLSearchParams({
    scientificName: species,
    decimalLatitude: latitudeRange,
    decimalLongitude: longitudeRange,
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
