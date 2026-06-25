import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCatchReport } from '@/lib/catchReport';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    catchReport: {
      create: vi.fn(),
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