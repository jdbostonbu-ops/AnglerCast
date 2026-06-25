// src/lib/profile.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveProfileName, saveProfileImage, getDisplayAvatar, canPostCatch } from '@/lib/profile';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      update: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';

describe('saveProfileName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stores the profile name on the user and a follow-up read returns it', async () => {
    const userId = 'user-abc-123';
    const name = 'trigger';

    vi.mocked(prisma.user.update).mockResolvedValueOnce({
      id: userId,
      email: 'jdboston@example.com',
      profileName: name,
      profileImageUrl: null,
    } as unknown as Awaited<ReturnType<typeof prisma.user.update>>);

    await saveProfileName({ userId, name });

    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: { profileName: name },
    });

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
      id: userId,
      email: 'jdboston@example.com',
      profileName: name,
      profileImageUrl: null,
    } as unknown as Awaited<ReturnType<typeof prisma.user.findUnique>>);

    const readBack = await prisma.user.findUnique({ where: { id: userId } });
    expect(readBack?.profileName).toBe(name);
  });
});

describe('saveProfileImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('stores the profile image URL on the user and a follow-up read returns it', async () => {
    const userId = 'user-abc-123';
    const imageUrl = 'https://images.example.com/profiles/trigger.jpg';

    vi.mocked(prisma.user.update).mockResolvedValueOnce({
      id: userId,
      email: 'jdboston@example.com',
      profileName: 'trigger',
      profileImageUrl: imageUrl,
    } as unknown as Awaited<ReturnType<typeof prisma.user.update>>);

    await saveProfileImage({ userId, imageUrl });

    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userId },
      data: { profileImageUrl: imageUrl },
    });

    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
      id: userId,
      email: 'jdboston@example.com',
      profileName: 'trigger',
      profileImageUrl: imageUrl,
    } as unknown as Awaited<ReturnType<typeof prisma.user.findUnique>>);

    const readBack = await prisma.user.findUnique({ where: { id: userId } });
    expect(readBack?.profileImageUrl).toBe(imageUrl);
  });
});

describe('getDisplayAvatar', () => {
  it('returns the image URL when profileImageUrl is set', () => {
    const result = getDisplayAvatar({
      profileImageUrl: 'https://images.example.com/profiles/trigger.jpg',
      email: 'jdboston@example.com',
    });

    expect(result).toEqual({
      kind: 'image',
      src: 'https://images.example.com/profiles/trigger.jpg',
    });
  });
});

describe('getDisplayAvatar fallback', () => {
  it('returns the uppercase first letter of the email when no image is set', () => {
    const result = getDisplayAvatar({
      profileImageUrl: null,
      email: 'jdboston@example.com',
    });

    expect(result).toEqual({
      kind: 'letter',
      letter: 'J',
    });
  });
});

describe('canPostCatch', () => {
  it('returns not allowed when the profile name is null', () => {
    const result = canPostCatch({ profileName: null });
    expect(result).toEqual({ allowed: false, reason: 'no profile name' });
  });

  it('returns not allowed when the profile name is an empty string', () => {
    const result = canPostCatch({ profileName: '' });
    expect(result).toEqual({ allowed: false, reason: 'no profile name' });
  });

  it('returns allowed when a profile name is set', () => {
    const result = canPostCatch({ profileName: 'trigger' });
    expect(result).toEqual({ allowed: true });
  });
});