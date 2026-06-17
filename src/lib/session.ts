import { cookies } from 'next/headers';

const sessionCookieName = 'anglercast_session';

export const createSession = async (userId: string): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, userId);
};

export const getSessionUserId = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(sessionCookieName);

  return sessionCookie?.value ?? null;
};

export const clearSession = async (): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete(sessionCookieName);
};
