import { afterEach, describe, expect, it, vi } from 'vitest';
import forecastSample from '@/test/fixtures/forecast-sample.json';
import { fetchForecastConditions } from '@/lib/forecastConditions';

describe('fetchForecastConditions', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns a conditions snapshot from the first hourly entry', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(forecastSample), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchForecastConditions({
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toEqual({
      windSpeed: 31.2,
      windDirection: 211,
      windGusts: 36.0,
    });
  });

  it('returns null when the forecast response has no hourly data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({}), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchForecastConditions({
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toBeNull();
  });

  it('queries Open-Meteo Forecast with the searched latitude and longitude', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(forecastSample), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    vi.stubGlobal('fetch', fetchMock);

    await fetchForecastConditions({
      latitude: 41.063500123456,
      longitude: -71.862800987654,
    });

    const requestedUrl = (fetchMock.mock.calls[0] as unknown as [string])[0];
    expect(requestedUrl).toEqual(expect.any(String));
    expect(String(requestedUrl)).toContain('api.open-meteo.com');
    expect(String(requestedUrl)).toContain('latitude=41.063500123456');
    expect(String(requestedUrl)).toContain('longitude=-71.862800987654');
  });
});
