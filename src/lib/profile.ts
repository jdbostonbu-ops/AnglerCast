import { prisma } from '@/lib/prisma';

type SaveProfileNameInput = {
  userId: string;
  name: string;
};

type SaveProfileImageInput = {
  userId: string;
  imageUrl: string;
};

export const saveProfileName = async ({
  userId,
  name,
}: SaveProfileNameInput): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { profileName: name },
  });
};

export const saveProfileImage = async ({
  userId,
  imageUrl,
}: SaveProfileImageInput): Promise<void> => {
  await prisma.user.update({
    where: { id: userId },
    data: { profileImageUrl: imageUrl },
  });
};
