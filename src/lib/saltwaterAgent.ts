import {
  fetchSaltwaterForecast,
  fetchSaltwaterMarine,
  fetchSaltwaterNoaa,
  SALTWATER_AGENT_TOOLS,
} from '@/lib/saltwaterAgentTools';

type RunSaltwaterAgentInput = {
  question: string;
  history?: unknown[];
};

type OpenAIChatCompletionResponse = {
  choices: {
    message: {
      content: string | null;
      tool_calls?: {
        id: string;
        type: 'function';
        function: {
          name: string;
          arguments: string;
        };
      }[];
    };
  }[];
};

type SaltwaterAgentResult =
  | {
      response: string;
    }
  | {
      ok: false;
      reason: 'max_iterations_exceeded';
    };

const saltwaterAgentSystemPrompt =
  'You are the AnglerCast saltwater fishing agent. Before calling any tools, always confirm the user date: if the user uses a relative or implicit date, propose the concrete date you think they mean and wait for the user to confirm it. Do not call tools until the date is confirmed. Your only data sources are Open-Meteo Forecast, Open-Meteo Marine, OBIS, GBIF, USGS, and NOAA CO-OPS. If the user asks for something outside those sources, say you do not have that data source, name the sources you do have, and suggest Google Maps or another external source. For open-ended species questions where more than 40 species would match, narrow the answer to the saltwater common-fished species list provided in context. When the user names a specific species, query that named species directly without filtering it through the common-fished list.';

const maxToolIterations = 8;

type SaltwaterAgentMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_call_id?: string;
  tool_calls?: {
    id: string;
    type: 'function';
    function: {
      name: string;
      arguments: string;
    };
  }[];
};

type SaltwaterAgentHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const isSaltwaterAgentHistoryMessage = (
  message: unknown,
): message is SaltwaterAgentHistoryMessage => {
  if (typeof message !== 'object' || message === null) {
    return false;
  }

  const candidate = message as { role?: unknown; content?: unknown };

  return (
    (candidate.role === 'user' || candidate.role === 'assistant') &&
    typeof candidate.content === 'string'
  );
};

const requestOpenAI = async (
  messages: SaltwaterAgentMessage[],
): Promise<OpenAIChatCompletionResponse> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      tools: SALTWATER_AGENT_TOOLS,
      messages,
    }),
  });

  return (await response.json()) as OpenAIChatCompletionResponse;
};

const parseLocationDateToolArguments = (
  rawArguments: string,
): { latitude: number; longitude: number; targetDate: string } => {
  const parsedArguments = JSON.parse(rawArguments) as {
    latitude?: unknown;
    longitude?: unknown;
    targetDate?: unknown;
  };

  return {
    latitude: typeof parsedArguments.latitude === 'number' ? parsedArguments.latitude : 0,
    longitude: typeof parsedArguments.longitude === 'number' ? parsedArguments.longitude : 0,
    targetDate: typeof parsedArguments.targetDate === 'string' ? parsedArguments.targetDate : '',
  };
};

const parseStationDateToolArguments = (
  rawArguments: string,
): { stationId: string; targetDate: string } => {
  const parsedArguments = JSON.parse(rawArguments) as {
    stationId?: unknown;
    targetDate?: unknown;
  };

  return {
    stationId: typeof parsedArguments.stationId === 'string' ? parsedArguments.stationId : '',
    targetDate: typeof parsedArguments.targetDate === 'string' ? parsedArguments.targetDate : '',
  };
};

const runSupportedTool = async (
  toolName: string,
  rawArguments: string,
): Promise<unknown> => {
  if (toolName === 'fetchSaltwaterForecast') {
    return fetchSaltwaterForecast(parseLocationDateToolArguments(rawArguments));
  }

  if (toolName === 'fetchSaltwaterMarine') {
    return fetchSaltwaterMarine(parseLocationDateToolArguments(rawArguments));
  }

  if (toolName === 'fetchSaltwaterNoaa') {
    return fetchSaltwaterNoaa(parseStationDateToolArguments(rawArguments));
  }

  return { error: 'unknown_tool' };
};

export const runSaltwaterAgent = async ({
  question,
  history = [],
}: RunSaltwaterAgentInput): Promise<SaltwaterAgentResult> => {
  const messages: SaltwaterAgentMessage[] = [
    {
      role: 'system',
      content: saltwaterAgentSystemPrompt,
    },
    ...history.filter(isSaltwaterAgentHistoryMessage),
    {
      role: 'user',
      content: question,
    },
  ];

  let completion = await requestOpenAI(messages);
  let message = completion.choices[0]?.message;
  let toolCall = message?.tool_calls?.[0];
  let toolIterations = 0;

  while (message !== undefined && toolCall !== undefined) {
    if (toolIterations >= maxToolIterations) {
      return {
        ok: false,
        reason: 'max_iterations_exceeded',
      };
    }

    const toolResult = await runSupportedTool(
      toolCall.function.name,
      toolCall.function.arguments,
    );
    toolIterations += 1;

    messages.push(
      {
        role: 'assistant',
        content: message.content,
        tool_calls: message.tool_calls,
      },
      {
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult),
      },
    );

    completion = await requestOpenAI(messages);
    message = completion.choices[0]?.message;
    toolCall = message?.tool_calls?.[0];
  }

  return {
    response: message?.content ?? '',
  };
};
