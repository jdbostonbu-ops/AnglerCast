import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/catchReport', () => ({
  getCatchReports: vi.fn(),
}));

import { GET } from '@/app/api/catch-reports/route';
import { getCatchReports } from '@/lib/catchReport';

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