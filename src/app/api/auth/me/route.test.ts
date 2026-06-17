import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSessionUserId } from '@/lib/session';
import { GET } from './route';

vi.mock('@/lib/session', () => ({
  getSessionUserId: vi.fn(),
}));

describe('/api/auth/me route handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the user id with status 200 when a session exists', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce('user_1');

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ userId: 'user_1' });
  });

  it('returns 401 and a null user id when there is no session', async () => {
    vi.mocked(getSessionUserId).mockResolvedValueOnce(null);

    const response = await GET();

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ userId: null });
  });
});