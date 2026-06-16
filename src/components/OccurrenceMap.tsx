'use client';

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
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
        {mappableRecords.map((record, index) => {
          const style = getMarkerStyle(record.scientificName);
          return (
            <CircleMarker
              key={`${record.scientificName}-${index}`}
              center={[record.decimalLatitude, record.decimalLongitude]}
              radius={7}
              pathOptions={{
                color: style.color,
                fillColor: style.color,
                fillOpacity: 0.8,
                weight: 2,
              }}
            >
              <Popup>
                <strong>{record.scientificName}</strong>
                <br />
                {record.decimalLatitude}, {record.decimalLongitude}
              </Popup>
            </CircleMarker>
          );
        })}
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
