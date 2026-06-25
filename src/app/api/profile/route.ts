import { saveProfileImage, saveProfileName } from '@/lib/profile';
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
