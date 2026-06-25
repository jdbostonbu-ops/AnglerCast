import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCatchReport, getCatchReports, updateCatchReport, deleteCatchReport } from '@/lib/catchReport';
import { getDisplayAvatar } from '@/lib/profile';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    catchReport: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';

describe('createCatchReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a catch report scoped to a water type and returns it', async () => {
    const userId = 'user-abc-123';
    const waterType = 'freshwater';
    const body = 'Caught a smallmouth bass off the rocks at dawn.';
    const createdAt = new Date('2026-06-25T12:00:00.000Z');

    vi.mocked(prisma.catchReport.create).mockResolvedValueOnce({
      id: 'catch-1',
      userId,
      waterType,
      body,
      createdAt,
    } as unknown as Awaited<ReturnType<typeof prisma.catchReport.create>>);

    const result = await createCatchReport({ userId, waterType, body });

    expect(prisma.catchReport.create).toHaveBeenCalledTimes(1);
    expect(prisma.catchReport.create).toHaveBeenCalledWith({
      data: { userId, waterType, body },
    });

    expect(result).toEqual({
      id: 'catch-1',
      userId,
      waterType,
      body,
      createdAt,
    });
  });
});

describe('getCatchReports water type filtering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns only freshwater posts when waterType is freshwater', async () => {
      const freshwaterPosts = [
      {
        id: 'catch-1',
        userId: 'user-1',
        waterType: 'freshwater',
        body: 'Trout at the lake.',
        createdAt: new Date('2026-06-25T10:00:00.000Z'),
        user: {
          profileName: 'angler-one',
          profileImageUrl: null,
          email: 'one@example.com',
        },
      },
    ];

    vi.mocked(prisma.catchReport.findMany).mockResolvedValueOnce(freshwaterPosts as never);

    const result = await getCatchReports({ waterType: 'freshwater' });

    expect(prisma.catchReport.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.catchReport.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { waterType: 'freshwater' } }),
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({ id: 'catch-1', waterType: 'freshwater' }),
    );
  });

  it('returns only saltwater posts when waterType is saltwater', async () => {
   const saltwaterPosts = [
      {
        id: 'catch-2',
        userId: 'user-2',
        waterType: 'saltwater',
        body: 'Striped bass in the sound.',
        createdAt: new Date('2026-06-25T11:00:00.000Z'),
        user: {
          profileName: 'angler-two',
          profileImageUrl: null,
          email: 'two@example.com',
        },
      },
    ];

    vi.mocked(prisma.catchReport.findMany).mockResolvedValueOnce(saltwaterPosts as never);

    const result = await getCatchReports({ waterType: 'saltwater' });

    expect(prisma.catchReport.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { waterType: 'saltwater' } }),
    );
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({ id: 'catch-2', waterType: 'saltwater' }),
    );
  });
});

describe('getCatchReports ordering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('requests posts ordered by createdAt descending (newest first)', async () => {
    vi.mocked(prisma.catchReport.findMany).mockResolvedValueOnce([] as never);

    await getCatchReports({ waterType: 'freshwater' });

    expect(prisma.catchReport.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: 'desc' } }),
    );
  });
});

describe('getCatchReports author info', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('includes the author display name and resolved avatar on each post', async () => {
    const rawPostsFromDb = [
      {
        id: 'catch-1',
        userId: 'user-1',
        waterType: 'freshwater',
        body: 'Trout at the lake.',
        createdAt: new Date('2026-06-25T10:00:00.000Z'),
        user: {
          profileName: 'trigger',
          profileImageUrl: null,
          email: 'jdboston@example.com',
        },
      },
    ];

    vi.mocked(prisma.catchReport.findMany).mockResolvedValueOnce(rawPostsFromDb as never);

    const result = await getCatchReports({ waterType: 'freshwater' });

    // findMany must include the related user's profile fields
    expect(prisma.catchReport.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: {
          user: {
            select: { profileName: true, profileImageUrl: true, email: true },
          },
        },
      }),
    );

    const expectedAvatar = getDisplayAvatar({
      profileImageUrl: null,
      email: 'jdboston@example.com',
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      expect.objectContaining({
        id: 'catch-1',
        body: 'Trout at the lake.',
        author: {
          profileName: 'trigger',
          avatar: expectedAvatar,
        },
      }),
    );
  });
});

describe('updateCatchReport ownership', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('updates the post body when the user owns the post', async () => {
    const postId = 'catch-1';
    const userId = 'user-1';
    const newBody = 'Edited: it was actually a largemouth bass.';

    vi.mocked(prisma.catchReport.findUnique).mockResolvedValueOnce({
      id: postId,
      userId,
      waterType: 'freshwater',
      body: 'Original body.',
      createdAt: new Date('2026-06-25T10:00:00.000Z'),
    } as never);

    vi.mocked(prisma.catchReport.update).mockResolvedValueOnce({
      id: postId,
      userId,
      waterType: 'freshwater',
      body: newBody,
      createdAt: new Date('2026-06-25T10:00:00.000Z'),
    } as never);

    const result = await updateCatchReport({ postId, userId, newBody });

    expect(prisma.catchReport.update).toHaveBeenCalledTimes(1);
    expect(prisma.catchReport.update).toHaveBeenCalledWith({
      where: { id: postId },
      data: { body: newBody },
    });
    expect(result).toEqual(
      expect.objectContaining({ id: postId, body: newBody }),
    );
  });
});

describe('updateCatchReport rejects non-owner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not update and reports failure when the user does not own the post', async () => {
    const postId = 'catch-1';
    const ownerId = 'user-1';
    const otherUserId = 'user-999';

    vi.mocked(prisma.catchReport.findUnique).mockResolvedValueOnce({
      id: postId,
      userId: ownerId,
      waterType: 'freshwater',
      body: 'Original body.',
      createdAt: new Date('2026-06-25T10:00:00.000Z'),
    } as never);

    const result = await updateCatchReport({
      postId,
      userId: otherUserId,
      newBody: 'Trying to edit a post I do not own.',
    });

    expect(prisma.catchReport.update).not.toHaveBeenCalled();
    expect(result).toEqual({ ok: false, reason: 'not your post' });
  });
});

describe('deleteCatchReport ownership', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deletes the post when the user owns it', async () => {
    const postId = 'catch-1';
    const userId = 'user-1';

    vi.mocked(prisma.catchReport.findUnique).mockResolvedValueOnce({
      id: postId,
      userId,
      waterType: 'freshwater',
      body: 'A post to delete.',
      createdAt: new Date('2026-06-25T10:00:00.000Z'),
    } as never);

    vi.mocked(prisma.catchReport.delete).mockResolvedValueOnce({
      id: postId,
      userId,
      waterType: 'freshwater',
      body: 'A post to delete.',
      createdAt: new Date('2026-06-25T10:00:00.000Z'),
    } as never);

    const result = await deleteCatchReport({ postId, userId });

    expect(prisma.catchReport.delete).toHaveBeenCalledTimes(1);
    expect(prisma.catchReport.delete).toHaveBeenCalledWith({
      where: { id: postId },
    });
    expect(result).toEqual({ ok: true });
  });
});