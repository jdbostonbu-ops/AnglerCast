'use client';

import {useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { SiteNav } from '@/components/SiteNav';
import { SightingRateSearch } from '@/components/SightingRateSearch';
import { SpeciesList } from '@/components/SpeciesList';
import { SavedSpotsSection } from '@/components/SavedSpotsSection';
import { CatchComposer } from '@/components/CatchComposer';
import { CatchFeed } from '@/components/CatchFeed';
import { MapHint } from '@/components/MapHint';

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

const FreshwaterPage = () => {
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
  const [profileName, setProfileName] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
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

  useEffect(() => {
    const loadProfile = async (): Promise<void> => {
      const response = await fetch('/api/profile');

      if (!response.ok) {
        return;
      }

      const profile = (await response.json()) as { profileName: string | null };

      setProfileName(profile.profileName);
    };

    void loadProfile();
  }, []);

  const fetchReports = async ({
    waterType,
  }: {
    waterType: string;
  }) => {
    const response = await fetch(`/api/catch-reports?waterType=${waterType}`);
    if (!response.ok) {
      return [];
    }
    return await response.json();
  };

  const onPost = async (body: string): Promise<void> => {
    await fetch('/api/catch-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ waterType: 'freshwater', body }),
    });
    setRefreshKey((previous) => previous + 1);
  };

  const onDeletePost = async (postId: string): Promise<void> => {
    await fetch('/api/catch-reports', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: postId }),
    });
    setRefreshKey((previous) => previous + 1);
  };

  const onUpdatePost = async (
    postId: string,
    newBody: string,
  ): Promise<void> => {
    await fetch('/api/catch-reports', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: postId, body: newBody }),
    });
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <>
      <SiteNav />

      <section className="hero hero--freshwater">
        <p className="hero__eyebrow">Lakes · rivers · ponds</p>
        <h1>Freshwater</h1>
        <p className="hero__sub">
          Search a freshwater location and see the historical sighting record from real public
          occurrence data — with sample size and confidence, never a guarantee. 
        </p>
      </section>

      <main className="section">
        <h2>Sighting-rate search</h2>
        <p className="section__lead">
          Select a species on the right, a full-precision latitude and longitude will be populated, and select a month. Then, click search. The rate and the
          map come from real occurrence records; the AI only explains the numbers. After it populates, you can save the spot with your own notes.<br /><br />I take a sample size of 
          up to 2000 available records for the selected species below. I get the data from both OBIS and GBIF for freshwater fish. GBIF stands for the Global Biodiversity Information Facility. It's an international, government-funded 
          open-data network that lets anyone access records about where species have been observed or recorded around the world. The data comes from museums, herbaria, research institutions, 
          citizen-science platforms (like iNaturalist), and government surveys — all aggregated into one searchable place.
        </p>

        <div className="search-layout">
          <SightingRateSearch
            onSearch={handleSearch}
            waterType="freshwater"
            selectedSpecies={selectedSpecies}
            selectedLatitude={selectedLatitude}
            selectedLongitude={selectedLongitude}
          />
          <SpeciesList
            waterType="freshwater"
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
              <>
                <MapHint />
                <OccurrenceMap
                  records={result.occurrences}
                  centerLatitude={searchCenter.latitude}
                  centerLongitude={searchCenter.longitude}
                />
              </>
            ) : null}
          </>
        ) : null}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', minWidth: '300px' }}>
            <SavedSpotsSection
              userId={userId}
              waterType="freshwater"
              canSave={result !== null && lastSearch !== null}
              prefillSpecies={lastSearch?.species}
              prefillLatitude={lastSearch?.latitude}
              prefillLongitude={lastSearch?.longitude}
            />
          </div>
          <div style={{ flex: '1 1 320px', minWidth: '300px' }}>
            <h2>Catch reports</h2>
            <CatchComposer profileName={profileName} onPost={onPost} />
            <CatchFeed
              waterType="freshwater"
              fetchReports={fetchReports}
              currentUserId={userId ?? ''}
              onUpdate={onUpdatePost}
              onDelete={onDeletePost}
              refreshKey={refreshKey}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default FreshwaterPage;
