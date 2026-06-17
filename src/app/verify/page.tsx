'use client';

import { Suspense, useState } from 'react';
import type { CSSProperties } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { messageForVerifyReason } from '@/lib/verifyMessages';

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: '#f3f4f6',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  heading: { margin: '0 0 8px', fontSize: '22px' },
  subtext: { margin: '0 0 24px', color: '#6b7280', fontSize: '14px' },
  label: { display: 'block', marginBottom: '16px', fontSize: '14px', fontWeight: 500 },
  input: {
    width: '100%',
    marginTop: '6px',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#111827',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  buttonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  error: { margin: '0 0 16px', color: '#b91c1c', fontSize: '14px' },
  link: { color: '#2563eb', fontWeight: 600 },
};

const VerifyForm = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>(searchParams.get('email') ?? '');
  const [code, setCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerify = async (): Promise<void> => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        setIsVerified(true);
        return;
      }

      const body = (await response.json()) as { reason?: string };
      setErrorMessage(messageForVerifyReason(body.reason));
    } catch {
      setErrorMessage(messageForVerifyReason(undefined));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVerified) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Email verified ✓</h1>
          <p style={styles.subtext}>Your AnglerCast account is now active.</p>
          <Link href="/login" style={styles.link}>Go to log in →</Link>
        </div>
      </main>
    );
  }

  const isButtonDisabled = isSubmitting || code.trim().length === 0;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Verify your email</h1>
        <p style={styles.subtext}>
          Enter the code we emailed to {email || 'your address'}.
        </p>

        <label style={styles.label}>
          Email
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label style={styles.label}>
          Verification code
          <input
            style={styles.input}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </label>

        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

        <button
          type="button"
          onClick={handleVerify}
          disabled={isButtonDisabled}
          style={isButtonDisabled ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {isSubmitting ? 'Verifying…' : 'Verify'}
        </button>
      </div>
    </main>
  );
};

const VerifyPage = () => (
  <Suspense fallback={null}>
    <VerifyForm />
  </Suspense>
);

export default VerifyPage;