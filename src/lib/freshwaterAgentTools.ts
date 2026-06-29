type FreshwaterAgentTool = {
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
} satisfies FreshwaterAgentTool['function']['parameters'];

export const FRESHWATER_AGENT_TOOLS: FreshwaterAgentTool[] = [
  {
    type: 'function',
    function: {
      name: 'forecast',
      description: 'Fetch Open-Meteo Forecast conditions for a freshwater fishing question.',
      parameters: emptyParameters,
    },
  },
  {
    type: 'function',
    function: {
      name: 'usgs',
      description: 'Fetch USGS water data for freshwater context.',
      parameters: emptyParameters,
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
  const response = await fetch('https://api.open-meteo.com/v1/forecast');

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
