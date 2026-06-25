import OpenAI from 'openai';
import { loadFaqDocuments } from '@/lib/faqLoader';
import {
  chunkMarkdownContent,
  retrieveTopChunks,
  type EmbeddedChunk,
} from '@/lib/rag';

const RELEVANCE_THRESHOLD = 0.2;

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as { question?: unknown };
  const question = body.question;

  if (typeof question !== 'string' || question.trim() === '') {
    return Response.json({ error: 'Question is required.' }, { status: 400 });
  }

  const documents = loadFaqDocuments();
  const titleBySource = new Map(
    documents.map((document) => [document.source, document.title]),
  );
  const chunks = documents.flatMap((document) =>
    chunkMarkdownContent(document.text, document.source),
  );

  const openai = new OpenAI();
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: [question, ...chunks.map((chunk) => chunk.text)],
  });
  const questionEmbedding = embeddingResponse.data[0]?.embedding ?? [];
  const embeddedChunks: EmbeddedChunk[] = chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddingResponse.data[index + 1]?.embedding ?? [],
  }));
  const rankedChunks = retrieveTopChunks(questionEmbedding, embeddedChunks, 3);

  if (
    rankedChunks.length === 0 ||
    rankedChunks[0].score < RELEVANCE_THRESHOLD
  ) {
    return Response.json(
      {
        answer: "I don't know based on the provided documents.",
        sources: [],
      },
      { status: 200 },
    );
  }

  const context = rankedChunks
    .map((chunk) => {
      const title = titleBySource.get(chunk.source) ?? chunk.source;

      return `From ${title}:\n${chunk.text}`;
    })
    .join('\n\n');
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          "Answer using ONLY the provided context. Keep the answer concise and practical for an angler. If the answer is not in the retrieved context, say exactly: I don't know based on the provided documents.",
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });
  const seenSources = new Set<string>();
  const sources = rankedChunks
    .map((chunk) => titleBySource.get(chunk.source) ?? chunk.source)
    .filter((title) => {
      if (seenSources.has(title)) {
        return false;
      }

      seenSources.add(title);
      return true;
    });
  const answer = completion.choices[0]?.message.content ?? '';

  return Response.json({ answer, sources }, { status: 200 });
}
