type OccurrenceRecord = {
  scientificName: string;
  decimalLatitude: number;
  decimalLongitude: number;
  eventDate: string;
};

type CreateRecommendationInput = {
  records: OccurrenceRecord[];
};

type Recommendation = {
  scientificName: string;
  coordinate: {
    decimalLatitude: number;
    decimalLongitude: number;
  };
  peakMonth: number;
  sampleSize: number;
  confidence: 'high' | 'low';
};

type SpeciesRecordGroup = {
  scientificName: string;
  records: OccurrenceRecord[];
};

const highConfidenceMinimumRecordCount = 10;

const getEventMonth = (eventDate: string): number => new Date(eventDate).getUTCMonth() + 1;

const getPeakMonth = (records: OccurrenceRecord[]): number => {
  const monthCounts = new Map<number, number>();
  let peakMonth = getEventMonth(records[0].eventDate);
  let peakCount = 0;

  records.forEach((record) => {
    const month = getEventMonth(record.eventDate);
    const count = (monthCounts.get(month) ?? 0) + 1;

    monthCounts.set(month, count);

    if (count > peakCount) {
      peakMonth = month;
      peakCount = count;
    }
  });

  return peakMonth;
};

export const createRecommendation = ({ records }: CreateRecommendationInput): Recommendation => {
  const speciesGroups = records.reduce<SpeciesRecordGroup[]>((groups, record) => {
    const existingGroup = groups.find((group) => group.scientificName === record.scientificName);

    if (existingGroup) {
      existingGroup.records.push(record);
      return groups;
    }

    return [
      ...groups,
      {
        scientificName: record.scientificName,
        records: [record],
      },
    ];
  }, []);

  const topSpeciesGroup = speciesGroups.reduce<SpeciesRecordGroup>(
    (currentTopGroup, group) =>
      group.records.length > currentTopGroup.records.length ? group : currentTopGroup,
    speciesGroups[0],
  );
  const coordinateRecord = topSpeciesGroup.records[0];
  const sampleSize = topSpeciesGroup.records.length;

  return {
    scientificName: topSpeciesGroup.scientificName,
    coordinate: {
      decimalLatitude: coordinateRecord.decimalLatitude,
      decimalLongitude: coordinateRecord.decimalLongitude,
    },
    peakMonth: getPeakMonth(topSpeciesGroup.records),
    sampleSize,
    confidence: sampleSize >= highConfidenceMinimumRecordCount ? 'high' : 'low',
  };
};
