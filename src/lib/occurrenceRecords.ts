type OccurrenceRecord = {
  scientificName: string;
  decimalLatitude: number;
  decimalLongitude: number;
  eventDate: string;
};

type PrepareOccurrenceRecordsForMapInput = {
  records: OccurrenceRecord[];
};

export const prepareOccurrenceRecordsForMap = ({
  records,
}: PrepareOccurrenceRecordsForMapInput): OccurrenceRecord[] =>
  records.filter(
    (record) => !(record.decimalLatitude === 0 && record.decimalLongitude === 0),
  );
