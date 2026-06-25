'use client';

import { FormEvent, useEffect, useState } from 'react';
import { parseCoordinate } from '@/lib/coordinates';
import { getSpeciesForWaterType, WaterType } from '@/lib/species';

type SightingRateSearchInput = {
  species: string;
  latitude: number;
  longitude: number;
  month: number;
};

type SightingRateSearchProps = {
  onSearch: (searchInput: SightingRateSearchInput) => void;
  waterType: WaterType;
  selectedSpecies?: string;
  selectedLatitude?: number;
  selectedLongitude?: number;
};

const coordinateErrorMessage =
  'Enter valid coordinates: latitude must be -90 to 90 and longitude must be -180 to 180.';

export const SightingRateSearch = ({
  onSearch,
  waterType,
  selectedSpecies,
  selectedLatitude,
  selectedLongitude,
}: SightingRateSearchProps) => {
  const [species, setSpecies] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [month, setMonth] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedSpecies !== undefined && selectedSpecies !== '') {
      setSpecies(selectedSpecies);
    }
  }, [selectedSpecies]);

  useEffect(() => {
    if (selectedLatitude !== undefined) {
      setLatitude(String(selectedLatitude));
    }
  }, [selectedLatitude]);

  useEffect(() => {
    if (selectedLongitude !== undefined) {
      setLongitude(String(selectedLongitude));
    }
  }, [selectedLongitude]);

  const speciesOptions = getSpeciesForWaterType(waterType);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedLatitude = parseCoordinate({
      value: latitude,
      minimum: -90,
      maximum: 90,
    });
    const parsedLongitude = parseCoordinate({
      value: longitude,
      minimum: -180,
      maximum: 180,
    });

    if (!parsedLatitude.isValid || !parsedLongitude.isValid) {
      setErrorMessage(coordinateErrorMessage);
      return;
    }

    setErrorMessage('');
    onSearch({
      species,
      latitude: parsedLatitude.coordinate,
      longitude: parsedLongitude.coordinate,
      month: Number(month),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="sighting-rate-species">Species</label>
        <select
          id="sighting-rate-species"
          name="species"
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
        >
          <option value="">Select a species</option>
          {speciesOptions.map((fish) => (
            <option key={fish.scientificName} value={fish.scientificName}>
              {fish.commonName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sighting-rate-latitude">Latitude</label>
        <input
          id="sighting-rate-latitude"
          name="latitude"
          type="text"
          value={latitude}
          onChange={(event) => setLatitude(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sighting-rate-longitude">Longitude</label>
        <input
          id="sighting-rate-longitude"
          name="longitude"
          type="text"
          value={longitude}
          onChange={(event) => setLongitude(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="sighting-rate-month">Month</label>
        <input
          id="sighting-rate-month"
          name="month"
          type="number"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        />
      </div>

      {errorMessage ? <p>{errorMessage}</p> : null}

      <button type="submit">Search</button>
    </form>
  );
};