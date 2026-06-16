import { prisma } from '@/lib/prisma';

type SavedSpotRequestBody = {
  name: string;
  latitude: number;
  longitude: number;
  species: string;
  waterType: string;
  notes: string | null;
};

type UpdateSavedSpotRequestBody = SavedSpotRequestBody & {
  id: string;
};

type DeleteSavedSpotRequestBody = {
  id: string;
};

const getUserId = (request: Request): string => request.headers.get('x-user-id') ?? '';

export async function POST(request: Request): Promise<Response> {
  const userId = getUserId(request);
  const { name, latitude, longitude, species, waterType, notes } =
    (await request.json()) as SavedSpotRequestBody;
  const spot = await prisma.savedSpot.create({
    data: {
      userId,
      name,
      latitude,
      longitude,
      species,
      waterType,
      notes,
    },
  });

  return Response.json({ spot }, { status: 201 });
}

export async function GET(request: Request): Promise<Response> {
  const userId = getUserId(request);
  const spots = await prisma.savedSpot.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json({ spots }, { status: 200 });
}

export async function PATCH(request: Request): Promise<Response> {
  const userId = getUserId(request);
  const { id, name, latitude, longitude, species, waterType, notes } =
    (await request.json()) as UpdateSavedSpotRequestBody;
  const spot = await prisma.savedSpot.update({
    where: {
      id,
      userId,
    },
    data: {
      name,
      latitude,
      longitude,
      species,
      waterType,
      notes,
    },
  });

  return Response.json({ spot }, { status: 200 });
}

export async function DELETE(request: Request): Promise<Response> {
  const userId = getUserId(request);
  const { id } = (await request.json()) as DeleteSavedSpotRequestBody;
  const spot = await prisma.savedSpot.delete({
    where: {
      id,
      userId,
    },
  });

  return Response.json({ spot }, { status: 200 });
}
