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

  it('REFACTOR 37.45 — redirects open-ended species questions to the Sighting-rate search instead of narrowing to a list', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'What fish can I find in Boston?' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/sighting.?rate|sighting search/i);
    expect(systemContent).not.toMatch(/narrow.{0,80}(species|list)/i);
  });

  it('REFACTOR 37.46 — redirects specific-species questions to the Explore tab instead of querying OBIS or GBIF directly', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'Tell me about Bluefish.' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/explore tab|FAQ/i);
    expect(systemContent).not.toMatch(/query.{0,80}(species|named|directly)/i);
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
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValue({ error: 'no data for location' });

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
                name: 'marine',
                arguments: JSON.stringify({ latitude: 39.8283, longitude: -98.5795, targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
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
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: { role: string; content?: string }[];
    };
    const toolMessage = secondCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();

    runSaltwaterToolSpy.mockRestore();
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
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValue({
        predictions: [
          { t: '2026-06-28 07:48', v: '3.924' },
          { t: '2026-06-28 13:54', v: '0.704' },
        ],
      });

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
                      name: 'noaa',
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
          choices: [{ message: { content: 'High tide is at 7:48 AM, low tide at 1:54 PM.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'When is high tide today at Providence?' }) as { response: string };

    expect(fetchMock).toHaveBeenCalledTimes(2);

    expect(runSaltwaterToolSpy).toHaveBeenCalledWith('noaa', {
      stationId: '8443970',
      targetDate: '2026-06-28',
    });

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: { role: string; content?: string; tool_call_id?: string }[];
    };
    const toolMessage = secondCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
    expect(toolMessage?.tool_call_id).toBe('call_1');

    expect(result.response).toBe('High tide is at 7:48 AM, low tide at 1:54 PM.');

    runSaltwaterToolSpy.mockRestore();
  });
  
  it('chains multiple tool_calls in sequence and returns the final synthesis', async () => {
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValueOnce({
        latitude: 41.48979,
        longitude: -71.294586,
        hourly: { time: ['2026-06-28T00:00'], temperature_2m: [19.8], wind_speed_10m: [8.9], precipitation: [0] },
      })
      .mockResolvedValueOnce({
        latitude: 41.458336,
        longitude: -71.20833,
        hourly: { time: ['2026-06-28T00:00'], wave_height: [0.58], wave_direction: [162], wave_period: [6.75], sea_surface_temperature: [19.9] },
      })
      .mockResolvedValueOnce({
        predictions: [{ t: '2026-06-28 07:48', v: '3.924' }, { t: '2026-06-28 13:54', v: '0.704' }],
      });

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
                name: 'forecast',
                arguments: JSON.stringify({ latitude: 41.4901, longitude: -71.3128, targetDate: '2026-06-28' }),
              },
            }],
          }}],
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
                name: 'marine',
                arguments: JSON.stringify({ latitude: 41.4901, longitude: -71.3128, targetDate: '2026-06-28' }),
              },
            }],
          }}],
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
                name: 'noaa',
                arguments: JSON.stringify({ stationId: '8443970', targetDate: '2026-06-28' }),
              },
            }],
          }}],
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

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(runSaltwaterToolSpy).toHaveBeenCalledTimes(3);

    const dispatchedToolNames = runSaltwaterToolSpy.mock.calls.map((c) => c[0]);
    expect(dispatchedToolNames).toEqual(['forecast', 'marine', 'noaa']);

    expect(result.response).toBe('Saturday looks great. Calm seas, light wind, high tide at 7:48 AM.');

    runSaltwaterToolSpy.mockRestore();
  });

it('stops after max iterations when OpenAI never returns a final answer', async () => {
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValue({ predictions: [{ t: '2026-06-28 07:48', v: '3.924' }] });

    const toolCallJson = {
      choices: [{ message: {
        content: null,
        tool_calls: [{
          id: 'call_x',
          type: 'function',
          function: {
            name: 'noaa',
            arguments: JSON.stringify({ stationId: '8443970', targetDate: '2026-06-28' }),
          },
        }],
      }}],
    };

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => toolCallJson,
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'When is high tide?' }) as { ok?: boolean; reason?: string; response?: string };

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('max_iterations_exceeded');

    runSaltwaterToolSpy.mockRestore();
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
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValue(null);

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
                name: 'marine',
                arguments: JSON.stringify({ latitude: 39.8283, longitude: -98.5795, targetDate: '2026-06-28' }),
              },
            }],
          }}],
        }),
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
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: { role: string; content?: string }[];
    };
    const toolMessage = secondCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
    expect(toolMessage?.content).toBeDefined();

    runSaltwaterToolSpy.mockRestore();
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

  it('RED 37.34 — dispatches tool_calls through the shared runSaltwaterTool, not a private duplicate', async () => {
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValue({ ok: true });

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  role: 'assistant',
                  content: null,
                  tool_calls: [
                    {
                      id: 'call_1',
                      type: 'function',
                      function: {
                        name: 'forecast',
                        arguments: JSON.stringify({
                          latitude: 42.3601,
                          longitude: -71.0589,
                          targetDate: '2026-07-04',
                        }),
                      },
                    },
                  ],
                },
              },
            ],
          }),
        ),
      )
      .mockResolvedValueOnce(
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

    await runSaltwaterAgent({ question: 'weather in Boston July 4 2026?' });

    expect(runSaltwaterToolSpy).toHaveBeenCalledTimes(1);
    expect(runSaltwaterToolSpy).toHaveBeenCalledWith('forecast', {
      latitude: 42.3601,
      longitude: -71.0589,
      targetDate: '2026-07-04',
    });

    runSaltwaterToolSpy.mockRestore();
  });

  it('RED 37.41 — does not crash when the OpenAI response has no choices field', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        error: {
          message: 'rate limit exceeded',
          type: 'rate_limit_error',
        },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'What fish can I find in Boston on July 4 2026?' });

    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('RED 37.42 — injects the saltwater common-fished species list into the OpenAI request context', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runSaltwaterAgent({ question: 'What fish can I find in Boston?' });

    const fetchCall = fetchMock.mock.calls[0];
    const requestInit = fetchCall?.[1] as RequestInit;
    const requestBody = JSON.parse(requestInit.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };

    const allMessageContent = requestBody.messages
      .map((m) => m.content ?? '')
      .join(' ');

    expect(allMessageContent).toContain('Striped Bass');
    expect(allMessageContent).toContain('Bluefish');
    expect(allMessageContent).toContain('Atlantic Cod');
  });

  it('RED 37.43 — processes all tool_calls in a single assistant message before requesting the next OpenAI completion', async () => {
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockImplementation(async (name: string) => {
        if (name === 'obis') {
          return { source: 'obis', records: [] };
        }
        if (name === 'gbif') {
          return { source: 'gbif', records: [] };
        }
        return { error: 'unknown_tool' };
      });

    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: 'call_obis_1',
                  type: 'function',
                  function: {
                    name: 'obis',
                    arguments: JSON.stringify({ latitude: 42.3601, longitude: -71.0589 }),
                  },
                },
                {
                  id: 'call_gbif_1',
                  type: 'function',
                  function: {
                    name: 'gbif',
                    arguments: JSON.stringify({ latitude: 42.3601, longitude: -71.0589 }),
                  },
                },
              ],
            },
          }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { role: 'assistant', content: 'Common species observed near Boston include Striped Bass and Bluefish.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'What fish can I find in Boston?' }) as { response: string };

    expect(runSaltwaterToolSpy).toHaveBeenCalledTimes(2);
    const dispatchedNames = runSaltwaterToolSpy.mock.calls.map((c) => c[0]);
    expect(dispatchedNames).toContain('obis');
    expect(dispatchedNames).toContain('gbif');

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const secondRequestBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null; tool_call_id?: string }>;
    };
    const toolMessages = secondRequestBody.messages.filter((m) => m.role === 'tool');
    expect(toolMessages.length).toBe(2);
    const toolCallIds = toolMessages.map((m) => m.tool_call_id);
    expect(toolCallIds).toContain('call_obis_1');
    expect(toolCallIds).toContain('call_gbif_1');

    expect(result.response).toBe('Common species observed near Boston include Striped Bass and Bluefish.');

    runSaltwaterToolSpy.mockRestore();
  });

  it('RED 37.44 — redirects species questions to in-app components instead of dispatching OBIS or GBIF', async () => {
    const toolsModule = await import('@/lib/saltwaterAgentTools');
    const runSaltwaterToolSpy = vi
      .spyOn(toolsModule, 'runSaltwaterTool')
      .mockResolvedValue({ records: [] });

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            role: 'assistant',
            content: 'OBIS has tens of millions of records, so AnglerCast curated 40 commonly fished saltwater species. To see species in this area, use the Sighting-rate search below — click a fish on the list, pick a month, and interact with the map. For information about a specific species, click the Explore tab at the top and ask our FAQ agent.',
          },
        }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runSaltwaterAgent({ question: 'What fish can I find in Boston, MA on July 4 2026?' }) as { response: string };

    expect(runSaltwaterToolSpy).not.toHaveBeenCalled();

    const firstRequestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = firstRequestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/OBIS|GBIF/i);
    expect(systemContent).toMatch(/sighting.?rate|sighting search/i);
    expect(systemContent).toMatch(/explore tab|FAQ/i);
    expect(systemContent).toMatch(/do not call|never call|don't call|redirect/i);

    expect(result.response).toContain('Sighting');
    expect(result.response).toContain('Explore');

    runSaltwaterToolSpy.mockRestore();
  });
});