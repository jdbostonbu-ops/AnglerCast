import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { computeSightingRate } from '@/lib/sightingRate';
import { POST } from './route';

const explainSightingRateMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/sightingRate', () => ({
  computeSightingRate: vi.fn(),
}));

vi.mock('@/lib/sightingRateExplanation', () => ({
  explainSightingRate: explainSightingRateMock,
}));

describe('POST /api/search', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches full-precision occurrence records, excludes 0,0 records, and returns the sighting rate with sample size and confidence', async () => {
    const species = 'Morone saxatilis';
    const latitude = 41.063500123456;
    const longitude = -71.862800987654;
    const month = 6;
    const gbifRecords = [
      {
        scientificName: species,
        decimalLatitude: 41.063500123456,
        decimalLongitude: -71.862800987654,
        eventDate: '2025-06-11',
      },
      {
        scientificName: species,
        decimalLatitude: 41.064000987654,
        decimalLongitude: -71.861900123456,
        eventDate: '2024-06-15',
      },
      {
        scientificName: species,
        decimalLatitude: 41.065111222333,
        decimalLongitude: -71.860444555666,
        eventDate: '2024-05-20',
      },
      {
        scientificName: species,
        decimalLatitude: 0,
        decimalLongitude: 0,
        eventDate: '2023-06-01',
      },
    ];
    const mappedRecords = gbifRecords.slice(0, 3);
    const sightingRate = {
      rate: 2 / 3,
      matchingMonthCount: 2,
      totalCount: 3,
      confidence: 'low' as const,
    };
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ results: gbifRecords }),
    });

    vi.stubGlobal('fetch', fetchMock);
    vi.mocked(computeSightingRate).mockReturnValueOnce(sightingRate);
    explainSightingRateMock.mockResolvedValueOnce(
      'June accounts for 2 of 3 nearby historical records.',
    );

    const response = await POST(
      new Request('http://localhost/api/search', {
        method: 'POST',
        body: JSON.stringify({
          species,
          latitude,
          longitude,
          month,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    await expect(response.json()).resolves.toEqual({
      rate: sightingRate,
      occurrences: mappedRecords,
      explanation: 'June accounts for 2 of 3 nearby historical records.',
    });
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`decimalLatitude=${latitude - 0.5}%2C${latitude + 0.5}`),
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`decimalLongitude=${longitude - 0.5}%2C${longitude + 0.5}`),
    );
    expect(computeSightingRate).toHaveBeenCalledWith({
      records: mappedRecords,
      selectedMonth: month,
    });
    expect(explainSightingRateMock).toHaveBeenCalledWith({
      species,
      latitude,
      longitude,
      month,
      sightingRate,
    });
  });
});
