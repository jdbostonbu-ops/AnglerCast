import { prisma } from '@/lib/prisma';

type CreateCatchReportInput = {
  userId: string;
  waterType: string;
  body: string;
};

export const createCatchReport = ({
  userId,
  waterType,
  body,
}: CreateCatchReportInput) =>
  prisma.catchReport.create({
    data: { userId, waterType, body },
  });
