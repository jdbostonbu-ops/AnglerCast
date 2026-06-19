import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetPasswordWithCode } from '@/lib/passwordReset';
import { POST } from './route';

vi.mock('@/lib/passwordReset', () => ({
  resetPasswordWithCode: vi.fn(),
}));

describe('POST /api/auth/reset-confirm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resets the password for a valid code', async () => {
    vi.mocked(resetPasswordWithCode).mockResolvedValueOnce({ ok: true });
    const request = new Request('http://localhost/api/auth/reset-confirm', {
      method: 'POST',
      body: JSON.stringify({
        email: 'verified@example.com',
        code: '123456',
        newPassword: 'new-password',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(resetPasswordWithCode).toHaveBeenCalledWith({
      email: 'verified@example.com',
      enteredCode: '123456',
      newPassword: 'new-password',
    });
  });

  it('rejects an expired code with status 400', async () => {
    vi.mocked(resetPasswordWithCode).mockResolvedValueOnce({
      ok: false,
      reason: 'expired',
    });
    const request = new Request('http://localhost/api/auth/reset-confirm', {
      method: 'POST',
      body: JSON.stringify({
        email: 'verified@example.com',
        code: '123456',
        newPassword: 'new-password',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ ok: false, reason: 'expired' });
    expect(response.status).toBe(400);
  });

  it('rejects a wrong code with status 400', async () => {
    vi.mocked(resetPasswordWithCode).mockResolvedValueOnce({
      ok: false,
      reason: 'mismatch',
    });
    const request = new Request('http://localhost/api/auth/reset-confirm', {
      method: 'POST',
      body: JSON.stringify({
        email: 'verified@example.com',
        code: '999999',
        newPassword: 'new-password',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ ok: false, reason: 'mismatch' });
    expect(response.status).toBe(400);
  });
});