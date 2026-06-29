import { runFreshwaterAgent } from '@/lib/freshwaterAgent';

type FreshwaterChatRequestBody = {
  question: string;
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as FreshwaterChatRequestBody;
  const result = await runFreshwaterAgent({ question: body.question });

  return Response.json(result, { status: 200 });
}
