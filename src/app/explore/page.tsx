'use client';

import { type FormEvent, useState } from 'react';
import { SiteNav } from '@/components/SiteNav';
import { ExploreFaqChat } from '@/components/ExploreFaqChat';

type WaterType = 'saltwater' | 'freshwater';

type EtaReasonableness =
  | {
      isReasonable: true;
    }
  | {
      isReasonable: false;
      reason: string;
    };

type EtaResult = {
  distanceNauticalMiles: number;
  etaHours: number;
  explanation: string;
  locationSummary: string;
  tideSummary: string;
  conditions: {
    marine: {
      waveHeight: number;
      waveDirection: number;
      wavePeriod: number;
      oceanCurrentVelocity: number;
    };
    forecast: {
      windSpeed: number;
      windDirection: number;
      windGusts: number;
    };
  };
  reasonableness: EtaReasonableness;
};

const ExplorePage = () => {
  const [originLatitude, setOriginLatitude] = useState('');
  const [originLongitude, setOriginLongitude] = useState('');
  const [destinationLatitude, setDestinationLatitude] = useState('');
  const [destinationLongitude, setDestinationLongitude] = useState('');
  const [speedKnots, setSpeedKnots] = useState('');
  const [waterType, setWaterType] = useState<WaterType>('saltwater');
  const [result, setResult] = useState<EtaResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/eta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originLatitude: Number(originLatitude),
          originLongitude: Number(originLongitude),
          destinationLatitude: Number(destinationLatitude),
          destinationLongitude: Number(destinationLongitude),
          speedKnots: Number(speedKnots),
          waterType,
        }),
      });

      if (!response.ok) {
        throw new Error('ETA request failed');
      }

      const data = (await response.json()) as EtaResult;
      setResult(data);
    } catch {
      setErrorMessage('Something went wrong getting that travel time. Please try again.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SiteNav />

      <section className="hero hero--explore">
        <p className="hero__eyebrow">What AnglerCast is</p>
        <h1>Explore</h1>
        <p className="hero__sub">
          Honest fishing data — where fish have been recorded, never a guarantee of where they are.
          On this page you will need to enter the origin and destination coordinates, your boat speed,
          and the water type. Use exact coordinates for longitude and latitude (e.g. 36.4, -74.1).
          AnglerCast will compute the distance and fetch current conditions and AI will estimate an ETA
          and tell you what fish have been recorded in the area.
        </p>
      </section>

      <main className="section">
        <h2>The honest-data thesis</h2>
        <p className="section__lead">
          Fish are like bees — always moving. AnglerCast does not promise where fish will be. It
          shows you the historical record from real public occurrence data, with the sample size and
          a confidence flag every time, so you can judge it for yourself.
        </p>
        <p className="section__lead">
          The numbers come from real data — GBIF (Global Biodiversity Information Facility) and 
          OBIS (Ocean Biodiversity Information System) occurrence records for species history, Open-Meteo 
          Marine and Forecast for wave, current, and wind conditions, USGS (U.S. Geological Survey) for 
          live water conditions, and NOAA CO-OPS (National Oceanic and Atmospheric Administration, Center 
          for Operational Oceanographic Products and Services) for high and low tide predictions. Our code 
          computes every figure. The AI only explains the results in plain English; it never invents a 
          location, a species, a season, or a tide.
        </p>

        <h2>Travel-time tool</h2>
        <p className="section__lead">
          Enter your origin, destination, speed, and water type. AnglerCast computes the distance from your 
          full-precision coordinates using the haversine formula and fetches current conditions, then asks 
          the AI to estimate a conditions-aware ETA from those facts — the travel-time figure is the AI's 
          estimate, while the distance and conditions are real measured data.
        </p>

        <form className="search-card" onSubmit={handleSubmit}>
          <div className="search-card__field">
            <label htmlFor="origin-latitude">Origin latitude</label>
            <input
              id="origin-latitude"
              type="number"
              step="any"
              value={originLatitude}
              onChange={(event) => setOriginLatitude(event.target.value)}
              required
            />
          </div>
          <div className="search-card__field">
            <label htmlFor="origin-longitude">Origin longitude</label>
            <input
              id="origin-longitude"
              type="number"
              step="any"
              value={originLongitude}
              onChange={(event) => setOriginLongitude(event.target.value)}
              required
            />
          </div> 
          <div className="search-card__field">
            <label htmlFor="destination-latitude">Destination latitude</label>
            <input
              id="destination-latitude"
              type="number"
              step="any"
              value={destinationLatitude}
              onChange={(event) => setDestinationLatitude(event.target.value)}
              required
            />
          </div>
          <div className="search-card__field">
            <label htmlFor="destination-longitude">Destination longitude</label>
            <input
              id="destination-longitude"
              type="number"
              step="any"
              value={destinationLongitude}
              onChange={(event) => setDestinationLongitude(event.target.value)}
              required
            />
          </div>
          <div className="search-card__field">
            <label htmlFor="speed-knots">Boat speed in knots</label>
            <input
              id="speed-knots"
              type="number"
              step="any"
              min="0"
              value={speedKnots}
              onChange={(event) => setSpeedKnots(event.target.value)}
              required
            />
          </div>
          <div className="search-card__field">
            <label htmlFor="water-type">Water type</label>
            <select
              id="water-type"
              value={waterType}
              onChange={(event) => setWaterType(event.target.value as WaterType)}
            >
              <option value="saltwater">Saltwater</option>
              <option value="freshwater">Freshwater</option>
            </select>
          </div>
          <button className="search-card__submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Getting travel time...' : 'Get travel time'}
          </button>
        </form>

        {errorMessage ? <p className="disclaimer">{errorMessage}</p> : null}

        {result ? (
         <div className="spot-cards" style={{ marginTop: '24px' }}>
            <article className="spot-card">
              <h3>Estimated Travel Time</h3>
              <div className="spot-card__rate">
                {result.etaHours}
                <small> hours estimated travel time</small>
              </div>
              <div className="spot-card__meta">
                <span className="pill pill--size">
                  {result.distanceNauticalMiles} nautical miles
                </span>
                <span className={result.reasonableness.isReasonable ? 'pill pill--high' : 'pill pill--low'}>
                  {result.reasonableness.isReasonable ? 'Estimate looks reasonable' : 'caution'}
                </span>
              </div>
              {!result.reasonableness.isReasonable ? (
                <p className="disclaimer">
                  This estimate may not be reliable — please double-check your inputs. Treat it as unreliable.
                </p>
              ) : null}
              <p className="disclaimer">{result.explanation}</p>
              <h3>Conditions used</h3>
              <p>
                Wave height {result.conditions.marine.waveHeight} m, wave direction{' '}
                {result.conditions.marine.waveDirection}°, wave period{' '}
                {result.conditions.marine.wavePeriod} s, ocean current{' '}
                {result.conditions.marine.oceanCurrentVelocity} m/s. Wind speed{' '}
                {result.conditions.forecast.windSpeed} km/h, wind direction{' '}
                {result.conditions.forecast.windDirection}°, wind gusts{' '}
                {result.conditions.forecast.windGusts} km/h.
                </p>
            </article>
              <article className="spot-card">
              <h3>What's been recorded here</h3>
              <p className="disclaimer">{result.locationSummary}</p>
              <h3>Tide Summary</h3>
              <p className="disclaimer">{result.tideSummary}</p>
            </article>
          </div>
        ) : null}

        <p className="disclaimer">
          The numbers are real occurrence records. We say it like anglers do — but a record 
          isn't a promise. The water decides.
        </p>
        <ExploreFaqChat />
      </main>
    </>
  );
};

export default ExplorePage;
