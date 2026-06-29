import {
  FRESHWATER_AGENT_TOOLS,
  runFreshwaterTool,
} from '@/lib/freshwaterAgentTools';
import { getSpeciesForWaterType } from '@/lib/species';

type RunFreshwaterAgentInput = {
  question: string;
  history?: unknown[];
};

type FreshwaterChatCompletionResponse = {
  choices?: {
    message?: {
      content?: string | null;
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

type FreshwaterAgentMessage = {
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

type FreshwaterAgentResult =
  | {
      response: string;
    }
  | {
      ok: false;
      reason: 'max_iterations_exceeded';
    };

type FreshwaterAgentHistoryMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const freshwaterAgentSystemPrompt =
  'Before calling any tools, confirm the user date. If the user uses a relative date, propose the concrete date and wait for confirmation. Your only data sources for this freshwater agent are Open-Meteo Forecast and USGS. If the user asks for something outside those sources, say you do not have that data source, name Open-Meteo Forecast and USGS, and suggest an external source such as Google Maps. For open-ended "what fish in this location" questions, redirect the user to the Sighting-rate search below on the freshwater page: click a species, pick a month, and interact with the map; do not call tools for these questions. For "tell me about this fish" questions, redirect the user to the Explore tab at the top of the page and its FAQ agent for fish information. For destination-based species commonality questions such as "what is common at this destination", redirect the user to the Destination component on the Explore page, which uses destination latitude and longitude; do not call tools for these questions. Follow the honest data rule: never invent, do not guess, and cannot use training data to fill missing facts. If a tool, forecast, data API, or source returns null, empty, missing data, an error, or cannot be reached, say that honestly and do not make up values such as typical weather averages.';

const maxToolIterations = 8;

const getFreshwaterSpeciesContext = (): string => {
  const speciesList = getSpeciesForWaterType('freshwater')
    .map((species) => `${species.commonName} (${species.scientificName})`)
    .join(', ');

  return `Freshwater common-fished species list: ${speciesList}`;
};

const isFreshwaterAgentHistoryMessage = (
  message: unknown,
): message is FreshwaterAgentHistoryMessage => {
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
  messages: FreshwaterAgentMessage[],
): Promise<FreshwaterChatCompletionResponse> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      tools: FRESHWATER_AGENT_TOOLS,
      messages,
    }),
  });

  return (await response.json()) as FreshwaterChatCompletionResponse;
};

export const runFreshwaterAgent = async ({
  question,
  history = [],
}: RunFreshwaterAgentInput): Promise<FreshwaterAgentResult> => {
  const messages: FreshwaterAgentMessage[] = [
    {
      role: 'system',
      content: freshwaterAgentSystemPrompt,
    },
    {
      role: 'system',
      content: getFreshwaterSpeciesContext(),
    },
    ...history.filter(isFreshwaterAgentHistoryMessage),
    {
      role: 'user',
      content: question,
    },
  ];

  let completion = await requestOpenAI(messages);
  let message = completion.choices?.[0]?.message;
  let toolCalls = message?.tool_calls ?? [];
  let toolIterations = 0;

  while (message !== undefined && toolCalls.length > 0) {
    if (toolIterations >= maxToolIterations) {
      return {
        ok: false,
        reason: 'max_iterations_exceeded',
      };
    }

    const toolMessages: FreshwaterAgentMessage[] = [];

    for (const toolCall of toolCalls) {
      const parsedArguments = JSON.parse(toolCall.function.arguments) as Record<string, unknown>;
      const toolResult = await runFreshwaterTool(toolCall.function.name, parsedArguments);

      toolMessages.push({
        role: 'tool',
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolResult),
      });
    }

    toolIterations += 1;

    messages.push(
      {
        role: 'assistant',
        content: message.content ?? null,
        tool_calls: message.tool_calls,
      },
      ...toolMessages,
    );

    completion = await requestOpenAI(messages);
    message = completion.choices?.[0]?.message;
    toolCalls = message?.tool_calls ?? [];
  }

  return {
    response: message?.content ?? '',
  };
};
