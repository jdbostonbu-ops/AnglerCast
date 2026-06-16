'use client';

import { getSpeciesForWaterType, WaterType } from '@/lib/species';

type SpeciesListProps = {
  waterType: WaterType;
  onSelect: (scientificName: string) => void;
};

export const SpeciesList = ({ waterType, onSelect }: SpeciesListProps) => {
  const species = getSpeciesForWaterType(waterType);

  return (
    <aside className="species-list" aria-label="Species you can search">
      <h3 className="species-list__title">Species in the records</h3>
      <p className="species-list__hint">
        Tap a fish to fill the species field, then search.
      </p>
      <ul className="species-list__items">
        {species.map((fish) => (
          <li key={fish.scientificName}>
            <button
              type="button"
              className="species-list__item"
              onClick={() => onSelect(fish.scientificName)}
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
