'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SiteNav } from '@/components/SiteNav';
import { SightingRateSearch } from '@/components/SightingRateSearch';
import { SpeciesList } from '@/components/SpeciesList';
import { SavedSpotsSection } from '@/components/SavedSpotsSection';

// Leaflet needs the browser, so load the map client-side only (no server-side render).
const OccurrenceMap = dynamic(
  () => import('@/components/OccurrenceMap').then((module) => module.OccurrenceMap),
  { ssr: false },
);

type OccurrenceRecord = {
  scientificName: string;
  decimalLatitude: number;
  decimalLongitude: number;
};

type SightingRate = {
  rate: number;
  matchingMonthCount: number;
  totalCount: number;
  confidence: 'low' | 'moderate' | 'high';
};

type SearchResult = {
  rate: SightingRate;
  occurrences: OccurrenceRecord[];
  explanation: string;
};

type SearchValues = {
  species: string;
  latitude: number;
  longitude: number;
  month: number;
};

const confidencePillClass: Record<SightingRate['confidence'], string> = {
  low: 'pill pill--low',
  moderate: 'pill pill--size',
  high: 'pill pill--high',
};

const SaltwaterPage = () => {
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedLatitude, setSelectedLatitude] = useState<number | undefined>(undefined);
  const [selectedLongitude, setSelectedLongitude] = useState<number | undefined>(undefined);
  const [searchCenter, setSearchCenter] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<SearchValues | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((response) => (response.ok ? response.json() : { userId: null }))
      .then((data: { userId: string | null }) => setUserId(data.userId))
      .catch(() => setUserId(null));
  }, []);

  const handleSearch = async (values: SearchValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSearchCenter({ latitude: values.latitude, longitude: values.longitude });
    setLastSearch(values);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = (await response.json()) as SearchResult;
      setResult(data);
    } catch {
      setErrorMessage('Something went wrong running that search. Please try again.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const ratePercent = result === null ? 0 : Math.round(result.rate.rate * 100);

  return (
    <>
      <SiteNav />

      <section className="hero hero--saltwater">
        <p className="hero__eyebrow">Coast · bays · open water</p>
        <h1>Saltwater</h1>
        <p className="hero__sub">
          Search a saltwater location and see the historical sighting record from real public
          occurrence data — with sample size and confidence, never a guarantee.
        </p>
      </section>

      <main className="section">
        <h2>Sighting-rate search</h2>
        <p className="section__lead">
          Select a species on the right, a full-precision latitude and longitude will be populated, and then select a month. Then, click search.The rate and the
          map come from real occurrence records; the AI only explains the numbers. After it populates, you can save the spot with your own notes.
        </p>

        <div className="search-layout">
          <SightingRateSearch
            onSearch={handleSearch}
            selectedSpecies={selectedSpecies}
            selectedLatitude={selectedLatitude}
            selectedLongitude={selectedLongitude}
          />
          <SpeciesList
            waterType="saltwater"
            onSelect={(selection) => {
              setSelectedSpecies(selection.scientificName);
              setSelectedLatitude(selection.latitude);
              setSelectedLongitude(selection.longitude);
            }}
          />
        </div>

        {isLoading ? <p className="section__lead">Searching real records…</p> : null}
        {errorMessage ? <p className="disclaimer">{errorMessage}</p> : null}

        {result ? (
          <>
            <div className="spot-cards" style={{ marginTop: '24px' }}>
              <article className="spot-card">
                <div className="spot-card__rate">
                  {ratePercent}%<small> of records in the selected month</small>
                </div>
                <div className="spot-card__meta">
                  <span className="pill pill--size">{result.rate.totalCount} records</span>
                  <span className={confidencePillClass[result.rate.confidence]}>
                    {result.rate.confidence} confidence
                  </span>
                </div>
              </article>
            </div>

            <p className="disclaimer">{result.explanation}</p>

            {searchCenter ? (
              <OccurrenceMap
                records={result.occurrences}
                centerLatitude={searchCenter.latitude}
                centerLongitude={searchCenter.longitude}
              />
            ) : null}
          </>
        ) : null}
        <SavedSpotsSection
          userId={userId}
          waterType="saltwater"
          canSave={result !== null && lastSearch !== null}
          prefillSpecies={lastSearch?.species}
          prefillLatitude={lastSearch?.latitude}
          prefillLongitude={lastSearch?.longitude}
        />
      </main>
    </>
  );
};

export default SaltwaterPage;
