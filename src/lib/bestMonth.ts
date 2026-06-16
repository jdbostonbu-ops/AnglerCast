type OccurrenceRecord = {
  eventDate: string;
};

type BestMonthConfidence = 'low' | 'moderate' | 'high';

type BestMonth = {
  month: number;
  rate: number;
  totalCount: number;
  confidence: BestMonthConfidence;
};

const getEventMonth = (eventDate: string): number => new Date(eventDate).getUTCMonth() + 1;

const getConfidence = (totalCount: number): BestMonthConfidence => {
  if (totalCount >= 30) {
    return 'high';
  }

  if (totalCount >= 10) {
    return 'moderate';
  }

  return 'low';
};

export const findBestMonth = (records: OccurrenceRecord[]): BestMonth => {
  const monthCounts = Array.from({ length: 12 }, () => 0);

  records.forEach((record) => {
    const month = getEventMonth(record.eventDate);
    monthCounts[month - 1] += 1;
  });

  const bestMonthIndex = monthCounts.reduce(
    (bestIndex, count, index) => (count > monthCounts[bestIndex] ? index : bestIndex),
    0,
  );
  const totalCount = records.length;
  const bestMonthCount = monthCounts[bestMonthIndex];

  return {
    month: bestMonthIndex + 1,
    rate: totalCount === 0 ? 0 : bestMonthCount / totalCount,
    totalCount,
    confidence: getConfidence(totalCount),
  };
};
