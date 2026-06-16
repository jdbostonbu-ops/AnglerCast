import { afterEach, describe, expect, it, vi } from 'vitest';
import { explainSightingRate } from '@/lib/sightingRateExplanation';

describe('explainSightingRate', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('asks OpenAI to explain the computed sighting rate facts', async () => {
    const explanation = 'Striped Bass had 3 of 12 nearby historical records in June.';
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: explanation,
            },
          },
        ],
      }),
    } as Response);

    vi.stubGlobal('fetch', fetchMock);

    const result = await explainSightingRate({
      species: 'Morone saxatilis',
      latitude: 41.063500987654,
      longitude: -71.862800987654,
      month: 6,
      sightingRate: {
        rate: 0.25,
        matchingMonthCount: 3,
        totalCount: 12,
        confidence: 'moderate',
      },
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

    expect(requestBodyText).toContain('Striped Bass');
    expect(requestBodyText).toContain('June');
    expect(requestBodyText).toContain('3');
    expect(requestBodyText).toContain('12');
    expect(result).toBe(explanation);
  });
});
