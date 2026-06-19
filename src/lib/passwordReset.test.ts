import { describe, it, expect, vi, afterEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { createPasswordResetCode, verifyPasswordResetCode } from '@/lib/passwordReset';

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

describe('verifyPasswordResetCode', () => {
  it('returns valid for a correct, unexpired code', async () => {
    const resetCodeHash = await bcrypt.hash('123456', 10);
    const result = await verifyPasswordResetCode({
      enteredCode: '123456',
      resetCodeHash,
      expiresAt: new Date(Date.now() + 60_000),
    });
    expect(result.isValid).toBe(true);
  });

  it('rejects an expired code with reason "expired"', async () => {
    const resetCodeHash = await bcrypt.hash('123456', 10);
    const result = await verifyPasswordResetCode({
      enteredCode: '123456',
      resetCodeHash,
      expiresAt: new Date(Date.now() - 60_000),
    });
    expect(result).toEqual({ isValid: false, reason: 'expired' });
  });

  it('rejects a wrong code with reason "mismatch"', async () => {
    const resetCodeHash = await bcrypt.hash('123456', 10);
    const result = await verifyPasswordResetCode({
      enteredCode: '999999',
      resetCodeHash,
      expiresAt: new Date(Date.now() + 60_000),
    });
    expect(result).toEqual({ isValid: false, reason: 'mismatch' });
  });
});