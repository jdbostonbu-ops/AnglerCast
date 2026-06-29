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

type FetchFreshwaterUsgsInput = {
  siteId: string;
};

const readNumberArg = (args: Record<string, unknown>, key: string): number =>
  typeof args[key] === 'number' ? args[key] : 0;

const readStringArg = (args: Record<string, unknown>, key: string): string =>
  typeof args[key] === 'string' ? args[key] : '';

export const fetchFreshwaterForecast = async (
  _input: FetchFreshwaterForecastInput,
): Promise<unknown> => {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('temperature_unit', 'fahrenheit');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('precipitation_unit', 'inch');

  const response = await fetch(url.toString());

  return response.json();
};

export const fetchFreshwaterUsgs = async (
  _input: FetchFreshwaterUsgsInput,
): Promise<unknown> => {
  const response = await fetch('https://waterservices.usgs.gov/nwis/iv/');

  return response.json();
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
