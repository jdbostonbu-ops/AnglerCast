import { prisma } from '@/lib/prisma';
import { getDisplayAvatar } from '@/lib/profile';

type CreateCatchReportInput = {
  userId: string;
  waterType: string;
  body: string;
};

type GetCatchReportsInput = {
  waterType: string;
};

export const createCatchReport = ({
  userId,
  waterType,
  body,
}: CreateCatchReportInput) =>
  prisma.catchReport.create({
    data: { userId, waterType, body },
  });

export const getCatchReports = ({ waterType }: GetCatchReportsInput) =>
  prisma.catchReport.findMany({
    where: { waterType },
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { profileName: true, profileImageUrl: true, email: true } } },
  }).then((posts) =>
    posts.map((post) => ({
      ...post,
      author: {
        profileName: post.user.profileName,
        avatar: getDisplayAvatar({
          profileImageUrl: post.user.profileImageUrl,
          email: post.user.email,
        }),
      },
    })),
  );
