import { NavBar } from '@/components/NavBar';

const SaltwaterPage = () => {
  return (
    <>
      <NavBar />

      <section className="hero hero--saltwater">
        <p className="hero__eyebrow">Coast · bays · open ocean</p>
        <h1>Saltwater</h1>
        <p className="hero__sub">
          Search a saltwater location and see the historical sighting record from real public
          occurrence data — with sample size and confidence, never a guarantee.
        </p>
      </section>

      <main className="section">
        <h2>Saltwater spots</h2>
        <p className="section__lead">
          Enter a latitude and longitude to see real recorded occurrences nearby. The map and rates
          come from real data; the AI only explains them.
        </p>
      </main>
    </>
  );
};

export default SaltwaterPage;
