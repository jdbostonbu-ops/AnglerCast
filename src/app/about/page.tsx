import { NavBar } from '@/components/NavBar';

const AboutPage = () => {
  return (
    <>
      <NavBar />

      <section className="hero hero--about">
        <p className="hero__eyebrow">What AnglerCast is</p>
        <h1>About</h1>
        <p className="hero__sub">
          Honest fishing data — where fish have been recorded, never a guarantee of where they are.
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
          The numbers come from real data — GBIF and OBIS occurrence records, Open-Meteo conditions,
          and USGS life-history facts. Our code computes every figure. The AI only explains the
          results in plain English; it never invents a location, a species, or a season.
        </p>

        <p className="disclaimer">
          Where fish were recorded is not where they are guaranteed to be. We show the record, with
          its sample size and confidence — never a fabricated catch probability.
        </p>
      </main>
    </>
  );
};

export default AboutPage;
