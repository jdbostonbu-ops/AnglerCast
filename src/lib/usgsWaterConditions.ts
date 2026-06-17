import { computeDistance } from '@/lib/distance';

type FetchUsgsWaterConditionsInput = {
  latitude: number;
  longitude: number;
};

type UsgsWaterConditions = {
  siteName: string;
  siteLatitude: number;
  siteLongitude: number;
  streamflow: number | null;
  gageHeight: number | null;
  waterTemperature: number | null;
};

type UsgsTimeSeriesEntry = {
  sourceInfo: {
    siteName: string;
    siteCode: Array<{
      value: string;
    }>;
    geoLocation: {
      geogLocation: {
        latitude: number;
        longitude: number;
      };
    };
  };
  variable: {
    variableCode: Array<{
      value: string;
    }>;
    noDataValue: number;
  };
  values: Array<{
    value: Array<{
      value: string;
    }>;
  }>;
};

type UsgsWaterResponse = {
  value?: {
    timeSeries?: UsgsTimeSeriesEntry[];
  };
};

type UsgsSiteReadings = UsgsWaterConditions & {
  siteId: string;
};

const emptyReadingsForSite = (entry: UsgsTimeSeriesEntry): UsgsSiteReadings => ({
  siteId: entry.sourceInfo.siteCode[0].value,
  siteName: entry.sourceInfo.siteName,
  siteLatitude: entry.sourceInfo.geoLocation.geogLocation.latitude,
  siteLongitude: entry.sourceInfo.geoLocation.geogLocation.longitude,
  streamflow: null,
  gageHeight: null,
  waterTemperature: null,
});

const readingForEntry = (entry: UsgsTimeSeriesEntry): number | null => {
  const reading = Number(entry.values[0].value[0].value);

  if (reading === entry.variable.noDataValue) {
    return null;
  }

  return reading;
};

export const fetchUsgsWaterConditions = async ({
  latitude,
  longitude,
}: FetchUsgsWaterConditionsInput): Promise<UsgsWaterConditions | null> => {
  const searchParams = new URLSearchParams({
    format: 'json',
    latitude: String(latitude),
    longitude: String(longitude),
    bBox: `${longitude - 0.3},${latitude - 0.3},${longitude + 0.3},${latitude + 0.3}`,
    parameterCd: '00060,00065,00010',
    siteStatus: 'active',
  });
  const response = await fetch(`https://waterservices.usgs.gov/nwis/iv/?${searchParams}`);
  const usgsResponse = (await response.json()) as UsgsWaterResponse;
  const timeSeries = usgsResponse.value?.timeSeries ?? [];

  if (timeSeries.length === 0) {
    return null;
  }

  const sitesById = new Map<string, UsgsSiteReadings>();

  timeSeries.forEach((entry) => {
    const siteId = entry.sourceInfo.siteCode[0].value;
    const site = sitesById.get(siteId) ?? emptyReadingsForSite(entry);
    const parameterCode = entry.variable.variableCode[0].value;
    const reading = readingForEntry(entry);

    if (parameterCode === '00060') {
      site.streamflow = reading;
    }

    if (parameterCode === '00065') {
      site.gageHeight = reading;
    }

    if (parameterCode === '00010') {
      site.waterTemperature = reading;
    }

    sitesById.set(siteId, site);
  });

  const sites = [...sitesById.values()];
  const nearestSite = sites.reduce((nearest, site) => {
    const nearestDistance = computeDistance({
      origin: { latitude, longitude },
      destination: { latitude: nearest.siteLatitude, longitude: nearest.siteLongitude },
    });
    const siteDistance = computeDistance({
      origin: { latitude, longitude },
      destination: { latitude: site.siteLatitude, longitude: site.siteLongitude },
    });

    return siteDistance < nearestDistance ? site : nearest;
  });

  return {
    siteName: nearestSite.siteName,
    siteLatitude: nearestSite.siteLatitude,
    siteLongitude: nearestSite.siteLongitude,
    streamflow: nearestSite.streamflow,
    gageHeight: nearestSite.gageHeight,
    waterTemperature: nearestSite.waterTemperature,
  };
};
