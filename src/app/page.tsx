import { NavBar } from '@/components/NavBar';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <section className="hero">
        <p className="hero__eyebrow">Real records · honest data</p>
        <h1>AnglerCast</h1>
        <p className="hero__sub">
          Fish move constantly. AnglerCast shows you the historical sighting record from real
          public data — never a guarantee, always honest.
        </p>

        <div className="search-card">
          <div className="search-card__field">
            <label htmlFor="species">Species</label>
            <select id="species">
              <option>Striped bass</option>
              <option>Bluefish</option>
            </select>
          </div>
          <div className="search-card__field">
            <label htmlFor="latitude">Latitude</label>
            <input id="latitude" defaultValue="41.063500" />
          </div>
          <div className="search-card__field">
            <label htmlFor="longitude">Longitude</label>
            <input id="longitude" defaultValue="-71.862800" />
          </div>
          <div className="search-card__field">
            <label htmlFor="month">Month</label>
            <select id="month">
              <option>June</option>
            </select>
          </div>
          <button type="button" className="search-card__submit">
            Search
          </button>
        </div>
      </section>

      <main className="section">
        <h2>Top recorded spots</h2>
        <p className="section__lead">
          Computed from real GBIF and OBIS occurrence records near your search — every number shown
          with its sample size and confidence.
        </p>

        <div className="spot-cards">
          <article className="spot-card">
            <div className="spot-card__species">Morone saxatilis</div>
            <div className="spot-card__loc">41.0635, −71.8628 · Montauk</div>
            <div className="spot-card__rate">
              62%<small> of records in June</small>
            </div>
            <div className="spot-card__meta">
              <span className="pill pill--size">124 records</span>
              <span className="pill pill--high">High confidence</span>
            </div>
          </article>

          <article className="spot-card">
            <div className="spot-card__species">Pomatomus saltatrix</div>
            <div className="spot-card__loc">40.7000, −72.2000 · South Shore</div>
            <div className="spot-card__rate">
              38%<small> of records in July</small>
            </div>
            <div className="spot-card__meta">
              <span className="pill pill--size">47 records</span>
              <span className="pill pill--high">High confidence</span>
            </div>
          </article>

          <article className="spot-card">
            <div className="spot-card__species">Salvelinus fontinalis</div>
            <div className="spot-card__loc">44.1568, −73.9877 · Adirondacks</div>
            <div className="spot-card__rate">
              25%<small> of records in May</small>
            </div>
            <div className="spot-card__meta">
              <span className="pill pill--size">6 records</span>
              <span className="pill pill--low">Low confidence</span>
            </div>
          </article>
        </div>

        <p className="disclaimer">
          Fish are like bees — always moving. AnglerCast shows where fish were recorded, never where
          they are guaranteed to be. The AI explains the numbers; it never invents them.
        </p>
      </main>

      <footer className="site-footer">
        AnglerCast · Real occurrence data from GBIF, OBIS, Open-Meteo, USGS · AI explains, never
        invents
      </footer>
    </>
  );
};

export default HomePage;
