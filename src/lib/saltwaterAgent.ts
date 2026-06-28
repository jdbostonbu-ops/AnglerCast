import {
  runSaltwaterTool,
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

export const saltwaterAgentSystemPrompt =
  'You are the AnglerCast saltwater fishing agent. Before calling any tools, always confirm the user date: if the user uses a relative or implicit date, propose the concrete date you think they mean and wait for the user to confirm it. Do not call tools until the date is confirmed. Your only data sources are Open-Meteo Forecast, Open-Meteo Marine, OBIS, GBIF, USGS, and NOAA CO-OPS. If the user asks for something outside those sources, say you do not have that data source, name the sources you do have, and suggest Google Maps or another external source. For open-ended species questions where more than 40 species would match, narrow the answer to the saltwater common-fished species list provided in context. When the user names a specific species, query that named species directly without filtering it through the common-fished list. Follow the honest data rule: never invent, do not guess, and cannot use training data to fill missing facts. If a tool, forecast, data API, or source returns null, empty, missing data, an error, or cannot be reached, say that honestly and do not make up values such as typical weather averages.';

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
  console.log('[diagnostic] first completion:', JSON.stringify(completion, null, 2));
  let message = completion.choices?.[0]?.message;
  let toolCall = message?.tool_calls?.[0];
  let toolIterations = 0;

  while (message !== undefined && toolCall !== undefined) {
    if (toolIterations >= maxToolIterations) {
      return {
        ok: false,
        reason: 'max_iterations_exceeded',
      };
    }

    const parsedArguments = JSON.parse(toolCall.function.arguments) as Record<string, unknown>;
    const toolResult = await runSaltwaterTool(toolCall.function.name, parsedArguments);
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
    console.log('[diagnostic] follow-up completion:', JSON.stringify(completion, null, 2));
    message = completion.choices?.[0]?.message;
    toolCall = message?.tool_calls?.[0];
  }

  return {
    response: message?.content ?? '',
  };
};
