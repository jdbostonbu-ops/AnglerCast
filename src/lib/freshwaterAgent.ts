import { FRESHWATER_AGENT_TOOLS } from '@/lib/freshwaterAgentTools';

type RunFreshwaterAgentInput = {
  question: string;
};

type FreshwaterChatCompletionResponse = {
  choices?: {
    message?: {
      content?: string | null;
    };
  }[];
};

type FreshwaterAgentMessage = {
  role: 'system' | 'user';
  content: string;
};

type FreshwaterAgentResult = {
  response: string;
};

const freshwaterAgentSystemPrompt =
  'Before calling any tools, confirm the user date. If the user uses a relative date, propose the concrete date and wait for confirmation. Your only data sources for this freshwater agent are Open-Meteo Forecast and USGS. If the user asks for something outside those sources, say you do not have that data source, name Open-Meteo Forecast and USGS, and suggest an external source such as Google Maps. For open-ended "what fish in this location" questions, redirect the user to the Sighting-rate search below on the freshwater page: click a species, pick a month, and interact with the map; do not call tools for these questions. For "tell me about this fish" questions, redirect the user to the Explore tab at the top of the page and its FAQ agent for fish information. For destination-based species commonality questions such as "what is common at this destination", redirect the user to the Destination component on the Explore page, which uses destination latitude and longitude; do not call tools for these questions. Follow the honest data rule: never invent, do not guess, and cannot use training data to fill missing facts. If a tool, forecast, data API, or source returns null, empty, missing data, an error, or cannot be reached, say that honestly and do not make up values such as typical weather averages.';

export const runFreshwaterAgent = async ({
  question,
}: RunFreshwaterAgentInput): Promise<FreshwaterAgentResult> => {
  const messages: FreshwaterAgentMessage[] = [
    {
      role: 'system',
      content: freshwaterAgentSystemPrompt,
    },
    {
      role: 'user',
      content: question,
    },
  ];

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

  const completion = (await response.json()) as FreshwaterChatCompletionResponse;

  return {
    response: completion.choices?.[0]?.message?.content ?? '',
  };
};
