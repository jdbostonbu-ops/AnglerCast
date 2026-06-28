import { runSaltwaterAgent } from '@/lib/saltwaterAgent';

type SaltwaterChatRequestBody = {
  question: string;
};

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as SaltwaterChatRequestBody;
  const result = await runSaltwaterAgent({ question: body.question });

  return Response.json(result, { status: 200 });
}
