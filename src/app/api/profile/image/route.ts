import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getSessionUserId } from '@/lib/session';

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('image') as File;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const extension = path.extname(file.name);
  const fileName = `${randomUUID()}${extension}`;
  const uploadPath = path.join(process.cwd(), 'public', 'uploads', fileName);

  await writeFile(uploadPath, bytes);

  return Response.json({ path: `/uploads/${fileName}` }, { status: 200 });
}
