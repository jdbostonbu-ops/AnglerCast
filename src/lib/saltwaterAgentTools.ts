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

type FetchSaltwaterObisInput = {
  latitude: number;
  longitude: number;
  radiusDegrees?: number;
  scientificName?: string;
};

type SaltwaterObisRecord = {
  scientificName?: string;
  decimalLatitude?: number;
  decimalLongitude?: number;
  eventDate?: string;
  marine?: boolean;
  vernacularName?: string;
};

type SaltwaterObisResponse = {
  total?: number;
  results?: SaltwaterObisRecord[];
};

const buildObisGeometry = (
  latitude: number,
  longitude: number,
  radiusDegrees: number,
): string => {
  const north = latitude + radiusDegrees;
  const south = latitude - radiusDegrees;
  const east = longitude + radiusDegrees;
  const west = longitude - radiusDegrees;

  return `POLYGON((${west} ${south},${east} ${south},${east} ${north},${west} ${north},${west} ${south}))`;
};

export const fetchSaltwaterObis = async ({
  latitude,
  longitude,
  radiusDegrees = 0.5,
  scientificName,
}: FetchSaltwaterObisInput): Promise<SaltwaterObisResponse> => {
  const url = new URL('https://api.obis.org/v3/occurrence');
  url.searchParams.set('geometry', buildObisGeometry(latitude, longitude, radiusDegrees));
  url.searchParams.set('size', '300');

  if (scientificName !== undefined) {
    url.searchParams.set('scientificname', scientificName);
  }

  const response = await fetch(url.toString());
  const obis = (await response.json()) as SaltwaterObisResponse;

  return obis;
};

type FetchSaltwaterGbifInput = {
  latitude: number;
  longitude: number;
  radiusDegrees?: number;
  scientificName?: string;
};

type SaltwaterGbifRecord = {
  scientificName?: string;
  species?: string;
  decimalLatitude?: number;
  decimalLongitude?: number;
  eventDate?: string;
  year?: number;
  month?: number;
  stateProvince?: string;
};

type SaltwaterGbifResponse = {
  offset?: number;
  limit?: number;
  endOfRecords?: boolean;
  count?: number;
  results?: SaltwaterGbifRecord[];
};

export const fetchSaltwaterGbif = async ({
  latitude,
  longitude,
  radiusDegrees = 0.5,
  scientificName,
}: FetchSaltwaterGbifInput): Promise<SaltwaterGbifResponse> => {
  const url = new URL('https://api.gbif.org/v1/occurrence/search');
  url.searchParams.set(
    'decimalLatitude',
    `${latitude - radiusDegrees},${latitude + radiusDegrees}`,
  );
  url.searchParams.set(
    'decimalLongitude',
    `${longitude - radiusDegrees},${longitude + radiusDegrees}`,
  );
  url.searchParams.set('limit', '300');

  if (scientificName !== undefined) {
    url.searchParams.set('scientificName', scientificName);
  }

  const response = await fetch(url.toString());
  const gbif = (await response.json()) as SaltwaterGbifResponse;

  return gbif;
};

type FetchSaltwaterUsgsInput = {
  siteId: string;
  parameterCodes?: string[];
};

type UsgsTimeSeries = {
  sourceInfo?: {
    siteName?: string;
    geoLocation?: {
      geogLocation?: {
        latitude?: number;
        longitude?: number;
      };
    };
  };
  variable?: {
    variableName?: string;
    unit?: {
      unitCode?: string;
    };
  };
  values?: {
    value?: {
      value?: string;
      dateTime?: string;
    }[];
  }[];
};

type UsgsResponse = {
  value?: {
    timeSeries?: UsgsTimeSeries[];
  };
};

type SaltwaterUsgsResponse = {
  siteName: string;
  latitude: number | null;
  longitude: number | null;
  parameters: {
    variableName: string;
    unit: string;
    latestValue: string;
    latestTime: string;
  }[];
};

export const fetchSaltwaterUsgs = async ({
  siteId,
  parameterCodes = [],
}: FetchSaltwaterUsgsInput): Promise<SaltwaterUsgsResponse> => {
  const url = new URL('https://waterservices.usgs.gov/nwis/iv/');
  url.searchParams.set('format', 'json');
  url.searchParams.set('sites', siteId);

  if (parameterCodes.length > 0) {
    url.searchParams.set('parameterCd', parameterCodes.join(','));
  }

  const response = await fetch(url.toString());
  const usgs = (await response.json()) as UsgsResponse;
  const timeSeries = usgs.value?.timeSeries ?? [];
  const firstSeries = timeSeries[0];

  return {
    siteName: firstSeries?.sourceInfo?.siteName ?? '',
    latitude: firstSeries?.sourceInfo?.geoLocation?.geogLocation?.latitude ?? null,
    longitude: firstSeries?.sourceInfo?.geoLocation?.geogLocation?.longitude ?? null,
    parameters: timeSeries.map((series) => {
      const latest = series.values?.[0]?.value?.[0];

      return {
        variableName: series.variable?.variableName ?? '',
        unit: series.variable?.unit?.unitCode ?? '',
        latestValue: latest?.value ?? '',
        latestTime: latest?.dateTime ?? '',
      };
    }),
  };
};
