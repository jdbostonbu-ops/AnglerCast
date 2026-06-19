import { getCommonName } from '@/lib/species';

type SightingRateConfidence = 'low' | 'moderate' | 'high';

type SightingRate = {
  rate: number;
  matchingMonthCount: number;
  totalCount: number;
  confidence: SightingRateConfidence;
};

type ExplainSightingRateInput = {
  species: string;
  latitude: number;
  longitude: number;
  month: number;
  sightingRate: SightingRate;
};

type OpenAIChatCompletionResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonthName = (month: number): string => monthNames[month - 1] ?? String(month);

export const explainSightingRate = async ({
  species,
  latitude,
  longitude,
  month,
  sightingRate,
}: ExplainSightingRateInput): Promise<string> => {
  const commonName = getCommonName(species);
  const monthName = getMonthName(month);
  const percentage = sightingRate.rate * 100;

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
            'Write in a warm, casual tone like an experienced angler talking to a friend. Do not refer to yourself or describe your role; give the information directly. Name the fish by its common name, say the month by name, state the percentage and the sample size, explain what the confidence level means in plain terms, and always remind that this shows where fish were recorded historically, never a guarantee of where they will be. totalCount and matchingMonthCount are counts of occurrence records, not a count of fish; refer to them as records, and never describe them as a number of fish caught or counted. Only use the numbers provided. Never invent data.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            commonName,
            monthName,
            matchingMonthCount: sightingRate.matchingMonthCount,
            totalCount: sightingRate.totalCount,
            rate: sightingRate.rate,
            percentage,
            confidence: sightingRate.confidence,
            latitude,
            longitude,
          }),
        },
      ],
    }),
  });

  const completion = (await response.json()) as OpenAIChatCompletionResponse;

  return completion.choices[0]?.message.content ?? '';
};
