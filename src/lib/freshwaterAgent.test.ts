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
});