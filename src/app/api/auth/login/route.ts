import { checkLoginCredentials } from '@/lib/login';
import { createSession } from '@/lib/session';

type LoginRequestBody = {
  email: string;
  password: string;
};

const getFailureStatus = (reason: string): number => {
  if (reason === 'email_not_verified') {
    return 403;
  }

  return 401;
};

export async function POST(request: Request): Promise<Response> {
  const { email, password } = (await request.json()) as LoginRequestBody;
  const result = await checkLoginCredentials({
    email,
    password,
  });

  if (!result.isAuthenticated) {
    return Response.json(result, { status: getFailureStatus(result.reason) });
  }

  await createSession(result.user.id);

  return Response.json(
    {
      user: result.user,
    },
    { status: 200 },
  );
}
