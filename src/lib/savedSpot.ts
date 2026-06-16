import type { SavedSpot } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type CreateSavedSpotInput = {
  userId: string;
  name: string;
  latitude: number;
  longitude: number;
  species: string;
  waterType: string;
  notes: string | null;
};

type ListSavedSpotsForUserInput = {
  userId: string;
};

type UpdateSavedSpotInput = {
  id: string;
  userId: string;
  name: string;
  latitude: number;
  longitude: number;
  species: string;
  waterType: string;
  notes: string | null;
};

export const createSavedSpot = async ({
  userId,
  name,
  latitude,
  longitude,
  species,
  waterType,
  notes,
}: CreateSavedSpotInput): Promise<SavedSpot> => {
  return prisma.savedSpot.create({
    data: {
      userId,
      name,
      latitude,
      longitude,
      species,
      waterType,
      notes,
    },
  });
};

export const listSavedSpotsForUser = async ({
  userId,
}: ListSavedSpotsForUserInput): Promise<SavedSpot[]> => {
  const savedSpots = await prisma.savedSpot.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return savedSpots.filter((savedSpot) => savedSpot.userId === userId);
};

export const updateSavedSpot = async ({
  id,
  userId,
  name,
  latitude,
  longitude,
  species,
  waterType,
  notes,
}: UpdateSavedSpotInput): Promise<SavedSpot> => {
  return prisma.savedSpot.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
      latitude,
      longitude,
      species,
      waterType,
      notes,
    },
  });
};
