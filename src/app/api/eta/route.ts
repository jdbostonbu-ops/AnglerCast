import { checkEtaIsReasonable } from '@/lib/eta';
import { computeDistance } from '@/lib/distance';
import { fetchForecastConditions } from '@/lib/forecastConditions';
import { fetchSpeciesAtLocation } from '@/lib/locationSpecies';
import { fetchMarineConditions } from '@/lib/marineConditions';
import { fetchTidePredictions } from '@/lib/tideConditions';
import { explainTravelEta } from '@/lib/travelEta';
import { fetchUsgsWaterConditions } from '@/lib/usgsWaterConditions';

type EtaRequestBody = {
  originLatitude: number;
  originLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  speedKnots: number;
  waterType: 'saltwater' | 'freshwater';
};

export async function POST(request: Request): Promise<Response> {
  const {
    originLatitude,
    originLongitude,
    destinationLatitude,
    destinationLongitude,
    speedKnots,
    waterType,
  } = (await request.json()) as EtaRequestBody;
  const destination = {
    latitude: destinationLatitude,
    longitude: destinationLongitude,
  };
  const distanceNauticalMiles = computeDistance({
    origin: { latitude: originLatitude, longitude: originLongitude },
    destination,
  });
  const forecast = await fetchForecastConditions(destination);
  const locationSpecies = await fetchSpeciesAtLocation({
    latitude: destination.latitude,
    longitude: destination.longitude,
    waterType,
  });
  const tides = waterType === 'saltwater' ? await fetchTidePredictions(destination) : [];
  const conditions: Record<string, unknown> =
    waterType === 'saltwater'
      ? {
          marine: await fetchMarineConditions(destination),
          forecast,
        }
      : {
          usgs: await fetchUsgsWaterConditions(destination),
          forecast,
        };
  const { etaHours, explanation, locationSummary, tideSummary } = await explainTravelEta({
    distanceNauticalMiles,
    speedKnots,
    conditions,
    locationSpecies,
    tides,
  });
  const reasonableness = checkEtaIsReasonable({
    etaHours,
    distanceNauticalMiles,
    speedKnots,
  });

  return Response.json(
    {
      distanceNauticalMiles,
      etaHours,
      explanation,
      conditions,
      reasonableness,
      locationSpecies,
      locationSummary,
      tides,
      tideSummary,
    },
    { status: 200 },
  );
}
