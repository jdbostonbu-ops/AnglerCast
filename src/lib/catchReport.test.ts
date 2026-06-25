import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCatchReport, getCatchReports } from '@/lib/catchReport';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    catchReport: {
      create: vi.fn(),
      findMany: vi.fn(),
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
      },
    ];

    vi.mocked(prisma.catchReport.findMany).mockResolvedValueOnce(freshwaterPosts as never);

    const result = await getCatchReports({ waterType: 'freshwater' });

    expect(prisma.catchReport.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.catchReport.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { waterType: 'freshwater' } }),
    );
    expect(result).toEqual(freshwaterPosts);
  });

  it('returns only saltwater posts when waterType is saltwater', async () => {
    const saltwaterPosts = [
      {
        id: 'catch-2',
        userId: 'user-2',
        waterType: 'saltwater',
        body: 'Striped bass in the sound.',
        createdAt: new Date('2026-06-25T11:00:00.000Z'),
      },
    ];

    vi.mocked(prisma.catchReport.findMany).mockResolvedValueOnce(saltwaterPosts as never);

    const result = await getCatchReports({ waterType: 'saltwater' });

    expect(prisma.catchReport.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { waterType: 'saltwater' } }),
    );
    expect(result).toEqual(saltwaterPosts);
  });
});