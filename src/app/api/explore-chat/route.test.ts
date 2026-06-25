import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockEmbeddingsCreate = vi.fn();
const mockChatCompletionsCreate = vi.fn();

vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    embeddings: { create: mockEmbeddingsCreate },
    chat: { completions: { create: mockChatCompletionsCreate } },
  })),
}));

vi.mock('@/lib/faqLoader', () => ({
  loadFaqDocuments: vi.fn(),
}));

import { POST } from '@/app/api/explore-chat/route';
import { loadFaqDocuments } from '@/lib/faqLoader';

const buildRequest = (body: unknown): Request =>
  new Request('http://localhost/api/explore-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/explore-chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('instructs the model to ground answers in the retrieved context and decline if the answer is not present', async () => {
    vi.mocked(loadFaqDocuments).mockReturnValue([
      {
        source: 'sighting-rate.md',
        title: 'How Sighting Rate Works',
        text: 'Sighting rate measures how often a species is recorded in a given month at a given location, computed from real GBIF occurrence records.',
      },
    ]);

    mockEmbeddingsCreate.mockResolvedValue({
      data: [{ embedding: [1, 0, 0] }, { embedding: [1, 0, 0] }],
    });

    mockChatCompletionsCreate.mockResolvedValue({
      choices: [{ message: { content: 'A grounded answer.' } }],
    });

    await POST(buildRequest({ question: 'What is sighting rate?' }));

    const chatCallArgs = mockChatCompletionsCreate.mock.calls[0][0];
    const systemMessage = chatCallArgs.messages.find(
      (message: { role: string }) => message.role === 'system',
    );

    expect(systemMessage).toBeDefined();
    expect(systemMessage.content).toMatch(
      /I don't know based on the provided documents/,
    );
  });

  it('returns an answer and source titles for a valid question', async () => {
    vi.mocked(loadFaqDocuments).mockReturnValue([
      {
        source: 'sighting-rate.md',
        title: 'How Sighting Rate Works',
        text: 'Sighting rate measures how often a species is recorded in a given month at a given location, computed from real GBIF occurrence records.',
      },
      {
        source: 'tide-charts.md',
        title: 'Reading Tide Charts',
        text: 'Tide charts show predicted high and low tide heights so you can plan fishing trips around the best moving water and conditions.',
      },
    ]);

    mockEmbeddingsCreate.mockResolvedValue({
      data: [
        { embedding: [1, 0, 0] },
        { embedding: [0, 1, 0] },
        { embedding: [1, 0, 0] },
      ],
    });

    mockChatCompletionsCreate.mockResolvedValue({
      choices: [
        { message: { content: 'Sighting rate measures how often a species is recorded.' } },
      ],
    });

    const response = await POST(buildRequest({ question: 'What is sighting rate?' }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(typeof data.answer).toBe('string');
    expect(data.answer.length).toBeGreaterThan(0);
    expect(Array.isArray(data.sources)).toBe(true);
    expect(data.sources).toContain('How Sighting Rate Works');
  });
});