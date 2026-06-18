import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';

const computeDistanceMock = vi.hoisted(() => vi.fn());
const fetchMarineConditionsMock = vi.hoisted(() => vi.fn());
const fetchForecastConditionsMock = vi.hoisted(() => vi.fn());
const explainTravelEtaMock = vi.hoisted(() => vi.fn());
const checkEtaIsReasonableMock = vi.hoisted(() => vi.fn());
const fetchSpeciesAtLocationMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/distance', () => ({
  computeDistance: computeDistanceMock,
}));

vi.mock('@/lib/marineConditions', () => ({
  fetchMarineConditions: fetchMarineConditionsMock,
}));

vi.mock('@/lib/forecastConditions', () => ({
  fetchForecastConditions: fetchForecastConditionsMock,
}));

vi.mock('@/lib/travelEta', () => ({
  explainTravelEta: explainTravelEtaMock,
}));

vi.mock('@/lib/eta', () => ({
  checkEtaIsReasonable: checkEtaIsReasonableMock,
}));

vi.mock('@/lib/locationSpecies', () => ({
  fetchSpeciesAtLocation: fetchSpeciesAtLocationMock,
}));

describe('POST /api/eta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns saltwater ETA using distance, marine conditions, forecast conditions, AI explanation, and reasonableness check', async () => {
    const destination = { latitude: 41.2, longitude: -71.3 };
    const marineConditions = {
      waveHeight: 0.98,
      waveDirection: 193,
      wavePeriod: 5.7,
      oceanCurrentVelocity: 1.9,
    };
    const forecastConditions = {
      windSpeed: 31.2,
      windDirection: 211,
      windGusts: 36.0,
    };
    const conditions = {
      marine: marineConditions,
      forecast: forecastConditions,
    };
    const reasonableness = { isReasonable: true };
    const locationSpecies = [
      { scientificName: 'Gadus morhua', recordCount: 1644 },
      { scientificName: 'Pollachius virens', recordCount: 820 },
    ];

    computeDistanceMock.mockReturnValueOnce(15.5);
    fetchSpeciesAtLocationMock.mockResolvedValueOnce(locationSpecies);
    fetchMarineConditionsMock.mockResolvedValueOnce(marineConditions);
    fetchForecastConditionsMock.mockResolvedValueOnce(forecastConditions);
    explainTravelEtaMock.mockResolvedValueOnce({
      etaHours: 1.2,
      explanation: 'Choppy with a stiff wind; roughly an hour and ten.',
      locationSummary: 'Cod and pollock are the most-recorded species here.',
    });
    checkEtaIsReasonableMock.mockReturnValueOnce(reasonableness);

    const response = await POST(
      new Request('http://localhost/api/eta', {
        method: 'POST',
        body: JSON.stringify({
          originLatitude: 41.0,
          originLongitude: -71.5,
          destinationLatitude: destination.latitude,
          destinationLongitude: destination.longitude,
          speedKnots: 18,
          waterType: 'saltwater',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      distanceNauticalMiles: 15.5,
      etaHours: 1.2,
      explanation: 'Choppy with a stiff wind; roughly an hour and ten.',
      conditions,
      reasonableness,
      locationSpecies,
      locationSummary: 'Cod and pollock are the most-recorded species here.',
    });
    expect(computeDistanceMock).toHaveBeenCalledWith({
      origin: { latitude: 41.0, longitude: -71.5 },
      destination,
    });
    expect(fetchMarineConditionsMock).toHaveBeenCalledWith(destination);
    expect(fetchForecastConditionsMock).toHaveBeenCalledWith(destination);
    expect(fetchSpeciesAtLocationMock).toHaveBeenCalledWith({
      latitude: destination.latitude,
      longitude: destination.longitude,
      waterType: 'saltwater',
    });
    expect(explainTravelEtaMock).toHaveBeenCalledWith({
      distanceNauticalMiles: 15.5,
      speedKnots: 18,
      conditions,
      locationSpecies,
    });
    expect(checkEtaIsReasonableMock).toHaveBeenCalledWith({
      etaHours: 1.2,
      distanceNauticalMiles: 15.5,
      speedKnots: 18,
    });
  });
});
