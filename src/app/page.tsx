import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { getHomeHighlights } from '@/lib/homeHighlights';

// Real occurrence data, recomputed automatically once a week (7 days in seconds).
export const revalidate = 604800;

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const confidencePillClass: Record<'low' | 'moderate' | 'high', string> = {
  low: 'pill pill--low',
  moderate: 'pill pill--size',
  high: 'pill pill--high',
};

const HomePage = async () => {
  const highlights = await getHomeHighlights();

  return (
    <>
      <SiteNav hideWaterLinks />

      <section className="hero">
        <p className="hero__eyebrow">Real records · honest data</p>
        <h1>AnglerCast</h1>
        <p className="hero__sub">
          Fish move constantly. AnglerCast shows you the historical sighting record from real
          public data — never a guarantee, always honest.
        </p>

        <div className="hero__cta">
          <Link className="hero__cta-link" href="/saltwater">
            Search saltwater
          </Link>
          <Link className="hero__cta-link hero__cta-link--ghost" href="/freshwater">
            Search freshwater
          </Link>
        </div>
      </section>

      <main className="section">
        <h2>Top recorded spots by season</h2>
        <p className="section__lead">
          Each card is computed live from real GBIF and OBIS occurrence records — the month 
          shown is the one with the highest share of historical sightings, with its sample 
          size and confidence. Refreshed weekly.
        </p>

        <div className="spot-cards">
          {highlights.map((card) => (
            <article className="spot-card" key={card.scientificName}>
              <div className="spot-card__species">{card.scientificName}</div>
              <div className="spot-card__loc">
                {card.latitude.toFixed(4)}, {card.longitude.toFixed(4)} · {card.locationLabel}
              </div>
              <div className="spot-card__rate">
                {Math.round(card.rate * 100)}%
                <small> of records in {monthNames[card.month - 1]}</small>
              </div>
              <div className="spot-card__meta">
                <span className="pill pill--size">{card.totalCount} records</span>
                <span className={confidencePillClass[card.confidence]}>
                  {card.confidence} confidence
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="disclaimer">
          Fish are like bees — always moving. AnglerCast shows where fish were recorded, never where
          they are guaranteed to be. The AI explains the numbers; it never invents them.
        </p>
      </main>

      <footer className="site-footer">
        AnglerCast · Real occurrence data from GBIF, OBIS, Open-Meteo, FishBase · AI explains, never
        invents
      </footer>
    </>
  );
};

export default HomePage;
