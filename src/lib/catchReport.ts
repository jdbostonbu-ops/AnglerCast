import { prisma } from '@/lib/prisma';

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
  });
