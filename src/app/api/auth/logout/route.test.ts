import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clearSession } from '@/lib/session';
import { POST } from './route';

vi.mock('@/lib/session', () => ({
  clearSession: vi.fn(),
}));

describe('/api/auth/logout route handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('clears the session and returns success', async () => {
    const response = await POST();

    expect(clearSession).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });
});