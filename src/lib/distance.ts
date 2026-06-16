type Coordinate = {
  latitude: number;
  longitude: number;
};

type ComputeDistanceInput = {
  origin: Coordinate;
  destination: Coordinate;
};

const earthRadiusNauticalMiles = 3440.065;
const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const computeDistance = ({ origin, destination }: ComputeDistanceInput): number => {
  const originLatitude = degreesToRadians(origin.latitude);
  const destinationLatitude = degreesToRadians(destination.latitude);
  const latitudeDelta = degreesToRadians(destination.latitude - origin.latitude);
  const longitudeDelta = degreesToRadians(destination.longitude - origin.longitude);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;
  const angularDistance = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return earthRadiusNauticalMiles * angularDistance;
};
