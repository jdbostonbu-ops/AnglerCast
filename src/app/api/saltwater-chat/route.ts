import { runSaltwaterAgent } from '@/lib/saltwaterAgent';

type SaltwaterChatRequestBody = {
  question?: unknown;
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as SaltwaterChatRequestBody;
  const question = body.question;

  if (typeof question !== 'string' || question.trim() === '') {
    return Response.json({ error: 'Question is required.' }, { status: 400 });
  }

  const result = await runSaltwaterAgent({ question });

  return Response.json(result, { status: 200 });
}
