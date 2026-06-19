'use client';

import { FormEvent, useState } from 'react';
import { NavBar } from '@/components/NavBar';
import { PasswordField } from '@/components/PasswordField';

const ResetConfirmPage = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const code = String(formData.get('code') ?? '');
    const newPassword = String(formData.get('newPassword') ?? '');

    try {
      const response = await fetch('/api/auth/reset-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      if (!response.ok) {
        setErrorMessage('That reset code was expired or did not match.');
        setIsSubmitting(false);
        return;
      }

      setSuccessMessage('Your password has been reset.');
      setIsSubmitting(false);
    } catch {
      setErrorMessage('Something went wrong resetting your password. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />

      <section className="hero hero--login">
        <p className="hero__eyebrow">Password reset</p>
        <h1>Reset password</h1>
        <p className="hero__sub">Enter your reset code and choose a new password.</p>
      </section>

      <main className="section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="reset-confirm-email">Email</label>
            <input
              id="reset-confirm-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label htmlFor="reset-confirm-code">Code</label>
            <input id="reset-confirm-code" name="code" type="text" required />
          </div>

          <PasswordField label="New password" name="newPassword" />

          {successMessage ? (
            <div>
              <p>{successMessage}</p>
              <p className="auth-form__alt">
                <a href="/login">Log in</a>
              </p>
            </div>
          ) : null}
          {errorMessage ? <p className="auth-form__error">{errorMessage}</p> : null}

          <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Resetting password...' : 'Reset password'}
          </button>
        </form>
      </main>
    </>
  );
};

export default ResetConfirmPage;
