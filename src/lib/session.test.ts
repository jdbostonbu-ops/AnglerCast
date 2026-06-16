import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSession, getSessionUserId } from '@/lib/session';

const cookieMocks = vi.hoisted(() => {
  const cookieJar = new Map<string, string>();
  const setCookie = vi.fn((name: string, value: string) => {
    cookieJar.set(name, value);
  });
  const getCookie = vi.fn((name: string): { name: string; value: string } | undefined => {
    const value = cookieJar.get(name);

    return value === undefined ? undefined : { name, value };
  });
  const cookieStore = {
    set: setCookie,
    get: getCookie,
  };
  const cookies = vi.fn(async () => cookieStore);

  return {
    cookieJar,
    cookies,
    getCookie,
    setCookie,
  };
});

vi.mock('next/headers', () => ({
  cookies: cookieMocks.cookies,
}));

describe('session', () => {
  afterEach(() => {
    cookieMocks.cookieJar.clear();
    cookieMocks.cookies.mockClear();
    cookieMocks.getCookie.mockClear();
    cookieMocks.setCookie.mockClear();
  });

  it('sets a session cookie for the given user id', async () => {
    await createSession('user-123');

    expect(cookieMocks.setCookie).toHaveBeenCalledWith('anglercast_session', 'user-123');
  });

  it('returns the session user id from the session cookie', async () => {
    cookieMocks.cookieJar.set('anglercast_session', 'user-456');

    await expect(getSessionUserId()).resolves.toBe('user-456');
    expect(cookieMocks.getCookie).toHaveBeenCalledWith('anglercast_session');
  });

  it('returns null when the session cookie is absent', async () => {
    await expect(getSessionUserId()).resolves.toBeNull();
  });
});
