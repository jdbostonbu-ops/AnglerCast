import { fetchSaltwaterNoaa, SALTWATER_AGENT_TOOLS } from '@/lib/saltwaterAgentTools';

type RunSaltwaterAgentInput = {
  question: string;
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

type SaltwaterAgentResult = {
  response: string;
};

const saltwaterAgentSystemPrompt =
  'You are the AnglerCast saltwater fishing agent. Before calling any tools, always confirm the user date: if the user uses a relative or implicit date, propose the concrete date you think they mean and wait for the user to confirm it. Do not call tools until the date is confirmed. Your only data sources are Open-Meteo Forecast, Open-Meteo Marine, OBIS, GBIF, USGS, and NOAA CO-OPS. If the user asks for something outside those sources, say you do not have that data source, name the sources you do have, and suggest Google Maps or another external source. For open-ended species questions where more than 40 species would match, narrow the answer to the saltwater common-fished species list provided in context. When the user names a specific species, query that named species directly without filtering it through the common-fished list.';

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

const parseNoaaToolArguments = (
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

export const runSaltwaterAgent = async ({
  question,
}: RunSaltwaterAgentInput): Promise<SaltwaterAgentResult> => {
  const messages: SaltwaterAgentMessage[] = [
    {
      role: 'system',
      content: saltwaterAgentSystemPrompt,
    },
    {
      role: 'user',
      content: question,
    },
  ];

  const completion = await requestOpenAI(messages);
  const message = completion.choices[0]?.message;
  const toolCall = message?.tool_calls?.[0];

  if (toolCall !== undefined && toolCall.function.name === 'fetchSaltwaterNoaa') {
    const toolResult = await fetchSaltwaterNoaa(
      parseNoaaToolArguments(toolCall.function.arguments),
    );
    const followUpCompletion = await requestOpenAI([
      ...messages,
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
    ]);

    return {
      response: followUpCompletion.choices[0]?.message.content ?? '',
    };
  }

  return {
    response: message?.content ?? '',
  };
};
