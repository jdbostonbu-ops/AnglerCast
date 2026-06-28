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
