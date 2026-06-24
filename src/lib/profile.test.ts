// src/lib/profile.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { saveProfileName } from '@/lib/profile';

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