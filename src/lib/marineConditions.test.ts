import { afterEach, describe, expect, it, vi } from 'vitest';
import marineSample from '@/test/fixtures/marine-sample.json';
import { fetchMarineConditions } from '@/lib/marineConditions';

describe('fetchMarineConditions', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('returns a conditions snapshot from the first hourly entry', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify(marineSample), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })),
    );

    await expect(
      fetchMarineConditions({
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toEqual({
      waveHeight: 0.98,
      waveDirection: 193,
      wavePeriod: 5.7,
      oceanCurrentVelocity: 1.9,
    });
  });

  it('returns null when the marine response has no hourly data', async () => {
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
      fetchMarineConditions({
        latitude: 41.063500123456,
        longitude: -71.862800987654,
      }),
    ).resolves.toBeNull();
  });

  it('queries Open-Meteo Marine with the searched latitude and longitude', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(marineSample), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }));
    vi.stubGlobal('fetch', fetchMock);

    await fetchMarineConditions({
      latitude: 41.063500123456,
      longitude: -71.862800987654,
    });

    const requestedUrl = (fetchMock.mock.calls[0] as unknown as [string])[0];
    expect(requestedUrl).toEqual(expect.any(String));
    expect(String(requestedUrl)).toContain('marine-api.open-meteo.com');
    expect(String(requestedUrl)).toContain('latitude=41.063500123456');
    expect(String(requestedUrl)).toContain('longitude=-71.862800987654');
  });
});
