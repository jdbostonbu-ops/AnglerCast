type FetchTidePredictionsInput = {
  latitude: number;
  longitude: number;
};

type TidePrediction = {
  time: string;
  heightFeet: number;
  type: 'high' | 'low';
};

type TideStation = {
  id: string;
  latitude: number;
  longitude: number;
};

type NoaaPrediction = {
  t: string;
  v: string;
  type: 'H' | 'L';
};

type NoaaTideResponse = {
  predictions?: NoaaPrediction[];
};

const tideStations: TideStation[] = [
  { id: '8461490', latitude: 41.355, longitude: -72.09 },
  { id: '8510560', latitude: 41.0483, longitude: -71.9594 },
  { id: '8518750', latitude: 40.7006, longitude: -74.0142 },
  { id: '8443970', latitude: 42.3539, longitude: -71.0503 },
  { id: '8723214', latitude: 25.7314, longitude: -80.1617 },
];

const coordinateDistance = ({
  origin,
  destination,
}: {
  origin: FetchTidePredictionsInput;
  destination: TideStation;
}): number => {
  const latitudeDelta = destination.latitude - origin.latitude;
  const longitudeDelta = destination.longitude - origin.longitude;

  return Math.sqrt(latitudeDelta ** 2 + longitudeDelta ** 2);
};

const nearestStationForLocation = ({
  latitude,
  longitude,
}: FetchTidePredictionsInput): TideStation => {
  return tideStations.reduce((nearestStation, station) => {
    const nearestDistance = coordinateDistance({
      origin: { latitude, longitude },
      destination: nearestStation,
    });
    const stationDistance = coordinateDistance({
      origin: { latitude, longitude },
      destination: station,
    });

    return stationDistance < nearestDistance ? station : nearestStation;
  });
};

export const fetchTidePredictions = async ({
  latitude,
  longitude,
}: FetchTidePredictionsInput): Promise<TidePrediction[]> => {
  const nearestStation = nearestStationForLocation({ latitude, longitude });
  const searchParams = new URLSearchParams({
    product: 'predictions',
    interval: 'hilo',
    format: 'json',
    units: 'english',
    datum: 'MLLW',
    station: nearestStation.id,
  });
  const response = await fetch(
    `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?${searchParams}`,
  );
  const tideResponse = (await response.json()) as NoaaTideResponse;
  const predictions = Array.isArray(tideResponse.predictions) ? tideResponse.predictions : [];

  return predictions.map((prediction) => ({
    time: prediction.t,
    heightFeet: Number(prediction.v),
    type: prediction.type === 'H' ? 'high' : 'low',
  }));
};
