import { prisma } from '@/lib/prisma';

type SaveProfileNameInput = {
  userId: string;
  name: string;
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
