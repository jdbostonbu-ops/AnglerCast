type SaltwaterAgentToolProperty = {
  type: 'number' | 'string';
  description: string;
};

type SaltwaterAgentTool = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, SaltwaterAgentToolProperty>;
      required: string[];
    };
  };
};

const latitudeProperty = {
  type: 'number',
  description: 'Latitude for the fishing location.',
} satisfies SaltwaterAgentToolProperty;

const longitudeProperty = {
  type: 'number',
  description: 'Longitude for the fishing location.',
} satisfies SaltwaterAgentToolProperty;

const targetDateProperty = {
  type: 'string',
  description: 'Target date for the requested conditions in YYYY-MM-DD format.',
} satisfies SaltwaterAgentToolProperty;

const locationDateParameters = {
  type: 'object',
  properties: {
    latitude: latitudeProperty,
    longitude: longitudeProperty,
    targetDate: targetDateProperty,
  },
  required: ['latitude', 'longitude', 'targetDate'],
} satisfies SaltwaterAgentTool['function']['parameters'];

const locationParameters = {
  type: 'object',
  properties: {
    latitude: latitudeProperty,
    longitude: longitudeProperty,
  },
  required: ['latitude', 'longitude'],
} satisfies SaltwaterAgentTool['function']['parameters'];

const usgsParameters = {
  type: 'object',
  properties: {
    siteId: {
      type: 'string',
      description: 'USGS site identifier for the water station.',
    },
  },
  required: ['siteId'],
} satisfies SaltwaterAgentTool['function']['parameters'];

const noaaParameters = {
  type: 'object',
  properties: {
    stationId: {
      type: 'string',
      description: 'NOAA CO-OPS station identifier for tide predictions.',
    },
    targetDate: targetDateProperty,
  },
  required: ['stationId', 'targetDate'],
} satisfies SaltwaterAgentTool['function']['parameters'];

export const SALTWATER_AGENT_TOOLS: SaltwaterAgentTool[] = [
  {
    type: 'function',
    function: {
      name: 'forecast',
      description: 'Fetch Open-Meteo Forecast conditions for a saltwater fishing question.',
      parameters: locationDateParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'marine',
      description: 'Fetch Open-Meteo Marine conditions for a saltwater fishing question.',
      parameters: locationDateParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'obis',
      description: 'Fetch OBIS saltwater occurrence records.',
      parameters: locationParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'gbif',
      description: 'Fetch GBIF saltwater occurrence records.',
      parameters: locationParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'usgs',
      description: 'Fetch USGS water data for saltwater context.',
      parameters: usgsParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'noaa',
      description: 'Fetch NOAA CO-OPS tide predictions.',
      parameters: noaaParameters,
    },
  },
];

type UnknownSaltwaterToolResult = {
  error: 'unknown_tool';
};

const readNumberArg = (args: Record<string, unknown>, key: string): number =>
  typeof args[key] === 'number' ? args[key] : 0;

const readStringArg = (args: Record<string, unknown>, key: string): string =>
  typeof args[key] === 'string' ? args[key] : '';

const readOptionalNumberArg = (
  args: Record<string, unknown>,
  key: string,
): number | undefined => (typeof args[key] === 'number' ? args[key] : undefined);

const readOptionalStringArg = (
  args: Record<string, unknown>,
  key: string,
): string | undefined => (typeof args[key] === 'string' ? args[key] : undefined);

const readOptionalStringArrayArg = (
  args: Record<string, unknown>,
  key: string,
): string[] | undefined => {
  if (!Array.isArray(args[key])) {
    return undefined;
  }

  return args[key].filter((value): value is string => typeof value === 'string');
};

export const runSaltwaterTool = async (
  name: string,
  args: Record<string, unknown>,
): Promise<unknown | UnknownSaltwaterToolResult> => {
  if (name === 'forecast') {
    return fetchSaltwaterForecast({
      latitude: readNumberArg(args, 'latitude'),
      longitude: readNumberArg(args, 'longitude'),
      targetDate: readStringArg(args, 'targetDate'),
    });
  }

  if (name === 'marine') {
    return fetchSaltwaterMarine({
      latitude: readNumberArg(args, 'latitude'),
      longitude: readNumberArg(args, 'longitude'),
      targetDate: readStringArg(args, 'targetDate'),
    });
  }

  if (name === 'obis') {
    return fetchSaltwaterObis({
      latitude: readNumberArg(args, 'latitude'),
      longitude: readNumberArg(args, 'longitude'),
      radiusDegrees: readOptionalNumberArg(args, 'radiusDegrees'),
      scientificName: readOptionalStringArg(args, 'scientificName'),
    });
  }

  if (name === 'gbif') {
    return fetchSaltwaterGbif({
      latitude: readNumberArg(args, 'latitude'),
      longitude: readNumberArg(args, 'longitude'),
      radiusDegrees: readOptionalNumberArg(args, 'radiusDegrees'),
      scientificName: readOptionalStringArg(args, 'scientificName'),
    });
  }

  if (name === 'usgs') {
    return fetchSaltwaterUsgs({
      siteId: readStringArg(args, 'siteId'),
      parameterCodes: readOptionalStringArrayArg(args, 'parameterCodes'),
    });
  }

  if (name === 'noaa') {
    return fetchSaltwaterNoaa({
      stationId: readStringArg(args, 'stationId'),
      targetDate: readStringArg(args, 'targetDate'),
    });
  }

  return { error: 'unknown_tool' };
};

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
  url.searchParams.set('temperature_unit', 'fahrenheit');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('precipitation_unit', 'inch');

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
  url.searchParams.set('length_unit', 'imperial');
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

type FetchSaltwaterNoaaInput = {
  stationId: string;
  targetDate: string;
};

type NoaaPrediction = {
  t: string;
  v: string;
};

type NoaaResponse = {
  predictions?: NoaaPrediction[];
};

type SaltwaterNoaaResponse = {
  predictions: NoaaPrediction[];
};

const formatNoaaDate = (date: string): string => date.replaceAll('-', '');

export const fetchSaltwaterNoaa = async ({
  stationId,
  targetDate,
}: FetchSaltwaterNoaaInput): Promise<SaltwaterNoaaResponse> => {
  const url = new URL('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter');
  url.searchParams.set('station', stationId);
  url.searchParams.set('product', 'predictions');
  url.searchParams.set('format', 'json');
  url.searchParams.set('begin_date', formatNoaaDate(targetDate));
  url.searchParams.set('end_date', formatNoaaDate(targetDate));
  url.searchParams.set('datum', 'MLLW');
  url.searchParams.set('time_zone', 'lst_ldt');
  url.searchParams.set('units', 'english');

  const response = await fetch(url.toString());
  const noaa = (await response.json()) as NoaaResponse;

  return {
    predictions: noaa.predictions ?? [],
  };
};
