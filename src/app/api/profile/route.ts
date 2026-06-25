import { saveProfileImage, saveProfileName } from '@/lib/profile';
import { prisma } from '@/lib/prisma';
import { getSessionUserId } from '@/lib/session';

type ProfileRequestBody = {
  profileName: string;
  profileImageUrl: string;
};

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as ProfileRequestBody;

  await saveProfileName({ userId, name: body.profileName });
  await saveProfileImage({ userId, imageUrl: body.profileImageUrl });

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET(): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { profileName: true, profileImageUrl: true, email: true },
  });

  return Response.json(user, { status: 200 });
}
