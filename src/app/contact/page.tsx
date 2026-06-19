import { SiteNav } from '@/components/SiteNav';

const ContactPage = () => {
  return (
    <>
      <SiteNav />

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
          Email AnglerCast at <span className="contact-email">fish@anglercast.fyi</span> and we will get back to you. This site is live. Tell us what you
          fish for and where — it helps us improve the recommendations.
        </p>

        <p>
          Have feedback or a feature request?{' '}
          <a href="https://tally.so/r/q4N1jk" target="_blank" rel="noopener noreferrer">
            Share it with us here
          </a>
          .
        </p>
      </main>
    </>
  );
};

export default ContactPage;
