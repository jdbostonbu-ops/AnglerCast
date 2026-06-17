type ExplainTravelEtaInput = {
  distanceNauticalMiles: number;
  speedKnots: number;
  conditions: Record<string, unknown>;
};

type TravelEtaExplanation = {
  etaHours: number;
  explanation: string;
};

type OpenAIChatCompletionResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export const explainTravelEta = async ({
  distanceNauticalMiles,
  speedKnots,
  conditions,
}: ExplainTravelEtaInput): Promise<TravelEtaExplanation> => {
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
          content:
            'Act as an honest fishing and boating guide. Compute a conditions-aware ETA in hours from the provided distance, speed, and conditions. Only use the numbers provided and never invent data. Respond ONLY with a JSON object of the form {"etaHours": number, "explanation": string}.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            distanceNauticalMiles,
            speedKnots,
            conditions,
          }),
        },
      ],
    }),
  });

  const completion = (await response.json()) as OpenAIChatCompletionResponse;
  const content = completion.choices[0]?.message.content ?? '{}';
  const parsed = JSON.parse(content) as TravelEtaExplanation;

  return {
    etaHours: parsed.etaHours,
    explanation: parsed.explanation,
  };
};
