import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRunFreshwaterAgent } = vi.hoisted(() => ({
  mockRunFreshwaterAgent: vi.fn(),
}));

vi.mock('@/lib/freshwaterAgent', () => ({
  runFreshwaterAgent: mockRunFreshwaterAgent,
}));

import { POST } from '@/app/api/freshwater-chat/route';

const buildRequest = (body: unknown): Request =>
  new Request('http://localhost/api/freshwater-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/freshwater-chat', () => {
  beforeEach(() => {
    mockRunFreshwaterAgent.mockReset();
  });

  it('RED 38.23 — calls runFreshwaterAgent with the question and returns its response', async () => {
    const agentResponse = 'The Connecticut River at Hartford is currently at 3.42 ft.';
    mockRunFreshwaterAgent.mockResolvedValue({ response: agentResponse });

    const response = await POST(
      buildRequest({ question: 'What is the river height at site 01184000?' }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(mockRunFreshwaterAgent).toHaveBeenCalledTimes(1);
    expect(mockRunFreshwaterAgent).toHaveBeenCalledWith(
      expect.objectContaining({ question: 'What is the river height at site 01184000?' }),
    );
    expect(data.response).toBe(agentResponse);
  });

  it('RED 38.24 — returns 400 with no agent call when question is missing, empty, or whitespace only', async () => {
    const responseMissing = await POST(buildRequest({}));
    const responseEmpty = await POST(buildRequest({ question: '' }));
    const responseWhitespace = await POST(buildRequest({ question: '   \n  ' }));

    expect(responseMissing.status).toBe(400);
    expect(responseEmpty.status).toBe(400);
    expect(responseWhitespace.status).toBe(400);
    expect(mockRunFreshwaterAgent).not.toHaveBeenCalled();
  });
});