import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/session', () => ({
  getSessionUserId: vi.fn(),
}));

const { writeFileMock } = vi.hoisted(() => ({ writeFileMock: vi.fn() }));

vi.mock('node:fs/promises', () => ({
  default: { writeFile: writeFileMock },
  writeFile: writeFileMock,
}));

import { POST } from '@/app/api/profile/image/route';
import { getSessionUserId } from '@/lib/session';
import { writeFile } from 'node:fs/promises';

const makeRequestWithFile = (fileName: string, bytes: Uint8Array): Request => {
  const formData = new FormData();
  const file = new File([bytes.buffer as ArrayBuffer], fileName, { type: 'image/png' });
  // jsdom's File lacks arrayBuffer(); provide one that returns the bytes.
  file.arrayBuffer = async (): Promise<ArrayBuffer> => {
    const copy = new Uint8Array(bytes);
    return copy.buffer;
  };
  formData.append('image', file);

  // jsdom can't round-trip a multipart body through request.formData(),
  // so we stub formData() to return the FormData directly. The route still
  // calls request.formData() and gets a real FormData with the real File.
  const request = new Request('http://localhost/api/profile/image', {
    method: 'POST',
  });
  request.formData = async (): Promise<FormData> => formData;

  return request;
};

describe('POST /api/profile/image', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('writes the uploaded file to the uploads folder and returns its public path for a logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce('user-1');

    const bytes = new Uint8Array([1, 2, 3, 4]);
    const response = await POST(makeRequestWithFile('photo.png', bytes));

    // The file was written exactly once
    expect(writeFile).toHaveBeenCalledTimes(1);

    // The path written to is inside public/uploads and keeps the .png extension
    const writtenPath = vi.mocked(writeFile).mock.calls[0][0] as string;
    expect(writtenPath).toContain('public/uploads');
    expect(writtenPath.endsWith('.png')).toBe(true);

    // The response returns the public path (served at /uploads/...) and 200
    expect(response.status).toBe(200);
    const json = (await response.json()) as { path: string };
    expect(json.path.startsWith('/uploads/')).toBe(true);
    expect(json.path.endsWith('.png')).toBe(true);
  });

  it('returns 401 and writes nothing when there is no logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce(null);

    const bytes = new Uint8Array([1, 2, 3, 4]);
    const response = await POST(makeRequestWithFile('photo.png', bytes));

    expect(writeFile).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
  });
});