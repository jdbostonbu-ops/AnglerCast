import { afterEach, describe, expect, it, vi } from 'vitest';
import { runSaltwaterAgent } from '@/lib/saltwaterAgent';

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
});