import {
  createCatchReport,
  deleteCatchReport,
  getCatchReports,
  updateCatchReport,
} from '@/lib/catchReport';
import { getSessionUserId } from '@/lib/session';

type CreateCatchReportRequestBody = {
  waterType: string;
  body: string;
};

type DeleteCatchReportRequestBody = {
  id: string;
};

type UpdateCatchReportRequestBody = {
  id: string;
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

export async function DELETE(request: Request): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as DeleteCatchReportRequestBody;
  const result = await deleteCatchReport({ postId: body.id, userId });

  return Response.json(result, { status: 200 });
}

export async function PATCH(request: Request): Promise<Response> {
  const userId = await getSessionUserId();

  if (userId === null) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as UpdateCatchReportRequestBody;
  const result = await updateCatchReport({
    postId: body.id,
    userId,
    newBody: body.body,
  });

  return Response.json(result, { status: 200 });
}
