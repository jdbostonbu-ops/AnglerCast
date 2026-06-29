import { runFreshwaterAgent } from '@/lib/freshwaterAgent';

type FreshwaterChatRequestBody = {
  question?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as FreshwaterChatRequestBody;
  const question = body.question;

  if (typeof question !== 'string' || question.trim() === '') {
    return Response.json({ error: 'Question is required.' }, { status: 400 });
  }

  const result = await runFreshwaterAgent({ question });

  return Response.json(result, { status: 200 });
}
