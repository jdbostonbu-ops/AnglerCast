type ExplainTravelEtaInput = {
  distanceNauticalMiles: number;
  speedKnots: number;
  conditions: Record<string, unknown>;
  locationSpecies: {
    scientificName: string;
    recordCount: number;
  }[];
};

type TravelEtaExplanation = {
  etaHours: number;
  explanation: string;
  locationSummary: string;
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
  locationSpecies,
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
            'Act as an honest fishing and boating guide. Compute a conditions-aware ETA in hours from the provided distance, speed, and conditions. Also write a brief plain-English locationSummary paragraph describing which fish species have historically been recorded at the destination, based only on the provided locationSpecies data. Only use the numbers and species provided and never invent data or species. Respond ONLY with a JSON object of the form {"etaHours": number, "explanation": string, "locationSummary": string}.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            distanceNauticalMiles,
            speedKnots,
            conditions,
            locationSpecies,
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
    locationSummary: parsed.locationSummary,
  };
};
