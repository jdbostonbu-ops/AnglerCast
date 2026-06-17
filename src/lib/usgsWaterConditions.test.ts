import { afterEach, describe, expect, it, vi } from 'vitest';
import usgsSample from '@/test/fixtures/usgs-sample.json';
import { fetchUsgsWaterConditions } from '@/lib/usgsWaterConditions';

describe('fetchUsgsWaterConditions', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns the nearest USGS site conditions', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(usgsSample), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchUsgsWaterConditions({
        latitude: 41.82,
        longitude: -72.31,
      }),
    ).resolves.toEqual({
      siteName: 'WILLIMANTIC RIVER AT MERROW RD. NEAR MERROW, CT',
      siteLatitude: 41.82401111,
      siteLongitude: -72.31284722,
      streamflow: 31.0,
      gageHeight: 1.05,
      waterTemperature: null,
    });
  });

  it('returns null when the USGS response has no sites', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ value: { timeSeries: [] } }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchUsgsWaterConditions({
        latitude: 41.82,
        longitude: -72.31,
      }),
    ).resolves.toBeNull();
  });

  it('queries USGS with the searched latitude and longitude', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(usgsSample), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    vi.stubGlobal('fetch', fetchMock);

    await fetchUsgsWaterConditions({
      latitude: 41.063500123456,
      longitude: -71.862800987654,
    });

    const requestedUrl = (fetchMock.mock.calls[0] as unknown as [string])[0];
    expect(requestedUrl).toEqual(expect.any(String));
    expect(String(requestedUrl)).toContain('waterservices.usgs.gov');
    expect(String(requestedUrl)).toContain('latitude=41.063500123456');
    expect(String(requestedUrl)).toContain('longitude=-71.862800987654');
  });
});
