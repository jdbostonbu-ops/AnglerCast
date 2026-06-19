import { prisma } from '@/lib/prisma';
import { describe, it, expect, vi, afterEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { createPasswordResetCode, verifyPasswordResetCode, requestPasswordReset } from '@/lib/passwordReset';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

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

describe('requestPasswordReset', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('rejects an unverified account with reason "account_not_verified"', async () => {
    const unverifiedAccount = {
      id: 'user_1',
      email: 'angler@example.com',
      passwordHash: 'hashed-password',
      isVerified: false,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(unverifiedAccount);

    const result = await requestPasswordReset({ email: 'angler@example.com' });

    expect(result).toEqual({ ok: false, reason: 'account_not_verified' });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('issues and stores a reset code for a verified account', async () => {
    const verifiedAccount = {
      id: 'user_2',
      email: 'verified@example.com',
      passwordHash: 'hashed-password',
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(verifiedAccount);
    vi.mocked(prisma.user.update).mockResolvedValueOnce(verifiedAccount);

    const result = await requestPasswordReset({ email: 'verified@example.com' });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.code).toMatch(/^\d{6}$/);
    }
    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    const updateArg = vi.mocked(prisma.user.update).mock.calls[0][0];
    expect(updateArg.where).toEqual({ email: 'verified@example.com' });
    expect(updateArg.data.passwordResetCodeHash).toEqual(expect.any(String));
    expect(updateArg.data.passwordResetCodeExpiresAt).toBeInstanceOf(Date);
  });

  it('rejects a missing account with reason "account_not_found"', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);

    const result = await requestPasswordReset({ email: 'nobody@example.com' });

    expect(result).toEqual({ ok: false, reason: 'account_not_found' });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});