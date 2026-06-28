import { beforeEach, describe, expect, it, vi } from 'vitest';
import { verifyEmailVerificationCodeAndActivateAccount } from '@/lib/emailVerification';
import { POST } from './route';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

vi.mock('@/lib/emailVerification', () => ({
  verifyEmailVerificationCodeAndActivateAccount: vi.fn(),
}));

describe('POST /api/auth/verify', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('activates the account with a correct verification code', async () => {
    const email = 'angler@example.com';
    const code = '123456';
    const verifiedUser = {
      id: 'user_1',
      email,
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

    vi.mocked(verifyEmailVerificationCodeAndActivateAccount).mockResolvedValueOnce(verifiedUser);

    const request = new Request('http://localhost/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({
      user: {
        id: 'user_1',
        email,
        isVerified: true,
      },
    });
    expect(response.status).toBe(200);
    expect(verifyEmailVerificationCodeAndActivateAccount).toHaveBeenCalledWith({
      email,
      enteredCode: code,
    });
  });
});
