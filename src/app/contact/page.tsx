import { NavBar } from '@/components/NavBar';

const ContactPage = () => {
  return (
    <>
      <NavBar />

      <section className="hero hero--contact">
        <p className="hero__eyebrow">Get in touch</p>
        <h1>Contact</h1>
        <p className="hero__sub">
          Questions, feedback, or a data source we should add? We would like to hear from you.
        </p>
      </section>

      <main className="section">
        <h2>Reach us</h2>
        <p className="section__lead">
          Email AnglerCast at hello@anglercast.app and we will get back to you. Tell us what you
          fish for and where — it helps us improve the recommendations.
        </p>
      </main>
    </>
  );
};

export default ContactPage;
