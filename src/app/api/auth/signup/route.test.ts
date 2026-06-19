import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createEmailVerificationCode } from '@/lib/emailVerification';
import { POST } from './route';

const sendVerificationEmailMock = vi.hoisted(() => vi.fn());

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
}));

vi.mock('@/lib/emailVerification', () => ({
  createEmailVerificationCode: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendVerificationEmail: sendVerificationEmailMock,
}));

describe('POST /api/auth/signup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates an inactive user and sends the verification email', async () => {
    const email = 'angler@example.com';
    const password = 'secure-password';
    const passwordHash = 'hashed-password';
    const verificationCode = {
      code: '123456',
      verificationCodeHash: 'hashed-verification-code',
      expiresAt: new Date('2026-01-15T12:15:00.000Z'),
    };
    const createdUser = {
      id: 'user_1',
      email,
      passwordHash,
      isVerified: false,
      verificationCodeHash: verificationCode.verificationCodeHash,
      verificationCodeExpiresAt: verificationCode.expiresAt,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt: new Date('2026-01-15T12:00:00.000Z'),
    };

    vi.mocked(bcrypt.hash).mockResolvedValueOnce(passwordHash as never);
    vi.mocked(createEmailVerificationCode).mockResolvedValueOnce(verificationCode);
    vi.mocked(prisma.user.create).mockResolvedValueOnce(createdUser);
    sendVerificationEmailMock.mockResolvedValueOnce({ id: 'email_1' });

    const request = new Request('http://localhost/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({
      user: {
        id: 'user_1',
        email,
        isVerified: false,
      },
    });
    expect(response.status).toBe(201);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(createEmailVerificationCode).toHaveBeenCalledOnce();
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email,
        passwordHash,
        isVerified: false,
        verificationCodeHash: verificationCode.verificationCodeHash,
        verificationCodeExpiresAt: verificationCode.expiresAt,
      },
    });
    expect(sendVerificationEmailMock).toHaveBeenCalledWith({
      email,
      code: verificationCode.code,
    });
  });
});
