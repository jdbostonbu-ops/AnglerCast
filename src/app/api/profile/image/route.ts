import { put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { getSessionUserId } from '@/lib/session';

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId();
  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('image') as File;
  const extension = path.extname(file.name);
  const fileName = `${randomUUID()}${extension}`;

  const blob = await put(fileName, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return Response.json({ path: blob.url }, { status: 200 });
}