import { describe, expect, it } from 'vitest';
import { chunkMarkdownContent, cosineSimilarity, retrieveTopChunks } from '@/lib/rag';

describe('cosineSimilarity', () => {
  it('returns 1 for identical vectors', () => {
    const vector = [1, 2, 3];

    const result = cosineSimilarity(vector, vector);

    expect(result).toBeCloseTo(1, 10);
  });

  it('returns 0 for orthogonal vectors', () => {
    const vectorA = [1, 0];
    const vectorB = [0, 1];

    const result = cosineSimilarity(vectorA, vectorB);

    expect(result).toBeCloseTo(0, 10);
  });

  it('returns -1 for opposite vectors', () => {
    const vectorA = [1, 2, 3];
    const vectorB = [-1, -2, -3];

    const result = cosineSimilarity(vectorA, vectorB);

    expect(result).toBeCloseTo(-1, 10);
  });
});



describe('chunkMarkdownContent', () => {
  it('splits text on double newlines into separate chunks', () => {
    const text = 'First paragraph that is long enough to be kept as a chunk in the output.\n\nSecond paragraph that is also long enough to be kept as a chunk in the output.';

    const result = chunkMarkdownContent(text, 'test.md');

    expect(result).toHaveLength(2);
    expect(result[0].text).toBe(
      'First paragraph that is long enough to be kept as a chunk in the output.',
    );
    expect(result[1].text).toBe(
      'Second paragraph that is also long enough to be kept as a chunk in the output.',
    );
  });

  it('drops paragraphs shorter than 50 characters after trimming', () => {
    const text =
      'This paragraph is definitely longer than fifty characters and should be kept.\n\nToo short.';

    const result = chunkMarkdownContent(text, 'test.md');

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe(
      'This paragraph is definitely longer than fifty characters and should be kept.',
    );
  });

  it('preserves the source identifier on every chunk', () => {
    const text =
      'First chunk that is long enough to survive the minimum-length filter applied during chunking.\n\nSecond chunk that is long enough to survive the minimum-length filter applied during chunking.';

    const result = chunkMarkdownContent(text, 'faq/tides.md');

    expect(result).toHaveLength(2);
    expect(result[0].source).toBe('faq/tides.md');
    expect(result[1].source).toBe('faq/tides.md');
  });

  it('returns an empty array for empty input', () => {
    const result = chunkMarkdownContent('', 'test.md');

    expect(result).toEqual([]);
  });
});

describe('retrieveTopChunks', () => {
  it('returns topK chunks sorted by cosine similarity, highest first', () => {
    const questionEmbedding = [1, 0, 0];
    const chunks = [
      { source: 'orthogonal.md', text: 'orthogonal chunk', embedding: [0, 1, 0] },
      { source: 'identical.md', text: 'identical chunk', embedding: [1, 0, 0] },
      { source: 'opposite.md', text: 'opposite chunk', embedding: [-1, 0, 0] },
    ];

    const result = retrieveTopChunks(questionEmbedding, chunks, 2);

    expect(result).toHaveLength(2);
    expect(result[0].source).toBe('identical.md');
    expect(result[1].source).toBe('orthogonal.md');
  });

  it('attaches a numeric score to each returned chunk', () => {
    const questionEmbedding = [1, 0];
    const chunks = [
      { source: 'a.md', text: 'chunk a', embedding: [1, 0] },
      { source: 'b.md', text: 'chunk b', embedding: [0, 1] },
    ];

    const result = retrieveTopChunks(questionEmbedding, chunks, 2);

    expect(result[0].score).toBeCloseTo(1, 10);
    expect(result[1].score).toBeCloseTo(0, 10);
  });

  it('returns at most topK chunks even when more chunks are provided', () => {
    const questionEmbedding = [1, 0];
    const chunks = [
      { source: 'a.md', text: 'chunk a', embedding: [1, 0] },
      { source: 'b.md', text: 'chunk b', embedding: [0.9, 0.1] },
      { source: 'c.md', text: 'chunk c', embedding: [0.8, 0.2] },
      { source: 'd.md', text: 'chunk d', embedding: [0.7, 0.3] },
    ];

    const result = retrieveTopChunks(questionEmbedding, chunks, 2);

    expect(result).toHaveLength(2);
  });

  it('returns an empty array when no chunks are provided', () => {
    const result = retrieveTopChunks([1, 0, 0], [], 5);

    expect(result).toEqual([]);
  });
});

describe('chunkMarkdownContent — heading context', () => {
  it('prepends the most recent heading to each chunk that follows it', () => {
    const text =
      '# Top Heading\n\n## Apple Trees\n\nThe fruit ripens in autumn and is best picked early in the morning before the sun warms it up too much.\n\n## Orange Trees\n\nThe fruit can be harvested year-round in warm climates but tends to be sweetest in cooler months when the sugar content rises.';

    const result = chunkMarkdownContent(text, 'test.md');

    expect(result).toHaveLength(2);
    expect(result[0].text).toContain('Apple Trees');
    expect(result[0].text).toContain('The fruit ripens in autumn');
    expect(result[1].text).toContain('Orange Trees');
    expect(result[1].text).toContain('The fruit can be harvested year-round');
  });

  it('uses the top-level H1 when there is no intermediate H2', () => {
    const text =
      '# Personal Gear Guide\n\nWide-brim hat, polarized sunglasses, sunscreen, and long sleeves on bright days are the basics for any fishing trip outdoors.';

    const result = chunkMarkdownContent(text, 'gear.md');

    expect(result).toHaveLength(1);
    expect(result[0].text).toContain('Personal Gear Guide');
    expect(result[0].text).toContain('Wide-brim hat');
  });

  it('updates the heading context when a new H2 appears', () => {
    const text =
      '## First Heading\n\nThis paragraph is under the first heading and contains content that is long enough to be kept as a chunk.\n\n## Second Heading\n\nThis paragraph is under the second heading and also contains content that is long enough to be kept as a chunk.';

    const result = chunkMarkdownContent(text, 'test.md');

    expect(result).toHaveLength(2);
    expect(result[0].text).toContain('First Heading');
    expect(result[0].text).not.toContain('Second Heading');
    expect(result[1].text).toContain('Second Heading');
    expect(result[1].text).not.toContain('First Heading');
  });
});