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

type UpdateCatchReportInput = {
  postId: string;
  userId: string;
  newBody: string;
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

export const updateCatchReport = async ({
  postId,
  userId,
  newBody,
}: UpdateCatchReportInput) => {
  const post = await prisma.catchReport.findUnique({ where: { id: postId } });

  if (post?.userId === userId) {
    return prisma.catchReport.update({
      where: { id: postId },
      data: { body: newBody },
    });
  }

  return { ok: false, reason: 'not your post' };
};
