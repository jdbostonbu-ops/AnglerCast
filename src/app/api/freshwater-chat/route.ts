import { runFreshwaterAgent } from '@/lib/freshwaterAgent';

type FreshwaterChatRequestBody = {
  question?: unknown;
  history?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as FreshwaterChatRequestBody;
  const question = body.question;

  if (typeof question !== 'string' || question.trim() === '') {
    return Response.json({ error: 'Question is required.' }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history : undefined;

  try {
    const result = await runFreshwaterAgent({ question, history });

    return Response.json(result, { status: 200 });
  } catch {
    return Response.json({ error: 'Freshwater agent failed.' }, { status: 500 });
  }
}
