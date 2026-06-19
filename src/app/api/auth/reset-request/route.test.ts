import { beforeEach, describe, expect, it, vi } from 'vitest';
import { requestPasswordReset } from '@/lib/passwordReset';
import { sendPasswordResetEmail } from '@/lib/email';
import { POST } from './route';

vi.mock('@/lib/passwordReset', () => ({
  requestPasswordReset: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendPasswordResetEmail: vi.fn(),
}));

describe('POST /api/auth/reset-request', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns success and triggers a reset for a verified account', async () => {
    vi.mocked(requestPasswordReset).mockResolvedValueOnce({
      ok: true,
      code: '123456',
    });
    const request = new Request('http://localhost/api/auth/reset-request', {
      method: 'POST',
      body: JSON.stringify({ email: 'verified@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(requestPasswordReset).toHaveBeenCalledWith({
      email: 'verified@example.com',
    });
    expect(sendPasswordResetEmail).toHaveBeenCalledWith({
      email: 'verified@example.com',
      code: '123456',
    });
  });

  it('returns the same success response when the account does not exist', async () => {
    vi.mocked(requestPasswordReset).mockResolvedValueOnce({
      ok: false,
      reason: 'account_not_found',
    });
    const request = new Request('http://localhost/api/auth/reset-request', {
      method: 'POST',
      body: JSON.stringify({ email: 'nobody@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it('returns the same success response when the account is not verified', async () => {
    vi.mocked(requestPasswordReset).mockResolvedValueOnce({
      ok: false,
      reason: 'account_not_verified',
    });
    const request = new Request('http://localhost/api/auth/reset-request', {
      method: 'POST',
      body: JSON.stringify({ email: 'unverified@example.com' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(response.status).toBe(200);
  });
});