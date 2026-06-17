type FetchForecastConditionsInput = {
  latitude: number;
  longitude: number;
};

type ForecastConditionsSnapshot = {
  windSpeed: number;
  windDirection: number;
  windGusts: number;
};

type ForecastHourlyConditions = {
  wind_speed_10m?: number[];
  wind_direction_10m?: number[];
  wind_gusts_10m?: number[];
};

type ForecastConditionsResponse = {
  hourly?: ForecastHourlyConditions;
};

export const fetchForecastConditions = async ({
  latitude,
  longitude,
}: FetchForecastConditionsInput): Promise<ForecastConditionsSnapshot | null> => {
  const searchParams = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: 'wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    forecast_days: '1',
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${searchParams}`);
  const forecastResponse = (await response.json()) as ForecastConditionsResponse;
  const hourly = forecastResponse.hourly;

  if (
    hourly === undefined ||
    hourly.wind_speed_10m?.[0] === undefined ||
    hourly.wind_direction_10m?.[0] === undefined ||
    hourly.wind_gusts_10m?.[0] === undefined
  ) {
    return null;
  }

  return {
    windSpeed: hourly.wind_speed_10m[0],
    windDirection: hourly.wind_direction_10m[0],
    windGusts: hourly.wind_gusts_10m[0],
  };
};
