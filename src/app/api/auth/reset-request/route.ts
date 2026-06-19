import { requestPasswordReset } from '@/lib/passwordReset';

type ResetRequestBody = {
  email: string;
};

export async function POST(request: Request): Promise<Response> {
  const { email } = (await request.json()) as ResetRequestBody;

  await requestPasswordReset({ email });

  return Response.json({ ok: true }, { status: 200 });
}
