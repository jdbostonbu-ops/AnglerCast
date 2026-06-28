import { afterEach, describe, expect, it, vi } from 'vitest';
import { runSaltwaterAgent, saltwaterAgentSystemPrompt  } from '@/lib/saltwaterAgent';

describe('runSaltwaterAgent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('instructs the model to confirm the user date before calling any tools', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Did you mean Saturday, June 28?' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Where should I fish this Saturday?' });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    expect(requestInit).toBeDefined();
    expect(typeof requestInit?.body).toBe('string');

    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/confirm.*date|propose.*date|wait.*confirm/i);
  });

it('declares exactly the six APIs in the system prompt as the only data sources', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Where should I fish?' });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toContain('Open-Meteo Forecast');
    expect(systemMessage?.content).toContain('Open-Meteo Marine');
    expect(systemMessage?.content).toContain('OBIS');
    expect(systemMessage?.content).toContain('GBIF');
    expect(systemMessage?.content).toContain('USGS');
    expect(systemMessage?.content).toContain('NOAA CO-OPS');
  });

  it('instructs the model to decline out-of-scope requests and suggest an external source', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Where should I fish?' });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/do not have.*data source|don't have.*data source/i);
    expect(systemMessage?.content).toMatch(/Google Maps|external source/i);
  });

  it('instructs the model to narrow open-ended species queries to the common-fished saltwater list when more than 40 species would match', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Where should I fish?' });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/40/);
    expect(systemMessage?.content).toMatch(/common[- ]?fished|commonly fished/i);
  });

  it('instructs the model to query a specific named species directly without filtering', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Where should I fish?' });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
    };
    const systemMessage = requestBody.messages.find((m) => m.role === 'system');
    expect(systemMessage).toBeDefined();
    expect(systemMessage?.content).toMatch(/specific species|named species|named by the user/i);
  });

  it('returns the clarifying question text and invokes no tools when OpenAI returns text only', async () => {
    const clarification = 'Did you mean Saturday, June 28?';
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: clarification } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'Where should I fish this Saturday?' }) as { response: string };

    expect(result.response).toBe(clarification);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrls = fetchMock.mock.calls.map((c) => (typeof c[0] === 'string' ? c[0] : c[0].toString()));
    expect(calledUrls[0]).toContain('api.openai.com');
  });

  it('recovers when a tool function returns null or an error shape and continues to a final answer', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: {
            content: null,
            tool_calls: [{
              id: 'call_m',
              type: 'function',
              function: {
                name: 'fetchSaltwaterMarine',
                arguments: JSON.stringify({ latitude: 39.8283, longitude: -98.5795, targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'no data for location' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'I do not have marine data for that inland location.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'Marine conditions in Kansas?' }) as { response: string };

    expect(result.response).toBe('I do not have marine data for that inland location.');
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const thirdCallBody = JSON.parse(fetchMock.mock.calls[2]?.[1]?.body as string) as {
      messages: { role: string; content?: string }[];
    };
    const toolMessage = thirdCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
  });

  it('sends the user question and the tool registry to OpenAI', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Where should I fish this Saturday?' });

    const requestInit = fetchMock.mock.calls[0]?.[1];
    const requestBody = JSON.parse(requestInit?.body as string) as {
      messages: { role: string; content: string }[];
      tools?: unknown[];
    };

    const userMessage = requestBody.messages.find((m) => m.role === 'user');
    expect(userMessage).toBeDefined();
    expect(userMessage?.content).toBe('Where should I fish this Saturday?');

    expect(requestBody.tools).toBeDefined();
    expect(Array.isArray(requestBody.tools)).toBe(true);
    expect(requestBody.tools).toHaveLength(6);
  });

  it('runs a single tool_call, feeds the result back to OpenAI, and returns the final answer', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: null,
                tool_calls: [
                  {
                    id: 'call_1',
                    type: 'function',
                    function: {
                      name: 'fetchSaltwaterNoaa',
                      arguments: JSON.stringify({ stationId: '8443970', targetDate: '2026-06-28' }),
                    },
                  },
                ],
              },
            },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          predictions: [
            { t: '2026-06-28 07:48', v: '3.924' },
            { t: '2026-06-28 13:54', v: '0.704' },
          ],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'High tide is at 7:48 AM, low tide at 1:54 PM.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'When is high tide today at Providence?' }) as { response: string };

    expect(fetchMock).toHaveBeenCalledTimes(3);

    const secondUrl = fetchMock.mock.calls[1]?.[0];
    expect(typeof secondUrl).toBe('string');
    expect(secondUrl as string).toContain('tidesandcurrents.noaa.gov');

    const thirdCallBody = JSON.parse(fetchMock.mock.calls[2]?.[1]?.body as string) as {
      messages: { role: string; content?: string; tool_call_id?: string }[];
    };
    const toolMessage = thirdCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
    expect(toolMessage?.tool_call_id).toBe('call_1');

    expect(result.response).toBe('High tide is at 7:48 AM, low tide at 1:54 PM.');
  });

  it('chains multiple tool_calls in sequence and returns the final synthesis', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: {
            content: null,
            tool_calls: [{
              id: 'call_1',
              type: 'function',
              function: {
                name: 'fetchSaltwaterForecast',
                arguments: JSON.stringify({ latitude: 41.4901, longitude: -71.3128, targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 41.48979, longitude: -71.294586,
          hourly: { time: ['2026-06-28T00:00'], temperature_2m: [19.8], wind_speed_10m: [8.9], precipitation: [0] },
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: {
            content: null,
            tool_calls: [{
              id: 'call_2',
              type: 'function',
              function: {
                name: 'fetchSaltwaterMarine',
                arguments: JSON.stringify({ latitude: 41.4901, longitude: -71.3128, targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          latitude: 41.458336, longitude: -71.20833,
          hourly: { time: ['2026-06-28T00:00'], wave_height: [0.58], wave_direction: [162], wave_period: [6.75], sea_surface_temperature: [19.9] },
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: {
            content: null,
            tool_calls: [{
              id: 'call_3',
              type: 'function',
              function: {
                name: 'fetchSaltwaterNoaa',
                arguments: JSON.stringify({ stationId: '8443970', targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          predictions: [{ t: '2026-06-28 07:48', v: '3.924' }, { t: '2026-06-28 13:54', v: '0.704' }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'Saturday looks great. Calm seas, light wind, high tide at 7:48 AM.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'Where should I fish on Saturday, June 28?' }) as { response: string };

    expect(fetchMock).toHaveBeenCalledTimes(7);

    const calledUrls = fetchMock.mock.calls.map((c) => (typeof c[0] === 'string' ? c[0] : c[0].toString()));
    expect(calledUrls.some((u) => u.includes('api.open-meteo.com'))).toBe(true);
    expect(calledUrls.some((u) => u.includes('marine-api.open-meteo.com'))).toBe(true);
    expect(calledUrls.some((u) => u.includes('tidesandcurrents.noaa.gov'))).toBe(true);

    expect(result.response).toBe('Saturday looks great. Calm seas, light wind, high tide at 7:48 AM.');
  });

it('stops after max iterations when OpenAI never returns a final answer', async () => {
    const toolCallJson = {
      choices: [{ message: {
        content: null,
        tool_calls: [{
          id: 'call_x',
          type: 'function',
          function: {
            name: 'fetchSaltwaterNoaa',
            arguments: JSON.stringify({ stationId: '8443970', targetDate: '2026-06-28' }),
          },
        }],
      }}],
    };
    const toolResultJson = { predictions: [{ t: '2026-06-28 07:48', v: '3.924' }] };
    const fallbackFinalJson = { choices: [{ message: { content: 'fallback final answer' } }] };

    const fetchMock = vi.fn<typeof fetch>();
    for (let i = 0; i < 15; i++) {
      fetchMock
        .mockResolvedValueOnce({ ok: true, json: async () => toolCallJson } as Response)
        .mockResolvedValueOnce({ ok: true, json: async () => toolResultJson } as Response);
    }
    fetchMock.mockResolvedValue({ ok: true, json: async () => fallbackFinalJson } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'When is high tide?' }) as { ok?: boolean; reason?: string; response?: string };

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('max_iterations_exceeded');
  });

  it('returns the honest decline and invokes no tools when the question is fully out of scope', async () => {
    const decline = "I don't have a data source for restaurants. I have access to weather, marine, species, and tide data. For restaurants, try Google Maps.";
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: decline } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: "What's a good vegetarian restaurant near Boston Harbor?" }) as { response: string };

    expect(result.response).toBe(decline);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const calledUrls = fetchMock.mock.calls.map((c) => (typeof c[0] === 'string' ? c[0] : c[0].toString()));
    expect(calledUrls[0]).toContain('api.openai.com');
  });

  it('handles a tool returning null and continues the loop to a final answer', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: {
            content: null,
            tool_calls: [{
              id: 'call_m',
              type: 'function',
              function: {
                name: 'fetchSaltwaterMarine',
                arguments: JSON.stringify({ latitude: 39.8283, longitude: -98.5795, targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'no data for location' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: 'I do not have marine data for that inland location.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'Marine conditions in Kansas?' }) as { response: string };

    expect(result.response).toBe('I do not have marine data for that inland location.');
    expect(fetchMock).toHaveBeenCalledTimes(3);

    const thirdCallBody = JSON.parse(fetchMock.mock.calls[2]?.[1]?.body as string) as {
      messages: { role: string; content?: string }[];
    };
    const toolMessage = thirdCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
    expect(toolMessage?.content).toBeDefined();
  });

  it('RED 37.30 — passes prior history into the OpenAI messages array before the new question', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: { role: 'assistant', content: 'final answer' },
            },
          ],
        }),
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    const history = [
      { role: 'user' as const, content: 'first question' },
      { role: 'assistant' as const, content: 'first reply' },
    ];

    await runSaltwaterAgent({
      question: 'follow-up question',
      history,
    });

    const fetchCall = fetchMock.mock.calls[0];
    const requestInit = fetchCall[1] as RequestInit;
    const requestBody = JSON.parse(requestInit.body as string) as {
      messages: Array<{ role: string; content: string }>;
    };
    const messages = requestBody.messages;

    const firstUserIndex = messages.findIndex(
      (m) => m.role === 'user' && m.content === 'first question',
    );
    const firstAssistantIndex = messages.findIndex(
      (m) => m.role === 'assistant' && m.content === 'first reply',
    );
    const newQuestionIndex = messages.findIndex(
      (m) => m.role === 'user' && m.content === 'follow-up question',
    );

    expect(firstUserIndex).toBeGreaterThanOrEqual(0);
    expect(firstAssistantIndex).toBeGreaterThan(firstUserIndex);
    expect(newQuestionIndex).toBeGreaterThan(firstAssistantIndex);
  });

  it('RED 37.33 — system prompt instructs the agent never to invent data when a tool fails', () => {
    expect(saltwaterAgentSystemPrompt).toMatch(
      /never invent|do not fabricate|do not (make up|invent)|cannot use training data|honest data|do not guess/i,
    );
    expect(saltwaterAgentSystemPrompt).toMatch(
      /(tool|forecast|data|api).{0,40}(fail|error|null|empty|missing|cannot|unable)/i,
    );
  });
});