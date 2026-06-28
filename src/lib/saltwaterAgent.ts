type RunSaltwaterAgentInput = {
  question: string;
};

type OpenAIChatCompletionResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

type SaltwaterAgentResult = {
  response: string;
};

const saltwaterAgentSystemPrompt =
  'You are the AnglerCast saltwater fishing agent. Before calling any tools, always confirm the user date: if the user uses a relative or implicit date, propose the concrete date you think they mean and wait for the user to confirm it. Do not call tools until the date is confirmed. Your only data sources are Open-Meteo Forecast, Open-Meteo Marine, OBIS, GBIF, USGS, and NOAA CO-OPS.';

export const runSaltwaterAgent = async ({
  question,
}: RunSaltwaterAgentInput): Promise<SaltwaterAgentResult> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: saltwaterAgentSystemPrompt,
        },
        {
          role: 'user',
          content: question,
        },
      ],
    }),
  });

  const completion = (await response.json()) as OpenAIChatCompletionResponse;

  return {
    response: completion.choices[0]?.message.content ?? '',
  };
};
