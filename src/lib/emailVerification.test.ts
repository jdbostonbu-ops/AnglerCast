import bcrypt from 'bcryptjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createEmailVerificationCode } from '@/lib/emailVerification';

describe('createEmailVerificationCode', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('stores the email verification code hashed with a future expiry', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const verificationCode = await createEmailVerificationCode();

    expect(verificationCode.verificationCodeHash).not.toBe(verificationCode.code);
    await expect(
      bcrypt.compare(verificationCode.code, verificationCode.verificationCodeHash),
    ).resolves.toBe(true);
    expect(verificationCode.expiresAt.getTime()).toBeGreaterThan(now.getTime());
  });
});
