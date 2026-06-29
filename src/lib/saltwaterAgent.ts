import {
  runSaltwaterTool,
  SALTWATER_AGENT_TOOLS,
} from '@/lib/saltwaterAgentTools';
import { getSpeciesForWaterType } from '@/lib/species';

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
  'You are the AnglerCast saltwater fishing agent. Before calling any tools, always confirm the user date: if the user uses a relative or implicit date, propose the concrete date you think they mean and wait for the user to confirm it. Do not call tools until the date is confirmed. Your only data sources are Open-Meteo Forecast, Open-Meteo Marine, OBIS, GBIF, USGS, and NOAA CO-OPS. If the user asks for something outside those sources, say you do not have that data source, name the sources you do have, and suggest Google Maps or another external source. For species questions, redirect to in-app components and do not call OBIS or GBIF: OBIS contains millions of records and OBIS or GBIF queries can be too large for the context window. AnglerCast curated 40 commonly fished saltwater species in the provided context. For "what fish in this location" questions, point to the Sighting-rate search below on the saltwater page: click a species, pick a month, and interact with the map. For "tell me about this species" questions, point to the Explore tab and its FAQ agent. Follow the honest data rule: never invent, do not guess, and cannot use training data to fill missing facts. If a tool, forecast, data API, or source returns null, empty, missing data, an error, or cannot be reached, say that honestly and do not make up values such as typical weather averages.';

const maxToolIterations = 8;

const getSaltwaterSpeciesContext = (): string => {
  const speciesList = getSpeciesForWaterType('saltwater')
    .map((species) => `${species.commonName} (${species.scientificName})`)
    .join(', ');

  return `Saltwater common-fished species list: ${speciesList}`;
};

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
    {
      role: 'system',
      content: getSaltwaterSpeciesContext(),
    },
    ...history.filter(isSaltwaterAgentHistoryMessage),
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

    const toolMessages: SaltwaterAgentMessage[] = [];

    for (const toolCall of toolCalls) {
      const parsedArguments = JSON.parse(toolCall.function.arguments) as Record<string, unknown>;
      const toolResult = await runSaltwaterTool(toolCall.function.name, parsedArguments);

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
        content: message.content,
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
