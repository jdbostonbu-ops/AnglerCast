import { getCatchReports } from '@/lib/catchReport';

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const waterType = searchParams.get('waterType');

  if (!waterType) {
    return Response.json({ error: 'waterType is required' }, { status: 400 });
  }

  const catchReports = await getCatchReports({ waterType });

  return Response.json(catchReports, { status: 200 });
}
