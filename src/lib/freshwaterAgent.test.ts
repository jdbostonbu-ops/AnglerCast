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
});