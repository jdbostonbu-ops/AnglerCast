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
  'Before calling any tools, confirm the user date. If the user uses a relative date, propose the concrete date and wait for confirmation. Your only data sources for this freshwater agent are Open-Meteo Forecast and USGS. If the user asks for something outside those sources, say you do not have that data source, name Open-Meteo Forecast and USGS, and suggest an external source such as Google Maps.';

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
      messages,
    }),
  });

  const completion = (await response.json()) as FreshwaterChatCompletionResponse;

  return {
    response: completion.choices?.[0]?.message?.content ?? '',
  };
};
