import { afterEach, describe, expect, it, vi } from 'vitest';
import { runFreshwaterAgent } from '@/lib/freshwaterAgent';

describe('runFreshwaterAgent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('RED 38.1 — instructs the model to confirm the user date before calling any tools', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'Did you mean Saturday, June 28?' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runFreshwaterAgent({ question: 'Where should I fish this weekend?' }) as { response: string };

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/confirm.{0,40}date|propose.{0,40}date/i);
    expect(result.response).toContain('Did you mean Saturday, June 28?');
  });

  it('RED 38.2 — declares exactly two data sources (Open-Meteo Forecast and USGS) in the system prompt as the only data sources for this agent', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'What sources do you use?' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/open[-\s]?meteo.{0,20}forecast/i);
    expect(systemContent).toMatch(/usgs/i);

    expect(systemContent).not.toMatch(/open[-\s]?meteo.{0,20}marine/i);
    expect(systemContent).not.toMatch(/\bOBIS\b/);
    expect(systemContent).not.toMatch(/\bGBIF\b/);
    expect(systemContent).not.toMatch(/NOAA.{0,20}CO-OPS/i);
  });

  it('RED 38.3 — instructs the model to decline out-of-scope requests and suggest an external source', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'What sources do you use?' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/do not have|don't have|outside.{0,40}sources/i);
    expect(systemContent).toMatch(/google maps|external source/i);
  });

  it('RED 38.4 — redirects open-ended species questions to the Sighting-rate search on the freshwater page instead of dispatching a tool', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'Use the Sighting-rate search below.' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'What fish can I find in the Connecticut River?' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/sighting.?rate|sighting search/i);
    expect(systemContent).toMatch(/freshwater page/i);
    expect(systemContent).toMatch(/do not call|never call|don't call|redirect/i);
  });

  it('RED 38.5 — redirects specific-species questions to the Explore tab FAQ agent instead of dispatching a tool', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'Check the Explore tab.' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'Tell me about Brook Trout.' });

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

  it('RED 38.6 — redirects destination-based species commonality questions to the Destination component on the Explore page instead of dispatching a tool', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'Use the Destination component on the Explore page.' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'What fish are common at Lake Champlain?' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/destination/i);
    expect(systemContent).toMatch(/explore page/i);
  });

  it('RED 38.7 — system prompt enforces the honest data rule and tool failure handling', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'What sources do you use?' });

    const requestBody = JSON.parse(fetchMock.mock.calls[0]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null }>;
    };
    const systemContent = requestBody.messages
      .filter((m) => m.role === 'system')
      .map((m) => m.content ?? '')
      .join(' ');

    expect(systemContent).toMatch(/never invent|do not fabricate|do not (make up|invent)|cannot use training data|honest data|do not guess/i);
    expect(systemContent).toMatch(/(tool|forecast|data|api).{0,80}(fail|error|null|empty|missing|cannot|unable)/i);
  });

  it('RED 38.14 — sends the user question and the tool registry to OpenAI', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'ok' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await runFreshwaterAgent({ question: 'Where should I fish this Saturday?' });

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
    expect(requestBody.tools).toHaveLength(2);
  });

  it('RED 38.15 — returns the clarifying question text and invokes no tools when OpenAI returns text only', async () => {
    const toolsModule = await import('@/lib/freshwaterAgentTools');
    const runFreshwaterToolSpy = vi
      .spyOn(toolsModule, 'runFreshwaterTool')
      .mockResolvedValue({ ok: true });

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { role: 'assistant', content: 'Did you mean Saturday, June 28?' } }],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runFreshwaterAgent({ question: 'Where should I fish this weekend?' }) as { response: string };

    expect(result.response).toBe('Did you mean Saturday, June 28?');
    expect(runFreshwaterToolSpy).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    runFreshwaterToolSpy.mockRestore();
  });

  it('RED 38.16 — runs a single tool_call, feeds the result back to OpenAI, and returns the final answer', async () => {
    const toolsModule = await import('@/lib/freshwaterAgentTools');
    const runFreshwaterToolSpy = vi
      .spyOn(toolsModule, 'runFreshwaterTool')
      .mockResolvedValue({
        siteName: 'CONNECTICUT RIVER AT HARTFORD, CT',
        latitude: 41.7659,
        longitude: -72.6709,
        parameters: [
          { variableName: 'Gage height, feet', unit: 'ft', latestValue: '3.42', latestTime: '2026-06-28T12:00:00.000-04:00' },
        ],
      });

    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [{
                id: 'call_1',
                type: 'function',
                function: {
                  name: 'usgs',
                  arguments: JSON.stringify({ siteId: '01184000' }),
                },
              }],
            },
          }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { role: 'assistant', content: 'The Connecticut River at Hartford is currently at 3.42 ft.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runFreshwaterAgent({ question: 'What is the river height at site 01184000?' }) as { response: string };

    expect(runFreshwaterToolSpy).toHaveBeenCalledTimes(1);
    expect(runFreshwaterToolSpy).toHaveBeenCalledWith('usgs', { siteId: '01184000' });

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: Array<{ role: string; content?: string; tool_call_id?: string }>;
    };
    const toolMessage = secondCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
    expect(toolMessage?.tool_call_id).toBe('call_1');

    expect(result.response).toBe('The Connecticut River at Hartford is currently at 3.42 ft.');

    runFreshwaterToolSpy.mockRestore();
  });

  it('RED 38.17 — processes all tool_calls in a single assistant message before requesting the next OpenAI completion', async () => {
    const toolsModule = await import('@/lib/freshwaterAgentTools');
    const runFreshwaterToolSpy = vi
      .spyOn(toolsModule, 'runFreshwaterTool')
      .mockImplementation(async (name: string) => {
        if (name === 'forecast') {
          return { source: 'forecast', hourly: { temperature_2m: [70] } };
        }
        if (name === 'usgs') {
          return { source: 'usgs', parameters: [] };
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
                  id: 'call_forecast_1',
                  type: 'function',
                  function: {
                    name: 'forecast',
                    arguments: JSON.stringify({ latitude: 41.7659, longitude: -72.6709, targetDate: '2026-06-28' }),
                  },
                },
                {
                  id: 'call_usgs_1',
                  type: 'function',
                  function: {
                    name: 'usgs',
                    arguments: JSON.stringify({ siteId: '01184000' }),
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
          choices: [{ message: { role: 'assistant', content: 'Conditions look good with mild temperatures and stable river levels.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runFreshwaterAgent({ question: 'What are the weather and river conditions today at site 01184000?' }) as { response: string };

    expect(runFreshwaterToolSpy).toHaveBeenCalledTimes(2);
    const dispatchedNames = runFreshwaterToolSpy.mock.calls.map((c) => c[0]);
    expect(dispatchedNames).toContain('forecast');
    expect(dispatchedNames).toContain('usgs');

    expect(fetchMock).toHaveBeenCalledTimes(2);

    const secondRequestBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: Array<{ role: string; content: string | null; tool_call_id?: string }>;
    };
    const toolMessages = secondRequestBody.messages.filter((m) => m.role === 'tool');
    expect(toolMessages.length).toBe(2);
    const toolCallIds = toolMessages.map((m) => m.tool_call_id);
    expect(toolCallIds).toContain('call_forecast_1');
    expect(toolCallIds).toContain('call_usgs_1');

    expect(result.response).toBe('Conditions look good with mild temperatures and stable river levels.');

    runFreshwaterToolSpy.mockRestore();
  });

  it('RED 38.18 — stops after max iterations when OpenAI never returns a final answer', async () => {
    const toolsModule = await import('@/lib/freshwaterAgentTools');
    const runFreshwaterToolSpy = vi
      .spyOn(toolsModule, 'runFreshwaterTool')
      .mockResolvedValue({ parameters: [] });

    const toolCallJson = {
      choices: [{ message: {
        content: null,
        tool_calls: [{
          id: 'call_x',
          type: 'function',
          function: {
            name: 'usgs',
            arguments: JSON.stringify({ siteId: '01184000' }),
          },
        }],
      }}],
    };

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => toolCallJson,
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runFreshwaterAgent({ question: 'What is the river height?' }) as { ok?: boolean; reason?: string; response?: string };

    expect(result.ok).toBe(false);
    expect(result.reason).toBe('max_iterations_exceeded');

    runFreshwaterToolSpy.mockRestore();
  });

  it('RED 38.19 — recovers when a tool returns null or an error shape and continues to a final answer', async () => {
    const toolsModule = await import('@/lib/freshwaterAgentTools');
    const runFreshwaterToolSpy = vi
      .spyOn(toolsModule, 'runFreshwaterTool')
      .mockResolvedValue(null);

    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [{
                id: 'call_u',
                type: 'function',
                function: {
                  name: 'usgs',
                  arguments: JSON.stringify({ siteId: '00000000' }),
                },
              }],
            },
          }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { role: 'assistant', content: 'I could not retrieve USGS data for that site.' } }],
        }),
      } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await runFreshwaterAgent({ question: 'What is the river height at site 00000000?' }) as { response: string };

    expect(result.response).toBe('I could not retrieve USGS data for that site.');
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const secondCallBody = JSON.parse(fetchMock.mock.calls[1]?.[1]?.body as string) as {
      messages: Array<{ role: string; content?: string; tool_call_id?: string }>;
    };
    const toolMessage = secondCallBody.messages.find((m) => m.role === 'tool');
    expect(toolMessage).toBeDefined();
    expect(toolMessage?.content).toBeDefined();

    runFreshwaterToolSpy.mockRestore();
  });
});