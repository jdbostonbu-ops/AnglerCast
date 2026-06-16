import { findBestMonth } from '@/lib/bestMonth';
import { fetchOccurrenceRecords } from '@/lib/occurrenceFetch';

type HighlightSpecies = {
  commonName: string;
  scientificName: string;
  latitude: number;
  longitude: number;
  locationLabel: string;
};

type HomeHighlightCard = HighlightSpecies & {
  month: number;
  rate: number;
  totalCount: number;
  confidence: 'low' | 'moderate' | 'high';
};

const highlightSpecies: HighlightSpecies[] = [
  {
    commonName: 'Spiny Dogfish',
    scientificName: 'Squalus acanthias',
    latitude: 41.0,
    longitude: -71.5,
    locationLabel: 'Long Island Sound',
  },
  {
    commonName: 'Winter Flounder',
    scientificName: 'Pseudopleuronectes americanus',
    latitude: 41.0,
    longitude: -71.5,
    locationLabel: 'Long Island Sound',
  },
  {
    commonName: 'Scup',
    scientificName: 'Stenotomus chrysops',
    latitude: 41.0,
    longitude: -71.5,
    locationLabel: 'Long Island Sound',
  },
  {
    commonName: 'Summer Flounder',
    scientificName: 'Paralichthys dentatus',
    latitude: 41.0,
    longitude: -71.5,
    locationLabel: 'Long Island Sound',
  },
  {
    commonName: 'Pumpkinseed',
    scientificName: 'Lepomis gibbosus',
    latitude: 44.5,
    longitude: -73.3,
    locationLabel: 'Lake Champlain',
  },
  {
    commonName: 'Smallmouth Bass',
    scientificName: 'Micropterus dolomieu',
    latitude: 44.5,
    longitude: -73.3,
    locationLabel: 'Lake Champlain',
  },
  {
    commonName: 'Rock Bass',
    scientificName: 'Ambloplites rupestris',
    latitude: 44.5,
    longitude: -73.3,
    locationLabel: 'Lake Champlain',
  },
  {
    commonName: 'Yellow Perch',
    scientificName: 'Perca flavescens',
    latitude: 44.5,
    longitude: -73.3,
    locationLabel: 'Lake Champlain',
  },
];

export const getHomeHighlights = async (): Promise<HomeHighlightCard[]> =>
  Promise.all(
    highlightSpecies.map(async (species) => {
      const records = await fetchOccurrenceRecords({
        species: species.scientificName,
        latitude: species.latitude,
        longitude: species.longitude,
      });
      const bestMonth = findBestMonth(records);

      return {
        ...species,
        month: bestMonth.month,
        rate: bestMonth.rate,
        totalCount: bestMonth.totalCount,
        confidence: bestMonth.confidence,
      };
    }),
  );
