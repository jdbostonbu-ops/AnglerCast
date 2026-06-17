import { getSessionUserId } from '@/lib/session';

export async function GET(): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ userId: null }, { status: 401 });
  }

  return Response.json({ userId }, { status: 200 });
}
