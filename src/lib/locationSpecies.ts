import { getSpeciesForWaterType, type WaterType } from '@/lib/species';

type FetchSpeciesAtLocationInput = {
  latitude: number;
  longitude: number;
  waterType: WaterType;
};

type LocationSpecies = {
  scientificName: string;
  recordCount: number;
};

type GbifOccurrenceCountResponse = {
  count: number;
};

export const fetchSpeciesAtLocation = async ({
  latitude,
  longitude,
  waterType,
}: FetchSpeciesAtLocationInput): Promise<LocationSpecies[]> => {
  const speciesList = getSpeciesForWaterType(waterType);
  const latitudeRange = `${latitude - 0.5},${latitude + 0.5}`;
  const longitudeRange = `${longitude - 0.5},${longitude + 0.5}`;
  const speciesCounts = await Promise.all(
    speciesList.map(async (species) => {
      const queryString = [
        `scientificName=${encodeURIComponent(species.scientificName)}`,
        `decimalLatitude=${encodeURIComponent(latitudeRange)}`,
        `decimalLongitude=${encodeURIComponent(longitudeRange)}`,
        'limit=0',
      ].join('&');
      const response = await fetch(`https://api.gbif.org/v1/occurrence/search?${queryString}`);
      const gbifResponse = (await response.json()) as GbifOccurrenceCountResponse;

      return {
        scientificName: species.scientificName,
        recordCount: gbifResponse.count,
      };
    }),
  );

  return speciesCounts.filter(({ recordCount }) => recordCount > 0);
};
