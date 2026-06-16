import bcrypt from 'bcryptjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import {
  createEmailVerificationCode,
  verifyEmailVerificationCode,
  verifyEmailVerificationCodeAndActivateAccount,
} from '@/lib/emailVerification';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

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

  it('verifies a correct unexpired email verification code', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const code = '123456';
    const verificationCodeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);

    await expect(
      verifyEmailVerificationCode({
        enteredCode: code,
        verificationCodeHash,
        expiresAt,
      }),
    ).resolves.toBe(true);
  });

  it('rejects an expired email verification code with an expired reason', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const code = '123456';
    const verificationCodeHash = await bcrypt.hash(code, 10);
    const expiresAt = new Date(now.getTime() - 60 * 1000);

    await expect(
      verifyEmailVerificationCode({
        enteredCode: code,
        verificationCodeHash,
        expiresAt,
      }),
    ).resolves.toEqual({
      isVerified: false,
      reason: 'expired',
    });
  });

  it('rejects a wrong email verification code with a mismatch reason', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const storedCode = '123456';
    const enteredCode = '654321';
    const verificationCodeHash = await bcrypt.hash(storedCode, 10);
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);

    await expect(
      verifyEmailVerificationCode({
        enteredCode,
        verificationCodeHash,
        expiresAt,
      }),
    ).resolves.toEqual({
      isVerified: false,
      reason: 'mismatch',
    });
  });

  it('creates a new account as inactive and flips it active after successful verification', async () => {
    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const email = 'angler@example.com';
    const passwordHash = 'hashed-password';
    const verificationCodeHash = await bcrypt.hash('123456', 10);
    const verificationCodeExpiresAt = new Date(now.getTime() + 15 * 60 * 1000);
    const inactiveAccount = {
      id: 'user_1',
      email,
      passwordHash,
      isVerified: false,
      verificationCodeHash,
      verificationCodeExpiresAt,
      createdAt: now,
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(inactiveAccount);
    vi.mocked(prisma.user.update).mockResolvedValueOnce({
      ...inactiveAccount,
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
    });

    await expect(
      verifyEmailVerificationCodeAndActivateAccount({
        email,
        enteredCode: '123456',
      }),
    ).resolves.toEqual({
      id: 'user_1',
      email,
      passwordHash,
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      createdAt: now,
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email },
      data: {
        isVerified: true,
        verificationCodeHash: null,
        verificationCodeExpiresAt: null,
      },
    });
  });

  it('rejects an already-verified account with an already verified reason', async () => {
    vi.clearAllMocks();

    const now = new Date('2026-01-15T12:00:00.000Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    const email = 'verified-angler@example.com';
    const passwordHash = 'hashed-password';
    const verificationCodeHash = await bcrypt.hash('123456', 10);
    const verificationCodeExpiresAt = new Date(now.getTime() + 15 * 60 * 1000);
    const verifiedAccount = {
      id: 'user_2',
      email,
      passwordHash,
      isVerified: true,
      verificationCodeHash,
      verificationCodeExpiresAt,
      createdAt: now,
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(verifiedAccount);

    await expect(
      verifyEmailVerificationCodeAndActivateAccount({
        email,
        enteredCode: '123456',
      }),
    ).resolves.toEqual({
      isVerified: false,
      reason: 'already_verified',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
