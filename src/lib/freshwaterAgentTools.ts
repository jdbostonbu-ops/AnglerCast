type FreshwaterAgentToolProperty = {
  type: 'number' | 'string';
  description: string;
};

type FreshwaterAgentTool = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, FreshwaterAgentToolProperty>;
      required: string[];
    };
  };
};

const latitudeProperty = {
  type: 'number',
  description: 'Latitude for the freshwater fishing location.',
} satisfies FreshwaterAgentToolProperty;

const longitudeProperty = {
  type: 'number',
  description: 'Longitude for the freshwater fishing location.',
} satisfies FreshwaterAgentToolProperty;

const targetDateProperty = {
  type: 'string',
  description: 'Target date for the requested conditions in YYYY-MM-DD format.',
} satisfies FreshwaterAgentToolProperty;

const forecastParameters = {
  type: 'object',
  properties: {
    latitude: latitudeProperty,
    longitude: longitudeProperty,
    targetDate: targetDateProperty,
  },
  required: ['latitude', 'longitude', 'targetDate'],
} satisfies FreshwaterAgentTool['function']['parameters'];

const usgsParameters = {
  type: 'object',
  properties: {
    siteId: {
      type: 'string',
      description: 'USGS site identifier for the water station.',
    },
  },
  required: ['siteId'],
} satisfies FreshwaterAgentTool['function']['parameters'];

export const FRESHWATER_AGENT_TOOLS: FreshwaterAgentTool[] = [
  {
    type: 'function',
    function: {
      name: 'forecast',
      description: 'Fetch Open-Meteo Forecast conditions for a freshwater fishing question.',
      parameters: forecastParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'usgs',
      description: 'Fetch USGS water data for freshwater context.',
      parameters: usgsParameters,
    },
  },
];

type UnknownFreshwaterToolResult = {
  error: 'unknown_tool';
};

type FetchFreshwaterForecastInput = {
  latitude: number;
  longitude: number;
  targetDate: string;
};

type FreshwaterForecastResponse = {
  latitude?: number;
  longitude?: number;
  hourly?: {
    time?: string[];
    temperature_2m?: number[];
    wind_speed_10m?: number[];
    precipitation?: number[];
  };
};

type FetchFreshwaterUsgsInput = {
  siteId: string;
};

type FreshwaterUsgsTimeSeries = {
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

type FreshwaterUsgsApiResponse = {
  value?: {
    timeSeries?: FreshwaterUsgsTimeSeries[];
  };
};

type FreshwaterUsgsResponse = {
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

const readNumberArg = (args: Record<string, unknown>, key: string): number =>
  typeof args[key] === 'number' ? args[key] : 0;

const readStringArg = (args: Record<string, unknown>, key: string): string =>
  typeof args[key] === 'string' ? args[key] : '';

export const fetchFreshwaterForecast = async ({
  latitude,
  longitude,
  targetDate,
}: FetchFreshwaterForecastInput): Promise<FreshwaterForecastResponse> => {
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

  return (await response.json()) as FreshwaterForecastResponse;
};

export const fetchFreshwaterUsgs = async ({
  siteId,
}: FetchFreshwaterUsgsInput): Promise<FreshwaterUsgsResponse> => {
  const url = new URL('https://waterservices.usgs.gov/nwis/iv/');
  url.searchParams.set('format', 'json');
  url.searchParams.set('sites', siteId);

  const response = await fetch(url.toString());
  const usgs = (await response.json()) as FreshwaterUsgsApiResponse;
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

export const runFreshwaterTool = async (
  name: string,
  args: Record<string, unknown>,
): Promise<unknown | UnknownFreshwaterToolResult> => {
  if (name === 'forecast') {
    return fetchFreshwaterForecast({
      latitude: readNumberArg(args, 'latitude'),
      longitude: readNumberArg(args, 'longitude'),
      targetDate: readStringArg(args, 'targetDate'),
    });
  }

  if (name === 'usgs') {
    return fetchFreshwaterUsgs({
      siteId: readStringArg(args, 'siteId'),
    });
  }

  return { error: 'unknown_tool' };
};
