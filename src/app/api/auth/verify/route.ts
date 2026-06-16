import { verifyEmailVerificationCodeAndActivateAccount } from '@/lib/emailVerification';

type VerifyRequestBody = {
  email: string;
  code: string;
};

export async function POST(request: Request): Promise<Response> {
  const { email, code } = (await request.json()) as VerifyRequestBody;
  const user = await verifyEmailVerificationCodeAndActivateAccount({
    email,
    enteredCode: code,
  });

  if ('isVerified' in user && user.isVerified === false) {
    return Response.json(user, { status: 400 });
  }

  return Response.json(
    {
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      },
    },
    { status: 200 },
  );
}
