'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { PasswordField } from '@/components/PasswordField';
import { Spinner } from '@/components/Spinner';

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(
          data?.error ?? 'That email and password did not match a verified account.',
        );
        setIsSubmitting(false);
        return;
      }

      router.push('/');
    } catch {
      setErrorMessage('Something went wrong logging in. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />

      <section className="hero hero--login">
        <p className="hero__eyebrow">Welcome back</p>
        <h1>Log in</h1>
        <p className="hero__sub">
          Log in to save fishing spots to your account and come back to them anytime.
        </p>
      </section>

      <main className="section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email">Email</label>
            <input id="login-email" name="email" type="email" autoComplete="email" required />
          </div>

          <PasswordField label="Password" name="password" />

          {errorMessage ? <p className="auth-form__error">{errorMessage}</p> : null}

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'Log in'}
            </button>
            {isSubmitting ? <Spinner /> : null}
          </span>
        </form>
        <p className="auth-form__alt">
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </p>
        <p className="auth-form__alt">
          <a href="/reset-request">Forgot password?</a>
        </p>
      </main>
    </>
  );
};

export default LoginPage;
