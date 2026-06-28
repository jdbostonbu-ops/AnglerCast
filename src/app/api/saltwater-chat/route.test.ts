import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRunSaltwaterAgent } = vi.hoisted(() => ({
  mockRunSaltwaterAgent: vi.fn(),
}));

vi.mock('@/lib/saltwaterAgent', () => ({
  runSaltwaterAgent: mockRunSaltwaterAgent,
}));

import { POST } from '@/app/api/saltwater-chat/route';

const buildRequest = (body: unknown): Request =>
  new Request('http://localhost/api/saltwater-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/saltwater-chat', () => {
  beforeEach(() => {
    mockRunSaltwaterAgent.mockReset();
  });

  it('calls runSaltwaterAgent with the question and returns its response', async () => {
    const agentResponse = 'High tide is at 7:48 AM, low tide at 1:54 PM.';
    mockRunSaltwaterAgent.mockResolvedValue({ response: agentResponse });

    const response = await POST(
      buildRequest({ question: 'When is high tide today at Providence?' }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(mockRunSaltwaterAgent).toHaveBeenCalledTimes(1);
    expect(mockRunSaltwaterAgent).toHaveBeenCalledWith(
      expect.objectContaining({ question: 'When is high tide today at Providence?' }),
    );
    expect(data.response).toBe(agentResponse);
  });
});