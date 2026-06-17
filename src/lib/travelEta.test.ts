import { afterEach, describe, expect, it, vi } from 'vitest';
import { explainTravelEta } from '@/lib/travelEta';

describe('explainTravelEta', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('asks OpenAI to estimate travel ETA from provided distance, speed, and conditions', async () => {
    const content =
      '{"etaHours": 2.5, "explanation": "Calm seas, about two and a half hours.", "locationSummary": "Striped bass and bluefish are the most-recorded species here."}';
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content,
            },
          },
        ],
      }),
    } as Response);

    vi.stubGlobal('fetch', fetchMock);

    const result = await explainTravelEta({
      distanceNauticalMiles: 25,
      speedKnots: 10,
      conditions: {
        waveHeight: 0.8,
        windSpeed: 6,
        current: 'slack',
      },
      locationSpecies: [
        { scientificName: 'Morone saxatilis', recordCount: 1200 },
        { scientificName: 'Pomatomus saltatrix', recordCount: 640 },
      ],
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.any(Object),
    );

    const requestInit = fetchMock.mock.calls[0]?.[1];
    expect(requestInit).toBeDefined();
    expect(typeof requestInit?.body).toBe('string');

    const requestBody = JSON.parse(requestInit?.body as string) as unknown;
    const requestBodyText = JSON.stringify(requestBody);

    expect(requestBodyText).toContain('25');
    expect(requestBodyText).toContain('Morone saxatilis');
    expect(requestBodyText).toContain('10');
    expect(requestBodyText).toContain('0.8');
    expect(requestBodyText).toContain('6');
    expect(requestBodyText).toContain('slack');
    expect(result).toEqual({
      etaHours: 2.5,
      explanation: 'Calm seas, about two and a half hours.',
      locationSummary: 'Striped bass and bluefish are the most-recorded species here.',
    });
  });
});
