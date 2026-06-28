import { afterEach, describe, expect, it, vi } from 'vitest';
import { SALTWATER_AGENT_TOOLS, runSaltwaterTool, fetchSaltwaterForecast, fetchSaltwaterMarine, fetchSaltwaterObis, fetchSaltwaterGbif } from '@/lib/saltwaterAgentTools';

type ToolEntry = {
  type: string;
  function: {
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: unknown;
      required: unknown;
    };
  };
};

describe('SALTWATER_AGENT_TOOLS', () => {
  it('exposes exactly six OpenAI-shaped function tools with unique names and valid JSON Schema parameters', () => {
    const tools = SALTWATER_AGENT_TOOLS as ReadonlyArray<ToolEntry>;
    expect(tools).toHaveLength(6);

    const names = tools.map((tool) => tool.function.name);
    expect(new Set(names).size).toBe(6);

    tools.forEach((tool) => {
      expect(tool.type).toBe('function');
      expect(typeof tool.function.name).toBe('string');
      expect(tool.function.name.length).toBeGreaterThan(0);
      expect(typeof tool.function.description).toBe('string');
      expect(tool.function.description.length).toBeGreaterThan(0);
      expect(tool.function.parameters.type).toBe('object');
      expect(tool.function.parameters.properties).toBeDefined();
      expect(Array.isArray(tool.function.parameters.required)).toBe(true);
    });
  });
});

  describe('runSaltwaterTool', () => {
  it('returns an unknown_tool error shape when called with a tool name that is not in the registry', async () => {
    const result = await runSaltwaterTool('not_a_real_tool', {});
    expect(result).toEqual({ error: 'unknown_tool' });
  });
});

describe('fetchSaltwaterForecast', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds the Open-Meteo Forecast URL with lat/lng and parses the response', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        latitude: 41.4901,
        longitude: -71.3128,
        hourly: {
          time: ['2026-06-28T00:00'],
          temperature_2m: [19.8],
          wind_speed_10m: [8.9],
          precipitation: [0],
        },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSaltwaterForecast({
      latitude: 41.4901,
      longitude: -71.3128,
      targetDate: '2026-06-28',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.hostname).toBe('api.open-meteo.com');
    expect(url.searchParams.get('latitude')).toBe('41.4901');
    expect(url.searchParams.get('longitude')).toBe('-71.3128');

    expect(result).not.toBeNull();
  });
});

describe('fetchSaltwaterMarine', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('builds the Open-Meteo Marine URL with lat/lng and parses the response', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        latitude: 41.458336,
        longitude: -71.20833,
        hourly: {
          time: ['2026-06-28T00:00'],
          wave_height: [0.58],
          wave_direction: [162],
          wave_period: [6.75],
          sea_surface_temperature: [19.9],
        },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSaltwaterMarine({
      latitude: 41.4901,
      longitude: -71.3128,
      targetDate: '2026-06-28',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.hostname).toBe('marine-api.open-meteo.com');
    expect(url.searchParams.get('latitude')).toBe('41.4901');
    expect(url.searchParams.get('longitude')).toBe('-71.3128');

    expect(result).not.toBeNull();
  });
});

describe('fetchSaltwaterObis', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('queries OBIS with a lat/lng geometry, species, and size, and parses the response', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        total: 149,
        results: [
          {
            scientificName: 'Morone saxatilis',
            decimalLatitude: 41.73875,
            decimalLongitude: -70.6194,
            eventDate: '2022-09-16',
            marine: true,
            vernacularName: 'striped bass',
          },
        ],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSaltwaterObis({
      latitude: 41.4901,
      longitude: -71.3128,
      scientificName: 'Morone saxatilis',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.hostname).toBe('api.obis.org');
    expect(url.searchParams.get('scientificname')).toBe('Morone saxatilis');
    expect(url.searchParams.get('geometry')).toBeDefined();
    expect(url.searchParams.get('size')).toBeDefined();

    expect(result).not.toBeNull();
  });
});

describe('fetchSaltwaterGbif', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('queries GBIF with decimal lat/lng range bounds, species, and limit, and parses the response', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        offset: 0,
        limit: 2,
        endOfRecords: false,
        count: 309,
        results: [
          {
            scientificName: 'Morone saxatilis (Walbaum, 1792)',
            species: 'Morone saxatilis',
            decimalLatitude: 41.764394,
            decimalLongitude: -70.692292,
            eventDate: '2026-05-19T08:29:57',
            year: 2026,
            month: 5,
            stateProvince: 'Massachusetts',
          },
        ],
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchSaltwaterGbif({
      latitude: 41.4901,
      longitude: -71.3128,
      scientificName: 'Morone saxatilis',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.hostname).toBe('api.gbif.org');
    expect(url.searchParams.get('scientificName')).toBe('Morone saxatilis');
    expect(url.searchParams.get('decimalLatitude')).toBeDefined();
    expect(url.searchParams.get('decimalLongitude')).toBeDefined();
    expect(url.searchParams.get('limit')).toBeDefined();

    expect(result).not.toBeNull();
  });
});

