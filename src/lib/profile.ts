import { prisma } from '@/lib/prisma';

type SaveProfileNameInput = {
  userId: string;
  name: string;
};

type SaveProfileImageInput = {
  userId: string;
  imageUrl: string;
};

type GetDisplayAvatarInput = {
  profileImageUrl: string | null;
  email: string;
};

type DisplayAvatar =
  | {
      kind: 'image';
      src: string;
    }
  | {
      kind: 'letter';
      letter: string;
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

export const getDisplayAvatar = ({
  profileImageUrl,
}: GetDisplayAvatarInput): DisplayAvatar => {
  if (profileImageUrl) {
    return { kind: 'image', src: profileImageUrl };
  }

  throw new Error('Profile image URL is required for image avatars.');
};
