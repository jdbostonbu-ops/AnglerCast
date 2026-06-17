import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import { checkLoginCredentials } from '@/lib/login';
import { createSession } from '@/lib/session';
import { POST } from './route';

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

vi.mock('@/lib/login', () => ({
  checkLoginCredentials: vi.fn(),
}));

vi.mock('@/lib/session', () => ({
  createSession: vi.fn(),
}));

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('authenticates valid credentials and returns the logged-in user', async () => {
    const email = 'angler@example.com';
    const password = 'correct-password';

    vi.mocked(checkLoginCredentials).mockResolvedValueOnce({
      isAuthenticated: true,
      user: {
        id: 'user_1',
        email,
      },
    });

    const request = new Request('http://localhost/api/auth/login', {
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
      },
    });
    expect(response.status).toBe(200);
    expect(checkLoginCredentials).toHaveBeenCalledWith({
      email,
      password,
    });
    expect(createSession).toHaveBeenCalledWith('user_1');
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it('rejects a wrong password', async () => {
    const email = 'angler@example.com';
    const password = 'wrong-password';

    vi.mocked(checkLoginCredentials).mockResolvedValueOnce({
      isAuthenticated: false,
      reason: 'wrong_password',
    });

    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({
      isAuthenticated: false,
      reason: 'wrong_password',
    });
    expect(response.status).toBe(401);
    expect(checkLoginCredentials).toHaveBeenCalledWith({
      email,
      password,
    });
  });

  it('rejects an unverified user', async () => {
    const email = 'unverified-angler@example.com';
    const password = 'correct-password';

    vi.mocked(checkLoginCredentials).mockResolvedValueOnce({
      isAuthenticated: false,
      reason: 'email_not_verified',
    });

    const request = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);

    await expect(response.json()).resolves.toEqual({
      isAuthenticated: false,
      reason: 'email_not_verified',
    });
    expect(response.status).toBe(403);
    expect(checkLoginCredentials).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
