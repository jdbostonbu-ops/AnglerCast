import { createCatchReport, getCatchReports } from '@/lib/catchReport';
import { getSessionUserId } from '@/lib/session';

type CreateCatchReportRequestBody = {
  waterType: string;
  body: string;
};

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const waterType = searchParams.get('waterType');

  if (!waterType) {
    return Response.json({ error: 'waterType is required' }, { status: 400 });
  }

  const catchReports = await getCatchReports({ waterType });

  return Response.json(catchReports, { status: 200 });
}

export async function POST(request: Request): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as CreateCatchReportRequestBody;
  const catchReport = await createCatchReport({
    userId,
    waterType: body.waterType,
    body: body.body,
  });

  return Response.json(catchReport, { status: 200 });
}
