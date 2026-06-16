import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '@/lib/prisma';
import { DELETE, GET, PATCH, POST } from './route';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    savedSpot: {
      create: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('/api/spots route handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates, lists, updates, and deletes saved spots scoped to the logged-in user', async () => {
    const userId = 'user_1';
    const otherUserId = 'user_2';
    const spotId = 'spot_1';
    const fullPrecisionLatitude = 41.063500123456;
    const fullPrecisionLongitude = -71.862800987654;
    const createdAt = '2026-01-15T12:00:00.000Z';
    const savedSpot = {
      id: spotId,
      userId,
      name: 'Montauk Point',
      latitude: fullPrecisionLatitude,
      longitude: fullPrecisionLongitude,
      species: 'Striped bass',
      waterType: 'saltwater',
      notes: 'Rocky shoreline near the point.',
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
    };
    const updatedSavedSpot = {
      ...savedSpot,
      name: 'Montauk Point North Side',
      notes: 'Updated notes without changing coordinate precision.',
    };

    const serializedSavedSpot = { ...savedSpot, createdAt: savedSpot.createdAt.toISOString() };
    const serializedUpdatedSpot = { ...updatedSavedSpot, createdAt: updatedSavedSpot.createdAt.toISOString() };

    vi.mocked(prisma.savedSpot.create).mockResolvedValueOnce(savedSpot);
    vi.mocked(prisma.savedSpot.findMany).mockResolvedValueOnce([savedSpot]);
    vi.mocked(prisma.savedSpot.update).mockResolvedValueOnce(updatedSavedSpot);
    vi.mocked(prisma.savedSpot.delete).mockResolvedValueOnce(updatedSavedSpot);

    const createResponse = await POST(
      new Request('http://localhost/api/spots', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Montauk Point',
          latitude: fullPrecisionLatitude,
          longitude: fullPrecisionLongitude,
          species: 'Striped bass',
          waterType: 'saltwater',
          notes: 'Rocky shoreline near the point.',
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
      }),
    );

    await expect(createResponse.json()).resolves.toEqual({ spot: serializedSavedSpot })
    expect(createResponse.status).toBe(201);
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

    const listResponse = await GET(
      new Request('http://localhost/api/spots', {
        method: 'GET',
        headers: {
          'x-user-id': userId,
        },
      }),
    );

    await expect(listResponse.json()).resolves.toEqual({ spots: [serializedSavedSpot] })
    expect(listResponse.status).toBe(200);
    expect(prisma.savedSpot.findMany).toHaveBeenCalledWith({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const updateResponse = await PATCH(
      new Request('http://localhost/api/spots', {
        method: 'PATCH',
        body: JSON.stringify({
          id: spotId,
          name: 'Montauk Point North Side',
          latitude: fullPrecisionLatitude,
          longitude: fullPrecisionLongitude,
          species: 'Striped bass',
          waterType: 'saltwater',
          notes: 'Updated notes without changing coordinate precision.',
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
      }),
    );

    await expect(updateResponse.json()).resolves.toEqual({ spot: serializedUpdatedSpot })
    expect(updateResponse.status).toBe(200);
    expect(prisma.savedSpot.update).toHaveBeenCalledWith({
      where: {
        id: spotId,
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

    const deleteResponse = await DELETE(
      new Request('http://localhost/api/spots', {
        method: 'DELETE',
        body: JSON.stringify({
          id: spotId,
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
      }),
    );

    await expect(deleteResponse.json()).resolves.toEqual({ spot: serializedUpdatedSpot })
    expect(deleteResponse.status).toBe(200);
    expect(prisma.savedSpot.delete).toHaveBeenCalledWith({
      where: {
        id: spotId,
        userId,
      },
    });
    expect(prisma.savedSpot.create).not.toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: otherUserId,
        }),
      }),
    );
  });
});
