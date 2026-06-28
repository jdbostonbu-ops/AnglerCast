type SaltwaterAgentTool = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, never>;
      required: string[];
    };
  };
};

const emptyParameters = {
  type: 'object',
  properties: {},
  required: [],
} satisfies SaltwaterAgentTool['function']['parameters'];

export const SALTWATER_AGENT_TOOLS: SaltwaterAgentTool[] = [
  {
    type: 'function',
    function: {
      name: 'forecast',
      description: 'Fetch Open-Meteo Forecast conditions for a saltwater fishing question.',
      parameters: emptyParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'marine',
      description: 'Fetch Open-Meteo Marine conditions for a saltwater fishing question.',
      parameters: emptyParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'obis',
      description: 'Fetch OBIS saltwater occurrence records.',
      parameters: emptyParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'gbif',
      description: 'Fetch GBIF saltwater occurrence records.',
      parameters: emptyParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'usgs',
      description: 'Fetch USGS water data for saltwater context.',
      parameters: emptyParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'noaa',
      description: 'Fetch NOAA CO-OPS tide predictions.',
      parameters: emptyParameters,
    },
  },
];

type UnknownSaltwaterToolResult = {
  error: 'unknown_tool';
};

export const runSaltwaterTool = async (
  _name: string,
  _args: Record<string, unknown>,
): Promise<UnknownSaltwaterToolResult> => ({ error: 'unknown_tool' });

type FetchSaltwaterForecastInput = {
  latitude: number;
  longitude: number;
  targetDate: string;
};

type SaltwaterForecastResponse = {
  latitude: number;
  longitude: number;
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    wind_speed_10m?: number[];
    precipitation?: number[];
  };
};

export const fetchSaltwaterForecast = async ({
  latitude,
  longitude,
  targetDate,
}: FetchSaltwaterForecastInput): Promise<SaltwaterForecastResponse> => {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('start_date', targetDate);
  url.searchParams.set('end_date', targetDate);
  url.searchParams.set('hourly', 'temperature_2m,wind_speed_10m,precipitation');

  const response = await fetch(url.toString());
  const forecast = (await response.json()) as SaltwaterForecastResponse;

  return forecast;
};

type FetchSaltwaterMarineInput = {
  latitude: number;
  longitude: number;
  targetDate: string;
};

type SaltwaterMarineResponse = {
  latitude: number;
  longitude: number;
  hourly?: {
    time?: string[];
    wave_height?: number[];
    wave_direction?: number[];
    wave_period?: number[];
    sea_surface_temperature?: number[];
  };
};

export const fetchSaltwaterMarine = async ({
  latitude,
  longitude,
  targetDate,
}: FetchSaltwaterMarineInput): Promise<SaltwaterMarineResponse> => {
  const url = new URL('https://marine-api.open-meteo.com/v1/marine');
  url.searchParams.set('latitude', String(latitude));
  url.searchParams.set('longitude', String(longitude));
  url.searchParams.set('start_date', targetDate);
  url.searchParams.set('end_date', targetDate);
  url.searchParams.set(
    'hourly',
    'wave_height,wave_direction,wave_period,sea_surface_temperature',
  );

  const response = await fetch(url.toString());
  const marine = (await response.json()) as SaltwaterMarineResponse;

  return marine;
};
