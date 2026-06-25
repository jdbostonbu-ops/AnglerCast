import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST, DELETE } from '@/app/api/catch-reports/route';
import { getCatchReports, createCatchReport, deleteCatchReport } from '@/lib/catchReport';
import { getSessionUserId } from '@/lib/session';

vi.mock('@/lib/catchReport', () => ({
  getCatchReports: vi.fn(),
  createCatchReport: vi.fn(),
  deleteCatchReport: vi.fn(),
}));

vi.mock('@/lib/session', () => ({
  getSessionUserId: vi.fn(),
}));

const makeRequest = (url: string): Request => new Request(url, { method: 'GET' });

describe('GET /api/catch-reports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the catch reports for the requested water type', async () => {
    const posts = [
      {
        id: 'catch-1',
        userId: 'user-1',
        body: 'Striped bass in the sound.',
        author: { profileName: 'trigger', avatar: { kind: 'letter', letter: 'T' } },
      },
    ];
    vi.mocked(getCatchReports).mockResolvedValueOnce(posts as never);

    const response = await GET(
      makeRequest('http://localhost/api/catch-reports?waterType=saltwater'),
    );

    expect(getCatchReports).toHaveBeenCalledWith({ waterType: 'saltwater' });
    expect(response.status).toBe(200);

    const json = (await response.json()) as unknown;
    expect(json).toEqual(posts);
  });

  it('returns 400 when no water type is provided', async () => {
    const response = await GET(makeRequest('http://localhost/api/catch-reports'));

    expect(getCatchReports).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });
});

const makePostRequest = (body: unknown): Request =>
  new Request('http://localhost/api/catch-reports', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('POST /api/catch-reports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a catch report for the logged-in user and returns it', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce('user-1');

    const created = {
      id: 'catch-1',
      userId: 'user-1',
      waterType: 'saltwater',
      body: 'Striped bass in the sound.',
      createdAt: new Date('2026-06-25T10:00:00.000Z'),
    };
    vi.mocked(createCatchReport).mockResolvedValueOnce(created as never);

    const response = await POST(
      makePostRequest({
        waterType: 'saltwater',
        body: 'Striped bass in the sound.',
      }),
    );

    expect(createCatchReport).toHaveBeenCalledWith({
      userId: 'user-1',
      waterType: 'saltwater',
      body: 'Striped bass in the sound.',
    });
    expect(response.status).toBe(200);
  });

  it('returns 401 and creates nothing when there is no logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce(null);

    const response = await POST(
      makePostRequest({ waterType: 'saltwater', body: 'hello' }),
    );

    expect(createCatchReport).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
  });
});

const makeDeleteRequest = (body: unknown): Request =>
  new Request('http://localhost/api/catch-reports', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

describe('DELETE /api/catch-reports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deletes the post for the logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce('user-1');
    vi.mocked(deleteCatchReport).mockResolvedValueOnce({ ok: true } as never);

    const response = await DELETE(makeDeleteRequest({ id: 'catch-1' }));

    expect(deleteCatchReport).toHaveBeenCalledWith({
      postId: 'catch-1',
      userId: 'user-1',
    });
    expect(response.status).toBe(200);
  });

  it('returns 401 and deletes nothing when there is no logged-in user', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce(null);

    const response = await DELETE(makeDeleteRequest({ id: 'catch-1' }));

    expect(deleteCatchReport).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
  });
});