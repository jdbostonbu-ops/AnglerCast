import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createUserWithSavedSpot } from '@/lib/userSpots';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
    savedSpot: {
      create: vi.fn(),
    },
  },
}));

describe('User SavedSpot relationship', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("links a created saved spot to the user who created it", async () => {
    const createdAt = new Date('2026-01-15T12:00:00.000Z');
    const user = {
      id: 'user_1',
      email: 'angler@example.com',
      passwordHash: 'hashed-password',
      isVerified: true,
      verificationCodeHash: null,
      verificationCodeExpiresAt: null,
      passwordResetCodeHash: null,
      passwordResetCodeExpiresAt: null,
      createdAt,
    };
    const savedSpot = {
      id: 'spot_1',
      userId: user.id,
      name: 'Montauk Point',
      latitude: 41.063500123456,
      longitude: -71.862800987654,
      species: 'Striped bass',
      waterType: 'saltwater',
      notes: 'Rocky shoreline near the point.',
      createdAt,
    };

    vi.mocked(prisma.user.create).mockResolvedValueOnce(user);
    vi.mocked(prisma.savedSpot.create).mockResolvedValueOnce(savedSpot);

    await expect(
      createUserWithSavedSpot({
        user: {
          email: 'angler@example.com',
          passwordHash: 'hashed-password',
          isVerified: true,
        },
        savedSpot: {
          name: 'Montauk Point',
          latitude: 41.063500123456,
          longitude: -71.862800987654,
          species: 'Striped bass',
          waterType: 'saltwater',
          notes: 'Rocky shoreline near the point.',
        },
      }),
    ).resolves.toEqual({
      user,
      savedSpot,
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'angler@example.com',
        passwordHash: 'hashed-password',
        isVerified: true,
      },
    });
    expect(prisma.savedSpot.create).toHaveBeenCalledWith({
      data: {
        userId: user.id,
        name: 'Montauk Point',
        latitude: 41.063500123456,
        longitude: -71.862800987654,
        species: 'Striped bass',
        waterType: 'saltwater',
        notes: 'Rocky shoreline near the point.',
      },
    });
    expect(savedSpot.userId).toBe(user.id);
  });
});
