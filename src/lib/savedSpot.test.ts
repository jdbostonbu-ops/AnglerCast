import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createSavedSpot, listSavedSpotsForUser, updateSavedSpot } from '@/lib/savedSpot';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    savedSpot: {
      create: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('SavedSpot data access', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates then reads a saved spot with full-precision coordinates', async () => {
    const userId = 'user_1';
    const fullPrecisionLatitude = 41.063500123456;
    const fullPrecisionLongitude = -71.862800987654;
    const createdAt = new Date('2026-01-15T12:00:00.000Z');
    const savedSpot = {
      id: 'spot_1',
      userId,
      name: 'Montauk Point',
      latitude: fullPrecisionLatitude,
      longitude: fullPrecisionLongitude,
      species: 'Striped bass',
      waterType: 'saltwater',
      notes: 'Rocky shoreline near the point.',
      createdAt,
    };

    vi.mocked(prisma.savedSpot.create).mockResolvedValueOnce(savedSpot);
    vi.mocked(prisma.savedSpot.findMany).mockResolvedValueOnce([savedSpot]);

    await expect(
      createSavedSpot({
        userId,
        name: 'Montauk Point',
        latitude: fullPrecisionLatitude,
        longitude: fullPrecisionLongitude,
        species: 'Striped bass',
        waterType: 'saltwater',
        notes: 'Rocky shoreline near the point.',
      }),
    ).resolves.toEqual(savedSpot);

    await expect(listSavedSpotsForUser({ userId })).resolves.toEqual([savedSpot]);

    expect(prisma.savedSpot.create).toHaveBeenCalledWith({
      data: {
        userId,
        name: 'Montauk Point',
        latitude: fullPrecisionLatitude,
        longitude: fullPrecisionLongitude,
        species: 'Striped bass',
        waterType: 'saltwater',
        notes: 'Rocky shoreline near the point.',
      },
    });
    expect(prisma.savedSpot.findMany).toHaveBeenCalledWith({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  });

  it("returns only the requested user's saved spots", async () => {
    const userId = 'user_1';
    const otherUserId = 'user_2';
    const createdAt = new Date('2026-01-15T12:00:00.000Z');
    const userSavedSpot = {
      id: 'spot_1',
      userId,
      name: 'Montauk Point',
      latitude: 41.063500123456,
      longitude: -71.862800987654,
      species: 'Striped bass',
      waterType: 'saltwater',
      notes: 'Rocky shoreline near the point.',
      createdAt,
    };
    const otherUserSavedSpot = {
      id: 'spot_2',
      userId: otherUserId,
      name: 'Lake Erie Shoreline',
      latitude: 41.891987654321,
      longitude: -80.789123456789,
      species: 'Walleye',
      waterType: 'freshwater',
      notes: 'Belongs to another user.',
      createdAt,
    };

    vi.mocked(prisma.savedSpot.findMany).mockResolvedValueOnce([
      userSavedSpot
    ]);

    await expect(listSavedSpotsForUser({ userId })).resolves.toEqual([userSavedSpot]);

    expect(prisma.savedSpot.findMany).toHaveBeenCalledWith({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  });

  it('updates a saved spot and keeps coordinates at full precision', async () => {
    const userId = 'user_1';
    const id = 'spot_1';
    const fullPrecisionLatitude = 41.063500123456;
    const fullPrecisionLongitude = -71.862800987654;
    const createdAt = new Date('2026-01-15T12:00:00.000Z');
    const updatedSavedSpot = {
      id,
      userId,
      name: 'Montauk Point North Side',
      latitude: fullPrecisionLatitude,
      longitude: fullPrecisionLongitude,
      species: 'Striped bass',
      waterType: 'saltwater',
      notes: 'Updated notes without changing coordinate precision.',
      createdAt,
    };

    vi.mocked(prisma.savedSpot.update).mockResolvedValueOnce(updatedSavedSpot);

    await expect(
      updateSavedSpot({
        id,
        userId,
        name: 'Montauk Point North Side',
        latitude: fullPrecisionLatitude,
        longitude: fullPrecisionLongitude,
        species: 'Striped bass',
        waterType: 'saltwater',
        notes: 'Updated notes without changing coordinate precision.',
      }),
    ).resolves.toEqual(updatedSavedSpot);

    expect(prisma.savedSpot.update).toHaveBeenCalledWith({
      where: {
        id,
        userId,
      },
      data: {
        name: 'Montauk Point North Side',
        latitude: fullPrecisionLatitude,
        longitude: fullPrecisionLongitude,
        species: 'Striped bass',
        waterType: 'saltwater',
        notes: 'Updated notes without changing coordinate precision.',
      },
    });
  });
});
