import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/session', () => ({
  getSessionUserId: vi.fn(),
}));

const { putMock } = vi.hoisted(() => ({ putMock: vi.fn() }));
vi.mock('@vercel/blob', () => ({
  put: putMock,
}));

import { POST } from '@/app/api/profile/image/route';
import { getSessionUserId } from '@/lib/session';
import { put } from '@vercel/blob';

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
  // so we stub formData() to return the FormData directly.
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

  it('uploads the file to blob storage and returns its public URL for a logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce('user-1');
    vi.mocked(put).mockResolvedValueOnce({
      url: 'https://example.public.blob.vercel-storage.com/abc123.png',
    } as never);

    const bytes = new Uint8Array([1, 2, 3, 4]);
    const response = await POST(makeRequestWithFile('photo.png', bytes));

    // The file was uploaded to blob storage exactly once
    expect(put).toHaveBeenCalledTimes(1);
    // It was uploaded with public access
    const putOptions = vi.mocked(put).mock.calls[0][2] as { access?: string };
    expect(putOptions.access).toBe('public');

    // The response returns the blob URL and 200
    expect(response.status).toBe(200);
    const json = (await response.json()) as { path: string };
    expect(json.path).toBe('https://example.public.blob.vercel-storage.com/abc123.png');
  });

  it('returns 401 and uploads nothing when there is no logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce(null);

    const bytes = new Uint8Array([1, 2, 3, 4]);
    const response = await POST(makeRequestWithFile('photo.png', bytes));

    expect(put).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
  });
});