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

  it('instructs the model to describe the counts as records, not a fish count', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await explainSightingRate({
      species: 'Morone saxatilis',
      latitude: 41.0,
      longitude: -71.0,
      month: 6,
      sightingRate: {
        rate: 0.25,
        matchingMonthCount: 3,
        totalCount: 12,
        confidence: 'moderate',
      },
    });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/records/i);
    expect(systemMessage?.content).toMatch(/not.*fish|never.*fish count|occurrence records/i);
  });

  it('instructs the model not to refer to itself or announce its role', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await explainSightingRate({
      species: 'Morone saxatilis',
      latitude: 41.0,
      longitude: -71.0,
      month: 6,
      sightingRate: {
        rate: 0.25,
        matchingMonthCount: 3,
        totalCount: 12,
        confidence: 'moderate',
      },
    });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/do not (refer to|mention|describe) yourself|do not announce your role|never refer to yourself/i);
  });

  it('instructs the model to use an upbeat tone with a casual greeting and encouraging close', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await explainSightingRate({
      species: 'Morone saxatilis',
      latitude: 41.0,
      longitude: -71.0,
      month: 6,
      sightingRate: {
        rate: 0.25,
        matchingMonthCount: 3,
        totalCount: 12,
        confidence: 'moderate',
      },
    });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/Alright, folks/i);
    expect(systemMessage?.content).toMatch(/Happy fishing/i);
    expect(systemMessage?.content).toMatch(/upbeat|playful|fun/i);
  });
});
