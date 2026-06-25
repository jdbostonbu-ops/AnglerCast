export const cosineSimilarity = (a: number[], b: number[]): number => {
  const dotProduct = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));

  return dotProduct / (magnitudeA * magnitudeB);
};

export const chunkMarkdownContent = (
  text: string,
  source: string,
): { source: string; text: string }[] =>
  text
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length >= 50)
    .map((paragraph) => ({
      source,
      text: paragraph,
    }));

export type EmbeddedChunk = {
  source: string;
  text: string;
  embedding: number[];
};

export type RankedChunk = EmbeddedChunk & { score: number };

export const retrieveTopChunks = (
  questionEmbedding: number[],
  chunks: EmbeddedChunk[],
  topK: number,
): RankedChunk[] =>
  chunks
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(questionEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
