export const cosineSimilarity = (a: number[], b: number[]): number => {
  const dotProduct = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));

  return dotProduct / (magnitudeA * magnitudeB);
};

export const chunkMarkdownContent = (
  text: string,
  source: string,
): { source: string; text: string }[] => {
  let currentHeading: string | null = null;

  return text.split(/\n\s*\n+/).reduce<{ source: string; text: string }[]>(
    (chunks, paragraph) => {
      const trimmedParagraph = paragraph.trim();
      const headingMatch = trimmedParagraph.match(/^#+\s+(.+)$/m);

      if (headingMatch !== null && trimmedParagraph.startsWith(headingMatch[0])) {
        currentHeading = headingMatch[1].trim();
        return chunks;
      }

      if (trimmedParagraph.length < 50) {
        return chunks;
      }

      chunks.push({
        source,
        text:
          currentHeading === null
            ? trimmedParagraph
            : `${currentHeading}\n\n${trimmedParagraph}`,
      });

      return chunks;
    },
    [],
  );
};

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
