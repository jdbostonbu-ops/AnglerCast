'use client';

import { getSpeciesForWaterType, WaterType } from '@/lib/species';

type SpeciesSelection = {
  scientificName: string;
  latitude: number;
  longitude: number;
};

type SpeciesListProps = {
  waterType: WaterType;
  onSelect: (selection: SpeciesSelection) => void;
};

const defaultCoordinates: Record<WaterType, { latitude: number; longitude: number }> = {
  saltwater: { latitude: 41.0, longitude: -71.5 },
  freshwater: { latitude: 44.5, longitude: -73.3 },
};

export const SpeciesList = ({ waterType, onSelect }: SpeciesListProps) => {
  const species = getSpeciesForWaterType(waterType);
  const coordinates = defaultCoordinates[waterType];

  return (
    <aside className="species-list" aria-label="Species you can search">
      <h3 className="species-list__title">Species in the records</h3>
      <p className="species-list__hint">
        Tap a fish to fill the form, then pick a month and search.
      </p>
      <ul className="species-list__items">
        {species.map((fish) => (
          <li key={fish.scientificName}>
            <button
              type="button"
              className="species-list__item"
              onClick={() =>
                onSelect({
                  scientificName: fish.scientificName,
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                })
              }
            >
              <span className="species-list__common">{fish.commonName}</span>
              <span className="species-list__scientific">{fish.scientificName}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
