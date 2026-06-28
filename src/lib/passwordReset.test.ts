import { prisma } from '@/lib/prisma';
import { describe, it, expect, vi, afterEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { createPasswordResetCode, verifyPasswordResetCode, requestPasswordReset, resetPasswordWithCode } from '@/lib/passwordReset';

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
      profileName: null,
      profileImageUrl: null,
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
      profileName: null,
      profileImageUrl: null,
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

describe('resetPasswordWithCode', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('sets a new password hash and clears the reset fields for a valid code', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const resetCodeHash = await bcrypt.hash('123456', 10);
    const account = {
      id: 'user_1',
      email: 'verified@example.com',
      passwordHash: 'old-hash',
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: resetCodeHash,
      passwordResetCodeExpiresAt: new Date(now.getTime() + 15 * 60 * 1000),
      createdAt: now,
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(account);
    vi.mocked(prisma.user.update).mockResolvedValueOnce(account);

    const result = await resetPasswordWithCode({
      email: 'verified@example.com',
      enteredCode: '123456',
      newPassword: 'new-password',
    });

    expect(result).toEqual({ ok: true });

    const updateArg = vi.mocked(prisma.user.update).mock.calls[0][0];
    expect(updateArg.where).toEqual({ email: 'verified@example.com' });
    expect(updateArg.data.passwordResetCodeHash).toBeNull();
    expect(updateArg.data.passwordResetCodeExpiresAt).toBeNull();

   const newPasswordHash = updateArg.data.passwordHash;
    expect(typeof newPasswordHash).toBe('string');
    await expect(
      bcrypt.compare('new-password', newPasswordHash as string),
    ).resolves.toBe(true);
     });

  it('rejects an expired code with reason "expired" and does not change the password', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const resetCodeHash = await bcrypt.hash('123456', 10);
    const account = {
      id: 'user_1',
      email: 'verified@example.com',
      passwordHash: 'old-hash',
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: resetCodeHash,
      passwordResetCodeExpiresAt: new Date(now.getTime() - 60 * 1000),
      createdAt: now,
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(account);

    const result = await resetPasswordWithCode({
      email: 'verified@example.com',
      enteredCode: '123456',
      newPassword: 'new-password',
    });

    expect(result).toEqual({ ok: false, reason: 'expired' });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('rejects a wrong code with reason "mismatch" and does not change the password', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const resetCodeHash = await bcrypt.hash('123456', 10);
    const account = {
      id: 'user_1',
      email: 'verified@example.com',
      passwordHash: 'old-hash',
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: resetCodeHash,
      passwordResetCodeExpiresAt: new Date(now.getTime() + 15 * 60 * 1000),
      createdAt: now,
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(account);

    const result = await resetPasswordWithCode({
      email: 'verified@example.com',
      enteredCode: '999999',
      newPassword: 'new-password',
    });

    expect(result).toEqual({ ok: false, reason: 'mismatch' });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

   it('returns a clean failure when no account exists for the email (25.1)', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);

    const result = await resetPasswordWithCode({
      email: 'nobody@example.com',
      enteredCode: '123456',
      newPassword: 'new-password',
    });

    expect(result.ok).toBe(false);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('returns a clean failure when the account has no reset code pending (25.2)', async () => {
    const accountWithoutResetCode = {
      id: 'user_1',
      email: 'verified@example.com',
      passwordHash: 'old-hash',
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(accountWithoutResetCode);

    const result = await resetPasswordWithCode({
      email: 'verified@example.com',
      enteredCode: '123456',
      newPassword: 'new-password',
    });

    expect(result.ok).toBe(false);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
