import { describe, expect, it } from 'vitest';
import { getSpeciesForWaterType } from '@/lib/species';

describe('getSpeciesForWaterType', () => {
  it('returns saltwater species with common and scientific names', () => {
    const saltwaterSpecies = getSpeciesForWaterType('saltwater');

    expect(saltwaterSpecies.length).toBeGreaterThan(0);
    expect(
      saltwaterSpecies.every(
        (species) => species.commonName.length > 0 && species.scientificName.length > 0,
      ),
    ).toBe(true);
    expect(saltwaterSpecies).toContainEqual({
      commonName: 'Striped Bass',
      scientificName: 'Morone saxatilis',
    });
    expect(saltwaterSpecies).not.toContainEqual(
      expect.objectContaining({
        commonName: 'Black Drum',
      }),
    );
  });

  it('returns freshwater species with Brook Trout and differs from saltwater species', () => {
    const freshwaterSpecies = getSpeciesForWaterType('freshwater');
    const saltwaterSpecies = getSpeciesForWaterType('saltwater');

    expect(freshwaterSpecies.length).toBeGreaterThan(0);
    expect(freshwaterSpecies).toContainEqual({
      commonName: 'Brook Trout',
      scientificName: 'Salvelinus fontinalis',
    });
    expect(freshwaterSpecies).not.toEqual(saltwaterSpecies);
  });
});
