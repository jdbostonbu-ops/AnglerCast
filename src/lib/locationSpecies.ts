type FetchSpeciesAtLocationInput = {
  latitude: number;
  longitude: number;
};

type LocationSpecies = {
  scientificName: string;
  recordCount: number;
};

type GbifFacetCount = {
  name: string;
  count: number;
};

type GbifFacet = {
  field: string;
  counts: GbifFacetCount[];
};

type GbifSpeciesFacetResponse = {
  facets?: GbifFacet[];
};

export const fetchSpeciesAtLocation = async ({
  latitude,
  longitude,
}: FetchSpeciesAtLocationInput): Promise<LocationSpecies[]> => {
  const latitudeRange = `${latitude - 0.5},${latitude + 0.5}`;
  const longitudeRange = `${longitude - 0.5},${longitude + 0.5}`;
  const searchParams = new URLSearchParams({
    decimalLatitude: latitudeRange,
    decimalLongitude: longitudeRange,
    facet: 'species',
  });
  const response = await fetch(`https://api.gbif.org/v1/occurrence/search?${searchParams}`);
  const gbifResponse = (await response.json()) as GbifSpeciesFacetResponse;
  const speciesFacet = gbifResponse.facets?.find((facet) => facet.field === 'SPECIES');

  return (speciesFacet?.counts ?? []).map(({ name, count }) => ({
    scientificName: name,
    recordCount: count,
  }));
};
