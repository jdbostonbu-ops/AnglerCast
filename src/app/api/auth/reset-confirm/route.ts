import { resetPasswordWithCode } from '@/lib/passwordReset';

type ResetConfirmRequestBody = {
  email: string;
  code: string;
  newPassword: string;
};

export async function POST(request: Request): Promise<Response> {
  const { email, code, newPassword } = (await request.json()) as ResetConfirmRequestBody;
  const result = await resetPasswordWithCode({
    email,
    enteredCode: code,
    newPassword,
  });

  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        reason: result.reason,
      },
      { status: 400 },
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}
