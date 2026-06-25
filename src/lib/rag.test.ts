import { describe, expect, it } from 'vitest';
import { cosineSimilarity } from '@/lib/rag';
import { chunkMarkdownContent } from '@/lib/rag';

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
