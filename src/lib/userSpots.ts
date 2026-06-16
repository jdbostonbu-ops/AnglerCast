import type { SavedSpot, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

type CreateUserWithSavedSpotInput = {
  user: {
    email: string;
    passwordHash: string;
    isVerified: boolean;
  };
  savedSpot: {
    name: string;
    latitude: number;
    longitude: number;
    species: string;
    waterType: string;
    notes: string | null;
  };
};

type CreateUserWithSavedSpotResult = {
  user: User;
  savedSpot: SavedSpot;
};

export const createUserWithSavedSpot = async ({
  user,
  savedSpot,
}: CreateUserWithSavedSpotInput): Promise<CreateUserWithSavedSpotResult> => {
  const createdUser = await prisma.user.create({
    data: user,
  });

  const createdSavedSpot = await prisma.savedSpot.create({
    data: {
      userId: createdUser.id,
      name: savedSpot.name,
      latitude: savedSpot.latitude,
      longitude: savedSpot.longitude,
      species: savedSpot.species,
      waterType: savedSpot.waterType,
      notes: savedSpot.notes,
    },
  });

  return {
    user: createdUser,
    savedSpot: createdSavedSpot,
  };
};
