'use client';

import { FormEvent, useState } from 'react';
import { NavBar } from '@/components/NavBar';

const ResetRequestPage = () => {
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');

    try {
      const response = await fetch('/api/auth/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setErrorMessage('Something went wrong requesting a reset code. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setMessage('If an account exists for that email, a password reset code has been sent.');
      setIsSubmitting(false);
    } catch {
      setErrorMessage('Something went wrong requesting a reset code. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />

      <section className="hero hero--login">
        <p className="hero__eyebrow">Password reset</p>
        <h1>Reset password</h1>
        <p className="hero__sub">Request a code to reset your AnglerCast password.</p>
      </section>

      <main className="section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reset-request-email">Email</label>
            <input
              id="reset-request-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          {message ? <p>{message}</p> : null}
          {errorMessage ? <p className="auth-form__error">{errorMessage}</p> : null}

          <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending reset code...' : 'Send reset code'}
          </button>
        </form>
      </main>
    </>
  );
};

export default ResetRequestPage;
