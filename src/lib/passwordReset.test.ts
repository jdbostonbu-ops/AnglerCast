import { describe, it, expect, vi, afterEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { createPasswordResetCode } from '@/lib/passwordReset';

describe('createPasswordResetCode', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns a 6-digit code, a matching hash, and a future expiry', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const result = await createPasswordResetCode();

    expect(result.code).toMatch(/^\d{6}$/);
    await expect(bcrypt.compare(result.code, result.resetCodeHash)).resolves.toBe(true);
    expect(result.expiresAt.getTime()).toBeGreaterThan(now.getTime());
  });
});