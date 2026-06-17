type FetchMarineConditionsInput = {
  latitude: number;
  longitude: number;
};

type MarineConditionsSnapshot = {
  waveHeight: number;
  waveDirection: number;
  wavePeriod: number;
  oceanCurrentVelocity: number;
};

type MarineHourlyConditions = {
  wave_height?: number[];
  wave_direction?: number[];
  wave_period?: number[];
  ocean_current_velocity?: number[];
};

type MarineConditionsResponse = {
  hourly?: MarineHourlyConditions;
};

export const fetchMarineConditions = async ({
  latitude,
  longitude,
}: FetchMarineConditionsInput): Promise<MarineConditionsSnapshot | null> => {
  const searchParams = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: 'wave_height,wave_direction,wave_period,ocean_current_velocity',
    forecast_days: '1',
  });
  const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?${searchParams}`);
  const marineResponse = (await response.json()) as MarineConditionsResponse;
  const hourly = marineResponse.hourly;

  if (
    hourly === undefined ||
    hourly.wave_height?.[0] === undefined ||
    hourly.wave_direction?.[0] === undefined ||
    hourly.wave_period?.[0] === undefined ||
    hourly.ocean_current_velocity?.[0] === undefined
  ) {
    return null;
  }

  return {
    waveHeight: hourly.wave_height[0],
    waveDirection: hourly.wave_direction[0],
    wavePeriod: hourly.wave_period[0],
    oceanCurrentVelocity: hourly.ocean_current_velocity[0],
  };
};
