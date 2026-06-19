import { sendPasswordResetEmail } from '@/lib/email';
import { requestPasswordReset } from '@/lib/passwordReset';

type ResetRequestBody = {
  email: string;
};

export async function POST(request: Request): Promise<Response> {
  const { email } = (await request.json()) as ResetRequestBody;

  const result = await requestPasswordReset({ email });

  if (result.ok) {
    await sendPasswordResetEmail({ email, code: result.code });
  }

  return Response.json({ ok: true }, { status: 200 });
}
