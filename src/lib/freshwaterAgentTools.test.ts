import { afterEach, describe, expect, it, vi } from 'vitest';
import { FRESHWATER_AGENT_TOOLS } from '@/lib/freshwaterAgentTools';

type ToolEntry = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: Record<string, unknown>;
      required: string[];
    };
  };
};

describe('FRESHWATER_AGENT_TOOLS', () => {
  it('RED 38.8 — exposes exactly two OpenAI-shaped function tools with unique names and valid JSON Schema parameters', () => {
    const tools = FRESHWATER_AGENT_TOOLS as ReadonlyArray<ToolEntry>;
    expect(tools).toHaveLength(2);

    const names = tools.map((tool) => tool.function.name);
    expect(new Set(names).size).toBe(2);
    expect(names).toContain('forecast');
    expect(names).toContain('usgs');
    expect(names).not.toContain('marine');
    expect(names).not.toContain('obis');
    expect(names).not.toContain('gbif');
    expect(names).not.toContain('noaa');

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

  it('RED 38.9 — runFreshwaterTool dispatches both registered tool names to a real tool function and returns unknown_tool for unregistered names', async () => {
    const { runFreshwaterTool } = await import('@/lib/freshwaterAgentTools');

    const fetchMock = vi.fn().mockImplementation(async () =>
      new Response(JSON.stringify({}), { status: 200 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const validArgumentsByToolName: Record<string, Record<string, unknown>> = {
      forecast: { latitude: 41.4, longitude: -71.3, targetDate: '2026-07-04' },
      usgs: { siteId: '01184000' },
    };

    for (const tool of FRESHWATER_AGENT_TOOLS) {
      const toolName = tool.function.name;
      const validArguments = validArgumentsByToolName[toolName] ?? {};

      const result = await runFreshwaterTool(toolName, validArguments);

      expect(result).not.toEqual({ error: 'unknown_tool' });
    }

    const unknownResult = await runFreshwaterTool('not_a_real_tool', {});
    expect(unknownResult).toEqual({ error: 'unknown_tool' });

    vi.unstubAllGlobals();
  });

  it('RED 38.10 — every freshwater tool schema declares the parameters its function actually needs', () => {
    const requiredParametersByToolName: Record<string, string[]> = {
      forecast: ['latitude', 'longitude', 'targetDate'],
      usgs: ['siteId'],
    };

    for (const tool of FRESHWATER_AGENT_TOOLS) {
      const toolName = tool.function.name;
      const expectedRequired = requiredParametersByToolName[toolName];
      expect(expectedRequired, `no expected schema for tool ${toolName}`).toBeDefined();

      const properties = tool.function.parameters.properties as Record <
        string,
        { type?: string; description?: string }
      >;
      const required = tool.function.parameters.required;

      for (const parameterName of expectedRequired) {
        expect(
          properties[parameterName],
          `tool ${toolName} missing property ${parameterName}`,
        ).toBeDefined();
        expect(
          properties[parameterName]?.type,
          `tool ${toolName} property ${parameterName} missing type`,
        ).toBeDefined();
        expect(
          properties[parameterName]?.description ?? '',
          `tool ${toolName} property ${parameterName} missing or empty description`,
        ).not.toBe('');
        expect(
          required,
          `tool ${toolName} required list missing ${parameterName}`,
        ).toContain(parameterName);
      }
    }
  });
});

describe('fetchFreshwaterForecast', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('RED 38.11 — requests imperial units from Open-Meteo Forecast', async () => {
    const { fetchFreshwaterForecast } = await import('@/lib/freshwaterAgentTools');

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        latitude: 41.4901,
        longitude: -71.3128,
        hourly: {
          time: ['2026-06-28T00:00'],
          temperature_2m: [70],
          wind_speed_10m: [5],
          precipitation: [0],
        },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    await fetchFreshwaterForecast({
      latitude: 41.4901,
      longitude: -71.3128,
      targetDate: '2026-06-28',
    });

    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.searchParams.get('temperature_unit')).toBe('fahrenheit');
    expect(url.searchParams.get('wind_speed_unit')).toBe('mph');
    expect(url.searchParams.get('precipitation_unit')).toBe('inch');
  });

  it('RED 38.12 — builds the Open-Meteo Forecast URL with lat/lng/targetDate and parses the response', async () => {
    const { fetchFreshwaterForecast } = await import('@/lib/freshwaterAgentTools');

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        latitude: 41.4901,
        longitude: -71.3128,
        hourly: {
          time: ['2026-06-28T00:00'],
          temperature_2m: [70],
          wind_speed_10m: [5],
          precipitation: [0],
        },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

   const result = await fetchFreshwaterForecast({
      latitude: 41.4901,
      longitude: -71.3128,
      targetDate: '2026-06-28',
    }) as { latitude?: number };

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.hostname).toBe('api.open-meteo.com');
    expect(url.searchParams.get('latitude')).toBe('41.4901');
    expect(url.searchParams.get('longitude')).toBe('-71.3128');
    expect(url.searchParams.get('start_date')).toBe('2026-06-28');
    expect(url.searchParams.get('end_date')).toBe('2026-06-28');
    expect(url.searchParams.get('hourly')).toContain('temperature_2m');
    expect(url.searchParams.get('hourly')).toContain('wind_speed_10m');
    expect(url.searchParams.get('hourly')).toContain('precipitation');

    expect(result).not.toBeNull();
    expect(result.latitude).toBe(41.4901);
  });
});

describe('fetchFreshwaterUsgs', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('RED 38.13 — queries USGS NWIS with the site ID and parses the time series response', async () => {
    const { fetchFreshwaterUsgs } = await import('@/lib/freshwaterAgentTools');

    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue({
      ok: true,
      json: async () => ({
        value: {
          timeSeries: [
            {
              sourceInfo: {
                siteName: 'CONNECTICUT RIVER AT HARTFORD, CT',
                geoLocation: {
                  geogLocation: {
                    latitude: 41.7659,
                    longitude: -72.6709,
                  },
                },
              },
              variable: {
                variableName: 'Gage height, feet',
                unit: { unitCode: 'ft' },
              },
              values: [
                {
                  value: [
                    { value: '3.42', dateTime: '2026-06-28T12:00:00.000-04:00' },
                  ],
                },
              ],
            },
          ],
        },
      }),
    } as Response);
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchFreshwaterUsgs({ siteId: '01184000' }) as {
      siteName: string;
      latitude: number | null;
      longitude: number | null;
      parameters: Array<{ variableName: string; unit: string; latestValue: string; latestTime: string }>;
    };

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const urlCalled = fetchMock.mock.calls[0]?.[0];
    expect(typeof urlCalled).toBe('string');
    const url = new URL(urlCalled as string);
    expect(url.hostname).toBe('waterservices.usgs.gov');
    expect(url.pathname).toBe('/nwis/iv/');
    expect(url.searchParams.get('sites')).toBe('01184000');
    expect(url.searchParams.get('format')).toBe('json');

    expect(result.siteName).toBe('CONNECTICUT RIVER AT HARTFORD, CT');
    expect(result.latitude).toBe(41.7659);
    expect(result.longitude).toBe(-72.6709);
    expect(result.parameters).toHaveLength(1);
    expect(result.parameters[0]?.variableName).toBe('Gage height, feet');
    expect(result.parameters[0]?.unit).toBe('ft');
    expect(result.parameters[0]?.latestValue).toBe('3.42');
    expect(result.parameters[0]?.latestTime).toBe('2026-06-28T12:00:00.000-04:00');
  });
});