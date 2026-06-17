'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/NavBar';
import { PasswordField } from '@/components/PasswordField';

const SignupPage = () => {
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(data?.error ?? 'Could not create that account. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Account created; the verification code was emailed. Go enter it.
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch {
      setErrorMessage('Something went wrong creating your account. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar />

      <section className="hero hero--signup">
        <p className="hero__eyebrow">Create your account</p>
        <h1>Sign up</h1>
        <p className="hero__sub">
          Make an account to save fishing spots. We&apos;ll email you a code to confirm your
          address.
        </p>
      </section>

      <main className="section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="signup-email">Email</label>
            <input id="signup-email" name="email" type="email" autoComplete="email" required />
          </div>

          <PasswordField label="Password" name="password" />

          {errorMessage ? <p className="auth-form__error">{errorMessage}</p> : null}

          <button type="submit" className="auth-form__submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
      </main>
    </>
  );
};

export default SignupPage;
