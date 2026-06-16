'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { getMarkerStyle } from '@/lib/markerStyle';
import 'leaflet/dist/leaflet.css';

type OccurrenceRecord = {
  scientificName: string;
  decimalLatitude: number;
  decimalLongitude: number;
};

type OccurrenceMapProps = {
  records: OccurrenceRecord[];
  centerLatitude: number;
  centerLongitude: number;
};

// Drop any record at 0,0 (Null Island) so no marker is placed there.
const isRealCoordinate = (record: OccurrenceRecord): boolean =>
  !(record.decimalLatitude === 0 && record.decimalLongitude === 0);

// A fish emoji marker — no image files needed.
const fishIcon = divIcon({
  html: '<span style="font-size: 20px; line-height: 20px;">🐟</span>',
  className: 'occurrence-map__fish',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export const OccurrenceMap = ({
  records,
  centerLatitude,
  centerLongitude,
}: OccurrenceMapProps) => {
  const mappableRecords = records.filter(isRealCoordinate);

  // Build a legend from the distinct species present.
  const speciesInView = Array.from(
    new Set(mappableRecords.map((record) => record.scientificName)),
  );

  return (
    <div className="occurrence-map">
      <MapContainer
        center={[centerLatitude, centerLongitude]}
        zoom={8}
        style={{ height: '420px', width: '100%', borderRadius: '10px' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mappableRecords.map((record, index) => (
          <Marker
            key={`${record.scientificName}-${index}`}
            position={[record.decimalLatitude, record.decimalLongitude]}
            icon={fishIcon}
          >
            <Popup>
              <strong>{record.scientificName}</strong>
              <br />
              {record.decimalLatitude}, {record.decimalLongitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="occurrence-map__legend">
        {speciesInView.map((species) => {
          const style = getMarkerStyle(species);
          return (
            <span key={species} className="occurrence-map__legend-item">
              <span
                className="occurrence-map__legend-dot"
                style={{ backgroundColor: style.color }}
              />
              <em>{species}</em>
            </span>
          );
        })}
      </div>
    </div>
  );
};