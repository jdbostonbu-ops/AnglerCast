import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import { checkLoginCredentials } from '@/lib/login';

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe('checkLoginCredentials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows a verified user to log in with the correct password', async () => {
    const email = 'angler@example.com';
    const password = 'correct-password';
    const passwordHash = 'hashed-password';
    const verifiedUser = {
      id: 'user_1',
      email,
      passwordHash,
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(verifiedUser);
    vi.mocked(bcrypt.compare).mockResolvedValueOnce(true as never);

    await expect(
      checkLoginCredentials({
        email,
        password,
      }),
    ).resolves.toEqual({
      isAuthenticated: true,
      user: {
        id: 'user_1',
        email,
      },
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, passwordHash);
  });

  it('rejects a wrong password with a wrong password reason', async () => {
    const email = 'angler@example.com';
    const password = 'wrong-password';
    const passwordHash = 'hashed-password';
    const verifiedUser = {
      id: 'user_1',
      email,
      passwordHash,
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(verifiedUser);
    vi.mocked(bcrypt.compare).mockResolvedValueOnce(false as never);

    await expect(
      checkLoginCredentials({
        email,
        password,
      }),
    ).resolves.toEqual({
      isAuthenticated: false,
      reason: 'wrong_password',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, passwordHash);
  });

  it('rejects an unverified user even with the correct password', async () => {
    const email = 'unverified-angler@example.com';
    const password = 'correct-password';
    const passwordHash = 'hashed-password';
    const unverifiedUser = {
      id: 'user_2',
      email,
      passwordHash,
      isVerified: false,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      profileName: null,
      profileImageUrl: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(unverifiedUser);

    await expect(
      checkLoginCredentials({
        email,
        password,
      }),
    ).resolves.toEqual({
      isAuthenticated: false,
      reason: 'email_not_verified',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email },
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });
});
