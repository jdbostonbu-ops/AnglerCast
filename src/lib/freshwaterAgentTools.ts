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
